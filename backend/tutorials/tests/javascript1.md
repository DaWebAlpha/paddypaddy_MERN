
***

# The Ultimate JavaScript Mastery Roadmap: 200 Practice Questions

## Section 1: Fundamentals & Variables

### Q1. Hello World
**Task:**
Print "Hello, World!" to the console.
**Hint:**
Use `console.log()`.
**Guide:**
1. Open your browser console or Node.js environment.
2. Type the print command.
**Code Idea:**
```javascript
console.log("Hello, World!");
```

### Q2. Variables with `let`
**Task:**
Declare a variable `score` using `let`, assign it the value `10`, and print it.
**Hint:**
`let` allows you to declare variables that can be reassigned later.
**Guide:**
1. Use `let variableName = value;`.
2. Print the variable.
**Code Idea:**
```javascript
let score = 10;
console.log(score);
```

### Q3. Constants with `const`
**Task:**
Create a constant `PI` with value `3.14`. Try to reassign it (it should fail).
**Hint:**
`const` variables cannot be reassigned.
**Guide:**
1. Declare with `const`.
2. Try `PI = 3;` and observe the error in the console.
**Code Idea:**
```javascript
const PI = 3.14;
// PI = 3; // Uncommenting this causes an error
console.log(PI);
```

### Q4. Data Types
**Task:**
Create variables of types: String, Number, Boolean, Undefined, Null, and Object. Use `typeof` to print each type.
**Hint:**
`typeof` operator returns the type of the variable.
**Guide:**
1. Assign different values to variables.
2. Console log `typeof variable`.
**Code Idea:**
```javascript
let str = "Text";
let num = 42;
let bool = true;
let undef;
let empty = null;
let obj = {};

console.log(typeof str); // string
console.log(typeof num); // number
console.log(typeof empty); // object (JS quirk)
```

### Q5. Variable Naming Rules
**Task:**
Create variables following camelCase convention: `userName`, `totalAmount`, `isValid`.
**Hint:**
JavaScript variables should start with a letter, `$`, or `_`.
**Guide:**
1. Declare three variables using camelCase.
2. Log them.
**Code Idea:**
```javascript
let userName = "Alice";
let totalAmount = 100;
let isValid = true;
console.log(userName, totalAmount, isValid);
```

### Q6. `var` vs `let` Scope
**Task:**
Demonstrate that `var` is function-scoped while `let` is block-scoped using an `if` statement.
**Hint:**
`var` leaks out of `{}` blocks, `let` does not.
**Guide:**
1. Create a block `{ ... }`.
2. Declare `var x = 10;` inside.
3. Try to access `x` outside.
**Code Idea:**
```javascript
if (true) {
    var x = 10; // Function/Global scope
    let y = 20; // Block scope
}
console.log(x); // 10
// console.log(y); // Error: y is not defined
```

### Q7. Hoisting Concept
**Task:**
Try to access a `var` variable before it is declared to see `undefined`.
**Hint:**
`var` declarations are hoisted to the top.
**Guide:**
1. `console.log(myVar);` first.
2. `var myVar = 5;` second.
**Code Idea:**
```javascript
console.log(myVar); // undefined (hoisted but not assigned)
var myVar = 5;
```

### Q8. String Concatenation
**Task:**
Combine two strings "Hello" and "World" with a space in between.
**Hint:**
Use the `+` operator.
**Guide:**
1. Define `str1` and `str2`.
2. Concatenate `str1 + " " + str2`.
**Code Idea:**
```javascript
let first = "Hello";
let second = "World";
let result = first + " " + second;
console.log(result);
```

### Q9. Template Literals
**Task:**
Use template literals to print: `The sum of 5 and 10 is 15`.
**Hint:**
Use backticks `` ` ` `` and `${expression}`.
**Guide:**
1. Define `a=5`, `b=10`.
2. Use backticks to embed variables.
**Code Idea:**
```javascript
let a = 5;
let b = 10;
console.log(`The sum of ${a} and ${b} is ${a + b}`);
```

### Q10. Comments
**Task:**
Write a single-line comment and a multi-line comment.
**Hint:**
Use `//` for single, `/* */` for multi.
**Guide:**
1. Write comments above code.
**Code Idea:**
```javascript
// This is a single line comment
/* This is a
   multi-line comment */
console.log("Done");
```

---

## Section 2: Operators

### Q11. Arithmetic Operators
**Task:**
Calculate remainder of `10` divided by `3`.
**Hint:**
Use the modulus operator `%`.
**Guide:**
1. Use `10 % 3`.
**Code Idea:**
```javascript
console.log(10 % 3); // 1
```

### Q12. Increment/Decrement
**Task:**
Increment a number using `++` and decrement using `--`.
**Hint:**
`num++` is equivalent to `num = num + 1`.
**Guide:**
1. Set `counter = 0`.
2. Run `counter++`.
3. Log result.
**Code Idea:**
```javascript
let counter = 5;
counter++;
console.log(counter); // 6
counter--;
console.log(counter); // 5
```

### Q13. Comparison Operators
**Task:**
Compare `5` and `"5"` using `==` and `===`.
**Hint:**
`==` checks value (coercion), `===` checks value and type.
**Guide:**
1. Log `5 == "5"` (true).
2. Log `5 === "5"` (false).
**Code Idea:**
```javascript
console.log(5 == "5");  // true (type coercion)
console.log(5 === "5"); // false (strict equality)
```

### Q14. Logical AND
**Task:**
Return true only if `age > 18` AND `hasTicket` is true.
**Hint:**
Use `&&`.
**Guide:**
1. Define variables.
2. Use if statement or log the condition.
**Code Idea:**
```javascript
let age = 20;
let hasTicket = true;
if (age > 18 && hasTicket) {
    console.log("Allowed entry");
}
```

### Q15. Logical OR
**Task:**
Return true if `isAdmin` OR `isModerator` is true.
**Hint:**
Use `||`.
**Guide:**
1. Define roles.
2. Check condition.
**Code Idea:**
```javascript
let isAdmin = false;
let isModerator = true;
if (isAdmin || isModerator) {
    console.log("Access granted");
}
```

### Q16. Logical NOT
**Task:**
Toggle a boolean variable.
**Hint:**
Use `!`.
**Guide:**
1. `let loggedIn = false;`.
2. `loggedIn = !loggedIn;`.
**Code Idea:**
```javascript
let loggedIn = false;
console.log(!loggedIn); // true
```

### Q17. Assignment Operators
**Task:**
Use `+=` to add 10 to an existing variable.
**Hint:**
`total += 10` is shorthand for `total = total + 10`.
**Guide:**
1. Define `total = 50`.
2. `total += 10`.
**Code Idea:**
```javascript
let total = 50;
total += 10;
console.log(total); // 60
```

### Q18. Ternary Operator
**Task:**
Check if `age >= 18`. Print "Adult" or "Minor" in one line.
**Hint:**
`condition ? trueValue : falseValue`.
**Guide:**
1. Use the ternary syntax inside a console log.
**Code Idea:**
```javascript
let age = 17;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);
```

### Q19. Operator Precedence
**Task:**
Calculate `let result = 2 + 3 * 4`. Explain why it is 14, not 20.
**Hint:**
Multiplication happens before addition.
**Guide:**
1. Run the calculation.
2. Use parentheses `(2 + 3) * 4` to change result.
**Code Idea:**
```javascript
console.log(2 + 3 * 4); // 14
console.log((2 + 3) * 4); // 20
```

### Q20. Nullish Coalescing
**Task:**
Provide a default value only if the variable is `null` or `undefined`.
**Hint:**
Use `??` operator.
**Guide:**
1. Let `userInput = null`.
2. Log `userInput ?? "Default Name"`.
**Code Idea:**
```javascript
let data = null;
let name = data ?? "Anonymous";
console.log(name); // Anonymous
```

---

## Section 3: Control Flow

