/// <reference types="cypress" />

const sitemapJson = require('../../public/sitemap.json')
const sitemapUrlsDefaultBase = 'qiskit.org'

const urlsFromSitemap = sitemapJson.urlset.url
    .filter(({ loc }) => loc[0].includes('/course'))
    .map(({ loc }) => {
      const url = loc[0]
      const relativeUrl = url.substring(
        url.indexOf(sitemapUrlsDefaultBase) + sitemapUrlsDefaultBase.length
      )
      return relativeUrl
    })

describe('All pages', () => {
  it('are accounted for', () => {
    cy.request('courseList/').then((response) => {
      const courseList = response.body
      const courseUrls = []
      courseList.forEach(({ sections }) => {
        sections.forEach(({ pageUrl }) => {
          courseUrls.push(pageUrl)
        })
      })
      const urlsFromCourseList = [...new Set(courseUrls)]

      // make sure course list from sitemap matches course list from API
      urlsFromCourseList.sort()
      urlsFromSitemap.sort()
      expect(urlsFromCourseList).to.deep.eq(urlsFromSitemap)
    })
  })

  urlsFromSitemap.forEach((url, i) => {
    it(`should retrieve and no mathjax error: ${url}`, () => {
      cy.request(url).as(`req${i}`)

      cy.get(`@req${i}`).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).not.to.include('mjx-merror')
      })
    })
  })
})
