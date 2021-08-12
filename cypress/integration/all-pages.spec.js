/// <reference types="cypress" />

describe('All pages', () => {
  const sitemapJson = require('../../public/sitemap.json')
  const sitemapUrlsDefaultBase = 'qiskit.org'

  const urls = sitemapJson.urlset.url.map(({ loc }) => {
    const url = loc[0]

    const relativeUrl = url.substring(
      url.indexOf(sitemapUrlsDefaultBase) + sitemapUrlsDefaultBase.length
    )

    return relativeUrl
  })

  urls.forEach((url) => {
    it(`should load ${url}`, () => {
      cy.visit(url)
    })
  })
})
