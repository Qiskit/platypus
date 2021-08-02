import { spawn } from 'child_process'
import * as path from 'path'

import * as fs from 'fs-extra'
import { load as loadYAML } from 'js-yaml'

const CWD = process.cwd()

// Get the languages to translate from the mathigon config file or throw an error
let translationsLanguages

try {
  const mathigonConfigFile: any = loadYAML(fs.readFileSync(`${CWD}/config.yaml`, 'utf8'))
  const textbookLanguages = mathigonConfigFile.locales
  translationsLanguages = textbookLanguages.filter(language => language !== 'en')
} catch (e) {
  console.log(e)
}

const nbImagesDirName = 'images'

const sharedContent = `${CWD}/shared`
const nbDir = `${CWD}/notebooks`
const nbDirTranslations = `${CWD}/notebooks/translations/`
const getTOCPath = function (language?: string) {
  return language ? `${nbDir}/toc-${language}.yaml` : `${nbDir}/toc.yaml`
}
const workingDir = `${CWD}/working`
const translationsDir = `${CWD}/translations/`
const sharedWorking = `${workingDir}/shared`
const publicDir = `${CWD}/public`
const publicContentDir = `${publicDir}/content`

const runConverter = function (
  tocPath: string,
  nbDir: string,
  outDir: string
) {
  console.log('textbook converter', arguments)

  // TODO: replace converter Python implementation with a Node.js implementation
  // python3 -u -m textbook_converter /Users/yaiza/Documents/development/platypus/notebooks/toc-ja.yaml -n /Users/yaiza/Documents/development/platypus/notebooks/translations/ja -o /Users/yaiza/Documents/development/platypus/translations
  return spawn('python3', [
    '-u', '-m',
    'textbook_converter', tocPath,
    '-n', nbDir,
    '-o', outDir
  ], {
    cwd: `${CWD}/converter/textbook-converter`
  })
}

const copyNotebookAssets = function(
  srcDir: string, destDir: string, filterFunc: CallableFunction
) {
  console.log(`textbook converter: Copying assets from ${srcDir}`)
  fs.copySync(srcDir, destDir, { filter: (src: string, dest: string) => {
    const name = path.basename(src)
    if (name.startsWith('.')) {
      return false
    } else if (fs.statSync(src).isDirectory()) {
      return true
    } else {
      return filterFunc(src, dest)
    }
  }})
}

// const convertNotations = async function() {
//   console.log('textbook converter: Parsing notations')
//   const notations = await parseYAML(sharedWorking, 'notations.yaml', 'en', 'meaning')
//   return fs.outputJson(`${publicDir}/notations.json`, notations)
// }

fs.emptyDirSync(workingDir)
// copy existing markdown & shared content
fs.copySync(sharedContent, sharedWorking)
// copy notebook images
copyNotebookAssets(nbDir, publicContentDir, (src: string, dest: string) => {
  return path.dirname(src).split(path.sep).indexOf(nbImagesDirName) > -1
})

const subprocess = runConverter(getTOCPath(), nbDir, workingDir)
translationsLanguages.forEach(language => runConverter(getTOCPath(language), `${nbDirTranslations}${language}`, `${translationsDir}${language}`))

subprocess.stdout.on('data', (data) => {
  console.log(`${data}`)
});
subprocess.stderr.on('data', (data) => {
  console.error(`${data}`)
});

subprocess.on('close', async () => {
  console.log('textbook converter: Closed')
})

