// Syntaxia content data.
// window.SYNTAXIA_CONTENT = { acts: [Act], quests: [Quest] }
// See README.md for the full schema. Act 1 lives here; later acts get appended
// after the marked lines below, both inside `acts` and inside `quests`.
(function () {
  var acts = [
    {
      id: 1,
      name: 'The Plains of Declaration',
      theme: 'Variables & Types',
      blurb: 'Where every mage learns to name their power.',
      accent: '#6fe3a6'
    }
    // === EXTRA ACTS APPENDED BELOW ===
  ];

  var quests = [
    {
      id: 'act1-let',
      act: 1,
      title: 'First Words: let',
      concept: 'Declare a variable with let and change its value.',
      prereq: [],
      xp: 15,
      lesson: '<p>In Syntaxia, every spell needs a place to store its power. The <code>let</code> keyword creates a variable you can change later.</p>' +
        '<pre><code>let power = 10;\npower = power + 5;\nconsole.log(power); // 15</code></pre>' +
        '<p>Unlike a fixed rune, a <code>let</code> variable can be reassigned as many times as your spell needs. Use it whenever a value will change while your code runs.</p>' +
        '<ul><li>Declare once with <code>let name = value;</code></li><li>Reassign later with <code>name = newValue;</code> (no <code>let</code> the second time)</li></ul>',
      hints: [
        'Declare with `let power = startPower;` first.',
        'Reassign it with `power = power + 5;` -- you can also write this as `power += 5;`.',
        'Do not forget the `return power;` at the end, or your spell will return nothing (`undefined`).'
      ],
      starter: 'function castLight(startPower) {\n  // 1. declare a variable named "power" with let, set it to startPower\n  // 2. add 5 to power\n  // 3. return power\n\n}',
      mode: 'function',
      entry: 'castLight',
      tests: [
        { args: [10], expect: 15, desc: 'castLight(10) should return 15' },
        { args: [0], expect: 5, desc: 'castLight(0) should return 5' },
        { args: [-5], expect: 0, desc: 'castLight(-5) should return 0' }
      ],
      solution: 'function castLight(startPower) {\n  let power = startPower;\n  power = power + 5;\n  return power;\n}'
    },
    {
      id: 'act1-const',
      act: 1,
      title: 'The Unbreakable Oath: const',
      concept: 'const locks a value in place -- reassigning it throws an error.',
      prereq: ['act1-let'],
      xp: 20,
      lesson: '<p><code>const</code> also creates a variable, but it locks the value in place. Try to reassign a <code>const</code> and JavaScript throws a <code>TypeError</code>.</p>' +
        '<pre><code>const rune = "fire";\nrune = "ice"; // TypeError: Assignment to constant variable.</code></pre>' +
        '<p>Use <code>const</code> by default for values that should never change. Reach for <code>let</code> only when you know a value must be updated.</p>' +
        '<p>A well-guarded mage catches errors instead of letting a spell crash. A <code>try</code>/<code>catch</code> block lets you attempt something risky and recover if it fails:</p>' +
        '<pre><code>try {\n  riskySpell();\n} catch (err) {\n  console.log(err.name);\n}</code></pre>',
      hints: [
        'Inside the try block, write `rune = "ice";` -- this is the line that will fail.',
        'In the catch block, `err` is the caught error object. Its `.name` property holds the error type as a string.',
        'Return `err.name` from inside the catch block so sealRune() gives back "TypeError".'
      ],
      starter: 'function sealRune() {\n  const rune = "fire";\n  try {\n    // attempt to reassign rune to "ice" here\n\n  } catch (err) {\n    // return err.name here\n\n  }\n}',
      mode: 'function',
      entry: 'sealRune',
      tests: [
        { args: [], expect: 'TypeError', desc: 'sealRune() should return "TypeError" when the reassignment fails' }
      ],
      solution: 'function sealRune() {\n  const rune = "fire";\n  try {\n    rune = "ice";\n    return rune;\n  } catch (err) {\n    return err.name;\n  }\n}'
    },
    {
      id: 'act1-numbers',
      act: 1,
      title: 'Arithmetic of the Arcane',
      concept: 'Numbers support +, -, *, /, % (remainder), and ** (exponent).',
      prereq: ['act1-let'],
      xp: 25,
      lesson: '<p>Numbers in JavaScript support the usual arithmetic: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and two you might not know yet -- <code>%</code> (remainder) and <code>**</code> (exponent).</p>' +
        '<pre><code>let a = 7 % 3;   // 1  (7 divided by 3 leaves remainder 1)\nlet b = 2 ** 5;  // 32 (2 to the power of 5)</code></pre>' +
        '<p><code>%</code> is especially useful for wrapping a value back into a range -- like keeping a potion power between 0 and 99.</p>',
      hints: [
        'Double the strength with `strength * 2`.',
        'Add herbs to that doubled value, then use `% 100` to wrap it into range.',
        'Full formula: `(strength * 2 + herbs) % 100`.'
      ],
      starter: 'function brewPotion(strength, herbs) {\n  // 1. double the strength\n  // 2. add the herbs\n  // 3. wrap the total with % 100 so it never reaches 100\n  // 4. return the result\n\n}',
      mode: 'assert',
      entry: 'brewPotion',
      tests: [
        { assert: 'return entry(10, 5) === 25;', desc: 'brewPotion(10, 5) equals 25' },
        { assert: 'return entry(60, 50) === 70;', desc: 'brewPotion(60, 50) equals 70' },
        { assert: 'var r = entry(200, 300); return r >= 0 && r <= 99;', desc: 'brewPotion(200, 300) stays wrapped between 0 and 99' }
      ],
      solution: 'function brewPotion(strength, herbs) {\n  const total = strength * 2 + herbs;\n  return total % 100;\n}'
    },
    {
      id: 'act1-strings',
      act: 1,
      title: 'Words of Power: Strings & Concatenation',
      concept: 'Join strings together with the + operator.',
      prereq: ['act1-numbers'],
      xp: 20,
      lesson: '<p>Strings can be joined together with the <code>+</code> operator. This is called <strong>concatenation</strong>.</p>' +
        '<pre><code>let hello = "Hello, " + "world" + "!";\nconsole.log(hello); // "Hello, world!"</code></pre>' +
        '<p>You can mix variables and literal text this way, as long as everything being joined with <code>+</code> is a string.</p>',
      hints: [
        'Start with the caster variable, then `+ " casts "`.',
        'Add the spell variable next, then finish with `+ "!"`.',
        'Full expression: `caster + " casts " + spell + "!"`, printed with console.log.'
      ],
      starter: 'let caster = "Ismet";\nlet spell = "Fireball";\n// use console.log with + concatenation to print exactly:\n// Ismet casts Fireball!\n',
      mode: 'output',
      entry: '',
      tests: [
        { expectOutput: ['Ismet casts Fireball!'], desc: 'logs exactly "Ismet casts Fireball!"' }
      ],
      solution: 'let caster = "Ismet";\nlet spell = "Fireball";\nconsole.log(caster + " casts " + spell + "!");'
    },
    {
      id: 'act1-templates',
      act: 1,
      title: 'Runic Templates: Template Literals',
      concept: 'Backtick strings can embed variables directly with ${...}.',
      prereq: ['act1-strings'],
      xp: 30,
      lesson: '<p>Template literals use backticks (<code>`</code>) instead of quotes, and let you drop variables straight into the text with <code>${...}</code>.</p>' +
        '<pre><code>let name = "Ismet";\nlet power = 42;\nconsole.log(`${name} channels ${power} mana!`);\n// "Ismet channels 42 mana!"</code></pre>' +
        '<p>No more <code>+</code> chains -- template literals are usually easier to read, and they also support multiple lines directly.</p>',
      hints: [
        'Wrap the whole return value in backticks, not quotes.',
        'Insert a variable with `${power}` directly inside the backtick string.',
        'Full expression: backtick, then ${name} channels ${power} mana!, then backtick.'
      ],
      starter: 'function chant(name, power) {\n  // return a template literal:\n  // `${name} channels ${power} mana!`\n\n}',
      mode: 'function',
      entry: 'chant',
      tests: [
        { args: ['Ismet', 42], expect: 'Ismet channels 42 mana!', desc: 'chant("Ismet", 42) returns "Ismet channels 42 mana!"' },
        { args: ['Nyx', 0], expect: 'Nyx channels 0 mana!', desc: 'chant("Nyx", 0) returns "Nyx channels 0 mana!"' }
      ],
      solution: 'function chant(name, power) {\n  return `${name} channels ${power} mana!`;\n}'
    },
    {
      id: 'act1-boss',
      act: 1,
      title: 'Boss: The Warden of Types',
      concept: 'Combine let, const, arithmetic and template literals.',
      prereq: ['act1-const', 'act1-templates'],
      xp: 70,
      lesson: '<p>The Warden of Types guards the way out of the Plains. Combine everything you have learned: <code>const</code> for a value that never changes, <code>let</code> for one that does, arithmetic, and a template literal to speak the final incantation.</p>' +
        '<pre><code>const title = "Archmage";\nlet totalPower = 10;\ntotalPower = totalPower + 4;\nconsole.log(`${title} wields ${totalPower} power!`);</code></pre>',
      hints: [
        'Start with `const title = "Archmage";` -- it never changes.',
        'Use `let totalPower = power;` then reassign it: `totalPower = totalPower + shield * 2;`.',
        'Finish with a template literal: backtick, ${title} ${name} wields ${totalPower} power!, backtick.'
      ],
      starter: 'function forgeIncantation(name, power, shield) {\n  // 1. declare a const named "title" set to "Archmage"\n  // 2. declare a let named "totalPower" set to power\n  // 3. add (shield * 2) to totalPower\n  // 4. return a template literal:\n  //    `${title} ${name} wields ${totalPower} power!`\n\n}',
      mode: 'function',
      entry: 'forgeIncantation',
      tests: [
        { args: ['Ismet', 10, 5], expect: 'Archmage Ismet wields 20 power!', desc: 'forgeIncantation("Ismet", 10, 5) returns "Archmage Ismet wields 20 power!"' },
        { args: ['Nyx', 0, 0], expect: 'Archmage Nyx wields 0 power!', desc: 'forgeIncantation("Nyx", 0, 0) returns "Archmage Nyx wields 0 power!"' },
        { args: ['Zed', 7, 3], expect: 'Archmage Zed wields 13 power!', desc: 'forgeIncantation("Zed", 7, 3) returns "Archmage Zed wields 13 power!"' }
      ],
      solution: 'function forgeIncantation(name, power, shield) {\n  const title = "Archmage";\n  let totalPower = power;\n  totalPower = totalPower + shield * 2;\n  return `${title} ${name} wields ${totalPower} power!`;\n}'
    }
    // === EXTRA ACTS APPENDED BELOW ===
  ];

  window.SYNTAXIA_CONTENT = { acts: acts, quests: quests };
})();
