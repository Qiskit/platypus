/// <reference types="cypress" />

describe('Navigation Macbook-15', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('/course/introduction/why-quantum-computing')
  })

  it('Navigate to atoms of computation', () => {
    // initial url
    cy.url().should('include', '/introduction/why-quantum-computing')

    // navigate
    cy.get('[data-section-id="the-atoms-of-computation"]').click()

    // end url
    cy.url().should('include', '/introduction/the-atoms-of-computation')
  })
})