### Q21. If Statement
**Task:**
Print "Positive" if a number is greater than 0.
**Hint:**
Standard `if (condition) { ... }`.
**Guide:**
1. Define number.
2. Write if block.
**Code Idea:**
```javascript
let num = 5;
if (num > 0) {
    console.log("Positive");
}
```

### Q22. If-Else Statement
**Task:**
Check if a number is even or odd.
**Hint:**
Use `% 2`.
**Guide:**
1. Check `num % 2 === 0`.
**Code Idea:**
```javascript
let num = 4;
if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}
```

### Q23. Else If Ladder
**Task:**
Assign grades: A (>=90), B (>=80), C (else).
**Hint:**
Use `else if`.
**Guide:**
1. Check conditions in order.
**Code Idea:**
```javascript
let score = 85;
if (score >= 90) console.log("A");
else if (score >= 80) console.log("B");
else console.log("C");
```

### Q24. Switch Statement
**Task:**
Print day name based on number (1-3).
**Hint:**
`switch(day) { case 1: ... break; }`.
**Guide:**
1. Use switch.
2. Don't forget `break`.
**Code Idea:**
```javascript
let day = 2;
switch (day) {
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    default: console.log("Other");
}
```

### Q25. Truthy/Falsy Values
**Task:**
Check if a string is empty using an if condition.
**Hint:**
Empty string `""` is falsy. Non-empty is truthy.
**Guide:**
1. `let val = "";`.
2. `if (val) { ... }`.
**Code Idea:**
```javascript
let val = "Hello";
if (val) {
    console.log("Has value");
} else {
    console.log("Empty");
}
```

### Q26. Short Circuit Evaluation
**Task:**
Set a default name if `user` is undefined.
**Hint:**
`let name = user || "Guest";`.
**Guide:**
1. Use `||` to assign fallback.
**Code Idea:**
```javascript
let user = null;
let displayName = user || "Guest";
console.log(displayName);
```

### Q27. Block Scope
**Task:**
Demonstrate that `let` variables inside an `if` block are not accessible outside.
**Hint:**
Declare `let` inside `{}`.
**Guide:**
1. Create block.
2. Try accessing variable outside.
**Code Idea:**
```javascript
if (true) {
    let secret = 123;
}
// console.log(secret); // Error
```

---

## Section 4: Loops

### Q28. For Loop
**Task:**
Print numbers 0 to 4.
**Hint:**
`for (let i = 0; i < 5; i++)`.
**Guide:**
1. Write standard for loop.
**Code Idea:**
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

### Q29. While Loop
**Task:**
Print 1 to 3 using `while`.
**Hint:**
`while (condition) { ... }`.
**Guide:**
1. Initialize counter outside.
2. Increment inside.
**Code Idea:**
```javascript
let i = 1;
while (i <= 3) {
    console.log(i);
    i++;
}
```

### Q30. Do-While Loop
**Task:**
Run code at least once, even if condition is false.
**Hint:**
`do { ... } while (condition);`.
**Guide:**
1. Set `i = 10`.
2. Loop while `i < 5`. It runs once.
**Code Idea:**
```javascript
let i = 10;
do {
    console.log("Runs once");
    i++;
} while (i < 5);
```

### Q31. Break Statement
**Task:**
Stop a loop when `i` is 3.
**Hint:**
Use `break`.
**Guide:**
1. Loop 0 to 10.
2. If `i === 3`, break.
**Code Idea:**
```javascript
for (let i = 0; i < 10; i++) {
    if (i === 3) break;
    console.log(i);
}
```

### Q32. Continue Statement
**Task:**
Skip printing number 3 but continue loop.
**Hint:**
Use `continue`.
**Guide:**
1. Loop 0 to 5.
2. If `i === 3`, continue.
**Code Idea:**
```javascript
for (let i = 0; i < 5; i++) {
    if (i === 3) continue;
    console.log(i);
}
```

### Q33. Nested Loops
**Task:**
Print coordinates (x, y) for x:0-1, y:0-1.
**Hint:**
Loop inside a loop.
**Guide:**
1. Outer loop for x.
2. Inner loop for y.
**Code Idea:**
```javascript
for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
        console.log(`(${x}, ${y})`);
    }
}
```

---

## Section 5: Functions

### Q34. Function Declaration
**Task:**
Create a function `greet()` that prints "Hello".
**Hint:**
`function name() { ... }`.
**Guide:**
1. Define function.
2. Call it.
**Code Idea:**
```javascript
function greet() {
    console.log("Hello");
}
greet();
```

### Q35. Parameters and Arguments
**Task:**
Create a function `add(a, b)` that returns the sum.
**Hint:**
Pass values when calling.
**Guide:**
1. Define function with params.
2. Return result.
**Code Idea:**
```javascript
function add(a, b) {
    return a + b;
}
console.log(add(5, 3)); // 8
```

### Q36. Default Parameters
**Task:**
Create a function where `b` defaults to 1 if not provided.
**Hint:**
`function mul(a, b = 1)`.
**Guide:**
1. Use `=` in parameter definition.
**Code Idea:**
```javascript
function mul(a, b = 1) {
    return a * b;
}
console.log(mul(5)); // 5
```

### Q37. Function Expressions
**Task:**
Assign a function to a variable.
**Hint:**
`const sayHi = function() { ... };`.
**Guide:**
1. Define anonymous function.
2. Assign to variable.
**Code Idea:**
```javascript
const sayHi = function() {
    console.log("Hi");
};
sayHi();
```

### Q38. Arrow Functions
**Task:**
Rewrite `add` function using arrow syntax.
**Hint:**
`const add = (a, b) => a + b;`.
**Guide:**
1. Remove `function` keyword.
2. Add `=>`.
**Code Idea:**
```javascript
const add = (a, b) => a + b;
console.log(add(2, 3));
```

### Q39. Anonymous Functions
**Task:**
Pass an anonymous function to `setTimeout`.
**Hint:**
`setTimeout(function() { ... }, 1000);`.
**Guide:**
1. Use `setTimeout`.
2. Provide function without a name.
**Code Idea:**
```javascript
setTimeout(function() {
    console.log("Executed after 1s");
}, 1000);
```

### Q40. Immediately Invoked Function Expression (IIFE)
**Task:**
Run a function immediately after defining it.
**Hint:**
`(function() { ... })();`.
**Guide:**
1. Wrap function in parentheses.
2. Add `()` to invoke.
**Code Idea:**
```javascript
(function() {
    console.log("I run immediately!");
})();
```

### Q41. Callback Functions
**Task:**
Create a function that takes another function as an argument.
**Hint:**
Call the argument inside the main function.
**Guide:**
1. Define `processUser(name, callback)`.
2. Call `callback(name)`.
**Code Idea:**
```javascript
function processUser(name, callback) {
    console.log("Processing...");
    callback(name);
}
processUser("John", (n) => console.log(`Hello ${n}`));
```

---

## Section 6: Strings

### Q42. String Length
**Task:**
Find length of "JavaScript".
**Hint:**
`.length` property.
**Guide:**
1. `str.length`.
**Code Idea:**
```javascript
let str = "JavaScript";
console.log(str.length);
```

### Q43. Access Character
**Task:**
Get the first character of a string.
**Hint:**
`str[0]` or `str.charAt(0)`.
**Guide:**
1. Use bracket notation (indexes start at 0).
**Code Idea:**
```javascript
let str = "Hello";
console.log(str[0]); // H
```

### Q44. Case Conversion
**Task:**
Convert string to uppercase and lowercase.
**Hint:**
`.toUpperCase()`, `.toLowerCase()`.
**Guide:**
1. Apply methods.
**Code Idea:**
```javascript
let text = "Hello";
console.log(text.toUpperCase()); // HELLO
console.log(text.toLowerCase()); // hello
```

### Q45. Substring
**Task:**
Extract "Script" from "JavaScript".
**Hint:**
`.slice(start, end)` or `.substring()`.
**Guide:**
1. `str.slice(4, 10)`.
**Code Idea:**
```javascript
let str = "JavaScript";
console.log(str.slice(4)); // Script
```

