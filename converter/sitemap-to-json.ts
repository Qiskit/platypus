import * as fs from 'fs'
import { parseString } from 'xml2js'

/**
 * Generates a sitemap.json file from a sitemap.xml file.
 * @param {string} sitemapXmlPath - The path to the sitemap.xml file.
 * @param {string} sitemapJsonPath - The path to the output sitemap.json file.
 */
function generateJsonSitemap (
  sitemapXmlPath: string,
  sitemapJsonPath: string
) : Promise<void> {
  return new Promise((resolve, reject) => {
    fs.readFile(sitemapXmlPath, 'utf8', (err, sitemapXml) => {
      if (err) {
        reject(err)
      } else {
        parseString(sitemapXml, (err, sitemapJson) => {
          if (err) {
            reject(err)
          }

          fs.writeFile(
            sitemapJsonPath,
            JSON.stringify(sitemapJson, null, 2),
            (err) => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
        })
      }
    })
  })
}

export default generateJsonSitemap
