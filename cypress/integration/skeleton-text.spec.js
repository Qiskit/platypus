/// <reference types="cypress" />

describe('SkeletonText', () => {
  it('Can render while page is loading', () => {
    const viewports = ['ipad-2', 'macbook-15']
    const sidebarSkeletonText = '[data-test=sidebar-chapters-loading]'
    const pageSkeletonText = '[data-test=textbook-page-loading]'

    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(sidebarSkeletonText).should('be.visible')
      cy.get(pageSkeletonText).should('be.visible')

      cy.wait(2000)

      cy.get(sidebarSkeletonText).should('be.not.visible')
      cy.get(pageSkeletonText).should('be.not.visible')
    })
  })
})
