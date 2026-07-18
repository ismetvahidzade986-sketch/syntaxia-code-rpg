// Syntaxia content data -- Acts 2 through 8.
// Appends onto window.SYNTAXIA_CONTENT via window.SYNTAXIA_EXTRA; see js/content.js
// for the base schema and Act 1.
(function () {
  var acts = [
    {
      id: 2,
      name: 'The Forked Paths',
      theme: 'Control Flow',
      blurb: 'Where every path splits in two, and only clear logic picks the right one.',
      accent: '#c0392b'
    },
    {
      id: 3,
      name: 'The Looping Wilds',
      theme: 'Loops',
      blurb: 'A tangled wilderness that only yields to those who know how to repeat themselves.',
      accent: '#27ae60'
    },
    {
      id: 4,
      name: 'The Hall of Functions',
      theme: 'Functions',
      blurb: 'A vast hall of reusable magic, where small spells combine into greater ones.',
      accent: '#8e44ad'
    },
    {
      id: 5,
      name: 'The Array Archipelago',
      theme: 'Arrays',
      blurb: 'A scattered chain of islands, each one holding an ordered list of treasures.',
      accent: '#2980b9'
    },
    {
      id: 6,
      name: 'The Object Sanctum',
      theme: 'Objects',
      blurb: 'A quiet sanctum where knowledge is kept in labeled, nested chambers.',
      accent: '#d35400'
    },
    {
      id: 7,
      name: 'The Higher Order',
      theme: 'Higher-Order Functions',
      blurb: 'Spells that cast other spells -- the highest craft an array can learn.',
      accent: '#f1c40f'
    },
    {
      id: 8,
      name: 'The Async Rift',
      theme: 'Asynchronous JavaScript',
      blurb: 'A shimmering tear in time, where some answers only arrive after a wait.',
      accent: '#16a085'
    }
  ];

  var quests = [
    {
      id: 'act2-booleans',
      act: 2,
      title: 'The Coin of Truth',
      concept: 'Booleans and comparison operators produce true/false values.',
      prereq: ['act1-boss'],
      xp: 25,
      lesson: '<p>Every gate in Syntaxia asks a yes-or-no question, and JavaScript answers with a <strong>boolean</strong>: <code>true</code> or <code>false</code>. You get there with <strong>comparison operators</strong>.</p>' +
        '<ul><li><code>===</code> and <code>!==</code> check strict equality (same value AND same type)</li><li><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> compare size or order</li></ul>' +
        '<p>Avoid the loose <code>==</code> and <code>!=</code> operators. They quietly convert types before comparing, so <code>\'5\' == 5</code> is <code>true</code> even though one is a string and the other a number. The strict versions, <code>===</code> and <code>!==</code>, refuse to do that conversion, which keeps your logic predictable.</p>' +
        '<pre><code>let power = 12;\nlet requiredPower = 10;\n\nconsole.log(power &gt;= requiredPower); // true\nconsole.log(power === 10);             // false\nconsole.log(\'5\' === 5);                // false, different types</code></pre>' +
        '<p>Comparisons like these are the raw material of every decision your code will ever make. Master them here and if/else, loops, and conditions all get easier.</p>',
      hints: [
        'Use the >= operator to compare power against requiredPower directly.',
        'You do not need an if statement here -- a comparison expression already evaluates to true or false.',
        'Return power >= requiredPower; that single expression is your entire function body.'
      ],
      starter: 'function canPassGate(power, requiredPower) {\n  // return true if power is enough to pass the gate\n\n}',
      mode: 'function',
      entry: 'canPassGate',
      tests: [
        { args: [10, 10], expect: true, desc: 'equal power meets an equal requirement' },
        { args: [5, 10], expect: false, desc: 'not enough power fails the gate' },
        { args: [15, 10], expect: true, desc: 'more than enough power passes' },
        { args: [0, 0], expect: true, desc: 'zero meets a zero requirement' }
      ],
      solution: 'function canPassGate(power, requiredPower) {\n  return power >= requiredPower;\n}'
    },
    {
      id: 'act2-ifelse',
      act: 2,
      title: 'The Fork in the Road',
      concept: 'if/else and else if choose one branch to run based on a condition.',
      prereq: ['act2-booleans'],
      xp: 30,
      lesson: '<p>An <code>if</code> statement runs a block only when its condition is <code>true</code>. Add <code>else</code> for what happens otherwise, and <code>else if</code> to test additional conditions in order.</p>' +
        '<pre><code>if (power &lt; 10) {\n  console.log(\'weak\');\n} else if (power &lt; 25) {\n  console.log(\'capable\');\n} else {\n  console.log(\'mighty\');\n}</code></pre>' +
        '<p>JavaScript checks each condition top to bottom and stops at the first one that is true, skipping the rest. Order matters: if you swapped the branches above and checked <code>power &lt; 25</code> first, a power of 5 would incorrectly land in \'capable\' instead of \'weak\', because 5 is also less than 25. Always put your narrowest or most specific condition first when ranges overlap like this.</p>' +
        '<p>You can chain as many <code>else if</code> blocks as you need, and the final plain <code>else</code> acts as a catch-all for anything that did not match earlier conditions. Only one branch ever runs per call.</p>',
      hints: [
        'Write three branches: power < 10, power < 25, and everything else.',
        'Check the smaller boundary first (< 10), then the next (< 25) -- order matters because JavaScript stops at the first true condition.',
        'return \'weak\' if power < 10; else return \'capable\' if power < 25; else return \'mighty\'.'
      ],
      starter: 'function classifyPower(power) {\n  // return \'weak\', \'capable\', or \'mighty\'\n\n}',
      mode: 'function',
      entry: 'classifyPower',
      tests: [
        { args: [0], expect: 'weak', desc: 'zero power is weak' },
        { args: [9], expect: 'weak', desc: 'just under the first boundary is still weak' },
        { args: [10], expect: 'capable', desc: 'the boundary itself counts as capable' },
        { args: [24], expect: 'capable', desc: 'just under the second boundary is still capable' },
        { args: [25], expect: 'mighty', desc: 'the second boundary counts as mighty' },
        { args: [100], expect: 'mighty', desc: 'well above the boundary is mighty' }
      ],
      solution: 'function classifyPower(power) {\n  if (power < 10) {\n    return \'weak\';\n  } else if (power < 25) {\n    return \'capable\';\n  } else {\n    return \'mighty\';\n  }\n}'
    },
    {
      id: 'act2-logical',
      act: 2,
      title: 'The Vault of And, Or, Not',
      concept: 'Combine booleans with && (and), || (or), and ! (not).',
      prereq: ['act2-ifelse'],
      xp: 30,
      lesson: '<p>Logical operators combine or invert booleans:</p>' +
        '<ul><li><code>&amp;&amp;</code> (AND) is true only when both sides are true</li><li><code>||</code> (OR) is true when at least one side is true</li><li><code>!</code> (NOT) flips true to false and false to true</li></ul>' +
        '<pre><code>let hasKey = true;\nlet isCursed = false;\n\nconsole.log(hasKey &amp;&amp; !isCursed); // true\nconsole.log(hasKey || isCursed);    // true</code></pre>' +
        '<p><code>&amp;&amp;</code> and <code>||</code> both <strong>short-circuit</strong>: for <code>&amp;&amp;</code>, if the left side is false, JavaScript never even evaluates the right side, because the whole expression is already guaranteed false. For <code>||</code>, if the left side is true, the right side is skipped since the result is already true. This is not just an optimization -- you can rely on it, for example to safely check <code>obj &amp;&amp; obj.value</code> without crashing when <code>obj</code> is missing.</p>' +
        '<p>You can combine several conditions in one expression, and parentheses make the intended grouping explicit, which is good practice even when not strictly required.</p>',
      hints: [
        'You need all three inputs to matter: combine hasKey, hasTorch, and the negation of isCursed.',
        'Use && to require hasKey AND hasTorch, and use ! to flip isCursed.',
        'return (hasKey && hasTorch) && !isCursed;'
      ],
      starter: 'function canEnterVault(hasKey, hasTorch, isCursed) {\n  // true only if the hero has both the key and torch, and is not cursed\n\n}',
      mode: 'function',
      entry: 'canEnterVault',
      tests: [
        { args: [true, true, false], expect: true, desc: 'has both items and no curse' },
        { args: [true, false, false], expect: false, desc: 'missing the torch fails' },
        { args: [true, true, true], expect: false, desc: 'a curse blocks entry even with both items' },
        { args: [false, false, false], expect: false, desc: 'missing everything fails' }
      ],
      solution: 'function canEnterVault(hasKey, hasTorch, isCursed) {\n  return hasKey && hasTorch && !isCursed;\n}'
    },
    {
      id: 'act2-ternary',
      act: 2,
      title: 'The Riddle in One Breath',
      concept: 'The ternary operator condition ? a : b picks a value in one expression.',
      prereq: ['act2-logical'],
      xp: 30,
      lesson: '<p>The <strong>ternary operator</strong> <code>condition ? valueIfTrue : valueIfFalse</code> is a compact if/else that produces a value instead of running a block. It reads left to right: ask a question, then give the answer for true, then the answer for false.</p>' +
        '<pre><code>let hp = 15;\nlet status = hp &gt; 0 ? \'alive\' : \'fallen\';\nconsole.log(status); // \'alive\'</code></pre>' +
        '<p>Ternaries can be chained to handle more than two outcomes, by putting another ternary in the \'false\' slot:</p>' +
        '<pre><code>let rank = level &gt;= 20 ? \'master\'\n  : level &gt;= 10 ? \'adept\'\n  : \'novice\';</code></pre>' +
        '<p>Chained ternaries are evaluated top to bottom just like <code>else if</code>: the first condition that is true wins. They are best used for short, simple decisions that produce a value directly. If the logic grows complex, or you need to run multiple statements per branch, a regular if/else is more readable -- do not force a ternary just to be clever.</p>',
      hints: [
        'You need two decision points, so chain two ternaries: level >= 20 first, then level >= 10.',
        'Structure it like: level >= 20 ? \'master\' : (level >= 10 ? \'adept\' : \'novice\').',
        'return level >= 20 ? \'master\' : level >= 10 ? \'adept\' : \'novice\';'
      ],
      starter: 'function classifyRank(level) {\n  // return \'master\', \'adept\', or \'novice\' using a chained ternary\n\n}',
      mode: 'function',
      entry: 'classifyRank',
      tests: [
        { args: [25], expect: 'master', desc: 'high level is master' },
        { args: [20], expect: 'master', desc: 'the boundary counts as master' },
        { args: [15], expect: 'adept', desc: 'mid level is adept' },
        { args: [10], expect: 'adept', desc: 'the lower boundary counts as adept' },
        { args: [5], expect: 'novice', desc: 'low level is novice' }
      ],
      solution: 'function classifyRank(level) {\n  return level >= 20 ? \'master\' : level >= 10 ? \'adept\' : \'novice\';\n}'
    },
    {
      id: 'act2-boss',
      act: 2,
      title: 'Boss: The Gatekeeper\'s Riddle',
      concept: 'Combine booleans, if/else, and logical operators into one decision engine.',
      prereq: ['act2-booleans', 'act2-ifelse', 'act2-logical', 'act2-ternary'],
      xp: 50,
      lesson: '<p>Every fork in the road eventually leads to a gatekeeper who has to make one real decision from many moving parts. This is where booleans, if/else, and logical operators all work together. The trick is not any single operator -- it is the <strong>order</strong> you check things in.</p>' +
        '<pre><code>if (hp &lt;= 0) {\n  return \'retreat\';\n}\nif (enemyNear &amp;&amp; mana &gt;= 10) {\n  return \'cast spell\';\n}\n// ...more checks below</code></pre>' +
        '<p>Because <code>if</code> statements stop at the first match, put your most urgent, most specific condition first. A fallen hero (<code>hp &lt;= 0</code>) should retreat no matter what else is true -- even if an enemy is near and a potion is in hand. That check has to come before the others or it will never be reached.</p>' +
        '<p>Build the decision engine below, checking conditions in this priority order: retreat if out of hp, cast a spell if an enemy is near and mana is at least 10, drink a potion if an enemy is near, a potion is held, and hp is under 20, attack if an enemy is simply near, and otherwise explore.</p>',
      hints: [
        'Destructure the context object, then write four if statements in order of urgency, each with an early return.',
        'The hp <= 0 check must come first, before any enemy-related checks -- a fallen hero always retreats.',
        'Order: hp<=0 -> \'retreat\'; else enemyNear && mana>=10 -> \'cast spell\'; else enemyNear && hasPotion && hp<20 -> \'drink potion\'; else enemyNear -> \'attack\'; else \'explore\'.'
      ],
      starter: 'function decideAction(context) {\n  const { hp, mana, enemyNear, hasPotion } = context;\n  // check conditions in priority order and return the right action string\n\n}',
      mode: 'function',
      entry: 'decideAction',
      tests: [
        { args: [{ hp: 0, mana: 0, enemyNear: true, hasPotion: true }], expect: 'retreat', desc: 'a fallen hero always retreats first, before any other check' },
        { args: [{ hp: 50, mana: 15, enemyNear: true, hasPotion: false }], expect: 'cast spell', desc: 'enough mana near an enemy casts a spell' },
        { args: [{ hp: 10, mana: 0, enemyNear: true, hasPotion: true }], expect: 'drink potion', desc: 'low hp with a potion and no mana' },
        { args: [{ hp: 50, mana: 0, enemyNear: true, hasPotion: false }], expect: 'attack', desc: 'an enemy near with no better option means attack' },
        { args: [{ hp: 50, mana: 0, enemyNear: false, hasPotion: true }], expect: 'explore', desc: 'nothing urgent means it is safe to explore' }
      ],
      solution: 'function decideAction(context) {\n  const { hp, mana, enemyNear, hasPotion } = context;\n  if (hp <= 0) {\n    return \'retreat\';\n  }\n  if (enemyNear && mana >= 10) {\n    return \'cast spell\';\n  }\n  if (enemyNear && hasPotion && hp < 20) {\n    return \'drink potion\';\n  }\n  if (enemyNear) {\n    return \'attack\';\n  }\n  return \'explore\';\n}'
    },
    {
      id: 'act3-while',
      act: 3,
      title: 'The First Cycle',
      concept: 'while repeats a block for as long as its condition stays true.',
      prereq: ['act2-boss'],
      xp: 25,
      lesson: '<p>A <code>while</code> loop repeats a block for as long as its condition stays true. You control it with three pieces: a starting value, the condition that keeps it going, and something inside the loop that eventually makes the condition false -- otherwise it never stops.</p>' +
        '<pre><code>let i = 1;\nwhile (i &lt;= 5) {\n  console.log(i);\n  i++;\n}\n// logs 1, 2, 3, 4, 5</code></pre>' +
        '<p>The condition is checked <strong>before</strong> every iteration, including the first. If it is false immediately, the loop body never runs at all -- that is a normal, useful outcome, not an error. It is what should happen, for example, when counting up to zero.</p>' +
        '<p><code>while</code> loops are the most flexible loop because the condition can be anything, not just a counter. Use them when the number of repetitions is not known ahead of time -- waiting for an event, walking a data structure until you hit an end marker, and so on. When you know the exact count in advance, a <code>for</code> loop (next!) is usually a tidier fit.</p>',
      hints: [
        'Start a counter at 1 and push it into a results array while it is <= n.',
        'Remember to increment the counter inside the loop, or it will run forever.',
        'const result = []; let i = 1; while (i <= n) { result.push(i); i++; } return result;'
      ],
      starter: 'function countUpTo(n) {\n  const result = [];\n  // fill result with 1, 2, ..., n using a while loop\n\n  return result;\n}',
      mode: 'function',
      entry: 'countUpTo',
      tests: [
        { args: [5], expect: [1, 2, 3, 4, 5], desc: 'counts up from 1 to 5' },
        { args: [1], expect: [1], desc: 'a single-step count' },
        { args: [0], expect: [], desc: 'counting to zero produces an empty list -- the loop body never runs' }
      ],
      solution: 'function countUpTo(n) {\n  const result = [];\n  let i = 1;\n  while (i <= n) {\n    result.push(i);\n    i++;\n  }\n  return result;\n}'
    },
    {
      id: 'act3-for',
      act: 3,
      title: 'The Counted March',
      concept: 'for packs start, condition, and step into a single loop header.',
      prereq: ['act3-while'],
      xp: 30,
      lesson: '<p>A <code>for</code> loop packs the three parts of a while loop -- start, condition, step -- into one line: <code>for (start; condition; step)</code>. It is the natural choice when you already know how many times to repeat something.</p>' +
        '<pre><code>let sum = 0;\nfor (let i = 1; i &lt;= 5; i++) {\n  sum += i;\n}\nconsole.log(sum); // 15</code></pre>' +
        '<p>Each part runs at a specific moment: the start runs once before anything else, the condition is checked before every iteration, and the step runs after every iteration\'s body. If the condition is false from the very first check -- say, a starting value already past the ending value -- the body never executes and the loop finishes instantly with whatever the accumulator was before it began.</p>' +
        '<p>The <code>+=</code> operator above is shorthand for <code>sum = sum + i</code>. Accumulating a running total across a loop like this is one of the most common patterns you will write in JavaScript, so it is worth getting comfortable with early.</p>',
      hints: [
        'Declare a sum variable at 0, then loop i from start to end inclusive, adding i to sum each time.',
        'The loop condition should be i <= end so the end value itself gets included.',
        'let sum = 0; for (let i = start; i <= end; i++) { sum += i; } return sum;'
      ],
      starter: 'function sumRange(start, end) {\n  let sum = 0;\n  // add every number from start to end (inclusive) into sum\n\n  return sum;\n}',
      mode: 'function',
      entry: 'sumRange',
      tests: [
        { args: [1, 5], expect: 15, desc: 'sums 1 through 5' },
        { args: [5, 5], expect: 5, desc: 'a range of a single number' },
        { args: [3, 1], expect: 0, desc: 'start after end means the loop never runs, sum stays 0' }
      ],
      solution: 'function sumRange(start, end) {\n  let sum = 0;\n  for (let i = start; i <= end; i++) {\n    sum += i;\n  }\n  return sum;\n}'
    },
    {
      id: 'act3-forof',
      act: 3,
      title: 'The Path of Values',
      concept: 'for...of walks directly over the values in an array.',
      prereq: ['act3-for'],
      xp: 30,
      lesson: '<p><code>for...of</code> loops walk directly over the values in an array (or any iterable), with no counter or index bookkeeping required.</p>' +
        '<pre><code>const coins = [10, 20, 30];\nlet total = 0;\nfor (const coin of coins) {\n  total += coin;\n}\nconsole.log(total); // 60</code></pre>' +
        '<p>Compare that to a plain <code>for</code> loop, where you would need <code>coins[i]</code> to reach each value. <code>for...of</code> hands you the value directly on each pass, which reads more clearly and avoids off-by-one mistakes with the index. Use <code>const</code> for the loop variable when you are not reassigning it inside the loop, which is the common case.</p>' +
        '<p>An empty array is a perfectly normal input: the loop body simply never runs, and any accumulator you set up beforehand -- like <code>total</code> above -- keeps its starting value. That is not a bug, it is <code>for...of</code> behaving exactly as it should on zero items.</p>',
      hints: [
        'Loop over coins with for...of and add each coin to a running total.',
        'You don\'t need coins[i] or an index variable at all -- for...of gives you the value directly.',
        'let total = 0; for (const coin of coins) { total += coin; } return total;'
      ],
      starter: 'function totalGold(coins) {\n  let total = 0;\n  // add up every coin using for...of\n\n  return total;\n}',
      mode: 'function',
      entry: 'totalGold',
      tests: [
        { args: [[10, 20, 30]], expect: 60, desc: 'sums a list of coins' },
        { args: [[]], expect: 0, desc: 'an empty pouch totals zero' },
        { args: [[5]], expect: 5, desc: 'a single coin' }
      ],
      solution: 'function totalGold(coins) {\n  let total = 0;\n  for (const coin of coins) {\n    total += coin;\n  }\n  return total;\n}'
    },
    {
      id: 'act3-breakcontinue',
      act: 3,
      title: 'Break the Chain, Skip the Trap',
      concept: 'break exits a loop early; continue skips straight to the next iteration.',
      prereq: ['act3-forof'],
      xp: 35,
      lesson: '<p>Inside any loop, <code>break</code> exits the loop immediately, and <code>continue</code> skips straight to the next iteration without running the rest of the current one.</p>' +
        '<pre><code>for (const n of [-5, 3, 10, 20]) {\n  if (n &lt; 0) continue;  // skip negative numbers entirely\n  if (n &gt;= 8) {\n    console.log(n);       // 10\n    break;                 // stop looking once found\n  }\n}</code></pre>' +
        '<p><code>continue</code> is useful for filtering out cases you want to ignore without nesting your remaining logic in an <code>else</code> block. <code>break</code> is useful once you have found what you need and there is no reason to keep checking the rest -- it saves wasted work and clearly signals \'search complete\'.</p>' +
        '<p>If a loop finishes normally without ever hitting <code>break</code> -- because nothing matched -- that is a real, expected outcome you need to handle, usually with a sentinel value like <code>-1</code> set before the loop and returned afterward if nothing was found.</p>',
      hints: [
        'Set up a result variable (like -1) before the loop, in case nothing matches.',
        'Use continue to skip negative numbers, and break once you find a value >= minValue.',
        'for (const item of items) { if (item < 0) continue; if (item >= minValue) { found = item; break; } } return found;'
      ],
      starter: 'function findFirstTreasure(items, minValue) {\n  let found = -1;\n  // skip negative items, and stop at the first item >= minValue\n\n  return found;\n}',
      mode: 'function',
      entry: 'findFirstTreasure',
      tests: [
        { args: [[-5, 3, 10, 20], 8], expect: 10, desc: 'skips the negative, then finds the first value at or above the threshold' },
        { args: [[1, 2, 3], 100], expect: -1, desc: 'nothing meets the threshold, so the loop completes without breaking' },
        { args: [[-1, -2, 50], 10], expect: 50, desc: 'skips two negatives before finding a match' }
      ],
      solution: 'function findFirstTreasure(items, minValue) {\n  let found = -1;\n  for (const item of items) {\n    if (item < 0) continue;\n    if (item >= minValue) {\n      found = item;\n      break;\n    }\n  }\n  return found;\n}'
    },
    {
      id: 'act3-boss',
      act: 3,
      title: 'Boss: Camp of Tallies',
      concept: 'Iterate and accumulate several counters in a single pass.',
      prereq: ['act3-while', 'act3-for', 'act3-forof', 'act3-breakcontinue'],
      xp: 50,
      lesson: '<p>An expedition log is a stream of small events, and your job is to turn it into a tidy summary -- the essence of every loop you have learned so far in one task: iterate, check, and accumulate.</p>' +
        '<pre><code>const events = [\'step\', \'treasure\', \'danger\', \'step\'];\nlet steps = 0;\nfor (const event of events) {\n  if (event === \'step\') steps++;\n}\nconsole.log(steps); // 2</code></pre>' +
        '<p>Walk the events with <code>for...of</code>, and for each one use if/else if to decide which counter to increment. Any event string that does not match one of the known categories should simply be ignored -- not every entry needs to affect the tally, and that is fine.</p>' +
        '<p>Return the three counts together in one object, <code>{ steps, treasures, dangers }</code>. This is the shorthand property syntax: when a variable name matches the property name you want, you can write <code>{ steps }</code> instead of the more verbose <code>{ steps: steps }</code>.</p>',
      hints: [
        'Declare three counters at 0, then loop the events with for...of.',
        'Use if/else if to match \'step\', \'treasure\', and \'danger\' -- anything else falls through untouched.',
        'return { steps, treasures, dangers }; using the shorthand property syntax once your counters are done.'
      ],
      starter: 'function summarizeJourney(events) {\n  let steps = 0;\n  let treasures = 0;\n  let dangers = 0;\n  // tally each kind of event\n\n  return { steps, treasures, dangers };\n}',
      mode: 'function',
      entry: 'summarizeJourney',
      tests: [
        { args: [['step', 'step', 'treasure', 'danger', 'step']], expect: { steps: 3, treasures: 1, dangers: 1 }, desc: 'a mixed journey log' },
        { args: [[]], expect: { steps: 0, treasures: 0, dangers: 0 }, desc: 'an empty log tallies all zeros' },
        { args: [['treasure', 'treasure', 'mystery']], expect: { steps: 0, treasures: 2, dangers: 0 }, desc: 'unknown event types are simply ignored' }
      ],
      solution: 'function summarizeJourney(events) {\n  let steps = 0;\n  let treasures = 0;\n  let dangers = 0;\n  for (const event of events) {\n    if (event === \'step\') {\n      steps++;\n    } else if (event === \'treasure\') {\n      treasures++;\n    } else if (event === \'danger\') {\n      dangers++;\n    }\n  }\n  return { steps, treasures, dangers };\n}'
    },
    {
      id: 'act4-basics',
      act: 4,
      title: 'The Shape of a Spell',
      concept: 'Function declarations take parameters and hand back a value with return.',
      prereq: ['act3-boss'],
      xp: 25,
      lesson: '<p>A <strong>function declaration</strong> packages up reusable logic under a name, accepts input through <strong>parameters</strong>, and hands back a single value with <code>return</code>.</p>' +
        '<pre><code>function computeDamage(base, multiplier) {\n  return base * multiplier;\n}\n\nconsole.log(computeDamage(10, 2)); // 20</code></pre>' +
        '<p>The moment <code>return</code> runs, the function stops immediately and hands that value back to whoever called it -- any code written after a <code>return</code> inside the same block never executes. A function with no <code>return</code> statement at all implicitly returns <code>undefined</code>, which is a common source of bugs when you forget to write it.</p>' +
        '<p>Parameters (<code>base</code> and <code>multiplier</code> above) are just local variables that get filled in with whatever <strong>arguments</strong> are passed at the call site. The names inside the function are entirely up to you -- they do not need to match the variable names used by the caller.</p>',
      hints: [
        'Multiply the two parameters and return the result.',
        'return base * multiplier; -- that\'s the whole function body.',
        'function computeDamage(base, multiplier) { return base * multiplier; }'
      ],
      starter: 'function computeDamage(base, multiplier) {\n  // return base multiplied by multiplier\n\n}',
      mode: 'function',
      entry: 'computeDamage',
      tests: [
        { args: [10, 2], expect: 20, desc: 'a basic multiplication' },
        { args: [0, 5], expect: 0, desc: 'zero base deals zero damage' },
        { args: [7, 1], expect: 7, desc: 'a multiplier of one leaves it unchanged' }
      ],
      solution: 'function computeDamage(base, multiplier) {\n  return base * multiplier;\n}'
    },
    {
      id: 'act4-defaultparams',
      act: 4,
      title: 'The Fallback Rune',
      concept: 'Default parameters supply a value when an argument is missing or undefined.',
      prereq: ['act4-basics'],
      xp: 30,
      lesson: '<p><strong>Default parameters</strong> let you give a parameter a fallback value that is used only when the caller leaves that argument out entirely (or passes <code>undefined</code> explicitly).</p>' +
        '<pre><code>function greetHero(name, title = \'Adventurer\') {\n  return \'Hello, \' + title + \' \' + name + \'!\';\n}\n\nconsole.log(greetHero(\'Finn\'));              // \'Hello, Adventurer Finn!\'\nconsole.log(greetHero(\'Mira\', \'Sorceress\'));  // \'Hello, Sorceress Mira!\'</code></pre>' +
        '<p>Here is the important, easy-to-miss detail: the default only kicks in for a <strong>missing</strong> or <code>undefined</code> argument. Any other value you actually pass in -- including <code>\'\'</code>, <code>0</code>, or <code>false</code> -- is used exactly as given, even though those values are \'falsy\'. Passing an empty string as the title, for example, does not trigger the \'Adventurer\' fallback; it uses the empty string.</p>' +
        '<p>Default parameters keep call sites short for the common case, while still letting callers override the behavior whenever they need something different.</p>',
      hints: [
        'Give title a default value of \'Adventurer\' right in the parameter list.',
        'Build the string with the same shape every time: \'Hello, \' + title + \' \' + name + \'!\'.',
        'function greetHero(name, title = \'Adventurer\') { return \'Hello, \' + title + \' \' + name + \'!\'; }'
      ],
      starter: 'function greetHero(name, title) {\n  // give title a default value of \'Adventurer\' in the parameter list\n\n  return \'Hello, \' + title + \' \' + name + \'!\';\n}',
      mode: 'function',
      entry: 'greetHero',
      tests: [
        { args: ['Finn'], expect: 'Hello, Adventurer Finn!', desc: 'no title given, so the default is used' },
        { args: ['Mira', 'Sorceress'], expect: 'Hello, Sorceress Mira!', desc: 'an explicit title overrides the default' },
        { args: ['Zed', ''], expect: 'Hello,  Zed!', desc: 'an empty string is still a real value -- it does NOT trigger the default' }
      ],
      solution: 'function greetHero(name, title = \'Adventurer\') {\n  return \'Hello, \' + title + \' \' + name + \'!\';\n}'
    },
    {
      id: 'act4-arrow',
      act: 4,
      title: 'The Quick Sigil',
      concept: 'Arrow functions are a shorter syntax, with an implicit return for expression bodies.',
      prereq: ['act4-defaultparams'],
      xp: 30,
      lesson: '<p><strong>Arrow functions</strong> are a shorter way to write a function, especially useful for small, one-off operations.</p>' +
        '<pre><code>const double = n =&gt; n * 2;\nconsole.log(double(4)); // 8</code></pre>' +
        '<p>With a single parameter you can drop the parentheses, and with a single expression body the <code>return</code> is implicit -- whatever that expression evaluates to is automatically returned, no braces or <code>return</code> keyword needed.</p>' +
        '<p>There is one sharp corner: if the implicit return should be an <strong>object literal</strong>, you must wrap it in parentheses, because <code>{ }</code> right after the arrow is otherwise read as the start of a function body, not an object.</p>' +
        '<pre><code>const makePotion = (name, power) =&gt; ({ name, power });\nconsole.log(makePotion(\'Ember Draught\', 15));\n// { name: \'Ember Draught\', power: 15 }</code></pre>' +
        '<p>Without those parentheses, <code>(name, power) =&gt; { name, power }</code> would be parsed as a function body containing a label and an unused expression -- a common and confusing mistake for newcomers to arrow functions.</p>',
      hints: [
        'Write it as an arrow function with two parameters that returns an object literal.',
        'To implicitly return an object from an arrow function, wrap the { } in parentheses.',
        'const makePotion = (name, power) => ({ name, power });'
      ],
      starter: 'const makePotion = (name, power) => {\n  // return an object literal { name, power } -- remember the parentheses trick\n\n};',
      mode: 'function',
      entry: 'makePotion',
      tests: [
        { args: ['Ember Draught', 15], expect: { name: 'Ember Draught', power: 15 }, desc: 'builds a named potion object' },
        { args: ['Weak Brew', 1], expect: { name: 'Weak Brew', power: 1 }, desc: 'works for any name and power' },
        { args: ['', 0], expect: { name: '', power: 0 }, desc: 'handles empty and zero values without special-casing' }
      ],
      solution: 'const makePotion = (name, power) => ({ name: name, power: power });'
    },
    {
      id: 'act4-closures',
      act: 4,
      title: 'The Memory of a Spell',
      concept: 'A closure is a function that remembers variables from its enclosing scope.',
      prereq: ['act4-arrow'],
      xp: 35,
      lesson: '<p>A <strong>closure</strong> is a function that remembers the variables from the scope it was created in, even after that outer scope has technically finished running elsewhere. In practice, closures let an inner function keep private state between calls.</p>' +
        '<pre><code>function makeCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\n\nconst tick = makeCounter();\nconsole.log(tick()); // 1\nconsole.log(tick()); // 2 -- count was remembered between calls!</code></pre>' +
        '<p>Notice that <code>count</code> is not a parameter and not reset each time <code>tick()</code> runs -- the inner function holds onto the exact same <code>count</code> variable from when <code>makeCounter</code> was called, and keeps mutating it. Each call to <code>makeCounter()</code> would create a brand-new, independent <code>count</code>.</p>' +
        '<p>Below, build a function where an inner <code>add</code> function closes over a <code>total</code> variable, called once per item in a list, accumulating a running sum across every call before the final total is returned.</p>',
      hints: [
        'Declare a total variable outside an inner function, then have that inner function add to total and return it.',
        'The inner function \'closes over\' total -- it can read and modify the variable from its enclosing sumWithCounter call.',
        'let total = 0; function add(n) { total += n; return total; } for (const step of steps) { add(step); } return total;'
      ],
      starter: 'function sumWithCounter(steps) {\n  let total = 0;\n  function add(n) {\n    // add n to the outer total\n\n  }\n  for (const step of steps) {\n    add(step);\n  }\n  return total;\n}',
      mode: 'function',
      entry: 'sumWithCounter',
      tests: [
        { args: [[1, 2, 3]], expect: 6, desc: 'the closure accumulates across three calls' },
        { args: [[]], expect: 0, desc: 'no steps means the total stays at its initial value' },
        { args: [[5, -2, 10]], expect: 13, desc: 'works with negative steps too' }
      ],
      solution: 'function sumWithCounter(steps) {\n  let total = 0;\n  function add(n) {\n    total += n;\n    return total;\n  }\n  for (const step of steps) {\n    add(step);\n  }\n  return total;\n}'
    },
    {
      id: 'act4-boss',
      act: 4,
      title: 'Boss: The Convergence',
      concept: 'Compose several small functions into one pipeline.',
      prereq: ['act4-basics', 'act4-defaultparams', 'act4-arrow', 'act4-closures'],
      xp: 55,
      lesson: '<p>The real power of functions shows up when you <strong>compose</strong> them -- feed the output of one straight into the input of the next, building a small pipeline out of simple, single-purpose pieces.</p>' +
        '<pre><code>function addBonus(n) { return n + 10; }\nfunction applyPenalty(n) { return n - 3; }\n\nfunction processScore(n) {\n  return applyPenalty(addBonus(n));\n}\n\nconsole.log(processScore(5)); // (5 + 10) - 3 = 12</code></pre>' +
        '<p>Reading composed calls happens from the inside out: <code>applyPenalty(addBonus(n))</code> first runs <code>addBonus(n)</code>, and whatever it returns becomes the argument to <code>applyPenalty</code>. Each function stays small, focused, and easy to test on its own, while <code>processScore</code> just describes the order they run in.</p>' +
        '<p>Build <code>processHero</code> below by composing three small helpers -- <code>addBonus</code>, <code>applyPenalty</code>, and <code>applyMultiplier</code> -- applying the bonus first, then the penalty, then the multiplier, all to a starting <code>base</code> value.</p>',
      hints: [
        'Write three tiny helper functions first: addBonus (+10), applyPenalty (-3), applyMultiplier (*2).',
        'Compose them from the inside out: multiplier(penalty(bonus(base))).',
        'function processHero(base) { return applyMultiplier(applyPenalty(addBonus(base))); }'
      ],
      starter: 'function addBonus(n) {\n  return n + 10;\n}\nfunction applyPenalty(n) {\n  return n - 3;\n}\nfunction applyMultiplier(n) {\n  return n * 2;\n}\nfunction processHero(base) {\n  // compose the three helpers above, in order: bonus, then penalty, then multiplier\n\n}',
      mode: 'function',
      entry: 'processHero',
      tests: [
        { args: [0], expect: 14, desc: '(0 + 10 - 3) * 2 = 14' },
        { args: [5], expect: 24, desc: '(5 + 10 - 3) * 2 = 24' },
        { args: [-10], expect: -6, desc: 'works with a negative starting base too' }
      ],
      solution: 'function addBonus(n) {\n  return n + 10;\n}\nfunction applyPenalty(n) {\n  return n - 3;\n}\nfunction applyMultiplier(n) {\n  return n * 2;\n}\nfunction processHero(base) {\n  return applyMultiplier(applyPenalty(addBonus(base)));\n}'
    },
    {
      id: 'act5-create',
      act: 5,
      title: 'Charting the Islands',
      concept: 'Create arrays, index into them, and read their length.',
      prereq: ['act4-boss'],
      xp: 25,
      lesson: '<p>Arrays store ordered lists of values. You create one with square brackets, reach an element with its numeric <strong>index</strong> starting at <code>0</code>, and check the count with <code>.length</code>.</p>' +
        '<pre><code>const items = [\'sword\', \'shield\', \'potion\'];\nconsole.log(items[0]);                // \'sword\' -- the first element\nconsole.log(items.length);            // 3\nconsole.log(items[items.length - 1]); // \'potion\' -- the last element</code></pre>' +
        '<p>Because indexes start at 0, the last element always sits at <code>length - 1</code>, not <code>length</code>. Reaching for an index that does not exist -- like <code>items[10]</code> on a 3-item array -- does not throw an error; it quietly returns <code>undefined</code>, so it is worth guarding against out-of-range access yourself when it matters.</p>' +
        '<p>Below, find the <strong>second-to-last</strong> element of an array using <code>.length</code> arithmetic, and handle the case where the array is too short to have one.</p>',
      hints: [
        'The last element is arr[arr.length - 1], so the second-to-last is one index before that.',
        'Check arr.length first -- if there are fewer than 2 elements, there is no second-to-last one.',
        'if (arr.length < 2) return null; return arr[arr.length - 2];'
      ],
      starter: 'function secondToLast(arr) {\n  // return the second-to-last element, or null if there isn\'t one\n\n}',
      mode: 'function',
      entry: 'secondToLast',
      tests: [
        { args: [[1, 2, 3]], expect: 2, desc: 'the middle element in a 3-item array' },
        { args: [[10, 20]], expect: 10, desc: 'the first of exactly two elements' },
        { args: [[5]], expect: null, desc: 'too short to have a second-to-last element' }
      ],
      solution: 'function secondToLast(arr) {\n  if (arr.length < 2) {\n    return null;\n  }\n  return arr[arr.length - 2];\n}'
    },
    {
      id: 'act5-stack',
      act: 5,
      title: 'The Loading Dock',
      concept: 'push/pop add and remove from the end; unshift/shift add and remove from the front.',
      prereq: ['act5-create'],
      xp: 35,
      lesson: '<p>Arrays have four built-in methods for adding and removing at the ends: <code>push</code> (add to end), <code>pop</code> (remove from end), <code>unshift</code> (add to front), and <code>shift</code> (remove from front). All four <strong>mutate</strong> the original array in place.</p>' +
        '<pre><code>const items = [\'sword\'];\nitems.push(\'shield\');        // [\'sword\', \'shield\']\nitems.unshift(\'torch\');      // [\'torch\', \'sword\', \'shield\']\nitems.pop();                  // removes \'shield\' -&gt; [\'torch\', \'sword\']\nconst first = items.shift(); // removes \'torch\', first === \'torch\'\nconsole.log(items);           // [\'sword\']</code></pre>' +
        '<p><code>pop</code> and <code>shift</code> both return the element they removed, which is often exactly what you want to capture, as shown with <code>first</code> above. Adding and removing from the <strong>front</strong> with <code>unshift</code>/<code>shift</code> is slower than the end with <code>push</code>/<code>pop</code> on large arrays, because every remaining element has to shift position -- worth knowing, though rarely a concern for small lists like an inventory.</p>' +
        '<p>Because these methods mutate their array, be careful when the same array is referenced elsewhere in your program -- the change is visible everywhere that reference is used.</p>',
      hints: [
        'push a \'shield\' to the end, then unshift a \'torch\' to the front.',
        'pop the shield back off, then shift the torch off and keep what shift returns.',
        'items.push(\'shield\'); items.unshift(\'torch\'); items.pop(); const first = items.shift(); return { removed: first, remaining: items };'
      ],
      starter: 'function manageInventory(items) {\n  // push \'shield\', unshift \'torch\', pop it back off, then shift and capture the result\n\n  return { removed: null, remaining: items };\n}',
      mode: 'function',
      entry: 'manageInventory',
      tests: [
        { args: [['sword', 'potion']], expect: { removed: 'torch', remaining: ['sword', 'potion'] }, desc: 'adds and removes items ending back where it started' },
        { args: [[]], expect: { removed: 'torch', remaining: [] }, desc: 'works starting from an empty inventory' },
        { args: [['gem']], expect: { removed: 'torch', remaining: ['gem'] }, desc: 'works with a single starting item' }
      ],
      solution: 'function manageInventory(items) {\n  items.push(\'shield\');\n  items.unshift(\'torch\');\n  items.pop();\n  const first = items.shift();\n  return { removed: first, remaining: items };\n}'
    },
    {
      id: 'act5-search',
      act: 5,
      title: 'The Search Among Shelves',
      concept: 'includes checks presence; indexOf reports position (or -1).',
      prereq: ['act5-stack'],
      xp: 30,
      lesson: '<p>Two methods answer \'is this in the array, and where\': <code>.includes(value)</code> returns a plain boolean, and <code>.indexOf(value)</code> returns the numeric index of the first match, or <code>-1</code> if it is not present.</p>' +
        '<pre><code>const items = [\'map\', \'rope\', \'torch\'];\nconsole.log(items.includes(\'rope\')); // true\nconsole.log(items.indexOf(\'rope\'));  // 1\nconsole.log(items.indexOf(\'sword\')); // -1, not found</code></pre>' +
        '<p>If there are duplicate values, <code>indexOf</code> always reports the position of the <strong>first</strong> match, scanning from the start of the array. Reach for <code>.includes()</code> when you only care whether something exists, since <code>=== -1</code> checks against <code>indexOf</code> are easy to misread; reach for <code>.indexOf()</code> when the position itself matters, for example to remove or replace that exact element later.</p>' +
        '<p>Below, combine both: confirm the item is present with <code>.includes()</code>, and only then report its position with <code>.indexOf()</code>, returning <code>-1</code> whenever it is missing.</p>',
      hints: [
        'First check with .includes(target) -- if it\'s not there, return -1 immediately.',
        'If it is present, use .indexOf(target) to get its position.',
        'if (!items.includes(target)) return -1; return items.indexOf(target);'
      ],
      starter: 'function locateItem(items, target) {\n  // return -1 if target isn\'t present, otherwise its index\n\n}',
      mode: 'function',
      entry: 'locateItem',
      tests: [
        { args: [['map', 'rope', 'torch'], 'rope'], expect: 1, desc: 'finds an item in the middle' },
        { args: [['map', 'rope', 'torch'], 'sword'], expect: -1, desc: 'an absent item returns -1' },
        { args: [['a', 'a', 'b'], 'a'], expect: 0, desc: 'duplicates report the first matching index' }
      ],
      solution: 'function locateItem(items, target) {\n  if (!items.includes(target)) {\n    return -1;\n  }\n  return items.indexOf(target);\n}'
    },
    {
      id: 'act5-iterate',
      act: 5,
      title: 'Building the Second Shore',
      concept: 'Loop over a source array and push transformed values into a new one.',
      prereq: ['act5-search'],
      xp: 30,
      lesson: '<p>A common pattern: start with an empty array, loop over some source data, and <code>.push()</code> a transformed value for each one. This is the manual version of what <code>.map()</code> will do for you automatically in Act 7 -- but it is important to understand it built by hand first.</p>' +
        '<pre><code>const numbers = [1, 2, 3];\nconst doubled = [];\nfor (const n of numbers) {\n  doubled.push(n * 2);\n}\nconsole.log(doubled); // [2, 4, 6]</code></pre>' +
        '<p>The key habit is to declare the new array <strong>before</strong> the loop starts, empty, and grow it one <code>.push()</code> at a time as you iterate -- never try to write directly into indexes of an array that has not been sized yet. The original <code>numbers</code> array is left completely untouched; <code>doubled</code> is an entirely new array.</p>' +
        '<p>This build-a-new-array-from-a-loop shape appears constantly, so getting comfortable with it now will make higher-order array methods feel like a natural shortcut rather than new magic later.</p>',
      hints: [
        'Start with an empty result array before the loop.',
        'For each number in numbers, push its double onto result.',
        'const result = []; for (const n of numbers) { result.push(n * 2); } return result;'
      ],
      starter: 'function doubleAll(numbers) {\n  const result = [];\n  // push each number, doubled, into result\n\n  return result;\n}',
      mode: 'function',
      entry: 'doubleAll',
      tests: [
        { args: [[1, 2, 3]], expect: [2, 4, 6], desc: 'doubles each number in order' },
        { args: [[]], expect: [], desc: 'an empty input produces an empty output' },
        { args: [[-5, 0, 5]], expect: [-10, 0, 10], desc: 'works with negative and zero values' }
      ],
      solution: 'function doubleAll(numbers) {\n  const result = [];\n  for (const n of numbers) {\n    result.push(n * 2);\n  }\n  return result;\n}'
    },
    {
      id: 'act5-boss',
      act: 5,
      title: 'Boss: The Archipelago Census',
      concept: 'Scan a dataset once to build several derived results at once.',
      prereq: ['act5-create', 'act5-stack', 'act5-search', 'act5-iterate'],
      xp: 55,
      lesson: '<p>Real data rarely arrives in exactly the shape you need. Here you will scan a list of travelers, each an object with a <code>name</code> and amount of <code>gold</code>, and build a small report: which travelers qualify for an expedition, and the total gold carried by the whole group.</p>' +
        '<pre><code>const travelers = [\n  { name: \'Finn\', gold: 15 },\n  { name: \'Mira\', gold: 5 }\n];\n// qualified travelers have gold &gt;= 10\n// totalGold sums every traveler regardless of qualification</code></pre>' +
        '<p>Notice the two accumulators serve different rules: <code>totalGold</code> adds up <strong>every</strong> traveler unconditionally, while <code>qualified</code> only collects the <strong>names</strong> of travelers meeting the gold threshold. Do both inside the same single loop -- there is no need to iterate the list twice.</p>' +
        '<p>Return an object with both results together: <code>{ qualified, totalGold }</code>. This is exactly the shape of report-building you will do constantly in real applications -- one pass over raw data, several derived results collected along the way.</p>',
      hints: [
        'Loop once over travelers with for...of, updating both an array and a running total inside it.',
        'Add every traveler\'s gold to totalGold unconditionally, but only push the name into qualified when gold >= 10.',
        'for (const t of travelers) { totalGold += t.gold; if (t.gold >= 10) qualified.push(t.name); } return { qualified, totalGold };'
      ],
      starter: 'function buildExpedition(travelers) {\n  const qualified = [];\n  let totalGold = 0;\n  // one pass: add to totalGold always, push the name into qualified when gold >= 10\n\n  return { qualified, totalGold };\n}',
      mode: 'function',
      entry: 'buildExpedition',
      tests: [
        { args: [[{ name: 'Finn', gold: 15 }, { name: 'Mira', gold: 5 }, { name: 'Zed', gold: 10 }]], expect: { qualified: ['Finn', 'Zed'], totalGold: 30 }, desc: 'mixed group, some qualify' },
        { args: [[]], expect: { qualified: [], totalGold: 0 }, desc: 'no travelers at all' },
        { args: [[{ name: 'Ana', gold: 9 }]], expect: { qualified: [], totalGold: 9 }, desc: 'below-threshold traveler still counts toward the total, just not qualified' }
      ],
      solution: 'function buildExpedition(travelers) {\n  const qualified = [];\n  let totalGold = 0;\n  for (const traveler of travelers) {\n    totalGold += traveler.gold;\n    if (traveler.gold >= 10) {\n      qualified.push(traveler.name);\n    }\n  }\n  return { qualified, totalGold };\n}'
    },
    {
      id: 'act6-literals',
      act: 6,
      title: 'The First Chamber',
      concept: 'Object literals group named properties inside curly braces.',
      prereq: ['act5-boss'],
      xp: 25,
      lesson: '<p>An <strong>object literal</strong> groups related values together under named <strong>properties</strong>, written as <code>key: value</code> pairs inside curly braces.</p>' +
        '<pre><code>const relic = {\n  name: \'Amulet\',\n  power: 7,\n  discovered: true\n};\nconsole.log(relic.name); // \'Amulet\'</code></pre>' +
        '<p>You read (and write) a property with dot notation, <code>relic.name</code>, or with bracket notation, <code>relic[\'name\']</code> -- bracket notation is required when the key is stored in a variable or contains characters that are not a valid identifier. Objects can mix any types of values: strings, numbers, booleans, arrays, even other objects or functions.</p>' +
        '<p>Below, build a function that takes a relic\'s name and power and returns a fresh object literal with those two properties plus a fixed <code>discovered: true</code> flag -- a simple factory that always shapes the data consistently.</p>',
      hints: [
        'Return an object literal with three properties: name, power, and discovered.',
        'discovered should always be true -- it isn\'t a parameter, just a fixed value.',
        'return { name: name, power: power, discovered: true };'
      ],
      starter: 'function createRelic(name, power) {\n  // return { name, power, discovered: true }\n\n}',
      mode: 'function',
      entry: 'createRelic',
      tests: [
        { args: ['Amulet', 7], expect: { name: 'Amulet', power: 7, discovered: true }, desc: 'builds a basic relic' },
        { args: ['Ring', 0], expect: { name: 'Ring', power: 0, discovered: true }, desc: 'zero power is still a valid relic' },
        { args: ['', 100], expect: { name: '', power: 100, discovered: true }, desc: 'an empty name is handled without special-casing' }
      ],
      solution: 'function createRelic(name, power) {\n  return { name: name, power: power, discovered: true };\n}'
    },
    {
      id: 'act6-methods',
      act: 6,
      title: 'The Voice of This',
      concept: 'A method is a function stored as a property; this refers to the calling object.',
      prereq: ['act6-literals'],
      xp: 30,
      lesson: '<p>When a property\'s value is a function, it is called a <strong>method</strong>. Inside a method, the keyword <code>this</code> refers to the object the method was called on, letting it read that same object\'s other properties.</p>' +
        '<pre><code>const hero = {\n  name: \'Finn\',\n  hp: 50,\n  describe: function() {\n    return this.name + \' has \' + this.hp + \' HP\';\n  }\n};\nconsole.log(hero.describe()); // \'Finn has 50 HP\'</code></pre>' +
        '<p><code>this</code> is not fixed to the object where the function was written -- it is determined by <strong>how the method is called</strong>. Calling it as <code>hero.describe()</code> makes <code>this</code> refer to <code>hero</code>. If you pulled the function out and called it alone, <code>this</code> would no longer point at <code>hero</code>, which is a common source of confusion. As long as you always call a method through its owning object, like <code>hero.describe()</code>, it behaves exactly as expected.</p>' +
        '<p>Build a <code>hero</code> object with <code>name</code>, <code>hp</code>, and a <code>describe</code> method using <code>this</code>, then call that method and return its result.</p>',
      hints: [
        'Build an object with name, hp, and a describe method using the function keyword (not an arrow function, so \'this\' works as expected).',
        'Inside describe, use this.name and this.hp to build the sentence.',
        'Call hero.describe() at the end and return what it gives back.'
      ],
      starter: 'function createHero(name, hp) {\n  const hero = {\n    name: name,\n    hp: hp,\n    describe: function() {\n      // return a string using this.name and this.hp\n\n    }\n  };\n  return hero.describe();\n}',
      mode: 'function',
      entry: 'createHero',
      tests: [
        { args: ['Finn', 50], expect: 'Finn has 50 HP', desc: 'a typical hero' },
        { args: ['Mira', 0], expect: 'Mira has 0 HP', desc: 'zero hp is described the same way' },
        { args: ['Zed', 999], expect: 'Zed has 999 HP', desc: 'works with large numbers too' }
      ],
      solution: 'function createHero(name, hp) {\n  const hero = {\n    name: name,\n    hp: hp,\n    describe: function() {\n      return this.name + \' has \' + this.hp + \' HP\';\n    }\n  };\n  return hero.describe();\n}'
    },
    {
      id: 'act6-destructure',
      act: 6,
      title: 'The Splitting Rune',
      concept: 'Destructuring pulls properties out of an object into local variables.',
      prereq: ['act6-methods'],
      xp: 35,
      lesson: '<p><strong>Destructuring</strong> pulls properties out of an object straight into local variables, which is especially handy right in a function\'s parameter list.</p>' +
        '<pre><code>function describeItem({ name, value, rarity = \'common\' }) {\n  return name + \' (\' + rarity + \', worth \' + value + \')\';\n}\n\nconsole.log(describeItem({ name: \'Sword\', value: 50, rarity: \'rare\' }));\n// \'Sword (rare, worth 50)\'</code></pre>' +
        '<p>Instead of writing <code>item.name</code>, <code>item.value</code>, and <code>item.rarity</code> throughout the function body, destructuring in the parameter list gives you <code>name</code>, <code>value</code>, and <code>rarity</code> directly as their own variables. You can also combine it with a default value, exactly like a regular parameter -- <code>rarity = \'common\'</code> means that if the passed-in object has no <code>rarity</code> property at all (so it is <code>undefined</code>), <code>\'common\'</code> is used instead.</p>' +
        '<p>Destructuring works the same way outside of parameters too, as a standalone statement: <code>const { name, value } = item;</code>. It is one of the most-used pieces of modern JavaScript syntax for working with objects.</p>',
      hints: [
        'Destructure name, value, and rarity right in the parameter list, giving rarity a default of \'common\'.',
        'function describeItem({ name, value, rarity = \'common\' }) { ... }',
        'return name + \' (\' + rarity + \', worth \' + value + \')\';'
      ],
      starter: 'function describeItem({ name, value, rarity }) {\n  // give rarity a default of \'common\' in the destructuring above, then build the description\n\n}',
      mode: 'function',
      entry: 'describeItem',
      tests: [
        { args: [{ name: 'Sword', value: 50, rarity: 'rare' }], expect: 'Sword (rare, worth 50)', desc: 'an item with an explicit rarity' },
        { args: [{ name: 'Stick', value: 1 }], expect: 'Stick (common, worth 1)', desc: 'a missing rarity falls back to the default' },
        { args: [{ name: 'Gem', value: 200, rarity: 'epic' }], expect: 'Gem (epic, worth 200)', desc: 'a different explicit rarity' }
      ],
      solution: 'function describeItem({ name, value, rarity = \'common\' }) {\n  return name + \' (\' + rarity + \', worth \' + value + \')\';\n}'
    },
    {
      id: 'act6-keysvalues',
      act: 6,
      title: 'The Ledger of Keys',
      concept: 'Object.keys/values/entries turn an object into arrays you can loop over.',
      prereq: ['act6-destructure'],
      xp: 30,
      lesson: '<p>Three built-in methods unlock the contents of any object as arrays: <code>Object.keys(obj)</code> gives you its property names, <code>Object.values(obj)</code> gives you the values, and <code>Object.entries(obj)</code> gives you <code>[key, value]</code> pairs for both at once.</p>' +
        '<pre><code>const stats = { str: 10, dex: 5, int: 8 };\nconsole.log(Object.keys(stats));   // [\'str\', \'dex\', \'int\']\nconsole.log(Object.values(stats)); // [10, 5, 8]\nconsole.log(Object.entries(stats));\n// [[\'str\', 10], [\'dex\', 5], [\'int\', 8]]</code></pre>' +
        '<p>Because all three return plain arrays, you can loop over the result with <code>for...of</code> exactly like any other array -- this is how you process an object\'s contents without knowing its property names in advance. Summing every stat, for example, means looping <code>Object.values(stats)</code> and accumulating a total, without ever writing <code>stats.str</code> by name.</p>' +
        '<p>An object with no properties at all is a valid input: all three methods simply return an empty array, and any loop over that empty array does nothing, leaving your accumulator at its starting value.</p>',
      hints: [
        'Use Object.values(stats) to get an array of just the numbers, ignoring the key names.',
        'Loop over that array with for...of, adding each value to a running total.',
        'let total = 0; for (const value of Object.values(stats)) { total += value; } return total;'
      ],
      starter: 'function totalStats(stats) {\n  let total = 0;\n  // add up every value in the stats object, whatever its keys are\n\n  return total;\n}',
      mode: 'function',
      entry: 'totalStats',
      tests: [
        { args: [{ str: 10, dex: 5, int: 8 }], expect: 23, desc: 'sums three arbitrary stats' },
        { args: [{  }], expect: 0, desc: 'an object with no stats totals zero' },
        { args: [{ hp: 100 }], expect: 100, desc: 'works with just a single stat' }
      ],
      solution: 'function totalStats(stats) {\n  let total = 0;\n  for (const value of Object.values(stats)) {\n    total += value;\n  }\n  return total;\n}'
    },
    {
      id: 'act6-boss',
      act: 6,
      title: 'Boss: The Sanctum Ledger',
      concept: 'Build an object dynamically with bracket notation, then summarize it.',
      prereq: ['act6-literals', 'act6-methods', 'act6-destructure', 'act6-keysvalues'],
      xp: 55,
      lesson: '<p>Time to model a real inventory ledger. Given a list of items, each with a <code>name</code>, <code>qty</code>, and <code>price</code>, build an object where every item\'s name becomes a key, mapped to its line total (<code>qty * price</code>) -- then sum every line into a grand total.</p>' +
        '<pre><code>const ledger = {};\nledger[\'Potion\'] = 3 * 5; // bracket notation lets you use a variable as the key\nconsole.log(ledger); // { Potion: 15 }</code></pre>' +
        '<p>Bracket notation, <code>ledger[item.name] = ...</code>, is essential here -- you cannot use dot notation to assign a property whose name only exists inside a variable at runtime; <code>ledger.item.name</code> would try to read a literal property called <code>item</code>, which is not what you want at all.</p>' +
        '<p>Build the ledger with one loop over the items, then reuse what you learned last quest -- <code>Object.values()</code> plus a second loop -- to sum every line total in the ledger into a <code>grandTotal</code>. Return both together as <code>{ ledger, grandTotal }</code>.</p>',
      hints: [
        'First loop: for each item, set ledger[item.name] = item.qty * item.price using bracket notation.',
        'Second loop: use Object.values(ledger) to add up every line total into grandTotal.',
        'for (const item of items) { ledger[item.name] = item.qty * item.price; } for (const value of Object.values(ledger)) { grandTotal += value; }'
      ],
      starter: 'function buildLedger(items) {\n  const ledger = {};\n  // fill ledger[item.name] = item.qty * item.price for every item\n\n  let grandTotal = 0;\n  // sum every value in ledger into grandTotal\n\n  return { ledger, grandTotal };\n}',
      mode: 'function',
      entry: 'buildLedger',
      tests: [
        { args: [[{ name: 'Potion', qty: 3, price: 5 }, { name: 'Shield', qty: 1, price: 20 }]], expect: { ledger: { Potion: 15, Shield: 20 }, grandTotal: 35 }, desc: 'two distinct items' },
        { args: [[]], expect: { ledger: {  }, grandTotal: 0 }, desc: 'an empty item list' },
        { args: [[{ name: 'Gem', qty: 2, price: 50 }]], expect: { ledger: { Gem: 100 }, grandTotal: 100 }, desc: 'a single item' }
      ],
      solution: 'function buildLedger(items) {\n  const ledger = {};\n  for (const item of items) {\n    ledger[item.name] = item.qty * item.price;\n  }\n  let grandTotal = 0;\n  for (const value of Object.values(ledger)) {\n    grandTotal += value;\n  }\n  return { ledger, grandTotal };\n}'
    },
    {
      id: 'act7-callbacks',
      act: 7,
      title: 'The Spell Passed Along',
      concept: 'A callback is a function handed to another function, to be called at the right moment.',
      prereq: ['act6-boss'],
      xp: 30,
      lesson: '<p>A <strong>callback</strong> is a function you hand to another function, to be called at the right moment. Array\'s <code>.forEach()</code> is the simplest built-in example: give it a callback, and it invokes that callback once for every element.</p>' +
        '<pre><code>const numbers = [1, 2, 3];\nlet total = 0;\nnumbers.forEach(function(n) {\n  total += n;\n});\nconsole.log(total); // 6</code></pre>' +
        '<p><code>forEach</code> calls your callback with each element in turn (and, optionally, its index and the whole array too, though most uses only need the element). Unlike a <code>for...of</code> loop, you cannot <code>break</code> out of a <code>forEach</code> early -- it always runs through every element. If you need early exit, a regular loop is the better tool.</p>' +
        '<p>The callback function above closes over <code>total</code>, the same way you saw with closures in Act 4 -- that is exactly why it can add to a variable declared outside itself. Passing functions around like this, as arguments to other functions, is the foundation for <code>map</code>, <code>filter</code>, and <code>reduce</code>, which you will meet next.</p>',
      hints: [
        'Use numbers.forEach() with a callback function that adds each n to a running total.',
        'Declare \'total\' outside the forEach call so the callback can close over it and modify it.',
        'let total = 0; numbers.forEach(function(n) { total += n; }); return total;'
      ],
      starter: 'function totalWithLogging(numbers) {\n  let total = 0;\n  // use numbers.forEach with a callback that adds each number to total\n\n  return total;\n}',
      mode: 'function',
      entry: 'totalWithLogging',
      tests: [
        { args: [[1, 2, 3]], expect: 6, desc: 'sums using forEach\'s callback' },
        { args: [[]], expect: 0, desc: 'an empty array runs the callback zero times' },
        { args: [[10, -5, 5]], expect: 10, desc: 'works with negative numbers' }
      ],
      solution: 'function totalWithLogging(numbers) {\n  let total = 0;\n  numbers.forEach(function(n) {\n    total += n;\n  });\n  return total;\n}'
    },
    {
      id: 'act7-map',
      act: 7,
      title: 'The Reshaping Glass',
      concept: 'map transforms every element into a new array of the same length.',
      prereq: ['act7-callbacks'],
      xp: 30,
      lesson: '<p><code>.map(callback)</code> builds a <strong>brand-new array</strong> by transforming every element with the given callback -- whatever the callback returns for an element becomes that element\'s replacement in the new array, in the exact same order.</p>' +
        '<pre><code>const heroes = [{ name: \'Finn\' }, { name: \'Mira\' }];\nconst names = heroes.map(function(h) {\n  return h.name;\n});\nconsole.log(names); // [\'Finn\', \'Mira\']</code></pre>' +
        '<p>This is precisely the manual loop-and-push pattern from Act 5, done in one call: <code>map</code> always produces an array of the <strong>same length</strong> as the original, one output for every input, and it never modifies the original array. If you find yourself writing <code>const result = []; for (...) { result.push(transform(x)); }</code>, that is almost always a signal to reach for <code>.map()</code> instead.</p>' +
        '<p>Below, extract just the <code>name</code> from every hero object in an array, returning a plain array of strings.</p>',
      hints: [
        'Use heroes.map() with a callback that returns just h.name for each hero.',
        'return heroes.map(function(h) { return h.name; });',
        'There\'s no loop needed at all -- map handles the iteration and the new array for you.'
      ],
      starter: 'function namesOnly(heroes) {\n  // return an array of just the names, using .map()\n\n}',
      mode: 'function',
      entry: 'namesOnly',
      tests: [
        { args: [[{ name: 'Finn', hp: 10 }, { name: 'Mira', hp: 20 }]], expect: ['Finn', 'Mira'], desc: 'extracts names from a list of heroes' },
        { args: [[]], expect: [], desc: 'an empty list maps to an empty list' },
        { args: [[{ name: 'Zed', hp: 5 }]], expect: ['Zed'], desc: 'works with a single hero' }
      ],
      solution: 'function namesOnly(heroes) {\n  return heroes.map(function(h) {\n    return h.name;\n  });\n}'
    },
    {
      id: 'act7-filter',
      act: 7,
      title: 'The Sifting Gate',
      concept: 'filter keeps only the elements for which the callback returns true.',
      prereq: ['act7-map'],
      xp: 30,
      lesson: '<p><code>.filter(callback)</code> builds a new array containing only the elements for which the callback returns a <strong>truthy</strong> value -- every element is tested, and only the ones that pass make it into the result.</p>' +
        '<pre><code>const heroes = [\n  { name: \'A\', hp: 10 },\n  { name: \'B\', hp: 0 },\n  { name: \'C\', hp: 5 }\n];\nconst alive = heroes.filter(function(h) {\n  return h.hp &gt; 0;\n});\nconsole.log(alive); // [{ name: \'A\', hp: 10 }, { name: \'C\', hp: 5 }]</code></pre>' +
        '<p>Unlike <code>.map()</code>, the result of <code>.filter()</code> can be shorter than the original -- or even empty, if nothing passes the test -- because elements that fail the callback are simply left out entirely, not replaced with anything. The original array is untouched either way.</p>' +
        '<p>Below, keep only the heroes whose <code>hp</code> is greater than zero, using <code>.filter()</code> rather than a manual loop.</p>',
      hints: [
        'Use heroes.filter() with a callback that returns h.hp > 0.',
        'return heroes.filter(function(h) { return h.hp > 0; });',
        'filter keeps elements where the callback is true and drops the rest -- no manual loop or pushing required.'
      ],
      starter: 'function aliveHeroes(heroes) {\n  // return only the heroes with hp > 0, using .filter()\n\n}',
      mode: 'function',
      entry: 'aliveHeroes',
      tests: [
        { args: [[{ name: 'A', hp: 10 }, { name: 'B', hp: 0 }, { name: 'C', hp: 5 }]], expect: [{ name: 'A', hp: 10 }, { name: 'C', hp: 5 }], desc: 'keeps only heroes with positive hp' },
        { args: [[]], expect: [], desc: 'an empty list filters to an empty list' },
        { args: [[{ name: 'D', hp: 0 }]], expect: [], desc: 'a single fallen hero filters out to nothing' }
      ],
      solution: 'function aliveHeroes(heroes) {\n  return heroes.filter(function(h) {\n    return h.hp > 0;\n  });\n}'
    },
    {
      id: 'act7-reduce',
      act: 7,
      title: 'The Collapsing Well',
      concept: 'reduce collapses an array to a single value, carrying an accumulator forward.',
      prereq: ['act7-filter'],
      xp: 30,
      lesson: '<p><code>.reduce(callback, startingValue)</code> collapses an entire array down to a single value, by running the callback once per element and carrying an <strong>accumulator</strong> forward between calls.</p>' +
        '<pre><code>const items = [{ gold: 5 }, { gold: 10 }, { gold: -2 }];\nconst total = items.reduce(function(sum, item) {\n  return sum + item.gold;\n}, 0);\nconsole.log(total); // 13</code></pre>' +
        '<p>The callback receives the accumulator (<code>sum</code> above) and the current element, and whatever it returns becomes the accumulator for the <strong>next</strong> call. The second argument to <code>reduce</code>, <code>0</code> here, is the accumulator\'s starting value before the first element is even processed -- always pass one explicitly, since skipping it changes how the first iteration behaves and can throw on an empty array.</p>' +
        '<p><code>reduce</code> is the most general of the three: <code>map</code> and <code>filter</code> can technically both be written using <code>reduce</code>, though it is usually clearer to reach for the more specific method when one fits.</p>',
      hints: [
        'Call items.reduce with a callback (sum, item) that returns sum + item.gold, starting from 0.',
        'Always pass the starting value (0) as the second argument to reduce.',
        'return items.reduce(function(sum, item) { return sum + item.gold; }, 0);'
      ],
      starter: 'function totalGoldReduce(items) {\n  // use .reduce() to sum every item.gold, starting from 0\n\n}',
      mode: 'function',
      entry: 'totalGoldReduce',
      tests: [
        { args: [[{ gold: 5 }, { gold: 10 }, { gold: -2 }]], expect: 13, desc: 'sums gold across several items' },
        { args: [[]], expect: 0, desc: 'an empty array reduces to the starting value' },
        { args: [[{ gold: 100 }]], expect: 100, desc: 'a single item still goes through the accumulator' }
      ],
      solution: 'function totalGoldReduce(items) {\n  return items.reduce(function(sum, item) {\n    return sum + item.gold;\n  }, 0);\n}'
    },
    {
      id: 'act7-findsomeevery',
      act: 7,
      title: 'The Three Questions',
      concept: 'find returns the first match, some checks if any match, every checks if all match.',
      prereq: ['act7-reduce'],
      xp: 35,
      lesson: '<p>Three related methods each ask a yes/no question about an array\'s elements: <code>.find(callback)</code> returns the <strong>first element</strong> that passes (or <code>undefined</code> if none do), <code>.some(callback)</code> returns <code>true</code> if <strong>at least one</strong> element passes, and <code>.every(callback)</code> returns <code>true</code> only if <strong>all</strong> elements pass.</p>' +
        '<pre><code>const heroes = [{ role: \'healer\', hp: 10 }, { role: \'mage\', hp: 20 }];\nconsole.log(heroes.some(h =&gt; h.role === \'healer\'));  // true\nconsole.log(heroes.every(h =&gt; h.hp &gt; 0));            // true\nconsole.log(heroes.find(h =&gt; h.role === \'mage\'));     // { role: \'mage\', hp: 20 }</code></pre>' +
        '<p>There is a well-known edge case worth memorizing: <code>.every()</code> on an <strong>empty</strong> array always returns <code>true</code> -- vacuously, since there are no elements to fail the check -- while <code>.some()</code> on an empty array always returns <code>false</code>, since there is nothing that could have passed.</p>' +
        '<p>Since <code>.find()</code> can return <code>undefined</code> when nothing matches, it is common to fall back to <code>null</code> with <code>||</code> when you need a consistent, predictable shape for downstream code.</p>',
      hints: [
        'Use .some() to check for a healer, .every() to check all hp > 0, and .find() for the first mage.',
        '.find() returns undefined if nothing matches -- use `|| null` to normalize that.',
        'const hasHealer = heroes.some(h => h.role === \'healer\'); const allAlive = heroes.every(h => h.hp > 0); const firstMage = heroes.find(h => h.role === \'mage\') || null;'
      ],
      starter: 'function checkParty(heroes) {\n  // build { hasHealer, allAlive, firstMage } using .some(), .every(), and .find()\n\n}',
      mode: 'function',
      entry: 'checkParty',
      tests: [
        { args: [[{ role: 'healer', hp: 10 }, { role: 'mage', hp: 20 }]], expect: { hasHealer: true, allAlive: true, firstMage: { role: 'mage', hp: 20 } }, desc: 'a healthy party with a healer and a mage' },
        { args: [[{ role: 'warrior', hp: 0 }]], expect: { hasHealer: false, allAlive: false, firstMage: null }, desc: 'no healer, a fallen warrior, and no mage' },
        { args: [[]], expect: { hasHealer: false, allAlive: true, firstMage: null }, desc: 'an empty party -- every() is vacuously true, some()/find() find nothing' }
      ],
      solution: 'function checkParty(heroes) {\n  const hasHealer = heroes.some(function(h) { return h.role === \'healer\'; });\n  const allAlive = heroes.every(function(h) { return h.hp > 0; });\n  const firstMage = heroes.find(function(h) { return h.role === \'mage\'; }) || null;\n  return { hasHealer: hasHealer, allAlive: allAlive, firstMage: firstMage };\n}'
    },
    {
      id: 'act7-sort',
      act: 7,
      title: 'The Ranking Chime',
      concept: 'sort reorders an array using a comparator function you supply.',
      prereq: ['act7-findsomeevery'],
      xp: 30,
      lesson: '<p><code>.sort(comparator)</code> reorders an array using a <strong>comparator function</strong> that you provide. The comparator takes two elements, <code>a</code> and <code>b</code>, and its return value tells <code>sort</code> what to do: negative means <code>a</code> comes first, positive means <code>b</code> comes first, and zero means leave their order unchanged.</p>' +
        '<pre><code>const heroes = [{ power: 5 }, { power: 20 }, { power: 10 }];\nconst ranked = heroes.sort(function(a, b) {\n  return b.power - a.power; // descending order\n});\nconsole.log(ranked); // powers: 20, 10, 5</code></pre>' +
        '<p><code>b.power - a.power</code> sorts descending (highest first); flipping it to <code>a.power - b.power</code> sorts ascending instead. Without a comparator at all, <code>.sort()</code> converts everything to strings and sorts alphabetically, which famously sorts numbers like <code>[1, 10, 2]</code> in the wrong order -- always pass a comparator when sorting numbers.</p>' +
        '<p>One more important detail: <code>.sort()</code> mutates the original array in place. To sort without disturbing the original, make a copy first with <code>.slice()</code>, then sort the copy, exactly as shown in the starter below.</p>',
      hints: [
        'Copy the array first with .slice() so you don\'t mutate the original, then call .sort() on the copy.',
        'Use a comparator that returns b.power - a.power for descending order by power.',
        'return heroes.slice().sort(function(a, b) { return b.power - a.power; });'
      ],
      starter: 'function rankHeroes(heroes) {\n  // return a new array, sorted by power descending, without mutating heroes\n\n}',
      mode: 'function',
      entry: 'rankHeroes',
      tests: [
        { args: [[{ name: 'A', power: 5 }, { name: 'B', power: 20 }, { name: 'C', power: 10 }]], expect: [{ name: 'B', power: 20 }, { name: 'C', power: 10 }, { name: 'A', power: 5 }], desc: 'sorts three heroes by power, highest first' },
        { args: [[]], expect: [], desc: 'an empty array sorts to an empty array' },
        { args: [[{ name: 'Solo', power: 1 }]], expect: [{ name: 'Solo', power: 1 }], desc: 'a single hero needs no reordering' }
      ],
      solution: 'function rankHeroes(heroes) {\n  return heroes.slice().sort(function(a, b) {\n    return b.power - a.power;\n  });\n}'
    },
    {
      id: 'act7-boss',
      act: 7,
      title: 'Boss: The Grand Pipeline',
      concept: 'Chain filter, map, sort, and reduce together into one pipeline.',
      prereq: ['act7-callbacks', 'act7-map', 'act7-filter', 'act7-reduce', 'act7-findsomeevery', 'act7-sort'],
      xp: 60,
      lesson: '<p>The final spell of the Higher Order: chain several array methods together into one pipeline, each one passing its output straight to the next. This is where <code>filter</code>, <code>map</code>, <code>sort</code>, and <code>reduce</code> combine into real, expressive data processing.</p>' +
        '<pre><code>const ranked = adventurers\n  .filter(function(a) { return a.active; })\n  .map(function(a) { return { name: a.name, bonus: a.gold + a.level * 10 }; })\n  .sort(function(a, b) { return b.bonus - a.bonus; });</code></pre>' +
        '<p>Each method in the chain returns a new array, which is exactly what lets the next <code>.method()</code> call attach directly onto the end of the previous one. Read a chain like this top to bottom, in the exact order it executes: first every inactive adventurer is dropped, then each remaining one is reshaped into a <code>{ name, bonus }</code> object, then the results are sorted by bonus, highest first.</p>' +
        '<p>Finish the pipeline by reducing the ranked list into a <code>totalBonus</code>, and return both the ranked list and that total together as <code>{ ranked, totalBonus }</code>.</p>',
      hints: [
        'Chain .filter(active).map(to {name,bonus}).sort(descending by bonus) in that order.',
        'bonus is gold + level * 10 for each adventurer.',
        'After building ranked, use ranked.reduce((sum, a) => sum + a.bonus, 0) to get totalBonus.'
      ],
      starter: 'function processAdventurers(adventurers) {\n  const ranked = adventurers\n    .filter(function(a) {\n      // keep only active adventurers\n\n    })\n    .map(function(a) {\n      // reshape into { name, bonus: gold + level * 10 }\n\n    })\n    .sort(function(a, b) {\n      // sort descending by bonus\n\n    });\n  let totalBonus = 0;\n  // sum ranked\'s bonus values into totalBonus\n\n  return { ranked, totalBonus };\n}',
      mode: 'function',
      entry: 'processAdventurers',
      tests: [
        { args: [[{ name: 'Finn', level: 2, gold: 5, active: true }, { name: 'Mira', level: 5, gold: 0, active: true }, { name: 'Zed', level: 10, gold: 100, active: false }]], expect: { ranked: [{ name: 'Mira', bonus: 50 }, { name: 'Finn', bonus: 25 }], totalBonus: 75 }, desc: 'drops the inactive adventurer, ranks the rest by bonus' },
        { args: [[]], expect: { ranked: [], totalBonus: 0 }, desc: 'no adventurers at all' },
        { args: [[{ name: 'Solo', level: 1, gold: 0, active: false }]], expect: { ranked: [], totalBonus: 0 }, desc: 'a single inactive adventurer filters out entirely' }
      ],
      solution: 'function processAdventurers(adventurers) {\n  const ranked = adventurers\n    .filter(function(a) {\n      return a.active;\n    })\n    .map(function(a) {\n      return { name: a.name, bonus: a.gold + a.level * 10 };\n    })\n    .sort(function(a, b) {\n      return b.bonus - a.bonus;\n    });\n  const totalBonus = ranked.reduce(function(sum, a) {\n    return sum + a.bonus;\n  }, 0);\n  return { ranked: ranked, totalBonus: totalBonus };\n}'
    },
    {
      id: 'act8-timeout',
      act: 8,
      title: 'The Delayed Echo',
      concept: 'setTimeout schedules a callback for later; synchronous code always runs first.',
      prereq: ['act7-boss'],
      xp: 30,
      lesson: '<p>JavaScript runs on a single thread, using an <strong>event loop</strong> to handle things that take time without freezing everything else. <code>setTimeout(callback, delay)</code> schedules a callback to run <strong>later</strong> -- after at least <code>delay</code> milliseconds, and always after the current script finishes running.</p>' +
        '<pre><code>console.log(\'first\');\nsetTimeout(function() {\n  console.log(\'later\');\n}, 0);\nconsole.log(\'second\');\n\n// logged order: \'first\', \'second\', \'later\'</code></pre>' +
        '<p>Notice that even with a delay of <code>0</code>, <code>\'later\'</code> still logs <strong>after</strong> <code>\'second\'</code>. That is the key lesson: all of your regular, synchronous code always finishes running first, no matter how small the delay is, before any scheduled callback gets a turn. <code>setTimeout</code> never runs its callback in the middle of currently-executing code.</p>' +
        '<p>Below, log \'Scouting first\', then schedule a <code>setTimeout</code> that logs \'Distant echo\', then log \'Scouting complete\'. Watch which lines appear immediately -- the scheduled one will not be part of what is captured right away, exactly because it has not run yet by the time the surrounding script finishes.</p>',
      hints: [
        'Log \'Scouting first\', then call setTimeout with a callback logging \'Distant echo\', then log \'Scouting complete\'.',
        'The order in your code should be: log, setTimeout(..., 0), log -- the setTimeout callback runs after everything else.',
        'console.log(\'Scouting first\'); setTimeout(function() { console.log(\'Distant echo\'); }, 0); console.log(\'Scouting complete\');'
      ],
      starter: 'console.log(\'Scouting first\');\n// schedule a setTimeout here that logs \'Distant echo\'\n\nconsole.log(\'Scouting complete\');',
      mode: 'output',
      entry: '',
      tests: [
        { expectOutput: ['Scouting first', 'Scouting complete'], desc: 'both synchronous lines are captured, in the order they were logged' },
        { expectOutput: ['Scouting first', 'Scouting complete'], desc: 'the scheduled callback\'s log is NOT part of the captured output yet -- setTimeout(fn, 0) still defers to after the current script' },
        { expectOutput: ['Scouting first', 'Scouting complete'], desc: 'exactly two lines total -- nothing before the first log, nothing skipped before the second' }
      ],
      solution: 'console.log(\'Scouting first\');\nsetTimeout(function() {\n  console.log(\'Distant echo\');\n}, 0);\nconsole.log(\'Scouting complete\');'
    },
    {
      id: 'act8-promises',
      act: 8,
      title: 'The Vow Not Yet Kept',
      concept: 'A Promise represents a value that will resolve or reject later; .then/.catch handle it.',
      prereq: ['act8-timeout'],
      xp: 35,
      lesson: '<p>A <strong>Promise</strong> represents a value that is not ready yet, but will either <em>resolve</em> (succeed) or <em>reject</em> (fail) at some point. You attach <code>.then(onSuccess)</code> to handle the resolved value, and <code>.catch(onError)</code> to handle a rejection.</p>' +
        '<pre><code>const reward = new Promise(function(resolve, reject) {\n  resolve(100);\n});\n\nreward\n  .then(function(value) {\n    return value * 2;\n  })\n  .catch(function(err) {\n    console.log(\'error: \' + err);\n  });</code></pre>' +
        '<p>Calling <code>.then()</code> itself returns a <strong>new Promise</strong> -- which is exactly what lets you chain more <code>.then()</code> calls one after another, each receiving the value returned by the previous one. A single <code>.catch()</code> at the end of a chain catches a rejection from any earlier step, so you rarely need to repeat error handling after every link.</p>' +
        '<p>One thing worth being honest about: a Promise\'s <code>.then()</code> callback never runs immediately -- even an already-resolved Promise defers its callbacks to just after the current script finishes. That means checking a Promise\'s resolved value requires actually waiting for it, which is exactly what <code>async</code>/<code>await</code>, coming up next, was built to make easier.</p>',
      hints: [
        'Build with `new Promise(function(resolve, reject) { resolve(100); })`, then chain .then() and .catch() onto it.',
        'Your .then() callback can transform the value (like multiplying it) and return the new value.',
        'return new Promise(function(resolve) { resolve(100); }).then(function(v) { return v * 2; }).catch(function(e) { console.log(e); });'
      ],
      starter: 'function createRewardPromise() {\n  // build a Promise that resolves with 100, then chain a .then() and a .catch()\n\n}',
      mode: 'assert',
      entry: 'createRewardPromise',
      tests: [
        { assert: 'return entry() instanceof Promise;', desc: 'calling it produces a real Promise' },
        { assert: 'var p = entry(); return typeof p.then === \'function\';', desc: 'the result is thenable -- it has a .then method' },
        { assert: 'var p = entry(); return typeof p.catch === \'function\';', desc: 'the result also has a .catch method, standard on every Promise' }
      ],
      solution: 'function createRewardPromise() {\n  return new Promise(function(resolve, reject) {\n    resolve(100);\n  }).then(function(value) {\n    return value * 2;\n  }).catch(function(err) {\n    console.log(\'error: \' + err);\n  });\n}'
    },
    {
      id: 'act8-asyncawait',
      act: 8,
      title: 'The Patient Incantation',
      concept: 'async functions always return a Promise; await pauses for a Promise to settle.',
      prereq: ['act8-promises'],
      xp: 35,
      lesson: '<p><code>async</code>/<code>await</code> is syntax that makes Promise-based code read like ordinary, top-to-bottom synchronous code. Marking a function <code>async</code> makes it <strong>always return a Promise</strong>, and inside it, <code>await</code> pauses execution until the awaited Promise settles, then hands you its resolved value directly.</p>' +
        '<pre><code>async function fetchTreasureValue() {\n  const value = await Promise.resolve(50);\n  return value * 2;\n}\n\nfetchTreasureValue().then(function(result) {\n  console.log(result); // 100\n});</code></pre>' +
        '<p><code>await</code> can only be used inside a function declared <code>async</code>. Whatever the async function <code>return</code>s becomes the resolved value of the Promise it produces -- you never need to manually wrap it in <code>new Promise(...)</code> yourself. If something inside goes wrong, a thrown error inside an async function turns into a rejected Promise automatically, catchable with <code>.catch()</code> on the call, or <code>try/catch</code> around an <code>await</code> inside the function itself.</p>' +
        '<p>Under the hood, an async function\'s constructor is literally named <code>AsyncFunction</code> -- a detail you can check with <code>fn.constructor.name</code>, which is exactly how the tests below confirm your function is written the async way.</p>',
      hints: [
        'Mark the function with the `async` keyword, then use `await` inside it on a resolved Promise.',
        'async function fetchTreasureValue() { const value = await Promise.resolve(50); return value * 2; }',
        'Don\'t add any parameters -- the function should take zero arguments.'
      ],
      starter: 'async function fetchTreasureValue() {\n  // await a resolved Promise, then return double its value\n\n}',
      mode: 'assert',
      entry: 'fetchTreasureValue',
      tests: [
        { assert: 'return entry() instanceof Promise;', desc: 'calling an async function always returns a Promise' },
        { assert: 'return entry.constructor.name === \'AsyncFunction\';', desc: 'it is declared with the async keyword' },
        { assert: 'return entry.length === 0;', desc: 'it takes no arguments' }
      ],
      solution: 'async function fetchTreasureValue() {\n  const value = await Promise.resolve(50);\n  return value * 2;\n}'
    },
    {
      id: 'act8-mockfetch',
      act: 8,
      title: 'The Simulated Signal',
      concept: 'Combine setTimeout and Promise to simulate a delayed success or failure.',
      prereq: ['act8-asyncawait'],
      xp: 40,
      lesson: '<p>Real network requests are asynchronous, but you can practice the pattern without a real network by combining <code>setTimeout</code> and a <code>Promise</code> to simulate a delayed response, resolving on success or rejecting on failure.</p>' +
        '<pre><code>function mockFetchHero(shouldFail) {\n  return new Promise(function(resolve, reject) {\n    setTimeout(function() {\n      if (shouldFail) {\n        reject(new Error(\'Hero not found\'));\n      } else {\n        resolve({ name: \'Wanderer\', hp: 100 });\n      }\n    }, 10);\n  });\n}</code></pre>' +
        '<p>This is exactly the shape of a real API call: it returns a Promise immediately, before any actual work has finished, and that Promise later resolves or rejects once the simulated delay elapses inside the <code>setTimeout</code>. A caller would use it with <code>mockFetchHero(false).then(hero =&gt; ...).catch(err =&gt; ...)</code>, or with <code>await</code> inside an async function.</p>' +
        '<p>Notice that <code>shouldFail</code> decides the <strong>outcome</strong>, but not whether a Promise is returned -- every call returns a Promise immediately, regardless of what will eventually happen inside it. That is what makes it safe to always chain <code>.then()</code>/<code>.catch()</code> onto the result without checking anything first.</p>',
      hints: [
        'Return `new Promise((resolve, reject) => { ... })` and put a setTimeout inside its executor.',
        'Inside the setTimeout callback, reject with an Error when shouldFail is true, otherwise resolve with a hero object.',
        'function mockFetchHero(shouldFail) { return new Promise(function(resolve, reject) { setTimeout(function() { if (shouldFail) { reject(new Error(\'Hero not found\')); } else { resolve({ name: \'Wanderer\', hp: 100 }); } }, 10); }); }'
      ],
      starter: 'function mockFetchHero(shouldFail) {\n  // return a Promise that resolves with hero data, or rejects if shouldFail is true\n\n}',
      mode: 'assert',
      entry: 'mockFetchHero',
      tests: [
        { assert: 'return entry(false) instanceof Promise && entry(true) instanceof Promise;', desc: 'both the success and failure paths return a Promise' },
        { assert: 'return entry.length === 1;', desc: 'it takes exactly one argument, the failure flag' },
        { assert: 'var p = entry(false); return typeof p.then === \'function\' && typeof p.catch === \'function\';', desc: 'the returned Promise is ready to be chained with .then/.catch' }
      ],
      solution: 'function mockFetchHero(shouldFail) {\n  return new Promise(function(resolve, reject) {\n    setTimeout(function() {\n      if (shouldFail) {\n        reject(new Error(\'Hero not found\'));\n      } else {\n        resolve({ name: \'Wanderer\', hp: 100 });\n      }\n    }, 10);\n  });\n}'
    },
    {
      id: 'act8-boss',
      act: 8,
      title: 'Boss: The Rift Convergence',
      concept: 'Orchestrate a couple of awaited steps inside one async function.',
      prereq: ['act8-timeout', 'act8-promises', 'act8-asyncawait', 'act8-mockfetch'],
      xp: 60,
      lesson: '<p>The final rift crossing: orchestrate a small sequence of <strong>awaited</strong> steps inside one <code>async</code> function, the way a real multi-step operation (fetch a user, then fetch their data, then combine it) would be written.</p>' +
        '<pre><code>async function runExpedition() {\n  const gold = await Promise.resolve(30);\n  const bonus = await Promise.resolve(20);\n  return gold + bonus;\n}</code></pre>' +
        '<p>Each <code>await</code> pauses only that function\'s progress until its Promise settles, then moves to the next line with the resolved value in hand -- the two steps run in sequence, one after the other, exactly as written top to bottom, which is the whole point of <code>async</code>/<code>await</code> over raw <code>.then()</code> chains.</p>' +
        '<p>Because it is declared <code>async</code>, every call to <code>runExpedition()</code> returns a brand-new Promise -- calling it twice produces two independent Promises, not the same one reused, even though the function\'s logic is identical both times. Build it below, awaiting two resolved values in sequence and returning their sum.</p>',
      hints: [
        'Declare it with `async function runExpedition() { ... }` and await two separate Promise.resolve(...) calls in sequence.',
        'Store each awaited value in its own const, then return their sum.',
        'async function runExpedition() { const gold = await Promise.resolve(30); const bonus = await Promise.resolve(20); return gold + bonus; }'
      ],
      starter: 'async function runExpedition() {\n  // await two resolved values in sequence, then return their sum\n\n}',
      mode: 'assert',
      entry: 'runExpedition',
      tests: [
        { assert: 'return entry() instanceof Promise;', desc: 'calling it returns a Promise' },
        { assert: 'return entry.constructor.name === \'AsyncFunction\';', desc: 'it is declared async so it can await each step' },
        { assert: 'var p1 = entry(); var p2 = entry(); return p1 instanceof Promise && p2 instanceof Promise && p1 !== p2;', desc: 'every call launches a fresh, independent expedition' },
        { assert: 'return entry.length === 0;', desc: 'it needs no arguments to begin' }
      ],
      solution: 'async function runExpedition() {\n  const gold = await Promise.resolve(30);\n  const bonus = await Promise.resolve(20);\n  return gold + bonus;\n}'
    }
  ];

  window.SYNTAXIA_EXTRA = { acts: acts, quests: quests };
})();
