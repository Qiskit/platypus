/// <reference types="cypress" />

const viewports = ['ipad-2', 'iphone-x', 'macbook-15']

describe('Old textbook version banner', () => {
  it('link links to old textbook version', () => {
    const bannerSelector = '[data-test=qiskit-banner-old-textbook-version] a'
    const oldTextbookUrl = 'https://qiskit.org/textbook'

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(bannerSelector).should('be.visible')
      cy.get(bannerSelector).should('have.attr', 'href', oldTextbookUrl)
    })
  })
})
