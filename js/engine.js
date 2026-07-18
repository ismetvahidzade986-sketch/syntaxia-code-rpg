// Game state: XP/levels, the skill-tree unlock rule, achievements ("Hall of
// Deeds") and localStorage persistence. Pure logic -- no DOM here.
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

  var TIER_POINTS = { bronze: 10, silver: 25, gold: 50 };

  var ACHIEVEMENT_CATEGORIES = [
    { id: 'journey', name: 'Journey' },
    { id: 'mastery', name: 'Mastery' },
    { id: 'scholar', name: 'Scholar' },
    { id: 'grit', name: 'Grit' },
    { id: 'ritual', name: 'Ritual' },
    { id: 'arcana', name: 'Arcana' }
  ];

  /* ---------- small state-reading helpers shared by achievement checks ---------- */

  function completedCount(state) { return Object.keys(state.completed).length; }

  function completedList(state) {
    return Object.keys(state.completed).map(function (id) { return state.completed[id]; });
  }

  function questsInAct(content, actId) {
    return content.quests.filter(function (q) { return q.act === actId; });
  }

  function actFullyClearedNoHint(content, state, act) {
    var qs = questsInAct(content, act.id);
    if (!qs.length) return false;
    return qs.every(function (q) {
      var c = state.completed[q.id];
      return !!c && !!c.noHint;
    });
  }

  var STAT_DEFAULTS = {
    noHintStreak: 0,
    runs: 0,
    failedRuns: 0,
    noHintClears: 0,
    firstTrySolves: 0,
    checkpointFirstTryRight: 0,
    checkpointAnswered: 0,
    glossaryOpens: 0,
    hintsUsedTotal: 0,
    langSwitches: 0,
    bossClears: 0,
    bestStreak: 0
  };

  function defaultStats() {
    return Object.assign({}, STAT_DEFAULTS);
  }

  /* ---------- the Hall of Deeds catalog ----------
     Every def: { id, category, tier, icon, name, desc, secret?, check(state, content),
     progress?(state, content) -> {current, target} }. Ids already earned in a
     pre-upgrade save are never renamed -- their check() may now mean something
     slightly different (see act-complete-* below) but that only affects what
     gets awarded NEXT, not what a save already has recorded. */

  var STATIC_ACHIEVEMENTS = [
    // -- Journey: the long road through all 43 quests --
    { id: 'first-blood', category: 'journey', tier: 'bronze', icon: '🔥', name: 'First Cast',
      desc: 'Clear your very first quest.',
      check: function (state) { return completedCount(state) >= 1; } },
    { id: 'clears-5', category: 'journey', tier: 'bronze', icon: '🥾', name: 'Wanderer',
      desc: 'Clear 5 quests.',
      check: function (state) { return completedCount(state) >= 5; },
      progress: function (state) { return { current: completedCount(state), target: 5 }; } },
    { id: 'clears-15', category: 'journey', tier: 'silver', icon: '🧭', name: 'Pathfinder',
      desc: 'Clear 15 quests.',
      check: function (state) { return completedCount(state) >= 15; },
      progress: function (state) { return { current: completedCount(state), target: 15 }; } },
    { id: 'clears-30', category: 'journey', tier: 'gold', icon: '🔦', name: 'Trailblazer',
      desc: 'Clear 30 quests.',
      check: function (state) { return completedCount(state) >= 30; },
      progress: function (state) { return { current: completedCount(state), target: 30 }; } },
    { id: 'clears-43', category: 'journey', tier: 'gold', icon: '🗺️', name: 'Realm Walker',
      desc: 'Clear 43 quests.',
      check: function (state) { return completedCount(state) >= 43; },
      progress: function (state) { return { current: completedCount(state), target: 43 }; } },
    { id: 'completionist', category: 'journey', tier: 'gold', icon: '📚', name: 'Master of Syntaxia',
      desc: 'Complete every quest currently in Syntaxia.',
      check: function (state, content) {
        return content.quests.length > 0 && content.quests.every(function (q) { return !!state.completed[q.id]; });
      },
      progress: function (state, content) { return { current: completedCount(state), target: content.quests.length }; } },
    { id: 'apprentice-rank', category: 'journey', tier: 'bronze', icon: '🥈', name: 'Apprentice Rank',
      desc: 'Reach level 3.',
      check: function (state) { return state.level >= 3; },
      progress: function (state) { return { current: state.level, target: 3 }; } },
    { id: 'adept-rank', category: 'journey', tier: 'silver', icon: '🥇', name: 'Adept Rank',
      desc: 'Reach level 5.',
      check: function (state) { return state.level >= 5; },
      progress: function (state) { return { current: state.level, target: 5 }; } },
    { id: 'archmage-rank', category: 'journey', tier: 'gold', icon: '👑', name: 'Archmage Rank',
      desc: 'Reach level 10.',
      check: function (state) { return state.level >= 10; },
      progress: function (state) { return { current: state.level, target: 10 }; } },

    // -- Mastery: how cleanly you clear a quest --
    { id: 'no-hints', category: 'mastery', tier: 'bronze', icon: '🎯', name: 'Pure Focus',
      desc: 'Clear a quest without revealing any hints.',
      check: function (state) { return (state.stats.noHintClears || 0) >= 1; },
      progress: function (state) { return { current: state.stats.noHintClears || 0, target: 1 }; } },
    { id: 'no-hint-5', category: 'mastery', tier: 'bronze', icon: '🌿', name: 'Focused Mind',
      desc: 'Clear 5 quests without any hints.',
      check: function (state) { return (state.stats.noHintClears || 0) >= 5; },
      progress: function (state) { return { current: state.stats.noHintClears || 0, target: 5 }; } },
    { id: 'no-hint-15', category: 'mastery', tier: 'silver', icon: '🍃', name: 'Steady Hand',
      desc: 'Clear 15 quests without any hints.',
      check: function (state) { return (state.stats.noHintClears || 0) >= 15; },
      progress: function (state) { return { current: state.stats.noHintClears || 0, target: 15 }; } },
    { id: 'no-hint-30', category: 'mastery', tier: 'gold', icon: '🌟', name: 'Pure Precision',
      desc: 'Clear 30 quests without any hints.',
      check: function (state) { return (state.stats.noHintClears || 0) >= 30; },
      progress: function (state) { return { current: state.stats.noHintClears || 0, target: 30 }; } },
    { id: 'five-streak-no-hint', category: 'mastery', tier: 'silver', icon: '⚡', name: 'Flow State',
      desc: 'Clear 5 quests in a row without a single hint.',
      check: function (state) { return (state.stats.noHintStreak || 0) >= 5; },
      progress: function (state) { return { current: Math.min(state.stats.noHintStreak || 0, 5), target: 5 }; } },
    { id: 'first-try-5', category: 'mastery', tier: 'bronze', icon: '🌱', name: 'Quick Study',
      desc: 'Clear 5 quests on your first attempt, with no failed runs.',
      check: function (state) { return (state.stats.firstTrySolves || 0) >= 5; },
      progress: function (state) { return { current: state.stats.firstTrySolves || 0, target: 5 }; } },
    { id: 'first-try-15', category: 'mastery', tier: 'silver', icon: '🎓', name: 'Sharp Instinct',
      desc: 'Clear 15 quests on your first attempt, with no failed runs.',
      check: function (state) { return (state.stats.firstTrySolves || 0) >= 15; },
      progress: function (state) { return { current: state.stats.firstTrySolves || 0, target: 15 }; } },
    { id: 'first-try-30', category: 'mastery', tier: 'gold', icon: '💎', name: 'Prodigy',
      desc: 'Clear 30 quests on your first attempt, with no failed runs.',
      check: function (state) { return (state.stats.firstTrySolves || 0) >= 30; },
      progress: function (state) { return { current: state.stats.firstTrySolves || 0, target: 30 }; } },
    { id: 'flawless-act', category: 'mastery', tier: 'gold', icon: '🛡️', name: 'Flawless Act',
      desc: 'Clear every quest in a single Act without ever using a hint.',
      check: function (state, content) { return content.acts.some(function (act) { return actFullyClearedNoHint(content, state, act); }); } },
    { id: 'speed-clear', category: 'mastery', tier: 'bronze', icon: '💨', name: 'Quick Cast',
      desc: 'Clear a quest within 30 seconds of your first run.',
      check: function (state) {
        return completedList(state).some(function (c) { return c.elapsedMs !== undefined && c.elapsedMs <= 30000; });
      } },

    // -- Scholar: reading the lesson, not just the code --
    { id: 'glossary-5', category: 'scholar', tier: 'bronze', icon: '📖', name: 'Word Seeker',
      desc: 'Open 5 glossary entries.',
      check: function (state) { return (state.stats.glossaryOpens || 0) >= 5; },
      progress: function (state) { return { current: state.stats.glossaryOpens || 0, target: 5 }; } },
    { id: 'glossary-25', category: 'scholar', tier: 'silver', icon: '📜', name: 'Lexicon Master',
      desc: 'Open 25 glossary entries.',
      check: function (state) { return (state.stats.glossaryOpens || 0) >= 25; },
      progress: function (state) { return { current: state.stats.glossaryOpens || 0, target: 25 }; } },
    { id: 'checkpoint-10', category: 'scholar', tier: 'bronze', icon: '🔍', name: 'Sharp Eye',
      desc: 'Get 10 checkpoint predictions right on your first pick.',
      check: function (state) { return (state.stats.checkpointFirstTryRight || 0) >= 10; },
      progress: function (state) { return { current: state.stats.checkpointFirstTryRight || 0, target: 10 }; } },
    { id: 'checkpoint-25', category: 'scholar', tier: 'silver', icon: '🧠', name: 'Keen Mind',
      desc: 'Get 25 checkpoint predictions right on your first pick.',
      check: function (state) { return (state.stats.checkpointFirstTryRight || 0) >= 25; },
      progress: function (state) { return { current: state.stats.checkpointFirstTryRight || 0, target: 25 }; } },

    // -- Grit: falling down and casting anyway --
    { id: 'curious-mind', category: 'grit', tier: 'bronze', icon: '💡', name: 'Curious Mind',
      desc: 'Reveal a hint for the first time.',
      check: function (state) { return (state.stats.hintsUsedTotal || 0) >= 1; } },
    { id: 'unbroken', category: 'grit', tier: 'silver', icon: '🩹', name: 'Unbroken',
      desc: 'Clear a quest after 3 or more failed runs on it.',
      check: function (state) { return completedList(state).some(function (c) { return (c.failsBeforeClear || 0) >= 3; }); } },
    { id: 'iron-will', category: 'grit', tier: 'gold', icon: '⚙️', name: 'Iron Will',
      desc: 'Clear a quest after 6 or more failed runs on it.',
      check: function (state) { return completedList(state).some(function (c) { return (c.failsBeforeClear || 0) >= 6; }); } },
    { id: 'spell-slinger', category: 'grit', tier: 'silver', icon: '🪄', name: 'Spell Slinger',
      desc: 'Run your code 100 times.',
      check: function (state) { return (state.stats.runs || 0) >= 100; },
      progress: function (state) { return { current: state.stats.runs || 0, target: 100 }; } },

    // -- Ritual: showing up, day after day --
    { id: 'streak-3', category: 'ritual', tier: 'bronze', icon: '📅', name: 'Dedicated',
      desc: 'Play 3 days in a row.',
      check: function (state) { return (state.streak.count || 0) >= 3; },
      progress: function (state) { return { current: state.streak.count || 0, target: 3 }; } },
    { id: 'streak-7', category: 'ritual', tier: 'silver', icon: '🗓️', name: 'Unbroken Chain',
      desc: 'Play 7 days in a row.',
      check: function (state) { return (state.streak.count || 0) >= 7; },
      progress: function (state) { return { current: state.streak.count || 0, target: 7 }; } },
    { id: 'streak-14', category: 'ritual', tier: 'gold', icon: '🕯️', name: 'Eternal Vigil',
      desc: 'Play 14 days in a row.',
      check: function (state) { return (state.streak.count || 0) >= 14; },
      progress: function (state) { return { current: state.streak.count || 0, target: 14 }; } },

    // -- Arcana: secret deeds, revealed only once earned --
    { id: 'polyglot', category: 'arcana', tier: 'bronze', icon: '🌐', name: 'Polyglot', secret: true,
      desc: "Switch Syntaxia's language.",
      check: function (state) { return (state.stats.langSwitches || 0) >= 1; } },
    { id: 'full-mana-boss', category: 'arcana', tier: 'gold', icon: '🔮', name: 'Reserve of Power', secret: true,
      desc: 'Defeat an Act boss while at full mana.',
      check: function (state, content) {
        return content.quests.some(function (q) {
          return /-boss$/.test(q.id) && state.completed[q.id] && state.completed[q.id].manaAtClear === state.maxMana;
        });
      } },
    { id: 'top-title', category: 'arcana', tier: 'gold', icon: '👁️', name: 'Ascendant', secret: true,
      desc: 'Reach the highest rank a spellcaster can hold.',
      check: function (state) { return state.level >= LEVEL_TITLES[LEVEL_TITLES.length - 1].min; } }
  ];

  function getAchievementDefs(content) {
    var dynamic = content.acts.map(function (act) {
      var bossId = 'act' + act.id + '-boss';
      return {
        id: 'act-complete-' + act.id,
        category: 'journey',
        tier: 'silver',
        icon: '⚔️',
        name: act.name + ' Boss Cleared',
        desc: 'Defeat the boss of ' + act.name + '.',
        check: function (state) { return !!state.completed[bossId]; }
      };
    });
    // Dynamic per-act defs slot in after the flat Journey list, before the
    // completionist/rank entries, purely for a sensible reading order --
    // ids are untouched either way, so save compatibility never depends on this.
    var flatIdx = STATIC_ACHIEVEMENTS.findIndex(function (a) { return a.id === 'completionist'; });
    return STATIC_ACHIEVEMENTS.slice(0, flatIdx).concat(dynamic, STATIC_ACHIEVEMENTS.slice(flatIdx));
  }

  function summarizeAchievements(state, content) {
    var defs = getAchievementDefs(content);
    var earnedCount = 0, points = 0;
    defs.forEach(function (d) {
      if (state.achievements[d.id]) {
        earnedCount++;
        points += TIER_POINTS[d.tier] || 0;
      }
    });
    return { earnedCount: earnedCount, totalCount: defs.length, points: points };
  }

  function evaluateAchievements(content, state) {
    var defs = getAchievementDefs(content);
    var newlyEarned = [];
    defs.forEach(function (def) {
      if (state.achievements[def.id]) return;
      var ok = false;
      try { ok = !!def.check(state, content); } catch (e) { ok = false; }
      if (ok) {
        state.achievements[def.id] = todayStr();
        newlyEarned.push(def.id);
      }
    });
    return newlyEarned;
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
      stats: defaultStats(),
      questFails: {},
      checkpointDone: {}
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
    // Backfill pattern: any stat this build knows about but an older save
    // doesn't have simply starts at its default, one save cycle away from
    // being indistinguishable from a save that always had it.
    state.stats = Object.assign(defaultStats(), parsed.stats || {});
    state.questFails = parsed.questFails && typeof parsed.questFails === 'object' ? parsed.questFails : {};
    state.checkpointDone = parsed.checkpointDone && typeof parsed.checkpointDone === 'object' ? parsed.checkpointDone : {};
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
    if (state.streak.lastPlayedDate !== today) {
      var y = new Date();
      y.setDate(y.getDate() - 1);
      var yesterday = todayStr(y);
      if (state.streak.lastPlayedDate === yesterday) {
        state.streak.count = (state.streak.count || 0) + 1;
      } else {
        state.streak.count = 1;
      }
      state.streak.lastPlayedDate = today;
    }
    state.stats.bestStreak = Math.max(state.stats.bestStreak || 0, state.streak.count || 0);
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

  // Marks the lesson intro (steps + checkpoint, or steps alone) as passed for a
  // quest so reopening it later skips straight to the workspace. Independent
  // of quest completion -- an in-progress quest can pass this gate too.
  function markCheckpointDone(state, questId) {
    state.checkpointDone[questId] = true;
    save(state);
    return state;
  }

  // Records whether the FIRST pick on a quest's checkpoint was correct. A
  // checkpoint is only ever shown once per quest (see ui.js), so this fires
  // exactly once per quest that has one.
  function recordCheckpointAnswer(content, state, correct) {
    state.stats.checkpointAnswered = (state.stats.checkpointAnswered || 0) + 1;
    if (correct) state.stats.checkpointFirstTryRight = (state.stats.checkpointFirstTryRight || 0) + 1;
    var newlyEarned = evaluateAchievements(content, state);
    save(state);
    return { state: state, newlyEarned: newlyEarned };
  }

  // Records one full run of the player's code (Cast Spell), pass or fail.
  // Only failed runs feed the per-quest fail counter that "Unbroken"/"Iron
  // Will"/first-try achievements read at the moment a quest is later cleared.
  function recordRun(content, state, quest, passed) {
    state.stats.runs = (state.stats.runs || 0) + 1;
    if (!passed) {
      state.stats.failedRuns = (state.stats.failedRuns || 0) + 1;
      state.questFails[quest.id] = (state.questFails[quest.id] || 0) + 1;
    }
    var newlyEarned = evaluateAchievements(content, state);
    save(state);
    return { state: state, newlyEarned: newlyEarned };
  }

  // Thin generic hook for simple monotonic counters (glossary opens, language
  // switches) that don't need any extra bookkeeping beyond "count this and
  // re-check achievements" -- keeps ui.js/lang.js from having to know
  // anything about achievement logic to report an event.
  function bump(content, state, key, amount) {
    state.stats[key] = (state.stats[key] || 0) + (amount === undefined ? 1 : amount);
    var newlyEarned = evaluateAchievements(content, state);
    save(state);
    return { state: state, newlyEarned: newlyEarned };
  }

  function canUseHint(state, quest) {
    var used = state.hintsRevealed[quest.id] || 0;
    return used < quest.hints.length && state.mana > 0;
  }

  function useHint(content, state, quest) {
    var newlyEarned = [];
    if (!canUseHint(state, quest)) return { ok: false, state: state, newlyEarned: newlyEarned };
    state.hintsRevealed[quest.id] = (state.hintsRevealed[quest.id] || 0) + 1;
    state.mana -= 1;
    state.stats.hintsUsedTotal = (state.stats.hintsUsedTotal || 0) + 1;
    newlyEarned = evaluateAchievements(content, state);
    save(state);
    return { ok: true, state: state, newlyEarned: newlyEarned };
  }

  function completeQuest(content, state, quest, opts) {
    opts = opts || {};
    var alreadyDone = !!state.completed[quest.id];
    var prevLevel = state.level;
    var newlyEarned = [];
    if (!alreadyDone) {
      var hintsUsedThisClear = state.hintsRevealed[quest.id] || 0;
      var failsBeforeClear = state.questFails[quest.id] || 0;
      var manaAtClear = state.mana; // snapshot before the completion mana refund below
      state.xp += quest.xp;
      state.level = levelForXp(state.xp);
      state.completed[quest.id] = {
        clearedAt: Date.now(),
        hintsUsed: hintsUsedThisClear,
        noHint: hintsUsedThisClear === 0,
        failsBeforeClear: failsBeforeClear,
        manaAtClear: manaAtClear,
        elapsedMs: opts.elapsedMs
      };
      state.mana = Math.min(state.maxMana, state.mana + 1);
      state.stats.noHintStreak = hintsUsedThisClear === 0 ? (state.stats.noHintStreak || 0) + 1 : 0;
      if (hintsUsedThisClear === 0) state.stats.noHintClears = (state.stats.noHintClears || 0) + 1;
      if (failsBeforeClear === 0) state.stats.firstTrySolves = (state.stats.firstTrySolves || 0) + 1;
      if (/-boss$/.test(quest.id)) state.stats.bossClears = (state.stats.bossClears || 0) + 1;
      newlyEarned = evaluateAchievements(content, state);
    }
    save(state);
    return { state: state, leveledUp: state.level > prevLevel, newLevel: state.level, newlyEarned: newlyEarned, alreadyDone: alreadyDone };
  }

  window.SyntaxiaEngine = {
    MAX_MANA: MAX_MANA,
    MANA_REGEN_MS: MANA_REGEN_MS,
    TIER_POINTS: TIER_POINTS,
    ACHIEVEMENT_CATEGORIES: ACHIEVEMENT_CATEGORIES,
    getAchievementDefs: getAchievementDefs,
    summarizeAchievements: summarizeAchievements,
    evaluateAchievements: evaluateAchievements,
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
    recordRun: recordRun,
    recordCheckpointAnswer: recordCheckpointAnswer,
    bump: bump,
    completeQuest: completeQuest,
    markCheckpointDone: markCheckpointDone
  };
})();
