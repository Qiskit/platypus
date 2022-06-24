/// <reference types="cypress" />

describe('Binary demo', () => {
  it('Should render on page', () => {
    const binaryDemo = '.binary-demo'

    cy.visit('/course/introduction/the-atoms-of-computation')
    cy.url().should('include', 'introduction/the-atoms-of-computation')

    cy.get(binaryDemo).scrollIntoView().should('be.visible')
  })

  it('Should render all Binary demo tiles', () => {
    const binaryDemoTiles = '.binary-tile'
    const expectedTileCount = 6

    cy.get(binaryDemoTiles).should('have.length', expectedTileCount)
  })

  it('Should render Decimal total', () => {
    const decimalTotal = '[data-test="binary-demo-total"] .binary-demo__block'
    const expectedDecimalTotal = 25

    cy.get(decimalTotal).should('be.visible')
    cy.get(decimalTotal).should('have.text', expectedDecimalTotal)
  })

  it('Should update Decimal total', () => {
    const binaryDemo = '.binary'
    const binaryDemoBtns = '.binary-tile'
    const decimalTotal = '[data-test="binary-demo-total"] .binary-demo__block'
    const initialTotal = 25
    const updatedTotalEl = '[data-test="binary-demo-total"] .binary-demo__block'
    const expectedUpdatedTotal = 57

    cy.visit('/course/introduction/the-atoms-of-computation')
    cy.url().should('include', 'introduction/the-atoms-of-computation')

    cy.get(binaryDemo).scrollIntoView()
    cy.get(decimalTotal).should('have.text', initialTotal)
    cy.get(binaryDemoBtns).first().click() // add 32
    cy.get(updatedTotalEl).should('have.text', expectedUpdatedTotal)
    cy.get(binaryDemoBtns).first().click() // remove 32
    cy.get(updatedTotalEl).should('have.text', initialTotal)
  })
})
