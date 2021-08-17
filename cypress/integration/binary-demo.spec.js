/// <reference types="cypress" />

describe('Binary demo', () => {
  it('Should render on page', () => {
    const binaryDemo = '.binary-demo'

    cy.visit('/course/ch-prerequisites')
    cy.url().should('include', 'ch-prerequisites')

    cy.get(binaryDemo).should('be.visible')
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

  // it('Should update Decimal total', () => {})
})
