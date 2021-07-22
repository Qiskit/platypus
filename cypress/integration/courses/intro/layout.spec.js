/// <reference types="cypress" />

describe('Layout Macbook-15', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('http://localhost:8080/course/introduction/why-quantum-computing')

      .setCookie('cmapi_cookie_privacy', 'permit_1|2|3')
      .setCookie('cmapi_gtm_bl', '')
      .setCookie('notice_gdpr_prefs', '0|1|2:')
      .setCookie('notice_preferences', '2:')

      .reload()
  })

  it('should hide then show navigation sidebar', () => {
    cy.get('.c-sidebar__chapter').should('be.visible')

    cy.get('#app-panel-footer-toggle').click()

    cy.get('.c-sidebar__chapter').should('not.be.visible')
  })

  it('Glossary side bar', () => {
    cy.get('.utility-panel-content').should('be.visible')

    cy.get('.utility-panel-header__toggle').click()

    cy.get('.utility-panel-content').should('not.be.visible')
  })

  it('should open Browse all content', () => {
    cy.get('.app-mega-dropdown').should('be.visible')
    cy.get('.app-mega-dropdown__content-container').should('not.exist')

    cy.get('.app-mega-dropdown').click()

    cy.get('.app-mega-dropdown').should('be.visible')
    cy.get('.app-mega-dropdown__content-container').should('be.visible')
  })

  it('Navigate to atoms of computation', () => {
    cy.url().should('include', '/introduction/why-quantum-computing')
    cy.get('[data-section-id="the-atoms-of-computation"]').click()
    cy.url().should('include', '/introduction/the-atoms-of-computation')
  })
})
