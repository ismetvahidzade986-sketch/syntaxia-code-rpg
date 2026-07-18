// Verifies every quest: schema, prereq graph, and that each reference
// solution passes its own tests under the same grading rules as js/runner.js.
// Usage: node tests/verify.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = {};
function load(rel) {
  const p = path.join(ROOT, rel);
  (0, eval)(fs.readFileSync(p, 'utf8'));
}
load('js/content.js');
load('js/content-extra.js');

const content = global.window.SYNTAXIA_CONTENT;
const extra = global.window.SYNTAXIA_EXTRA || { acts: [], quests: [] };
const acts = [...content.acts, ...extra.acts];
const quests = [...content.quests, ...extra.quests];

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every(k => deepEqual(a[k], b[k]));
  }
  return false;
}

function runQuest(q) {
  const captured = [];
  const realConsole = global.console;
  const fake = Object.assign({}, realConsole, {
    log: (...a) => captured.push(a.map(String).join(' '))
  });
  let fn = null;
  try {
    global.console = fake;
    if (q.mode === 'output') {
      (new Function(q.solution))();
    } else {
      fn = (new Function(q.solution + "\nreturn typeof " + q.entry + "!=='undefined'?" + q.entry + ":undefined;"))();
    }
  } catch (e) {
    return { ok: false, failures: [{ desc: '(solution failed to run)', error: e.message }] };
  } finally {
    global.console = realConsole;
  }

  const failures = [];
  for (const t of q.tests) {
    try {
      let pass;
      if (q.mode === 'function') pass = deepEqual(fn(...(t.args || [])), t.expect);
      else if (q.mode === 'output') pass = deepEqual(captured, t.expectOutput);
      else if (q.mode === 'assert') pass = (new Function('entry', 'output', t.assert))(fn, captured.slice()) === true;
      else pass = false;
      if (!pass) failures.push({ desc: t.desc });
    } catch (e) {
      failures.push({ desc: t.desc, error: e.message });
    }
  }
  return { ok: failures.length === 0, failures };
}

process.on('unhandledRejection', () => {}); // async quests may reject after grading; the browser runner ignores this too

let schemaErrors = 0;
const ids = new Set();
for (const q of quests) {
  for (const k of ['id', 'act', 'title', 'lesson', 'hints', 'starter', 'mode', 'tests', 'solution']) {
    if (q[k] === undefined) { console.log('schema: ' + (q.id || '?') + ' missing ' + k); schemaErrors++; }
  }
  if ((q.mode === 'function' || q.mode === 'assert') && !q.entry) {
    console.log('schema: ' + q.id + ' missing entry'); schemaErrors++;
  }
  if (ids.has(q.id)) { console.log('schema: duplicate id ' + q.id); schemaErrors++; }
  ids.add(q.id);
  if (!acts.some(a => a.id === q.act)) { console.log('schema: ' + q.id + ' references unknown act ' + q.act); schemaErrors++; }
}
for (const q of quests) {
  for (const p of q.prereq || []) {
    if (!ids.has(p)) { console.log('schema: ' + q.id + ' prereq "' + p + '" does not exist'); schemaErrors++; }
  }
}

let fails = 0;
for (const q of quests) {
  const r = runQuest(q);
  if (!r.ok) {
    fails++;
    console.log('FAIL ' + q.id);
    r.failures.forEach(f => console.log('   - ' + f.desc + (f.error ? ' (' + f.error + ')' : '')));
  }
}

console.log(acts.length + ' acts, ' + quests.length + ' quests');
console.log('solutions passing: ' + (quests.length - fails) + '/' + quests.length + ', schema errors: ' + schemaErrors);
process.exit(fails > 0 || schemaErrors > 0 ? 1 : 0);
