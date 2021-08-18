/// <reference types="cypress" />

describe('Mega menu dropdown', () => {
  it('can be opened', () => {
    const megaMenuDropdownSelector = '.app-mega-dropdown'
    const megaMenuDropdownContentSelector =
      '.app-mega-dropdown__content-container'

    cy.viewport('macbook-15')
    cy.visit('/course/ch-prerequisites')
    cy.get(megaMenuDropdownContentSelector).should('not.exist')

    cy.get(megaMenuDropdownSelector).click()
    cy.get(megaMenuDropdownSelector).should('be.visible')
    cy.get(megaMenuDropdownContentSelector).should('be.visible')
  })
})
