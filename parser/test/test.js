// =============================================================================
// Textbook Parser Tests
// (c) Mathigon
// =============================================================================


const fs = require('fs');
const path = require('path');
const tape = require('tape');
const {parse} = require('../src/parser');


tape('Parse Markdown', async (t) => {
  const dir = path.join(process.cwd(), 'test');

  const source = fs.readFileSync(dir + '/input.md', 'utf8');
  const output = await parse('test', source, dir);

  const current = fs.readFileSync(dir + '/output.json', 'utf8');
  const updated = JSON.stringify(output.data, undefined, '  ')
      .replace(/MJX-[\w\-]+/g, 'MJX-TEX');  // Fix MathJax element IDs

  fs.writeFileSync(dir + '/output.json', updated);
  t.equal(updated, current);
  t.end();
});
