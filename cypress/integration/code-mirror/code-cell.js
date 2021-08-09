/// <reference types="cypress" />

describe('Code cell', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('/course/examples/blocks')

      // set cookies to prevent IBM privacy policy popup
      .setCookie('cmapi_cookie_privacy', 'permit_1|2|3')
      .setCookie('cmapi_gtm_bl', '')
      .setCookie('notice_gdpr_prefs', '0|1|2:')
      .setCookie('notice_preferences', '2:')

      .reload()
  })

  it('is displayed', () => {
    cy.get('[data-cy=code-cell]').should('be.visible')
    cy.get('[data-cy=code-cell-input]').contains('1 + 1')
    cy.get('[data-cy=code-cell-output]').contains('2')
    cy.get('[data-cy=code-cell-button-run]').contains('Run')
  })

  it('runs', () => {
    cy.get('[data-cy=code-cell-code]')
      .click()
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}2+3')
    cy.get('[data-cy=code-cell-input]').contains('2+3')
    cy.get('[data-cy=code-cell-button-run]').click()
    cy.get('[data-cy=code-cell-output]').contains('Waiting for kernel...')
  })
})
