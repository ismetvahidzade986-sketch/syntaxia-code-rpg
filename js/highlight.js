// Zero-dependency JS syntax highlighter + shared HTML-escaping helper.
// Exposes window.Syntaxia = { escapeHtml, highlight }
(function () {
  var KEYWORDS = [
    'let', 'const', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'break', 'continue', 'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw',
    'new', 'typeof', 'instanceof', 'in', 'of', 'class', 'extends', 'super', 'this',
    'void', 'delete', 'yield', 'async', 'await', 'static', 'get', 'set',
    'import', 'export', 'from', 'as'
  ];
  var LITERALS = ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'];

  var TOKEN_RE = new RegExp(
    '(\\/\\/[^\\n]*)' +                              // 1 line comment
    '|(\\/\\*[\\s\\S]*?\\*\\/)' +                     // 2 block comment
    '|(`(?:\\\\.|[^`\\\\])*`)' +                      // 3 template literal
    '|("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')' + // 4 string
    '|(\\b\\d+\\.?\\d*(?:[eE][+-]?\\d+)?\\b)' +        // 5 number
    '|(\\b(?:' + KEYWORDS.concat(LITERALS).join('|') + ')\\b)', // 6 keyword/literal
    'g'
  );
  var LITERAL_SET = {};
  LITERALS.forEach(function (w) { LITERAL_SET[w] = true; });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      switch (ch) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case '\'': return '&#39;';
        default: return ch;
      }
    });
  }

  function classify(match, groups) {
    if (groups[0] !== undefined || groups[1] !== undefined) return 'tok-comment';
    if (groups[2] !== undefined) return 'tok-template';
    if (groups[3] !== undefined) return 'tok-string';
    if (groups[4] !== undefined) return 'tok-number';
    if (groups[5] !== undefined) return LITERAL_SET[groups[5]] ? 'tok-literal' : 'tok-keyword';
    return null;
  }

  function highlight(code) {
    var out = [];
    var lastIndex = 0;
    TOKEN_RE.lastIndex = 0;
    var m;
    while ((m = TOKEN_RE.exec(code)) !== null) {
      if (m.index > lastIndex) {
        out.push(escapeHtml(code.slice(lastIndex, m.index)));
      }
      var cls = classify(m[0], [m[1], m[2], m[3], m[4], m[5], m[6]]);
      out.push('<span class="' + cls + '">' + escapeHtml(m[0]) + '</span>');
      lastIndex = m.index + m[0].length;
      if (m[0].length === 0) TOKEN_RE.lastIndex++;
    }
    if (lastIndex < code.length) {
      out.push(escapeHtml(code.slice(lastIndex)));
    }
    return out.join('');
  }

  window.Syntaxia = window.Syntaxia || {};
  window.Syntaxia.escapeHtml = escapeHtml;
  window.Syntaxia.highlight = highlight;
})();
