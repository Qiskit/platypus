/// <reference types="cypress" />

describe('Mega menu dropdown', () => {
  it('can be opened', () => {
    const megaMenuDropdownSelector = '[data-test=content-menu-dropdown]'
    const megaMenuDropdownContentSelector =
    '[data-test=content-menu-dropdown] .app-mega-dropdown__content-container'

    cy.viewport('macbook-15')
    cy.visit('/course/ch-prerequisites')
    cy.get(megaMenuDropdownContentSelector).should('not.exist')

    cy.get(megaMenuDropdownSelector).click()
    cy.get(megaMenuDropdownSelector).should('be.visible')
    cy.get(megaMenuDropdownContentSelector).should('be.visible')
  })
})
