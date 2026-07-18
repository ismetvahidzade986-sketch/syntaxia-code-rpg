// Boot: merge extra content packs, apply language, hand everything to the UI.
(function () {
  function mergeExtra(content) {
    var extra = window.SYNTAXIA_EXTRA;
    if (!extra) return content;
    var have = {};
    content.quests.forEach(function (q) { have[q.id] = true; });
    var haveAct = {};
    content.acts.forEach(function (a) { haveAct[a.id] = true; });
    (extra.acts || []).forEach(function (a) { if (!haveAct[a.id]) content.acts.push(a); });
    (extra.quests || []).forEach(function (q) { if (!have[q.id]) content.quests.push(q); });
    return content;
  }

  function renderGlossaryModal() {
    var lang = window.SyntaxiaLang;
    if (!lang || !lang.allTerms().length) return null;
    var wrap = document.createElement('div');
    wrap.className = 'gloss-browser';
    var search = document.createElement('input');
    search.type = 'search';
    search.className = 'gloss-search';
    search.placeholder = lang.t('glossary.search', 'Search terms...');
    search.setAttribute('aria-label', lang.t('glossary.search', 'Search terms...'));
    var list = document.createElement('div');
    list.className = 'gloss-list';

    function render(filter) {
      list.textContent = '';
      lang.allTerms().forEach(function (term) {
        var hay = (term.term + ' ' + (term.aliases || []).join(' ')).toLowerCase();
        if (filter && hay.indexOf(filter) === -1) return;
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'gloss-list-item';
        var t1 = document.createElement('span');
        t1.className = 'gloss-list-term';
        t1.textContent = term.term;
        var t2 = document.createElement('span');
        t2.className = 'gloss-list-short';
        t2.textContent = term.short;
        b.appendChild(t1);
        b.appendChild(t2);
        b.addEventListener('click', function () { lang.showTermPopover(b, term.id); });
        list.appendChild(b);
      });
    }
    search.addEventListener('input', function () { render(search.value.trim().toLowerCase()); });
    render('');
    wrap.appendChild(search);
    wrap.appendChild(list);
    return wrap;
  }

  function wireLanguageSelect() {
    var lang = window.SyntaxiaLang;
    var sel = document.getElementById('lang-select');
    if (!lang || !sel) return;
    var langs = lang.languages();
    if (langs.length < 2) { sel.hidden = true; return; }
    langs.forEach(function (l) {
      var opt = document.createElement('option');
      opt.value = l.code;
      opt.textContent = l.nativeName || l.name;
      if (l.code === lang.current()) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', function () { lang.setLanguage(sel.value); });
  }

  function wireGlossaryButton() {
    var btn = document.getElementById('btn-glossary');
    if (!btn) return;
    var lang = window.SyntaxiaLang;
    if (!lang || !lang.allTerms().length) { btn.hidden = true; return; }
    btn.addEventListener('click', function () {
      var body = renderGlossaryModal();
      if (body && window.SyntaxiaUI && window.SyntaxiaUI.openModal) {
        window.SyntaxiaUI.openModal(lang.t('glossary.title', 'Glossary'), body);
      }
    });
  }

  function boot() {
    var content = window.SYNTAXIA_CONTENT;
    if (!content || !Array.isArray(content.acts) || !Array.isArray(content.quests)) {
      console.error('Syntaxia: content failed to load.');
      return;
    }
    if (window.SyntaxiaLang) window.SyntaxiaLang.applyStatic();
    window.SyntaxiaUI.init(mergeExtra(content));
    wireLanguageSelect();
    wireGlossaryButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
