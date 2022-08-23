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
      const courseProblemSets = []
      const sitemapUrls = []

      // loop through courseList splitting problem-sets from courses
      courseList.forEach(({ url, sections }) => {
        if (url.startsWith('/problem-sets')) {
          sections.forEach(({ id }) => {
            courseProblemSets.push(id)
          })
        } else {
          sections.forEach(({ pageUrl }) => {
            courseUrls.push(pageUrl)
          })
        }
      })
      const urlsFromCourseList = [...new Set(courseUrls)]

      // loop through sitemap skipping problem-sets
      urlsFromSitemap.forEach((url) => {
        if (courseProblemSets.indexOf(url.split('/')[2]) == -1) {
          sitemapUrls.push(url)
        }
      })

      // make sure course list from sitemap matches course list from API (minus problem-sets)
      urlsFromCourseList.sort()
      sitemapUrls.sort()
      expect(urlsFromCourseList).to.deep.eq(sitemapUrls)
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