### Q46. Includes
**Task:**
Check if string contains "world".
**Hint:**
`.includes("sub")` returns true/false.
**Guide:**
1. Use method in an if statement.
**Code Idea:**
```javascript
let str = "Hello world";
console.log(str.includes("world")); // true
```

### Q47. Split String
**Task:**
Convert "Apple, Banana, Kiwi" into an array.
**Hint:**
`.split(", ")`.
**Guide:**
1. Split by the separator.
**Code Idea:**
```javascript
let fruits = "Apple, Banana";
let arr = fruits.split(", ");
console.log(arr[0]); // Apple
```

### Q48. Replace
**Task:**
Replace "World" with "JavaScript" in "Hello World".
**Hint:**
`.replace("old", "new")`.
**Guide:**
1. Apply replace method.
**Code Idea:**
```javascript
let txt = "Hello World";
let newTxt = txt.replace("World", "JS");
console.log(newTxt);
```

### Q49. Trim
**Task:**
Remove whitespace from "  Hello  ".
**Hint:**
`.trim()`.
**Guide:**
1. Apply trim.
**Code Idea:**
```javascript
let raw = "  Hi  ";
console.log(raw.trim()); // "Hi"
```

---

## Section 7: Arrays

### Q50. Create Array
**Task:**
Create an array of 3 numbers.
**Hint:**
`let arr = [1, 2, 3];`.
**Guide:**
1. Use square brackets.
**Code Idea:**
```javascript
let nums = [1, 2, 3];
console.log(nums);
```

### Q51. Access Array Item
**Task:**
Get the last item of an array.
**Hint:**
`arr[arr.length - 1]`.
**Guide:**
1. Use index logic.
**Code Idea:**
```javascript
let nums = [10, 20, 30];
console.log(nums[nums.length - 1]); // 30
```

### Q52. Modify Array
**Task:**
Change the second item to "Updated".
**Hint:**
`arr[1] = "Updated";`.
**Guide:**
1. Access index and reassign.
**Code Idea:**
```javascript
let arr = ["a", "b", "c"];
arr[1] = "NEW";
console.log(arr);
```

### Q53. Push and Pop
**Task:**
Add item to end, then remove last item.
**Hint:**
`push()`, `pop()`.
**Guide:**
1. Push returns new length.
2. Pop returns removed item.
**Code Idea:**
```javascript
let arr = [1, 2];
arr.push(3); // [1, 2, 3]
let last = arr.pop(); // 3
console.log(arr);
```

### Q54. Shift and Unshift
**Task:**
Add to beginning and remove from beginning.
**Hint:**
`unshift()`, `shift()`.
**Guide:**
1. `unshift` adds to start.
2. `shift` removes from start.
**Code Idea:**
```javascript
let arr = [2, 3];
arr.unshift(1); // [1, 2, 3]
arr.shift();    // [2, 3]
console.log(arr);
```

### Q55. Splice
**Task:**
Remove 1 item at index 2.
**Hint:**
`arr.splice(index, count)`.
**Guide:**
1. Use splice to modify original array.
**Code Idea:**
```javascript
let arr = [1, 2, 3, 4];
arr.splice(2, 1); // Removes '3'
console.log(arr);
```

### Q56. Concat
**Task:**
Merge two arrays.
**Hint:**
`arr1.concat(arr2)`.
**Guide:**
1. Combine arrays.
**Code Idea:**
```javascript
let a = [1];
let b = [2];
let c = a.concat(b);
console.log(c);
```

### Q57. Spread Operator
**Task:**
Merge two arrays using spread syntax.
**Hint:**
`[...arr1, ...arr2]`.
**Guide:**
1. Use `...` to expand elements.
**Code Idea:**
```javascript
let a = [1, 2];
let b = [3, 4];
let merged = [...a, ...b];
console.log(merged);
```

### Q58. Array Destructuring
**Task:**
Extract first two items into variables `first` and `second`.
**Hint:**
`let [a, b] = arr;`.
**Guide:**
1. Use square brackets on left side.
**Code Idea:**
```javascript
let colors = ["Red", "Green", "Blue"];
let [first, second] = colors;
console.log(first); // Red
```

---

## Section 8: Array Iteration (High Order Functions)

### Q59. forEach
**Task:**
Print every item in an array.
**Hint:**
`arr.forEach(item => console.log(item));`.
**Guide:**
1. Iterate over array.
**Code Idea:**
```javascript
let nums = [1, 2, 3];
nums.forEach(n => console.log(n * 2));
```

### Q60. map
**Task:**
Create a new array where every number is doubled.
**Hint:**
`arr.map(n => n * 2)`. Return is required.
**Guide:**
1. Use map to transform data.
**Code Idea:**
```javascript
let nums = [1, 2, 3];
let doubled = nums.map(n => n * 2);
console.log(doubled);
```

### Q61. filter
**Task:**
Create a new array containing only numbers greater than 10.
**Hint:**
`arr.filter(n => n > 10)`.
**Guide:**
1. Filter returns boolean.
**Code Idea:**
```javascript
let nums = [5, 12, 8, 20];
let big = nums.filter(n => n > 10);
console.log(big);
```

### Q62. find
**Task:**
Find the first item equal to "Apple".
**Hint:**
`arr.find(item => item === "Apple")`.
**Guide:**
1. Returns the item or undefined.
**Code Idea:**
```javascript
let fruits = ["Banana", "Apple", "Mango"];
let found = fruits.find(f => f === "Apple");
console.log(found);
```

### Q63. findIndex
**Task:**
Find the index of the first number > 10.
**Hint:**
`arr.findIndex(n => n > 10)`.
**Guide:**
1. Returns index or -1.
**Code Idea:**
```javascript
let nums = [5, 12, 8];
let idx = nums.findIndex(n => n > 10);
console.log(idx); // 1
```

### Q64. reduce
**Task:**
Sum all numbers in an array.
**Hint:**
`arr.reduce((acc, curr) => acc + curr, 0)`.
**Guide:**
1. Accumulator holds the running total.
**Code Idea:**
```javascript
let nums = [1, 2, 3];
let sum = nums.reduce((total, num) => total + num, 0);
console.log(sum); // 6
```

### Q65. sort (Numbers)
**Task:**
Sort an array of numbers correctly (ascending).
**Hint:**
`arr.sort((a, b) => a - b)`.
**Guide:**
1. Default sort treats items as strings. Use compare function for numbers.
**Code Idea:**
```javascript
let nums = [100, 2, 30];
nums.sort((a, b) => a - b);
console.log(nums); // [2, 30, 100]
```

### Q66. includes (Array)
**Task:**
Check if 5 exists in array.
**Hint:**
`arr.includes(5)`.
**Guide:**
1. Returns boolean.
**Code Idea:**
```javascript
let nums = [1, 3, 5];
console.log(nums.includes(3)); // true
```

### Q67. Chaining Methods
**Task:**
Filter numbers > 5, then square them.
**Hint:**
`arr.filter(...).map(...)`.
**Guide:**
1. Combine high-order functions.
**Code Idea:**
```javascript
let nums = [2, 6, 8];
let result = nums.filter(n => n > 5).map(n => n * n);
console.log(result); // [36, 64]
```

---

## Section 9: Objects

### Q68. Create Object
**Task:**
Create an object `person` with `name` and `age`.
**Hint:**
`let obj = { key: value };`.
**Guide:**
1. Use curly braces.
**Code Idea:**
```javascript
let person = {
    name: "John",
    age: 30
};
console.log(person.name);
```

### Q69. Access Properties
**Task:**
Access property using dot notation and bracket notation.
**Hint:**
`obj.prop` vs `obj["prop"]`.
**Guide:**
1. Use brackets for dynamic keys or keys with spaces.
**Code Idea:**
```javascript
let user = { name: "Alice", "full name": "Alice Smith" };
console.log(user.name);
console.log(user["full name"]);
```

