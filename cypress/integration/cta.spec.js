/// <reference types="cypress" />

describe('CTA', () => {
  it('back to home link linked correctly', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-test=back-to-home-link]')
      .should('have.attr', 'href', 'https://qiskit.org/textbook-beta')
  })

  it('toggle sidebar button works', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-test=sidebar] [data-test=sidebar-entry]')
      .should('be.visible')

      .get('[data-test=sidebar-button-toggle]')
      .click()
      .get('[data-test=sidebar] [data-test=sidebar-entry]')
      .should('be.hidden')

      .get('[data-test=sidebar-button-toggle]')
      .click()
      .get('[data-test=sidebar] [data-test=sidebar-entry]')
      .should('be.visible')

    // Mobile

      .viewport('iphone-x')
      .visit('/course/ch-prerequisites')
      .get('[data-test=sidebar] [data-test=sidebar-entry]')
      .should('be.hidden')

      .get('[data-test=sidebar-button-toggle-mobile]')
      .click()
      .get('[data-test=sidebar] [data-test=sidebar-entry]')
      .should('be.visible')

      .get('[data-test=sidebar-button-toggle]')
      .click()
      .get('[data-test=sidebar] [data-test=sidebar-entry]')
      .should('be.hidden')
  })

  it('toggle mobile menu button works', () => {
    cy
      .viewport('iphone-x')
      .visit('/course/ch-prerequisites')
      .get('[data-test=mobile-menu]')
      .should('be.hidden')

      .get('[data-test=mobile-menu-toggle]')
      .click()
      .get('[data-test=mobile-menu]')
      .should('be.visible')

      .get('[data-test=mobile-menu-toggle]')
      .click()
      .get('[data-test=mobile-menu]')
      .should('be.hidden')
  })
})
