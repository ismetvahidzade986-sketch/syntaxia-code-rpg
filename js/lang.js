// Language layer: UI translations (SYNTAXIA_I18N) + clickable glossary (SYNTAXIA_GLOSSARY).
// Both data files are optional; everything here degrades to English/no-op without them.
(function () {
  var LANG_KEY = 'syntaxia.lang';

  var i18n = window.SYNTAXIA_I18N || null;
  var glossary = window.SYNTAXIA_GLOSSARY || null;

  var current = 'en';
  try { current = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  if (i18n && !((i18n.strings || {})[current])) current = (i18n && i18n.base) || 'en';

  function lookup(lang, key) {
    var table = i18n && i18n.strings && i18n.strings[lang];
    return table ? table[key] : undefined;
  }

  function t(key, fallback) {
    var v = lookup(current, key);
    if (v === undefined && i18n) v = lookup(i18n.base || 'en', key);
    return v === undefined ? fallback : v;
  }

  function languages() {
    return (i18n && i18n.languages) || [{ code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' }];
  }

  function dirFor(code) {
    var meta = languages().find(function (l) { return l.code === code; });
    return (meta && meta.dir) === 'rtl' ? 'rtl' : 'ltr';
  }

  // Thin hooks so the game/achievement layer can hear about language layer
  // events without this module needing to know game state exists at all.
  var beforeSwitchHook = null;
  var termOpenHook = null;

  function setLanguage(code) {
    if (beforeSwitchHook) { try { beforeSwitchHook(code); } catch (e) {} }
    try { localStorage.setItem(LANG_KEY, code); } catch (e) {}
    location.reload();
  }

  function applyStatic() {
    document.documentElement.lang = current;
    document.documentElement.dir = dirFor(current);
    var nodes = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) {
      var v = t(el.getAttribute('data-i18n'), undefined);
      if (v !== undefined) el.textContent = v;
    });
  }

  // ---- Glossary ----

  var termIndex = null; // [{re, term}] longest-first
  var byId = {};

  function buildIndex() {
    if (!glossary || !Array.isArray(glossary.terms)) return [];
    var entries = [];
    glossary.terms.forEach(function (term) {
      byId[term.id] = term;
      var forms = [term.term].concat(term.aliases || []);
      forms.forEach(function (f) {
        if (f) entries.push({ form: f, term: term });
      });
    });
    entries.sort(function (a, b) { return b.form.length - a.form.length; });
    return entries.map(function (e) {
      var esc = e.form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // \b fails around punctuation-ish forms like "async/await"; fall back to lookarounds.
      return { re: new RegExp('(^|[^\\w-])(' + esc + ')(?![\\w-])', 'i'), term: e.term };
    });
  }

  function decorate(root) {
    if (!glossary) return;
    if (!termIndex) termIndex = buildIndex();
    if (!termIndex.length) return;

    var seen = {};
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        while (p && p !== root) {
          if (p.nodeName === 'PRE' || p.nodeName === 'BUTTON') return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(function (node) {
      var text = node.nodeValue;
      for (var i = 0; i < termIndex.length; i++) {
        var entry = termIndex[i];
        if (seen[entry.term.id]) continue;
        var m = entry.re.exec(text);
        if (!m) continue;
        var start = m.index + m[1].length;
        var matched = m[2];
        seen[entry.term.id] = true;

        var after = node.splitText(start);
        after.nodeValue = after.nodeValue.slice(matched.length);
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gloss-term';
        btn.textContent = matched;
        btn.setAttribute('data-term-id', entry.term.id);
        btn.setAttribute('aria-label', matched + ' — ' + t('glossary.title', 'Glossary'));
        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          showPopover(btn, entry.term.id);
        });
        node.parentNode.insertBefore(btn, after);
        node = after;
        text = node.nodeValue;
      }
    });
  }

  var popover = null;

  function closePopover() {
    if (popover) { popover.remove(); popover = null; }
    document.removeEventListener('click', onDocClick, true);
    document.removeEventListener('keydown', onEsc, true);
  }
  function onDocClick(e) { if (popover && !popover.contains(e.target)) closePopover(); }
  function onEsc(e) { if (e.key === 'Escape') closePopover(); }

  function showPopover(anchor, termId) {
    closePopover();
    var term = byId[termId];
    if (!term) return;
    if (termOpenHook) { try { termOpenHook(termId); } catch (e) {} }

    popover = document.createElement('div');
    popover.className = 'gloss-popover';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-label', term.term);

    var h = document.createElement('div');
    h.className = 'gloss-pop-term';
    h.textContent = term.term;
    var s = document.createElement('p');
    s.className = 'gloss-pop-short';
    s.textContent = term.short;
    popover.appendChild(h);
    popover.appendChild(s);
    if (term.more) {
      var m = document.createElement('p');
      m.className = 'gloss-pop-more';
      m.textContent = term.more;
      popover.appendChild(m);
    }
    if (term.example) {
      var exLabel = document.createElement('div');
      exLabel.className = 'gloss-pop-exlabel';
      exLabel.textContent = t('glossary.example', 'Example');
      var pre = document.createElement('pre');
      var code = document.createElement('code');
      if (window.Syntaxia && window.Syntaxia.highlight) {
        code.innerHTML = window.Syntaxia.highlight(term.example);
      } else {
        code.textContent = term.example;
      }
      pre.appendChild(code);
      popover.appendChild(exLabel);
      popover.appendChild(pre);
    }
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'gloss-pop-close';
    close.textContent = t('glossary.close', 'Close');
    close.addEventListener('click', closePopover);
    popover.appendChild(close);

    document.body.appendChild(popover);
    // Below 700px the popover becomes a fixed bottom sheet (see CSS) -- leave
    // it entirely to the stylesheet instead of fighting it with inline styles.
    var isSheet = window.matchMedia('(max-width: 700px)').matches;
    if (!isSheet) {
      var r = anchor.getBoundingClientRect();
      var pw = Math.min(360, window.innerWidth - 24);
      popover.style.maxWidth = pw + 'px';
      var left = Math.min(r.left, window.innerWidth - pw - 12);
      var top = r.bottom + 8;
      var ph = popover.offsetHeight;
      if (top + ph > window.innerHeight - 12 && r.top - ph - 8 > 0) top = r.top - ph - 8;
      popover.style.left = Math.max(12, left) + 'px';
      popover.style.top = Math.max(12, top) + 'px';
    }

    document.addEventListener('click', onDocClick, true);
    document.addEventListener('keydown', onEsc, true);
    close.focus();
  }

  function allTerms() {
    return (glossary && glossary.terms) ? glossary.terms.slice().sort(function (a, b) {
      return a.term.localeCompare(b.term);
    }) : [];
  }

  window.SyntaxiaLang = {
    t: t,
    current: function () { return current; },
    languages: languages,
    setLanguage: setLanguage,
    applyStatic: applyStatic,
    decorateGlossary: decorate,
    showTermPopover: showPopover,
    allTerms: allTerms,
    closePopover: closePopover,
    onTermOpen: function (fn) { termOpenHook = fn; },
    onBeforeLanguageSwitch: function (fn) { beforeSwitchHook = fn; }
  };
})();