### Q70. Add/Update Properties
**Task:**
Add `email` property to existing object. Update `age`.
**Hint:**
`obj.email = "..."`.
**Guide:**
1. Simply assign to new key.
**Code Idea:**
```javascript
let user = { name: "Bob" };
user.age = 25;
user.name = "Robert";
console.log(user);
```

### Q71. Delete Property
**Task:**
Remove `age` from object.
**Hint:**
`delete obj.age`.
**Guide:**
1. Use `delete` keyword.
**Code Idea:**
```javascript
let user = { name: "A", age: 20 };
delete user.age;
console.log(user);
```

### Q72. Object Methods
**Task:**
Add a method `greet` to object that prints name.
**Hint:**
Function inside object is a method.
**Guide:**
1. Define function inside object.
**Code Idea:**
```javascript
let person = {
    name: "Max",
    sayHi: function() { console.log("Hi " + this.name); }
};
person.sayHi();
```

### Q73. `this` Keyword
**Task:**
Use `this` to refer to the current object inside a method.
**Hint:**
`this.propertyName`.
**Guide:**
1. `this` refers to the owner of the function.
**Code Idea:**
```javascript
let car = {
    brand: "Ford",
    getBrand: function() { return this.brand; }
};
console.log(car.getBrand());
```

### Q74. Object.keys
**Task:**
Get all keys of an object as an array.
**Hint:**
`Object.keys(obj)`.
**Guide:**
1. Use static method on `Object`.
**Code Idea:**
```javascript
let obj = { a: 1, b: 2 };
console.log(Object.keys(obj)); // ['a', 'b']
```

### Q75. Object.values
**Task:**
Get all values of an object.
**Hint:**
`Object.values(obj)`.
**Guide:**
1. Similar to keys.
**Code Idea:**
```javascript
let obj = { a: 1, b: 2 };
console.log(Object.values(obj)); // [1, 2]
```

### Q76. Object.entries
**Task:**
Get key-value pairs as arrays.
**Hint:**
`Object.entries(obj)`.
**Guide:**
1. Returns `[[key, val], [key, val]]`.
**Code Idea:**
```javascript
let obj = { a: 1 };
console.log(Object.entries(obj));
```

### Q77. Object Destructuring
**Task:**
Extract `title` and `author` from a book object.
**Hint:**
`let { title, author } = book;`.
**Guide:**
1. Use curly braces on left side.
**Code Idea:**
```javascript
let book = { title: "1984", author: "Orwell" };
let { title, author } = book;
console.log(title);
```

---

## Section 10: DOM Manipulation (Browser)

### Q78. Select Element by ID
**Task:**
Get element with id="demo".
**Hint:**
`document.getElementById('demo')`.
**Guide:**
1. Assume HTML `<div id="demo"></div>`.
**Code Idea:**
```javascript
// HTML: <div id="demo">Hi</div>
const el = document.getElementById("demo");
console.log(el.innerText);
```

### Q79. Query Selector
**Task:**
Select the first `<p>` tag.
**Hint:**
`document.querySelector('p')`.
**Guide:**
1. Use CSS selectors.
**Code Idea:**
```javascript
const p = document.querySelector('p');
```

### Q80. Query Selector All
**Task:**
Select all elements with class `.item`.
**Hint:**
`document.querySelectorAll('.item')`.
**Guide:**
1. Returns a NodeList.
**Code Idea:**
```javascript
const items = document.querySelectorAll('.item');
items.forEach(i => console.log(i));
```

### Q81. Change Text Content
**Task:**
Change text of an element to "Hello JS".
**Hint:**
`element.textContent = "..."` or `innerText`.
**Guide:**
1. Select element.
2. Assign new value.
**Code Idea:**
```javascript
// HTML: <h1 id="title">Old</h1>
const h = document.getElementById("title");
h.textContent = "New Title";
```

### Q82. Change HTML Content
**Task:**
Insert a `<span>` inside a div.
**Hint:**
`element.innerHTML = "<span>Hi</span>"`.
**Guide:**
1. Use innerHTML (parses HTML tags).
**Code Idea:**
```javascript
const box = document.getElementById("box");
box.innerHTML = "<strong>Bold</strong>";
```

### Q83. Change Styles
**Task:**
Change background color of an element to red.
**Hint:**
`element.style.backgroundColor = "red"`.
**Guide:**
1. Access `style` property.
2. Use camelCase for CSS properties (background-color -> backgroundColor).
**Code Idea:**
```javascript
const el = document.querySelector('.box');
el.style.backgroundColor = "blue";
el.style.color = "white";
```

### Q84. Add Class
**Task:**
Add class `active` to an element.
**Hint:**
`element.classList.add('active')`.
**Guide:**
1. Use classList for safer class handling.
**Code Idea:**
```javascript
const el = document.getElementById('menu');
el.classList.add('active');
```

### Q85. Remove Class
**Task:**
Remove class `hidden`.
**Hint:**
`element.classList.remove('hidden')`.
**Guide:**
1. Use classList.remove.
**Code Idea:**
```javascript
el.classList.remove('hidden');
```

### Q86. Create Element
**Task:**
Create a new `<li>` element.
**Hint:**
`document.createElement('li')`.
**Guide:**
1. Create element in memory.
**Code Idea:**
```javascript
const li = document.createElement('li');
li.textContent = "Item 1";
```

### Q87. Append Element
**Task:**
Append the created `<li>` to a `<ul>`.
**Hint:**
`parent.appendChild(child)` or `parent.append(child)`.
**Guide:**
1. Select parent.
2. Append child.
**Code Idea:**
```javascript
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = "New Item";
ul.appendChild(li);
```

### Q88. Remove Element
**Task:**
Remove an element from the DOM.
**Hint:**
`element.remove()`.
**Guide:**
1. Select element.
2. Call remove.
**Code Idea:**
```javascript
const el = document.getElementById('trash');
el.remove();
```

---

## Section 11: Events

### Q89. Click Event
**Task:**
Alert "Clicked" when a button is pressed.
**Hint:**
`btn.addEventListener('click', function() {...})`.
**Guide:**
1. Select button.
2. Add event listener.
**Code Idea:**
```javascript
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    alert("Button Clicked!");
});
```

### Q90. Input Event
**Task:**
Log text as user types in an input field.
**Hint:**
`input.addEventListener('input', (e) => ...)`.
**Guide:**
1. Listen for 'input' event.
2. Use `e.target.value`.
**Code Idea:**
```javascript
const input = document.querySelector('input');
input.addEventListener('input', (e) => {
    console.log(e.target.value);
});
```

### Q91. Event Object
**Task:**
Get the X and Y coordinates of a mouse click.
**Hint:**
`e.clientX`, `e.clientY`.
**Guide:**
1. Use the event object passed to the function.
**Code Idea:**
```javascript
window.addEventListener('click', (e) => {
    console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
});
```

### Q92. Prevent Default
**Task:**
Prevent a form from submitting.
**Hint:**
`e.preventDefault()`.
**Guide:**
1. Listen for 'submit'.
2. Call preventDefault.
**Code Idea:**
```javascript
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Form not submitted");
});
```

### Q93. Keydown Event
**Task:**
Log "Enter pressed" when user hits Enter.
**Hint:**
`e.key === 'Enter'`.
**Guide:**
1. Check `e.key` property.
**Code Idea:**
```javascript
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') console.log("Enter Hit");
});
```

### Q94. Event Bubbling
**Task:**
Stop an event from bubbling up to parent elements.
**Hint:**
`e.stopPropagation()`.
**Guide:**
1. Used when parent and child both have listeners for the same event.
**Code Idea:**
```javascript
// Child element listener
child.addEventListener('click', (e) => {
    e.stopPropagation();
});
```

---

## Section 12: Timers

### Q95. setTimeout
**Task:**
Print "Delayed" after 2 seconds.
**Hint:**
`setTimeout(() => {}, 2000)`.
**Guide:**
1. Time is in milliseconds.
**Code Idea:**
```javascript
setTimeout(() => {
    console.log("Delayed");
}, 2000);
```

