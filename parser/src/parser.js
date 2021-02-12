// =============================================================================
// Custom MathML Parser for Mathigon Textbooks
// (c) Mathigon
// =============================================================================


const marked = require('marked');
const pug = require('pug');
const JSDom = require('jsdom').JSDOM;
const minify = require('html-minifier').minify;

const {last} = require('@mathigon/core');
const {fillTexPlaceholders} = require('./mathjax');
const {getRenderer} = require('./renderer');
const {addNarrationTags} = require('./audio');
const {warning, $$} = require('./utilities');


const minifyOptions = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true
};


module.exports.parse = async function (id, content, directory, locale='en', outputCHTML=false) {
  // Replace relative image URLs
  content = content.replace(/(url\(|src=["`]|href=["`]|background=["`]|poster=["`])images\//g,
      `$1/resources/${id}/images/`);

  // Rename special data attributes
  content = content.replace(/(when|delay|animation|duration|voice)=/g, 'data-$1=');

  // Custom Markdown Extensions
  content = blockIndentation(content);

  // Circumvent Markdown Inline escaping of \$s.
  content = content.replace(/\\\$/g, '\\\\$');

  // Add headers to tables without header
  content = content.replace(/\n\n\|(.*)\n\|(.*)\n/g, (m, row1, row2) => {
    const cols = row1.split(' | ').length;
    const header = row2.match(/^[\s|:-]+$/) ? ''
        : `|${' |'.repeat(cols)}\n|${' - |'.repeat(cols)}\n`;
    return `\n\n${header}|${row1}\n|${row2}\n`
  });

  // The |s used to separate answer options in blanks interfere with table
  // parsing. We temporarily replace them with §§, and then revert later.
  content = content.replace(/\[\[([^\]]+)]]/g, x => x.replace(/\|/g, '§§'))

  // Actually Parse the Markdown
  const lexer = new marked.Lexer();
  lexer.tokenizer.rules.block.html = /^<.*[\n]{2,}/;
  const tokens = lexer.lex(content);

  const course = {bios: new Set(), gloss: new Set(), steps: [{}], title: ''};
  const renderer = getRenderer(course, directory, locale);
  let result = marked.Parser.parse(tokens, {renderer});
  let mathjaxStyles = ''

  // Asynchronously replace all LaTeX Equation placeholders.
  result = await fillTexPlaceholders(result, outputCHTML);

  const doc = (new JSDom('<x-step>' + result[0] + '</x-step>')).window.document;
  const body = doc.body;
  if (result.length > 1 && result[1]) mathjaxStyles = result[1];

  // Parse custom element attributess
  // TODO Parse attributes for <ul> and <table>
  for (let n of nodes(body)) blockAttributes(n);

  // Add <nowrap> elements around inline-block elements.
  lineBreaks(body);

  // Parse markdown inside HTML elements with .md class
  const $md = body.querySelectorAll('.md');
  for (let i = 0; i < $md.length; ++i) {
    $md[i].classList.remove('md');
    let html = marked($md[i].innerHTML, {renderer}).replace(/^<p>|<\/p>$/g, '');
    html = await fillTexPlaceholders(html, outputCHTML);
    $md[i].innerHTML = html[0];
    if (!mathjaxStyes && html.length > 1 && html[1]) mathjaxStyles = html[1];
  }

  // Add the [parent] attribute as class to all elements parents
  const $parents = body.querySelectorAll('[parent]');
  for (let $p of $parents) {
    const classes = $p.getAttribute('parent').split(' ');
    $p.removeAttribute('parent');
    $p.parentNode.classList.add(...classes);
  }

  // Remove empty table headers
  for (let $th of body.querySelectorAll('thead')) {
    if (!$th.textContent.trim() && !$th.querySelector('.mathjax')) $th.remove();
  }

  // Box titles
  for (const $b of body.querySelectorAll('.box')) {
    if ($b.querySelector('h3, .tabs')) $b.classList.add('with-title');
  }

  // Allow setting a class attribute in the last row of a table
  for (let $td of body.querySelectorAll('td[class]')) {
    if (!$td.parentElement.textContent.trim()) {
      const $table = $td.parentElement.parentElement.parentElement;
      $table.setAttribute('class', $td.getAttribute('class'));
      $td.parentElement.remove();
    }
  }

  // Add empty alt attributes
  for (const $img of body.querySelectorAll('img:not([alt])')) {
    $img.setAttribute('alt', '');
  }

  // RTL overrides
  const LTR = 'x-geopad, x-coordinate-system, svg, x-var';
  if (locale === 'ar') {
    for (const $el of body.querySelectorAll(LTR)) {
      $el.setAttribute('dir', 'ltr');
    }
  }

  // Create sentence elements for audio narrations
  addNarrationTags(doc, directory, locale);

  const sections = extractSectionData(body, course.steps);
  const goals = course.steps.map(s => s.goals.length).reduce((a, b) => a + b);
  const data = {sections, steps: course.steps, goals, title: course.title};

  return {bios: course.bios, gloss: course.gloss, data, mathjaxStyles};
};

module.exports.parseSimple = async function (text, locale='en', outputCHTML=false) {
  const course = {bios: new Set(), gloss: new Set(), steps: [{}], title: ''};
  const renderer = getRenderer(course, '', locale, false);
  let result = marked(blockIndentation(text), {renderer});
  result = await fillTexPlaceholders(result, outputCHTML);
  const doc = (new JSDom(result[0])).window.document.body;
  for (let n of nodes(doc)) blockAttributes(n);
  lineBreaks(doc);
  return minify(doc.innerHTML, minifyOptions);
};


// -----------------------------------------------------------------------------
// Section and Step Configuration

function checkId(sectionId) {
  if (sectionId && sectionId.includes('.')) warning(`Step or section IDs cannot contain dots: ${sectionId}`);
  return sectionId ? sectionId.replace(/\./g, '') : undefined;
}

const COMPONENTS = [
  {query: 'x-blank, x-blank-input', goal: 'blank-$'},
  {query: 'x-var', goal: 'var-$'},
  {query: 'x-slider', goal: 'slider-$'},
  {query: 'x-sortable', goal: 'sortable-$'},
  {query: 'x-free-text', goal: 'free-text-$'},
  {query: '.next-step', goal: 'next-$', noAttr: true},
  {query: 'x-equation, x-equation-system', goal: 'eqn-$', exclude: 'x-equation-system x-equation'}, // Exclude equation *inside* system.

  // These components have multiple goals each, based on their children.
  {query: 'x-algebra-flow', goal: 'algebra-flow', goals: (e) => $$(e, 'ul li').slice(1).map((c, i) => 'algebra-flow-' + i)},
  {query: 'x-picker', goal: 'picker', goals: (e) => $$(e, '.item').map((c, i) => c.hasAttribute('data-error') ? '' : 'picker-' + i).filter(g => g)},
  {query: 'x-slideshow', goal: 'slide', goals: (e) => $$(e, ':scope > *:not([slot="stage"])').slice(1).map((c, i) => 'slide-' + i)},

  // For backwards-compatibility the components dont' have a -0 in their goal.
  {query: 'x-quill', goal: 'quill'},
  {query: 'x-gameplay', goal: 'gameplay'},
];

function extractSectionData(doc, steps) {
  const sections = [];

  const $steps = doc.querySelectorAll('x-step');
  for (const [i, $step] of $steps.entries()) {
    let step = steps[i];

    step.id = checkId(step.id) || 'step-' + i;
    if (steps.find((s, j) => (j < i && s.id === step.id))) warning(`Duplicate step ID: ${step.id}`);
    $step.id = step.id;

    if (step.class) $step.setAttribute('class', step.class);

    // Create a new section
    const $h1 = $step.querySelector('h1');
    if ($h1) {
      sections.push({
        id: checkId(step.section) || $h1.textContent.toLowerCase().replace(/\s/g, '-').replace(/[^\w-]/g, ''),
        title: $h1.textContent,
        status: step.sectionStatus || '',
        translated: step.translated || '',
        preview: step.sectionPreview || undefined,
        background: step.sectionBackground || '',
        goals: 0, duration: 1, steps: []
      });
      $h1.remove();
    }

    if (!last(sections)) throw new Error('Every course has to start with a section title (##)');

    step.section = last(sections).id;
    last(sections).steps.push(step.id);

    // Generate the required goals for all built-in components
    step.goals = step.goals ? step.goals.split(' ') : [];
    step.goals.push(...$$($step, '[goal]').map($el => $el.getAttribute('goal')));
    for (const c of COMPONENTS) {
      const excluded = c.exclude ? $$($step, c.exclude) : [];
      for (const [i, item] of $$($step, c.query).filter(c => !excluded.includes(c)).entries()) {
        const goal = c.goal.replace('$', i);
        if (!c.noAttr) item.setAttribute('goal', goal);
        step.goals.push(...(c.goals ? c.goals(item) : [goal]));
      }
    }
    $step.setAttribute('goals', step.goals.join(' '));
    last(sections).goals += step.goals.length;

    // Calculate the reading time per section using 75 words per minute and
    // 30s per interactive goal (plus 1 minutes added above);
    // TODO Always use the English duration, no matter what the locale is.
    last(sections).duration += $step.textContent.split(/\s+/).length / 75;
    last(sections).duration += step.goals.length / 2;

    // Generate the Step HTML
    step.html = minify($step.outerHTML, minifyOptions);
  }

  // Round the duration to the nearest multiple of 5.
  for (const s of sections) {
    s.duration = Math.max(5, 5 * Math.ceil(s.duration / 5));
  }

  return sections;
}


// -----------------------------------------------------------------------------
// Markdown Extensions

// HTML Tag Wrappers using ::: and indentation.
function blockIndentation(source) {
  const lines = source.split('\n');
  let closeTags = [];
  let nested = [];

  for (let i = 0; i < lines.length; ++i) {
    if (!lines[i].startsWith(':::')) continue;
    const tag = lines[i].slice(4);

    if (!tag) {
      lines[i] = '\n' + closeTags.pop() + '\n';
      nested.pop();
      continue;
    }

    if (tag.startsWith('column')) {
      let col = pug.render(tag.replace('column', 'div')).split('</')[0];
      col = col.replace(/width="([0-9]+)"/, 'style="width: $1px"');
      if (last(nested) === 'column') {
        lines[i] = '\n</div>' + col + '\n';
      } else {
        lines[i] = '<div class="row padded">' + col + '\n';
        nested.push('column');
        closeTags.push('</div></div>')
      }
    } else if (tag.startsWith('tab')) {
      let col = pug.render(tag.replace('tab', '.tab')).split('</')[0];
      if (last(nested) === 'tab') {
        lines[i] = '\n</div>' + col + '\n';
      } else {
        lines[i] = '<x-tabbox>' + col + '\n';
        nested.push('tab');
        closeTags.push('</div></x-tabbox>')
      }
    } else {
      let wrap = pug.render(tag).split('</');
      closeTags.push('</' + wrap[1]);
      lines[i] = wrap[0] + '\n';
      nested.push('');
    }
  }

  return lines.join('\n');
}

function blockAttributes(node) {
  let lastChild = node.childNodes[0]; //[node.childNodes.length - 1];
  if (!lastChild || lastChild.nodeType !== 3) return;

  let match = lastChild.textContent.match(/^{([^}]+)}/);
  if (!match) return;

  lastChild.textContent = lastChild.textContent.replace(match[0], '');

  let div = node.ownerDocument.createElement('div');
  try {
    div.innerHTML = pug.render(match[1]);
  } catch(e) {
    console.warn('Invalid PUG tag', match[1]);
    return;
  }

  let replaced = div.children[0];
  if (!replaced) return console.warn(`Invalid attribute: {${match[1]}}`);

  if (replaced.tagName === 'DIV' && !match[1].startsWith('div')) {
    const attributes = Array.from(replaced.attributes);
    for (let a of attributes) {
      if (a.name === 'class') {
        node.classList.add(...a.value.split(' '));
      } else {
        node.setAttribute(a.name, a.value);
      }
    }
  } else {
    while (node.firstChild) replaced.appendChild(node.firstChild);
    node.parentNode.replaceChild(replaced, node);
  }
}


// -----------------------------------------------------------------------------
// Utility Functions

const NOWRAP_QUERY = 'code, x-blank-input, x-blank, x-var, svg.mathjax, x-gloss, x-bio, span.step-target, span.pill, x-target, span.math';

// This prevents line breaks between inline-block elements and punctuation.
// Note the NOWRAP characters are removed later, after trailing punctuation
// is added *inside* the <span> element.
function lineBreaks(dom) {
  for (const el of dom.querySelectorAll(NOWRAP_QUERY)) {
    if (!el.nextSibling || el.nextSibling.nodeName !== '#text') continue;
    const text = el.nextSibling.textContent;
    if (!text[0].match(/[:.,!?°]/)) continue;

    el.nextSibling.textContent = text.slice(1);
    const nowrap = el.ownerDocument.createElement('span');
    nowrap.classList.add('nowrap');
    el.replaceWith(nowrap);
    nowrap.appendChild(el);
    nowrap.innerHTML += text[0];
  }
}

function nodes(element) {
  if (element.tagName === 'SVG') return [];
  let result = [];
  for (let c of element.children) {
    result.push(...nodes(c));
    result.push(c);
  }
  return result;
}
