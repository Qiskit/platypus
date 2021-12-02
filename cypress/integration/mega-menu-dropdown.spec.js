/// <reference types="cypress" />

describe('Mega menu dropdown', () => {
  const originRegex = /(.*?:\/\/.*?\/)/
  const sitemapJson = require('../../public/sitemap.json')
  const sitemapUrls = sitemapJson.urlset.url.map(({ loc }) => {
    return loc[0].replace(originRegex, '')
  })

  it('can be opened', () => {
    const megaMenuDropdownSelector = '[data-test=content-menu-dropdown]'
    const megaMenuDropdownContentSelector =
    '[data-test=content-menu-dropdown] .app-mega-dropdown__content-container'

    cy.viewport('macbook-15')
    cy.visit('/course/ch-prerequisites')
    cy.get(megaMenuDropdownContentSelector).should('not.exist')

    cy.get(megaMenuDropdownSelector).click()
    cy.get(megaMenuDropdownSelector).should('be.visible')
    cy.get(megaMenuDropdownContentSelector).should('be.visible')
  })

  it('should contain correct links', () => {
    // find all links in megamenu
    cy.get('q-content-menu a').each((link) => {
      // skip the titles
      if (!link.attr('class').includes('link_title')) {
        const url = link.attr('href').replace(originRegex, '')
        // url should match what is in the sitemap
        expect(url).to.be.oneOf(sitemapUrls)
      }
    })
  })
})
