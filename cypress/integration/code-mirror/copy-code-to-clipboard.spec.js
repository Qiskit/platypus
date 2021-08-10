/// <reference types="cypress" />

describe('Copy code to clipboard', () => {
  beforeEach(() => {
    cy.viewport('macbook-15').visit('/course/examples/blocks')
  })

  it('displays only the copy icon', () => {
    cy.get('#code-mirror-element-0').should('be.hidden')
    cy.get('.copy-icon').should('be.visible')
    cy.get('.code-mirror-clipboard-copy .label').should('have.css', 'opacity', '0')
  })

  it('can focus the copy button', () => {
    cy.get('.code-mirror-clipboard-copy').first().focus()
    cy.get('.code-mirror-clipboard-copy .label').contains('Copy')
  })

  it('copies code to clipboard', () => {
    cy.get('.code-mirror-clipboard-copy').click()
    cy.get('.code-mirror-clipboard-copy .label').contains('Copied!')

    // TODO: Check the clipboard's content (for single and multiple lines of
    // code copied).
    // https://github.com/qiskit-community/platypus/issues/96
  })
})
