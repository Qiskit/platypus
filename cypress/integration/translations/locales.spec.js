/// <reference types="cypress" />

describe('Language Selector Macbook-15', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
      .visit('/course/ch-prerequisites/introduction-to-python-and-jupyter-notebooks')

      // set cookies to prevent IBM privacy policy popup
      .setCookie('cmapi_cookie_privacy', 'permit_1|2|3')
      .setCookie('cmapi_gtm_bl', '')
      .setCookie('notice_gdpr_prefs', '0|1|2:')
      .setCookie('notice_preferences', '2:')

      .reload()
  })

  it('Can select a non-English, translated language', () => {
    // navigate to page w/ translations
    cy.url().should('include', '/ch-prerequisites/introduction-to-python-and-jupyter-notebooks')
    // select Japanese
    cy.get('.language-selector__dropdown').shadow().find('.bx--list-box__field').click()
    cy.get('.language-selector__dropdown > .language-selector__item').contains('Japanese').click()

    cy.url().should('include', '?hl=ja')
    cy.get('.language-selector__dropdown')
      .shadow()
      .find('#trigger-label')
      .should('have.text', 'Japanese')

    // lang attribute
    cy.get('html').should('have.attr', 'lang', 'ja')
  })

  it('Can select the English version', () => {
    // navigate to page w/ translations
    cy.url().should('include', '/ch-prerequisites/introduction-to-python-and-jupyter-notebooks')
    // // select English
    cy.get('.language-selector__dropdown').shadow().find('.bx--list-box__field').click()
    cy.get('.language-selector__dropdown > .language-selector__item').contains('English').click()

    cy.url().should('not.include', '?hl')
    cy.get('.language-selector__dropdown')
      .shadow()
      .find('#trigger-label')
      .should('have.text', 'English')

    // lang attribute
    cy.get('html').should('have.attr', 'lang', 'en')
  })

  it('Can render translate toggle button properly', () => {
    // navigate to page w/ translations
    cy.url().should('include', '/ch-prerequisites/introduction-to-python-and-jupyter-notebooks')

    // hide index
    cy.get('#app-panel-footer-toggle').click()
    cy.get('.language-selector').should('not.be.visible')
    cy.get('#app-panel-language-toggle').should('be.visible')
  })

  it('Can show LanguageSelector options when translate toggle button is clicked', () => {
    // navigate to page w/ translations
    cy.url().should('include', '/ch-prerequisites/introduction-to-python-and-jupyter-notebooks')

    // hide index
    cy.get('#app-panel-footer-toggle').click()
    cy.get('#app-panel-language-toggle').should('be.visible')
    // show index
    cy.get('#app-panel-language-toggle').click()
    cy.get('.language-selector').should('be.visible')

    cy.get('.language-selector__dropdown > .language-selector__item').contains('English').should('be.visible')
    cy.get('.language-selector__dropdown > .language-selector__item').contains('Japanese').should('be.visible')
  })
})
