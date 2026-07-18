# Syntaxia curriculum

## Where the order comes from

The act sequence follows the progression that MDN's Learn JS path, javascript.info, Eloquent
JavaScript, and Exercism's concept-gated JS track all agree on: values and types, then control
flow, then functions and scope, then data structures, then higher-order functions, then async.
Classes belong after prototypes (they're sugar over the same mechanism), the event loop deserves
to be taught as an explicit model rather than inferred from Promise syntax, and DOM work comes
after the language core is solid.

A few design rules, borrowed from CS education research rather than invented here:

- **Worked examples first, fading to blank-page problems.** Early quests lean on the lesson's
  example; later quests give you less. Novices learn more from studying worked code than from
  unassisted struggle, and the balance flips as skill grows.
- **Hints are Socratic before they're revealing.** The first hint asks you a question, the last
  one nearly gives it away, and each costs mana, so reaching for them is a choice.
- **Misconceptions get tested on purpose.** `==` vs `===`, truthiness, reference vs value,
  var/let scoping, `setTimeout(fn, 0)`, off-by-one loops -- quests are written so the classic
  wrong beliefs fail visibly, with failure messages that say what the wrong model was.

## Shipped acts (v1)

| Act | Name | Concepts | Quests |
|----:|------|----------|-------:|
| 1 | The Plains of Declaration | let, const, numbers, strings, template literals | 6 |
| 2 | The Forked Paths | booleans, comparison, if/else, && \|\| !, ternary | 5 |
| 3 | The Looping Wilds | while, for, for...of, break/continue, accumulation | 5 |
| 4 | The Hall of Functions | declarations, params/returns, defaults, arrows, composition | 5 |
| 5 | The Array Archipelago | create/index, push/pop, includes/indexOf, building arrays | 5 |
| 6 | The Object Sanctum | literals, methods, destructuring, Object.keys/values/entries | 5 |
| 7 | The Higher Order | callbacks, map, filter, reduce, find/some/every, sort | 7 |
| 8 | The Async Rift | event loop, setTimeout, promises, async/await | 5 |

Each act ends in a boss quest that requires the act's other quests, and clearing a boss unlocks
the next act.

## The roadmap (v2+)

Planned in this order, following the same prerequisite logic:

1. **Review quests** -- spaced, interleaved retrieval practice woven between acts. This is the
   single most evidence-backed mechanic missing from every mainstream platform: revisiting old
   concepts on a schedule, mixed together, beats blocked practice for retention.
2. **The Mirror (`this` & prototypes)** -- call-site rules, call/apply/bind, prototype chain.
3. **The Forge (classes)** -- taught explicitly as sugar over the prototype act.
4. **Deeper async** -- microtask vs macrotask ordering quests, predict-the-output bosses.
5. **The Marketplace (modules)** -- import/export, module scope.
6. **The Courtroom (error handling)** -- try/catch/finally, custom errors, async failure paths.
7. **The Stage (DOM & events)** -- a real interactive mini-app as the boss.
8. **The Academy (mastery capstone)** -- read an unfamiliar file, localize a bug from a stack
   trace, fix it with a passing test. Plus a full misconception sweep weighted toward what the
   learner personally got wrong along the way.

## Quest schema

Quests live in `js/content.js` (Act 1) and `js/content-extra.js` (Acts 2-8) as plain objects:

```js
{
  id: "act3-forloop",          // unique kebab-case
  act: 3,                      // act id
  title: "The Counting March",
  concept: "one-line summary",
  prereq: ["act3-while"],      // quest ids that must be cleared first
  xp: 30,                      // 25-60, bosses higher
  lesson: "<p>...</p>",        // whitelist-sanitized: p ul ol li code pre strong em br
  hints: ["nudge", "bigger nudge", "nearly the answer"],
  starter: "// code prefilled in the editor",
  mode: "function",            // "function" | "output" | "assert"
  entry: "march",              // function name the learner defines (function/assert modes)
  tests: [
    { args: [3], expect: [1, 2, 3], desc: "counts to three" }
  ],
  solution: "function march(n) { ... }"   // must pass every test
}
```

Test shapes by mode:

- `function`: `{ args, expect, desc }` -- deep-equality on the return value.
- `output`: `{ expectOutput: ["line 1", "line 2"], desc }` -- exact `console.log` capture.
- `assert`: `{ assert: "return entry(...) === ...", desc }` -- the body of a
  `function (entry, output) { ... }` returning true to pass.

Before opening a PR, run:

```bash
node tests/verify.js
```

It checks the schema, the prerequisite graph, duplicate ids, and that every reference solution
passes its own tests under the same grading rules the in-game runner uses. CI runs the same
script.
