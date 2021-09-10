/// <reference types="cypress" />

describe('Error page', () => {
  it('Can render the content correctly', () => {
    const errorPageTitle = '.c-textbook__page__error-code'
    const errorPageDescription = '.c-textbook__page__error-message'
    const errorPageImg = '#img'

    cy.visit('/error_test_page', { failOnStatusCode: false })

    cy.get(errorPageTitle).should('be.visible')
    cy.get(errorPageDescription).should('be.visible')
    cy.get(errorPageImg).should('be.visible')
  })
})
