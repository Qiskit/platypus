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

  it('old textbook version link has expected properties', () => {
    cy
      .visit('/course/ch-prerequisites')
      .get('[data-cy=qiskit-banner-old-textbook-version] a')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://qiskit.org/textbook')
  })
})
