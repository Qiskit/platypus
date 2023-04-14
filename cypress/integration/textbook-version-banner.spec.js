/// <reference types="cypress" />

const viewports = ['ipad-2', 'iphone-x', 'macbook-15']

describe('Old textbook version banner', () => {
  it('links to version 1 of same course', () => {
    const bannerSelector = '[data-test=qiskit-banner-new-textbook-version] a'
    const courseUrl = '/course/ch-states'
    const oldTextbookUrl = `/v1${courseUrl}`

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit(courseUrl)
      cy.get(bannerSelector).should('be.visible')
      cy.get(bannerSelector).should('have.attr', 'href', oldTextbookUrl)
    })
  })
})

describe('New textbook version banner', () => {
  it('links to version 2 of same course', () => {
    const bannerSelector = '[data-test=qiskit-banner-old-textbook-version] a'
    const newTextbookUrl = '/course/ch-states'
    const courseUrl = `/v1${newTextbookUrl}`

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit(courseUrl)
      cy.get(bannerSelector).should('be.visible')
      cy.get(bannerSelector).should('have.attr', 'href', newTextbookUrl)
    })
  })
})
