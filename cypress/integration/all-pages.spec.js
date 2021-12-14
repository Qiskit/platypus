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
  }).splice(1) // skip root (which redirects to learn.qiskit.org)

  urls.forEach((url) => {
    it(`should load ${url}`, () => {
      cy.visit(url)
    })

    it(`mathjax doesn't generate an error in ${url}`, () => {
      cy.get('mjx-merror').should('not.exist')
    })
  })
})