### Q96. setInterval
**Task:**
Print a counter every second.
**Hint:**
`setInterval(() => {}, 1000)`.
**Guide:**
1. Store interval ID to clear it later.
**Code Idea:**
```javascript
let count = 0;
const id = setInterval(() => {
    console.log(count++);
    if (count > 3) clearInterval(id);
}, 1000);
```

### Q97. clearInterval
**Task:**
Stop the interval after 5 runs.
**Hint:**
Use `clearInterval(id)`.
**Guide:**
1. Use condition inside interval.
**Code Idea:**
(See Q96)

---

## Section 13: Math & Dates

### Q98. Math.random
**Task:**
Generate a random number between 1 and 10 (inclusive).
**Hint:**
`Math.floor(Math.random() * 10) + 1`.
**Guide:**
1. `Math.random()` gives 0 to 0.999.
2. Multiply by range, then floor, then add min.
**Code Idea:**
```javascript
const rand = Math.floor(Math.random() * 10) + 1;
console.log(rand);
```

### Q99. Math.round/floor/ceil
**Task:**
Round 4.5, floor 4.9, ceil 4.1.
**Hint:**
`Math.round`, `Math.floor`, `Math.ceil`.
**Guide:**
1. Apply methods.
**Code Idea:**
```javascript
console.log(Math.round(4.5)); // 5
console.log(Math.floor(4.9)); // 4
console.log(Math.ceil(4.1));  // 5
```

### Q100. Date Object
**Task:**
Get current year.
**Hint:**
`new Date().getFullYear()`.
**Guide:**
1. Create Date object.
2. Call methods.
**Code Idea:**
```javascript
const now = new Date();
console.log(now.getFullYear());
console.log(now.getMonth()); // 0-11
```

---

## Section 14: Error Handling

### Q101. Try Catch
**Task:**
Try to call a non-existent function. Catch the error.
**Hint:**
`try { ... } catch (err) { ... }`.
**Guide:**
1. Wrap risky code in try.
**Code Idea:**
```javascript
try {
    nonExistentFunction();
} catch (error) {
    console.log("Error caught: " + error.message);
}
```

### Q102. Finally Block
**Task:**
Run code in `finally` block regardless of error.
**Hint:**
`try {} catch {} finally {}`.
**Guide:**
1. Finally always executes.
**Code Idea:**
```javascript
try {
    console.log("Trying...");
} catch (e) {
    console.log("Error");
} finally {
    console.log("Done.");
}
```

### Q103. Throw Custom Error
**Task:**
Throw an error if age < 18.
**Hint:**
`throw new Error("Message")`.
**Guide:**
1. Use `throw`.
**Code Idea:**
```javascript
let age = 15;
try {
    if (age < 18) throw new Error("Too young");
} catch (e) {
    console.log(e.message);
}
```

---

## Section 15: JSON

### Q104. JSON.stringify
**Task:**
Convert an object to a JSON string.
**Hint:**
`JSON.stringify(obj)`.
**Guide:**
1. Used for sending data to servers.
**Code Idea:**
```javascript
let obj = { name: "John", age: 30 };
let jsonStr = JSON.stringify(obj);
console.log(jsonStr); // '{"name":"John","age":30}'
```

### Q105. JSON.parse
**Task:**
Convert a JSON string back to an object.
**Hint:**
`JSON.parse(str)`.
**Guide:**
1. Used for receiving data from servers.
**Code Idea:**
```javascript
let str = '{"x": 10}';
let obj = JSON.parse(str);
console.log(obj.x); // 10
```

---

## Section 16: Asynchronous JavaScript (Promises)

### Q106. Creating a Promise
**Task:**
Create a promise that resolves with "Success".
**Hint:**
`new Promise((resolve, reject) => { resolve() })`.
**Guide:**
1. Executor function runs immediately.
**Code Idea:**
```javascript
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 1000);
});
```

### Q107. Consuming a Promise (then)
**Task:**
Log the result of the promise using `.then()`.
**Hint:**
`p.then(result => ...)`.
**Guide:**
1. Chain .then.
**Code Idea:**
```javascript
p.then(data => {
    console.log(data);
});
```

### Q108. Catching Errors
**Task:**
Handle a rejected promise using `.catch()`.
**Hint:**
`reject("Error")`.
**Guide:**
1. Reject inside promise.
2. Catch outside.
**Code Idea:**
```javascript
const p = new Promise((resolve, reject) => {
    reject("Failed");
});
p.catch(err => console.log(err));
```

### Q109. Async/Await
**Task:**
Rewrite promise consumption using `async` and `await`.
**Hint:**
`async function() { let res = await p; }`.
**Guide:**
1. Await pauses execution until promise settles.
**Code Idea:**
```javascript
async function getData() {
    const p = new Promise(r => setTimeout(() => r("Async Data"), 1000));
    const result = await p;
    console.log(result);
}
getData();
```

### Q110. Try/Catch with Async/Await
**Task:**
Handle errors in async/await using try/catch.
**Hint:**
Wrap `await` in try block.
**Guide:**
1. Standard synchronous-style error handling.
**Code Idea:**
```javascript
async function load() {
    try {
        const res = await Promise.reject("Oops");
    } catch (e) {
        console.log("Caught: " + e);
    }
}
load();
```

### Q111. Promise.all
**Task:**
Wait for 3 promises to finish simultaneously.
**Hint:**
`Promise.all([p1, p2, p3])`.
**Guide:**
1. Returns single promise when all resolve.
**Code Idea:**
```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
Promise.all([p1, p2]).then(vals => console.log(vals)); // [1, 2]
```

---

## Section 17: Fetch API

