import { spawn } from 'child_process'
import * as path from 'path'

import * as fs from 'fs-extra'

const CWD = process.cwd()
const nbImagesDirName = 'images'

const sharedContent = `${CWD}/shared`
const nbDir = `${CWD}/notebooks`
const nbDirJa = `${CWD}/notebooks/translations/ja`
const tocPath = `${nbDir}/toc.yaml`
const tocPathJa = `${nbDir}/toc-ja.yaml`
const workingDir = `${CWD}/working`
const workingDirTranslations = `${CWD}/translations`
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

const subprocess = runConverter(tocPath, nbDir, workingDir)
const subprocessTranslations = runConverter(tocPathJa, nbDirJa, workingDirTranslations)

subprocess.stdout.on('data', (data) => {
  console.log(`${data}`)
});
subprocess.stderr.on('data', (data) => {
  console.error(`${data}`)
});
subprocess.on('close', async () => {
  console.log('textbook converter: Closed')
})
