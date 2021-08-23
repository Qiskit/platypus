/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (on, config) => {
  on('task', {
    log (message) {
      // eslint-disable-next-line no-console
      console.log(message)

      return null
    },
    table (message) {
      // eslint-disable-next-line no-console
      console.table(message)

      return null
    }
  })
}
