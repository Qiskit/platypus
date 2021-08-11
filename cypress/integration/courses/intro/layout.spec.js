/// <reference types="cypress" />

describe('Layout Macbook-15', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('/course/introduction/why-quantum-computing')
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
