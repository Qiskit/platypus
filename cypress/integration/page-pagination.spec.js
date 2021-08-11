/// <reference types="cypress" />

describe('Page pagination', () => {
  it('next and previous links navigate to next and previous pages', () => {
    const initialPage =
      '/course/ch-prerequisites/environment-setup-guide-to-work-with-qiskit-textbook'
    const nextPage =
      '/course/ch-prerequisites/introduction-to-python-and-jupyter-notebooks'

    cy.visit(initialPage)
      .get('[data-test=footer-nav-next-section]')
      .click()
      .url()
      .should('include', nextPage)

      .get('[data-test=footer-nav-previous-section]')
      .click()
      .url()
      .should('include', initialPage)
  })
})
