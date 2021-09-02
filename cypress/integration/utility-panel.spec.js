/// <reference types="cypress" />

describe('Utility panel', () => {
  utilityPanelSelector = '[data-test=utility-panel-content]'
  toggleUtilityPanelSelector = '[data-test=utility-panel-header-toggle]'

  it('can be toggled on a laptop or tablet', () => {
    viewports = ['ipad-2', 'macbook-15']

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(utilityPanelSelector).should('be.visible')
      cy.get(toggleUtilityPanelSelector).click()
      cy.get(utilityPanelSelector).should('be.not.visible')
      cy.get(toggleUtilityPanelSelector).click()
      cy.get(utilityPanelSelector).should('be.visible')
    })
  })

  it('can be toggled on a smartphone', () => {
    cy.viewport('iphone-x')
    cy.visit('/course/ch-prerequisites')
    cy.get(utilityPanelSelector).should('be.not.visible')
    cy.get(toggleUtilityPanelSelector).click()
    cy.get(utilityPanelSelector).should('be.visible')
    cy.get(toggleUtilityPanelSelector).click()
    cy.get(utilityPanelSelector).should('be.not.visible')
  })
})