### Q112. Basic Fetch
**Task:**
Fetch data from a public API (like JSONPlaceholder).
**Hint:**
`fetch('url')`.
**Guide:**
1. Fetch returns a promise.
**Code Idea:**
```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Q113. Fetch with Async/Await
**Task:**
Fetch and log data using async/await.
**Hint:**
`let res = await fetch(...)`.
**Guide:**
1. Remember to parse JSON: `res.json()`.
**Code Idea:**
```javascript
async function getUsers() {
    let res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    let data = await res.json();
    console.log(data.name);
}
getUsers();
```

### Q114. Handling HTTP Errors
**Task:**
Check if `response.ok` is false and throw error.
**Hint:**
`if (!res.ok) throw new Error(...)`.
**Guide:**
1. Fetch doesn't reject on HTTP 404/500. Must handle manually.
**Code Idea:**
```javascript
async function getData() {
    let res = await fetch('bad_url');
    if (!res.ok) throw new Error("HTTP Error");
    return res.json();
}
getData().catch(e => console.log(e));
```

---

## Section 18: Object Oriented Programming (ES6 Classes)

### Q115. Class Declaration
**Task:**
Create a class `User` with a constructor setting `name`.
**Hint:**
`class Name { constructor() {} }`.
**Guide:**
1. Syntactic sugar over prototypes.
**Code Idea:**
```javascript
class User {
    constructor(name) {
        this.name = name;
    }
}
const u = new User("Alice");
console.log(u.name);
```

### Q116. Class Methods
**Task:**
Add a method `greet()` to the User class.
**Hint:**
Define function inside class without `function` keyword.
**Guide:**
1. Methods are added to the prototype.
**Code Idea:**
```javascript
class User {
    constructor(name) { this.name = name; }
    greet() { console.log("Hi " + this.name); }
}
new User("Bob").greet();
```

### Q117. Inheritance
**Task:**
Create class `Admin` extending `User`.
**Hint:**
`class Admin extends User`.
**Guide:**
1. Admin inherits User methods.
**Code Idea:**
```javascript
class Admin extends User {
    constructor(name, role) {
        super(name); // Call parent constructor
        this.role = role;
    }
}
const admin = new Admin("Sam", "Root");
admin.greet(); // Inherited method
```

### Q118. Static Methods
**Task:**
Create a static method `createGuest()` on class.
**Hint:**
`static methodName() {}`. Called on class, not instance.
**Guide:**
1. Utility functions for classes.
**Code Idea:**
```javascript
class Helper {
    static log(msg) { console.log(msg); }
}
Helper.log("Static call");
```

### Q119. Getters and Setters
**Task:**
Use `get` and `set` to control access to a property (e.g., capitalize name).
**Hint:**
`get propName() {}`, `set propName(val) {}`.
**Guide:**
1. Access like a property, acts like a function.
**Code Idea:**
```javascript
class Person {
    constructor(name) { this._name = name; }
    get name() { return this._name.toUpperCase(); }
    set name(val) { this._name = val; }
}
let p = new Person("john");
console.log(p.name); // JOHN
```

---

## Section 19: Advanced Concepts

### Q120. Closures
**Task:**
Create a counter function that increments a private variable.
**Hint:**
Inner function has access to outer variables.
**Guide:**
1. Function returns another function.
**Code Idea:**
```javascript
function createCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
```

### Q121. Prototypes
**Task:**
Add a method to the Array prototype to print the first item.
**Hint:**
`Array.prototype.first = function() {}`.
**Guide:**
1. Modifying prototype affects all instances.
**Code Idea:**
```javascript
Array.prototype.first = function() {
    return this[0];
};
let arr = [1, 2, 3];
console.log(arr.first()); // 1
```

### Q122. Memory Leaks (Concept)
**Task:**
Identify how closures can cause memory leaks (referencing large objects).
**Hint:**
Variables not cleaned up by Garbage Collector.
**Guide:**
1. Explain concept (Code Idea: Just definition).
**Code Idea:**
```javascript
// Concept: If an outer function has a large object
// and an inner function references it, the large object stays in memory.
function leak() {
    let bigData = new Array(10000);
    return function() { console.log(bigData.length); }
}
// bigData cannot be GC'd as long as returned function exists.
```

---

## Section 20: Data Structures (Map, Set)

### Q123. Set
**Task:**
Remove duplicates from an array using Set.
**Hint:**
`new Set(array)`.
**Guide:**
1. Set only stores unique values.
**Code Idea:**
```javascript
let nums = [1, 1, 2, 2, 3];
let unique = [...new Set(nums)];
console.log(unique); // [1, 2, 3]
```

### Q124. Map
**Task:**
Create a Map where keys are strings (or any type).
**Hint:**
`map.set(key, val)`, `map.get(key)`.
**Guide:**
1. Maps maintain insertion order.
**Code Idea:**
```javascript
let map = new Map();
map.set("role", "admin");
console.log(map.get("role"));
```

### Q125. Map vs Object
**Task:**
Explain difference (Map keys can be any type, Object keys are strings).
**Hint:**
Conceptual.
**Guide:**
1. Map has size property.
**Code Idea:**
```javascript
let map = new Map();
let objKey = { id: 1 };
map.set(objKey, "Works");
console.log(map.get(objKey));
```

---

## Section 21: Modules (ES6)

### Q126. Export
**Task:**
Export a constant and a function from a file `utils.js`.
**Hint:**
`export const x = 1;`.
**Guide:**
1. Use `export` keyword.
**Code Idea:**
```javascript
// utils.js
export const API_KEY = "123";
export function log(msg) { console.log(msg); }
```

### Q127. Import
**Task:**
Import the function from `utils.js`.
**Hint:**
`import { log } from './utils.js'`.
**Guide:**
1. Use destructuring syntax.
**Code Idea:**
```javascript
// main.js
import { log, API_KEY } from './utils.js';
log("Hello");
```

### Q128. Default Export
**Task:**
Create a default export in a file.
**Hint:**
`export default class User {}`.
**Guide:**
1. One default per module.
**Code Idea:**
```javascript
// user.js
export default class User {
    constructor(name) { this.name = name; }
}
// main.js
// import User from './user.js';
```

---

## Section 22: Node.js Basics (Runtime)

### Q129. Global Object
**Task:**
Print the global object in Node.js.
**Hint:**
`global` or `globalThis`.
**Guide:**
1. Unlike browser `window`, Node has `global`.
**Code Idea:**
```javascript
// Run in Node
console.log(globalThis);
```

### Q130. Process Arguments
**Task:**
Print command line arguments.
**Hint:**
`process.argv`.
**Guide:**
1. Returns array. First two are node path and script path.
**Code Idea:**
```javascript
// Run: node script.js hello
console.log(process.argv[2]); // "hello"
```

### Q131. Read File (Sync)
**Task:**
Read a text file synchronously.
**Hint:**
`fs.readFileSync`.
**Guide:**
1. Require `fs` module.
**Code Idea:**
```javascript
const fs = require('fs');
// let data = fs.readFileSync('test.txt', 'utf8');
// console.log(data);
console.log("FS logic ready");
```

### Q132. Read File (Async)
**Task:**
Read a file asynchronously using a callback.
**Hint:**
`fs.readFile(path, cb)`.
**Guide:**
1. Non-blocking.
**Code Idea:**
```javascript
const fs = require('fs');
// fs.readFile('test.txt', 'utf8', (err, data) => {
//    if (err) throw err;
//    console.log(data);
// });
```

### Q133. Path Module
**Task:**
Join two path segments safely.
**Hint:**
`path.join('folder', 'file')`.
**Guide:**
1. Handles `/` or `\` based on OS.
**Code Idea:**
```javascript
const path = require('path');
let fullPath = path.join('src', 'app.js');
console.log(fullPath); // src/app.js
```

---

## Section 23: Advanced Patterns

### Q134. Debounce
**Task:**
Write a debounce function to limit how often a function fires (e.g., for search input).
**Hint:**
Use `setTimeout` inside wrapper. Clear timeout on new call.
**Guide:**
1. Wait for pause before executing.
**Code Idea:**
```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
```

### Q135. Memoization
**Task:**
Cache the result of an expensive function.
**Hint:**
Store results in an object key.
**Guide:**
1. Check if key exists in cache.
**Code Idea:**
```javascript
function memoize(fn) {
    const cache = {};
    return function(n) {
        if (n in cache) return cache[n];
        return cache[n] = fn(n);
    };
}
```

### Q136. Currying
**Task:**
Transform `sum(a, b)` into `sum(a)(b)`.
**Hint:**
Return a function from a function.
**Guide:**
1. Nested functions.
**Code Idea:**
```javascript
function sum(a) {
    return function(b) {
        return a + b;
    };
}
const add5 = sum(5);
console.log(add5(3)); // 8
```

---

## Section 24: Browser Storage

### Q137. LocalStorage
**Task:**
Save a name to LocalStorage. Refresh and retrieve it.
**Hint:**
`localStorage.setItem`, `localStorage.getItem`.
**Guide:**
1. Stores strings.
**Code Idea:**
```javascript
localStorage.setItem('user', 'John');
let user = localStorage.getItem('user');
console.log(user);
```

### Q138. SessionStorage
**Task:**
Store data that clears when tab closes.
**Hint:**
`sessionStorage`.
**Guide:**
1. Same API as localStorage.
**Code Idea:**
```javascript
sessionStorage.setItem('temp', 'data');
```

### Q139. JSON in Storage
**Task:**
Store an object in LocalStorage.
**Hint:**
Must stringify first.
**Guide:**
1. `JSON.stringify` on set.
2. `JSON.parse` on get.
**Code Idea:**
```javascript
let settings = { dark: true };
localStorage.setItem('settings', JSON.stringify(settings));
let s = JSON.parse(localStorage.getItem('settings'));
console.log(s.dark);
```

---

## Section 25: Real Projects

### Q140. Simple Calculator Logic
**Task:**
Write a function that takes 2 numbers and an operator string.
**Hint:**
Switch statement.
**Code Idea:**
```javascript
function calculate(a, op, b) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        default: return 0;
    }
}
```

### Q141. Digital Clock
**Task:**
Print time updating every second.
**Hint:**
`setInterval` and `Date`.
**Code Idea:**
```javascript
setInterval(() => {
    let d = new Date();
    console.log(d.toLocaleTimeString());
}, 1000);
```

### Q142. Random Quote Generator
**Task:**
Pick a random string from an array of quotes.
**Hint:**
`Math.floor(Math.random() * arr.length)`.
**Code Idea:**
```javascript
const quotes = ["A", "B", "C"];
let q = quotes[Math.floor(Math.random() * quotes.length)];
console.log(q);
```

### Q143. To-Do List Logic
**Task:**
Create an array `todos`. Write functions `addTodo` and `printTodos`.
**Hint:**
Push to array.
**Code Idea:**
```javascript
let todos = [];
function addTodo(task) { todos.push(task); }
function printTodos() { console.log(todos); }
addTodo("Learn JS");
printTodos();
```

### Q144. Password Validator
**Task:**
Check if password length > 8 and contains a number.
**Hint:**
Regex or string methods.
**Code Idea:**
```javascript
function validate(pass) {
    return pass.length >= 8 && /\d/.test(pass);
}
console.log(validate("pass1234")); // true
```

### Q145. Word Counter
**Task:**
Count words in a sentence.
**Hint:**
`str.split(' ').length`.
**Code Idea:**
```javascript
function countWords(str) {
    return str.trim().split(/\s+/).length;
}
```

### Q146. Palindrome Checker
**Task:**
Check if string is same forwards and backwards.
**Hint:**
`str === str.split('').reverse().join('')`.
**Code Idea:**
```javascript
function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}
```

### Q147. Email Format Checker
**Task:**
Validate email format using Regex.
**Hint:**
Simple regex pattern.
**Code Idea:**
```javascript
function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Q148. Capitalize First Letter
**Task:**
Capitalize the first letter of a string.
**Hint:**
`str[0].toUpperCase() + str.slice(1)`.
**Code Idea:**
```javascript
function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### Q149. Find Max/Min in Array
**Task:**
Find max without Math.max (using loop).
**Hint:**
Assume first is max, then loop.
**Code Idea:**
```javascript
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
```

### Q150. Remove Duplicates
**Task:**
Remove duplicates from array without Set (using filter).
**Hint:**
`filter((v, i, a) => a.indexOf(v) === i)`.
**Code Idea:**
```javascript
let arr = [1, 2, 2, 3];
let unique = arr.filter((v, i, a) => a.indexOf(v) === i);
```

### Q151. Flattening Array
**Task:**
Flatten a nested array `[[1,2], [3,4]]`.
**Hint:**
`arr.flat()` or reduce.
**Code Idea:**
```javascript
let nested = [[1, 2], [3, 4]];
console.log(nested.flat()); // [1, 2, 3, 4]
```

### Q152. Countdown Timer
**Task:**
Print numbers 10 down to 0.
**Hint:**
`setInterval` and `clearInterval`.
**Code Idea:**
```javascript
let c = 10;
let id = setInterval(() => {
    console.log(c--);
    if (c < 0) clearInterval(id);
}, 1000);
```

### Q153. Fetch User Data
**Task:**
Fetch user from API and print their email.
**Hint:**
`fetch` -> `json` -> access property.
**Code Idea:**
```javascript
// async function getEmail() {
//    let res = await fetch('.../users/1');
//    let user = await res.json();
//    console.log(user.email);
// }
```

### Q154. Higher Order Function Creator
**Task:**
Create a function `multiplyBy` that takes a number and returns a function that multiplies by that number.
**Hint:**
Closure.
**Code Idea:**
```javascript
function multiplyBy(x) {
    return function(y) { return x * y; }
}
let double = multiplyBy(2);
console.log(double(5)); // 10
```

### Q155. Sort Objects
**Task:**
Sort array of objects by age.
**Hint:**
`arr.sort((a,b) => a.age - b.age)`.
**Code Idea:**
```javascript
let users = [{age: 20}, {age: 15}];
users.sort((a,b) => a.age - b.age);
```

### Q156. Group by Property
**Task:**
Group array of people by `role`.
**Hint:**
Reduce.
**Code Idea:**
```javascript
let people = [{role: 'admin', name: 'A'}, {role: 'user', name: 'B'}];
let groups = people.reduce((acc, p) => {
    (acc[p.role] = acc[p.role] || []).push(p);
    return acc;
}, {});
```

### Q157. Deep Clone Object
**Task:**
Deep copy an object (not reference).
**Hint:**
`JSON.parse(JSON.stringify(obj))`.
**Code Idea:**
```javascript
let obj = { a: 1, b: { c: 2 } };
let clone = JSON.parse(JSON.stringify(obj));
```

### Q158. Query String Builder
**Task:**
Convert object `{a:1, b:2}` to `a=1&b=2`.
**Hint:**
`Object.keys` and map.
**Code Idea:**
```javascript
let params = {a:1, b:2};
let str = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
```

### Q159. Simple EventEmitter
**Task:**
Create an object with `on` and `emit` methods.
**Hint:**
Store listeners in object.
**Code Idea:**
```javascript
const emitter = {
    events: {},
    on(event, fn) { this.events[event] = fn; },
    emit(event, data) { if(this.events[event]) this.events[event](data); }
};
```

### Q160. Lazy Load Image Logic
**Task:**
Log "Loading image" when element enters viewport (Concept).
**Hint:**
`IntersectionObserver`.
**Code Idea:**
```javascript
// const observer = new IntersectionObserver((entries) => {
//     if (entries[0].isIntersecting) console.log("Load it!");
// });
```

### Q161. Stack Implementation
**Task:**
Create a Stack class with `push` and `pop`.
**Hint:**
Use array.
**Code Idea:**
```javascript
class Stack {
    constructor() { this.items = []; }
    push(el) { this.items.push(el); }
    pop() { return this.items.pop(); }
}
```

### Q162. Queue Implementation
**Task:**
Create a Queue class with `enqueue` and `dequeue`.
**Hint:**
`push` and `shift`.
**Code Idea:**
```javascript
class Queue {
    constructor() { this.items = []; }
    enqueue(el) { this.items.push(el); }
    dequeue() { return this.items.shift(); }
}
```

### Q163. Binary Search (Concept)
**Task:**
Implement binary search on sorted array.
**Hint:**
Split array in half, check middle.
**Code Idea:**
```javascript
function binarySearch(arr, val) {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === val) return mid;
        if (arr[mid] < val) start = mid + 1;
        else end = mid - 1;
    }
    return -1;
}
```

### Q164. FizzBuzz
**Task:**
Print Fizz for 3, Buzz for 5, FizzBuzz for 15.
**Hint:**
Order of checks matters.
**Code Idea:**
```javascript
for (let i = 1; i <= 20; i++) {
    console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
}
```

### Q165. Fibonacci Generator
**Task:**
Generate first 10 Fibonacci numbers.
**Hint:**
Recursive or iterative.
**Code Idea:**
```javascript
let a = 0, b = 1;
console.log(a); console.log(b);
for (let i = 2; i < 10; i++) {
    let c = a + b;
    console.log(c);
    a = b; b = c;
}
```

### Q166. Check Prime
**Task:**
Check if a number is prime.
**Hint:**
Loop up to sqrt(n).
**Code Idea:**
```javascript
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
```

### Q167. Reverse String
**Task:**
Reverse string without `.reverse()`.
**Hint:**
Decrementing loop.
**Code Idea:**
```javascript
function rev(str) {
    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str[i];
    }
    return newStr;
}
```

### Q168. Factorial
**Task:**
Calculate factorial.
**Hint:**
Recursion `n * fact(n-1)`.
**Code Idea:**
```javascript
function fact(n) {
    if (n === 0) return 1;
    return n * fact(n - 1);
}
```

### Q169. Shuffle Array
**Task:**
Shuffle array (Fisher-Yates).
**Hint:**
Swap current with random.
**Code Idea:**
```javascript
let arr = [1, 2, 3];
for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

