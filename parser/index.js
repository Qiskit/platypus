// =============================================================================
// Textbooks Parser Gulp Plugin
// (c) Mathigon
// =============================================================================


const path = require('path');
const through2 = require('through2');

const {parse, parseSimple} = require('./src/parser');
const {getAudioTimings, writeAudioTimings, extractText} = require('./src/audio');
const {loadFile, textHash, warning, createFile, loadFromCache, writeToCache} = require('./src/utilities');
const {loadYAML} = require('./src/yaml');


async function combineData(name, parsed, dest, courseId, textField, locale) {
  const missing = [];
  const data = await loadYAML(dest + 'shared', name + '.yaml', textField, locale);
  const obj = {};

  for (let id of parsed) {
    if (id in data) {
      obj[id] = data[id];
    } else {
      missing.push(id);
    }
  }

  if (locale === 'en' && missing.length) {
    warning(`  Missing ${name}: ${missing.join(', ')}`);
  }

  return createFile(dest, `${courseId}/${name}_${locale}.json`, JSON.stringify(obj));
}

async function generate(content, base, id, locale, outputCHTML) {
  const {bios, gloss, data, mathjaxStyles} = await parse(id, content, base, locale, outputCHTML);
  const dest = path.join(base, '../');

  const biosFile = await combineData('bios', bios, dest, id, 'bio', locale);
  const glossFile = await combineData('glossary', gloss, dest, id, 'text', locale);

  const quizObj = await loadYAML(base, 'quiz.yaml', 'text,choices,hints', locale);
  const quizFile = createFile(dest, `${id}/quiz_${locale}.json`, JSON.stringify(quizObj));

  const courseHints = await loadYAML(base, 'hints.yaml', '*', locale);
  const globalHints = await loadYAML(dest + 'shared', 'hints.yaml', '*', locale);
  const hintsObj = Object.assign({}, globalHints, courseHints);
  const hintsFile = createFile(dest, `${id}/hints_${locale}.json`, JSON.stringify(hintsObj));

  const dataFile = createFile(dest, `${id}/data_${locale}.json`, JSON.stringify(data));
  if (mathjaxStyles) {
    const stylesFiles = createFile(dest, `${id}/mathjax_styles.css`, mathjaxStyles);
    return [dataFile, biosFile, glossFile, hintsFile, quizFile, stylesFiles];
  } else {
    return [dataFile, biosFile, glossFile, hintsFile, quizFile];
  }
}

module.exports.gulp = (languages = ['en'], cacheFile = '', outputCHTML = false) => {
  return through2.obj(async function (file, _, next) {
    const id = file.basename;

    const promises = [];
    const locales = [];

    for (let locale of languages) {
      const content = loadFile(file.path, 'content.md', locale);
      if (!content) continue;

      const hash = textHash(content);
      if (loadFromCache(cacheFile, id + '-' + locale) === hash) continue;

      locales.push(locale);
      const promise = generate(content, file.path, id, locale, outputCHTML)
          .catch((error) => {
            warning(`  Failed to parse ${id} [${locale}]:`, error.message);
            return [];
          })

      promise.then(() => writeToCache(cacheFile, id + '-' + locale, hash));
      promises.push(promise);
    }

    if (locales.length) console.log(`>> Parsing ${id} [${locales.join(', ')}]`);

    const fileSets = await Promise.all(promises);
    for (const files of fileSets) {
      for (const f of files) this.push(f);
    }

    next();
  });
};

module.exports.parseFull = parse;
module.exports.parseSimple = parseSimple;
module.exports.loadYAML = loadYAML;
module.exports.getAudioTimings = getAudioTimings;
module.exports.writeAudioTimings = writeAudioTimings;
module.exports.extractText = extractText;
module.exports.textHash = textHash;
