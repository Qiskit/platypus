// =============================================================================
// Textbooks Parser Utilities
// (c) Mathigon
// =============================================================================


const yaml = require('yamljs');
const {parseSimple} = require('./parser');
const {loadFile} = require('./utilities');

const YAML_CACHE = new Map();


function replaceMarkdown(data) {
  // If data is an array, we replace all items in the array.
  if (Array.isArray(data)) {
    return Promise.all(data.map(x => parseSimple(x)));
  } else {
    return parseSimple(data);
  }
}

async function parseYAML(data, markdownFields) {
  if (markdownFields === '*') {
    // Hints: we replace all top-level values
    for (const key of Object.keys(data)) {
      data[key] = await replaceMarkdown(data[key]);
    }
  } else if (markdownFields) {
    // Bio, Gloss and Quiz: we loop over all object and replace specific fields.
    for (const obj of Object.values(data)) {  // data can be an object or array!
      for (const field of markdownFields.split(',')) {
        obj[field] = obj[field] ? await replaceMarkdown(obj[field]) : '';
      }
    }
  }
}

async function loadYAML(base, name, markdownFields, locale = 'en') {
  const id = base + '-' + name + '-' + locale;
  if (YAML_CACHE.has(id)) return YAML_CACHE.get(id);

  const text = loadFile(base, name, locale);
  const data = text ? yaml.parse(text) || {} : {};
  await parseYAML(data, markdownFields);

  if (locale !== 'en') {
    const fallback = await loadYAML(base, name, markdownFields, 'en');
    for (let d of Object.keys(fallback)) {
      if (!data[d]) data[d] = fallback[d];
    }
  }

  YAML_CACHE.set(id, data);
  return data;
}

module.exports.loadYAML = loadYAML;
