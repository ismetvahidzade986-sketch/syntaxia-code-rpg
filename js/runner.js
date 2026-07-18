// Sandboxed spell execution: runs learner code inside a Web Worker built from
// an inline Blob so the whole thing is self-contained (works on GitHub Pages,
// no separate worker file to fetch). A hard 2.5s timeout kills runaway loops.
(function () {
  var TIMEOUT_MS = 2500;

  var WORKER_SRC = [
    'self.onmessage = function (e) {',
    '  var code = e.data.code, mode = e.data.mode, entry = e.data.entry, tests = e.data.tests;',
    '  var output = [];',
    '  self.console.log = function () {',
    '    var parts = [];',
    '    for (var i = 0; i < arguments.length; i++) parts.push(String(arguments[i]));',
    '    output.push(parts.join(" "));',
    '  };',
    '  function deepEqual(a, b) {',
    '    if (a === b) return true;',
    '    if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) return true;',
    '    if (typeof a !== typeof b) return false;',
    '    if (a === null || b === null || a === undefined || b === undefined) return a === b;',
    '    if (typeof a !== "object") return false;',
    '    var aKeys = Object.keys(a), bKeys = Object.keys(b);',
    '    if (aKeys.length !== bKeys.length) return false;',
    '    for (var i = 0; i < aKeys.length; i++) {',
    '      if (!deepEqual(a[aKeys[i]], b[aKeys[i]])) return false;',
    '    }',
    '    return true;',
    '  }',
    '  function describe(v) {',
    '    try { return JSON.stringify(v); } catch (e) { return String(v); }',
    '  }',
    '  var results = [];',
    '  try {',
    '    if (mode === "output") {',
    '      new Function(code)();',
    '      for (var i = 0; i < tests.length; i++) {',
    '        var t = tests[i];',
    '        var pass = output.length === t.expectOutput.length && output.every(function (line, idx) { return line === t.expectOutput[idx]; });',
    '        results.push({ desc: t.desc, pass: pass, got: output.slice(), expect: t.expectOutput });',
    '      }',
    '    } else {',
    '      var fn = (new Function(code + "\\nreturn typeof " + entry + " !== \'undefined\' ? " + entry + " : undefined;"))();',
    '      if (typeof fn !== "function") {',
    '        for (var j = 0; j < tests.length; j++) {',
    '          results.push({ desc: tests[j].desc, pass: false, error: "\'" + entry + "\' is not defined as a function." });',
    '        }',
    '      } else {',
    '        for (var k = 0; k < tests.length; k++) {',
    '          var t2 = tests[k];',
    '          try {',
    '            if (mode === "function") {',
    '              var got = fn.apply(null, t2.args || []);',
    '              var ok = deepEqual(got, t2.expect);',
    '              results.push({ desc: t2.desc, pass: ok, got: describe(got), expect: describe(t2.expect) });',
    '            } else if (mode === "assert") {',
    '              var ok2 = !!(new Function("entry", "output", t2.assert))(fn, output);',
    '              results.push({ desc: t2.desc, pass: ok2 });',
    '            }',
    '          } catch (err) {',
    '            results.push({ desc: t2.desc, pass: false, error: err.message });',
    '          }',
    '        }',
    '      }',
    '    }',
    '  } catch (err) {',
    '    results = tests.map(function (t) { return { desc: t.desc, pass: false, error: "Your spell fizzled: " + err.message }; });',
    '  }',
    '  self.postMessage({ results: results, output: output });',
    '};'
  ].join('\n');

  var blobUrl = null;
  var activeWorker = null;

  function getBlobUrl() {
    if (!blobUrl) {
      var blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
      blobUrl = URL.createObjectURL(blob);
    }
    return blobUrl;
  }

  function terminateActive() {
    if (activeWorker) {
      try { activeWorker.terminate(); } catch (e) { /* ignore */ }
      activeWorker = null;
    }
  }

  function runCode(payload) {
    return new Promise(function (resolve) {
      terminateActive();
      var worker;
      try {
        worker = new Worker(getBlobUrl());
      } catch (e) {
        resolve({
          timedOut: false,
          output: [],
          results: (payload.tests || []).map(function (t) {
            return { desc: t.desc, pass: false, error: 'Could not start the spell sandbox: ' + e.message };
          })
        });
        return;
      }
      activeWorker = worker;
      var settled = false;

      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        terminateActive();
        resolve({
          timedOut: true,
          output: [],
          results: (payload.tests || []).map(function (t) {
            return { desc: t.desc, pass: false, error: 'Your spell ran too long -- check for an infinite loop.' };
          })
        });
      }, TIMEOUT_MS);

      worker.onmessage = function (e) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (activeWorker === worker) activeWorker = null;
        resolve({ timedOut: false, output: e.data.output || [], results: e.data.results || [] });
      };

      worker.onerror = function (err) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        terminateActive();
        resolve({
          timedOut: false,
          output: [],
          results: (payload.tests || []).map(function (t) {
            return { desc: t.desc, pass: false, error: 'Your spell fizzled: ' + (err.message || 'unknown error') };
          })
        });
      };

      worker.postMessage({
        code: payload.code,
        mode: payload.mode,
        entry: payload.entry,
        tests: payload.tests
      });
    });
  }

  window.SyntaxiaRunner = { runCode: runCode };
})();