### Q170. Parse URL Params
**Task:**
Get params from URL string.
**Hint:**
`URLSearchParams`.
**Code Idea:**
```javascript
let url = 'site.com?page=2';
let params = new URLSearchParams(url.split('?')[1]);
console.log(params.get('page'));
```

### Q171. Copy to Clipboard
**Task:**
Simulate copying text (browser API).
**Hint:**
`navigator.clipboard.writeText`.
**Code Idea:**
```javascript
// navigator.clipboard.writeText('Hello');
console.log("Clipboard API simulated.");
```

### Q172. Geolocation
**Task:**
Get user location (concept).
**Hint:**
`navigator.geolocation.getCurrentPosition`.
**Code Idea:**
```javascript
// navigator.geolocation.getCurrentPosition(pos => {
//    console.log(pos.coords.latitude);
// });
```

### Q173. Simple AJAX Call
**Task:**
Use XMLHttpRequest (old school) or fetch.
**Hint:**
Standard fetch is preferred.
**Code Idea:**
(See Fetch section)

### Q174. Cookie Handling
**Task:**
Set a cookie.
**Hint:**
`document.cookie = "name=John"`.
**Code Idea:**
```javascript
document.cookie = "user=John; expires=Fri, 31 Dec 2024 23:59:59 GMT";
console.log(document.cookie);
```

