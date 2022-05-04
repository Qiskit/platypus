/// <reference types="cypress" />

const viewports = ['ipad-2', 'iphone-x', 'macbook-15']

describe('Page pagination', () => {
  it('next and previous links navigate to next and previous pages', () => {
    const previousPageLinkSelector = '[data-test=footer-nav-previous-section]'
    const nextPageLinkSelector = '[data-test=footer-nav-next-section]'
    const initialPage =
      '/course/ch-prerequisites/environment-setup-guide-to-work-with-qiskit-textbook'
    const nextPage =
      '/course/ch-prerequisites/introduction-to-python-and-jupyter-notebooks'

    // TODO Look at a better implementation of this test without using the utility-panel
    const hideUtilityPanel = () => {
      const utilityPanelToggleSelector = '[data-test=utility-panel-header-toggle]'
      const utilityPanelContentSelector = '[data-test=utility-panel-content]'
      cy.get(utilityPanelContentSelector).then(($panel) => {
        if ($panel.is(':visible')) {
          cy.get(utilityPanelToggleSelector).click()
        }
      })
    }

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit(initialPage)

      hideUtilityPanel()
      cy.get(nextPageLinkSelector).click()
      cy.url().should('include', nextPage)

      hideUtilityPanel()
      cy.get(previousPageLinkSelector).click()
      cy.url().should('include', initialPage)
    })
  })
})
