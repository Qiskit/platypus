/// <reference types="cypress" />

const viewports = ['ipad-2', 'iphone-x', 'macbook-15']

describe('Content', () => {
  it('text is readable', () => {
    viewports.forEach((viewport) => {
      const contentParagraphSelector = 'x-step p'

      cy.viewport(viewport)
      cy.visit('/course/ch-prerequisites')
      cy.get(contentParagraphSelector).each(($paragraph) => {
        if ($paragraph.text().trim().length > 0) {
          expect($paragraph).to.be.visible

          cy.get($paragraph)
            .invoke('css', 'font-size')
            .then(parseInt)
            .then((fontSize) => {
              expect(fontSize).to.be.at.least(14)
            })
        }
      })
    })
  })
})
