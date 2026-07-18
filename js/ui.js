// Rendering, the code editor, event wiring. Everything that touches the DOM.
(function () {
  var Engine = window.SyntaxiaEngine;
  var Runner = window.SyntaxiaRunner;
  var Util = window.Syntaxia;

  var ALLOWED_LESSON_TAGS = { P: 1, UL: 1, OL: 1, LI: 1, CODE: 1, PRE: 1, STRONG: 1, EM: 1, BR: 1 };

  var content = null;
  var questsById = {};
  var state = null;
  var currentQuestId = null;
  var questRunMeta = {};
  var runInFlight = false;

  var dom = {};

  function cacheDom() {
    var ids = [
      'hud-level-num', 'hud-level-title', 'hud-xp-fill', 'hud-xp-text',
      'btn-shortcuts', 'btn-about', 'btn-reset',
      'char-avatar', 'char-level-text', 'char-title-text',
      'char-xp-text', 'char-xp-fill', 'char-mana-text', 'char-mana-pips',
      'char-streak-text', 'achievements-grid',
      'map-scroll', 'map-canvas', 'map-lines', 'map-nodes',
      'quest-empty', 'quest-content', 'quest-act-badge', 'quest-title', 'quest-concept', 'quest-lesson',
      'btn-run', 'btn-reset-code', 'btn-hint',
      'editor-highlight', 'editor-highlight-code', 'editor-input',
      'hints-panel', 'test-results', 'victory-panel', 'victory-xp', 'btn-next-quest',
      'modal-overlay', 'modal', 'modal-close', 'modal-title', 'modal-body',
      'levelup-overlay', 'levelup-level', 'levelup-title',
      'toast-root'
    ];
    ids.forEach(function (id) {
      dom[toCamel(id)] = document.getElementById(id);
    });
  }

  function toCamel(id) {
    return id.replace(/-([a-z0-9])/g, function (_, c) { return c.toUpperCase(); });
  }

  /* ---------- safe text helpers ---------- */

  function renderInlineCode(text) {
    var parts = String(text).split('`');
    var html = '';
    parts.forEach(function (part, i) {
      var escaped = Util.escapeHtml(part);
      html += (i % 2 === 1) ? '<code>' + escaped + '</code>' : escaped;
    });
    return html;
  }

  function sanitizeLessonHtml(html) {
    var doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
    var frag = document.createDocumentFragment();
    appendCleaned(doc.body.firstChild, frag);
    return frag;
  }

  function appendCleaned(sourceParent, targetParent) {
    Array.prototype.forEach.call(sourceParent.childNodes, function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        targetParent.appendChild(document.createTextNode(child.textContent));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (ALLOWED_LESSON_TAGS[child.tagName]) {
          var el = document.createElement(child.tagName.toLowerCase());
          appendCleaned(child, el);
          targetParent.appendChild(el);
        } else {
          appendCleaned(child, targetParent);
        }
      }
    });
  }

  /* ---------- HUD / character ---------- */

  var TIER_COLORS = {
    Novice: '#8892b0',
    Apprentice: '#58e6a6',
    Adept: '#8fa3ff',
    Conjurer: '#c792ea',
    Mage: '#ff8fd8',
    Archmage: '#f4cf5e',
    Runelord: '#ff9f5a'
  };

  function renderHUD() {
    var title = Engine.titleForLevel(state.level);
    var thisLevelXp = Engine.xpForLevel(state.level);
    var nextLevelXp = Engine.xpForLevel(state.level + 1);
    var span = Math.max(1, nextLevelXp - thisLevelXp);
    var progress = Math.min(1, (state.xp - thisLevelXp) / span);

    dom.hudLevelNum.textContent = String(state.level);
    dom.hudLevelTitle.textContent = title;
    dom.hudXpFill.style.width = (progress * 100).toFixed(1) + '%';
    dom.hudXpText.textContent = state.xp + ' / ' + nextLevelXp + ' XP';
  }

  function renderCharacter() {
    state = Engine.regenerateMana(state);
    Engine.save(state);

    var title = Engine.titleForLevel(state.level);
    var color = TIER_COLORS[title] || TIER_COLORS.Novice;
    dom.charAvatar.style.borderColor = color;
    dom.charAvatar.style.boxShadow = '0 0 14px ' + color;
    dom.charLevelText.textContent = 'Level ' + state.level;
    dom.charTitleText.textContent = title;
    dom.charTitleText.style.color = color;

    var thisLevelXp = Engine.xpForLevel(state.level);
    var nextLevelXp = Engine.xpForLevel(state.level + 1);
    var span = Math.max(1, nextLevelXp - thisLevelXp);
    var progress = Math.min(1, (state.xp - thisLevelXp) / span);
    dom.charXpFill.style.width = (progress * 100).toFixed(1) + '%';
    dom.charXpText.textContent = state.xp + ' / ' + nextLevelXp;

    dom.charManaText.textContent = state.mana + ' / ' + state.maxMana;
    dom.charManaPips.innerHTML = '';
    for (var i = 0; i < state.maxMana; i++) {
      var pip = document.createElement('span');
      pip.className = 'mana-pip' + (i < state.mana ? ' filled' : '');
      dom.charManaPips.appendChild(pip);
    }

    var streakCount = state.streak.count || 0;
    dom.charStreakText.textContent = streakCount + (streakCount === 1 ? ' day' : ' days');

    renderAchievements();
  }

  function renderAchievements() {
    dom.achievementsGrid.innerHTML = '';
    var defs = Engine.getAchievementDefs(content);
    defs.forEach(function (a) {
      var earned = !!state.achievements[a.id];
      var li = document.createElement('li');
      li.className = 'achievement-badge ' + (earned ? 'earned' : 'locked');
      li.title = a.name + ': ' + a.desc + (earned ? ' (earned)' : ' (locked)');
      li.textContent = a.icon;
      var sr = document.createElement('span');
      sr.className = 'achievement-sr';
      sr.textContent = a.name + ', ' + a.desc + (earned ? ', earned' : ', locked');
      li.appendChild(sr);
      dom.achievementsGrid.appendChild(li);
    });
  }

  /* ---------- skill tree map ---------- */

  var LAYOUT = { actHeaderH: 46, rowH: 100, colW: 150, padX: 50, padY: 56, actGap: 30 };

  function computeLayout() {
    var acts = content.acts.slice().sort(function (a, b) { return a.id - b.id; });
    var nodes = {};
    var actLayouts = [];
    var yCursor = LAYOUT.padY;
    var maxWidth = 400;

    acts.forEach(function (act) {
      var qs = content.quests.filter(function (q) { return q.act === act.id; });
      var rankOf = {};
      function computeRank(q) {
        if (rankOf.hasOwnProperty(q.id)) return rankOf[q.id];
        rankOf[q.id] = 0;
        var r = 0;
        (q.prereq || []).forEach(function (pid) {
          var pq = questsById[pid];
          if (pq && pq.act === q.act) r = Math.max(r, computeRank(pq) + 1);
        });
        rankOf[q.id] = r;
        return r;
      }
      qs.forEach(computeRank);

      var byRank = {};
      qs.forEach(function (q) {
        var r = rankOf[q.id];
        (byRank[r] = byRank[r] || []).push(q);
      });
      var ranks = Object.keys(byRank).map(Number).sort(function (a, b) { return a - b; });
      var maxRows = ranks.reduce(function (m, r) { return Math.max(m, byRank[r].length); }, 1);
      var laneHeight = LAYOUT.actHeaderH + Math.max(1, maxRows) * LAYOUT.rowH;

      ranks.forEach(function (r) {
        var list = byRank[r];
        list.forEach(function (q, i) {
          var x = LAYOUT.padX + r * LAYOUT.colW;
          var bandHeight = laneHeight - LAYOUT.actHeaderH;
          var y = yCursor + LAYOUT.actHeaderH + (bandHeight * (i + 0.5) / list.length);
          nodes[q.id] = { x: x, y: y };
        });
      });

      var maxRank = ranks.length ? ranks[ranks.length - 1] : 0;
      var laneWidth = LAYOUT.padX * 2 + maxRank * LAYOUT.colW + 60;
      maxWidth = Math.max(maxWidth, laneWidth);
      actLayouts.push({ act: act, top: yCursor });
      yCursor += laneHeight + LAYOUT.actGap;
    });

    return { nodes: nodes, acts: actLayouts, width: maxWidth, height: yCursor };
  }

  function actName(actId) {
    var act = content.acts.find(function (a) { return a.id === actId; });
    return act ? act.name : ('Act ' + actId);
  }

  function renderMap() {
    var layout = computeLayout();
    dom.mapCanvas.style.width = layout.width + 'px';
    dom.mapCanvas.style.height = layout.height + 'px';
    dom.mapLines.setAttribute('width', layout.width);
    dom.mapLines.setAttribute('height', layout.height);
    dom.mapLines.setAttribute('viewBox', '0 0 ' + layout.width + ' ' + layout.height);
    dom.mapLines.innerHTML = '';
    dom.mapNodes.innerHTML = '';

    layout.acts.forEach(function (a) {
      var label = document.createElement('div');
      label.className = 'act-lane-label';
      label.style.left = '14px';
      label.style.top = a.top + 'px';
      label.textContent = 'Act ' + a.act.id + ' — ' + a.act.name;
      dom.mapNodes.appendChild(label);
    });

    content.quests.forEach(function (q) {
      var to = layout.nodes[q.id];
      if (!to) return;
      (q.prereq || []).forEach(function (pid) {
        var from = layout.nodes[pid];
        if (!from) return;
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        var cls = 'map-line';
        if (state.completed[pid] && state.completed[q.id]) cls += ' line-completed';
        else if (state.completed[pid]) cls += ' line-unlocked';
        line.setAttribute('class', cls);
        dom.mapLines.appendChild(line);
      });
    });

    content.quests.forEach(function (q) {
      var pos = layout.nodes[q.id];
      if (!pos) return;
      var status = Engine.questStatus(content, q, state);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'map-node status-' + status + (q.id === currentQuestId ? ' is-current' : '');
      btn.style.left = pos.x + 'px';
      btn.style.top = pos.y + 'px';
      btn.setAttribute('aria-pressed', String(q.id === currentQuestId));

      var iconSpan = document.createElement('span');
      iconSpan.className = 'map-node-icon';
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.textContent = status === 'completed' ? '★' : (status === 'locked' ? '🔒' : '✦');

      var labelSpan = document.createElement('span');
      labelSpan.className = 'map-node-label';
      labelSpan.textContent = q.title;

      btn.appendChild(iconSpan);
      btn.appendChild(labelSpan);
      btn.title = q.title + ' — ' + status;
      btn.setAttribute('aria-label', q.title + ', ' + status);
      btn.addEventListener('click', function () { onNodeClick(q, status); });
      dom.mapNodes.appendChild(btn);
    });
  }

  function onNodeClick(quest, status) {
    if (status === 'locked') {
      var missing = quest.prereq.filter(function (id) { return !state.completed[id]; })
        .map(function (id) { return questsById[id] ? questsById[id].title : id; });
      var msg = missing.length
        ? ('Locked. Clear first: ' + missing.join(', '))
        : (Engine.isActReached(content, quest.act, state) ? 'Locked.' : ('Locked. Reach ' + actName(quest.act) + ' first.'));
      showToast(msg, 'info');
      return;
    }
    openQuest(quest.id);
  }

  /* ---------- quest panel ---------- */

  function openQuest(id) {
    var q = questsById[id];
    if (!q) return;
    currentQuestId = id;
    questRunMeta[id] = { firstRunAt: null };

    dom.questEmpty.hidden = true;
    dom.questContent.hidden = false;
    dom.questActBadge.textContent = 'Act ' + q.act + ' — ' + actName(q.act);
    dom.questTitle.textContent = q.title;
    dom.questConcept.textContent = q.concept;
    dom.questLesson.textContent = '';
    dom.questLesson.appendChild(sanitizeLessonHtml(q.lesson));
    if (window.SyntaxiaLang) window.SyntaxiaLang.decorateGlossary(dom.questLesson);

    dom.editorInput.value = q.starter;
    refreshHighlight();

    dom.testResults.innerHTML = '';
    dom.victoryPanel.hidden = true;
    renderRevealedHints(q);
    updateHintButton();
    renderMap();
    dom.editorInput.focus();
  }

  function renderRevealedHints(quest) {
    dom.hintsPanel.innerHTML = '';
    var revealed = state.hintsRevealed[quest.id] || 0;
    for (var i = 0; i < revealed; i++) {
      var item = document.createElement('div');
      item.className = 'hint-item';
      item.innerHTML = '<strong>Hint ' + (i + 1) + ':</strong> ' + renderInlineCode(quest.hints[i]);
      dom.hintsPanel.appendChild(item);
    }
  }

  function updateHintButton() {
    var q = questsById[currentQuestId];
    if (!q) { dom.btnHint.disabled = true; return; }
    var revealed = state.hintsRevealed[q.id] || 0;
    var canUse = Engine.canUseHint(state, q);
    dom.btnHint.disabled = !canUse;
    if (revealed >= q.hints.length) {
      dom.btnHint.title = 'No more hints for this quest.';
    } else if (state.mana <= 0) {
      dom.btnHint.title = 'Not enough mana. It regenerates over time.';
    } else {
      dom.btnHint.title = '';
    }
  }

  /* ---------- editor ---------- */

  function refreshHighlight() {
    dom.editorHighlightCode.innerHTML = Util.highlight(dom.editorInput.value);
    syncScroll();
  }

  function syncScroll() {
    dom.editorHighlight.scrollTop = dom.editorInput.scrollTop;
    dom.editorHighlight.scrollLeft = dom.editorInput.scrollLeft;
  }

  function currentLineInfo(value, pos) {
    var lineStart = value.lastIndexOf('\n', pos - 1) + 1;
    return { lineStart: lineStart, line: value.slice(lineStart, pos) };
  }

  function onEditorKeydown(e) {
    var el = dom.editorInput;

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      var start = el.selectionStart, end = el.selectionEnd, value = el.value;
      if (e.shiftKey) {
        var lineStart = currentLineInfo(value, start).lineStart;
        var selected = value.slice(lineStart, end);
        var removedFirstLine = 0;
        var lines = selected.split('\n').map(function (line, idx) {
          var m = line.match(/^ {1,2}/);
          var removed = m ? m[0].length : 0;
          if (idx === 0) removedFirstLine = removed;
          return line.slice(removed);
        });
        var newSelected = lines.join('\n');
        el.value = value.slice(0, lineStart) + newSelected + value.slice(end);
        el.selectionStart = Math.max(lineStart, start - removedFirstLine);
        el.selectionEnd = lineStart + newSelected.length;
      } else if (start === end) {
        el.value = value.slice(0, start) + '  ' + value.slice(end);
        el.selectionStart = el.selectionEnd = start + 2;
      } else {
        var lineStart2 = currentLineInfo(value, start).lineStart;
        var selected2 = value.slice(lineStart2, end);
        var newSelected2 = selected2.split('\n').map(function (line) { return '  ' + line; }).join('\n');
        el.value = value.slice(0, lineStart2) + newSelected2 + value.slice(end);
        el.selectionStart = start + 2;
        el.selectionEnd = lineStart2 + newSelected2.length;
      }
      refreshHighlight();
      return;
    }

    if (e.key === 'Enter') {
      var pos = el.selectionStart;
      var value2 = el.value;
      var info = currentLineInfo(value2, pos);
      var indentMatch = info.line.match(/^[ \t]*/);
      var indent = indentMatch ? indentMatch[0] : '';
      if (/[{[(]\s*$/.test(info.line)) indent += '  ';
      e.preventDefault();
      var insertion = '\n' + indent;
      el.value = value2.slice(0, pos) + insertion + value2.slice(el.selectionEnd);
      el.selectionStart = el.selectionEnd = pos + insertion.length;
      refreshHighlight();
    }
  }

  /* ---------- running code ---------- */

  function onRun() {
    var q = questsById[currentQuestId];
    if (!q || runInFlight) return;
    runInFlight = true;
    dom.btnRun.disabled = true;

    var meta = questRunMeta[q.id] || (questRunMeta[q.id] = { firstRunAt: null });
    if (!meta.firstRunAt) meta.firstRunAt = Date.now();

    dom.victoryPanel.hidden = true;
    dom.testResults.innerHTML = '';
    var running = document.createElement('div');
    running.className = 'test-summary';
    running.textContent = 'Casting...';
    dom.testResults.appendChild(running);

    Runner.runCode({
      code: dom.editorInput.value,
      mode: q.mode,
      entry: q.entry,
      tests: q.tests
    }).then(function (result) {
      runInFlight = false;
      dom.btnRun.disabled = false;
      renderResults(q, result);
    });
  }

  function renderResults(quest, result) {
    dom.testResults.innerHTML = '';

    if (result.timedOut) {
      var banner = document.createElement('div');
      banner.className = 'timeout-banner';
      banner.textContent = window.SyntaxiaLang
        ? window.SyntaxiaLang.t('quest.timeout_error', 'Your spell ran too long — check for an infinite loop.')
        : 'Your spell ran too long — check for an infinite loop.';
      dom.testResults.appendChild(banner);
      return;
    }

    var results = result.results || [];
    results.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'test-result ' + (r.pass ? 'pass' : 'fail');

      var head = document.createElement('div');
      head.className = 'test-result-head';
      var icon = document.createElement('span');
      icon.className = 'test-result-icon ' + (r.pass ? 'pass' : 'fail');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = r.pass ? '✓' : '✗';
      var desc = document.createElement('span');
      desc.innerHTML = renderInlineCode(r.desc);
      head.appendChild(icon);
      head.appendChild(desc);
      row.appendChild(head);

      if (!r.pass) {
        var detail = document.createElement('div');
        detail.className = 'test-result-detail';
        var msg;
        if (r.error) {
          msg = 'Error: ' + r.error;
        } else if (r.got !== undefined) {
          var gotStr = typeof r.got === 'string' ? r.got : JSON.stringify(r.got);
          var expectStr = r.expect === undefined ? '' : (typeof r.expect === 'string' ? r.expect : JSON.stringify(r.expect));
          msg = 'Got ' + gotStr + (expectStr ? (', expected ' + expectStr) : '');
        } else {
          msg = 'This check did not pass.';
        }
        detail.innerHTML = renderInlineCode(msg);
        row.appendChild(detail);
      }
      dom.testResults.appendChild(row);
    });

    var passCount = results.filter(function (r) { return r.pass; }).length;
    var summary = document.createElement('div');
    summary.className = 'test-summary';
    summary.textContent = passCount + ' / ' + results.length + ' tests passed';
    dom.testResults.appendChild(summary);

    if (results.length > 0 && passCount === results.length) {
      onVictory(quest);
    }
  }

  function onVictory(quest) {
    var meta = questRunMeta[quest.id] || {};
    var elapsedMs = meta.firstRunAt ? (Date.now() - meta.firstRunAt) : undefined;
    var res = Engine.completeQuest(content, state, quest, { elapsedMs: elapsedMs });
    state = res.state;

    dom.victoryXp.textContent = res.alreadyDone
      ? 'Already cleared — nice replay!'
      : ('+' + quest.xp + ' XP earned');
    dom.victoryPanel.hidden = false;

    renderHUD();
    renderCharacter();
    renderMap();
    updateHintButton();

    if (res.leveledUp) showLevelUp(res.newLevel);
    res.newlyEarned.forEach(function (id) { showAchievementToast(id); });
    wireNextQuestButton(quest);
  }

  function wireNextQuestButton(justCompleted) {
    var candidates = content.quests.filter(function (q) {
      return Engine.questStatus(content, q, state) === 'available';
    });
    var child = candidates.find(function (q) { return q.prereq.indexOf(justCompleted.id) !== -1; });
    var next = child || candidates[0];
    if (next) {
      dom.btnNextQuest.hidden = false;
      dom.btnNextQuest.disabled = false;
      dom.btnNextQuest.textContent = 'Next Quest: ' + next.title;
      dom.btnNextQuest.onclick = function () { openQuest(next.id); };
    } else {
      dom.btnNextQuest.hidden = false;
      dom.btnNextQuest.disabled = true;
      dom.btnNextQuest.textContent = 'Every available quest is cleared!';
    }
  }

  /* ---------- hint button ---------- */

  function onHintClick() {
    var q = questsById[currentQuestId];
    if (!q) return;
    var res = Engine.useHint(state, q);
    if (!res.ok) return;
    state = res.state;
    renderRevealedHints(q);
    renderCharacter();
    updateHintButton();
    res.newlyEarned.forEach(function (id) { showAchievementToast(id); });
  }

  /* ---------- toasts / level-up ---------- */

  function showToast(message, type) {
    var toast = document.createElement('div');
    toast.className = 'toast' + (type === 'info' ? ' toast-info' : '');
    toast.textContent = message;
    dom.toastRoot.appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 4500);
  }

  function showAchievementToast(id) {
    var def = Engine.getAchievementDefs(content).find(function (a) { return a.id === id; });
    if (!def) return;
    showToast(def.icon + ' Achievement unlocked: ' + def.name + ' — ' + def.desc, 'achievement');
  }

  var levelUpTimer = null;
  function showLevelUp(level) {
    dom.levelupLevel.textContent = String(level);
    dom.levelupTitle.textContent = Engine.titleForLevel(level);
    dom.levelupOverlay.hidden = false;
    clearTimeout(levelUpTimer);
    levelUpTimer = setTimeout(hideLevelUp, 3200);
  }
  function hideLevelUp() {
    dom.levelupOverlay.hidden = true;
  }

  /* ---------- modal ---------- */

  function onModalKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  function openModal(title, bodyNode) {
    dom.modalTitle.textContent = title;
    dom.modalBody.innerHTML = '';
    dom.modalBody.appendChild(bodyNode);
    dom.modalOverlay.hidden = false;
    dom.modalClose.focus();
    document.addEventListener('keydown', onModalKeydown);
  }

  function closeModal() {
    dom.modalOverlay.hidden = true;
    document.removeEventListener('keydown', onModalKeydown);
  }

  function buildAboutModal() {
    var frag = document.createDocumentFragment();
    var p1 = document.createElement('p');
    p1.textContent = 'Syntaxia is a fantasy RPG where every spell you cast is real JavaScript. Clear quests on the Skill Tree to learn the language one concept at a time, earn XP, level up, and collect achievements.';
    var p2 = document.createElement('p');
    p2.textContent = 'Everything runs locally in your browser. There is no server, no account, and no tracking -- your progress is saved to this browser only, via localStorage.';
    frag.appendChild(p1);
    frag.appendChild(p2);
    return frag;
  }

  function buildShortcutsModal() {
    var frag = document.createDocumentFragment();
    var dl = document.createElement('dl');
    var entries = [
      ['Ctrl/Cmd + Enter', 'Cast your spell (run the code)'],
      ['Tab', 'Insert two spaces at the cursor'],
      ['Shift + Tab', 'Remove leading indentation'],
      ['Enter', 'New line, keeping the current indentation'],
      ['Esc', 'Close the open dialog']
    ];
    entries.forEach(function (pair) {
      var dt = document.createElement('dt');
      dt.textContent = pair[0];
      var dd = document.createElement('dd');
      dd.textContent = pair[1];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    frag.appendChild(dl);
    return frag;
  }

  function buildResetModal() {
    var frag = document.createDocumentFragment();
    var p = document.createElement('p');
    p.textContent = 'This clears every quest, XP, level, mana, streak and achievement stored in this browser. This cannot be undone. Are you sure?';
    frag.appendChild(p);
    var actions = document.createElement('div');
    actions.className = 'modal-actions';
    var cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'btn btn-ghost';
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', closeModal);
    var confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'btn btn-danger';
    confirm.textContent = 'Reset progress';
    confirm.addEventListener('click', function () {
      state = Engine.resetProgress();
      currentQuestId = null;
      questRunMeta = {};
      dom.questEmpty.hidden = false;
      dom.questContent.hidden = true;
      renderHUD();
      renderCharacter();
      renderMap();
      closeModal();
      showToast('Progress reset. Your journey begins again.', 'info');
    });
    actions.appendChild(cancel);
    actions.appendChild(confirm);
    frag.appendChild(actions);
    return frag;
  }

  /* ---------- wiring ---------- */

  function wireEvents() {
    dom.btnRun.addEventListener('click', onRun);
    dom.btnResetCode.addEventListener('click', function () {
      var q = questsById[currentQuestId];
      if (!q) return;
      dom.editorInput.value = q.starter;
      refreshHighlight();
      dom.editorInput.focus();
    });
    dom.btnHint.addEventListener('click', onHintClick);
    dom.editorInput.addEventListener('keydown', onEditorKeydown);
    dom.editorInput.addEventListener('input', refreshHighlight);
    dom.editorInput.addEventListener('scroll', syncScroll);

    dom.btnAbout.addEventListener('click', function () { openModal('About Syntaxia', buildAboutModal()); });
    dom.btnShortcuts.addEventListener('click', function () { openModal('Keyboard Shortcuts', buildShortcutsModal()); });
    dom.btnReset.addEventListener('click', function () { openModal('Reset Progress', buildResetModal()); });
    dom.modalClose.addEventListener('click', closeModal);
    dom.modalOverlay.addEventListener('click', function (e) {
      if (e.target === dom.modalOverlay) closeModal();
    });
    dom.levelupOverlay.addEventListener('click', hideLevelUp);

    window.addEventListener('resize', renderMap);
  }

  /* ---------- boot ---------- */

  function init(contentArg) {
    content = contentArg;
    questsById = {};
    content.quests.forEach(function (q) { questsById[q.id] = q; });

    cacheDom();
    state = Engine.load();
    state = Engine.touchStreak(state);
    state = Engine.regenerateMana(state);
    Engine.save(state);

    wireEvents();
    renderHUD();
    renderCharacter();
    renderMap();

    setInterval(function () {
      state = Engine.regenerateMana(state);
      Engine.save(state);
      renderCharacter();
      updateHintButton();
    }, 20000);
  }

  window.SyntaxiaUI = { init: init, openModal: openModal };
})();
