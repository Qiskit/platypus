// =============================================================================
// MathJax Parser Utilities
// (c) Mathigon
// =============================================================================


const entities = require('html-entities');
const mathjax = require('mathjax');
const {safeReadFile, safeWriteFile, warning} = require('./utilities');

const cacheFile = 'build/.mathjax-cache';
const mathJaxStore = JSON.parse(safeReadFile(cacheFile, '{}'));


const placeholders = {};
let placeholderCount = 0;
let promise = undefined;

module.exports.makeTexPlaceholder = function(code, isInline = false) {
  const id = entities.decode(code) + (isInline || false);
  if (id in mathJaxStore) return mathJaxStore[id];

  const placeholder = `XEQUATIONX${placeholderCount++}XEQUATIONX`;
  placeholders[placeholder] = [code, isInline];
  return placeholder;
};

async function texToSvg(code, isInline) {
  const id = entities.decode(code) + (isInline || false);
  if (mathJaxStore[id]) return mathJaxStore[id];

  if (!promise) promise = mathjax.init({
    loader: {load: ['input/tex-full', 'output/svg']},
    svg: {}  // http://docs.mathjax.org/en/latest/options/output/svg.html#the-configuration-block
  });

  let output = '';

  try {
    const MathJax = await promise;
    const svg = await MathJax.tex2svg(code, {display: !isInline});
    output = MathJax.startup.adaptor.innerHTML(svg)
        .replace('role="img" focusable="false"', 'class="mathjax"')
        .replace(/ xmlns(:xlink)?="[^"]+"/g, '')
        .replace('<defs>', `<title>${entities.encode(code).trim()}</title><defs>`);
  } catch(e) {
    warning(`  MathJax Error: ${e.message} at "${code}"`);
  }

  mathJaxStore[id] = output;
  safeWriteFile(cacheFile, JSON.stringify(mathJaxStore));
  return output;
}

async function texToHtml(code, isInline) {
  const id = entities.decode(code) + (isInline || false);
  if (mathJaxStore[id]) {
    return {
      html: mathJaxStore[id],
      styles: mathJaxStore[`${id}-styles`]
    };
  }

  if (!promise) promise = mathjax.init({
    loader: {load: ['input/tex-full', 'output/chtml']},
    // https://docs.mathjax.org/en/latest/options/output/chtml.html#the-configuration-block
    chtml: {
      adaptiveCSS: false,
      fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/output/chtml/fonts/woff-v2'
    }
  });

  let output = '';
  let styles = ''

  try {
    const MathJax = await promise;
    adaptor = MathJax.startup.adaptor;

    const html = await MathJax.tex2chtml(code, {display: false});
    output = adaptor.outerHTML(html);
    styles = adaptor.textContent(MathJax.chtmlStylesheet());
  } catch(e) {
    warning(`  MathJax Error: ${e.message} at "${code}"`);
  }

  mathJaxStore[id] = output;
  mathJaxStore[`${id}-styles`] = styles;
  safeWriteFile(cacheFile, JSON.stringify(mathJaxStore));
  return [output, styles];
}

module.exports.fillTexPlaceholders = async function(doc, outputCHTML = false) {
  const matches = doc.match(/XEQUATIONX[0-9]+XEQUATIONX/g) || [];
  let styles = ''
  for (const placeholder of matches) {
    let code = ''
    if (outputCHTML) {
      result = await texToHtml(...placeholders[placeholder]);
      code = result[0];
      if (!styles) styles = result[1];
    } else {
      code = await texToSvg(...placeholders[placeholder]);
    }
    doc = doc.replace(placeholder, code);
  }
  return [doc, styles];
};