### Q175. LocalStorage Expiry
**Task:**
Create a storage item that expires in 1 minute.
**Hint:**
Store object with timestamp.
**Code Idea:**
```javascript
let obj = { data: "Hi", expiry: Date.now() + 60000 };
localStorage.setItem('temp', JSON.stringify(obj));
```

### Q176. Detect Browser
**Task:**
Check if user is on mobile.
**Hint:**
`navigator.userAgent`.
**Code Idea:**
```javascript
if (/Mobi/.test(navigator.userAgent)) {
    console.log("Mobile");
}
```

### Q177. Print Page
**Task:**
Trigger print dialog.
**Hint:**
`window.print()`.
**Code Idea:**
```javascript
// window.print();
```

### Q178. Redirect Page
**Task:**
Redirect to google.com.
**Hint:**
`window.location.href`.
**Code Idea:**
```javascript
// window.location.href = "https://google.com";
```

### Q179. Scroll to Top
**Task:**
Scroll window to top.
**Hint:**
`window.scrollTo(0, 0)`.
**Code Idea:**
```javascript
// window.scrollTo({ top: 0, behavior: 'smooth' });
```

### Q180. Dark Mode Toggle Logic
**Task:**
Toggle a class on body element.
**Hint:**
`classList.toggle`.
**Code Idea:**
```javascript
// document.body.classList.toggle('dark-mode');
```

### Q181. Form Validation Logic
**Task:**
Check if required fields are empty.
**Hint:**
Loop through inputs.
**Code Idea:**
```javascript
let inputs = document.querySelectorAll('input[required]');
let valid = true;
inputs.forEach(i => { if (i.value === '') valid = false; });
```

### Q182. Dynamic Table Row
**Task:**
Add a row to an HTML table.
**Hint:**
`insertRow` and `insertCell`.
**Code Idea:**
```javascript
let table = document.querySelector('table');
let row = table.insertRow();
let cell = row.insertCell();
cell.textContent = "New Data";
```

### Q183. Countdown to Date
**Task:**
Time remaining until New Year.
**Hint:**
`Date` diff.
**Code Idea:**
```javascript
let now = new Date();
let ny = new Date("Jan 1, 2025");
let diff = ny - now; // milliseconds
```

### Q184. Currency Formatter
**Task:**
Format number as currency ($).
**Hint:**
`Intl.NumberFormat`.
**Code Idea:**
```javascript
let price = 10;
let fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
console.log(fmt.format(price)); // $10.00
```

### Q185. String Hashing (Simple)
**Task:**
Create a simple hash from string.
**Hint:**
ASCII sum (not secure).
**Code Idea:**
```javascript
function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h += str.charCodeAt(i);
    }
    return h;
}
```

### Q186. Web Worker Concept
**Task:**
Explain how to run heavy script in background.
**Hint:**
`new Worker('script.js')`.
**Code Idea:**
// Concept: Offload heavy computation to separate thread.

### Q187. Service Worker Concept
**Task:**
Explain caching for offline apps.
**Hint:**
Intercept fetch events.
**Code Idea:**
// Concept: PWA (Progressive Web Apps).

### Q188. Canvas API
**Task:**
Draw a rectangle on canvas.
**Hint:**
`getContext('2d')`, `fillRect`.
**Code Idea:**
```javascript
// let ctx = canvas.getContext('2d');
// ctx.fillRect(10, 10, 50, 50);
```

### Q189. Audio/Video API
**Task:**
Play a video programmatically.
**Hint:**
`video.play()`.
**Code Idea:**
```javascript
// let vid = document.querySelector('video');
// vid.play();
```

### Q190. Drag and Drop
**Task:**
Allow an element to be dragged.
**Hint:**
`draggable="true"` attribute and `ondragstart`.
**Code Idea:**
```javascript
// el.ondragstart = (e) => { e.dataTransfer.setData('text', 'target'); };
```

### Q191. Unique ID Generator
**Task:**
Generate unique ID.
**Hint:**
`Date.now()` + random.
**Code Idea:**
```javascript
let uid = 'id-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
```

### Q192. Throttle Function
**Task:**
Limit function calls (like scroll event).
**Hint:**
Flag variable.
**Code Idea:**
```javascript
function throttle(fn, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            fn.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
```

### Q193. Simple Templating
**Task:**
Replace `{{name}}` with value in string.
**Hint:**
Regex.
**Code Idea:**
```javascript
let template = "Hello {{name}}";
let data = { name: "World" };
let res = template.replace(/{{name}}/g, data.name);
```

### Q194. Check Valid JSON
**Task:**
Check if string is valid JSON.
**Hint:**
Try-catch `JSON.parse`.
**Code Idea:**
```javascript
function isValidJSON(str) {
    try { JSON.parse(str); return true; }
    catch (e) { return false; }
}
```

### Q195. CSS Variable Manipulation
**Task:**
Change CSS variable via JS.
**Hint:**
`style.setProperty`.
**Code Idea:**
```javascript
// document.documentElement.style.setProperty('--main-color', 'red');
```

### Q196. Fullscreen API
**Task:**
Open element in fullscreen.
**Hint:**
`requestFullscreen()`.
**Code Idea:**
```javascript
// elem.requestFullscreen();
```

### Q197. Notification API
**Task:**
Request permission and show notification.
**Hint:**
`Notification.requestPermission()`.
**Code Idea:**
```javascript
// Notification.requestPermission().then(p => {
//    if(p === 'granted') new Notification("Hi!");
// });
```

### Q198. Local Database (IndexedDB Concept)
**Task:**
Explain IndexedDB usage.
**Hint:**
Browser-based NoSQL database.
**Code Idea:**
// Concept: Store large structured data client-side.

### Q199. Encoding/Decoding
**Task:**
Encode URI component.
**Hint:**
`encodeURIComponent`.
**Code Idea:**
```javascript
let url = "a b";
console.log(encodeURIComponent(url)); // a%20b
```

### Q200. Final Project - Book Manager
**Task:**
Create an array of book objects. Allow adding, listing, and deleting books via console functions.
**Hint:**
Combine array methods, objects, and functions.
**Guide:**
1. `books = []`.
2. `addBook(title, author)`.
3. `listBooks()`.
4. `removeBook(title)`.
**Code Idea:**
```javascript
let library = [];

function addBook(title, author) {
    library.push({ title, author, id: Date.now() });
}

function removeBook(id) {
    library = library.filter(b => b.id !== id);
}

function listBooks() {
    console.table(library);
}

addBook("JS Guide", "Me");
listBooks();
```