/// <reference types="cypress" />

describe('Error page', () => {
  it('Can render the content correctly', () => {
    const errorPageTitle = '[data-test=error-page-title]'
    const errorPageDescription = '[data-test=error-page-message]'
    const errorPageImg = '[data-test=error-page-img]'

    cy.visit('/error_test_page', { failOnStatusCode: false })

    cy.get(errorPageTitle).should('be.visible')
    cy.get(errorPageDescription).should('be.visible')
    cy.get(errorPageImg).should('be.visible')
  })
})
