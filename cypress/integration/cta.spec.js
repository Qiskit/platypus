/// <reference types="cypress" />

describe('CTA', () => {
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
})
