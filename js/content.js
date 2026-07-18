// Syntaxia content data.
// window.SYNTAXIA_CONTENT = { acts: [Act], quests: [Quest] }
// See README.md for the full schema. Act 1 lives here; later acts get appended
// after the marked lines below, both inside `acts` and inside `quests`.
(function () {
  var acts = [
    {
      "id": 1,
      "name": "The Plains of Declaration",
      "theme": "Variables & Types",
      "blurb": "Where every mage learns to name their power.",
      "accent": "#6fe3a6"
    }
    // === EXTRA ACTS APPENDED BELOW ===
  ];

  var quests = [
    {
      "id": "act1-let",
      "act": 1,
      "title": "First Words: let",
      "concept": "Declare a variable with let and change its value.",
      "prereq": [],
      "xp": 15,
      "lesson": "<p>In Syntaxia, every spell needs a place to store its power. The <code>let</code> keyword creates a variable you can change later.</p><pre><code>let power = 10;\npower = power + 5;\nconsole.log(power); // 15</code></pre><p>Unlike a fixed rune, a <code>let</code> variable can be reassigned as many times as your spell needs. Use it whenever a value will change while your code runs.</p><ul><li>Declare once with <code>let name = value;</code></li><li>Reassign later with <code>name = newValue;</code> (no <code>let</code> the second time)</li></ul>",
      "hints": [
        "Declare with `let power = startPower;` first.",
        "Reassign it with `power = power + 5;` -- you can also write this as `power += 5;`.",
        "Do not forget the `return power;` at the end, or your spell will return nothing (`undefined`)."
      ],
      "starter": "function castLight(startPower) {\n  // 1. declare a variable named \"power\" with let, set it to startPower\n  // 2. add 5 to power\n  // 3. return power\n\n}",
      "mode": "function",
      "entry": "castLight",
      "tests": [
        {
          "args": [
            10
          ],
          "expect": 15,
          "desc": "castLight(10) should return 15",
          "teach": "If you got undefined, your function computed power but never handed it back -- check for a missing return."
        },
        {
          "args": [
            0
          ],
          "expect": 5,
          "desc": "castLight(0) should return 5",
          "teach": "If castLight(10) passed but this fails, make sure you are adding 5 to startPower itself, not a hardcoded number."
        },
        {
          "args": [
            -5
          ],
          "expect": 0,
          "desc": "castLight(-5) should return 0",
          "teach": "Make sure you are reassigning power (power = power + 5), not declaring a second variable with the same name."
        }
      ],
      "solution": "function castLight(startPower) {\n  let power = startPower;\n  power = power + 5;\n  return power;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Every spell in Syntaxia needs somewhere to keep its power while the spell runs. The <code>let</code> keyword creates exactly that: a named box you can put a value into, and change later. It is the most basic tool a code-mage owns, and you will reach for it constantly.</p><p>Unlike a fixed rune carved in stone, a <code>let</code> variable is meant to shift. Declare it once, then reassign it as many times as your logic needs -- no ceremony required for the later changes.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let power = 10;\npower = power + 5;\nconsole.log(power); // 15</code></pre><p>Line 1 creates a variable named <code>power</code> and stores 10 in it. Line 2 does not create anything new -- notice there is no <code>let</code> the second time -- it reaches into the box that already exists and overwrites it with <code>power + 5</code>, which is 15. Line 3 simply prints whatever the box currently holds, so 15 appears.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A common wrong belief: \"I have to write <code>let</code> every time I touch this variable.\" Try it and JavaScript stops you cold:</p><pre><code>let power = 10;\nlet power = power + 5; // SyntaxError: Identifier 'power' has already been declared</code></pre><p>You can only declare a name with <code>let</code> once per scope. Every change after that first declaration is a plain assignment -- just <code>power = power + 5;</code>, with no keyword in front.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>Time to cast this yourself. <code>castLight</code> takes a starting power and needs to turn it into a slightly stronger one, then hand that number back to whoever called it.</p><ol><li>Declare a variable named <code>power</code> with <code>let</code>, set to <code>startPower</code>.</li><li>Add 5 to <code>power</code>.</li><li>Return <code>power</code>.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Before you write a single spell of your own, predict what the console shows.",
        "code": "let power = 4;\npower = power + 6;\nconsole.log(power);",
        "choices": [
          "10",
          "4",
          "46",
          "undefined"
        ],
        "answer": 0,
        "explain": "power is reassigned to 4 + 6 before the log runs, so 10 prints. Picking 4 assumes the reassignment on line 2 never took effect; 46 confuses numeric + with string concatenation; undefined confuses a variable's current value with a function's missing return."
      }
    },
    {
      "id": "act1-const",
      "act": 1,
      "title": "The Unbreakable Oath: const",
      "concept": "const locks a value in place -- reassigning it throws an error.",
      "prereq": [
        "act1-let"
      ],
      "xp": 20,
      "lesson": "<p><code>const</code> also creates a variable, but it locks the value in place. Try to reassign a <code>const</code> and JavaScript throws a <code>TypeError</code>.</p><pre><code>const rune = \"fire\";\nrune = \"ice\"; // TypeError: Assignment to constant variable.</code></pre><p>Use <code>const</code> by default for values that should never change. Reach for <code>let</code> only when you know a value must be updated.</p><p>A well-guarded mage catches errors instead of letting a spell crash. A <code>try</code>/<code>catch</code> block lets you attempt something risky and recover if it fails:</p><pre><code>try {\n  riskySpell();\n} catch (err) {\n  console.log(err.name);\n}</code></pre>",
      "hints": [
        "Inside the try block, write `rune = \"ice\";` -- this is the line that will fail.",
        "In the catch block, `err` is the caught error object. Its `.name` property holds the error type as a string.",
        "Return `err.name` from inside the catch block so sealRune() gives back \"TypeError\"."
      ],
      "starter": "function sealRune() {\n  const rune = \"fire\";\n  try {\n    // attempt to reassign rune to \"ice\" here\n\n  } catch (err) {\n    // return err.name here\n\n  }\n}",
      "mode": "function",
      "entry": "sealRune",
      "tests": [
        {
          "args": [],
          "expect": "TypeError",
          "desc": "sealRune() should return \"TypeError\" when the reassignment fails",
          "teach": "If you got the rune's actual value back instead of an error name, the reassignment did not throw -- check rune was declared with const, not let."
        }
      ],
      "solution": "function sealRune() {\n  const rune = \"fire\";\n  try {\n    rune = \"ice\";\n    return rune;\n  } catch (err) {\n    return err.name;\n  }\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p><code>const</code> also creates a variable, but it binds the value in place like an unbreakable oath. Try to reassign a <code>const</code> and JavaScript refuses, throwing a <code>TypeError</code> instead of quietly going along with it.</p><p>Reach for <code>const</code> by default, for anything that should never change after it is set. Only switch to <code>let</code> once you know a value genuinely needs to be updated later.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const rune = \"fire\";\nrune = \"ice\"; // TypeError: Assignment to constant variable.</code></pre><p>Line 1 binds <code>rune</code> to \"fire\" permanently. Line 2 attempts to overwrite it, and JavaScript throws before the change can happen -- <code>rune</code> never actually becomes \"ice\". A guarded mage catches errors like this instead of letting a spell crash outright:</p><pre><code>try {\n  riskySpell();\n} catch (err) {\n  console.log(err.name);\n}</code></pre><p>The <code>try</code> block attempts something risky; if it throws, control jumps straight into <code>catch</code>, where <code>err</code> is the caught error object and <code>err.name</code> is a string naming the error type.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Many learners assume <code>const</code> freezes the entire value, contents and all. It does not -- it only locks the <em>binding</em>, meaning you cannot point the name at a different value.</p><pre><code>const list = [1, 2];\nlist.push(3);   // works! list is now [1, 2, 3]\nlist = [4, 5];   // TypeError -- THIS is blocked</code></pre><p>Mutating what is inside an array or object stored in a <code>const</code> is fine. Rebinding the variable itself to a brand-new value is what throws.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>Bring the oath and the safety net together. <code>sealRune</code> needs to attempt the forbidden reassignment, then recover gracefully instead of letting the whole function crash.</p><ol><li>Inside the <code>try</code> block, attempt to reassign <code>rune</code> to \"ice\".</li><li>In the <code>catch</code> block, catch the error as <code>err</code>.</li><li>Return <code>err.name</code> so <code>sealRune()</code> gives back \"TypeError\".</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Predict exactly what gets logged.",
        "code": "const spell = \"spark\";\ntry {\n  spell = \"blast\";\n} catch (err) {\n  console.log(err.name);\n}",
        "choices": [
          "TypeError",
          "spark",
          "blast",
          "undefined"
        ],
        "answer": 0,
        "explain": "Reassigning a const throws before spell ever changes, and the catch block logs the error's name, TypeError. Picking \"spark\" assumes the throw silently aborts without running the catch's log; \"blast\" assumes the reassignment quietly succeeds instead of throwing."
      }
    },
    {
      "id": "act1-numbers",
      "act": 1,
      "title": "Arithmetic of the Arcane",
      "concept": "Numbers support +, -, *, /, % (remainder), and ** (exponent).",
      "prereq": [
        "act1-let"
      ],
      "xp": 25,
      "lesson": "<p>Numbers in JavaScript support the usual arithmetic: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and two you might not know yet -- <code>%</code> (remainder) and <code>**</code> (exponent).</p><pre><code>let a = 7 % 3;   // 1  (7 divided by 3 leaves remainder 1)\nlet b = 2 ** 5;  // 32 (2 to the power of 5)</code></pre><p><code>%</code> is especially useful for wrapping a value back into a range -- like keeping a potion power between 0 and 99.</p>",
      "hints": [
        "Double the strength with `strength * 2`.",
        "Add herbs to that doubled value, then use `% 100` to wrap it into range.",
        "Full formula: `(strength * 2 + herbs) % 100`."
      ],
      "starter": "function brewPotion(strength, herbs) {\n  // 1. double the strength\n  // 2. add the herbs\n  // 3. wrap the total with % 100 so it never reaches 100\n  // 4. return the result\n\n}",
      "mode": "assert",
      "entry": "brewPotion",
      "tests": [
        {
          "assert": "return entry(10, 5) === 25;",
          "desc": "brewPotion(10, 5) equals 25",
          "teach": "If you are off, double check you multiplied strength by 2 before adding herbs, not the other way around."
        },
        {
          "assert": "return entry(60, 50) === 70;",
          "desc": "brewPotion(60, 50) equals 70",
          "teach": "This checks that % wraps a large total down into range -- getting 170 back means you skipped the % 100 step."
        },
        {
          "assert": "var r = entry(200, 300); return r >= 0 && r <= 99;",
          "desc": "brewPotion(200, 300) stays wrapped between 0 and 99",
          "teach": "If this fails, your result went negative or over 99 -- % should keep it wrapped no matter how big the inputs get."
        }
      ],
      "solution": "function brewPotion(strength, herbs) {\n  const total = strength * 2 + herbs;\n  return total % 100;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Numbers in JavaScript support the arithmetic you already know -- <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> -- plus two you might not: <code>%</code> (remainder) and <code>**</code> (exponent). Both show up constantly once you start building game-style math.</p><p><code>%</code> is especially handy for wrapping a value back into a range, like keeping a potion's power between 0 and 99 no matter how big the ingredients pushed it.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let a = 7 % 3;   // 1  (7 divided by 3 leaves remainder 1)\nlet b = 2 ** 5;  // 32 (2 to the power of 5)</code></pre><p>Line 1 divides 7 by 3, giving a quotient of 2 with 1 left over -- that leftover is what <code>%</code> returns. Line 2 multiplies 2 by itself 5 times (2 x 2 x 2 x 2 x 2), landing on 32.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>A dangerous belief: \"decimal arithmetic in JavaScript is always exact.\" It is not -- numbers are stored as binary floating point, and most decimals cannot be represented perfectly.</p><pre><code>console.log(0.1 + 0.2);          // 0.30000000000000004\nconsole.log(0.1 + 0.2 === 0.3); // false</code></pre><p>Tiny rounding errors creep in during ordinary decimal math. For money or precise decimals, round explicitly or work in whole units (like cents) instead of comparing floats directly with <code>===</code>.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>Time to brew. <code>brewPotion</code> combines both operators from above into one formula that keeps a potion's strength properly in range.</p><ol><li>Double the <code>strength</code>.</li><li>Add <code>herbs</code> to that doubled value.</li><li>Wrap the total with <code>% 100</code> so it never reaches 100.</li><li>Return the result.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Two operators, one line -- what does the console show?",
        "code": "let x = 10 % 4;\nlet y = 3 ** 2;\nconsole.log(x + y);",
        "choices": [
          "11",
          "11.5",
          "8",
          "19"
        ],
        "answer": 0,
        "explain": "10 % 4 leaves a remainder of 2, and 3 ** 2 is 3 squared, 9 -- so 2 + 9 = 11. 11.5 comes from treating % as ordinary division (10 / 4 = 2.5); 8 comes from treating ** as multiplication (3 * 2 = 6) instead of exponentiation."
      }
    },
    {
      "id": "act1-strings",
      "act": 1,
      "title": "Words of Power: Strings & Concatenation",
      "concept": "Join strings together with the + operator.",
      "prereq": [
        "act1-numbers"
      ],
      "xp": 20,
      "lesson": "<p>Strings can be joined together with the <code>+</code> operator. This is called <strong>concatenation</strong>.</p><pre><code>let hello = \"Hello, \" + \"world\" + \"!\";\nconsole.log(hello); // \"Hello, world!\"</code></pre><p>You can mix variables and literal text this way, as long as everything being joined with <code>+</code> is a string.</p>",
      "hints": [
        "Start with the caster variable, then `+ \" casts \"`.",
        "Add the spell variable next, then finish with `+ \"!\"`.",
        "Full expression: `caster + \" casts \" + spell + \"!\"`, printed with console.log."
      ],
      "starter": "let caster = \"Ismet\";\nlet spell = \"Fireball\";\n// use console.log with + concatenation to print exactly:\n// Ismet casts Fireball!\n",
      "mode": "output",
      "entry": "",
      "tests": [
        {
          "expectOutput": [
            "Ismet casts Fireball!"
          ],
          "desc": "logs exactly \"Ismet casts Fireball!\"",
          "teach": "If your output does not match exactly, check for a missing space, wrong capitalization, or an extra console.log call -- this compares the printed text character for character."
        }
      ],
      "solution": "let caster = \"Ismet\";\nlet spell = \"Fireball\";\nconsole.log(caster + \" casts \" + spell + \"!\");",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Strings can be joined together with the <code>+</code> operator, a process called <strong>concatenation</strong>. It works the same whether you are joining literal text, variables, or a mix of both, as long as everything on both sides of a <code>+</code> ends up being a string.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let hello = \"Hello, \" + \"world\" + \"!\";\nconsole.log(hello); // \"Hello, world!\"</code></pre><p>Each <code>+</code> glues the piece on its left to the piece on its right, working strictly left to right. By the time all three pieces are joined, you are left with one continuous string: \"Hello, world!\".</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p><code>+</code> is overloaded -- the moment a string shows up anywhere in a chain, everything after it concatenates instead of adding numerically:</p><pre><code>console.log(\"Score: \" + 5 + 5); // \"Score: 55\", not \"Score: 10\"</code></pre><p>JavaScript evaluates left to right: <code>\"Score: \" + 5</code> becomes the string \"Score: 5\" first, so the following <code>+ 5</code> appends another character instead of adding numbers. Once a string enters the chain, every operand after it converts to text.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>Put concatenation to work on a real greeting, gluing four separate pieces into one exact sentence.</p><ol><li>Start with <code>caster</code>, then concatenate <code>\" casts \"</code>.</li><li>Add <code>spell</code>.</li><li>Add <code>\"!\"</code>.</li><li>Print the result with <code>console.log</code> so the output reads exactly \"Ismet casts Fireball!\".</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Predict the printed line.",
        "code": "let a = \"Level \" + 2 + 3;\nconsole.log(a);",
        "choices": [
          "Level 23",
          "Level 5",
          "NaN"
        ],
        "answer": 0,
        "explain": "Once + hits a string, everything after it concatenates left to right: \"Level \" + 2 becomes \"Level 2\", then + 3 appends onto that to give \"Level 23\". \"Level 5\" assumes 2 and 3 add together first, but the string arrives before that can happen."
      }
    },
    {
      "id": "act1-templates",
      "act": 1,
      "title": "Runic Templates: Template Literals",
      "concept": "Backtick strings can embed variables directly with ${...}.",
      "prereq": [
        "act1-strings"
      ],
      "xp": 30,
      "lesson": "<p>Template literals use backticks (<code>`</code>) instead of quotes, and let you drop variables straight into the text with <code>${...}</code>.</p><pre><code>let name = \"Ismet\";\nlet power = 42;\nconsole.log(`${name} channels ${power} mana!`);\n// \"Ismet channels 42 mana!\"</code></pre><p>No more <code>+</code> chains -- template literals are usually easier to read, and they also support multiple lines directly.</p>",
      "hints": [
        "Wrap the whole return value in backticks, not quotes.",
        "Insert a variable with `${power}` directly inside the backtick string.",
        "Full expression: backtick, then ${name} channels ${power} mana!, then backtick."
      ],
      "starter": "function chant(name, power) {\n  // return a template literal:\n  // `${name} channels ${power} mana!`\n\n}",
      "mode": "function",
      "entry": "chant",
      "tests": [
        {
          "args": [
            "Ismet",
            42
          ],
          "expect": "Ismet channels 42 mana!",
          "desc": "chant(\"Ismet\", 42) returns \"Ismet channels 42 mana!\"",
          "teach": "Check that both name and power are wrapped in ${} inside the backticks -- a bare variable name outside ${} prints as literal text."
        },
        {
          "args": [
            "Nyx",
            0
          ],
          "expect": "Nyx channels 0 mana!",
          "desc": "chant(\"Nyx\", 0) returns \"Nyx channels 0 mana!\"",
          "teach": "Zero is a real value, not a missing one -- make sure ${power} still renders 0 instead of being skipped or replaced."
        }
      ],
      "solution": "function chant(name, power) {\n  return `${name} channels ${power} mana!`;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>Template literals use backticks (<code>`</code>) instead of quotes, and let you drop variables straight into the text with <code>${...}</code>. No more chaining <code>+</code> over and over -- they are usually easier to read, and they also support multiple lines directly, without any special escaping.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>let name = \"Ismet\";\nlet power = 42;\nconsole.log(`${name} channels ${power} mana!`);\n// \"Ismet channels 42 mana!\"</code></pre><p>The backtick string is one continuous piece of text. Wherever <code>${...}</code> appears, JavaScript evaluates the expression inside and drops its value directly into that spot, converting it to a string automatically.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Forgetting the <code>${}</code> wrapper is an easy slip -- a bare variable name inside backticks is just literal text, not an interpolation:</p><pre><code>console.log(`name channels power mana!`);\n// \"name channels power mana!\" -- plain text, NOT the variables' values</code></pre><p>Interpolation only happens inside <code>${...}</code>. Anything else inside the backticks, including a variable's bare name, prints exactly as typed.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>Rewrite that same kind of greeting using a template literal this time, so both variables land in exactly the right spots.</p><ol><li>Return a template literal (backtick-delimited string).</li><li>Insert <code>name</code> with <code>${name}</code>.</li><li>Insert <code>power</code> with <code>${power}</code>, matching the exact wording shown in the starter comment.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "One variable is interpolated, one is not -- which is which?",
        "code": "let title = \"Mage\";\nconsole.log(`title reaches level ${1 + 1}`);",
        "choices": [
          "title reaches level 2",
          "Mage reaches level 2",
          "title reaches level 11"
        ],
        "answer": 0,
        "explain": "\"title\" has no ${} around it, so it prints as the literal word \"title\", not the value stored in the title variable; only ${1 + 1} is evaluated, giving 2. \"Mage reaches level 2\" assumes bare words auto-interpolate, which they never do."
      }
    },
    {
      "id": "act1-boss",
      "act": 1,
      "title": "Boss: The Warden of Types",
      "concept": "Combine let, const, arithmetic and template literals.",
      "prereq": [
        "act1-const",
        "act1-templates"
      ],
      "xp": 70,
      "lesson": "<p>The Warden of Types guards the way out of the Plains. Combine everything you have learned: <code>const</code> for a value that never changes, <code>let</code> for one that does, arithmetic, and a template literal to speak the final incantation.</p><pre><code>const title = \"Archmage\";\nlet totalPower = 10;\ntotalPower = totalPower + 4;\nconsole.log(`${title} wields ${totalPower} power!`);</code></pre>",
      "hints": [
        "Start with `const title = \"Archmage\";` -- it never changes.",
        "Use `let totalPower = power;` then reassign it: `totalPower = totalPower + shield * 2;`.",
        "Finish with a template literal: backtick, ${title} ${name} wields ${totalPower} power!, backtick."
      ],
      "starter": "function forgeIncantation(name, power, shield) {\n  // 1. declare a const named \"title\" set to \"Archmage\"\n  // 2. declare a let named \"totalPower\" set to power\n  // 3. add (shield * 2) to totalPower\n  // 4. return a template literal:\n  //    `${title} ${name} wields ${totalPower} power!`\n\n}",
      "mode": "function",
      "entry": "forgeIncantation",
      "tests": [
        {
          "args": [
            "Ismet",
            10,
            5
          ],
          "expect": "Archmage Ismet wields 20 power!",
          "desc": "forgeIncantation(\"Ismet\", 10, 5) returns \"Archmage Ismet wields 20 power!\"",
          "teach": "Check operator precedence: shield should be multiplied by 2 before being added to totalPower, not the other way around."
        },
        {
          "args": [
            "Nyx",
            0,
            0
          ],
          "expect": "Archmage Nyx wields 0 power!",
          "desc": "forgeIncantation(\"Nyx\", 0, 0) returns \"Archmage Nyx wields 0 power!\"",
          "teach": "Zero values should still appear in the final sentence -- make sure your template literal does not accidentally skip them."
        },
        {
          "args": [
            "Zed",
            7,
            3
          ],
          "expect": "Archmage Zed wields 13 power!",
          "desc": "forgeIncantation(\"Zed\", 7, 3) returns \"Archmage Zed wields 13 power!\"",
          "teach": "If the number is off, retrace totalPower step by step: start at power, then add shield * 2, and verify each intermediate value."
        }
      ],
      "solution": "function forgeIncantation(name, power, shield) {\n  const title = \"Archmage\";\n  let totalPower = power;\n  totalPower = totalPower + shield * 2;\n  return `${title} ${name} wields ${totalPower} power!`;\n}",
      "steps": [
        {
          "title": "The Idea",
          "body": "<p>The Warden of Types guards the way out of the Plains, and beating it means combining everything Act 1 taught: <code>const</code> for a value that never changes, <code>let</code> for one that does, arithmetic to compute it, and a template literal to speak the final incantation.</p>"
        },
        {
          "title": "Watch It Work",
          "body": "<pre><code>const title = \"Archmage\";\nlet totalPower = 10;\ntotalPower = totalPower + 4;\nconsole.log(`${title} wields ${totalPower} power!`);</code></pre><p><code>title</code> is locked at \"Archmage\" forever via <code>const</code>. <code>totalPower</code> starts at 10 via <code>let</code>, then gets reassigned to 10 + 4 = 14 -- perfectly legal, since <code>let</code> permits reassignment. The template literal on the last line drops both current values straight into the sentence.</p>"
        },
        {
          "title": "The Classic Trap",
          "body": "<p>Mixing up operator precedence is the classic slip here -- <code>shield * 2</code> must happen before it is added to <code>power</code>, and stray parentheses can silently change that:</p><pre><code>let totalPower = (power + shield) * 2; // WRONG -- multiplies power too!</code></pre><p>JavaScript already applies <code>*</code> before <code>+</code>, so <code>power + shield * 2</code> means exactly <code>power + (shield * 2)</code> without needing any parentheses at all. Adding your own in the wrong place changes the math entirely.</p>"
        },
        {
          "title": "Your Task",
          "body": "<p>Bring every tool from this act together, in the exact order the Warden expects.</p><ol><li>Declare <code>const title = \"Archmage\"</code>.</li><li>Declare <code>let totalPower = power</code>.</li><li>Add <code>shield * 2</code> to <code>totalPower</code>.</li><li>Return a template literal matching the exact format shown in the starter.</li></ol>"
        }
      ],
      "checkpoint": {
        "prompt": "Predict the final line the console prints.",
        "code": "const label = \"Result\";\nlet n = 5;\nn = n + 3 * 2;\nconsole.log(`${label}: ${n}`);",
        "choices": [
          "Result: 11",
          "Result: 16",
          "Result: 13"
        ],
        "answer": 0,
        "explain": "* runs before + due to operator precedence, so 3 * 2 = 6 first, then 5 + 6 = 11. \"Result: 16\" comes from computing (5 + 3) * 2 instead, as if addition happened first."
      }
    }
    // === EXTRA ACTS APPENDED BELOW ===
  ];

  window.SYNTAXIA_CONTENT = { acts: acts, quests: quests };
})();
