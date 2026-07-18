// Syntaxia glossary — click-a-word vocabulary for JS learners.
// English only, on purpose: this explains English programming vocabulary.
window.SYNTAXIA_GLOSSARY = {
  terms: [
    {
      id: "variable",
      term: "variable",
      aliases: ["variables"],
      short: `A named box that holds a value so you can use it again later instead of retyping it.`,
      more: `A variable is a name bound to a value in memory. In JS you create one with let, const, or var, and the name can later be used anywhere that binding is in scope.`,
      example: `let score = 0;
score = score + 10;
console.log(score); // 10`
    },
    {
      id: "declaration",
      term: "declaration",
      aliases: ["declare", "declaring"],
      short: `The moment you introduce a new variable or function name to the program, before you necessarily give it a value.`,
      more: `A declaration reserves a name in the current scope. let and const declare variables; function declares a function. Declaring is different from assigning a value to that name.`,
      example: `let energy; // declaration, no value yet
energy = 100; // assignment`
    },
    {
      id: "assignment",
      term: "assignment",
      aliases: ["assign", "assigning"],
      short: `Putting a value into a variable using the = sign.`,
      more: `Assignment stores a value in a variable's box. The single = is assignment, not to be confused with == or === which compare values. Assignment can happen at declaration or any time after.`,
      example: `let hp = 50;
hp = hp - 5; // reassignment
console.log(hp); // 45`
    },
    {
      id: "let",
      term: "let",
      aliases: [],
      short: `A keyword for declaring a variable that can change later and only exists inside the block where you wrote it.`,
      more: `let creates a block-scoped, reassignable binding, introduced in ES6 to fix the confusing behavior of var. Prefer let over var in modern code.`,
      example: `let torches = 3;
torches = torches - 1;
console.log(torches); // 2`
    },
    {
      id: "const",
      term: "const",
      aliases: ["constant"],
      short: `A keyword for declaring a variable that can never be reassigned after its first value.`,
      more: `const creates a block-scoped binding that cannot be reassigned. Note this only locks the binding, not the contents: an array or object stored in a const can still have its properties changed.`,
      example: `const maxHp = 100;
// maxHp = 200; // TypeError: Assignment to constant variable.
const inventory = [];
inventory.push("sword"); // fine, the array itself still mutates`
    },
    {
      id: "var",
      term: "var",
      aliases: [],
      short: `The old way to declare a variable, from before let and const existed. It ignores block boundaries, which causes bugs.`,
      more: `var is function-scoped (or global-scoped), not block-scoped, and it gets hoisted with an initial value of undefined. Most modern JS avoids var in favor of let and const.`,
      example: `if (true) {
  var leaked = "oops";
}
console.log(leaked); // "oops" — leaked out of the if block`
    },
    {
      id: "scope",
      term: "scope",
      aliases: ["scoping", "scoped"],
      short: `The region of code where a variable name is visible and usable.`,
      more: `Scope determines where a binding can be referenced. JS has global scope, function scope, and (for let/const) block scope. A variable declared inside a scope is invisible outside it.`,
      example: `function castSpell() {
  let power = 10; // only visible inside castSpell
}
// console.log(power); // ReferenceError: power is not defined`
    },
    {
      id: "block",
      term: "block",
      aliases: ["code block"],
      short: `Any chunk of code wrapped in curly braces { }, like the body of an if statement or a loop.`,
      more: `A block groups statements together and creates its own scope for let and const declarations (but not for var). if, for, while, and plain { } all introduce blocks.`,
      example: `{
  let secret = "dragon";
  console.log(secret);
}
// secret does not exist out here`
    },
    {
      id: "hoisting",
      term: "hoisting",
      aliases: ["hoisted"],
      short: `JS's habit of processing variable and function declarations before running the code, so some names exist earlier than you'd expect.`,
      more: `var declarations and function declarations are hoisted to the top of their scope. var is hoisted with value undefined; let and const are hoisted too but stay unusable in a "temporal dead zone" until their line runs.`,
      example: `console.log(name); // undefined, not an error, because var is hoisted
var name = "hero";`
    },
    {
      id: "string",
      term: "string",
      aliases: ["strings"],
      short: `Text data, written between quotes, like a name, a message, or a single letter.`,
      more: `A string is JS's data type for text. It can be written with single quotes, double quotes, or backticks (template literals), and strings support methods like .length, .slice(), and .toUpperCase().`,
      example: `const name = "Aria";
console.log(name.length); // 4
console.log(name.toUpperCase()); // "ARIA"`
    },
    {
      id: "template-literal",
      term: "template literal",
      aliases: ["template literals", "template string", "backtick string"],
      short: `A string written with backticks that can embed variables directly inside it using \${}.`,
      more: `Template literals let you interpolate expressions into a string without gluing pieces together with +, and they can span multiple lines naturally. They are backtick-delimited, not single or double quoted.`,
      example: `const name = "Rin";
const hp = 42;
console.log(\`\${name} has \${hp} HP\`); // "Rin has 42 HP"`
    },
    {
      id: "number",
      term: "number",
      aliases: ["numbers"],
      short: `A numeric value, like 3, -7, or 2.5, that you can do math with.`,
      more: `JS has a single number type covering both integers and decimals (there is no separate int type). Numbers are stored as 64-bit floating point, which is why some decimal math looks slightly off.`,
      example: `const gold = 100;
const price = 19.99;
console.log(gold - price); // 80.01`
    },
    {
      id: "floating-point",
      term: "floating point",
      aliases: ["floating-point", "float"],
      short: `The way computers store decimal numbers, which sometimes makes simple math give a slightly wrong-looking answer.`,
      more: `Floating-point numbers can't represent every decimal exactly in binary, so operations like 0.1 + 0.2 produce tiny rounding errors. This is a property of nearly all programming languages, not a JS bug.`,
      example: `console.log(0.1 + 0.2); // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2)); // "0.30"`
    },
    {
      id: "nan",
      term: "NaN",
      aliases: ["not a number"],
      short: `A special value meaning "this is not a valid number", usually produced by a broken math operation.`,
      more: `NaN stands for Not-a-Number and appears when a numeric operation fails, like dividing 0/0 or parsing "abc" as a number. Oddly, NaN is never equal to itself, so use Number.isNaN() to test for it.`,
      example: `const result = Number("abc");
console.log(result); // NaN
console.log(result === NaN); // false — surprising!
console.log(Number.isNaN(result)); // true`
    },
    {
      id: "boolean",
      term: "boolean",
      aliases: ["booleans", "bool"],
      short: `A value that is either true or false, nothing in between.`,
      more: `Booleans are the data type used for logical decisions, comparisons, and conditions. Every if statement ultimately checks a boolean value.`,
      example: `const isAlive = true;
const hasKey = false;
console.log(isAlive && !hasKey); // true`
    },
    {
      id: "truthy",
      term: "truthy",
      aliases: [],
      short: `A value that counts as true when JS needs a yes/no answer, even if it is not literally the boolean true.`,
      more: `In a boolean context (like an if condition), JS converts any value to true or false. Truthy values include non-empty strings, non-zero numbers, and any object or array — even an empty one.`,
      example: `if ("hello") console.log("truthy!"); // runs
if ([]) console.log("empty array is truthy too!"); // also runs`
    },
    {
      id: "falsy",
      term: "falsy",
      aliases: ["falsey"],
      short: `A value that counts as false when JS needs a yes/no answer, even if it is not literally the boolean false.`,
      more: `There are exactly six falsy values in JS: false, 0, "", null, undefined, and NaN. Everything else is truthy, which trips up beginners who assume only false and 0 count.`,
      example: `if (0) console.log("never runs");
if ("") console.log("never runs either");
if ("0") console.log("this runs — non-empty string is truthy!");`
    },
    {
      id: "null",
      term: "null",
      aliases: [],
      short: `A value that deliberately means "nothing here" — you set it yourself to say a variable has no value on purpose.`,
      more: `null represents an intentional absence of value, chosen by the programmer. It differs from undefined, which usually means a value was never set at all. typeof null oddly returns "object", a decades-old JS bug kept for compatibility.`,
      example: `let selectedItem = null; // no item chosen yet
console.log(typeof null); // "object" (a famous quirk)`
    },
    {
      id: "undefined",
      term: "undefined",
      aliases: [],
      short: `The value JS gives a variable automatically when it exists but has never been assigned anything.`,
      more: `undefined is JS's default "no value yet" state: declared-but-unassigned variables, missing function arguments, and missing object properties all read as undefined. It is distinct from null, which is set deliberately.`,
      example: `let x;
console.log(x); // undefined
const obj = {};
console.log(obj.missingProp); // undefined`
    },
    {
      id: "operator",
      term: "operator",
      aliases: ["operators"],
      short: `A symbol that performs an action on values, like + for addition or > for comparison.`,
      more: `Operators combine or compare operands to produce a new value. JS groups them into arithmetic (+ - * /), comparison (== === < >), logical (&& || !), and more.`,
      example: `console.log(3 + 4); // 7, + is an arithmetic operator
console.log(3 > 4); // false, > is a comparison operator`
    },
    {
      id: "comparison",
      term: "comparison",
      aliases: ["comparison operator", "comparing"],
      short: `Checking how two values relate: equal, greater than, less than, and so on, producing a true/false answer.`,
      more: `Comparison operators (==, ===, !=, !==, <, >, <=, >=) always evaluate to a boolean. In JS you almost always want the strict versions, === and !==.`,
      example: `console.log(5 > 3); // true
console.log(5 === "5"); // false, different types`
    },
    {
      id: "strict-equality",
      term: "strict equality",
      aliases: ["===", "triple equals", "strict equals"],
      short: `Comparing two values with === and requiring them to be the exact same type as well as the same value.`,
      more: `=== compares value and type without converting either side, while == first tries to coerce the types to match, producing surprising results. Strict equality is the safer default in almost all JS code.`,
      example: `console.log(5 === 5); // true
console.log(5 === "5"); // false — different types
console.log(5 == "5"); // true — == coerces types, often a bug source`
    },
    {
      id: "logical-operator",
      term: "logical operator",
      aliases: ["logical operators", "&&", "||", "and/or"],
      short: `Symbols like && (and), || (or), and ! (not) that combine or flip true/false values.`,
      more: `&& returns true only if both sides are truthy, || returns true if either side is truthy, and ! flips a value's truthiness. They are used constantly to build conditions out of smaller checks.`,
      example: `const hasKey = true;
const doorLocked = false;
console.log(hasKey && !doorLocked); // true`
    },
    {
      id: "ternary",
      term: "ternary",
      aliases: ["ternary operator", "conditional operator"],
      short: `A compact one-line if/else written as condition ? valueIfTrue : valueIfFalse.`,
      more: `The ternary operator is the only JS operator that takes three operands. It is handy for choosing between two values inline, but nesting several ternaries together quickly becomes hard to read.`,
      example: `const hp = 0;
const status = hp > 0 ? "alive" : "defeated";
console.log(status); // "defeated"`
    },
    {
      id: "condition",
      term: "condition",
      aliases: ["conditional"],
      short: `An expression that evaluates to true or false, used to decide which code runs.`,
      more: `A condition is whatever goes inside the parentheses of an if, while, or ternary — anything JS can convert to true or false to make a branching decision.`,
      example: `const gold = 5;
if (gold > 0) {
  console.log("You can buy something.");
}`
    },
    {
      id: "if-statement",
      term: "if statement",
      aliases: ["if", "if/else", "else if"],
      short: `A block of code that only runs when a given condition is true, optionally with an else for when it is not.`,
      more: `if runs its block when the condition is truthy; an attached else runs instead when it is falsy; else if chains let you check several conditions in order, stopping at the first true one.`,
      example: `const hp = 20;
if (hp <= 0) {
  console.log("defeated");
} else if (hp < 30) {
  console.log("low health!");
} else {
  console.log("fighting fit");
}`
    },
    {
      id: "loop",
      term: "loop",
      aliases: ["loops", "looping"],
      short: `A way to run the same block of code over and over, either a set number of times or until a condition changes.`,
      more: `Loops (for, while, do...while, for...of, for...in) exist so you don't repeat code by hand. Every loop needs some way to eventually stop, or it becomes an infinite loop.`,
      example: `for (let i = 0; i < 3; i++) {
  console.log("tick", i);
}
// tick 0, tick 1, tick 2`
    },
    {
      id: "for-loop",
      term: "for loop",
      aliases: ["for-loop", "for statement"],
      short: `A loop with three parts in its header: a starting point, a condition to keep going, and a step to run after each pass.`,
      more: `for (init; condition; step) runs init once, then repeats: check condition, run the body, run step, and check again. It is the classic choice when you know how many times to repeat, or need an index.`,
      example: `for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}`
    },
    {
      id: "while-loop",
      term: "while loop",
      aliases: ["while", "do-while", "do while"],
      short: `A loop that keeps running its block as long as a condition stays true, checked before each pass.`,
      more: `while (condition) { ... } repeats the block until the condition becomes falsy. Unlike for, it has no built-in counter, so you must update whatever the condition depends on inside the body, or it never ends.`,
      example: `let hp = 3;
while (hp > 0) {
  console.log("still fighting, hp:", hp);
  hp--;
}`
    },
    {
      id: "iteration",
      term: "iteration",
      aliases: ["iterating", "iterate"],
      short: `One full pass through a loop's body, or the general act of repeating something for each item in a collection.`,
      more: `Each time a loop's body runs is called one iteration. "Iterating over an array" means visiting each element in turn, whether with a for loop, for...of, or an array method like .forEach().`,
      example: `const items = ["sword", "shield", "potion"];
for (const item of items) {
  console.log(item); // one iteration per item
}`
    },
    {
      id: "index",
      term: "index",
      aliases: ["indices", "indexing"],
      short: `The numeric position of an item in an array or character in a string, starting from 0.`,
      more: `JS arrays and strings are zero-indexed, meaning the first element is at index 0, not 1. The last valid index of an array is always its length minus 1.`,
      example: `const party = ["knight", "mage", "rogue"];
console.log(party[0]); // "knight" — first item, index 0
console.log(party[2]); // "rogue" — third item, index 2`
    },
    {
      id: "off-by-one",
      term: "off-by-one error",
      aliases: ["off by one", "off-by-one"],
      short: `A common bug where a loop or index runs one time too many or too few, usually from mixing up < and <=, or forgetting arrays start at 0.`,
      more: `Classic causes: looping i <= array.length instead of i < array.length (reading one past the end), or assuming the first item is at index 1. Always double check your boundary condition.`,
      example: `const arr = ["a", "b", "c"];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // a, b, c, undefined — off by one!
}`
    },
    {
      id: "break",
      term: "break",
      aliases: [],
      short: `A keyword that immediately stops the current loop, skipping any remaining iterations.`,
      more: `break exits the nearest enclosing loop (or switch statement) as soon as it runs, without running the rest of that iteration or any future ones. Useful for stopping early once you've found what you need.`,
      example: `for (let i = 0; i < 10; i++) {
  if (i === 3) break;
  console.log(i); // 0, 1, 2, then stops
}`
    },
    {
      id: "continue",
      term: "continue",
      aliases: [],
      short: `A keyword that skips the rest of the current loop iteration and jumps straight to the next one.`,
      more: `Unlike break, continue does not end the loop entirely; it just abandons the current pass early and moves on to check the loop's condition again for the next iteration.`,
      example: `for (let i = 0; i < 5; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i); // 1, 3
}`
    },
    {
      id: "function",
      term: "function",
      aliases: ["functions"],
      short: `A named, reusable block of code that you can run whenever you need it, optionally feeding it inputs and getting a result back.`,
      more: `Functions package up logic so you write it once and call it many times. In JS they can be declared with the function keyword, as arrow functions, or as anonymous expressions, and they are themselves values that can be passed around.`,
      example: `function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("hero")); // "Hello, hero!"`
    },
    {
      id: "parameter",
      term: "parameter",
      aliases: ["parameters"],
      short: `A placeholder name listed in a function's definition that stands in for whatever value gets passed in later.`,
      more: `Parameters are the variables named in a function's declaration (like name in function greet(name)). They are distinct from arguments, which are the actual values supplied when the function is called.`,
      example: `function heal(amount) { // "amount" is the parameter
  return amount * 2;
}`
    },
    {
      id: "argument",
      term: "argument",
      aliases: ["arguments"],
      short: `The actual value you hand to a function when you call it, which fills in one of its parameters.`,
      more: `Arguments are supplied at the call site, in order, matching up with the function's parameters. If you pass fewer arguments than parameters, the missing ones become undefined (unless a default is set).`,
      example: `function heal(amount) { return amount * 2; }
console.log(heal(25)); // 25 is the argument passed in`
    },
    {
      id: "return-value",
      term: "return value",
      aliases: ["return statement", "returning"],
      short: `The result a function sends back to whoever called it, using the return keyword.`,
      more: `A function stops executing as soon as it hits return and hands that value back to the caller. If a function never explicitly returns anything, it returns undefined.`,
      example: `function double(n) {
  return n * 2;
}
const result = double(5);
console.log(result); // 10`
    },
    {
      id: "default-parameter",
      term: "default parameter",
      aliases: ["default parameters", "default argument"],
      short: `A fallback value a parameter uses automatically if no argument is passed for it.`,
      more: `You set a default with = in the function signature: function f(x = 10). The default only kicks in if the argument is missing or explicitly undefined, not for other falsy values like 0 or "".`,
      example: `function greet(name = "adventurer") {
  return \`Welcome, \${name}!\`;
}
console.log(greet()); // "Welcome, adventurer!"`
    },
    {
      id: "arrow-function",
      term: "arrow function",
      aliases: ["arrow functions", "=>", "fat arrow"],
      short: `A shorter way to write a function using =>, often used for quick one-off functions.`,
      more: `Arrow functions (x => x * 2) have concise syntax and, importantly, do not have their own this — they inherit this from the surrounding scope, which makes them useful inside callbacks and methods where regular functions cause this bugs.`,
      example: `const double = x => x * 2;
console.log(double(5)); // 10

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5`
    },
    {
      id: "callback",
      term: "callback",
      aliases: ["callback function", "callbacks"],
      short: `A function you pass into another function so it can be run later, often after some event or task finishes.`,
      more: `Callbacks let you say "do this when you're done" without writing the calling code yourself. They power array methods like .map() and .forEach(), event listeners, and older-style asynchronous code.`,
      example: `function process(items, callback) {
  for (const item of items) callback(item);
}
process(["a", "b"], item => console.log(item));`
    },
    {
      id: "higher-order-function",
      term: "higher-order function",
      aliases: ["higher order function"],
      short: `A function that takes another function as input, returns a function as output, or both.`,
      more: `map, filter, and reduce are all higher-order functions because they accept a callback. Higher-order functions let you reuse general logic (like "do this for every item") while customizing the specific behavior.`,
      example: `function repeat(action, times) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(i => console.log("shot", i), 3);`
    },
    {
      id: "closure",
      term: "closure",
      aliases: ["closures"],
      short: `A function that "remembers" the variables from the place it was created, even after that outer code has finished running.`,
      more: `A closure forms whenever a function is defined inside another function and keeps access to the outer function's variables. The classic gotcha is a loop creating callbacks that all share the same closed-over variable instead of each getting its own — usually fixed by using let instead of var.`,
      example: `function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2 — count was remembered!`
    },
    {
      id: "recursion",
      term: "recursion",
      aliases: ["recursive"],
      short: `A function that solves a problem by calling itself on a smaller version of the same problem.`,
      more: `Every recursive function needs a base case (a condition where it stops calling itself) or it will recurse forever and crash with a stack overflow. Recursion is a natural fit for tree-like or self-similar problems.`,
      example: `function factorial(n) {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1); // recursive case
}
console.log(factorial(5)); // 120`
    },
    {
      id: "array",
      term: "array",
      aliases: ["arrays"],
      short: `An ordered list of values, written in square brackets, that you can loop through, add to, or remove from.`,
      more: `Arrays hold any number of values (even mixed types) in a specific order, accessed by numeric index starting at 0. JS arrays come with many built-in methods like .push(), .map(), and .filter().`,
      example: `const party = ["knight", "mage", "rogue"];
console.log(party.length); // 3
console.log(party[1]); // "mage"`
    },
    {
      id: "element",
      term: "element",
      aliases: ["array element"],
      short: `A single item stored inside an array.`,
      more: `Elements are the individual values that make up an array, each reachable by its index. In a DOM context, "element" instead usually refers to an HTML tag, so watch for that context switch.`,
      example: `const potions = ["health", "mana", "speed"];
console.log(potions[0]); // "health" — the first element`
    },
    {
      id: "method",
      term: "method",
      aliases: ["methods"],
      short: `A function that belongs to an object or value, called with dot notation like value.doSomething().`,
      more: `A method is just a function stored as a property of an object. Array methods like .push() and string methods like .toUpperCase() are the ones learners meet first; inside a method, this usually refers to the object it was called on.`,
      example: `const hero = {
  name: "Rin",
  greet() { return \`I am \${this.name}\`; } // greet is a method
};
console.log(hero.greet());`
    },
    {
      id: "push-pop",
      term: "push / pop",
      aliases: ["push", "pop", "array.push", "array.pop"],
      short: `.push() adds an item to the end of an array; .pop() removes and returns the last item.`,
      more: `Both methods mutate the original array in place rather than returning a new one (unlike .map() or .filter()). They are the simplest way to use an array like a stack.`,
      example: `const bag = ["sword"];
bag.push("shield");
console.log(bag); // ["sword", "shield"]
const removed = bag.pop();
console.log(removed); // "shield"`
    },
    {
      id: "map",
      term: "map",
      aliases: ["array.map", ".map()"],
      short: `An array method that builds a brand new array by transforming every item with a function you give it.`,
      more: `.map() calls your callback once per element and collects the return values into a new array of the same length. It never changes the original array — that is a key difference from .forEach(), which returns nothing.`,
      example: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
console.log(nums); // [1, 2, 3] — unchanged`
    },
    {
      id: "filter",
      term: "filter",
      aliases: ["array.filter", ".filter()"],
      short: `An array method that builds a new array containing only the items that pass a true/false test.`,
      more: `.filter() calls your callback for every element and keeps only the ones where the callback returns a truthy value. Like .map(), it returns a new array and leaves the original untouched.`,
      example: `const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]`
    },
    {
      id: "reduce",
      term: "reduce",
      aliases: ["array.reduce", ".reduce()"],
      short: `An array method that boils a whole array down into a single value, like a sum or a combined object.`,
      more: `.reduce() runs a callback on each element, carrying an "accumulator" forward from one call to the next, and you can seed it with a starting value as the second argument. It is the most flexible but least intuitive of the big three array methods.`,
      example: `const nums = [1, 2, 3, 4];
const total = nums.reduce((sum, n) => sum + n, 0);
console.log(total); // 10`
    },
    {
      id: "object",
      term: "object",
      aliases: ["objects"],
      short: `A collection of related key/value pairs, written in curly braces, used to group data together.`,
      more: `Objects store data as named properties rather than numeric indices. Values can be any type, including functions (making them methods) or other objects, letting you model real-world things naturally.`,
      example: `const hero = {
  name: "Rin",
  hp: 100,
  level: 3
};
console.log(hero.name); // "Rin"`
    },
    {
      id: "property",
      term: "property",
      aliases: ["properties"],
      short: `A named piece of data stored on an object, accessed with dot or bracket notation.`,
      more: `Properties are the key/value pairs that make up an object. You can read or set them with obj.key or obj["key"]; bracket notation is required when the key is stored in a variable or has special characters.`,
      example: `const hero = { name: "Rin", hp: 100 };
console.log(hero.hp); // 100 — dot notation
const key = "name";
console.log(hero[key]); // "Rin" — bracket notation`
    },
    {
      id: "key",
      term: "key",
      aliases: ["keys", "object key"],
      short: `The name half of a key/value pair in an object — the label you use to look up a value.`,
      more: `Object keys are always strings or symbols under the hood (even if you write them as numbers). Object.keys(obj) returns an array of all of an object's key names.`,
      example: `const scores = { alice: 90, bob: 85 };
console.log(Object.keys(scores)); // ["alice", "bob"]`
    },
    {
      id: "value",
      term: "value",
      aliases: ["values"],
      short: `The actual data stored in a variable, array slot, or object property — what a key or name points to.`,
      more: `A value can be any of JS's data types: a number, string, boolean, null, undefined, array, object, or function. Values are what get compared, transformed, and returned.`,
      example: `const scores = { alice: 90 };
console.log(scores.alice); // 90 — the value for key "alice"`
    },
    {
      id: "this",
      term: "this",
      aliases: [],
      short: `A special keyword that refers to "whatever object called this code", and it can change depending on how a function is called.`,
      more: `Inside a regular method, this refers to the object the method was called on. Its value is determined at call time, not definition time, which is why passing a method around loses its this — arrow functions avoid this problem by inheriting this from their enclosing scope instead.`,
      example: `const hero = {
  name: "Rin",
  greet() { return \`I am \${this.name}\`; }
};
console.log(hero.greet()); // "I am Rin"
const loose = hero.greet;
// loose(); // this is no longer hero — likely undefined or an error`
    },
    {
      id: "destructuring",
      term: "destructuring",
      aliases: ["destructure"],
      short: `A shortcut for pulling values out of an array or object straight into their own named variables.`,
      more: `Destructuring uses array [] or object {} pattern syntax on the left of an assignment to unpack multiple values at once, optionally renaming or defaulting them. It is heavily used for function parameters that take an options object.`,
      example: `const hero = { name: "Rin", hp: 100 };
const { name, hp } = hero;
console.log(name, hp); // "Rin" 100

const [first, second] = ["sword", "shield"];
console.log(first); // "sword"`
    },
    {
      id: "spread",
      term: "spread",
      aliases: ["spread operator", "..."],
      short: `Three dots (...) that expand an array or object out into its individual elements or properties.`,
      more: `The spread operator is handy for copying arrays/objects, merging them, or passing an array's items as separate function arguments. Spread only makes a shallow copy — nested objects are still shared by reference.`,
      example: `const base = [1, 2, 3];
const extended = [...base, 4, 5];
console.log(extended); // [1, 2, 3, 4, 5]

const hero = { name: "Rin" };
const withLevel = { ...hero, level: 3 };
console.log(withLevel); // { name: "Rin", level: 3 }`
    },
    {
      id: "rest-parameter",
      term: "rest parameter",
      aliases: ["rest parameters", "rest operator"],
      short: `Three dots (...) used in a function's parameter list to gather any extra arguments into a single array.`,
      more: `Rest parameters look identical to spread but do the opposite job: instead of expanding a collection, they collect loose arguments into one array. A rest parameter must be the last one in the parameter list.`,
      example: `function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10`
    },
    {
      id: "json",
      term: "JSON",
      aliases: ["json"],
      short: `A text format for storing and sending data that looks a lot like a JS object, used everywhere on the web.`,
      more: `JSON (JavaScript Object Notation) is a language-independent text format built on object and array syntax, but its keys must be double-quoted strings and it cannot contain functions. JSON.stringify() converts a JS value to JSON text; JSON.parse() converts it back.`,
      example: `const hero = { name: "Rin", hp: 100 };
const text = JSON.stringify(hero);
console.log(text); // '{"name":"Rin","hp":100}'
const back = JSON.parse(text);
console.log(back.name); // "Rin"`
    },
    {
      id: "class",
      term: "class",
      aliases: ["classes"],
      short: `A blueprint for creating objects that share the same shape and behavior, using the class keyword.`,
      more: `A class defines a constructor and methods that every instance created from it will have. Under the hood, JS classes are built on top of prototypes — they are convenient syntax over the same mechanism, not a separate system.`,
      example: `class Hero {
  constructor(name) {
    this.name = name;
    this.hp = 100;
  }
  attack() { return \`\${this.name} attacks!\`; }
}
const rin = new Hero("Rin");
console.log(rin.attack());`
    },
    {
      id: "constructor",
      term: "constructor",
      aliases: ["constructors"],
      short: `A special method inside a class that runs automatically when you create a new instance, used to set up its starting properties.`,
      more: `The constructor method receives whatever arguments were passed to new ClassName(...) and typically assigns them to this. It runs exactly once, at creation time, for each new instance.`,
      example: `class Potion {
  constructor(healAmount) {
    this.healAmount = healAmount;
  }
}
const small = new Potion(10);
console.log(small.healAmount); // 10`
    },
    {
      id: "prototype",
      term: "prototype",
      aliases: ["prototypes", "prototype chain"],
      short: `The hidden object every JS object links back to, which is where shared methods actually live to save memory.`,
      more: `When you access a property JS can't find directly on an object, it looks up the object's prototype chain until it finds it (or hits null). Class methods are stored on the prototype so every instance shares one copy instead of duplicating the function.`,
      example: `class Hero {
  attack() { return "swing!"; }
}
const a = new Hero();
const b = new Hero();
console.log(a.attack === b.attack); // true — shared via the prototype`
    },
    {
      id: "inheritance",
      term: "inheritance",
      aliases: ["inherit", "extends"],
      short: `Letting one class reuse and build on another class's properties and methods using the extends keyword.`,
      more: `A subclass created with extends automatically gets everything the parent class defines, and can add its own methods or override existing ones. super() inside the subclass's constructor calls the parent's constructor.`,
      example: `class Hero {
  constructor(name) { this.name = name; }
}
class Mage extends Hero {
  castSpell() { return \`\${this.name} casts a spell!\`; }
}
const rin = new Mage("Rin");
console.log(rin.castSpell());`
    },
    {
      id: "instance",
      term: "instance",
      aliases: ["instances", "instantiate"],
      short: `One specific object created from a class, using the new keyword.`,
      more: `Calling new ClassName(...) creates a new instance: a fresh object that has its own copy of the instance properties set in the constructor, but shares methods via the prototype.`,
      example: `class Hero { constructor(name) { this.name = name; } }
const rin = new Hero("Rin"); // rin is an instance of Hero
const finn = new Hero("Finn"); // a separate instance`
    },
    {
      id: "module",
      term: "module",
      aliases: ["modules"],
      short: `A separate file of JS code that can share specific pieces with other files, keeping code organized.`,
      more: `Modules use export to expose values from a file and import to pull them into another, letting you split a program across files instead of one giant script. Modern JS modules also help avoid polluting the global scope.`,
      example: `// mathUtils.js
export function double(n) { return n * 2; }

// main.js
import { double } from "./mathUtils.js";
console.log(double(5)); // 10`
    },
    {
      id: "import-export",
      term: "import / export",
      aliases: ["import", "export", "export default"],
      short: `The keywords used to share code between files: export makes something available, import brings it in.`,
      more: `export can mark individual named values or a single default export per file. import then pulls those values into another module by file path, letting large programs be split sensibly across many files.`,
      example: `// shapes.js
export const PI = 3.14159;
export default function circleArea(r) { return PI * r * r; }

// app.js
import circleArea, { PI } from "./shapes.js";`
    },
    {
      id: "error",
      term: "error",
      aliases: ["errors"],
      short: `A signal that something went wrong while the code was running, usually stopping execution unless it's handled.`,
      more: `JS represents problems as Error objects (or subclasses like TypeError and RangeError) with a message and stack trace. An unhandled error crashes the script; try/catch lets you intercept and respond to one instead.`,
      example: `try {
  null.hp; // TypeError: Cannot read properties of null
} catch (err) {
  console.log("Something broke:", err.message);
}`
    },
    {
      id: "exception",
      term: "exception",
      aliases: ["exceptions"],
      short: `Another word for an error that gets "thrown" during execution, which try/catch can catch and handle.`,
      more: `"Exception" and "error" are used almost interchangeably in JS. An exception is thrown with the throw keyword and, if uncaught, propagates up the call stack until it either finds a catch block or crashes the program.`,
      example: `function withdraw(balance, amount) {
  if (amount > balance) throw new Error("Insufficient gold");
  return balance - amount;
}`
    },
    {
      id: "try-catch",
      term: "try/catch",
      aliases: ["try", "catch", "try...catch", "finally"],
      short: `A structure for running risky code in a try block and handling any error it throws in a matching catch block.`,
      more: `Code inside try runs normally until something throws; execution then jumps straight to catch(err), skipping the rest of the try block. An optional finally block runs afterward no matter what, useful for cleanup.`,
      example: `try {
  JSON.parse("not valid json");
} catch (err) {
  console.log("Parse failed:", err.message);
} finally {
  console.log("Done trying.");
}`
    },
    {
      id: "throw",
      term: "throw",
      aliases: ["throwing"],
      short: `A keyword used to deliberately raise an error, stopping normal execution unless something catches it.`,
      more: `throw can raise any value, but throwing an Error object (or subclass) is standard practice because it carries a message and stack trace. Once thrown, control jumps out of the current function looking for a catch block.`,
      example: `function heal(amount) {
  if (amount < 0) throw new Error("Cannot heal negative amount");
  return amount;
}`
    },
    {
      id: "debugging",
      term: "debugging",
      aliases: ["debug", "debugger"],
      short: `The process of finding out why your code isn't doing what you expect, and fixing it.`,
      more: `Debugging usually means adding console.log() calls, using breakpoints in browser dev tools, or reading error messages carefully to narrow down where behavior diverges from expectation. It's a skill you get better at with practice, not a sign something is wrong with you.`,
      example: `function add(a, b) {
  console.log("add called with", a, b); // debugging aid
  return a + b;
}`
    },
    {
      id: "console",
      term: "console",
      aliases: ["console.log"],
      short: `A tool for printing messages and values from your code so you can see what's happening while it runs.`,
      more: `console.log() is the most common way to inspect values during development; console also has warn(), error(), and table() for more specialized output. In a browser, this output appears in the developer tools console.`,
      example: `console.log("Game started");
console.log("Player HP:", 100);
console.error("This would show as an error");`
    },
    {
      id: "event-loop",
      term: "event loop",
      aliases: [],
      short: `The mechanism that lets JS handle things like timers and network responses without freezing everything else while it waits.`,
      more: `JS runs on a single thread, but the event loop lets it queue up callbacks (from setTimeout, promises, DOM events, etc.) to run later once the current code finishes, giving the illusion of doing multiple things at once.`,
      example: `console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// logs: 1, 3, 2 — the timeout callback waits for the event loop`
    },
    {
      id: "call-stack",
      term: "call stack",
      aliases: ["stack overflow"],
      short: `The list of functions currently running, one on top of another, tracking what to return to when each one finishes.`,
      more: `Every function call pushes a new frame onto the call stack; when it returns, that frame pops off. Too much unwound recursion without a base case overflows the stack, producing a "Maximum call stack size exceeded" error.`,
      example: `function crash() { return crash(); } // no base case
// crash(); // RangeError: Maximum call stack size exceeded`
    },
    {
      id: "synchronous",
      term: "synchronous",
      aliases: ["sync"],
      short: `Code that runs one line at a time, in order, where each step waits for the previous one to finish.`,
      more: `Synchronous code blocks: nothing else can happen while it's running, which is fine for fast operations but freezes a browser tab if used for something slow, like a long computation. Contrast with asynchronous code.`,
      example: `console.log("first");
console.log("second"); // always runs after "first", synchronously`
    },
    {
      id: "asynchronous",
      term: "asynchronous",
      aliases: ["async"],
      short: `Code that can start a slow task (like a network request) and let the rest of the program keep running while it waits.`,
      more: `Asynchronous operations in JS (timers, fetch, file/network I/O) don't block the main thread; instead they register a callback, promise, or await point to resume when the result is ready. This is essential for keeping a web page responsive.`,
      example: `console.log("start");
setTimeout(() => console.log("finished waiting"), 1000);
console.log("end");
// logs: start, end, finished waiting (after 1 second)`
    },
    {
      id: "settimeout",
      term: "setTimeout",
      aliases: ["set timeout"],
      short: `A built-in function that runs some code once, after waiting a given number of milliseconds.`,
      more: `setTimeout(callback, delay) schedules callback to run after at least delay milliseconds — not necessarily exactly, since the event loop may be busy. A delay of 0 still waits for the current code to finish first.`,
      example: `console.log("now");
setTimeout(() => console.log("1 second later"), 1000);`
    },
    {
      id: "promise",
      term: "promise",
      aliases: ["promises"],
      short: `An object representing a value that isn't ready yet but will be, eventually, either successfully or with an error.`,
      more: `A promise starts pending and settles into either fulfilled (with a value) or rejected (with an error). You react to it with .then()/.catch(), or more readably with async/await.`,
      example: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done!"), 1000);
});
promise.then(result => console.log(result)); // "done!" after 1s`
    },
    {
      id: "resolve",
      term: "resolve",
      aliases: ["resolved", "resolving"],
      short: `Marking a promise as successfully completed, with a result value attached.`,
      more: `Inside a Promise executor, calling resolve(value) fulfills the promise, triggering any .then() callbacks (or letting an awaiting async function continue) with that value.`,
      example: `const loadPlayer = new Promise((resolve) => {
  resolve({ name: "Rin", hp: 100 });
});
loadPlayer.then(player => console.log(player.name)); // "Rin"`
    },
    {
      id: "reject",
      term: "reject",
      aliases: ["rejected", "rejecting"],
      short: `Marking a promise as failed, with an error attached.`,
      more: `Calling reject(error) inside a Promise executor moves it to the rejected state, triggering any .catch() handler (or throwing inside an awaiting async function). An unhandled rejection can crash or warn depending on the environment.`,
      example: `const risky = new Promise((resolve, reject) => {
  reject(new Error("Load failed"));
});
risky.catch(err => console.log("Caught:", err.message));`
    },
    {
      id: "async-await",
      term: "async/await",
      aliases: ["async function", "await"],
      short: `A cleaner way to write promise-based code that looks like normal step-by-step code instead of chains of .then().`,
      more: `Marking a function async lets you use await inside it to pause until a promise settles, returning its resolved value (or throwing its rejection, catchable with try/catch). An async function always returns a promise itself.`,
      example: `async function loadPlayer() {
  const response = await fetch("/api/player");
  const data = await response.json();
  return data;
}`
    },
    {
      id: "fetch",
      term: "fetch",
      aliases: ["fetch()", "fetch api"],
      short: `A built-in browser function for requesting data from a server over the network, returning a promise.`,
      more: `fetch(url) sends an HTTP request and resolves with a Response object once headers arrive; you typically call .json() (itself async) to get the parsed body. fetch does not reject on HTTP error statuses like 404 — you have to check response.ok yourself.`,
      example: `async function getScores() {
  const response = await fetch("/api/scores");
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}`
    },
    {
      id: "api",
      term: "API",
      aliases: ["apis"],
      short: `A defined set of ways one piece of software lets other code interact with it, without needing to know its internals.`,
      more: `API stands for Application Programming Interface. It could mean a web service you fetch data from (a "web API"), or simply the public methods and properties a library exposes for you to call.`,
      example: `// Using a web API:
const res = await fetch("https://api.example.com/users");
const users = await res.json();`
    },
    {
      id: "dom",
      term: "DOM",
      aliases: ["document object model"],
      short: `The browser's live, in-memory tree of objects representing the HTML on a page, which JS can read and change.`,
      more: `DOM stands for Document Object Model. Every tag becomes a node you can select, modify, or listen to events on with JS, which is how dynamic web pages update without a full reload.`,
      example: `const title = document.querySelector("h1");
title.textContent = "Welcome, hero!";`
    },
    {
      id: "event",
      term: "event",
      aliases: ["events"],
      short: `Something that happens in the browser, like a click, a key press, or a page load, that JS can react to.`,
      more: `Events are dispatched by the browser and carry information about what happened (like which key was pressed). Code reacts to them by attaching an event listener rather than constantly checking for changes.`,
      example: `document.addEventListener("click", () => {
  console.log("The page was clicked!");
});`
    },
    {
      id: "event-listener",
      term: "event listener",
      aliases: ["event listeners", "addEventListener"],
      short: `A function registered to run automatically whenever a specific event happens, like a button click.`,
      more: `addEventListener(eventType, callback) attaches a callback that fires every time that event occurs on that element, without blocking other code while waiting. You can attach multiple listeners for the same event.`,
      example: `const button = document.querySelector("#attack-btn");
button.addEventListener("click", () => {
  console.log("Attack!");
});`
    },
    {
      id: "immutability",
      term: "immutability",
      aliases: ["immutable", "mutable", "mutability"],
      short: `The idea of not changing a value after it's created — instead making a new, updated copy.`,
      more: `Primitive values (numbers, strings, booleans) are always immutable in JS. Arrays and objects are mutable by default, but many patterns (like using .map() instead of a for loop that mutates) favor treating them as if they were immutable to avoid unexpected shared-state bugs.`,
      example: `const original = [1, 2, 3];
const updated = [...original, 4]; // new array, original untouched
console.log(original); // [1, 2, 3]
console.log(updated); // [1, 2, 3, 4]`
    },
    {
      id: "reference",
      term: "reference",
      aliases: ["by reference", "reference type"],
      short: `A pointer to where an object or array actually lives in memory, rather than a copy of its contents.`,
      more: `Objects and arrays are assigned and passed by reference: copying the variable copies the pointer, not the data, so both variables see changes to the same underlying object. Primitives (numbers, strings, booleans) are copied by value instead.`,
      example: `const a = { hp: 100 };
const b = a; // b points to the same object as a
b.hp = 50;
console.log(a.hp); // 50 — a changed too, because they share a reference`
    },
    {
      id: "shallow-copy",
      term: "shallow copy",
      aliases: ["deep copy", "shallow clone"],
      short: `A copy of an object or array that duplicates the top level, but any nested objects inside are still shared with the original.`,
      more: `Spread (...) and Object.assign() make shallow copies: fine for flat data, but if a property is itself an object, both the original and the copy still point to that same inner object. A deep copy (e.g. via structuredClone()) duplicates every nested level too.`,
      example: `const original = { stats: { hp: 100 } };
const shallow = { ...original };
shallow.stats.hp = 1;
console.log(original.stats.hp); // 1 — nested object was shared!`
    },
    {
      id: "side-effect",
      term: "side effect",
      aliases: ["side effects"],
      short: `Any change a function makes to the world outside itself, like modifying a variable, logging to the console, or changing the page.`,
      more: `Side effects include mutating an argument, writing to a global variable, making a network request, or console.log. Functions with no side effects (pure functions) are easier to test and reason about because they only depend on their inputs.`,
      example: `let total = 0;
function addToTotal(n) {
  total += n; // side effect: changes something outside the function
}`
    },
    {
      id: "pure-function",
      term: "pure function",
      aliases: ["pure functions", "purity"],
      short: `A function that always gives the same output for the same input and doesn't change anything outside itself.`,
      more: `Pure functions have no side effects and don't rely on external state, which makes them predictable, easy to test, and safe to reuse. Array methods like .map() encourage pure-function style by passing you a fresh callback each time.`,
      example: `function double(n) { return n * 2; } // pure: same input always -> same output
console.log(double(5)); // always 10`
    },
    {
      id: "expression",
      term: "expression",
      aliases: ["expressions"],
      short: `Any bit of code that produces a value, like 2 + 2 or someFunction().`,
      more: `Expressions can be combined and nested inside other code (like function arguments) because they resolve to a value. Contrast with statements, which perform an action but don't themselves produce a usable value.`,
      example: `const result = 3 + 4 * 2; // "3 + 4 * 2" is an expression
console.log(result); // 14`
    },
    {
      id: "statement",
      term: "statement",
      aliases: ["statements"],
      short: `A complete instruction that performs an action, like declaring a variable or running an if block.`,
      more: `Statements make up the structure of a program (if, for, let x = 5;) and are executed for their effect rather than their value. A single statement can contain one or more expressions inside it.`,
      example: `let hp = 100; // this whole line is a statement
if (hp > 0) { // an if statement
  console.log("alive");
}`
    },
    {
      id: "syntax",
      term: "syntax",
      aliases: [],
      short: `The exact rules for how code must be written for the language to understand it, like where semicolons or brackets go.`,
      more: `A syntax error means the code is not valid JS at all — missing a bracket, an unmatched quote, a typo in a keyword — and the code won't run at all until it's fixed. This is different from a logic bug, where the code runs but does the wrong thing.`,
      example: `// Syntax error example (do not run):
// function greet(name {  // missing closing parenthesis
//   return "hi";
// }`
    },
    {
      id: "semantics",
      term: "semantics",
      aliases: [],
      short: `What code actually means and does when it runs, as opposed to whether it's written correctly.`,
      more: `Code can be syntactically valid but semantically wrong — it runs without error but produces the wrong result, because the logic doesn't match what you intended. Fixing semantics usually means rethinking your logic, not your punctuation.`,
      example: `function add(a, b) {
  return a - b; // valid syntax, wrong semantics — this subtracts!
}`
    },
    {
      id: "comment",
      term: "comment",
      aliases: ["comments", "commenting"],
      short: `Text in your code that JS ignores completely, used to leave notes for humans reading the code.`,
      more: `Use // for a single-line comment or /* ... */ for a block spanning multiple lines. Good comments explain why code does something non-obvious, rather than restating what it obviously does.`,
      example: `// Calculate total damage after applying armor reduction
const damage = attack - armor; /* armor can't reduce below 0 elsewhere */`
    },
    {
      id: "camelcase",
      term: "camelCase",
      aliases: ["camel case"],
      short: `A naming style where the first word is lowercase and each following word starts with a capital letter, no spaces or underscores.`,
      more: `camelCase (like playerHealth or getUserName) is the standard naming convention for variables and functions in JS. PascalCase (capitalized first letter, like Hero) is reserved by convention for class names.`,
      example: `let playerHealth = 100; // camelCase
function getPlayerName() {} // camelCase
class Hero {} // PascalCase, used for classes instead`
    },
    {
      id: "refactoring",
      term: "refactoring",
      aliases: ["refactor"],
      short: `Rewriting code to be cleaner or better organized without changing what it actually does.`,
      more: `Refactoring improves readability, removes duplication, or simplifies structure, all while keeping the external behavior identical — tests are the usual way to confirm nothing broke in the process.`,
      example: `// Before:
function total(a, b) { return a + b; }
function total2(a, b, c) { return a + b + c; }
// After refactoring, one flexible function replaces both:
function total3(...nums) { return nums.reduce((s, n) => s + n, 0); }`
    },
    {
      id: "test",
      term: "test",
      aliases: ["tests", "testing", "unit test"],
      short: `A small piece of code written specifically to check that another piece of code behaves correctly.`,
      more: `A test typically calls a function with known inputs and checks that the output matches what's expected, catching bugs automatically instead of relying on manual checking. Tests are especially valuable for confirming refactors didn't break anything.`,
      example: `function add(a, b) { return a + b; }
// A simple hand-rolled test:
console.assert(add(2, 3) === 5, "add(2,3) should equal 5");`
    },
    {
      id: "edge-case",
      term: "edge case",
      aliases: ["edge cases"],
      short: `An unusual or extreme input that's easy to forget about when writing code, like an empty array or a negative number.`,
      more: `Edge cases include empty inputs, zero, negative numbers, the very first or last item, duplicate values, and huge inputs. Good tests deliberately try these instead of only the "normal" case, since that's where bugs hide.`,
      example: `function first(arr) { return arr[0]; }
console.log(first([])); // undefined — empty array is an edge case worth testing`
    },
    {
      id: "typeof",
      term: "typeof",
      aliases: [],
      short: `An operator that tells you what kind of value something is, as a string like "number" or "string".`,
      more: `typeof x returns a string describing x's type: "number", "string", "boolean", "undefined", "object", "function", or "symbol". Its famous quirk is that typeof null returns "object", not "null", for historical reasons.`,
      example: `console.log(typeof 5); // "number"
console.log(typeof "hi"); // "string"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" — a well-known quirk`
    },
    {
      id: "coercion",
      term: "type coercion",
      aliases: ["coercion", "type conversion"],
      short: `JS automatically converting a value from one type to another, sometimes without you asking for it.`,
      more: `Coercion happens implicitly in operations like + (which can mean addition or string concatenation) and == (which converts types before comparing). It explains many "weird JS" moments; using === and explicit conversions like Number() avoids most surprises.`,
      example: `console.log("5" + 1); // "51" — number coerced to string, then joined
console.log("5" - 1); // 4 — string coerced to number for subtraction
console.log(1 == "1"); // true — coercion makes these equal`
    },
    {
      id: "mutation",
      term: "mutation",
      aliases: ["mutating", "mutate"],
      short: `Changing an array or object's contents directly, in place, rather than creating a new one.`,
      more: `Methods like .push(), .pop(), .sort(), and .splice() mutate the original array. This can cause bugs if other code still holds a reference to that same array and expects it to stay unchanged.`,
      example: `const arr = [3, 1, 2];
arr.sort(); // mutates arr directly
console.log(arr); // [1, 2, 3] — original array changed`
    },
    {
      id: "strict-mode",
      term: "strict mode",
      aliases: ["'use strict'", "use strict"],
      short: `An optional mode that makes JS stricter about mistakes, turning some silent bugs into visible errors.`,
      more: `Adding "use strict"; at the top of a file or function enables strict mode, which disallows things like accidentally creating a global variable by assigning to an undeclared name. JS modules and classes use strict mode automatically.`,
      example: `"use strict";
// leaked = 5; // ReferenceError in strict mode (would silently create a global otherwise)`
    },
    {
      id: "callback-hell",
      term: "callback hell",
      aliases: ["pyramid of doom"],
      short: `The messy, deeply nested code that results from chaining many callbacks inside each other, one per async step.`,
      more: `Callback hell happens when each asynchronous step is nested inside the previous one's callback, growing the indentation with every step. Promises, and especially async/await, were introduced largely to let you write the same logic flatly and readably.`,
      example: `// Callback hell (avoid this shape):
loadPlayer(id, player => {
  loadInventory(player, inv => {
    loadQuests(player, quests => {
      console.log(player, inv, quests);
    });
  });
});`
    },
    {
      id: "memoization",
      term: "memoization",
      aliases: ["memoize", "memoized"],
      short: `Speeding up a function by remembering the results of past calls so it doesn't redo the same work twice.`,
      more: `A memoized function caches its output keyed by its input; if called again with the same input, it returns the cached result instantly instead of recomputing. It's a common optimization for expensive pure functions, like slow recursive calculations.`,
      example: `function memoize(fn) {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) return cache.get(n);
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
}`
    }
  ]
};
