/// <reference types="cypress" />

const viewports = ['ipad-2', 'iphone-x', 'macbook-15']

function terminalLog (violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

describe('Accessibility', () => {
  it('has no detectable violations on load', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')

      // Ensure the DOM is fully loaded
      cy.get('[data-test=textbook-page]')

      cy.injectAxe()
      cy.checkA11y(null, null, terminalLog)
    })
  })
})
