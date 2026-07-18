// Syntaxia content data -- Acts 2 through 8.
// Appends onto window.SYNTAXIA_CONTENT via window.SYNTAXIA_EXTRA; see js/content.js
// for the base schema and Act 1.
(function () {
  var acts = [
    {
      "id": 2,
      "name": "The Forked Paths",
      "theme": "Control Flow",
      "blurb": "Where every path splits in two, and only clear logic picks the right one.",
      "accent": "#c0392b"
    },
    {
      "id": 3,
      "name": "The Looping Wilds",
      "theme": "Loops",
      "blurb": "A tangled wilderness that only yields to those who know how to repeat themselves.",
      "accent": "#27ae60"
    },
    {
      "id": 4,
      "name": "The Hall of Functions",
      "theme": "Functions",
      "blurb": "A vast hall of reusable magic, where small spells combine into greater ones.",
      "accent": "#8e44ad"
    },
    {
      "id": 5,
      "name": "The Array Archipelago",
      "theme": "Arrays",
      "blurb": "A scattered chain of islands, each one holding an ordered list of treasures.",
      "accent": "#2980b9"
    },
    {
      "id": 6,
      "name": "The Object Sanctum",
      "theme": "Objects",
      "blurb": "A quiet sanctum where knowledge is kept in labeled, nested chambers.",
      "accent": "#d35400"
    },
    {
      "id": 7,
      "name": "The Higher Order",
      "theme": "Higher-Order Functions",
      "blurb": "Spells that cast other spells -- the highest craft an array can learn.",
      "accent": "#f1c40f"
    },
    {
      "id": 8,
      "name": "The Async Rift",
      "theme": "Asynchronous JavaScript",
      "blurb": "A shimmering tear in time, where some answers only arrive after a wait.",
      "accent": "#16a085"
    }
  ];

  var quests = [
    {
      "id": "act2-booleans",
      "act": 2,
      "title": "The Coin of Truth",
      "concept": "Booleans and comparison operators produce true/false values.",
      "prereq": [
        "act1-boss"
      ],
      "xp": 25,
      "lesson": "<p>Every gate in Syntaxia asks a yes-or-no question, and JavaScript answers with a <strong>boolean</strong>: <code>true</code> or <code>false</code>. You get there with <strong>comparison operators</strong>.</p><ul><li><code>===</code> and <code>!==</code> check strict equality (same value AND same type)</li><li><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> compare size or order</li></ul><p>Avoid the loose <code>==</code> and <code>!=</code> operators. They quietly convert types before comparing, so <code>'5' == 5</code> is <code>true</code> even though one is a string and the other a number. The strict versions, <code>===</code> and <code>!==</code>, refuse to do that conversion, which keeps your logic predictable.</p><pre><code>let power = 12;\nlet requiredPower = 10;\n\nconsole.log(power &gt;= requiredPower); // true\nconsole.log(power === 10);             // false\nconsole.log('5' === 5);                // false, different types</code></pre><p>Comparisons like these are the raw material of every decision your code will ever make. Master them here and if/else, loops, and conditions all get easier.</p>",
      "hints": [
        "Use the >= operator to compare power against requiredPower directly.",
        "You do not need an if statement here -- a comparison expression already evaluates to true or false.",
        "Return power >= requiredPower; that single expression is your entire function body."
      ],
      "starter": "function canPassGate(power, requiredPower) {\n  // return true if power is enough to pass the gate\n\n}",
      "mode": "function",
      "entry": "canPassGate",
      "tests": [
        {
          "args": [
            10,
            10
          ],
          "expect": true,
          "desc": "equal power meets an equal requirement",
          "teach": "If this comes back false, check you are using >= and not just > -- an equal power should still pass the gate."
        },
        {
          "args": [
            5,
            10
          ],
          "expect": false,
          "desc": "not enough power fails the gate",
          "teach": "If this comes back true, the comparison may be backwards (requiredPower >= power instead of power >= requiredPower)."
        },
        {
          "args": [
            15,
            10
          ],
          "expect": true,
          "desc": "more than enough power passes",
          "teach": "More than enough power should clearly pass -- double check the direction of your comparison operator."
        },
        {
          "args": [
            0,
            0
          ],
          "expect": true,
          "desc": "zero meets a zero requirement",
          "teach": "Zero meeting a zero requirement should still count as enough -- watch for treating 0 as if it were automatically false here."
        }
      ],
      "solution": "function canPassGate(power, requiredPower) {\n  return power >= requiredPower;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Every gate in Syntaxia asks a yes-or-no question, and JavaScript answers with a <strong>boolean</strong>: <code>true</code> or <code>false</code>. You arrive at one with <strong>comparison operators</strong> -- <code>===</code>/<code>!==</code> for strict equality (same value AND same type), and <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> for size or order.</p><p>Avoid the loose <code>==</code>/<code>!=</code> operators. They quietly convert types before comparing, which makes their results unpredictable at the edges.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let power = 12;\nlet requiredPower = 10;\n\nconsole.log(power >= requiredPower); // true\nconsole.log(power === 10);             // false\nconsole.log('5' === 5);                // false, different types</code></pre><p>Line 4 checks 12 against 10 with <code>&gt;=</code>, which is true. Line 5 checks 12 against 10 with strict equality, which is false since the values differ. Line 6 compares a string to a number -- <code>===</code> refuses to convert either side, so even though they \"look\" equal, the result is false.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A common wrong belief: \"<code>==</code> and <code>===</code> do the same thing.\" They do not:</p><pre><code>console.log('5' == 5);  // true  -- == converts types first\nconsole.log('5' === 5); // false -- === refuses to convert</code></pre><p><code>==</code> coerces both operands to a common type before comparing, which produces surprising results in edge cases. <code>===</code> never coerces, so its behavior is always predictable. Reach for <code>===</code>/<code>!==</code> by default.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>This one is a single expression, not a block of code -- <code>canPassGate</code> just needs to answer one true or false question directly.</p><ol><li>Compare <code>power</code> against <code>requiredPower</code> using <code>&gt;=</code>.</li><li>Return that comparison directly -- no <code>if</code> statement needed, since a comparison already evaluates to a boolean.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Two comparisons, same two values -- predict both results.",
        "code": "let a = 5;\nlet b = \"5\";\nconsole.log(a == b);\nconsole.log(a === b);",
        "choices": [
          "true, false",
          "false, true",
          "true, true"
        ],
        "answer": 0,
        "explain": "a == b coerces the string \"5\" to a number for the comparison, so it matches (true); a === b refuses to coerce, and a number is never strictly equal to a string, so it is false. Picking \"false, true\" swaps which operator is the strict one."
      }
    },
    {
      "id": "act2-ifelse",
      "act": 2,
      "title": "The Fork in the Road",
      "concept": "if/else and else if choose one branch to run based on a condition.",
      "prereq": [
        "act2-booleans"
      ],
      "xp": 30,
      "lesson": "<p>An <code>if</code> statement runs a block only when its condition is <code>true</code>. Add <code>else</code> for what happens otherwise, and <code>else if</code> to test additional conditions in order.</p><pre><code>if (power &lt; 10) {\n  console.log('weak');\n} else if (power &lt; 25) {\n  console.log('capable');\n} else {\n  console.log('mighty');\n}</code></pre><p>JavaScript checks each condition top to bottom and stops at the first one that is true, skipping the rest. Order matters: if you swapped the branches above and checked <code>power &lt; 25</code> first, a power of 5 would incorrectly land in 'capable' instead of 'weak', because 5 is also less than 25. Always put your narrowest or most specific condition first when ranges overlap like this.</p><p>You can chain as many <code>else if</code> blocks as you need, and the final plain <code>else</code> acts as a catch-all for anything that did not match earlier conditions. Only one branch ever runs per call.</p>",
      "hints": [
        "Write three branches: power < 10, power < 25, and everything else.",
        "Check the smaller boundary first (< 10), then the next (< 25) -- order matters because JavaScript stops at the first true condition.",
        "return 'weak' if power < 10; else return 'capable' if power < 25; else return 'mighty'."
      ],
      "starter": "function classifyPower(power) {\n  // return 'weak', 'capable', or 'mighty'\n\n}",
      "mode": "function",
      "entry": "classifyPower",
      "tests": [
        {
          "args": [
            0
          ],
          "expect": "weak",
          "desc": "zero power is weak",
          "teach": "If this fails, make sure your first check is power < 10, not <= or a different boundary."
        },
        {
          "args": [
            9
          ],
          "expect": "weak",
          "desc": "just under the first boundary is still weak",
          "teach": "9 sits right at the edge -- if this fails, your boundary comparison (< vs <=) is likely off by one."
        },
        {
          "args": [
            10
          ],
          "expect": "capable",
          "desc": "the boundary itself counts as capable",
          "teach": "10 should tip into the next tier -- if it stays \"weak\", your first condition may use <= instead of <."
        },
        {
          "args": [
            24
          ],
          "expect": "capable",
          "desc": "just under the second boundary is still capable",
          "teach": "24 is the top of the \"capable\" range -- check your second condition is power < 25, not something that excludes it."
        },
        {
          "args": [
            25
          ],
          "expect": "mighty",
          "desc": "the second boundary counts as mighty",
          "teach": "25 should fall through both checks into \"mighty\" -- if not, your second boundary is likely <= 25 instead of < 25."
        },
        {
          "args": [
            100
          ],
          "expect": "mighty",
          "desc": "well above the boundary is mighty",
          "teach": "Any large number should land in the final else -- if it does not, one of your earlier conditions is probably too permissive."
        }
      ],
      "solution": "function classifyPower(power) {\n  if (power < 10) {\n    return 'weak';\n  } else if (power < 25) {\n    return 'capable';\n  } else {\n    return 'mighty';\n  }\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>An <code>if</code> statement runs a block only when its condition is <code>true</code>. Add <code>else</code> for what happens otherwise, and <code>else if</code> to test additional conditions in order. JavaScript checks each one top to bottom and stops at the first one that matches, skipping everything after it.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>if (power < 10) {\n  console.log('weak');\n} else if (power < 25) {\n  console.log('capable');\n} else {\n  console.log('mighty');\n}</code></pre><p>If <code>power</code> is under 10, the first branch runs and the rest are skipped entirely. Only when that check fails does JavaScript move on to test <code>power &lt; 25</code>, and so on. The final plain <code>else</code> catches anything that matched none of the earlier conditions.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Order matters when ranges overlap. Swap the branches above and a value of 5 lands in the wrong bucket:</p><pre><code>if (power < 25) { return 'capable'; }\nelse if (power < 10) { return 'weak'; } // unreachable for anything under 10!</code></pre><p>Since 5 is already less than 25, the first branch fires and returns \"capable\" -- the <code>power &lt; 10</code> branch below can never trigger for genuinely weak values. Always order your narrowest or most specific condition first when ranges overlap.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>classifyPower</code> needs three distinct answers depending on where power falls, so line the branches up in the right order and let the boundaries land exactly where the tests expect.</p><ol><li>Return \"weak\" if <code>power &lt; 10</code>.</li><li>Return \"capable\" if <code>power &lt; 25</code>.</li><li>Otherwise return \"mighty\".</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "The branches below are deliberately out of the usual order -- trace it carefully.",
        "code": "function grade(n) {\n  if (n < 25) return 'low';\n  else if (n < 10) return 'mid';\n  else return 'high';\n}\nconsole.log(grade(5));",
        "choices": [
          "low",
          "mid",
          "high",
          "undefined"
        ],
        "answer": 0,
        "explain": "5 is already less than 25, so the first branch fires and returns \"low\" immediately -- the n < 10 branch never even gets checked, since branches are ordered widest-first here. \"mid\" is what you would get only if the narrower condition were checked first."
      }
    },
    {
      "id": "act2-logical",
      "act": 2,
      "title": "The Vault of And, Or, Not",
      "concept": "Combine booleans with && (and), || (or), and ! (not).",
      "prereq": [
        "act2-ifelse"
      ],
      "xp": 30,
      "lesson": "<p>Logical operators combine or invert booleans:</p><ul><li><code>&amp;&amp;</code> (AND) is true only when both sides are true</li><li><code>||</code> (OR) is true when at least one side is true</li><li><code>!</code> (NOT) flips true to false and false to true</li></ul><pre><code>let hasKey = true;\nlet isCursed = false;\n\nconsole.log(hasKey &amp;&amp; !isCursed); // true\nconsole.log(hasKey || isCursed);    // true</code></pre><p><code>&amp;&amp;</code> and <code>||</code> both <strong>short-circuit</strong>: for <code>&amp;&amp;</code>, if the left side is false, JavaScript never even evaluates the right side, because the whole expression is already guaranteed false. For <code>||</code>, if the left side is true, the right side is skipped since the result is already true. This is not just an optimization -- you can rely on it, for example to safely check <code>obj &amp;&amp; obj.value</code> without crashing when <code>obj</code> is missing.</p><p>You can combine several conditions in one expression, and parentheses make the intended grouping explicit, which is good practice even when not strictly required.</p>",
      "hints": [
        "You need all three inputs to matter: combine hasKey, hasTorch, and the negation of isCursed.",
        "Use && to require hasKey AND hasTorch, and use ! to flip isCursed.",
        "return (hasKey && hasTorch) && !isCursed;"
      ],
      "starter": "function canEnterVault(hasKey, hasTorch, isCursed) {\n  // true only if the hero has both the key and torch, and is not cursed\n\n}",
      "mode": "function",
      "entry": "canEnterVault",
      "tests": [
        {
          "args": [
            true,
            true,
            false
          ],
          "expect": true,
          "desc": "has both items and no curse",
          "teach": "If this fails, check you required both hasKey and hasTorch with &&, not just one of them."
        },
        {
          "args": [
            true,
            false,
            false
          ],
          "expect": false,
          "desc": "missing the torch fails",
          "teach": "A missing torch should still fail the check -- if this passes, you may be using || somewhere && belongs."
        },
        {
          "args": [
            true,
            true,
            true
          ],
          "expect": false,
          "desc": "a curse blocks entry even with both items",
          "teach": "A curse should override having both items -- make sure you are negating isCursed with ! and combining it with &&."
        },
        {
          "args": [
            false,
            false,
            false
          ],
          "expect": false,
          "desc": "missing everything fails",
          "teach": "Missing everything should clearly fail -- if this passes, one of your conditions may be inverted by mistake."
        }
      ],
      "solution": "function canEnterVault(hasKey, hasTorch, isCursed) {\n  return hasKey && hasTorch && !isCursed;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Logical operators combine or invert booleans: <code>&amp;&amp;</code> (AND) is true only when both sides are true, <code>||</code> (OR) is true when at least one side is, and <code>!</code> (NOT) flips true to false and back. They let you express a single decision built from several smaller ones.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let hasKey = true;\nlet isCursed = false;\n\nconsole.log(hasKey &amp;&amp; !isCursed); // true\nconsole.log(hasKey || isCursed);    // true</code></pre><p><code>!isCursed</code> flips <code>false</code> to <code>true</code>, so <code>hasKey &amp;&amp; true</code> is true. The second line short-circuits: since <code>hasKey</code> is already true, <code>||</code> never even needs to look at <code>isCursed</code> to know the whole expression is true.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>It is easy to assume both sides of <code>&amp;&amp;</code> or <code>||</code> always run. They do not -- that is <strong>short-circuiting</strong>, and it can skip real work:</p><pre><code>false &amp;&amp; sayHello(); // sayHello() never runs at all -- && already knows the result is false</code></pre><p><code>&amp;&amp;</code> stops at the first falsy value; <code>||</code> stops at the first truthy one. Anything after that point is skipped entirely, not just unused -- which matters a lot if that skipped code has a side effect.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>canEnterVault</code> has three separate conditions to weigh at once. Combine them so every single one has to hold true before entry is ever granted.</p><ol><li>Combine <code>hasKey</code> and <code>hasTorch</code> with <code>&amp;&amp;</code>.</li><li>Negate <code>isCursed</code> with <code>!</code>.</li><li>Combine all three into one true/false result.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Does ping() actually run here? Predict what prints.",
        "code": "function ping() { console.log('ping'); return true; }\nlet result = false && ping();\nconsole.log(result);",
        "choices": [
          "false",
          "ping, false",
          "true"
        ],
        "answer": 0,
        "explain": "false && ... short-circuits immediately since the left side is already false, so ping() never runs and its own console.log never fires -- only the final console.log(result) executes, printing false. \"ping, false\" assumes both sides of && always run no matter what."
      }
    },
    {
      "id": "act2-ternary",
      "act": 2,
      "title": "The Riddle in One Breath",
      "concept": "The ternary operator condition ? a : b picks a value in one expression.",
      "prereq": [
        "act2-logical"
      ],
      "xp": 30,
      "lesson": "<p>The <strong>ternary operator</strong> <code>condition ? valueIfTrue : valueIfFalse</code> is a compact if/else that produces a value instead of running a block. It reads left to right: ask a question, then give the answer for true, then the answer for false.</p><pre><code>let hp = 15;\nlet status = hp &gt; 0 ? 'alive' : 'fallen';\nconsole.log(status); // 'alive'</code></pre><p>Ternaries can be chained to handle more than two outcomes, by putting another ternary in the 'false' slot:</p><pre><code>let rank = level &gt;= 20 ? 'master'\n  : level &gt;= 10 ? 'adept'\n  : 'novice';</code></pre><p>Chained ternaries are evaluated top to bottom just like <code>else if</code>: the first condition that is true wins. They are best used for short, simple decisions that produce a value directly. If the logic grows complex, or you need to run multiple statements per branch, a regular if/else is more readable -- do not force a ternary just to be clever.</p>",
      "hints": [
        "You need two decision points, so chain two ternaries: level >= 20 first, then level >= 10.",
        "Structure it like: level >= 20 ? 'master' : (level >= 10 ? 'adept' : 'novice').",
        "return level >= 20 ? 'master' : level >= 10 ? 'adept' : 'novice';"
      ],
      "starter": "function classifyRank(level) {\n  // return 'master', 'adept', or 'novice' using a chained ternary\n\n}",
      "mode": "function",
      "entry": "classifyRank",
      "tests": [
        {
          "args": [
            25
          ],
          "expect": "master",
          "desc": "high level is master",
          "teach": "If \"master\" is not returned, verify your first ternary condition checks level >= 20, not a different threshold."
        },
        {
          "args": [
            20
          ],
          "expect": "master",
          "desc": "the boundary counts as master",
          "teach": "The boundary itself should count -- check you used >= 20, not > 20, which would exclude exactly 20."
        },
        {
          "args": [
            15
          ],
          "expect": "adept",
          "desc": "mid level is adept",
          "teach": "If this returns \"novice\", make sure your second ternary condition is level >= 10."
        },
        {
          "args": [
            10
          ],
          "expect": "adept",
          "desc": "the lower boundary counts as adept",
          "teach": "10 is the adept boundary -- if it falls to \"novice\", your second condition may use > instead of >=."
        },
        {
          "args": [
            5
          ],
          "expect": "novice",
          "desc": "low level is novice",
          "teach": "Anything below both thresholds should reach the final fallback value -- check it is exactly \"novice\"."
        }
      ],
      "solution": "function classifyRank(level) {\n  return level >= 20 ? 'master' : level >= 10 ? 'adept' : 'novice';\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>The <strong>ternary operator</strong>, <code>condition ? valueIfTrue : valueIfFalse</code>, is a compact if/else that produces a value instead of running a block. Read it left to right: ask a question, give the answer for true, then the answer for false.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let hp = 15;\nlet status = hp &gt; 0 ? 'alive' : 'fallen';\nconsole.log(status); // 'alive'</code></pre><p>Ternaries chain to handle more than two outcomes, by putting another ternary in the \"false\" slot:</p><pre><code>let rank = level &gt;= 20 ? 'master'\n  : level &gt;= 10 ? 'adept'\n  : 'novice';</code></pre><p>Chained ternaries evaluate top to bottom just like <code>else if</code> -- the first condition that is true wins, and everything after it is skipped.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A ternary's two answers are easy to accidentally flip, especially when a condition reads awkwardly:</p><pre><code>let msg = hp === 0 ? 'alive' : 'fallen'; // BACKWARDS -- hp===0 means fallen, not alive!</code></pre><p>Always double check which side is the true-answer and which is the false-answer. Ternaries are best for short, simple decisions -- if the logic grows complex or needs multiple statements per branch, a regular if/else reads more clearly.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>classifyRank</code> needs three possible answers from a single level number, using nothing but chained ternaries -- no if statements needed this time.</p><ol><li>Chain two ternaries: check <code>level &gt;= 20</code> first, then <code>level &gt;= 10</code>.</li><li>Fall back to \"novice\" as the final result.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One value, two chained checks -- what lands where?",
        "code": "let n = 12;\nlet label = n > 20 ? 'big' : n > 10 ? 'medium' : 'small';\nconsole.log(label);",
        "choices": [
          "medium",
          "small",
          "big"
        ],
        "answer": 0,
        "explain": "12 fails the first test (> 20) but passes the second (> 10), landing on \"medium\". \"small\" would only be right if the second condition needed 12 or higher; \"big\" assumes the first condition matched."
      }
    },
    {
      "id": "act2-boss",
      "act": 2,
      "title": "Boss: The Gatekeeper's Riddle",
      "concept": "Combine booleans, if/else, and logical operators into one decision engine.",
      "prereq": [
        "act2-booleans",
        "act2-ifelse",
        "act2-logical",
        "act2-ternary"
      ],
      "xp": 50,
      "lesson": "<p>Every fork in the road eventually leads to a gatekeeper who has to make one real decision from many moving parts. This is where booleans, if/else, and logical operators all work together. The trick is not any single operator -- it is the <strong>order</strong> you check things in.</p><pre><code>if (hp &lt;= 0) {\n  return 'retreat';\n}\nif (enemyNear &amp;&amp; mana &gt;= 10) {\n  return 'cast spell';\n}\n// ...more checks below</code></pre><p>Because <code>if</code> statements stop at the first match, put your most urgent, most specific condition first. A fallen hero (<code>hp &lt;= 0</code>) should retreat no matter what else is true -- even if an enemy is near and a potion is in hand. That check has to come before the others or it will never be reached.</p><p>Build the decision engine below, checking conditions in this priority order: retreat if out of hp, cast a spell if an enemy is near and mana is at least 10, drink a potion if an enemy is near, a potion is held, and hp is under 20, attack if an enemy is simply near, and otherwise explore.</p>",
      "hints": [
        "Destructure the context object, then write four if statements in order of urgency, each with an early return.",
        "The hp <= 0 check must come first, before any enemy-related checks -- a fallen hero always retreats.",
        "Order: hp<=0 -> 'retreat'; else enemyNear && mana>=10 -> 'cast spell'; else enemyNear && hasPotion && hp<20 -> 'drink potion'; else enemyNear -> 'attack'; else 'explore'."
      ],
      "starter": "function decideAction(context) {\n  const { hp, mana, enemyNear, hasPotion } = context;\n  // check conditions in priority order and return the right action string\n\n}",
      "mode": "function",
      "entry": "decideAction",
      "tests": [
        {
          "args": [
            {
              "hp": 0,
              "mana": 0,
              "enemyNear": true,
              "hasPotion": true
            }
          ],
          "expect": "retreat",
          "desc": "a fallen hero always retreats first, before any other check",
          "teach": "A fallen hero should retreat no matter what else is true -- if this fails, your hp<=0 check probably is not first."
        },
        {
          "args": [
            {
              "hp": 50,
              "mana": 15,
              "enemyNear": true,
              "hasPotion": false
            }
          ],
          "expect": "cast spell",
          "desc": "enough mana near an enemy casts a spell",
          "teach": "If this returns \"attack\" instead, check that your mana>=10 check comes before the plain enemyNear check."
        },
        {
          "args": [
            {
              "hp": 10,
              "mana": 0,
              "enemyNear": true,
              "hasPotion": true
            }
          ],
          "expect": "drink potion",
          "desc": "low hp with a potion and no mana",
          "teach": "If this returns \"attack\", make sure the potion-and-low-hp check is tested before the plain attack fallback."
        },
        {
          "args": [
            {
              "hp": 50,
              "mana": 0,
              "enemyNear": true,
              "hasPotion": false
            }
          ],
          "expect": "attack",
          "desc": "an enemy near with no better option means attack",
          "teach": "If this does not match, verify enemyNear alone, with no better option, still falls through to \"attack\"."
        },
        {
          "args": [
            {
              "hp": 50,
              "mana": 0,
              "enemyNear": false,
              "hasPotion": true
            }
          ],
          "expect": "explore",
          "desc": "nothing urgent means it is safe to explore",
          "teach": "When nothing urgent is true, the function should reach its final fallback -- check for a stray condition catching this case early."
        }
      ],
      "solution": "function decideAction(context) {\n  const { hp, mana, enemyNear, hasPotion } = context;\n  if (hp <= 0) {\n    return 'retreat';\n  }\n  if (enemyNear && mana >= 10) {\n    return 'cast spell';\n  }\n  if (enemyNear && hasPotion && hp < 20) {\n    return 'drink potion';\n  }\n  if (enemyNear) {\n    return 'attack';\n  }\n  return 'explore';\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Every fork in the road eventually leads to a gatekeeper who has to make one real decision from many moving parts, using booleans, if/else, and logical operators together. The trick is not any single operator -- it is the <strong>order</strong> you check things in.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>if (hp &lt;= 0) {\n  return 'retreat';\n}\nif (enemyNear &amp;&amp; mana &gt;= 10) {\n  return 'cast spell';\n}\n// ...more checks below</code></pre><p>Because <code>if</code> statements with an early <code>return</code> stop the function immediately, whichever check is written first wins whenever more than one could apply. A fallen hero (<code>hp &lt;= 0</code>) should retreat no matter what else is true -- so that check has to come before the others, or it will never even be reached.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>It is easy to forget that once a function <code>return</code>s, none of the later checks in that same function ever run -- even ones that would also have been true. This is exactly why priority order in a chain of early returns is the whole design, not an afterthought.</p>"
        },
        {
          "title": "Your Task",
          "body": "<ol><li>Check <code>hp &lt;= 0</code> first, and return \"retreat\".</li><li>Then check <code>enemyNear &amp;&amp; mana &gt;= 10</code> for \"cast spell\", and <code>enemyNear &amp;&amp; hasPotion &amp;&amp; hp &lt; 20</code> for \"drink potion\".</li><li>Otherwise return \"attack\" if <code>enemyNear</code>, or \"explore\" if nothing urgent is true.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Two conditions are both true here -- which one wins?",
        "code": "function pick(hp, enemy) {\n  if (hp <= 0) return 'retreat';\n  if (enemy) return 'attack';\n  return 'explore';\n}\nconsole.log(pick(0, true));",
        "choices": [
          "retreat",
          "attack",
          "explore"
        ],
        "answer": 0,
        "explain": "hp <= 0 is checked first and returns immediately, so it does not matter that enemy is also true -- that second check is never reached. Picking \"attack\" assumes the function checks every condition instead of stopping at the first return."
      }
    },
    {
      "id": "act3-while",
      "act": 3,
      "title": "The First Cycle",
      "concept": "while repeats a block for as long as its condition stays true.",
      "prereq": [
        "act2-boss"
      ],
      "xp": 25,
      "lesson": "<p>A <code>while</code> loop repeats a block for as long as its condition stays true. You control it with three pieces: a starting value, the condition that keeps it going, and something inside the loop that eventually makes the condition false -- otherwise it never stops.</p><pre><code>let i = 1;\nwhile (i &lt;= 5) {\n  console.log(i);\n  i++;\n}\n// logs 1, 2, 3, 4, 5</code></pre><p>The condition is checked <strong>before</strong> every iteration, including the first. If it is false immediately, the loop body never runs at all -- that is a normal, useful outcome, not an error. It is what should happen, for example, when counting up to zero.</p><p><code>while</code> loops are the most flexible loop because the condition can be anything, not just a counter. Use them when the number of repetitions is not known ahead of time -- waiting for an event, walking a data structure until you hit an end marker, and so on. When you know the exact count in advance, a <code>for</code> loop (next!) is usually a tidier fit.</p>",
      "hints": [
        "Start a counter at 1 and push it into a results array while it is <= n.",
        "Remember to increment the counter inside the loop, or it will run forever.",
        "const result = []; let i = 1; while (i <= n) { result.push(i); i++; } return result;"
      ],
      "starter": "function countUpTo(n) {\n  const result = [];\n  // fill result with 1, 2, ..., n using a while loop\n\n  return result;\n}",
      "mode": "function",
      "entry": "countUpTo",
      "tests": [
        {
          "args": [
            5
          ],
          "expect": [
            1,
            2,
            3,
            4,
            5
          ],
          "desc": "counts up from 1 to 5",
          "teach": "If you are missing numbers or have extras, check the increment happens exactly once per pass, inside the loop body."
        },
        {
          "args": [
            1
          ],
          "expect": [
            1
          ],
          "desc": "a single-step count",
          "teach": "A single-step count should still run the loop body exactly once -- an empty array here usually means the condition is wrong."
        },
        {
          "args": [
            0
          ],
          "expect": [],
          "desc": "counting to zero produces an empty list -- the loop body never runs",
          "teach": "Counting to zero should produce an empty array without ever entering the loop body -- that is the condition failing immediately, not a bug."
        }
      ],
      "solution": "function countUpTo(n) {\n  const result = [];\n  let i = 1;\n  while (i <= n) {\n    result.push(i);\n    i++;\n  }\n  return result;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A <code>while</code> loop repeats a block for as long as its condition stays true. You control it with three pieces: a starting value, the condition that keeps it going, and something inside the loop that eventually makes the condition false -- otherwise it never stops.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let i = 1;\nwhile (i &lt;= 5) {\n  console.log(i);\n  i++;\n}\n// logs 1, 2, 3, 4, 5</code></pre><p>The condition is checked <strong>before</strong> every pass, including the first. <code>i</code> starts at 1, which satisfies <code>i &lt;= 5</code>, so the body runs and logs, then increments. This repeats until <code>i</code> becomes 6, where the check finally fails and the loop stops.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Forgetting to update the loop variable inside the body is the classic mistake -- it creates an infinite loop, since the condition can never become false:</p><pre><code>let i = 1;\nwhile (i &lt;= 5) {\n  console.log(i); // logs 1 forever -- i never changes!\n}</code></pre><p>Something inside the loop body must always move the condition toward becoming false, on every single pass.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>countUpTo</code> needs to build its list one number at a time, using nothing but a while loop and a counter you manage by hand.</p><ol><li>Start a counter <code>i</code> at 1.</li><li>While <code>i &lt;= n</code>, push <code>i</code> into <code>result</code>.</li><li>Increment <code>i</code> on every pass.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Count how many times this loop actually runs.",
        "code": "let i = 3;\nlet out = [];\nwhile (i > 0) {\n  out.push(i);\n  i--;\n}\nconsole.log(out.length);",
        "choices": [
          "3",
          "0",
          "4"
        ],
        "answer": 0,
        "explain": "The loop pushes once each for i = 3, 2, and 1 -- three passes total -- before i hits 0 and the condition fails. Picking 0 assumes the loop never runs at all; picking 4 assumes it also runs once more once i reaches 0."
      }
    },
    {
      "id": "act3-for",
      "act": 3,
      "title": "The Counted March",
      "concept": "for packs start, condition, and step into a single loop header.",
      "prereq": [
        "act3-while"
      ],
      "xp": 30,
      "lesson": "<p>A <code>for</code> loop packs the three parts of a while loop -- start, condition, step -- into one line: <code>for (start; condition; step)</code>. It is the natural choice when you already know how many times to repeat something.</p><pre><code>let sum = 0;\nfor (let i = 1; i &lt;= 5; i++) {\n  sum += i;\n}\nconsole.log(sum); // 15</code></pre><p>Each part runs at a specific moment: the start runs once before anything else, the condition is checked before every iteration, and the step runs after every iteration's body. If the condition is false from the very first check -- say, a starting value already past the ending value -- the body never executes and the loop finishes instantly with whatever the accumulator was before it began.</p><p>The <code>+=</code> operator above is shorthand for <code>sum = sum + i</code>. Accumulating a running total across a loop like this is one of the most common patterns you will write in JavaScript, so it is worth getting comfortable with early.</p>",
      "hints": [
        "Declare a sum variable at 0, then loop i from start to end inclusive, adding i to sum each time.",
        "The loop condition should be i <= end so the end value itself gets included.",
        "let sum = 0; for (let i = start; i <= end; i++) { sum += i; } return sum;"
      ],
      "starter": "function sumRange(start, end) {\n  let sum = 0;\n  // add every number from start to end (inclusive) into sum\n\n  return sum;\n}",
      "mode": "function",
      "entry": "sumRange",
      "tests": [
        {
          "args": [
            1,
            5
          ],
          "expect": 15,
          "desc": "sums 1 through 5",
          "teach": "If your total is off by the last number, check whether your condition should be <= end, not < end."
        },
        {
          "args": [
            5,
            5
          ],
          "expect": 5,
          "desc": "a range of a single number",
          "teach": "A range of a single number should still run the loop body once -- verify your condition does not exclude start equaling end."
        },
        {
          "args": [
            3,
            1
          ],
          "expect": 0,
          "desc": "start after end means the loop never runs, sum stays 0",
          "teach": "When start is after end, the loop should never run at all -- if sum is not 0, your condition may be backwards."
        }
      ],
      "solution": "function sumRange(start, end) {\n  let sum = 0;\n  for (let i = start; i <= end; i++) {\n    sum += i;\n  }\n  return sum;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A <code>for</code> loop packs the three parts of a while loop -- start, condition, step -- into one line: <code>for (start; condition; step)</code>. It is the natural choice when you already know how many times to repeat something. This shape shows up in nearly every language that has loops at all.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let sum = 0;\nfor (let i = 1; i &lt;= 5; i++) {\n  sum += i;\n}\nconsole.log(sum); // 15</code></pre><p>The start runs once, before anything else. The condition is checked before every pass. The step runs after every pass's body finishes. Here, <code>sum</code> accumulates 1 + 2 + 3 + 4 + 5 = 15. <code>+=</code> is shorthand for <code>sum = sum + i</code>, a pattern you will use constantly.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Off-by-one errors sneak in through the condition -- using <code>&lt;</code> instead of <code>&lt;=</code> (or the reverse) silently excludes or includes one extra value:</p><pre><code>for (let i = 1; i &lt; 5; i++) { sum += i; } // only adds 1+2+3+4 -- misses 5!</code></pre><p>Always check your boundary condition against whether the end value itself should be included in the loop.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>sumRange</code> needs to walk every whole number in a given range and add each one into a running total, using a for loop you write yourself.</p><ol><li>Declare <code>sum = 0</code>.</li><li>Loop <code>i</code> from <code>start</code> to <code>end</code>, inclusive.</li><li>Add <code>i</code> to <code>sum</code> on every pass.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Where exactly does this loop stop?",
        "code": "let total = 0;\nfor (let i = 2; i < 5; i++) {\n  total += i;\n}\nconsole.log(total);",
        "choices": [
          "9",
          "14",
          "6"
        ],
        "answer": 0,
        "explain": "i < 5 stops before i reaches 5, so only 2, 3, and 4 get added: 9. 14 is what you would get if the condition were i <= 5 instead, including 5 as well."
      }
    },
    {
      "id": "act3-forof",
      "act": 3,
      "title": "The Path of Values",
      "concept": "for...of walks directly over the values in an array.",
      "prereq": [
        "act3-for"
      ],
      "xp": 30,
      "lesson": "<p><code>for...of</code> loops walk directly over the values in an array (or any iterable), with no counter or index bookkeeping required.</p><pre><code>const coins = [10, 20, 30];\nlet total = 0;\nfor (const coin of coins) {\n  total += coin;\n}\nconsole.log(total); // 60</code></pre><p>Compare that to a plain <code>for</code> loop, where you would need <code>coins[i]</code> to reach each value. <code>for...of</code> hands you the value directly on each pass, which reads more clearly and avoids off-by-one mistakes with the index. Use <code>const</code> for the loop variable when you are not reassigning it inside the loop, which is the common case.</p><p>An empty array is a perfectly normal input: the loop body simply never runs, and any accumulator you set up beforehand -- like <code>total</code> above -- keeps its starting value. That is not a bug, it is <code>for...of</code> behaving exactly as it should on zero items.</p>",
      "hints": [
        "Loop over coins with for...of and add each coin to a running total.",
        "You don't need coins[i] or an index variable at all -- for...of gives you the value directly.",
        "let total = 0; for (const coin of coins) { total += coin; } return total;"
      ],
      "starter": "function totalGold(coins) {\n  let total = 0;\n  // add up every coin using for...of\n\n  return total;\n}",
      "mode": "function",
      "entry": "totalGold",
      "tests": [
        {
          "args": [
            [
              10,
              20,
              30
            ]
          ],
          "expect": 60,
          "desc": "sums a list of coins",
          "teach": "If you got 0, make sure you are accumulating inside the loop body, not resetting total on every pass."
        },
        {
          "args": [
            []
          ],
          "expect": 0,
          "desc": "an empty pouch totals zero",
          "teach": "An empty array should leave total at its starting value -- the loop body simply never runs, which is expected."
        },
        {
          "args": [
            [
              5
            ]
          ],
          "expect": 5,
          "desc": "a single coin",
          "teach": "A single-element array should still add exactly once -- if you get 0, check the loop variable is being added to total."
        }
      ],
      "solution": "function totalGold(coins) {\n  let total = 0;\n  for (const coin of coins) {\n    total += coin;\n  }\n  return total;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>for...of</code> loops walk directly over the values in an array (or any iterable), with no counter or index bookkeeping required. You get each value handed to you directly, which reads more clearly than reaching into <code>coins[i]</code> every time. It is usually the first loop reached for once an array is already in hand.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const coins = [10, 20, 30];\nlet total = 0;\nfor (const coin of coins) {\n  total += coin;\n}\nconsole.log(total); // 60</code></pre><p>On each pass, <code>coin</code> is bound directly to the next value in the array -- 10, then 20, then 30 -- with no index ever appearing in the code. <code>total</code> accumulates all three into 60.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Confusing <code>for...of</code> with <code>for...in</code> is a very common mixup -- <code>for...in</code> iterates <em>keys</em>, not values, and on an array those keys are index strings:</p><pre><code>for (const coin in coins) { console.log(coin); } // logs '0', '1', '2' -- the INDEXES, as strings!</code></pre><p><code>for...of</code> gives you values; <code>for...in</code> gives you keys. On an array, that difference is easy to miss until the output looks nothing like what you expected.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>totalGold</code> needs to add up every coin in a pouch, using for...of instead of any index-based loop, so there is nothing left to track but the running total itself.</p><ol><li>Loop over <code>coins</code> with <code>for...of</code>.</li><li>Add each <code>coin</code> to <code>total</code>.</li><li>Return <code>total</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Watch closely -- this uses for...in, not for...of.",
        "code": "const nums = [5, 10];\nlet out = '';\nfor (const n in nums) {\n  out += n;\n}\nconsole.log(out);",
        "choices": [
          "01",
          "15",
          "510"
        ],
        "answer": 0,
        "explain": "for...in yields the array's keys, which for an array are the index strings '0' and '1' -- concatenated, that is \"01\". \"15\" is what for...of over the values would give if you added them; \"510\" concatenates the actual values instead of their indexes."
      }
    },
    {
      "id": "act3-breakcontinue",
      "act": 3,
      "title": "Break the Chain, Skip the Trap",
      "concept": "break exits a loop early; continue skips straight to the next iteration.",
      "prereq": [
        "act3-forof"
      ],
      "xp": 35,
      "lesson": "<p>Inside any loop, <code>break</code> exits the loop immediately, and <code>continue</code> skips straight to the next iteration without running the rest of the current one.</p><pre><code>for (const n of [-5, 3, 10, 20]) {\n  if (n &lt; 0) continue;  // skip negative numbers entirely\n  if (n &gt;= 8) {\n    console.log(n);       // 10\n    break;                 // stop looking once found\n  }\n}</code></pre><p><code>continue</code> is useful for filtering out cases you want to ignore without nesting your remaining logic in an <code>else</code> block. <code>break</code> is useful once you have found what you need and there is no reason to keep checking the rest -- it saves wasted work and clearly signals 'search complete'.</p><p>If a loop finishes normally without ever hitting <code>break</code> -- because nothing matched -- that is a real, expected outcome you need to handle, usually with a sentinel value like <code>-1</code> set before the loop and returned afterward if nothing was found.</p>",
      "hints": [
        "Set up a result variable (like -1) before the loop, in case nothing matches.",
        "Use continue to skip negative numbers, and break once you find a value >= minValue.",
        "for (const item of items) { if (item < 0) continue; if (item >= minValue) { found = item; break; } } return found;"
      ],
      "starter": "function findFirstTreasure(items, minValue) {\n  let found = -1;\n  // skip negative items, and stop at the first item >= minValue\n\n  return found;\n}",
      "mode": "function",
      "entry": "findFirstTreasure",
      "tests": [
        {
          "args": [
            [
              -5,
              3,
              10,
              20
            ],
            8
          ],
          "expect": 10,
          "desc": "skips the negative, then finds the first value at or above the threshold",
          "teach": "If you get 3, your >= check may be firing too early -- 3 is below minValue and should be skipped over, not returned."
        },
        {
          "args": [
            [
              1,
              2,
              3
            ],
            100
          ],
          "expect": -1,
          "desc": "nothing meets the threshold, so the loop completes without breaking",
          "teach": "When nothing meets the threshold, the loop should finish normally and found should stay at its initial -1."
        },
        {
          "args": [
            [
              -1,
              -2,
              50
            ],
            10
          ],
          "expect": 50,
          "desc": "skips two negatives before finding a match",
          "teach": "Make sure continue is skipping negative values specifically, not skipping everything or breaking too soon."
        }
      ],
      "solution": "function findFirstTreasure(items, minValue) {\n  let found = -1;\n  for (const item of items) {\n    if (item < 0) continue;\n    if (item >= minValue) {\n      found = item;\n      break;\n    }\n  }\n  return found;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Inside any loop, <code>break</code> exits the loop immediately, and <code>continue</code> skips straight to the next iteration without running the rest of the current one. <code>continue</code> is for filtering out cases you want to ignore; <code>break</code> is for stopping once you have found what you need.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>for (const n of [-5, 3, 10, 20]) {\n  if (n &lt; 0) continue;  // skip negative numbers entirely\n  if (n &gt;= 8) {\n    console.log(n);       // 10\n    break;                 // stop looking once found\n  }\n}</code></pre><p>-5 is skipped via <code>continue</code> before it can reach the second check. 3 does not meet the <code>&gt;= 8</code> test, so nothing happens and the loop moves on. 10 meets the test, logs, and <code>break</code> stops the loop entirely -- 20 is never even looked at.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A common wrong belief: \"continue exits the loop, just like break.\" It does not -- <code>continue</code> only skips the rest of the <em>current</em> pass, then the loop keeps going as normal:</p><pre><code>for (const n of [1, 2, 3]) {\n  if (n === 2) continue; // skips just this one pass\n  console.log(n); // logs 1, then 3 -- loop still continues after skipping 2\n}</code></pre>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>findFirstTreasure</code> needs to walk the list once, ignoring anything negative along the way, and stop the instant it spots something worth keeping.</p><ol><li>Set <code>found = -1</code> before the loop.</li><li>Skip negative items with <code>continue</code>.</li><li>Break once an item <code>&gt;= minValue</code> is found.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One of these two keywords stops the loop entirely -- which items make it into log?",
        "code": "let log = [];\nfor (const n of [1, 2, 3, 4]) {\n  if (n === 2) continue;\n  if (n === 3) break;\n  log.push(n);\n}\nconsole.log(log.length);",
        "choices": [
          "1",
          "3",
          "2"
        ],
        "answer": 0,
        "explain": "Only 1 gets pushed: 2 is skipped by continue and the loop keeps going, then 3 triggers break, which stops everything before 4 is ever reached. Picking 3 assumes continue also stops the loop; picking 2 assumes break lets one more pass slip through first."
      }
    },
    {
      "id": "act3-boss",
      "act": 3,
      "title": "Boss: Camp of Tallies",
      "concept": "Iterate and accumulate several counters in a single pass.",
      "prereq": [
        "act3-while",
        "act3-for",
        "act3-forof",
        "act3-breakcontinue"
      ],
      "xp": 50,
      "lesson": "<p>An expedition log is a stream of small events, and your job is to turn it into a tidy summary -- the essence of every loop you have learned so far in one task: iterate, check, and accumulate.</p><pre><code>const events = ['step', 'treasure', 'danger', 'step'];\nlet steps = 0;\nfor (const event of events) {\n  if (event === 'step') steps++;\n}\nconsole.log(steps); // 2</code></pre><p>Walk the events with <code>for...of</code>, and for each one use if/else if to decide which counter to increment. Any event string that does not match one of the known categories should simply be ignored -- not every entry needs to affect the tally, and that is fine.</p><p>Return the three counts together in one object, <code>{ steps, treasures, dangers }</code>. This is the shorthand property syntax: when a variable name matches the property name you want, you can write <code>{ steps }</code> instead of the more verbose <code>{ steps: steps }</code>.</p>",
      "hints": [
        "Declare three counters at 0, then loop the events with for...of.",
        "Use if/else if to match 'step', 'treasure', and 'danger' -- anything else falls through untouched.",
        "return { steps, treasures, dangers }; using the shorthand property syntax once your counters are done."
      ],
      "starter": "function summarizeJourney(events) {\n  let steps = 0;\n  let treasures = 0;\n  let dangers = 0;\n  // tally each kind of event\n\n  return { steps, treasures, dangers };\n}",
      "mode": "function",
      "entry": "summarizeJourney",
      "tests": [
        {
          "args": [
            [
              "step",
              "step",
              "treasure",
              "danger",
              "step"
            ]
          ],
          "expect": {
            "steps": 3,
            "treasures": 1,
            "dangers": 1
          },
          "desc": "a mixed journey log",
          "teach": "If a count seems off, double check you are using else if between the three checks, with exact (===) string comparisons."
        },
        {
          "args": [
            []
          ],
          "expect": {
            "steps": 0,
            "treasures": 0,
            "dangers": 0
          },
          "desc": "an empty log tallies all zeros",
          "teach": "An empty log should leave every counter at its starting value of 0 -- no special-casing needed."
        },
        {
          "args": [
            [
              "treasure",
              "treasure",
              "mystery"
            ]
          ],
          "expect": {
            "steps": 0,
            "treasures": 2,
            "dangers": 0
          },
          "desc": "unknown event types are simply ignored",
          "teach": "Unrecognized event strings should simply fall through untouched -- make sure you are not counting them under a catch-all else."
        }
      ],
      "solution": "function summarizeJourney(events) {\n  let steps = 0;\n  let treasures = 0;\n  let dangers = 0;\n  for (const event of events) {\n    if (event === 'step') {\n      steps++;\n    } else if (event === 'treasure') {\n      treasures++;\n    } else if (event === 'danger') {\n      dangers++;\n    }\n  }\n  return { steps, treasures, dangers };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>An expedition log is a stream of small events, and your job is to turn it into a tidy summary -- the essence of every loop you have learned so far in one task: iterate, check, and accumulate several counters at once.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const events = ['step', 'treasure', 'danger', 'step'];\nlet steps = 0;\nfor (const event of events) {\n  if (event === 'step') steps++;\n}\nconsole.log(steps); // 2</code></pre><p><code>for...of</code> visits each string in <code>events</code> in order. The <code>if</code> check matches \"step\" twice, incrementing <code>steps</code> both times; anything that does not match a known category is simply ignored by that counter.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>The object shorthand <code>{ steps, treasures, dangers }</code> can look unfamiliar at first. It is simply shorthand for <code>{ steps: steps, treasures: treasures, dangers: dangers }</code> -- valid only when the property name matches the variable name exactly. If they differ, you still need the full <code>key: value</code> form.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>summarizeJourney</code> needs to walk the whole events log exactly once, keeping three separate tallies as it goes.</p><ol><li>Declare three counters at 0: <code>steps</code>, <code>treasures</code>, <code>dangers</code>.</li><li>Loop <code>events</code> with <code>for...of</code>, using <code>if</code>/<code>else if</code> to match each string.</li><li>Return <code>{ steps, treasures, dangers }</code> using shorthand syntax.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "The shorthand below packs two variables into one object -- what actually ends up inside it?",
        "code": "let a = 1, b = 2;\nlet obj = { a, b };\nconsole.log(JSON.stringify(obj));",
        "choices": [
          "{\"a\":1,\"b\":2}",
          "{\"a\":\"a\",\"b\":\"b\"}",
          "{}"
        ],
        "answer": 0,
        "explain": "{ a, b } is shorthand for { a: a, b: b }, capturing the CURRENT VALUES of the variables -- 1 and 2. Picking the quoted-names version assumes shorthand stores the variable names as strings rather than their values."
      }
    },
    {
      "id": "act4-basics",
      "act": 4,
      "title": "The Shape of a Spell",
      "concept": "Function declarations take parameters and hand back a value with return.",
      "prereq": [
        "act3-boss"
      ],
      "xp": 25,
      "lesson": "<p>A <strong>function declaration</strong> packages up reusable logic under a name, accepts input through <strong>parameters</strong>, and hands back a single value with <code>return</code>.</p><pre><code>function computeDamage(base, multiplier) {\n  return base * multiplier;\n}\n\nconsole.log(computeDamage(10, 2)); // 20</code></pre><p>The moment <code>return</code> runs, the function stops immediately and hands that value back to whoever called it -- any code written after a <code>return</code> inside the same block never executes. A function with no <code>return</code> statement at all implicitly returns <code>undefined</code>, which is a common source of bugs when you forget to write it.</p><p>Parameters (<code>base</code> and <code>multiplier</code> above) are just local variables that get filled in with whatever <strong>arguments</strong> are passed at the call site. The names inside the function are entirely up to you -- they do not need to match the variable names used by the caller.</p>",
      "hints": [
        "Multiply the two parameters and return the result.",
        "return base * multiplier; -- that's the whole function body.",
        "function computeDamage(base, multiplier) { return base * multiplier; }"
      ],
      "starter": "function computeDamage(base, multiplier) {\n  // return base multiplied by multiplier\n\n}",
      "mode": "function",
      "entry": "computeDamage",
      "tests": [
        {
          "args": [
            10,
            2
          ],
          "expect": 20,
          "desc": "a basic multiplication",
          "teach": "If you got undefined, the function computed the value but never returned it -- check for a missing return statement."
        },
        {
          "args": [
            0,
            5
          ],
          "expect": 0,
          "desc": "zero base deals zero damage",
          "teach": "Zero times anything should stay zero -- if you get NaN or undefined, check both the multiplication and the return are present."
        },
        {
          "args": [
            7,
            1
          ],
          "expect": 7,
          "desc": "a multiplier of one leaves it unchanged",
          "teach": "Multiplying by 1 should leave the value unchanged -- this mostly checks that your return statement is there at all."
        }
      ],
      "solution": "function computeDamage(base, multiplier) {\n  return base * multiplier;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A <strong>function declaration</strong> packages up reusable logic under a name, accepts input through <strong>parameters</strong>, and hands back a single value with <code>return</code>. Once written, you can call it as many times as you need, with different inputs each time.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>function computeDamage(base, multiplier) {\n  return base * multiplier;\n}\n\nconsole.log(computeDamage(10, 2)); // 20</code></pre><p>Calling <code>computeDamage(10, 2)</code> binds <code>base = 10</code> and <code>multiplier = 2</code> inside the function. The moment <code>return</code> runs, the function exits immediately and hands <code>base * multiplier</code>, 20, back to whoever called it.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Forgetting the <code>return</code> statement is one of the most common bugs in all of JavaScript -- a function with no <code>return</code> implicitly gives back <code>undefined</code>, even if it computed something internally:</p><pre><code>function computeDamage(base, multiplier) {\n  base * multiplier; // computed but never returned!\n}\nconsole.log(computeDamage(10, 2)); // undefined</code></pre><p>Computing a value and returning it are two separate steps -- only <code>return</code> sends it back to the caller.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>computeDamage</code> is about as simple a function as you will ever write here, but it still needs both of its two pieces done correctly and in the right order, or the caller gets nothing useful back at all.</p><ol><li>Multiply <code>base</code> by <code>multiplier</code>.</li><li>Return the result.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Something important is missing from this function -- predict the result.",
        "code": "function addTen(n) {\n  n + 10;\n}\nconsole.log(addTen(5));",
        "choices": [
          "undefined",
          "15",
          "NaN"
        ],
        "answer": 0,
        "explain": "n + 10 is computed but never returned, so the function implicitly gives back undefined regardless of what it calculated internally. 15 is what you would get only if a return keyword were added in front."
      }
    },
    {
      "id": "act4-defaultparams",
      "act": 4,
      "title": "The Fallback Rune",
      "concept": "Default parameters supply a value when an argument is missing or undefined.",
      "prereq": [
        "act4-basics"
      ],
      "xp": 30,
      "lesson": "<p><strong>Default parameters</strong> let you give a parameter a fallback value that is used only when the caller leaves that argument out entirely (or passes <code>undefined</code> explicitly).</p><pre><code>function greetHero(name, title = 'Adventurer') {\n  return 'Hello, ' + title + ' ' + name + '!';\n}\n\nconsole.log(greetHero('Finn'));              // 'Hello, Adventurer Finn!'\nconsole.log(greetHero('Mira', 'Sorceress'));  // 'Hello, Sorceress Mira!'</code></pre><p>Here is the important, easy-to-miss detail: the default only kicks in for a <strong>missing</strong> or <code>undefined</code> argument. Any other value you actually pass in -- including <code>''</code>, <code>0</code>, or <code>false</code> -- is used exactly as given, even though those values are 'falsy'. Passing an empty string as the title, for example, does not trigger the 'Adventurer' fallback; it uses the empty string.</p><p>Default parameters keep call sites short for the common case, while still letting callers override the behavior whenever they need something different.</p>",
      "hints": [
        "Give title a default value of 'Adventurer' right in the parameter list.",
        "Build the string with the same shape every time: 'Hello, ' + title + ' ' + name + '!'.",
        "function greetHero(name, title = 'Adventurer') { return 'Hello, ' + title + ' ' + name + '!'; }"
      ],
      "starter": "function greetHero(name, title) {\n  // give title a default value of 'Adventurer' in the parameter list\n\n  return 'Hello, ' + title + ' ' + name + '!';\n}",
      "mode": "function",
      "entry": "greetHero",
      "tests": [
        {
          "args": [
            "Finn"
          ],
          "expect": "Hello, Adventurer Finn!",
          "desc": "no title given, so the default is used",
          "teach": "If you get \"Hello, undefined Finn!\", your default is not wired into the parameter list correctly."
        },
        {
          "args": [
            "Mira",
            "Sorceress"
          ],
          "expect": "Hello, Sorceress Mira!",
          "desc": "an explicit title overrides the default",
          "teach": "An explicitly passed title should always override the default -- if \"Adventurer\" still shows up, the default may be applied unconditionally."
        },
        {
          "args": [
            "Zed",
            ""
          ],
          "expect": "Hello,  Zed!",
          "desc": "an empty string is still a real value -- it does NOT trigger the default",
          "teach": "An empty string is a real, passed value -- it should NOT trigger the default. Seeing \"Adventurer\" here means you are treating '' as missing."
        }
      ],
      "solution": "function greetHero(name, title = 'Adventurer') {\n  return 'Hello, ' + title + ' ' + name + '!';\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><strong>Default parameters</strong> let you give a parameter a fallback value, used only when the caller leaves that argument out entirely, or passes <code>undefined</code> explicitly. Everything else you actually pass in is used exactly as given. It is one of the most common conveniences reached for once a function has more than one caller.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>function greetHero(name, title = 'Adventurer') {\n  return 'Hello, ' + title + ' ' + name + '!';\n}\n\nconsole.log(greetHero('Finn'));              // 'Hello, Adventurer Finn!'\nconsole.log(greetHero('Mira', 'Sorceress'));  // 'Hello, Sorceress Mira!'</code></pre><p>Calling with one argument leaves <code>title</code> undefined, so the default \"Adventurer\" kicks in. Calling with two arguments overrides that default entirely, using whatever was actually passed instead.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Defaults trigger only for a truly missing or <code>undefined</code> argument -- NOT for other falsy values like <code>''</code>, <code>0</code>, or <code>false</code>:</p><pre><code>console.log(greetHero('Zed', '')); // 'Hello,  Zed!' -- empty string is used as-is, default does NOT kick in</code></pre><p>This is a sharp corner: an intentional empty string is a real, passed value, not a missing one, even though it is falsy.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>greetHero</code> needs to work whether or not a title is supplied at all, falling back gracefully exactly once that argument is missing.</p><ol><li>Give <code>title</code> a default value of \"Adventurer\" in the parameter list.</li><li>Build the greeting string using <code>name</code> and <code>title</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One of these two calls skips the default -- which one, and why?",
        "code": "function tag(label = 'none') {\n  return label;\n}\nconsole.log(tag(0));\nconsole.log(tag());",
        "choices": [
          "0, none",
          "none, none",
          "0, 0"
        ],
        "answer": 0,
        "explain": "0 is a real, explicitly passed value, not undefined, so the default is skipped and tag(0) returns 0; calling with no argument leaves label undefined, so the default \"none\" applies. Picking \"none, none\" treats 0 as if it were a missing value, since it is falsy."
      }
    },
    {
      "id": "act4-arrow",
      "act": 4,
      "title": "The Quick Sigil",
      "concept": "Arrow functions are a shorter syntax, with an implicit return for expression bodies.",
      "prereq": [
        "act4-defaultparams"
      ],
      "xp": 30,
      "lesson": "<p><strong>Arrow functions</strong> are a shorter way to write a function, especially useful for small, one-off operations.</p><pre><code>const double = n =&gt; n * 2;\nconsole.log(double(4)); // 8</code></pre><p>With a single parameter you can drop the parentheses, and with a single expression body the <code>return</code> is implicit -- whatever that expression evaluates to is automatically returned, no braces or <code>return</code> keyword needed.</p><p>There is one sharp corner: if the implicit return should be an <strong>object literal</strong>, you must wrap it in parentheses, because <code>{ }</code> right after the arrow is otherwise read as the start of a function body, not an object.</p><pre><code>const makePotion = (name, power) =&gt; ({ name, power });\nconsole.log(makePotion('Ember Draught', 15));\n// { name: 'Ember Draught', power: 15 }</code></pre><p>Without those parentheses, <code>(name, power) =&gt; { name, power }</code> would be parsed as a function body containing a label and an unused expression -- a common and confusing mistake for newcomers to arrow functions.</p>",
      "hints": [
        "Write it as an arrow function with two parameters that returns an object literal.",
        "To implicitly return an object from an arrow function, wrap the { } in parentheses.",
        "const makePotion = (name, power) => ({ name, power });"
      ],
      "starter": "const makePotion = (name, power) => {\n  // return an object literal { name, power } -- remember the parentheses trick\n\n};",
      "mode": "function",
      "entry": "makePotion",
      "tests": [
        {
          "args": [
            "Ember Draught",
            15
          ],
          "expect": {
            "name": "Ember Draught",
            "power": 15
          },
          "desc": "builds a named potion object",
          "teach": "If you get undefined, wrap your returned object literal in parentheses: ({ name, power })."
        },
        {
          "args": [
            "Weak Brew",
            1
          ],
          "expect": {
            "name": "Weak Brew",
            "power": 1
          },
          "desc": "works for any name and power",
          "teach": "Check both properties are present in your returned object -- a missing one usually means a typo in the shorthand."
        },
        {
          "args": [
            "",
            0
          ],
          "expect": {
            "name": "",
            "power": 0
          },
          "desc": "handles empty and zero values without special-casing",
          "teach": "Empty string and 0 are valid values here, not missing ones -- they should appear in the object exactly as passed."
        }
      ],
      "solution": "const makePotion = (name, power) => ({ name: name, power: power });",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><strong>Arrow functions</strong> are a shorter way to write a function, especially useful for small, one-off operations. With a single parameter you can drop the parentheses, and with a single expression body the <code>return</code> is implicit -- whatever that expression evaluates to is automatically handed back.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const double = n =&gt; n * 2;\nconsole.log(double(4)); // 8</code></pre><p>There is one sharp corner: if the implicit return should be an <strong>object literal</strong>, you must wrap it in parentheses, because <code>{ }</code> right after the arrow is otherwise read as the start of a function body, not an object:</p><pre><code>const makePotion = (name, power) =&gt; ({ name, power });\nconsole.log(makePotion('Ember Draught', 15));\n// { name: 'Ember Draught', power: 15 }</code></pre>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Writing <code>(name, power) =&gt; { name, power }</code> WITHOUT the parentheses is not an error, but it silently does the wrong thing: JS reads the braces as a function body containing a harmless, unused expression, with no <code>return</code> at all.</p><pre><code>const bad = (name, power) =&gt; { name, power }; // parsed as a BLOCK, not an object -- returns undefined!\nconsole.log(bad('x', 1)); // undefined</code></pre><p>A bare <code>{</code> right after an arrow always means \"function body starts here\" -- to return an object literal directly, wrap it in parentheses.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>makePotion</code> is a perfect candidate for the short arrow syntax, as long as that one parenthesis trick from above is not forgotten.</p><ol><li>Write <code>makePotion</code> as an arrow function taking <code>name</code> and <code>power</code>.</li><li>Return the object literal <code>{ name, power }</code>, wrapped in parentheses.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "This arrow function is missing one crucial pair of parentheses -- predict the result.",
        "code": "const build = (x, y) => { x, y };\nconsole.log(build(1, 2));",
        "choices": [
          "undefined",
          "{ x: 1, y: 2 }",
          "1"
        ],
        "answer": 0,
        "explain": "Without parentheses, JS treats { x, y } as a function body containing the harmless expression \"x, y\" -- there is no return statement inside, so the function implicitly gives back undefined. \"{ x: 1, y: 2 }\" is what you would get only if the object were wrapped in parentheses: (x, y) => ({ x, y })."
      }
    },
    {
      "id": "act4-closures",
      "act": 4,
      "title": "The Memory of a Spell",
      "concept": "A closure is a function that remembers variables from its enclosing scope.",
      "prereq": [
        "act4-arrow"
      ],
      "xp": 35,
      "lesson": "<p>A <strong>closure</strong> is a function that remembers the variables from the scope it was created in, even after that outer scope has technically finished running elsewhere. In practice, closures let an inner function keep private state between calls.</p><pre><code>function makeCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\n\nconst tick = makeCounter();\nconsole.log(tick()); // 1\nconsole.log(tick()); // 2 -- count was remembered between calls!</code></pre><p>Notice that <code>count</code> is not a parameter and not reset each time <code>tick()</code> runs -- the inner function holds onto the exact same <code>count</code> variable from when <code>makeCounter</code> was called, and keeps mutating it. Each call to <code>makeCounter()</code> would create a brand-new, independent <code>count</code>.</p><p>Below, build a function where an inner <code>add</code> function closes over a <code>total</code> variable, called once per item in a list, accumulating a running sum across every call before the final total is returned.</p>",
      "hints": [
        "Declare a total variable outside an inner function, then have that inner function add to total and return it.",
        "The inner function 'closes over' total -- it can read and modify the variable from its enclosing sumWithCounter call.",
        "let total = 0; function add(n) { total += n; return total; } for (const step of steps) { add(step); } return total;"
      ],
      "starter": "function sumWithCounter(steps) {\n  let total = 0;\n  function add(n) {\n    // add n to the outer total\n\n  }\n  for (const step of steps) {\n    add(step);\n  }\n  return total;\n}",
      "mode": "function",
      "entry": "sumWithCounter",
      "tests": [
        {
          "args": [
            [
              1,
              2,
              3
            ]
          ],
          "expect": 6,
          "desc": "the closure accumulates across three calls",
          "teach": "If total stays 0, make sure add is actually mutating the outer total (total += n), not creating a local variable of its own."
        },
        {
          "args": [
            []
          ],
          "expect": 0,
          "desc": "no steps means the total stays at its initial value",
          "teach": "No steps means add never gets called -- total should simply remain at its initial value."
        },
        {
          "args": [
            [
              5,
              -2,
              10
            ]
          ],
          "expect": 13,
          "desc": "works with negative steps too",
          "teach": "Negative steps should subtract from the running total just like positive ones add to it -- check += is doing real arithmetic."
        }
      ],
      "solution": "function sumWithCounter(steps) {\n  let total = 0;\n  function add(n) {\n    total += n;\n    return total;\n  }\n  for (const step of steps) {\n    add(step);\n  }\n  return total;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A <strong>closure</strong> is a function that remembers the variables from the scope it was created in, even after that outer scope has technically finished running elsewhere. In practice, closures let an inner function keep private state between calls. It is the mechanism behind private counters, caches, and anything else that needs to remember something between calls.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>function makeCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\n\nconst tick = makeCounter();\nconsole.log(tick()); // 1\nconsole.log(tick()); // 2 -- count was remembered between calls!</code></pre><p><code>count</code> is not reset each time <code>tick()</code> runs -- the inner function reaches back into the exact same variable from <code>makeCounter</code>'s call, and mutates it, so the value persists between calls.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A closure remembers the variable from the specific call that created it -- not a single shared value across every call to the outer function:</p><pre><code>const tickA = makeCounter();\nconst tickB = makeCounter();\nconsole.log(tickA()); // 1\nconsole.log(tickB()); // 1 -- NOT 2! tickB has its own separate count</code></pre><p>Two calls to <code>makeCounter()</code> never share state -- each one creates a brand-new, independent <code>count</code>.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>sumWithCounter</code> needs an inner function that reaches out and mutates a variable declared one level up, across every call in the loop.</p><ol><li>Declare <code>total</code> outside the inner <code>add</code> function.</li><li>Inside <code>add</code>, add <code>n</code> to <code>total</code> and return it.</li><li>Call <code>add</code> once for every value in <code>steps</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Do a and b share one counter, or do they each get their own?",
        "code": "function makeAdder(start) {\n  let n = start;\n  return function() { n += 1; return n; };\n}\nconst a = makeAdder(10);\nconst b = makeAdder(100);\nconsole.log(a());\nconsole.log(b());",
        "choices": [
          "11, 101",
          "11, 111",
          "1, 1"
        ],
        "answer": 0,
        "explain": "makeAdder(10) and makeAdder(100) each create their own separate n, so a() bumps 10 to 11 and b() bumps 100 to 101, entirely independently. \"11, 111\" assumes b somehow starts from a's already-incremented value instead of its own fresh 100."
      }
    },
    {
      "id": "act4-boss",
      "act": 4,
      "title": "Boss: The Convergence",
      "concept": "Compose several small functions into one pipeline.",
      "prereq": [
        "act4-basics",
        "act4-defaultparams",
        "act4-arrow",
        "act4-closures"
      ],
      "xp": 55,
      "lesson": "<p>The real power of functions shows up when you <strong>compose</strong> them -- feed the output of one straight into the input of the next, building a small pipeline out of simple, single-purpose pieces.</p><pre><code>function addBonus(n) { return n + 10; }\nfunction applyPenalty(n) { return n - 3; }\n\nfunction processScore(n) {\n  return applyPenalty(addBonus(n));\n}\n\nconsole.log(processScore(5)); // (5 + 10) - 3 = 12</code></pre><p>Reading composed calls happens from the inside out: <code>applyPenalty(addBonus(n))</code> first runs <code>addBonus(n)</code>, and whatever it returns becomes the argument to <code>applyPenalty</code>. Each function stays small, focused, and easy to test on its own, while <code>processScore</code> just describes the order they run in.</p><p>Build <code>processHero</code> below by composing three small helpers -- <code>addBonus</code>, <code>applyPenalty</code>, and <code>applyMultiplier</code> -- applying the bonus first, then the penalty, then the multiplier, all to a starting <code>base</code> value.</p>",
      "hints": [
        "Write three tiny helper functions first: addBonus (+10), applyPenalty (-3), applyMultiplier (*2).",
        "Compose them from the inside out: multiplier(penalty(bonus(base))).",
        "function processHero(base) { return applyMultiplier(applyPenalty(addBonus(base))); }"
      ],
      "starter": "function addBonus(n) {\n  return n + 10;\n}\nfunction applyPenalty(n) {\n  return n - 3;\n}\nfunction applyMultiplier(n) {\n  return n * 2;\n}\nfunction processHero(base) {\n  // compose the three helpers above, in order: bonus, then penalty, then multiplier\n\n}",
      "mode": "function",
      "entry": "processHero",
      "tests": [
        {
          "args": [
            0
          ],
          "expect": 14,
          "desc": "(0 + 10 - 3) * 2 = 14",
          "teach": "Walk through the order carefully: addBonus first, then applyPenalty on that result, then applyMultiplier last."
        },
        {
          "args": [
            5
          ],
          "expect": 24,
          "desc": "(5 + 10 - 3) * 2 = 24",
          "teach": "If close but not exact, double check applyMultiplier is applied LAST, after the penalty, not before it."
        },
        {
          "args": [
            -10
          ],
          "expect": -6,
          "desc": "works with a negative starting base too",
          "teach": "Negative starting values should flow through the same three steps -- check for an assumption that base is always positive."
        }
      ],
      "solution": "function addBonus(n) {\n  return n + 10;\n}\nfunction applyPenalty(n) {\n  return n - 3;\n}\nfunction applyMultiplier(n) {\n  return n * 2;\n}\nfunction processHero(base) {\n  return applyMultiplier(applyPenalty(addBonus(base)));\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>The real power of functions shows up when you <strong>compose</strong> them -- feed the output of one straight into the input of the next, building a small pipeline out of simple, single-purpose pieces. Each function stays small and easy to test on its own.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>function addBonus(n) { return n + 10; }\nfunction applyPenalty(n) { return n - 3; }\n\nfunction processScore(n) {\n  return applyPenalty(addBonus(n));\n}\n\nconsole.log(processScore(5)); // (5 + 10) - 3 = 12</code></pre><p>Composed calls read from the inside out: <code>applyPenalty(addBonus(n))</code> first runs <code>addBonus(n)</code>, and whatever it returns becomes the argument to <code>applyPenalty</code>.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Misreading composed calls left-to-right instead of inside-out is a common trap. <code>applyPenalty(addBonus(n))</code> does NOT mean \"run applyPenalty, then addBonus\" -- the innermost call always evaluates first, and its result feeds outward, one layer at a time. Reading them correctly, from the inside out, is a skill worth building early.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>processHero</code> already has three small helpers written for you -- the only job left is calling them in exactly the right order.</p><ol><li>Call <code>addBonus</code> on <code>base</code>.</li><li>Feed that result into <code>applyPenalty</code>.</li><li>Feed that result into <code>applyMultiplier</code> and return it.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Which function actually runs first here?",
        "code": "function inc(n) { return n + 1; }\nfunction double(n) { return n * 2; }\nconsole.log(double(inc(3)));",
        "choices": [
          "8",
          "7",
          "4"
        ],
        "answer": 0,
        "explain": "inc(3) runs first, the innermost call, producing 4, and that 4 is what gets doubled to 8. Picking 7 assumes double runs first on 3 (giving 6) and then 1 gets added; picking 4 assumes only inc ever ran at all."
      }
    },
    {
      "id": "act5-create",
      "act": 5,
      "title": "Charting the Islands",
      "concept": "Create arrays, index into them, and read their length.",
      "prereq": [
        "act4-boss"
      ],
      "xp": 25,
      "lesson": "<p>Arrays store ordered lists of values. You create one with square brackets, reach an element with its numeric <strong>index</strong> starting at <code>0</code>, and check the count with <code>.length</code>.</p><pre><code>const items = ['sword', 'shield', 'potion'];\nconsole.log(items[0]);                // 'sword' -- the first element\nconsole.log(items.length);            // 3\nconsole.log(items[items.length - 1]); // 'potion' -- the last element</code></pre><p>Because indexes start at 0, the last element always sits at <code>length - 1</code>, not <code>length</code>. Reaching for an index that does not exist -- like <code>items[10]</code> on a 3-item array -- does not throw an error; it quietly returns <code>undefined</code>, so it is worth guarding against out-of-range access yourself when it matters.</p><p>Below, find the <strong>second-to-last</strong> element of an array using <code>.length</code> arithmetic, and handle the case where the array is too short to have one.</p>",
      "hints": [
        "The last element is arr[arr.length - 1], so the second-to-last is one index before that.",
        "Check arr.length first -- if there are fewer than 2 elements, there is no second-to-last one.",
        "if (arr.length < 2) return null; return arr[arr.length - 2];"
      ],
      "starter": "function secondToLast(arr) {\n  // return the second-to-last element, or null if there isn't one\n\n}",
      "mode": "function",
      "entry": "secondToLast",
      "tests": [
        {
          "args": [
            [
              1,
              2,
              3
            ]
          ],
          "expect": 2,
          "desc": "the middle element in a 3-item array",
          "teach": "Remember the second-to-last index is length - 2, not length - 1, which is the very last element."
        },
        {
          "args": [
            [
              10,
              20
            ]
          ],
          "expect": 10,
          "desc": "the first of exactly two elements",
          "teach": "With exactly two elements, the second-to-last is the first one -- if you get the second, check your index math."
        },
        {
          "args": [
            [
              5
            ]
          ],
          "expect": null,
          "desc": "too short to have a second-to-last element",
          "teach": "A one-element array has no second-to-last element at all -- make sure your length check catches this before indexing."
        }
      ],
      "solution": "function secondToLast(arr) {\n  if (arr.length < 2) {\n    return null;\n  }\n  return arr[arr.length - 2];\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Arrays store ordered lists of values. You create one with square brackets, reach an element with its numeric <strong>index</strong> starting at 0, and check the count with <code>.length</code>. This same length-minus-one arithmetic shows up constantly, anywhere you need to reach for the end of a list without a hardcoded number.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const items = ['sword', 'shield', 'potion'];\nconsole.log(items[0]);                // 'sword' -- the first element\nconsole.log(items.length);            // 3\nconsole.log(items[items.length - 1]); // 'potion' -- the last element</code></pre><p>Because indexes start at 0, the last element always sits at <code>length - 1</code>, not <code>length</code>. That formula works no matter how long the array is, without ever needing to know the specific index by name.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Reaching for an index that does not exist does not throw an error -- it quietly returns <code>undefined</code>:</p><pre><code>const items = ['a', 'b'];\nconsole.log(items[10]); // undefined -- no error at all</code></pre><p>Reading past the end of an array is silent, not a crash. You have to guard against it yourself, usually by checking <code>.length</code> first, whenever an out-of-range read would actually matter.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>secondToLast</code> needs to handle both the normal case and the edge case where the array is simply too short to have an answer at all.</p><ol><li>Check <code>arr.length</code> is at least 2.</li><li>If not, return <code>null</code>.</li><li>Otherwise return <code>arr[arr.length - 2]</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One of these two lines reads past the end of the array -- predict both results.",
        "code": "const arr = [1, 2, 3];\nconsole.log(arr[5]);\nconsole.log(arr.length);",
        "choices": [
          "undefined, 3",
          "error, 3",
          "undefined, 5"
        ],
        "answer": 0,
        "explain": "Reading index 5 on a 3-item array is out of range but does not throw -- it silently returns undefined; .length still correctly reports 3 regardless of what index you tried to read. \"error, 3\" assumes JS throws on out-of-range access, like some other languages do."
      }
    },
    {
      "id": "act5-stack",
      "act": 5,
      "title": "The Loading Dock",
      "concept": "push/pop add and remove from the end; unshift/shift add and remove from the front.",
      "prereq": [
        "act5-create"
      ],
      "xp": 35,
      "lesson": "<p>Arrays have four built-in methods for adding and removing at the ends: <code>push</code> (add to end), <code>pop</code> (remove from end), <code>unshift</code> (add to front), and <code>shift</code> (remove from front). All four <strong>mutate</strong> the original array in place.</p><pre><code>const items = ['sword'];\nitems.push('shield');        // ['sword', 'shield']\nitems.unshift('torch');      // ['torch', 'sword', 'shield']\nitems.pop();                  // removes 'shield' -&gt; ['torch', 'sword']\nconst first = items.shift(); // removes 'torch', first === 'torch'\nconsole.log(items);           // ['sword']</code></pre><p><code>pop</code> and <code>shift</code> both return the element they removed, which is often exactly what you want to capture, as shown with <code>first</code> above. Adding and removing from the <strong>front</strong> with <code>unshift</code>/<code>shift</code> is slower than the end with <code>push</code>/<code>pop</code> on large arrays, because every remaining element has to shift position -- worth knowing, though rarely a concern for small lists like an inventory.</p><p>Because these methods mutate their array, be careful when the same array is referenced elsewhere in your program -- the change is visible everywhere that reference is used.</p>",
      "hints": [
        "push a 'shield' to the end, then unshift a 'torch' to the front.",
        "pop the shield back off, then shift the torch off and keep what shift returns.",
        "items.push('shield'); items.unshift('torch'); items.pop(); const first = items.shift(); return { removed: first, remaining: items };"
      ],
      "starter": "function manageInventory(items) {\n  // push 'shield', unshift 'torch', pop it back off, then shift and capture the result\n\n  return { removed: null, remaining: items };\n}",
      "mode": "function",
      "entry": "manageInventory",
      "tests": [
        {
          "args": [
            [
              "sword",
              "potion"
            ]
          ],
          "expect": {
            "removed": "torch",
            "remaining": [
              "sword",
              "potion"
            ]
          },
          "desc": "adds and removes items ending back where it started",
          "teach": "Trace the four operations in order: push, unshift, pop, shift -- if remaining is wrong, one may be missing or reversed."
        },
        {
          "args": [
            []
          ],
          "expect": {
            "removed": "torch",
            "remaining": []
          },
          "desc": "works starting from an empty inventory",
          "teach": "Even starting empty, all four operations should still run in the same order and net out to the same final state."
        },
        {
          "args": [
            [
              "gem"
            ]
          ],
          "expect": {
            "removed": "torch",
            "remaining": [
              "gem"
            ]
          },
          "desc": "works with a single starting item",
          "teach": "If remaining still has an extra item, check that pop is actually removing the shield you pushed earlier."
        }
      ],
      "solution": "function manageInventory(items) {\n  items.push('shield');\n  items.unshift('torch');\n  items.pop();\n  const first = items.shift();\n  return { removed: first, remaining: items };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Arrays have four built-in methods for adding and removing at the ends: <code>push</code> (add to end), <code>pop</code> (remove from end), <code>unshift</code> (add to front), and <code>shift</code> (remove from front). All four <strong>mutate</strong> the original array in place. These four are worth memorizing early, since almost every array-building task leans on at least one of them.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const items = ['sword'];\nitems.push('shield');        // ['sword', 'shield']\nitems.unshift('torch');      // ['torch', 'sword', 'shield']\nitems.pop();                  // removes 'shield' -&gt; ['torch', 'sword']\nconst first = items.shift(); // removes 'torch', first === 'torch'\nconsole.log(items);           // ['sword']</code></pre><p><code>pop</code> and <code>shift</code> both return the element they removed, which is often exactly what you want to capture, as shown with <code>first</code> above.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>It is easy to forget that these methods mutate the array they are called on, and that arrays are shared by reference -- if the same array is referenced elsewhere in your program, the change is visible everywhere that reference is used, not just in the local variable you called the method on.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>manageInventory</code> chains all four end-methods together in one function, so trace through each mutation in order as you write it.</p><ol><li><code>push</code> \"shield\" onto <code>items</code>.</li><li><code>unshift</code> \"torch\" onto <code>items</code>.</li><li><code>pop</code> the shield back off.</li><li><code>shift</code> the torch off and capture what <code>shift</code> returns.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "pop() does two things at once -- predict both effects.",
        "code": "const list = [1, 2, 3];\nconst x = list.pop();\nconsole.log(x);\nconsole.log(JSON.stringify(list));",
        "choices": [
          "3, [1,2]",
          "3, [1,2,3]",
          "1, [2,3]"
        ],
        "answer": 0,
        "explain": "pop() removes and returns the LAST element (3), and list is mutated in place down to [1,2]. \"3, [1,2,3]\" assumes pop does not actually mutate the original array; \"1, [2,3]\" confuses pop (removes from the end) with shift (removes from the front)."
      }
    },
    {
      "id": "act5-search",
      "act": 5,
      "title": "The Search Among Shelves",
      "concept": "includes checks presence; indexOf reports position (or -1).",
      "prereq": [
        "act5-stack"
      ],
      "xp": 30,
      "lesson": "<p>Two methods answer 'is this in the array, and where': <code>.includes(value)</code> returns a plain boolean, and <code>.indexOf(value)</code> returns the numeric index of the first match, or <code>-1</code> if it is not present.</p><pre><code>const items = ['map', 'rope', 'torch'];\nconsole.log(items.includes('rope')); // true\nconsole.log(items.indexOf('rope'));  // 1\nconsole.log(items.indexOf('sword')); // -1, not found</code></pre><p>If there are duplicate values, <code>indexOf</code> always reports the position of the <strong>first</strong> match, scanning from the start of the array. Reach for <code>.includes()</code> when you only care whether something exists, since <code>=== -1</code> checks against <code>indexOf</code> are easy to misread; reach for <code>.indexOf()</code> when the position itself matters, for example to remove or replace that exact element later.</p><p>Below, combine both: confirm the item is present with <code>.includes()</code>, and only then report its position with <code>.indexOf()</code>, returning <code>-1</code> whenever it is missing.</p>",
      "hints": [
        "First check with .includes(target) -- if it's not there, return -1 immediately.",
        "If it is present, use .indexOf(target) to get its position.",
        "if (!items.includes(target)) return -1; return items.indexOf(target);"
      ],
      "starter": "function locateItem(items, target) {\n  // return -1 if target isn't present, otherwise its index\n\n}",
      "mode": "function",
      "entry": "locateItem",
      "tests": [
        {
          "args": [
            [
              "map",
              "rope",
              "torch"
            ],
            "rope"
          ],
          "expect": 1,
          "desc": "finds an item in the middle",
          "teach": "If you get -1 here, your includes() check may be failing even though the item is present -- check spelling exactly."
        },
        {
          "args": [
            [
              "map",
              "rope",
              "torch"
            ],
            "sword"
          ],
          "expect": -1,
          "desc": "an absent item returns -1",
          "teach": "An absent item should return -1 immediately, without ever calling indexOf."
        },
        {
          "args": [
            [
              "a",
              "a",
              "b"
            ],
            "a"
          ],
          "expect": 0,
          "desc": "duplicates report the first matching index",
          "teach": "Duplicates should report the FIRST matching index -- if you get a later one, check you are not searching from the wrong end."
        }
      ],
      "solution": "function locateItem(items, target) {\n  if (!items.includes(target)) {\n    return -1;\n  }\n  return items.indexOf(target);\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Two methods answer \"is this in the array, and where\": <code>.includes(value)</code> returns a plain boolean, and <code>.indexOf(value)</code> returns the numeric index of the first match, or <code>-1</code> if it is not present at all. Both are searches over ordinary values, no regular expressions required.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const items = ['map', 'rope', 'torch'];\nconsole.log(items.includes('rope')); // true\nconsole.log(items.indexOf('rope'));  // 1\nconsole.log(items.indexOf('sword')); // -1, not found</code></pre><p>Reach for <code>.includes()</code> when you only care whether something exists; reach for <code>.indexOf()</code> when the position itself matters, for example to remove that exact element later. Both methods scan from the front of the array, so the earliest match always wins whichever one you reach for.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Never treat <code>indexOf</code>'s result as a simple truthy/falsy check -- index 0 is a perfectly valid match, and it is falsy:</p><pre><code>if (items.indexOf('map')) { ... } // BUG: 'map' is at index 0, which is falsy, so this \"if\" never runs -- even though it WAS found!</code></pre><p>Always compare <code>indexOf</code>'s result to <code>-1</code> explicitly, never on truthiness alone.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>locateItem</code> should never call indexOf blindly -- check presence first with includes, and only then ask indexOf for the exact position, falling back to -1 when nothing is there.</p><ol><li>Check <code>items.includes(target)</code> first; if absent, return <code>-1</code>.</li><li>If present, return <code>items.indexOf(target)</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Something IS in this array -- but does the if branch know that?",
        "code": "const arr = ['a', 'b', 'c'];\nif (arr.indexOf('a')) {\n  console.log('found');\n} else {\n  console.log('not found');\n}",
        "choices": [
          "not found",
          "found",
          "0"
        ],
        "answer": 0,
        "explain": "'a' sits at index 0, and 0 is falsy in an if-check, so the else branch runs and logs \"not found\" -- even though 'a' really is present. This is exactly why indexOf's result should be compared to -1 explicitly, never tested directly."
      }
    },
    {
      "id": "act5-iterate",
      "act": 5,
      "title": "Building the Second Shore",
      "concept": "Loop over a source array and push transformed values into a new one.",
      "prereq": [
        "act5-search"
      ],
      "xp": 30,
      "lesson": "<p>A common pattern: start with an empty array, loop over some source data, and <code>.push()</code> a transformed value for each one. This is the manual version of what <code>.map()</code> will do for you automatically in Act 7 -- but it is important to understand it built by hand first.</p><pre><code>const numbers = [1, 2, 3];\nconst doubled = [];\nfor (const n of numbers) {\n  doubled.push(n * 2);\n}\nconsole.log(doubled); // [2, 4, 6]</code></pre><p>The key habit is to declare the new array <strong>before</strong> the loop starts, empty, and grow it one <code>.push()</code> at a time as you iterate -- never try to write directly into indexes of an array that has not been sized yet. The original <code>numbers</code> array is left completely untouched; <code>doubled</code> is an entirely new array.</p><p>This build-a-new-array-from-a-loop shape appears constantly, so getting comfortable with it now will make higher-order array methods feel like a natural shortcut rather than new magic later.</p>",
      "hints": [
        "Start with an empty result array before the loop.",
        "For each number in numbers, push its double onto result.",
        "const result = []; for (const n of numbers) { result.push(n * 2); } return result;"
      ],
      "starter": "function doubleAll(numbers) {\n  const result = [];\n  // push each number, doubled, into result\n\n  return result;\n}",
      "mode": "function",
      "entry": "doubleAll",
      "tests": [
        {
          "args": [
            [
              1,
              2,
              3
            ]
          ],
          "expect": [
            2,
            4,
            6
          ],
          "desc": "doubles each number in order",
          "teach": "If result stays empty, check you are pushing inside the loop body, not after it has finished."
        },
        {
          "args": [
            []
          ],
          "expect": [],
          "desc": "an empty input produces an empty output",
          "teach": "An empty input should produce an empty output -- the loop body just never runs, which is correct."
        },
        {
          "args": [
            [
              -5,
              0,
              5
            ]
          ],
          "expect": [
            -10,
            0,
            10
          ],
          "desc": "works with negative and zero values",
          "teach": "Zero and negative numbers should double the same way positive ones do -- check for an assumption that all numbers are positive."
        }
      ],
      "solution": "function doubleAll(numbers) {\n  const result = [];\n  for (const n of numbers) {\n    result.push(n * 2);\n  }\n  return result;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A common pattern: start with an empty array, loop over some source data, and <code>.push()</code> a transformed value for each one. This is the manual version of what <code>.map()</code> will do automatically in Act 7, so it pays to understand it built by hand first.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const numbers = [1, 2, 3];\nconst doubled = [];\nfor (const n of numbers) {\n  doubled.push(n * 2);\n}\nconsole.log(doubled); // [2, 4, 6]</code></pre><p>Declare the new array before the loop, empty, and grow it one <code>.push()</code> at a time as you iterate. The original <code>numbers</code> array is left completely untouched -- <code>doubled</code> is an entirely new array.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Writing directly into array indexes that have not been sized yet, like <code>doubled[i] = n * 2</code> without first pushing or initializing that slot, can work but is fragile and error-prone, compared to just using <code>.push()</code> and letting the array grow naturally.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>doubleAll</code> is the manual, by-hand version of a pattern you will automate later -- build a fresh array by pushing one transformed value per number.</p><ol><li>Start with an empty <code>result</code> array.</li><li>Loop over <code>numbers</code>.</li><li>Push each number's double onto <code>result</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Does building a new array touch the original at all?",
        "code": "const src = [1, 2, 3];\nconst out = [];\nfor (const n of src) {\n  out.push(n + 1);\n}\nconsole.log(JSON.stringify(out));\nconsole.log(JSON.stringify(src));",
        "choices": [
          "[2,3,4], [1,2,3]",
          "[2,3,4], [2,3,4]",
          "[1,2,3], [1,2,3]"
        ],
        "answer": 0,
        "explain": "out collects the transformed values while src is never touched at all -- the original array is left exactly as it started. Picking the second choice assumes push() on a brand-new array somehow also mutates the source it was built from."
      }
    },
    {
      "id": "act5-boss",
      "act": 5,
      "title": "Boss: The Archipelago Census",
      "concept": "Scan a dataset once to build several derived results at once.",
      "prereq": [
        "act5-create",
        "act5-stack",
        "act5-search",
        "act5-iterate"
      ],
      "xp": 55,
      "lesson": "<p>Real data rarely arrives in exactly the shape you need. Here you will scan a list of travelers, each an object with a <code>name</code> and amount of <code>gold</code>, and build a small report: which travelers qualify for an expedition, and the total gold carried by the whole group.</p><pre><code>const travelers = [\n  { name: 'Finn', gold: 15 },\n  { name: 'Mira', gold: 5 }\n];\n// qualified travelers have gold &gt;= 10\n// totalGold sums every traveler regardless of qualification</code></pre><p>Notice the two accumulators serve different rules: <code>totalGold</code> adds up <strong>every</strong> traveler unconditionally, while <code>qualified</code> only collects the <strong>names</strong> of travelers meeting the gold threshold. Do both inside the same single loop -- there is no need to iterate the list twice.</p><p>Return an object with both results together: <code>{ qualified, totalGold }</code>. This is exactly the shape of report-building you will do constantly in real applications -- one pass over raw data, several derived results collected along the way.</p>",
      "hints": [
        "Loop once over travelers with for...of, updating both an array and a running total inside it.",
        "Add every traveler's gold to totalGold unconditionally, but only push the name into qualified when gold >= 10.",
        "for (const t of travelers) { totalGold += t.gold; if (t.gold >= 10) qualified.push(t.name); } return { qualified, totalGold };"
      ],
      "starter": "function buildExpedition(travelers) {\n  const qualified = [];\n  let totalGold = 0;\n  // one pass: add to totalGold always, push the name into qualified when gold >= 10\n\n  return { qualified, totalGold };\n}",
      "mode": "function",
      "entry": "buildExpedition",
      "tests": [
        {
          "args": [
            [
              {
                "name": "Finn",
                "gold": 15
              },
              {
                "name": "Mira",
                "gold": 5
              },
              {
                "name": "Zed",
                "gold": 10
              }
            ]
          ],
          "expect": {
            "qualified": [
              "Finn",
              "Zed"
            ],
            "totalGold": 30
          },
          "desc": "mixed group, some qualify",
          "teach": "If totalGold looks right but qualified is missing a name, check your threshold is >= 10, not > 10."
        },
        {
          "args": [
            []
          ],
          "expect": {
            "qualified": [],
            "totalGold": 0
          },
          "desc": "no travelers at all",
          "teach": "No travelers at all should leave both accumulators at their starting values."
        },
        {
          "args": [
            [
              {
                "name": "Ana",
                "gold": 9
              }
            ]
          ],
          "expect": {
            "qualified": [],
            "totalGold": 9
          },
          "desc": "below-threshold traveler still counts toward the total, just not qualified",
          "teach": "A below-threshold traveler should still count toward totalGold -- only the qualified list should exclude them."
        }
      ],
      "solution": "function buildExpedition(travelers) {\n  const qualified = [];\n  let totalGold = 0;\n  for (const traveler of travelers) {\n    totalGold += traveler.gold;\n    if (traveler.gold >= 10) {\n      qualified.push(traveler.name);\n    }\n  }\n  return { qualified, totalGold };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Real data rarely arrives in exactly the shape you need. Here you will scan a list of travelers, each with a <code>name</code> and amount of <code>gold</code>, and build a small report: which travelers qualify for an expedition, and the total gold carried by the whole group.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const travelers = [\n  { name: 'Finn', gold: 15 },\n  { name: 'Mira', gold: 5 }\n];\n// qualified travelers have gold &gt;= 10\n// totalGold sums every traveler regardless of qualification</code></pre><p>Two accumulators serve different rules: <code>totalGold</code> adds up every traveler unconditionally, while <code>qualified</code> only collects the names of travelers meeting the gold threshold. Do both inside the same single loop -- there is no need to iterate the list twice.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A common instinct is to assume you need to loop the list twice, once per accumulator, whenever a function tracks more than one thing. That is wasteful and error-prone -- a single pass can update several accumulators together just fine, as long as each one has its own independent rule.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>buildExpedition</code> tracks two different rules on two different accumulators, so make sure each one only obeys its own condition.</p><ol><li>Loop <code>travelers</code> once with <code>for...of</code>.</li><li>Add every traveler's gold to <code>totalGold</code> unconditionally.</li><li>Push the name to <code>qualified</code> only when <code>gold &gt;= 10</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One accumulator counts everyone, the other is picky -- predict both results.",
        "code": "const people = [{ n: 'A', g: 12 }, { n: 'B', g: 3 }];\nlet total = 0;\nlet names = [];\nfor (const p of people) {\n  total += p.g;\n  if (p.g >= 10) names.push(p.n);\n}\nconsole.log(total);\nconsole.log(JSON.stringify(names));",
        "choices": [
          "15, [\"A\"]",
          "12, [\"A\"]",
          "15, [\"A\",\"B\"]"
        ],
        "answer": 0,
        "explain": "total adds every gold value unconditionally (12 + 3 = 15), while names only collects entries meeting the threshold, which is just A here. Picking the last choice assumes B qualified too, even though 3 is well under 10."
      }
    },
    {
      "id": "act6-literals",
      "act": 6,
      "title": "The First Chamber",
      "concept": "Object literals group named properties inside curly braces.",
      "prereq": [
        "act5-boss"
      ],
      "xp": 25,
      "lesson": "<p>An <strong>object literal</strong> groups related values together under named <strong>properties</strong>, written as <code>key: value</code> pairs inside curly braces.</p><pre><code>const relic = {\n  name: 'Amulet',\n  power: 7,\n  discovered: true\n};\nconsole.log(relic.name); // 'Amulet'</code></pre><p>You read (and write) a property with dot notation, <code>relic.name</code>, or with bracket notation, <code>relic['name']</code> -- bracket notation is required when the key is stored in a variable or contains characters that are not a valid identifier. Objects can mix any types of values: strings, numbers, booleans, arrays, even other objects or functions.</p><p>Below, build a function that takes a relic's name and power and returns a fresh object literal with those two properties plus a fixed <code>discovered: true</code> flag -- a simple factory that always shapes the data consistently.</p>",
      "hints": [
        "Return an object literal with three properties: name, power, and discovered.",
        "discovered should always be true -- it isn't a parameter, just a fixed value.",
        "return { name: name, power: power, discovered: true };"
      ],
      "starter": "function createRelic(name, power) {\n  // return { name, power, discovered: true }\n\n}",
      "mode": "function",
      "entry": "createRelic",
      "tests": [
        {
          "args": [
            "Amulet",
            7
          ],
          "expect": {
            "name": "Amulet",
            "power": 7,
            "discovered": true
          },
          "desc": "builds a basic relic",
          "teach": "Check all three properties are present -- a missing discovered: true is a common slip."
        },
        {
          "args": [
            "Ring",
            0
          ],
          "expect": {
            "name": "Ring",
            "power": 0,
            "discovered": true
          },
          "desc": "zero power is still a valid relic",
          "teach": "Zero is a valid power value -- make sure it is not accidentally replaced or skipped."
        },
        {
          "args": [
            "",
            100
          ],
          "expect": {
            "name": "",
            "power": 100,
            "discovered": true
          },
          "desc": "an empty name is handled without special-casing",
          "teach": "An empty name string is still a valid property value -- it should not be treated as missing."
        }
      ],
      "solution": "function createRelic(name, power) {\n  return { name: name, power: power, discovered: true };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>An <strong>object literal</strong> groups related values together under named <strong>properties</strong>, written as <code>key: value</code> pairs inside curly braces. Objects can mix any types of values -- strings, numbers, booleans, even arrays or other objects. Grouping related data this way is one of the most common shapes you will build in any real program.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const relic = {\n  name: 'Amulet',\n  power: 7,\n  discovered: true\n};\nconsole.log(relic.name); // 'Amulet'</code></pre><p>You read (and write) a property with dot notation, <code>relic.name</code>, or with bracket notation, <code>relic['name']</code>. Both reach the same value here; the difference between them matters once a key is stored in a variable, coming up next lesson.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Dot notation only ever reads a literal, hardcoded property name baked directly into your code -- it cannot look up a key stored in a variable. Trying to write <code>relic.someVariable</code> looks for an actual property literally named \"someVariable\", not whatever string that variable holds. Bracket notation is required whenever the key itself is dynamic.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>createRelic</code> is a small object factory -- every call should shape its result exactly the same way, no matter what is passed in.</p><ol><li>Return an object literal with three properties.</li><li><code>name</code> and <code>power</code> come from the parameters.</li><li><code>discovered</code> is always <code>true</code>, not a parameter.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One line reads through a variable key, the other reads a literal one -- predict both.",
        "code": "const item = { name: 'Ring', value: 10 };\nconst key = 'name';\nconsole.log(item[key]);\nconsole.log(item.key);",
        "choices": [
          "Ring, undefined",
          "Ring, Ring",
          "undefined, Ring"
        ],
        "answer": 0,
        "explain": "item[key] uses bracket notation to look up whatever string is stored in the key variable ('name'), giving \"Ring\"; item.key looks for a literal property named \"key\", which does not exist, so it is undefined. Picking \"Ring, Ring\" assumes dot notation also reads through a variable."
      }
    },
    {
      "id": "act6-methods",
      "act": 6,
      "title": "The Voice of This",
      "concept": "A method is a function stored as a property; this refers to the calling object.",
      "prereq": [
        "act6-literals"
      ],
      "xp": 30,
      "lesson": "<p>When a property's value is a function, it is called a <strong>method</strong>. Inside a method, the keyword <code>this</code> refers to the object the method was called on, letting it read that same object's other properties.</p><pre><code>const hero = {\n  name: 'Finn',\n  hp: 50,\n  describe: function() {\n    return this.name + ' has ' + this.hp + ' HP';\n  }\n};\nconsole.log(hero.describe()); // 'Finn has 50 HP'</code></pre><p><code>this</code> is not fixed to the object where the function was written -- it is determined by <strong>how the method is called</strong>. Calling it as <code>hero.describe()</code> makes <code>this</code> refer to <code>hero</code>. If you pulled the function out and called it alone, <code>this</code> would no longer point at <code>hero</code>, which is a common source of confusion. As long as you always call a method through its owning object, like <code>hero.describe()</code>, it behaves exactly as expected.</p><p>Build a <code>hero</code> object with <code>name</code>, <code>hp</code>, and a <code>describe</code> method using <code>this</code>, then call that method and return its result.</p>",
      "hints": [
        "Build an object with name, hp, and a describe method using the function keyword (not an arrow function, so 'this' works as expected).",
        "Inside describe, use this.name and this.hp to build the sentence.",
        "Call hero.describe() at the end and return what it gives back."
      ],
      "starter": "function createHero(name, hp) {\n  const hero = {\n    name: name,\n    hp: hp,\n    describe: function() {\n      // return a string using this.name and this.hp\n\n    }\n  };\n  return hero.describe();\n}",
      "mode": "function",
      "entry": "createHero",
      "tests": [
        {
          "args": [
            "Finn",
            50
          ],
          "expect": "Finn has 50 HP",
          "desc": "a typical hero",
          "teach": "If this.name comes back undefined, make sure you are calling hero.describe() through the object, not the function alone."
        },
        {
          "args": [
            "Mira",
            0
          ],
          "expect": "Mira has 0 HP",
          "desc": "zero hp is described the same way",
          "teach": "Zero hp should still print as 0, not be skipped -- check your string building includes it directly."
        },
        {
          "args": [
            "Zed",
            999
          ],
          "expect": "Zed has 999 HP",
          "desc": "works with large numbers too",
          "teach": "Large numbers should format the same way as small ones -- this mostly re-confirms this.hp is read correctly."
        }
      ],
      "solution": "function createHero(name, hp) {\n  const hero = {\n    name: name,\n    hp: hp,\n    describe: function() {\n      return this.name + ' has ' + this.hp + ' HP';\n    }\n  };\n  return hero.describe();\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>When a property's value is a function, it is called a <strong>method</strong>. Inside a method, the keyword <code>this</code> refers to the object the method was called on, letting it read that same object's other properties. Almost every real object you build from here on will lean on this pattern in some form.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const hero = {\n  name: 'Finn',\n  hp: 50,\n  describe: function() {\n    return this.name + ' has ' + this.hp + ' HP';\n  }\n};\nconsole.log(hero.describe()); // 'Finn has 50 HP'</code></pre><p>Calling it as <code>hero.describe()</code> makes <code>this</code> refer to <code>hero</code> specifically, so <code>this.name</code> and <code>this.hp</code> read <code>hero</code>'s own values without ever hardcoding them.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p><code>this</code> is determined by <strong>how the method is called</strong>, not where the function was written. Pull the method out and call it alone, and <code>this</code> no longer points at the original object:</p><pre><code>const loose = hero.describe;\nconsole.log(loose()); // this.name is undefined -- 'this' is no longer hero!</code></pre><p>Always call a method through its owning object, like <code>hero.describe()</code>, if you need <code>this</code> to behave as expected -- a bare function reference loses that connection entirely.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>createHero</code> builds a small object with its own method attached, then immediately calls that method the correct way, through the object itself.</p><ol><li>Build a <code>hero</code> object with <code>name</code>, <code>hp</code>, and a <code>describe</code> method using <code>this</code>.</li><li>Call <code>hero.describe()</code> and return the result.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "The same function is called two different ways -- does this behave the same both times?",
        "code": "const cat = { sound: 'meow', speak: function() { return this.sound; } };\nconst talk = cat.speak;\nconsole.log(cat.speak());\nconsole.log(typeof talk());",
        "choices": [
          "meow, undefined",
          "meow, meow",
          "undefined, undefined"
        ],
        "answer": 0,
        "explain": "cat.speak() calls the method through its owning object, so this is cat and it returns \"meow\"; talk() is the same function called bare, with no owning object, so this.sound is undefined and typeof undefined is the string \"undefined\". Picking \"meow, meow\" assumes the function remembers its original owner no matter how it is called."
      }
    },
    {
      "id": "act6-destructure",
      "act": 6,
      "title": "The Splitting Rune",
      "concept": "Destructuring pulls properties out of an object into local variables.",
      "prereq": [
        "act6-methods"
      ],
      "xp": 35,
      "lesson": "<p><strong>Destructuring</strong> pulls properties out of an object straight into local variables, which is especially handy right in a function's parameter list.</p><pre><code>function describeItem({ name, value, rarity = 'common' }) {\n  return name + ' (' + rarity + ', worth ' + value + ')';\n}\n\nconsole.log(describeItem({ name: 'Sword', value: 50, rarity: 'rare' }));\n// 'Sword (rare, worth 50)'</code></pre><p>Instead of writing <code>item.name</code>, <code>item.value</code>, and <code>item.rarity</code> throughout the function body, destructuring in the parameter list gives you <code>name</code>, <code>value</code>, and <code>rarity</code> directly as their own variables. You can also combine it with a default value, exactly like a regular parameter -- <code>rarity = 'common'</code> means that if the passed-in object has no <code>rarity</code> property at all (so it is <code>undefined</code>), <code>'common'</code> is used instead.</p><p>Destructuring works the same way outside of parameters too, as a standalone statement: <code>const { name, value } = item;</code>. It is one of the most-used pieces of modern JavaScript syntax for working with objects.</p>",
      "hints": [
        "Destructure name, value, and rarity right in the parameter list, giving rarity a default of 'common'.",
        "function describeItem({ name, value, rarity = 'common' }) { ... }",
        "return name + ' (' + rarity + ', worth ' + value + ')';"
      ],
      "starter": "function describeItem({ name, value, rarity }) {\n  // give rarity a default of 'common' in the destructuring above, then build the description\n\n}",
      "mode": "function",
      "entry": "describeItem",
      "tests": [
        {
          "args": [
            {
              "name": "Sword",
              "value": 50,
              "rarity": "rare"
            }
          ],
          "expect": "Sword (rare, worth 50)",
          "desc": "an item with an explicit rarity",
          "teach": "If value is missing from the output, check you destructured it alongside name and rarity."
        },
        {
          "args": [
            {
              "name": "Stick",
              "value": 1
            }
          ],
          "expect": "Stick (common, worth 1)",
          "desc": "a missing rarity falls back to the default",
          "teach": "A missing rarity key should fall back to \"common\" -- if it shows as undefined, your default is not wired into the destructuring."
        },
        {
          "args": [
            {
              "name": "Gem",
              "value": 200,
              "rarity": "epic"
            }
          ],
          "expect": "Gem (epic, worth 200)",
          "desc": "a different explicit rarity",
          "teach": "This just confirms an explicitly passed rarity always overrides the default, whatever its actual value is."
        }
      ],
      "solution": "function describeItem({ name, value, rarity = 'common' }) {\n  return name + ' (' + rarity + ', worth ' + value + ')';\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><strong>Destructuring</strong> pulls properties out of an object straight into local variables, which is especially handy right in a function's parameter list -- no more writing <code>item.name</code>, <code>item.value</code>, and <code>item.rarity</code> throughout the body. It shows up in almost every modern codebase, so getting comfortable reading it quickly pays off fast.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>function describeItem({ name, value, rarity = 'common' }) {\n  return name + ' (' + rarity + ', worth ' + value + ')';\n}\n\nconsole.log(describeItem({ name: 'Sword', value: 50, rarity: 'rare' }));\n// 'Sword (rare, worth 50)'</code></pre><p>Destructuring the parameter gives you <code>name</code>, <code>value</code>, and <code>rarity</code> directly as their own variables. It combines with a default, exactly like a regular parameter -- <code>rarity = 'common'</code> applies whenever the passed-in object has no <code>rarity</code> property at all.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Just like default parameters, a destructuring default applies only when the property is truly missing (or explicitly <code>undefined</code>) -- not whenever it is falsy. If <code>rarity</code> were explicitly passed as an empty string or <code>0</code>, the default would NOT kick in.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>describeItem</code> should read cleanly thanks to destructuring, with rarity quietly falling back to its default whenever a caller leaves it out.</p><ol><li>Destructure <code>name</code>, <code>value</code>, and <code>rarity</code> from the parameter object.</li><li>Default <code>rarity</code> to \"common\".</li><li>Build and return the description string.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One call omits a property, the other passes it as a falsy value -- do both trigger the default?",
        "code": "function show({ a, b = 5 }) {\n  return a + b;\n}\nconsole.log(show({ a: 1 }));\nconsole.log(show({ a: 1, b: 0 }));",
        "choices": [
          "6, 1",
          "6, 6",
          "1, 1"
        ],
        "answer": 0,
        "explain": "The first call has no b at all, so the default 5 applies (1 + 5 = 6); the second call explicitly passes b: 0, a real value, so the default is skipped entirely (1 + 0 = 1). Picking \"6, 6\" assumes 0 is treated as missing since it is falsy, the same misconception default parameters run into."
      }
    },
    {
      "id": "act6-keysvalues",
      "act": 6,
      "title": "The Ledger of Keys",
      "concept": "Object.keys/values/entries turn an object into arrays you can loop over.",
      "prereq": [
        "act6-destructure"
      ],
      "xp": 30,
      "lesson": "<p>Three built-in methods unlock the contents of any object as arrays: <code>Object.keys(obj)</code> gives you its property names, <code>Object.values(obj)</code> gives you the values, and <code>Object.entries(obj)</code> gives you <code>[key, value]</code> pairs for both at once.</p><pre><code>const stats = { str: 10, dex: 5, int: 8 };\nconsole.log(Object.keys(stats));   // ['str', 'dex', 'int']\nconsole.log(Object.values(stats)); // [10, 5, 8]\nconsole.log(Object.entries(stats));\n// [['str', 10], ['dex', 5], ['int', 8]]</code></pre><p>Because all three return plain arrays, you can loop over the result with <code>for...of</code> exactly like any other array -- this is how you process an object's contents without knowing its property names in advance. Summing every stat, for example, means looping <code>Object.values(stats)</code> and accumulating a total, without ever writing <code>stats.str</code> by name.</p><p>An object with no properties at all is a valid input: all three methods simply return an empty array, and any loop over that empty array does nothing, leaving your accumulator at its starting value.</p>",
      "hints": [
        "Use Object.values(stats) to get an array of just the numbers, ignoring the key names.",
        "Loop over that array with for...of, adding each value to a running total.",
        "let total = 0; for (const value of Object.values(stats)) { total += value; } return total;"
      ],
      "starter": "function totalStats(stats) {\n  let total = 0;\n  // add up every value in the stats object, whatever its keys are\n\n  return total;\n}",
      "mode": "function",
      "entry": "totalStats",
      "tests": [
        {
          "args": [
            {
              "str": 10,
              "dex": 5,
              "int": 8
            }
          ],
          "expect": 23,
          "desc": "sums three arbitrary stats",
          "teach": "If total is 0, check you are looping Object.values(stats), not the stats object itself."
        },
        {
          "args": [
            {}
          ],
          "expect": 0,
          "desc": "an object with no stats totals zero",
          "teach": "An object with no properties should leave total at its starting value -- Object.values on it returns an empty array."
        },
        {
          "args": [
            {
              "hp": 100
            }
          ],
          "expect": 100,
          "desc": "works with just a single stat",
          "teach": "A single-property object should still work exactly the same way as a multi-property one."
        }
      ],
      "solution": "function totalStats(stats) {\n  let total = 0;\n  for (const value of Object.values(stats)) {\n    total += value;\n  }\n  return total;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Three built-in methods unlock the contents of any object as arrays: <code>Object.keys(obj)</code> gives you its property names, <code>Object.values(obj)</code> gives you the values, and <code>Object.entries(obj)</code> gives you <code>[key, value]</code> pairs for both at once. Reaching for the right one of the three depends entirely on whether you need names, values, or both together.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const stats = { str: 10, dex: 5, int: 8 };\nconsole.log(Object.keys(stats));   // ['str', 'dex', 'int']\nconsole.log(Object.values(stats)); // [10, 5, 8]\nconsole.log(Object.entries(stats));\n// [['str', 10], ['dex', 5], ['int', 8]]</code></pre><p>Because all three return plain arrays, you can loop over the result with <code>for...of</code> exactly like any other array -- this is how you process an object's contents without knowing its property names in advance.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A common instinct is to assume you must know an object's specific keys ahead of time to work with it. <code>Object.values()</code> (or <code>entries</code>) removes that need entirely -- you can sum, filter, or transform an object's contents without ever hardcoding a single property name.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>totalStats</code> has to work no matter what the stat names actually are, which is exactly the problem <code>Object.values</code> was built to solve.</p><ol><li>Get <code>Object.values(stats)</code>.</li><li>Loop over that array with <code>for...of</code>.</li><li>Add each value to a running <code>total</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Predict what both counts come out to.",
        "code": "const obj = { x: 1, y: 2, z: 3 };\nconsole.log(Object.keys(obj).length);\nconsole.log(Object.values(obj).length);",
        "choices": [
          "3, 3",
          "3, 6",
          "2, 3"
        ],
        "answer": 0,
        "explain": "Object.keys and Object.values both return one array entry per property, so both lengths equal the number of properties, 3, regardless of what the actual values are. Picking \"3, 6\" assumes .values() somehow sums the numbers instead of just listing them."
      }
    },
    {
      "id": "act6-boss",
      "act": 6,
      "title": "Boss: The Sanctum Ledger",
      "concept": "Build an object dynamically with bracket notation, then summarize it.",
      "prereq": [
        "act6-literals",
        "act6-methods",
        "act6-destructure",
        "act6-keysvalues"
      ],
      "xp": 55,
      "lesson": "<p>Time to model a real inventory ledger. Given a list of items, each with a <code>name</code>, <code>qty</code>, and <code>price</code>, build an object where every item's name becomes a key, mapped to its line total (<code>qty * price</code>) -- then sum every line into a grand total.</p><pre><code>const ledger = {};\nledger['Potion'] = 3 * 5; // bracket notation lets you use a variable as the key\nconsole.log(ledger); // { Potion: 15 }</code></pre><p>Bracket notation, <code>ledger[item.name] = ...</code>, is essential here -- you cannot use dot notation to assign a property whose name only exists inside a variable at runtime; <code>ledger.item.name</code> would try to read a literal property called <code>item</code>, which is not what you want at all.</p><p>Build the ledger with one loop over the items, then reuse what you learned last quest -- <code>Object.values()</code> plus a second loop -- to sum every line total in the ledger into a <code>grandTotal</code>. Return both together as <code>{ ledger, grandTotal }</code>.</p>",
      "hints": [
        "First loop: for each item, set ledger[item.name] = item.qty * item.price using bracket notation.",
        "Second loop: use Object.values(ledger) to add up every line total into grandTotal.",
        "for (const item of items) { ledger[item.name] = item.qty * item.price; } for (const value of Object.values(ledger)) { grandTotal += value; }"
      ],
      "starter": "function buildLedger(items) {\n  const ledger = {};\n  // fill ledger[item.name] = item.qty * item.price for every item\n\n  let grandTotal = 0;\n  // sum every value in ledger into grandTotal\n\n  return { ledger, grandTotal };\n}",
      "mode": "function",
      "entry": "buildLedger",
      "tests": [
        {
          "args": [
            [
              {
                "name": "Potion",
                "qty": 3,
                "price": 5
              },
              {
                "name": "Shield",
                "qty": 1,
                "price": 20
              }
            ]
          ],
          "expect": {
            "ledger": {
              "Potion": 15,
              "Shield": 20
            },
            "grandTotal": 35
          },
          "desc": "two distinct items",
          "teach": "If a key is wrong, make sure you used bracket notation, ledger[item.name], not ledger.item.name."
        },
        {
          "args": [
            []
          ],
          "expect": {
            "ledger": {},
            "grandTotal": 0
          },
          "desc": "an empty item list",
          "teach": "An empty item list should leave both the ledger and grandTotal at their starting, empty state."
        },
        {
          "args": [
            [
              {
                "name": "Gem",
                "qty": 2,
                "price": 50
              }
            ]
          ],
          "expect": {
            "ledger": {
              "Gem": 100
            },
            "grandTotal": 100
          },
          "desc": "a single item",
          "teach": "This confirms grandTotal correctly sums even when there is only one line in the ledger."
        }
      ],
      "solution": "function buildLedger(items) {\n  const ledger = {};\n  for (const item of items) {\n    ledger[item.name] = item.qty * item.price;\n  }\n  let grandTotal = 0;\n  for (const value of Object.values(ledger)) {\n    grandTotal += value;\n  }\n  return { ledger, grandTotal };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Time to model a real inventory ledger. Given a list of items, each with a <code>name</code>, <code>qty</code>, and <code>price</code>, build an object where every item's name becomes a key mapped to its line total (<code>qty * price</code>), then sum every line into a grand total.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const ledger = {};\nledger['Potion'] = 3 * 5; // bracket notation lets you use a variable as the key\nconsole.log(ledger); // { Potion: 15 }</code></pre><p>Bracket notation, <code>ledger[item.name] = ...</code>, is essential here -- you cannot use dot notation to assign a property whose name only exists inside a variable at runtime.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Writing <code>ledger.item.name = ...</code> instead of <code>ledger[item.name] = ...</code> is a natural-looking but wrong instinct. Dot notation would look for a literal property called <code>item</code>, then a property called <code>name</code> on that -- nothing like the intended dynamic key. Dot notation keys are always literal text baked into your code; bracket notation keys can be any expression.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>buildLedger</code> runs two separate loops back to back -- one to fill the ledger, one to total it up afterward.</p><ol><li>Loop <code>items</code>, setting <code>ledger[item.name] = item.qty * item.price</code>.</li><li>Loop <code>Object.values(ledger)</code> to sum into <code>grandTotal</code>.</li><li>Return <code>{ ledger, grandTotal }</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "A dynamic key is being written here -- does the property named \"key\" also get set?",
        "code": "const store = {};\nconst key = 'Gem';\nstore[key] = 100;\nconsole.log(JSON.stringify(store));\nconsole.log(store.key);",
        "choices": [
          "{\"Gem\":100}, undefined",
          "{\"key\":100}, undefined",
          "{\"Gem\":100}, 100"
        ],
        "answer": 0,
        "explain": "store[key] uses bracket notation to write to the property named by whatever key holds ('Gem'), while store.key looks for a LITERAL property called \"key\", which was never set -- so it is undefined. Picking the second choice assumes bracket notation stores the variable's name instead of its value as the key."
      }
    },
    {
      "id": "act7-callbacks",
      "act": 7,
      "title": "The Spell Passed Along",
      "concept": "A callback is a function handed to another function, to be called at the right moment.",
      "prereq": [
        "act6-boss"
      ],
      "xp": 30,
      "lesson": "<p>A <strong>callback</strong> is a function you hand to another function, to be called at the right moment. Array's <code>.forEach()</code> is the simplest built-in example: give it a callback, and it invokes that callback once for every element.</p><pre><code>const numbers = [1, 2, 3];\nlet total = 0;\nnumbers.forEach(function(n) {\n  total += n;\n});\nconsole.log(total); // 6</code></pre><p><code>forEach</code> calls your callback with each element in turn (and, optionally, its index and the whole array too, though most uses only need the element). Unlike a <code>for...of</code> loop, you cannot <code>break</code> out of a <code>forEach</code> early -- it always runs through every element. If you need early exit, a regular loop is the better tool.</p><p>The callback function above closes over <code>total</code>, the same way you saw with closures in Act 4 -- that is exactly why it can add to a variable declared outside itself. Passing functions around like this, as arguments to other functions, is the foundation for <code>map</code>, <code>filter</code>, and <code>reduce</code>, which you will meet next.</p>",
      "hints": [
        "Use numbers.forEach() with a callback function that adds each n to a running total.",
        "Declare 'total' outside the forEach call so the callback can close over it and modify it.",
        "let total = 0; numbers.forEach(function(n) { total += n; }); return total;"
      ],
      "starter": "function totalWithLogging(numbers) {\n  let total = 0;\n  // use numbers.forEach with a callback that adds each number to total\n\n  return total;\n}",
      "mode": "function",
      "entry": "totalWithLogging",
      "tests": [
        {
          "args": [
            [
              1,
              2,
              3
            ]
          ],
          "expect": 6,
          "desc": "sums using forEach's callback",
          "teach": "If total is 0, make sure the callback actually adds to the OUTER total variable, not a fresh local one."
        },
        {
          "args": [
            []
          ],
          "expect": 0,
          "desc": "an empty array runs the callback zero times",
          "teach": "An empty array runs the callback zero times -- total should simply stay at its initial value."
        },
        {
          "args": [
            [
              10,
              -5,
              5
            ]
          ],
          "expect": 10,
          "desc": "works with negative numbers",
          "teach": "Negative numbers should subtract from the total the same way positives add -- check += is working as expected."
        }
      ],
      "solution": "function totalWithLogging(numbers) {\n  let total = 0;\n  numbers.forEach(function(n) {\n    total += n;\n  });\n  return total;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A <strong>callback</strong> is a function you hand to another function, to be called at the right moment. Array's <code>.forEach()</code> is the simplest built-in example: give it a callback, and it invokes that callback once for every element. forEach is usually the very first higher-order method most people reach for.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const numbers = [1, 2, 3];\nlet total = 0;\nnumbers.forEach(function(n) {\n  total += n;\n});\nconsole.log(total); // 6</code></pre><p><code>forEach</code> calls your callback with each element in turn. The callback closes over <code>total</code>, exactly like the closures from Act 4, which is exactly why it can add to a variable declared outside itself.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Unlike a <code>for...of</code> loop, you cannot <code>break</code> out of a <code>forEach</code> early -- writing <code>break</code> inside a forEach callback is actually a SyntaxError. <code>forEach</code> always runs through every single element, no matter what. If early exit matters, reach for a regular loop instead.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>totalWithLogging</code> should look almost identical to a plain for...of loop, just with the iteration itself handed off to forEach instead, and the accumulator closed over from outside.</p><ol><li>Call <code>numbers.forEach</code> with a callback function.</li><li>Inside the callback, add <code>n</code> to the outer <code>total</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "A return inside forEach's callback is not the same as break -- predict the total.",
        "code": "let sum = 0;\n[1, 2, 3].forEach(function(n) {\n  if (n === 2) return;\n  sum += n;\n});\nconsole.log(sum);",
        "choices": [
          "4",
          "1",
          "6"
        ],
        "answer": 0,
        "explain": "return inside a forEach callback only skips the rest of THAT one call, like continue in a regular loop -- it does not stop forEach from processing 3 next. So 1 and 3 get added: 4. Picking 1 assumes return halts the whole forEach, the way break would in a regular loop."
      }
    },
    {
      "id": "act7-map",
      "act": 7,
      "title": "The Reshaping Glass",
      "concept": "map transforms every element into a new array of the same length.",
      "prereq": [
        "act7-callbacks"
      ],
      "xp": 30,
      "lesson": "<p><code>.map(callback)</code> builds a <strong>brand-new array</strong> by transforming every element with the given callback -- whatever the callback returns for an element becomes that element's replacement in the new array, in the exact same order.</p><pre><code>const heroes = [{ name: 'Finn' }, { name: 'Mira' }];\nconst names = heroes.map(function(h) {\n  return h.name;\n});\nconsole.log(names); // ['Finn', 'Mira']</code></pre><p>This is precisely the manual loop-and-push pattern from Act 5, done in one call: <code>map</code> always produces an array of the <strong>same length</strong> as the original, one output for every input, and it never modifies the original array. If you find yourself writing <code>const result = []; for (...) { result.push(transform(x)); }</code>, that is almost always a signal to reach for <code>.map()</code> instead.</p><p>Below, extract just the <code>name</code> from every hero object in an array, returning a plain array of strings.</p>",
      "hints": [
        "Use heroes.map() with a callback that returns just h.name for each hero.",
        "return heroes.map(function(h) { return h.name; });",
        "There's no loop needed at all -- map handles the iteration and the new array for you."
      ],
      "starter": "function namesOnly(heroes) {\n  // return an array of just the names, using .map()\n\n}",
      "mode": "function",
      "entry": "namesOnly",
      "tests": [
        {
          "args": [
            [
              {
                "name": "Finn",
                "hp": 10
              },
              {
                "name": "Mira",
                "hp": 20
              }
            ]
          ],
          "expect": [
            "Finn",
            "Mira"
          ],
          "desc": "extracts names from a list of heroes",
          "teach": "If you get an array of undefined, check your callback has an explicit return statement, not just a bare expression."
        },
        {
          "args": [
            []
          ],
          "expect": [],
          "desc": "an empty list maps to an empty list",
          "teach": "An empty input maps to an empty output -- no transform is ever applied."
        },
        {
          "args": [
            [
              {
                "name": "Zed",
                "hp": 5
              }
            ]
          ],
          "expect": [
            "Zed"
          ],
          "desc": "works with a single hero",
          "teach": "map should still return a same-length array here, with just the single name extracted."
        }
      ],
      "solution": "function namesOnly(heroes) {\n  return heroes.map(function(h) {\n    return h.name;\n  });\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>.map(callback)</code> builds a <strong>brand-new array</strong> by transforming every element with the given callback. Whatever the callback returns for an element becomes that element's replacement in the new array, in the exact same order. Once this feels natural, reaching for map will replace most manual loop-and-push code you would otherwise write.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const heroes = [{ name: 'Finn' }, { name: 'Mira' }];\nconst names = heroes.map(function(h) {\n  return h.name;\n});\nconsole.log(names); // ['Finn', 'Mira']</code></pre><p>This is precisely the manual loop-and-push pattern from Act 5, done in one call: <code>map</code> always produces an array of the <strong>same length</strong> as the original, and it never modifies the original array.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Forgetting the <code>return</code> inside the map callback is a classic mistake -- if the callback does not return anything, every slot in the new array becomes <code>undefined</code>, since map always uses the callback's return value, not whatever else happens inside it.</p><pre><code>const bad = heroes.map(function(h) { h.name; }); // no return!\nconsole.log(bad); // [undefined, undefined]</code></pre>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>namesOnly</code> should need no loop at all -- map already handles walking the array, you only need to describe what each element should become, one hero at a time.</p><ol><li>Call <code>heroes.map</code> with a callback.</li><li>Return <code>h.name</code> from inside the callback for each hero.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One important keyword is missing from the callback below -- predict the array it produces.",
        "code": "const nums = [1, 2, 3];\nconst out = nums.map(function(n) { n * 10; });\nconsole.log(JSON.stringify(out));",
        "choices": [
          "[null,null,null]",
          "[10,20,30]",
          "[1,2,3]"
        ],
        "answer": 0,
        "explain": "The callback never returns anything, so map fills every slot with undefined -- and JSON.stringify turns undefined array elements into null, giving [null,null,null]. Picking [10,20,30] assumes the callback's return is optional and map uses the computed value anyway."
      }
    },
    {
      "id": "act7-filter",
      "act": 7,
      "title": "The Sifting Gate",
      "concept": "filter keeps only the elements for which the callback returns true.",
      "prereq": [
        "act7-map"
      ],
      "xp": 30,
      "lesson": "<p><code>.filter(callback)</code> builds a new array containing only the elements for which the callback returns a <strong>truthy</strong> value -- every element is tested, and only the ones that pass make it into the result.</p><pre><code>const heroes = [\n  { name: 'A', hp: 10 },\n  { name: 'B', hp: 0 },\n  { name: 'C', hp: 5 }\n];\nconst alive = heroes.filter(function(h) {\n  return h.hp &gt; 0;\n});\nconsole.log(alive); // [{ name: 'A', hp: 10 }, { name: 'C', hp: 5 }]</code></pre><p>Unlike <code>.map()</code>, the result of <code>.filter()</code> can be shorter than the original -- or even empty, if nothing passes the test -- because elements that fail the callback are simply left out entirely, not replaced with anything. The original array is untouched either way.</p><p>Below, keep only the heroes whose <code>hp</code> is greater than zero, using <code>.filter()</code> rather than a manual loop.</p>",
      "hints": [
        "Use heroes.filter() with a callback that returns h.hp > 0.",
        "return heroes.filter(function(h) { return h.hp > 0; });",
        "filter keeps elements where the callback is true and drops the rest -- no manual loop or pushing required."
      ],
      "starter": "function aliveHeroes(heroes) {\n  // return only the heroes with hp > 0, using .filter()\n\n}",
      "mode": "function",
      "entry": "aliveHeroes",
      "tests": [
        {
          "args": [
            [
              {
                "name": "A",
                "hp": 10
              },
              {
                "name": "B",
                "hp": 0
              },
              {
                "name": "C",
                "hp": 5
              }
            ]
          ],
          "expect": [
            {
              "name": "A",
              "hp": 10
            },
            {
              "name": "C",
              "hp": 5
            }
          ],
          "desc": "keeps only heroes with positive hp",
          "teach": "If a fallen hero (hp 0) still shows up, check your comparison is hp > 0, not something like hp >= 0."
        },
        {
          "args": [
            []
          ],
          "expect": [],
          "desc": "an empty list filters to an empty list",
          "teach": "An empty list filters to an empty list -- there is nothing to test."
        },
        {
          "args": [
            [
              {
                "name": "D",
                "hp": 0
              }
            ]
          ],
          "expect": [],
          "desc": "a single fallen hero filters out to nothing",
          "teach": "A single hero with hp 0 should filter out to an empty array, not be kept by mistake."
        }
      ],
      "solution": "function aliveHeroes(heroes) {\n  return heroes.filter(function(h) {\n    return h.hp > 0;\n  });\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>.filter(callback)</code> builds a new array containing only the elements for which the callback returns a <strong>truthy</strong> value -- every element is tested, and only the ones that pass make it into the result. Reaching for it instead of a manual loop-and-if usually makes the intent of the code much clearer at a glance.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const heroes = [\n  { name: 'A', hp: 10 },\n  { name: 'B', hp: 0 },\n  { name: 'C', hp: 5 }\n];\nconst alive = heroes.filter(function(h) {\n  return h.hp &gt; 0;\n});\nconsole.log(alive); // [{ name: 'A', hp: 10 }, { name: 'C', hp: 5 }]</code></pre><p>B fails the test (hp is 0, not greater than 0) and is left out entirely, not replaced with anything, unlike map. The original array is untouched either way.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>It is easy to confuse <code>filter</code> with <code>map</code>. <code>filter</code> never transforms the surviving elements -- it only decides keep-or-drop based on whether the callback's return is truthy or falsy. The actual VALUE the callback returns is never used to replace anything, only checked for truthiness.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>aliveHeroes</code> should need no loop and no pushing at all -- filter already handles keeping or dropping each hero, you only need to describe the rule it should apply.</p><ol><li>Call <code>heroes.filter</code> with a callback.</li><li>Return <code>h.hp &gt; 0</code> from the callback.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "The callback here returns a number, not a boolean -- does that break filter?",
        "code": "const nums = [1, 2, 3, 4];\nconst out = nums.filter(function(n) { return n * 2; });\nconsole.log(JSON.stringify(out));",
        "choices": [
          "[1,2,3,4]",
          "[2,4,6,8]",
          "[]"
        ],
        "answer": 0,
        "explain": "filter only checks whether the callback's return is truthy or falsy -- it never uses the actual returned value to transform anything. Since n * 2 is never 0 for these inputs, every element is truthy and all four pass through unchanged. Picking [2,4,6,8] assumes filter behaves like map and keeps the callback's return value instead of the original element."
      }
    },
    {
      "id": "act7-reduce",
      "act": 7,
      "title": "The Collapsing Well",
      "concept": "reduce collapses an array to a single value, carrying an accumulator forward.",
      "prereq": [
        "act7-filter"
      ],
      "xp": 30,
      "lesson": "<p><code>.reduce(callback, startingValue)</code> collapses an entire array down to a single value, by running the callback once per element and carrying an <strong>accumulator</strong> forward between calls.</p><pre><code>const items = [{ gold: 5 }, { gold: 10 }, { gold: -2 }];\nconst total = items.reduce(function(sum, item) {\n  return sum + item.gold;\n}, 0);\nconsole.log(total); // 13</code></pre><p>The callback receives the accumulator (<code>sum</code> above) and the current element, and whatever it returns becomes the accumulator for the <strong>next</strong> call. The second argument to <code>reduce</code>, <code>0</code> here, is the accumulator's starting value before the first element is even processed -- always pass one explicitly, since skipping it changes how the first iteration behaves and can throw on an empty array.</p><p><code>reduce</code> is the most general of the three: <code>map</code> and <code>filter</code> can technically both be written using <code>reduce</code>, though it is usually clearer to reach for the more specific method when one fits.</p>",
      "hints": [
        "Call items.reduce with a callback (sum, item) that returns sum + item.gold, starting from 0.",
        "Always pass the starting value (0) as the second argument to reduce.",
        "return items.reduce(function(sum, item) { return sum + item.gold; }, 0);"
      ],
      "starter": "function totalGoldReduce(items) {\n  // use .reduce() to sum every item.gold, starting from 0\n\n}",
      "mode": "function",
      "entry": "totalGoldReduce",
      "tests": [
        {
          "args": [
            [
              {
                "gold": 5
              },
              {
                "gold": 10
              },
              {
                "gold": -2
              }
            ]
          ],
          "expect": 13,
          "desc": "sums gold across several items",
          "teach": "If your total is off, check reduce's callback returns sum + item.gold, and that 0 is passed as the starting value."
        },
        {
          "args": [
            []
          ],
          "expect": 0,
          "desc": "an empty array reduces to the starting value",
          "teach": "An empty array should reduce straight to the starting value you passed in -- an error here likely means 0 was omitted."
        },
        {
          "args": [
            [
              {
                "gold": 100
              }
            ]
          ],
          "expect": 100,
          "desc": "a single item still goes through the accumulator",
          "teach": "A single-item array still runs the callback exactly once, combining the starting value with that one item."
        }
      ],
      "solution": "function totalGoldReduce(items) {\n  return items.reduce(function(sum, item) {\n    return sum + item.gold;\n  }, 0);\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>.reduce(callback, startingValue)</code> collapses an entire array down to a single value, by running the callback once per element and carrying an <strong>accumulator</strong> forward between calls. It is the most flexible of all the array methods, since map and filter can technically both be rebuilt with it, though reaching for the more specific method is usually clearer.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const items = [{ gold: 5 }, { gold: 10 }, { gold: -2 }];\nconst total = items.reduce(function(sum, item) {\n  return sum + item.gold;\n}, 0);\nconsole.log(total); // 13</code></pre><p>The callback receives the accumulator (<code>sum</code>) and the current element, and whatever it returns becomes the accumulator for the <strong>next</strong> call. The second argument, <code>0</code> here, is the accumulator's starting value before the first element is even processed.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Skipping the starting value argument changes how reduce behaves: without it, reduce uses the array's FIRST element as the initial accumulator and starts the callback from the SECOND element instead. This quietly shifts every calculation by one, and throws a TypeError outright on an empty array, since there would be no first element to fall back to.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>totalGoldReduce</code> collapses a whole list of items down to one number, carrying the running total forward with every step.</p><ol><li>Call <code>items.reduce</code> with a callback <code>(sum, item)</code>.</li><li>Return <code>sum + item.gold</code> from the callback.</li><li>Pass <code>0</code> as the starting value.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "No starting value is passed here -- where does the accumulator actually begin?",
        "code": "const nums = [10, 20, 30];\nconst result = nums.reduce(function(acc, n) { return acc + '-' + n; });\nconsole.log(result);",
        "choices": [
          "10-20-30",
          "-10-20-30",
          "0-10-20-30"
        ],
        "answer": 0,
        "explain": "Without a starting value, reduce uses the array's first element (10) as the initial accumulator and begins calling the callback from the SECOND element onward -- so the result is \"10-20-30\", not what you would get if 0 had been used as a separate starting accumulator instead."
      }
    },
    {
      "id": "act7-findsomeevery",
      "act": 7,
      "title": "The Three Questions",
      "concept": "find returns the first match, some checks if any match, every checks if all match.",
      "prereq": [
        "act7-reduce"
      ],
      "xp": 35,
      "lesson": "<p>Three related methods each ask a yes/no question about an array's elements: <code>.find(callback)</code> returns the <strong>first element</strong> that passes (or <code>undefined</code> if none do), <code>.some(callback)</code> returns <code>true</code> if <strong>at least one</strong> element passes, and <code>.every(callback)</code> returns <code>true</code> only if <strong>all</strong> elements pass.</p><pre><code>const heroes = [{ role: 'healer', hp: 10 }, { role: 'mage', hp: 20 }];\nconsole.log(heroes.some(h =&gt; h.role === 'healer'));  // true\nconsole.log(heroes.every(h =&gt; h.hp &gt; 0));            // true\nconsole.log(heroes.find(h =&gt; h.role === 'mage'));     // { role: 'mage', hp: 20 }</code></pre><p>There is a well-known edge case worth memorizing: <code>.every()</code> on an <strong>empty</strong> array always returns <code>true</code> -- vacuously, since there are no elements to fail the check -- while <code>.some()</code> on an empty array always returns <code>false</code>, since there is nothing that could have passed.</p><p>Since <code>.find()</code> can return <code>undefined</code> when nothing matches, it is common to fall back to <code>null</code> with <code>||</code> when you need a consistent, predictable shape for downstream code.</p>",
      "hints": [
        "Use .some() to check for a healer, .every() to check all hp > 0, and .find() for the first mage.",
        ".find() returns undefined if nothing matches -- use `|| null` to normalize that.",
        "const hasHealer = heroes.some(h => h.role === 'healer'); const allAlive = heroes.every(h => h.hp > 0); const firstMage = heroes.find(h => h.role === 'mage') || null;"
      ],
      "starter": "function checkParty(heroes) {\n  // build { hasHealer, allAlive, firstMage } using .some(), .every(), and .find()\n\n}",
      "mode": "function",
      "entry": "checkParty",
      "tests": [
        {
          "args": [
            [
              {
                "role": "healer",
                "hp": 10
              },
              {
                "role": "mage",
                "hp": 20
              }
            ]
          ],
          "expect": {
            "hasHealer": true,
            "allAlive": true,
            "firstMage": {
              "role": "mage",
              "hp": 20
            }
          },
          "desc": "a healthy party with a healer and a mage",
          "teach": "If firstMage comes back undefined instead of the mage object, check your .find() callback and that you called .find(), not .filter()."
        },
        {
          "args": [
            [
              {
                "role": "warrior",
                "hp": 0
              }
            ]
          ],
          "expect": {
            "hasHealer": false,
            "allAlive": false,
            "firstMage": null
          },
          "desc": "no healer, a fallen warrior, and no mage",
          "teach": "find() returns undefined when nothing matches -- make sure you normalize that to null with ||, not leave it as undefined."
        },
        {
          "args": [
            []
          ],
          "expect": {
            "hasHealer": false,
            "allAlive": true,
            "firstMage": null
          },
          "desc": "an empty party -- every() is vacuously true, some()/find() find nothing",
          "teach": "Remember every() on an empty array is true and some()/find() find nothing -- that is how both methods are defined, not a bug."
        }
      ],
      "solution": "function checkParty(heroes) {\n  const hasHealer = heroes.some(function(h) { return h.role === 'healer'; });\n  const allAlive = heroes.every(function(h) { return h.hp > 0; });\n  const firstMage = heroes.find(function(h) { return h.role === 'mage'; }) || null;\n  return { hasHealer: hasHealer, allAlive: allAlive, firstMage: firstMage };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Three related methods each ask a yes/no question about an array's elements: <code>.find(callback)</code> returns the <strong>first element</strong> that passes (or <code>undefined</code> if none do), <code>.some(callback)</code> returns <code>true</code> if <strong>at least one</strong> element passes, and <code>.every(callback)</code> returns <code>true</code> only if <strong>all</strong> elements pass.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const heroes = [{ role: 'healer', hp: 10 }, { role: 'mage', hp: 20 }];\nconsole.log(heroes.some(h =&gt; h.role === 'healer'));  // true\nconsole.log(heroes.every(h =&gt; h.hp &gt; 0));            // true\nconsole.log(heroes.find(h =&gt; h.role === 'mage'));     // { role: 'mage', hp: 20 }</code></pre><p><code>some</code> stops checking as soon as one element passes; <code>every</code> keeps checking until one fails or all pass; <code>find</code> returns the actual matching element itself, not just true or false.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>The empty-array edge case trips up almost everyone the first time: <code>.every()</code> on an empty array is ALWAYS <code>true</code> -- vacuously, since there is nothing to fail the check -- while <code>.some()</code> on an empty array is ALWAYS <code>false</code>, since nothing could have passed either.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>checkParty</code> asks three separate yes/no questions about the same party in one pass.</p><ol><li>Use <code>.some()</code> to check for a healer.</li><li>Use <code>.every()</code> to check all <code>hp &gt; 0</code>.</li><li>Use <code>.find()</code> for the first mage, falling back to <code>null</code> with <code>||</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "An empty array is a strange but well-defined input for these two methods.",
        "code": "const arr = [];\nconsole.log(arr.every(x => x > 100));\nconsole.log(arr.some(x => x > 100));",
        "choices": [
          "true, false",
          "false, true",
          "false, false"
        ],
        "answer": 0,
        "explain": "every() on an empty array is vacuously true, since there is nothing to disprove the claim; some() on an empty array is false, since nothing could have satisfied it either. Picking \"false, true\" swaps which one defaults to true on empty input, a very common mixup."
      }
    },
    {
      "id": "act7-sort",
      "act": 7,
      "title": "The Ranking Chime",
      "concept": "sort reorders an array using a comparator function you supply.",
      "prereq": [
        "act7-findsomeevery"
      ],
      "xp": 30,
      "lesson": "<p><code>.sort(comparator)</code> reorders an array using a <strong>comparator function</strong> that you provide. The comparator takes two elements, <code>a</code> and <code>b</code>, and its return value tells <code>sort</code> what to do: negative means <code>a</code> comes first, positive means <code>b</code> comes first, and zero means leave their order unchanged.</p><pre><code>const heroes = [{ power: 5 }, { power: 20 }, { power: 10 }];\nconst ranked = heroes.sort(function(a, b) {\n  return b.power - a.power; // descending order\n});\nconsole.log(ranked); // powers: 20, 10, 5</code></pre><p><code>b.power - a.power</code> sorts descending (highest first); flipping it to <code>a.power - b.power</code> sorts ascending instead. Without a comparator at all, <code>.sort()</code> converts everything to strings and sorts alphabetically, which famously sorts numbers like <code>[1, 10, 2]</code> in the wrong order -- always pass a comparator when sorting numbers.</p><p>One more important detail: <code>.sort()</code> mutates the original array in place. To sort without disturbing the original, make a copy first with <code>.slice()</code>, then sort the copy, exactly as shown in the starter below.</p>",
      "hints": [
        "Copy the array first with .slice() so you don't mutate the original, then call .sort() on the copy.",
        "Use a comparator that returns b.power - a.power for descending order by power.",
        "return heroes.slice().sort(function(a, b) { return b.power - a.power; });"
      ],
      "starter": "function rankHeroes(heroes) {\n  // return a new array, sorted by power descending, without mutating heroes\n\n}",
      "mode": "function",
      "entry": "rankHeroes",
      "tests": [
        {
          "args": [
            [
              {
                "name": "A",
                "power": 5
              },
              {
                "name": "B",
                "power": 20
              },
              {
                "name": "C",
                "power": 10
              }
            ]
          ],
          "expect": [
            {
              "name": "B",
              "power": 20
            },
            {
              "name": "C",
              "power": 10
            },
            {
              "name": "A",
              "power": 5
            }
          ],
          "desc": "sorts three heroes by power, highest first",
          "teach": "If the order looks reversed, check your comparator: b.power - a.power sorts descending, a.power - b.power sorts ascending."
        },
        {
          "args": [
            []
          ],
          "expect": [],
          "desc": "an empty array sorts to an empty array",
          "teach": "An empty array needs no reordering -- sort on it should just return an empty array."
        },
        {
          "args": [
            [
              {
                "name": "Solo",
                "power": 1
              }
            ]
          ],
          "expect": [
            {
              "name": "Solo",
              "power": 1
            }
          ],
          "desc": "a single hero needs no reordering",
          "teach": "A single-element array is already \"sorted\" -- this mostly confirms your function does not error on a trivial case."
        }
      ],
      "solution": "function rankHeroes(heroes) {\n  return heroes.slice().sort(function(a, b) {\n    return b.power - a.power;\n  });\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>.sort(comparator)</code> reorders an array using a <strong>comparator function</strong> you provide. It takes two elements, <code>a</code> and <code>b</code>: a negative return means <code>a</code> comes first, positive means <code>b</code> comes first, and zero means leave their order unchanged. Getting comfortable with that return value pays off the moment sorting needs anything beyond plain alphabetical order.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const heroes = [{ power: 5 }, { power: 20 }, { power: 10 }];\nconst ranked = heroes.sort(function(a, b) {\n  return b.power - a.power; // descending order\n});\nconsole.log(ranked); // powers: 20, 10, 5</code></pre><p><code>b.power - a.power</code> sorts descending (highest first); flipping it to <code>a.power - b.power</code> sorts ascending instead.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Without a comparator at all, <code>.sort()</code> converts everything to strings and sorts alphabetically, which famously sorts numbers like <code>[1, 10, 2]</code> in the \"wrong\" order -- always pass a comparator when sorting numbers. On top of that, <code>.sort()</code> mutates the original array in place, so copy it with <code>.slice()</code> first if you need the original order preserved.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>rankHeroes</code> should leave the original heroes array completely untouched, returning a freshly sorted copy built from a safe slice of it, ordered from strongest to weakest.</p><ol><li>Copy <code>heroes</code> with <code>.slice()</code> first.</li><li>Sort the copy with a comparator returning <code>b.power - a.power</code> (descending).</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "No comparator here at all -- does sort still order these numerically?",
        "code": "const nums = [1, 10, 2];\nconsole.log(JSON.stringify(nums.sort()));",
        "choices": [
          "[1,10,2]",
          "[1,2,10]",
          "[2,10,1]"
        ],
        "answer": 0,
        "explain": "Without a comparator, sort() converts numbers to strings and compares them alphabetically -- \"1\" comes before \"10\" which comes before \"2\" in string order, giving [1, 10, 2], not the numeric order you would expect. This is exactly why you should always pass a comparator when sorting numbers."
      }
    },
    {
      "id": "act7-boss",
      "act": 7,
      "title": "Boss: The Grand Pipeline",
      "concept": "Chain filter, map, sort, and reduce together into one pipeline.",
      "prereq": [
        "act7-callbacks",
        "act7-map",
        "act7-filter",
        "act7-reduce",
        "act7-findsomeevery",
        "act7-sort"
      ],
      "xp": 60,
      "lesson": "<p>The final spell of the Higher Order: chain several array methods together into one pipeline, each one passing its output straight to the next. This is where <code>filter</code>, <code>map</code>, <code>sort</code>, and <code>reduce</code> combine into real, expressive data processing.</p><pre><code>const ranked = adventurers\n  .filter(function(a) { return a.active; })\n  .map(function(a) { return { name: a.name, bonus: a.gold + a.level * 10 }; })\n  .sort(function(a, b) { return b.bonus - a.bonus; });</code></pre><p>Each method in the chain returns a new array, which is exactly what lets the next <code>.method()</code> call attach directly onto the end of the previous one. Read a chain like this top to bottom, in the exact order it executes: first every inactive adventurer is dropped, then each remaining one is reshaped into a <code>{ name, bonus }</code> object, then the results are sorted by bonus, highest first.</p><p>Finish the pipeline by reducing the ranked list into a <code>totalBonus</code>, and return both the ranked list and that total together as <code>{ ranked, totalBonus }</code>.</p>",
      "hints": [
        "Chain .filter(active).map(to {name,bonus}).sort(descending by bonus) in that order.",
        "bonus is gold + level * 10 for each adventurer.",
        "After building ranked, use ranked.reduce((sum, a) => sum + a.bonus, 0) to get totalBonus."
      ],
      "starter": "function processAdventurers(adventurers) {\n  const ranked = adventurers\n    .filter(function(a) {\n      // keep only active adventurers\n\n    })\n    .map(function(a) {\n      // reshape into { name, bonus: gold + level * 10 }\n\n    })\n    .sort(function(a, b) {\n      // sort descending by bonus\n\n    });\n  let totalBonus = 0;\n  // sum ranked's bonus values into totalBonus\n\n  return { ranked, totalBonus };\n}",
      "mode": "function",
      "entry": "processAdventurers",
      "tests": [
        {
          "args": [
            [
              {
                "name": "Finn",
                "level": 2,
                "gold": 5,
                "active": true
              },
              {
                "name": "Mira",
                "level": 5,
                "gold": 0,
                "active": true
              },
              {
                "name": "Zed",
                "level": 10,
                "gold": 100,
                "active": false
              }
            ]
          ],
          "expect": {
            "ranked": [
              {
                "name": "Mira",
                "bonus": 50
              },
              {
                "name": "Finn",
                "bonus": 25
              }
            ],
            "totalBonus": 75
          },
          "desc": "drops the inactive adventurer, ranks the rest by bonus",
          "teach": "If an inactive adventurer sneaks into ranked, check your .filter() callback returns a.active directly, not its negation."
        },
        {
          "args": [
            []
          ],
          "expect": {
            "ranked": [],
            "totalBonus": 0
          },
          "desc": "no adventurers at all",
          "teach": "No adventurers at all should flow through the whole chain and land on an empty ranked list with totalBonus 0."
        },
        {
          "args": [
            [
              {
                "name": "Solo",
                "level": 1,
                "gold": 0,
                "active": false
              }
            ]
          ],
          "expect": {
            "ranked": [],
            "totalBonus": 0
          },
          "desc": "a single inactive adventurer filters out entirely",
          "teach": "A single inactive adventurer should be filtered out at the very first step, before map or sort ever see it."
        }
      ],
      "solution": "function processAdventurers(adventurers) {\n  const ranked = adventurers\n    .filter(function(a) {\n      return a.active;\n    })\n    .map(function(a) {\n      return { name: a.name, bonus: a.gold + a.level * 10 };\n    })\n    .sort(function(a, b) {\n      return b.bonus - a.bonus;\n    });\n  const totalBonus = ranked.reduce(function(sum, a) {\n    return sum + a.bonus;\n  }, 0);\n  return { ranked: ranked, totalBonus: totalBonus };\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>The final spell of the Higher Order: chain several array methods together into one pipeline, each one passing its output straight to the next. This is where <code>filter</code>, <code>map</code>, <code>sort</code>, and <code>reduce</code> combine into real, expressive data processing.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const ranked = adventurers\n  .filter(function(a) { return a.active; })\n  .map(function(a) { return { name: a.name, bonus: a.gold + a.level * 10 }; })\n  .sort(function(a, b) { return b.bonus - a.bonus; });</code></pre><p>Each method returns a new array, which is exactly what lets the next <code>.method()</code> call attach directly onto the end of the previous one. Read a chain top to bottom, in the exact order it executes.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>You generally cannot reorder a chain arbitrarily without changing the result. Filtering AFTER mapping, for example, would need to check a property that the map step may have already dropped from its reshaped objects -- the ORDER of a chain is part of its correctness, not just a style choice.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>processAdventurers</code> chains four separate steps into one continuous pipeline, each one narrowing or reshaping the list a little further before the next step ever touches it.</p><ol><li>Filter to active adventurers only.</li><li>Map each into <code>{ name, bonus: gold + level * 10 }</code>.</li><li>Sort descending by bonus.</li><li>Reduce the ranked list into a <code>totalBonus</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Does map run on the whole original array, or just what survives the filter?",
        "code": "const data = [1, 2, 3, 4, 5];\nconst result = data.filter(n => n % 2 === 0).map(n => n * 10);\nconsole.log(JSON.stringify(result));",
        "choices": [
          "[20,40]",
          "[10,20,30,40,50]",
          "[2,4]"
        ],
        "answer": 0,
        "explain": "filter keeps only the even numbers first (2 and 4), and THEN map multiplies just those survivors by 10, giving [20, 40]. Picking [10,20,30,40,50] assumes map ran on the full original array instead of on filter's already-narrowed result."
      }
    },
    {
      "id": "act8-timeout",
      "act": 8,
      "title": "The Delayed Echo",
      "concept": "setTimeout schedules a callback for later; synchronous code always runs first.",
      "prereq": [
        "act7-boss"
      ],
      "xp": 30,
      "lesson": "<p>JavaScript runs on a single thread, using an <strong>event loop</strong> to handle things that take time without freezing everything else. <code>setTimeout(callback, delay)</code> schedules a callback to run <strong>later</strong> -- after at least <code>delay</code> milliseconds, and always after the current script finishes running.</p><pre><code>console.log('first');\nsetTimeout(function() {\n  console.log('later');\n}, 0);\nconsole.log('second');\n\n// logged order: 'first', 'second', 'later'</code></pre><p>Notice that even with a delay of <code>0</code>, <code>'later'</code> still logs <strong>after</strong> <code>'second'</code>. That is the key lesson: all of your regular, synchronous code always finishes running first, no matter how small the delay is, before any scheduled callback gets a turn. <code>setTimeout</code> never runs its callback in the middle of currently-executing code.</p><p>Below, log 'Scouting first', then schedule a <code>setTimeout</code> that logs 'Distant echo', then log 'Scouting complete'. Watch which lines appear immediately -- the scheduled one will not be part of what is captured right away, exactly because it has not run yet by the time the surrounding script finishes.</p>",
      "hints": [
        "Log 'Scouting first', then call setTimeout with a callback logging 'Distant echo', then log 'Scouting complete'.",
        "The order in your code should be: log, setTimeout(..., 0), log -- the setTimeout callback runs after everything else.",
        "console.log('Scouting first'); setTimeout(function() { console.log('Distant echo'); }, 0); console.log('Scouting complete');"
      ],
      "starter": "console.log('Scouting first');\n// schedule a setTimeout here that logs 'Distant echo'\n\nconsole.log('Scouting complete');",
      "mode": "output",
      "entry": "",
      "tests": [
        {
          "expectOutput": [
            "Scouting first",
            "Scouting complete"
          ],
          "desc": "both synchronous lines are captured, in the order they were logged",
          "teach": "If \"Distant echo\" shows up in this capture, remember only synchronous output is captured here -- the scheduled callback has not run yet at this point."
        },
        {
          "expectOutput": [
            "Scouting first",
            "Scouting complete"
          ],
          "desc": "the scheduled callback's log is NOT part of the captured output yet -- setTimeout(fn, 0) still defers to after the current script",
          "teach": "Check \"Scouting first\" logs before \"Scouting complete\" -- the setTimeout call itself should sit between them in your code."
        },
        {
          "expectOutput": [
            "Scouting first",
            "Scouting complete"
          ],
          "desc": "exactly two lines total -- nothing before the first log, nothing skipped before the second",
          "teach": "Exactly two synchronous lines should be captured -- a third likely means something inside the callback also ran synchronously by mistake."
        }
      ],
      "solution": "console.log('Scouting first');\nsetTimeout(function() {\n  console.log('Distant echo');\n}, 0);\nconsole.log('Scouting complete');",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>JavaScript runs on a single thread, using an <strong>event loop</strong> to handle things that take time without freezing everything else. <code>setTimeout(callback, delay)</code> schedules a callback to run <strong>later</strong> -- after at least <code>delay</code> milliseconds, and always after the current script finishes running.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>console.log('first');\nsetTimeout(function() {\n  console.log('later');\n}, 0);\nconsole.log('second');\n\n// logged order: 'first', 'second', 'later'</code></pre><p>Even with a delay of 0, \"later\" still logs after \"second\" -- all of your regular, synchronous code always finishes running first, no matter how small the delay is, before any scheduled callback gets a turn.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>The classic misconception is that <code>setTimeout(fn, 0)</code> runs \"immediately,\" since the delay is zero. It does not -- 0ms is still a minimum delay, not a guarantee. <code>setTimeout</code> never runs its callback in the middle of currently-executing code, no matter how small the number in front of it is.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>This one is about ordering, not math. Log the two synchronous lines exactly where the starter comments show, with the scheduled log sitting between them in the code, even though it will not run first.</p><ol><li>Log \"Scouting first\".</li><li>Schedule a <code>setTimeout</code> that logs \"Distant echo\".</li><li>Log \"Scouting complete\".</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "A zero-millisecond delay is still a delay -- predict the full logged order.",
        "code": "console.log('A');\nsetTimeout(function() { console.log('B'); }, 0);\nconsole.log('C');",
        "choices": [
          "A, C, B",
          "A, B, C",
          "B, A, C"
        ],
        "answer": 0,
        "explain": "All synchronous code finishes first -- A then C -- and only after the whole script completes does the event loop get around to firing the scheduled callback, logging B last. Picking \"A, B, C\" assumes a 0ms delay means B runs in the middle, right where it is written in the code."
      }
    },
    {
      "id": "act8-promises",
      "act": 8,
      "title": "The Vow Not Yet Kept",
      "concept": "A Promise represents a value that will resolve or reject later; .then/.catch handle it.",
      "prereq": [
        "act8-timeout"
      ],
      "xp": 35,
      "lesson": "<p>A <strong>Promise</strong> represents a value that is not ready yet, but will either <em>resolve</em> (succeed) or <em>reject</em> (fail) at some point. You attach <code>.then(onSuccess)</code> to handle the resolved value, and <code>.catch(onError)</code> to handle a rejection.</p><pre><code>const reward = new Promise(function(resolve, reject) {\n  resolve(100);\n});\n\nreward\n  .then(function(value) {\n    return value * 2;\n  })\n  .catch(function(err) {\n    console.log('error: ' + err);\n  });</code></pre><p>Calling <code>.then()</code> itself returns a <strong>new Promise</strong> -- which is exactly what lets you chain more <code>.then()</code> calls one after another, each receiving the value returned by the previous one. A single <code>.catch()</code> at the end of a chain catches a rejection from any earlier step, so you rarely need to repeat error handling after every link.</p><p>One thing worth being honest about: a Promise's <code>.then()</code> callback never runs immediately -- even an already-resolved Promise defers its callbacks to just after the current script finishes. That means checking a Promise's resolved value requires actually waiting for it, which is exactly what <code>async</code>/<code>await</code>, coming up next, was built to make easier.</p>",
      "hints": [
        "Build with `new Promise(function(resolve, reject) { resolve(100); })`, then chain .then() and .catch() onto it.",
        "Your .then() callback can transform the value (like multiplying it) and return the new value.",
        "return new Promise(function(resolve) { resolve(100); }).then(function(v) { return v * 2; }).catch(function(e) { console.log(e); });"
      ],
      "starter": "function createRewardPromise() {\n  // build a Promise that resolves with 100, then chain a .then() and a .catch()\n\n}",
      "mode": "assert",
      "entry": "createRewardPromise",
      "tests": [
        {
          "assert": "return entry() instanceof Promise;",
          "desc": "calling it produces a real Promise",
          "teach": "If this fails, make sure your function actually returns the Promise chain, not just builds it without returning."
        },
        {
          "assert": "var p = entry(); return typeof p.then === 'function';",
          "desc": "the result is thenable -- it has a .then method",
          "teach": "Every real Promise has a .then method automatically -- if this fails, whatever you returned probably is not a genuine Promise."
        },
        {
          "assert": "var p = entry(); return typeof p.catch === 'function';",
          "desc": "the result also has a .catch method, standard on every Promise",
          "teach": "Chaining .then() still returns a Promise with its own .catch -- if this fails, check nothing broke the chain before it was returned."
        }
      ],
      "solution": "function createRewardPromise() {\n  return new Promise(function(resolve, reject) {\n    resolve(100);\n  }).then(function(value) {\n    return value * 2;\n  }).catch(function(err) {\n    console.log('error: ' + err);\n  });\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>A <strong>Promise</strong> represents a value that is not ready yet, but will either resolve (succeed) or reject (fail) at some point. You attach <code>.then(onSuccess)</code> to handle the resolved value, and <code>.catch(onError)</code> to handle a rejection. Chaining like this is the backbone of nearly every real asynchronous operation you will write.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const reward = new Promise(function(resolve, reject) {\n  resolve(100);\n});\n\nreward\n  .then(function(value) {\n    return value * 2;\n  })\n  .catch(function(err) {\n    console.log('error: ' + err);\n  });</code></pre><p>Calling <code>.then()</code> itself returns a <strong>new Promise</strong>, which is exactly what lets you chain more <code>.then()</code> calls, each receiving the value returned by the one before it. A single <code>.catch()</code> at the end catches a rejection from any earlier step.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A Promise's <code>.then()</code> callback never runs immediately, even on an already-resolved Promise -- it is still deferred until just after the current script finishes, exactly like <code>setTimeout(fn, 0)</code>. You cannot read a Promise's resolved value synchronously right after creating it.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>createRewardPromise</code> needs to produce a genuine, chainable Promise -- the tests only check its shape, not the exact number it eventually resolves to.</p><ol><li>Build a Promise that resolves with 100.</li><li>Chain a <code>.then()</code> that transforms the value.</li><li>Chain a <code>.catch()</code> for error handling.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "This Promise resolves instantly -- does its .then() run before the code after it?",
        "code": "console.log('start');\nPromise.resolve(1).then(function(v) { console.log('resolved: ' + v); });\nconsole.log('end');",
        "choices": [
          "start, end, resolved: 1",
          "start, resolved: 1, end",
          "resolved: 1, start, end"
        ],
        "answer": 0,
        "explain": "Even though the Promise resolves instantly, .then()'s callback is still deferred until after the current synchronous code finishes -- so \"start\" and \"end\" both log first, then \"resolved: 1\" logs last. Picking the second choice assumes an already-resolved Promise runs its .then() in the middle of the surrounding code."
      }
    },
    {
      "id": "act8-asyncawait",
      "act": 8,
      "title": "The Patient Incantation",
      "concept": "async functions always return a Promise; await pauses for a Promise to settle.",
      "prereq": [
        "act8-promises"
      ],
      "xp": 35,
      "lesson": "<p><code>async</code>/<code>await</code> is syntax that makes Promise-based code read like ordinary, top-to-bottom synchronous code. Marking a function <code>async</code> makes it <strong>always return a Promise</strong>, and inside it, <code>await</code> pauses execution until the awaited Promise settles, then hands you its resolved value directly.</p><pre><code>async function fetchTreasureValue() {\n  const value = await Promise.resolve(50);\n  return value * 2;\n}\n\nfetchTreasureValue().then(function(result) {\n  console.log(result); // 100\n});</code></pre><p><code>await</code> can only be used inside a function declared <code>async</code>. Whatever the async function <code>return</code>s becomes the resolved value of the Promise it produces -- you never need to manually wrap it in <code>new Promise(...)</code> yourself. If something inside goes wrong, a thrown error inside an async function turns into a rejected Promise automatically, catchable with <code>.catch()</code> on the call, or <code>try/catch</code> around an <code>await</code> inside the function itself.</p><p>Under the hood, an async function's constructor is literally named <code>AsyncFunction</code> -- a detail you can check with <code>fn.constructor.name</code>, which is exactly how the tests below confirm your function is written the async way.</p>",
      "hints": [
        "Mark the function with the `async` keyword, then use `await` inside it on a resolved Promise.",
        "async function fetchTreasureValue() { const value = await Promise.resolve(50); return value * 2; }",
        "Don't add any parameters -- the function should take zero arguments."
      ],
      "starter": "async function fetchTreasureValue() {\n  // await a resolved Promise, then return double its value\n\n}",
      "mode": "assert",
      "entry": "fetchTreasureValue",
      "tests": [
        {
          "assert": "return entry() instanceof Promise;",
          "desc": "calling an async function always returns a Promise",
          "teach": "If this fails, check the function is declared with the async keyword -- only async functions always return a Promise."
        },
        {
          "assert": "return entry.constructor.name === 'AsyncFunction';",
          "desc": "it is declared with the async keyword",
          "teach": "This checks the async keyword specifically is present -- a regular function returning a Promise manually will not pass this."
        },
        {
          "assert": "return entry.length === 0;",
          "desc": "it takes no arguments",
          "teach": "The function should take zero parameters -- if you added one to hold the awaited value, move that into a local variable instead."
        }
      ],
      "solution": "async function fetchTreasureValue() {\n  const value = await Promise.resolve(50);\n  return value * 2;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>async</code>/<code>await</code> is syntax that makes Promise-based code read like ordinary, top-to-bottom synchronous code. Marking a function <code>async</code> makes it <strong>always return a Promise</strong>, and inside it, <code>await</code> pauses execution until the awaited Promise settles, then hands you its resolved value directly.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>async function fetchTreasureValue() {\n  const value = await Promise.resolve(50);\n  return value * 2;\n}\n\nfetchTreasureValue().then(function(result) {\n  console.log(result); // 100\n});</code></pre><p><code>await</code> can only be used inside a function declared <code>async</code>. Whatever the async function <code>return</code>s becomes the resolved value of the Promise it produces -- you never need to manually wrap it in <code>new Promise(...)</code> yourself.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A common misread is that <code>await</code> pauses the WHOLE program, freezing every other piece of code. It does not -- only the async function itself pauses at that <code>await</code>; everything else outside it keeps running normally in the meantime, which is exactly why async/await does not block the rest of your script.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>fetchTreasureValue</code> needs the async keyword on the declaration itself, plus one genuine await inside its body, taking zero parameters of its own and doubling whatever value it awaits.</p><ol><li>Declare the function with <code>async</code>.</li><li>Await a resolved Promise inside it.</li><li>Return double the awaited value.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Calling an async function -- what type comes back immediately?",
        "code": "async function getValue() {\n  const v = await Promise.resolve(5);\n  return v + 1;\n}\nconsole.log(typeof getValue());",
        "choices": [
          "object",
          "number",
          "Promise"
        ],
        "answer": 0,
        "explain": "Calling an async function always returns a Promise immediately, and typeof a Promise, like typeof any object, is the string \"object\" -- never the special string \"Promise\" or the eventual resolved value. Picking \"Promise\" assumes typeof has a special case for Promises, which it does not."
      }
    },
    {
      "id": "act8-mockfetch",
      "act": 8,
      "title": "The Simulated Signal",
      "concept": "Combine setTimeout and Promise to simulate a delayed success or failure.",
      "prereq": [
        "act8-asyncawait"
      ],
      "xp": 40,
      "lesson": "<p>Real network requests are asynchronous, but you can practice the pattern without a real network by combining <code>setTimeout</code> and a <code>Promise</code> to simulate a delayed response, resolving on success or rejecting on failure.</p><pre><code>function mockFetchHero(shouldFail) {\n  return new Promise(function(resolve, reject) {\n    setTimeout(function() {\n      if (shouldFail) {\n        reject(new Error('Hero not found'));\n      } else {\n        resolve({ name: 'Wanderer', hp: 100 });\n      }\n    }, 10);\n  });\n}</code></pre><p>This is exactly the shape of a real API call: it returns a Promise immediately, before any actual work has finished, and that Promise later resolves or rejects once the simulated delay elapses inside the <code>setTimeout</code>. A caller would use it with <code>mockFetchHero(false).then(hero =&gt; ...).catch(err =&gt; ...)</code>, or with <code>await</code> inside an async function.</p><p>Notice that <code>shouldFail</code> decides the <strong>outcome</strong>, but not whether a Promise is returned -- every call returns a Promise immediately, regardless of what will eventually happen inside it. That is what makes it safe to always chain <code>.then()</code>/<code>.catch()</code> onto the result without checking anything first.</p>",
      "hints": [
        "Return `new Promise((resolve, reject) => { ... })` and put a setTimeout inside its executor.",
        "Inside the setTimeout callback, reject with an Error when shouldFail is true, otherwise resolve with a hero object.",
        "function mockFetchHero(shouldFail) { return new Promise(function(resolve, reject) { setTimeout(function() { if (shouldFail) { reject(new Error('Hero not found')); } else { resolve({ name: 'Wanderer', hp: 100 }); } }, 10); }); }"
      ],
      "starter": "function mockFetchHero(shouldFail) {\n  // return a Promise that resolves with hero data, or rejects if shouldFail is true\n\n}",
      "mode": "assert",
      "entry": "mockFetchHero",
      "tests": [
        {
          "assert": "return entry(false) instanceof Promise && entry(true) instanceof Promise;",
          "desc": "both the success and failure paths return a Promise",
          "teach": "Both the success and failure paths must return a genuine Promise -- if one fails, check both branches use the same new Promise(...) structure."
        },
        {
          "assert": "return entry.length === 1;",
          "desc": "it takes exactly one argument, the failure flag",
          "teach": "The function should take exactly one parameter, shouldFail -- an extra or missing parameter will fail this check."
        },
        {
          "assert": "var p = entry(false); return typeof p.then === 'function' && typeof p.catch === 'function';",
          "desc": "the returned Promise is ready to be chained with .then/.catch",
          "teach": "Every Promise built this way automatically gets .then and .catch -- if this fails, something about the returned value is not a real Promise."
        }
      ],
      "solution": "function mockFetchHero(shouldFail) {\n  return new Promise(function(resolve, reject) {\n    setTimeout(function() {\n      if (shouldFail) {\n        reject(new Error('Hero not found'));\n      } else {\n        resolve({ name: 'Wanderer', hp: 100 });\n      }\n    }, 10);\n  });\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Real network requests are asynchronous, but you can practice the pattern without a real network by combining <code>setTimeout</code> and a <code>Promise</code> to simulate a delayed response, resolving on success or rejecting on failure. Practicing this shape now makes real network code, which behaves identically, far less mysterious later on.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>function mockFetchHero(shouldFail) {\n  return new Promise(function(resolve, reject) {\n    setTimeout(function() {\n      if (shouldFail) {\n        reject(new Error('Hero not found'));\n      } else {\n        resolve({ name: 'Wanderer', hp: 100 });\n      }\n    }, 10);\n  });\n}</code></pre><p>This returns a Promise immediately, before any actual work has finished, and that Promise later resolves or rejects once the simulated delay elapses inside the <code>setTimeout</code>.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>It is tempting to assume <code>shouldFail</code> decides whether a Promise is returned at all. It does not -- every call returns a Promise immediately, regardless of what will eventually happen inside it. <code>shouldFail</code> only decides the eventual outcome, which is exactly what makes it safe to always chain <code>.then()</code>/<code>.catch()</code> without checking anything first.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>mockFetchHero</code> needs to return a real Promise the instant it is called, no matter which outcome the flag eventually points toward.</p><ol><li>Return a <code>new Promise</code> wrapping a <code>setTimeout</code>.</li><li>Inside the timeout, reject with an Error if <code>shouldFail</code>.</li><li>Otherwise resolve with hero data.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Does the failing path skip returning a Promise, or does it return one too?",
        "code": "function build(fail) {\n  return new Promise(function(resolve, reject) {\n    if (fail) reject('nope'); else resolve('ok');\n  });\n}\nconsole.log(build(true) instanceof Promise);\nconsole.log(build(false) instanceof Promise);",
        "choices": [
          "true, true",
          "true, false",
          "false, true"
        ],
        "answer": 0,
        "explain": "Both calls return a real Promise object immediately -- the fail flag only decides what happens INSIDE the executor (resolve vs reject), it has no bearing on whether a Promise comes back at all. Picking either mixed answer assumes the failing path skips returning a Promise entirely."
      }
    },
    {
      "id": "act8-boss",
      "act": 8,
      "title": "Boss: The Rift Convergence",
      "concept": "Orchestrate a couple of awaited steps inside one async function.",
      "prereq": [
        "act8-timeout",
        "act8-promises",
        "act8-asyncawait",
        "act8-mockfetch"
      ],
      "xp": 60,
      "lesson": "<p>The final rift crossing: orchestrate a small sequence of <strong>awaited</strong> steps inside one <code>async</code> function, the way a real multi-step operation (fetch a user, then fetch their data, then combine it) would be written.</p><pre><code>async function runExpedition() {\n  const gold = await Promise.resolve(30);\n  const bonus = await Promise.resolve(20);\n  return gold + bonus;\n}</code></pre><p>Each <code>await</code> pauses only that function's progress until its Promise settles, then moves to the next line with the resolved value in hand -- the two steps run in sequence, one after the other, exactly as written top to bottom, which is the whole point of <code>async</code>/<code>await</code> over raw <code>.then()</code> chains.</p><p>Because it is declared <code>async</code>, every call to <code>runExpedition()</code> returns a brand-new Promise -- calling it twice produces two independent Promises, not the same one reused, even though the function's logic is identical both times. Build it below, awaiting two resolved values in sequence and returning their sum.</p>",
      "hints": [
        "Declare it with `async function runExpedition() { ... }` and await two separate Promise.resolve(...) calls in sequence.",
        "Store each awaited value in its own const, then return their sum.",
        "async function runExpedition() { const gold = await Promise.resolve(30); const bonus = await Promise.resolve(20); return gold + bonus; }"
      ],
      "starter": "async function runExpedition() {\n  // await two resolved values in sequence, then return their sum\n\n}",
      "mode": "assert",
      "entry": "runExpedition",
      "tests": [
        {
          "assert": "return entry() instanceof Promise;",
          "desc": "calling it returns a Promise",
          "teach": "If this fails, make sure the function is declared async -- only then does calling it always produce a Promise."
        },
        {
          "assert": "return entry.constructor.name === 'AsyncFunction';",
          "desc": "it is declared async so it can await each step",
          "teach": "This confirms the async keyword itself is on the function declaration, not just that it happens to return a Promise manually."
        },
        {
          "assert": "var p1 = entry(); var p2 = entry(); return p1 instanceof Promise && p2 instanceof Promise && p1 !== p2;",
          "desc": "every call launches a fresh, independent expedition",
          "teach": "Each call should create its own independent Promise -- if p1 and p2 are somehow equal, check for a shared or cached value."
        },
        {
          "assert": "return entry.length === 0;",
          "desc": "it needs no arguments to begin",
          "teach": "The function should need no arguments at all to start its sequence of awaited steps."
        }
      ],
      "solution": "async function runExpedition() {\n  const gold = await Promise.resolve(30);\n  const bonus = await Promise.resolve(20);\n  return gold + bonus;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>The final rift crossing: orchestrate a small sequence of <strong>awaited</strong> steps inside one <code>async</code> function, the way a real multi-step operation -- fetch a user, then fetch their data, then combine it -- would be written. Real code that fetches a user and then their data leans on exactly this same shape.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>async function runExpedition() {\n  const gold = await Promise.resolve(30);\n  const bonus = await Promise.resolve(20);\n  return gold + bonus;\n}</code></pre><p>Each <code>await</code> pauses only that function's progress until its Promise settles, then moves to the next line with the resolved value in hand -- the two steps run in sequence, one fully finishing before the next begins, exactly as written top to bottom.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>It is tempting to assume calling the same async function twice somehow reuses or shares one Promise. It does not -- every call to an async function creates and returns a brand-new, independent Promise, even if the function's internal logic and eventual result are identical both times.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p><code>runExpedition</code> needs both awaited steps to happen strictly in sequence, one fully settling before the next one even begins, then combine both resolved numbers.</p><ol><li>Declare the function as <code>async</code>.</li><li>Await a first resolved value.</li><li>Await a second resolved value.</li><li>Return their sum.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Two calls to the same async function -- do they share one Promise or get their own?",
        "code": "async function run() {\n  const a = await Promise.resolve(2);\n  const b = await Promise.resolve(3);\n  return a * b;\n}\nconst p1 = run();\nconst p2 = run();\nconsole.log(p1 === p2);",
        "choices": [
          "false",
          "true",
          "undefined"
        ],
        "answer": 0,
        "explain": "Every call to an async function returns a brand-new Promise, even with identical logic and an eventual identical result -- so p1 and p2 are two distinct objects, and === is false. Picking \"true\" assumes calling the same async function twice reuses one shared Promise."
      }
    }
  ];

  window.SYNTAXIA_EXTRA = { acts: acts, quests: quests };
})();
