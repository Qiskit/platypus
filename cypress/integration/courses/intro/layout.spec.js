/// <reference types="cypress" />

describe('Layout Macbook-15', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('/course/introduction/why-quantum-computing')
  })

  it('Should hide then show navigation sidebar', () => {
    // initial state
    cy.get('.c-sidebar__chapter').should('be.visible')

    // hide
    cy.get('#app-panel-footer-toggle').click()
    cy.get('.c-sidebar__chapter').should('not.be.visible')

    // restore initial state
    cy.get('#app-panel-footer-toggle').click()
    cy.get('.c-sidebar__chapter').should('be.visible')
  })

  it('Should hide then show utility panel', () => {
    // initial state
    cy.get('.utility-panel-content').should('be.visible')

    // hide
    cy.get('.utility-panel-header__toggle').click()
    cy.get('.utility-panel-content').should('not.be.visible')

    // restore initial state
    cy.get('.utility-panel-header__toggle').click()
    cy.get('.utility-panel-content').should('be.visible')
  })

  it('Should open Browse all content', () => {
    // initial state
    cy.get('.app-mega-dropdown').should('be.visible')
    cy.get('.app-mega-dropdown__content-container').should('not.exist')

    // show
    cy.get('.app-mega-dropdown').click()

    cy.get('.app-mega-dropdown').should('be.visible')
    cy.get('.app-mega-dropdown__content-container').should('be.visible')
  })
})
