/// <reference types="cypress" />

describe('Sidebar', () => {
  const viewports = ['ipad-2', 'macbook-15']

  it('back to home link links to textbook home', () => {
    const linkSelector = '[data-test=back-to-home-link]'
    const textbookHomeUrl = 'https://qiskit.org/textbook-beta'

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(linkSelector).should('be.visible')
      cy.get(linkSelector).should('have.attr', 'href', textbookHomeUrl)
    })
  })
})
