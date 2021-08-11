/// <reference types="cypress" />

const urls = []

before(() => {
  cy.readFile('public/sitemap.xml').then((sitemapAsString) => {
    const domParser = new DOMParser()

    const sitemapParsed = domParser.parseFromString(
      sitemapAsString,
      'application/xml'
    )

    const sitemapUrls = sitemapParsed.getElementsByTagName('loc')

    for (const sitemapUrl of sitemapUrls) {
      const sitemapUrlsDefaultBase = 'qiskit.org'
      const url = sitemapUrl.innerHTML

      const relativeUrl = url.substring(
        url.indexOf(sitemapUrlsDefaultBase) + sitemapUrlsDefaultBase.length
      )

      urls.push(relativeUrl)
    }
  })
})

describe('Every page', () => {
  it('loads', () => {
    urls.forEach((url) => {
      cy.request('GET', url, { responseTimeout: 3000 })
        .then((response) => {
          expect(response.status).to.eq(200)
        })
    })
  })
})
