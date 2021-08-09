/// <reference types="cypress" />

beforeEach(() => {
  cy
    .viewport('macbook-15')
    .setCookie('cmapi_cookie_privacy', 'permit_1|2|3')
    .setCookie('cmapi_gtm_bl', '')
    .setCookie('notice_gdpr_prefs', '0|1|2:')
    .setCookie('notice_preferences', '2:')
})

describe('CTA', () => {
  it('next and previous section links work', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-cy=footer-nav-next-section]').click()

    cy.url().should(
      'include',
      '/course/ch-prerequisites/introduction-to-python-and-jupyter-notebooks'
    )
    cy.get('[data-cy=footer-nav-previous-section]').click()

    cy.url().should(
      'include',
      '/course/ch-prerequisites/environment-setup-guide-to-work-with-qiskit-textbook'
    )
  })

  it('back to home link linked corretly', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-cy=back-to-home-link]')
      .should('have.attr', 'href', 'https://qiskit.org/textbook-beta')
  })

  it('toggle sidebar button works', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-cy=sidebar] [data-cy=sidebar-entry]')
      .should('be.visible')

      .get('[data-cy=sidebar-button-toggle]')
      .click()
      .get('[data-cy=sidebar] [data-cy=sidebar-entry]')
      .should('be.hidden')

      .get('[data-cy=sidebar-button-toggle]')
      .click()
      .get('[data-cy=sidebar] [data-cy=sidebar-entry]')
      .should('be.visible')

    // Mobile

      .viewport('iphone-x')
      .visit('/course/ch-prerequisites')
      .get('[data-cy=sidebar] [data-cy=sidebar-entry]')
      .should('be.hidden')

      .get('[data-cy=sidebar-button-toggle-mobile]')
      .click()
      .get('[data-cy=sidebar] [data-cy=sidebar-entry]')
      .should('be.visible')

      .get('[data-cy=sidebar-button-toggle]')
      .click()
      .get('[data-cy=sidebar] [data-cy=sidebar-entry]')
      .should('be.hidden')
  })

  it('toggle mobile menu button works', () => {
    cy
      .viewport('iphone-x')
      .visit('/course/ch-prerequisites')
      .get('[data-cy=mobile-menu]')
      .should('be.hidden')

      .get('[data-cy=mobile-menu-toggle]')
      .click()
      .get('[data-cy=mobile-menu]')
      .should('be.visible')

      .get('[data-cy=mobile-menu-toggle]')
      .click()
      .get('[data-cy=mobile-menu]')
      .should('be.hidden')
  })

  it('old textbook version link has expected properties', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-cy=qiskit-banner-old-textbook-version] a')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://qiskit.org/textbook')
  })
})
