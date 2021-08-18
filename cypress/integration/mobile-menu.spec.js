/// <reference types="cypress" />

const viewports = ['ipad-2', 'iphone-x']

describe('Mobile menu', () => {
  it('can be toggled', () => {
    const menuSelector = '[data-test=mobile-menu]'
    const toggleMenuSelector = '[data-test=mobile-menu-toggle]'

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(menuSelector).should('be.hidden')

      cy.get(toggleMenuSelector).click()
      cy.get(menuSelector).should('be.visible')

      cy.get(toggleMenuSelector).click()
      cy.get(menuSelector).should('be.hidden')
    })
  })
})
