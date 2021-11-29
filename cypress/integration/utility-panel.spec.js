/// <reference types="cypress" />

describe('Utility panel', () => {
  const utilityPanelSelector = '[data-test=utility]'
  const utilityPanelContent = '[data-test=utility-panel-content]'
  const utlityPanelToggle = '[data-test=utility-panel-header-toggle]'

  it('can be toggled on a laptop or tablet', () => {
    const viewports = ['ipad-2', 'macbook-15']

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(utilityPanelSelector).should('be.visible')
      cy.get(utlityPanelToggle).click()
      cy.get(utilityPanelContent).should('be.not.visible')
      cy.get(utlityPanelToggle).click()
      cy.get(utilityPanelSelector).should('be.visible')
    })
  })

  it('can be toggled on a smartphone', () => {
    cy.viewport('iphone-x')
    cy.visit('/course/ch-prerequisites')
    cy.get(utilityPanelContent).should('be.not.visible')
    cy.get(utilityPanelSelector).click()
    cy.get(utilityPanelSelector).should('be.visible')
    cy.get(utlityPanelToggle).click()
    cy.get(utilityPanelContent).should('be.not.visible')
  })
})
