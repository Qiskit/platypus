import 'cypress-wait-until'

Cypress.Commands.add('setCookies', () => {
  cy.setCookie('cmapi_cookie_privacy', 'permit_1|2|3')
    .setCookie('cmapi_gtm_bl', '')
    .setCookie('notice_gdpr_prefs', '0|1|2:')
    .setCookie('notice_preferences', '2:')
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  cy.waitUntil(() => cy.setCookies())
  cy.waitUntil(() => originalFn(url, options))
})
