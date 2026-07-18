// Game state: XP/levels, the skill-tree unlock rule, achievements and
// localStorage persistence. Pure logic -- no DOM here.
(function () {
  var STORAGE_KEY = 'syntaxia:save:v1';
  var MAX_MANA = 5;
  var MANA_REGEN_MS = 4 * 60 * 1000;

  var LEVEL_TITLES = [
    { min: 1, max: 1, title: 'Novice' },
    { min: 2, max: 3, title: 'Apprentice' },
    { min: 4, max: 5, title: 'Adept' },
    { min: 6, max: 7, title: 'Conjurer' },
    { min: 8, max: 9, title: 'Mage' },
    { min: 10, max: 12, title: 'Archmage' },
    { min: 13, max: Infinity, title: 'Runelord' }
  ];

  var ACHIEVEMENTS = [
    { id: 'first-blood', name: 'First Cast', desc: 'Clear your very first quest.', icon: '🔥' },
    { id: 'no-hints', name: 'Pure Focus', desc: 'Clear a quest without revealing any hints.', icon: '🎯' },
    { id: 'five-streak-no-hint', name: 'Flow State', desc: 'Clear 5 quests in a row without a single hint.', icon: '⚡' },
    { id: 'curious-mind', name: 'Curious Mind', desc: 'Reveal a hint for the first time.', icon: '💡' },
    { id: 'speed-clear', name: 'Quick Cast', desc: 'Clear a quest within 30 seconds of your first run.', icon: '💨' },
    { id: 'apprentice-rank', name: 'Apprentice Rank', desc: 'Reach level 3.', icon: '🥈' },
    { id: 'adept-rank', name: 'Adept Rank', desc: 'Reach level 5.', icon: '🥇' },
    { id: 'archmage-rank', name: 'Archmage Rank', desc: 'Reach level 10.', icon: '👑' },
    { id: 'streak-3', name: 'Dedicated', desc: 'Play 3 days in a row.', icon: '📅' },
    { id: 'streak-7', name: 'Unbroken Chain', desc: 'Play 7 days in a row.', icon: '🗓️' },
    { id: 'perfect-boss', name: 'Boss Slayer', desc: 'Defeat an Act boss without using a hint.', icon: '🛡️' },
    { id: 'completionist', name: 'Archivist', desc: 'Complete every quest currently in Syntaxia.', icon: '📚' }
  ];

  function getAchievementDefs(content) {
    var dynamic = content.acts.map(function (act) {
      return { id: 'act-complete-' + act.id, name: act.name + ' Cleared', desc: 'Complete every quest in ' + act.name + '.', icon: '🏆' };
    });
    return ACHIEVEMENTS.concat(dynamic);
  }

  function xpForLevel(level) {
    var n = level - 1;
    return 100 * n * (n + 1) / 2;
  }

  function levelForXp(xp) {
    var level = 1;
    while (xpForLevel(level + 1) <= xp) level++;
    return level;
  }

  function titleForLevel(level) {
    for (var i = 0; i < LEVEL_TITLES.length; i++) {
      var t = LEVEL_TITLES[i];
      if (level >= t.min && level <= t.max) return t.title;
    }
    return 'Runelord';
  }

  function todayStr(d) {
    d = d || new Date();
    return d.toISOString().slice(0, 10);
  }

  function defaultState() {
    return {
      version: 1,
      xp: 0,
      level: 1,
      completed: {},
      hintsRevealed: {},
      mana: MAX_MANA,
      maxMana: MAX_MANA,
      lastManaRegenAt: Date.now(),
      achievements: {},
      streak: { count: 0, lastPlayedDate: null },
      stats: { noHintStreak: 0 }
    };
  }

  function load() {
    var raw = null;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { raw = null; }
    var base = defaultState();
    if (!raw) return base;
    var parsed;
    try { parsed = JSON.parse(raw); } catch (e) { return base; }
    if (!parsed || typeof parsed !== 'object') return base;
    var state = base;
    state.xp = typeof parsed.xp === 'number' ? parsed.xp : 0;
    state.level = levelForXp(state.xp);
    state.completed = parsed.completed && typeof parsed.completed === 'object' ? parsed.completed : {};
    state.hintsRevealed = parsed.hintsRevealed && typeof parsed.hintsRevealed === 'object' ? parsed.hintsRevealed : {};
    state.mana = typeof parsed.mana === 'number' ? parsed.mana : MAX_MANA;
    state.maxMana = MAX_MANA;
    state.lastManaRegenAt = typeof parsed.lastManaRegenAt === 'number' ? parsed.lastManaRegenAt : Date.now();
    state.achievements = parsed.achievements && typeof parsed.achievements === 'object' ? parsed.achievements : {};
    state.streak = Object.assign({ count: 0, lastPlayedDate: null }, parsed.streak || {});
    state.stats = Object.assign({ noHintStreak: 0 }, parsed.stats || {});
    return state;
  }

  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }

  function resetProgress() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    return defaultState();
  }

  function regenerateMana(state) {
    var now = Date.now();
    if (state.mana >= state.maxMana) {
      state.lastManaRegenAt = now;
      return state;
    }
    var elapsed = now - state.lastManaRegenAt;
    var gained = Math.floor(elapsed / MANA_REGEN_MS);
    if (gained > 0) {
      state.mana = Math.min(state.maxMana, state.mana + gained);
      state.lastManaRegenAt += gained * MANA_REGEN_MS;
    }
    return state;
  }

  function touchStreak(state) {
    var today = todayStr();
    if (state.streak.lastPlayedDate === today) return state;
    var y = new Date();
    y.setDate(y.getDate() - 1);
    var yesterday = todayStr(y);
    if (state.streak.lastPlayedDate === yesterday) {
      state.streak.count = (state.streak.count || 0) + 1;
    } else {
      state.streak.count = 1;
    }
    state.streak.lastPlayedDate = today;
    return state;
  }

  function lowestActId(content) {
    return content.acts.reduce(function (min, a) { return a.id < min ? a.id : min; }, Infinity);
  }

  function isActReached(content, actId, state) {
    if (actId === lowestActId(content)) return true;
    return content.quests.some(function (q) { return q.act === actId - 1 && state.completed[q.id]; });
  }

  function isQuestAvailable(content, quest, state) {
    if (state.completed[quest.id]) return true;
    if (!isActReached(content, quest.act, state)) return false;
    return quest.prereq.every(function (id) { return !!state.completed[id]; });
  }

  function questStatus(content, quest, state) {
    if (state.completed[quest.id]) return 'completed';
    if (isQuestAvailable(content, quest, state)) return 'available';
    return 'locked';
  }

  function canUseHint(state, quest) {
    var used = state.hintsRevealed[quest.id] || 0;
    return used < quest.hints.length && state.mana > 0;
  }

  function useHint(state, quest) {
    var newlyEarned = [];
    if (!canUseHint(state, quest)) return { ok: false, state: state, newlyEarned: newlyEarned };
    var isFirstHintEver = Object.keys(state.hintsRevealed).length === 0 && (state.hintsRevealed[quest.id] || 0) === 0;
    state.hintsRevealed[quest.id] = (state.hintsRevealed[quest.id] || 0) + 1;
    state.mana -= 1;
    if (isFirstHintEver) earn(state, 'curious-mind', newlyEarned);
    save(state);
    return { ok: true, state: state, newlyEarned: newlyEarned };
  }

  function earn(state, id, newlyEarnedArr) {
    if (state.achievements[id]) return;
    state.achievements[id] = Date.now();
    if (newlyEarnedArr) newlyEarnedArr.push(id);
  }

  function checkAchievements(content, state, quest, opts, newlyEarned) {
    var hintsUsedThisClear = opts.hintsUsedThisClear || 0;
    if (Object.keys(state.completed).length >= 1) earn(state, 'first-blood', newlyEarned);
    if (hintsUsedThisClear === 0) earn(state, 'no-hints', newlyEarned);
    if ((state.stats.noHintStreak || 0) >= 5) earn(state, 'five-streak-no-hint', newlyEarned);
    if (opts.elapsedMs !== undefined && opts.elapsedMs <= 30000) earn(state, 'speed-clear', newlyEarned);
    if (state.level >= 3) earn(state, 'apprentice-rank', newlyEarned);
    if (state.level >= 5) earn(state, 'adept-rank', newlyEarned);
    if (state.level >= 10) earn(state, 'archmage-rank', newlyEarned);
    if ((state.streak.count || 0) >= 3) earn(state, 'streak-3', newlyEarned);
    if ((state.streak.count || 0) >= 7) earn(state, 'streak-7', newlyEarned);
    if (/-boss$/.test(quest.id) && hintsUsedThisClear === 0) earn(state, 'perfect-boss', newlyEarned);
    content.acts.forEach(function (act) {
      var actQuests = content.quests.filter(function (q) { return q.act === act.id; });
      if (actQuests.length && actQuests.every(function (q) { return !!state.completed[q.id]; })) {
        earn(state, 'act-complete-' + act.id, newlyEarned);
      }
    });
    if (content.quests.every(function (q) { return !!state.completed[q.id]; })) earn(state, 'completionist', newlyEarned);
  }

  function completeQuest(content, state, quest, opts) {
    opts = opts || {};
    var alreadyDone = !!state.completed[quest.id];
    var prevLevel = state.level;
    var newlyEarned = [];
    if (!alreadyDone) {
      var hintsUsedThisClear = state.hintsRevealed[quest.id] || 0;
      state.xp += quest.xp;
      state.level = levelForXp(state.xp);
      state.completed[quest.id] = {
        clearedAt: Date.now(),
        hintsUsed: hintsUsedThisClear,
        noHint: hintsUsedThisClear === 0
      };
      state.mana = Math.min(state.maxMana, state.mana + 1);
      state.stats.noHintStreak = hintsUsedThisClear === 0 ? (state.stats.noHintStreak || 0) + 1 : 0;
      checkAchievements(content, state, quest, Object.assign({ hintsUsedThisClear: hintsUsedThisClear }, opts), newlyEarned);
    }
    save(state);
    return { state: state, leveledUp: state.level > prevLevel, newLevel: state.level, newlyEarned: newlyEarned, alreadyDone: alreadyDone };
  }

  window.SyntaxiaEngine = {
    MAX_MANA: MAX_MANA,
    MANA_REGEN_MS: MANA_REGEN_MS,
    getAchievementDefs: getAchievementDefs,
    xpForLevel: xpForLevel,
    levelForXp: levelForXp,
    titleForLevel: titleForLevel,
    defaultState: defaultState,
    load: load,
    save: save,
    resetProgress: resetProgress,
    regenerateMana: regenerateMana,
    touchStreak: touchStreak,
    isActReached: isActReached,
    isQuestAvailable: isQuestAvailable,
    questStatus: questStatus,
    canUseHint: canUseHint,
    useHint: useHint,
    completeQuest: completeQuest
  };
})();
