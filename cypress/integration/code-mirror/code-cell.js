/// <reference types="cypress" />

describe('Code cell', () => {
  beforeEach(() => {
    cy.viewport('macbook-15').visit('/course/examples/blocks')
  })

  it('is displayed', () => {
    cy.get('[data-test=code-cell]').should('be.visible')
    cy.get('[data-test=code-cell-input]').contains('1 + 1')
    cy.get('[data-test=code-cell-output]').contains('2')
    cy.get('[data-test=code-cell-button-run]').contains('Run')
  })

  it('runs', () => {
    cy.get('[data-test=code-cell-code]')
      .click()
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}2+3')
    cy.get('[data-test=code-cell-input]').contains('2+3')
    cy.get('[data-test=code-cell-button-run]').click()
    cy.get('[data-test=code-cell-output]').contains('Waiting for kernel...')
  })
})
