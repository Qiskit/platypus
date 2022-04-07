import { spawn } from 'child_process'
import * as path from 'path'

import * as fs from 'fs-extra'

import {
  translationsLanguages,
  workingContentPath,
  workingTranslationsPath
} from './common'

const CWD = process.cwd()
const nbImagesDirName = 'images'
const nbResourcesDirName = 'resources'
const nbDir = path.join(CWD, 'notebooks')
const nbDirTranslations = path.join(CWD, 'translations')

const getNotebookPath = function (language: string = 'en') {
  return language == 'en' ? nbDir : path.join(nbDirTranslations, language)
}

const getTOCPath = function (language: string = 'en') {
  return path.join(getNotebookPath(language), 'toc.yaml')
}

const getWorkingPath = function (language: string = 'en') {
  return language == 'en' ? workingContentPath : path.join(workingTranslationsPath, language)
}

const copyNotebookAssets = function (
  srcDir: string, destDir: string, filterFunc: CallableFunction
) {
  console.log(`textbook converter: Copying assets from ${srcDir}`)

  fs.copySync(srcDir, destDir, {
    filter: (src: string, dest: string) => {
      const name = path.basename(src)
      if (name.startsWith('.')) {
        return false
      } else if (fs.statSync(src).isDirectory()) {
        return true
      } else {
        return filterFunc(src, dest)
      }
    }
  })
}

const runConverter = function (
  tocPath: string,
  nbPath: string,
  outPath: string
) {
  console.log('textbook converter', arguments)

  const converterPath = path.join(CWD, 'converter', 'textbook-converter')

  // TODO: replace converter Python implementation with a Node.js implementation
  return spawn('python3', [
    '-u', '-m',
    'textbook_converter', tocPath,
    '-n', nbPath,
    '-o', outPath
  ], {
    cwd: converterPath
  })
}

const clean = function () {
  // Ensure that the directories containing the md files are empty
  fs.emptyDirSync(workingContentPath)
  fs.emptyDirSync(workingTranslationsPath)
}

const prepare = function (language: string) {
  const notebooks = getNotebookPath(language)
  const working = getWorkingPath(language)

  const notebooksShared = path.join(notebooks, 'shared')
  const workingShared = path.join(working, 'shared')

  // copy over `shared/`
  if (fs.existsSync(notebooksShared)) {
    fs.copySync(notebooksShared, workingShared)
  } else {
    // default to English if doesn't exist
    const shared = path.join(getNotebookPath('en'), 'shared')
    fs.copySync(shared, workingShared)
  }

  // copy over notebook `images/`
  copyNotebookAssets(notebooks, working, (src: string, dest: string) => {
    return path.dirname(src).split(path.sep).indexOf(nbImagesDirName) > -1
  })

  // copy over notebook `resources/`
  copyNotebookAssets(notebooks, working, (src: string, dest: string) => {
    return path.dirname(src).split(path.sep).indexOf(nbResourcesDirName) > -1
  })
}

const convert = function (language: string) {
  // run Python converter package
  const subprocess = runConverter(
    getTOCPath(language),
    getNotebookPath(language),
    getWorkingPath(language)
  )

  subprocess.stdout.on('data', (data) => {
    console.log(`textbook converter [${language}]: ${data}`)
  });
  subprocess.stderr.on('data', (data) => {
    console.error(`textbook converter [${language}]: ${data}`)
  });
  subprocess.on('close', () => {
    console.log(`textbook converter [${language}]: completed`)
  })
}

const run = function () {
  // run conversion for each available language

  const notebooks = getNotebookPath()
  const working = getWorkingPath()
  const workingShared = path.join(working, 'shared')

  // copy toc.yaml
  copyNotebookAssets(notebooks, workingShared, (src: string, dest: string) => {
    return src.includes('toc.yaml')
  })

  translationsLanguages.forEach(language => {
    prepare(language)
    convert(language)
  })
}

clean()
run()
