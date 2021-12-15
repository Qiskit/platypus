/// <reference types="cypress" />

const sitemapJson = require('../../public/sitemap.json')
const sitemapUrlsDefaultBase = 'qiskit.org'

const urls = sitemapJson.urlset.url.map(({ loc }) => {
  const url = loc[0]

  const relativeUrl = url.substring(
    url.indexOf(sitemapUrlsDefaultBase) + sitemapUrlsDefaultBase.length
  )

  return relativeUrl
}).splice(1) // skip root (which redirects to learn.qiskit.org)

const start = 2 * Math.floor(urls.length / 3)
const stop = urls.length

describe('All pages - 3', () => {
  urls.slice(start, stop).forEach((url) => {
    it(`should load ${url}`, () => {
      cy.visit(url)
    })

    it(`mathjax doesn't generate an error in ${url}`, () => {
      cy.get('mjx-merror').should('not.exist')
    })
  })
})
