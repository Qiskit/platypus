/// <reference types="cypress" />

describe('Navigation Macbook-15', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('/course/introduction/why-quantum-computing')

      // set cookies to prevent IBM privacy policy popup
      .setCookie('cmapi_cookie_privacy', 'permit_1|2|3')
      .setCookie('cmapi_gtm_bl', '')
      .setCookie('notice_gdpr_prefs', '0|1|2:')
      .setCookie('notice_preferences', '2:')

      .reload()
  })

  it('Navigate to atoms of computation', () => {
    // initial url
    cy.url().should('include', '/introduction/why-quantum-computing')

    // navigate
    cy.get('[data-section-id="the-atoms-of-computation"]').click()

    // end url
    cy.url().should('include', '/introduction/the-atoms-of-computation')
  })
})
