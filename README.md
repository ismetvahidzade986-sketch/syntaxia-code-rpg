# Syntaxia

A free, zero-dependency browser RPG that teaches real JavaScript. You play a code-mage: every
spell you cast is actual JavaScript, checked against real tests in a sandboxed Web Worker. Clear
quests to light up a fantasy skill tree, earn XP, level up, and collect achievements. No signup
and no ads -- there's no backend at all. Everything runs in your browser and your progress is
saved locally.

**Play: https://ismetvahidzade986-sketch.github.io/syntaxia-code-rpg/**

## What's inside

- **8 acts, 43 quests** -- variables, control flow, loops, functions, arrays, objects,
  higher-order functions, and async. Each quest has a short lesson with a worked example,
  starter code, progressive hints that cost mana, and tests your code has to pass.
- **Click any underlined word** -- 107 programming terms have plain-language explanations with
  a small runnable example, right inside the lesson. The full searchable glossary is in the
  top bar too.
- **20 interface languages** -- English, Spanish, French, German, Portuguese (BR), Italian,
  Dutch, Polish, Turkish, Russian, Ukrainian, Arabic (RTL), Hindi, Indonesian, Vietnamese,
  Japanese, Korean, Chinese (Simplified and Traditional), and Azerbaijani. Lessons and code
  stay in English on purpose: the glossary is there to teach you the English vocabulary of
  programming, which is the one you'll meet in the real world.
- **A real editor** -- syntax highlighting, Tab indentation, Ctrl/Cmd+Enter to run. Learner code
  runs in a Web Worker with a hard 2.5s timeout, so `while (true) {}` gets killed with a friendly
  message instead of freezing the tab.
- **RPG progression** -- XP and a seven-title level ladder (Novice to Runelord), mana that pays
  for hints, daily streaks, achievements, and a skill tree where beating an act's boss opens
  the next act.

## Why this exists

Most "learn to code" games either lock the good stuff behind a login, or run your code on a
server somewhere. Syntaxia doesn't do either. Open `index.html` over any static file server and
you have the whole game: the editor, the test runner, the skill tree, the save file. It's meant
to be forked, extended, and hosted for free.

## Running it locally

There's no build step and nothing to install. You need a plain static file server because
the code sandbox runs in a Web Worker, and browsers block Workers on the `file://` protocol.
Any of these work:

```bash
python3 -m http.server 8080      # then open http://localhost:8080
# or
npx serve .
```

Then open the printed URL. That's it -- `index.html` pulls in everything else with plain
`<script>` tags, in dependency order.

## How it works

- **`js/content.js` / `js/content-extra.js`** -- the quest data. Each quest has a lesson,
  starter code, a reference solution, and tests. Everything downstream (skill tree, unlocks,
  achievements) is derived from this data, so adding a quest means adding an object, nothing else.
- **`js/glossary.js` / `js/i18n.js` / `js/lang.js`** -- the language layer: the clickable term
  glossary, the 20-language string table, and the small runtime that applies translations,
  handles RTL, and decorates lesson text with glossary links.
- **`js/highlight.js`** -- a small regex-based JavaScript syntax highlighter, plus the shared
  `escapeHtml` helper every other module routes dynamic text through before it touches the DOM.
- **`js/runner.js`** -- builds a Web Worker from an inline `Blob` (so there's no separate worker
  file to host) and runs learner code against a quest's tests: `function` mode deep-equals a
  return value, `output` mode checks captured `console.log` lines, `assert` mode runs a custom
  check with access to the defined function and captured output. A hard 2.5s timeout kills
  runaway loops and the worker is discarded and rebuilt for the next run.
- **`js/engine.js`** -- pure game state: XP curve, level titles, the skill-tree unlock rule
  (a quest becomes playable once its act is reached and every prerequisite is cleared), mana/hints,
  streaks, achievements, and `localStorage` persistence under a versioned key.
- **`js/ui.js`** -- renders the skill tree (auto-laid-out from the quest graph, so it grows with
  the content file), the character panel, the quest panel and its editor, and wires up every
  button, keyboard shortcut and modal.
- **`js/app.js`** -- merges the content packs and boots the whole thing once the DOM is ready.

The quest lesson HTML is passed through a small whitelist sanitizer before insertion (only
`p`, `ul`, `ol`, `li`, `code`, `pre`, `strong`, `em`, `br` survive, with all attributes stripped).

## Curriculum

Act order follows the sequencing shared by MDN, javascript.info, Eloquent JavaScript, and
Exercism's JS track: make the language core automatic before touching anything fancy.

1. **The Plains of Declaration** -- variables and types
2. **The Forked Paths** -- booleans, if/else, logical operators
3. **The Looping Wilds** -- while, for, for...of, break/continue
4. **The Hall of Functions** -- declarations, parameters, arrows, scope
5. **The Array Archipelago** -- arrays and their methods
6. **The Object Sanctum** -- objects, methods, destructuring
7. **The Higher Order** -- callbacks, map/filter/reduce, sort
8. **The Async Rift** -- the event loop, promises, async/await

The longer-term plan (spaced review quests, `this` and prototypes, classes, modules, error
handling, DOM, and a mastery capstone) lives in [docs/CURRICULUM.md](docs/CURRICULUM.md), along
with the quest schema if you want to write quests.

Every quest's reference solution is verified against its own tests by `node tests/verify.js`,
which also runs in CI.

## Accessibility & compatibility

Semantic HTML, keyboard-operable throughout (every skill-tree node and control is a real
`<button>`), ARIA live regions on status updates, AA-contrast colors, and `prefers-reduced-motion`
respected for the starfield, glow pulses and transitions. No external fonts, scripts, or CDNs --
just the browser's own system font stack and monospace fonts. Code stays left-to-right in RTL
locales.

## License

MIT. See [LICENSE](LICENSE).
