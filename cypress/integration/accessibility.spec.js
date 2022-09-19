/// <reference types="cypress" />

const viewports = ['macbook-15', 'ipad-2', 'iphone-x']

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
  violations.forEach((violation) => {
    cy.task('log', violation)
  })

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
      cy.checkA11y(
        null,
        {
          rules: {
            'aria-input-field-name': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2064
            'aria-required-children': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2065
            'html-has-lang': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2066
            label: { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2067
            'landmark-one-main': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2068
            'landmark-unique': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2069
            'link-name': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2070
            list: { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2071
            'page-has-heading-one': { enabled: false }, // TODO: https://github.com/Qiskit/qiskit.org/issues/2072
            region: { enabled: false } // TODO: https://github.com/Qiskit/qiskit.org/issues/2073
          }
        },
        terminalLog, false)
    })
  })
})
