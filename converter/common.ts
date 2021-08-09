import * as path from 'path'

import * as fs from 'fs-extra'
import { load as loadYAML } from 'js-yaml'

const CWD = process.cwd()

// Get the languages to translate from the mathigon config file or throw an error
let translationsLanguages: Array<string>

try {
  const configFile = path.join(CWD, 'config.yaml')
  const mathigonConfigFile: any = loadYAML(fs.readFileSync(configFile, 'utf8'))
  translationsLanguages = mathigonConfigFile.locales
} catch (e) {
  console.error(e)
  translationsLanguages = ['en']
}

const workingContentPath = path.join(CWD, 'working', 'content')
const workingTranslationsPath = path.join(CWD, 'working', 'translations')

export {
  translationsLanguages,
  workingContentPath,
  workingTranslationsPath
}
