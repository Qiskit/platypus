// =============================================================================
// Audio Narration Utilities
// (c) Mathigon
// =============================================================================


const fs = require('fs');
const yaml = require('yamljs');
const {textHash} = require('./utilities');


function getAudioTimings(directory, locale='en') {
  const file = `${directory}/audio/timings_${locale}.yaml`;
  const source = (fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '');
  return yaml.parse(source) || {};
}

function writeAudioTimings(timings, directory, locale='en') {
  if (!fs.existsSync(`${directory}/audio`)) fs.mkdirSync(`${directory}/audio`);
  const file = `${directory}/audio/timings_${locale}.yaml`
  fs.writeFileSync(file, yaml.dump(timings));
}

// -----------------------------------------------------------------------------

function extractText(el) {
  if (el.nodeName === '#text') {
    return el.textContent.replace(/(\n|\s+)/g, ' ').replace(/×/g, ' times ')
        .replace(/−/g, ' minus ');
  }

  if (el.hasAttribute('data-voice')) {
    // Make sure allsingle-letter variables (surrounded by _s) are spelled out.
    return el.getAttribute('data-voice')
        .replace(/_(\w)_/g, '<say-as interpret-as="spell-out">$1</say-as>')
  }

  if (el.classList.contains('no-voice')) return '';
  if (el.classList.contains('next-step')) return '';
  if (el.tagName === 'BR') return ', ';

  // TODO Read blank options or correct solution
  if (['X-BLANK', 'X-BLANK-INPUT'].includes(el.tagName)) return 'blank';

  // TODO Read correct value of variables
  if (el.tagName === 'X-VAR') return el.getAttribute('bind').split('|')[1];
  if (el.classList.contains('var')) return 'variable';

  return Array.from(el.childNodes).map(c => extractText(c)).join('');
}

// -----------------------------------------------------------------------------

function makeSentence(doc, paragraph, child) {
  let sentence = doc.createElement('span');
  sentence.classList.add('sentence');
  paragraph.insertBefore(sentence, child);
  return sentence;
}

function splitIntoSentences(doc, paragraph, timings, nested = false) {
  // TODO Support paragraphs inside slideshows and algebra flows.
  let parent = paragraph;
  while (parent) {
    if (['X-ALGEBRA-FLOW', 'X-SLIDESHOW'].includes(parent.tagName)) return;
    parent = parent.parentNode
  }

  // TODO Fix things like "e.g."

  const sentences = [];
  let sentence = undefined;

  const startSentence = (child) => {
    if (!sentence) {
      sentence = makeSentence(doc, paragraph, child);
      sentences.push(sentence);
    }
  };

  for (const child of Array.from(paragraph.childNodes)) {
    if (child.nodeName === '#comment') continue;
    if (child.nodeName === '#text') {
      let text = child.textContent || '';

      // Deal with sentences that end with an inline element (e.g. .no-break)
      const last = sentence ? sentence.textContent : '';
      if (text[0] === ' ' && '.:?!'.includes(last[last.length - 1])) {
        startSentence(child);
        sentence.appendChild(doc.createTextNode(' '));
        text = text.slice(1);
        sentence = undefined;  // Start new sentence.
      }

      // Split text nodes into multiple sentences
      let i = -1;
      while ((i = text.search(/[.:?!]\s/)) >= 0) {
        startSentence(child);
        sentence.appendChild(doc.createTextNode(text.slice(0, i + 2)));
        text = text.slice(i + 2);
        sentence = undefined;  // Start new sentence.
      }

      // Remaining text
      if (text) {
        startSentence(child);
        sentence.appendChild(doc.createTextNode(text));
      }
      child.parentNode.removeChild(child);

    } else if (child.classList.contains('reveal')) {
      splitIntoSentences(doc, child, timings, true);
      sentence = undefined;  // Start new sentence.

    } else if (child.tagName === 'BR') {
      sentence = undefined;  // Start new sentence.

    } else {
      startSentence(child);
      sentence.appendChild(child);
    }
  }

  // Add correct audio timing attributes
  for (const sentence of sentences) {
    const t = timings[textHash(extractText(sentence).trim())];
    if (t) sentence.setAttribute('data-timings', `${t.start}-${t.end}`);
  }

  // Add class to parent <p>, only if there is a valid child sentence.
  if (!nested && paragraph.querySelectorAll('[data-timings]').length) {
    paragraph.classList.add('voice');
  }
}

function addNarrationTags(doc, directory, locale) {
  // TODO Support narrations for other languages.
  if (locale !== 'en') return;

  const timings = getAudioTimings(directory, locale);
  const el = doc.querySelectorAll('p:not(.caption):not(.todo):not(.no-voice), li:not(.no-voice), .voice');
  const paragraphs = Array.from(el).filter(p => p.textContent.trim());
  for (const p of paragraphs) splitIntoSentences(doc, p, timings);
}

// -----------------------------------------------------------------------------

module.exports.getAudioTimings = getAudioTimings;
module.exports.writeAudioTimings = writeAudioTimings;
module.exports.extractText = extractText;
module.exports.addNarrationTags = addNarrationTags;
