/// <reference types="cypress" />

describe('Sidebar', () => {
  const sidebarSelector = '[data-test=sidebar] [data-test=sidebar-entry]'
  const toggleSidebarSelector = '[data-test=sidebar-button-toggle]'

  it('can be toggled on a laptop', () => {
    cy.viewport('macbook-15')
    cy.visit('/course/ch-prerequisites')
    cy.get(sidebarSelector).should('be.visible')
    cy.get(toggleSidebarSelector).click()
    cy.get(sidebarSelector).should('be.not.visible')
    cy.get(toggleSidebarSelector).click()
    cy.get(sidebarSelector).should('be.visible')
  })

  it('can be toggled on a tablet', () => {
    cy.viewport('ipad-2')
    cy.visit('/course/ch-prerequisites')
    cy.get(sidebarSelector).should('be.not.visible')
    cy.get(toggleSidebarSelector).click()
    cy.get(sidebarSelector).should('be.visible')
    cy.get(toggleSidebarSelector).click()
    cy.get(sidebarSelector).should('be.not.visible')
  })

  it('can be toggled on a smartphone', () => {
    const showMobileSidebarSelector = '[data-test=sidebar-button-toggle-mobile]'

    cy.viewport('iphone-x')
    cy.visit('/course/ch-prerequisites')
    cy.get(sidebarSelector).should('be.not.visible')
    cy.get(showMobileSidebarSelector).click()
    cy.get(sidebarSelector).should('be.visible')
    cy.get(toggleSidebarSelector).click()
    cy.get(sidebarSelector).should('be.not.visible')
  })

  it('back to home link links to textbook home', () => {
    const viewports = ['ipad-2', 'macbook-15']
    const linkSelector = '[data-test=back-to-home-link]'
    const textbookHomeUrl = 'https://qiskit.org/learn'

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(linkSelector).should('be.visible')
      cy.get(linkSelector).should('have.attr', 'href', textbookHomeUrl)
    })
  })
})
