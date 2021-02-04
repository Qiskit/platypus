// =============================================================================
// Textbooks Parser Utilities
// (c) Mathigon
// =============================================================================


const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const File = require('vinyl');


function warning(...msg) {
  console.warn('\x1b[31m', ...msg, '\x1b[0m');
}

function $$(el, query) {
  return Array.from(el.querySelectorAll(query));
}

function safeReadFile(file, fallback = '') {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : fallback;
}

function safeWriteFile(file, content) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
  return fs.writeFileSync(file, content);
}

function createFile(dest, name, content) {
  return new File({
    base: dest,
    path: path.join(dest, name),
    contents: Buffer.from(content)
  });
}

function loadFile(root, name, locale) {
  if (locale !== 'en') root = root.replace('/content/', `/translations/${locale}/`);
  return safeReadFile(path.join(root, name));
}

function textHash(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

function loadFromCache(cacheFile, id) {
  return cacheFile && JSON.parse(safeReadFile(cacheFile, '{}'))[id];
}

function writeToCache(cacheFile, id, hash) {
  if (!cacheFile) return;
  const json = JSON.parse(safeReadFile(cacheFile, '{}'));
  json[id] = hash;
  safeWriteFile(cacheFile, JSON.stringify(json));
}


module.exports.safeReadFile = safeReadFile;
module.exports.safeWriteFile = safeWriteFile;
module.exports.warning = warning;
module.exports.createFile = createFile;
module.exports.loadFile = loadFile;
module.exports.textHash = textHash;
module.exports.loadFromCache = loadFromCache;
module.exports.writeToCache = writeToCache;
module.exports.$$ = $$;
