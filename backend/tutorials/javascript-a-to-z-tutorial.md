# Complete JavaScript Tutorial: From A to Z

## Table of Contents

1. [Introduction to JavaScript](#1-introduction-to-javascript)
2. [Variables and Data Types](#2-variables-and-data-types)
3. [Operators](#3-operators)
4. [Control Flow](#4-control-flow)
5. [Loops and Iterations](#5-loops-and-iterations)
6. [Functions](#6-functions)
7. [Arrays](#7-arrays)
8. [Objects](#8-objects)
9. [Strings and String Methods](#9-strings-and-string-methods)
10. [Numbers and Math](#10-numbers-and-math)
11. [Dates and Time](#11-dates-and-time)
12. [Regular Expressions](#12-regular-expressions)
13. [Error Handling](#13-error-handling)
14. [Asynchronous JavaScript](#14-asynchronous-javascript)
15. [DOM Manipulation](#15-dom-manipulation)
16. [Events and Event Handling](#16-events-and-event-handling)
17. [Classes and Object-Oriented Programming](#17-classes-and-object-oriented-programming)
18. [Modules](#18-modules)
19. [Destructuring and Spread/Rest Operators](#19-destructuring-and-spreadrest-operators)
20. [Maps, Sets, and Collections](#20-maps-sets-and-collections)
21. [JSON](#21-json)
22. [Web Storage API](#22-web-storage-api)
23. [Fetch API and HTTP Requests](#23-fetch-api-and-http-requests)
24. [Advanced Concepts](#24-advanced-concepts)
25. [Design Patterns](#25-design-patterns)
26. [Best Practices](#26-best-practices)
27. [Practical Projects](#27-practical-projects)

---

## 1. Introduction to JavaScript

JavaScript is a versatile, high-level programming language that powers the modern web. Originally created in 1995 by Brendan Eich at Netscape, JavaScript has evolved from a simple scripting language for adding interactivity to web pages into a full-featured programming language used for web development, server-side programming, mobile applications, desktop applications, and even machine learning. Understanding JavaScript is essential for any modern software developer, as it remains the most widely used programming language according to various developer surveys.

### 1.1 What is JavaScript?

JavaScript is a dynamically-typed, interpreted programming language with first-class functions. It supports multiple programming paradigms including object-oriented, functional, and event-driven programming. Unlike statically-typed languages like Java or C++, JavaScript determines variable types at runtime, which provides flexibility but requires careful attention to type-related bugs. The language is single-threaded but achieves concurrency through its event loop and asynchronous programming patterns, making it particularly well-suited for I/O-intensive applications like web servers and user interfaces.

```javascript
// JavaScript can run in browsers and Node.js
console.log("Hello, World!"); // Output: Hello, World!

// JavaScript is case-sensitive
let myVariable = 10;
let myvariable = 20; // Different variable!
console.log(myVariable); // Output: 10
console.log(myvariable); // Output: 20

// Statements end with semicolons (optional but recommended)
let x = 5
let y = 10
console.log(x + y) // Works, but semicolons are better practice
```

### 1.2 Where JavaScript Runs

JavaScript runs in various environments, each with its own API and capabilities. In web browsers, JavaScript has access to the Document Object Model (DOM) for manipulating web pages, the Web Storage API for local data persistence, and numerous other browser APIs. In Node.js, JavaScript gains access to the file system, network operations, and server-side capabilities. Understanding these environments helps you write appropriate code for each context.

```javascript
// Browser environment - has access to DOM
// document.getElementById('myElement'); // Works in browser

// Node.js environment - has access to file system
// const fs = require('fs');
// fs.readFileSync('file.txt', 'utf8'); // Works in Node.js

// Check the environment
const isBrowser = typeof window !== 'undefined';
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

console.log('Running in browser:', isBrowser);
console.log('Running in Node.js:', isNode);
```

### 1.3 Adding JavaScript to HTML

There are three ways to include JavaScript in a web page: inline within HTML elements, embedded in script tags, or linked as external files. External files are the recommended approach for production code as they promote separation of concerns and allow browsers to cache the scripts.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Tutorial</title>
    
    <!-- External JavaScript file (recommended) -->
    <script src="script.js" defer></script>
    
    <!-- Embedded JavaScript -->
    <script>
        // This script runs when parsed
        console.log('Inline script executed');
    </script>
</head>
<body>
    <!-- Inline JavaScript (not recommended) -->
    <button onclick="alert('Button clicked!')">Click Me</button>
    
    <!-- Script at end of body (traditional approach) -->
    <script>
        // DOM is ready here
        console.log('DOM fully loaded');
    </script>
</body>
</html>
```

### 1.4 JavaScript Comments and Code Style

Comments are essential for documenting your code and making it maintainable. Single-line comments start with `//`, while multi-line comments are enclosed in `/* */`. Following a consistent code style improves readability and helps teams collaborate effectively. Tools like ESLint and Prettier can automatically enforce style guidelines and format your code consistently.

```javascript
// Single-line comment - use for brief explanations

/*
 * Multi-line comment
 * Use for longer explanations
 * or documentation
 */

/**
 * JSDoc comment - use for function documentation
 * @param {string} name - The name to greet
 * @returns {string} A greeting message
 */
function greet(name) {
    // Good code style practices:
    // 1. Use meaningful variable names
    const greetingMessage = `Hello, ${name}!`;
    
    // 2. Use consistent indentation (2 or 4 spaces)
    if (name === 'World') {
        console.log('Special greeting!');
    }
    
    // 3. Use camelCase for variables and functions
    // 4. Use PascalCase for classes
    // 5. Use UPPER_SNAKE_CASE for constants
    
    return greetingMessage;
}

// Constants that should never change
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
```

---

## 2. Variables and Data Types

Variables are fundamental containers for storing data values in any programming language. In JavaScript, variables can be declared using `var`, `let`, or `const`, each with different scoping rules and mutability characteristics. Understanding these differences is crucial for writing bug-free code and following modern JavaScript best practices. JavaScript supports several data types, including primitives and objects, each with its own behavior and use cases.

### 2.1 Variable Declarations: var, let, const

The three ways to declare variables in JavaScript reflect the language's evolution. The `var` keyword was the original way to declare variables, but it has function-level scope that can lead to unexpected behavior. The `let` and `const` keywords, introduced in ES6 (2015), provide block-level scope, making code more predictable and easier to debug. Use `const` by default for values that shouldn't be reassigned, and `let` for variables that need to be reassigned.

```javascript
// var - function-scoped, can be redeclared, hoisted
var oldStyleVariable = "I'm function-scoped";

// let - block-scoped, cannot be redeclared, can be reassigned
let modernVariable = "I'm block-scoped";
modernVariable = "I can be reassigned"; // OK

// const - block-scoped, cannot be redeclared or reassigned
const constantVariable = "I cannot be reassigned";
// constantVariable = "New value"; // Error: Assignment to constant variable

// However, const objects and arrays can be mutated
const person = { name: "John", age: 30 };
person.age = 31; // OK - mutating the object
person.city = "New York"; // OK - adding new property
// person = {}; // Error - cannot reassign

const numbers = [1, 2, 3];
numbers.push(4); // OK - mutating the array
numbers[0] = 10; // OK - modifying element
// numbers = []; // Error - cannot reassign

// Demonstration of scope differences
function scopeDemo() {
    if (true) {
        var varVariable = "I exist throughout the function";
        let letVariable = "I only exist in this block";
        const constVariable = "Me too, only in this block";
    }
    
    console.log(varVariable); // "I exist throughout the function"
    // console.log(letVariable); // ReferenceError
    // console.log(constVariable); // ReferenceError
}

// var creates global variables (bad practice)
var globalVar = "I'm global"; // Creates property on window object
let globalLet = "I'm also global but not on window";

console.log(window.globalVar); // "I'm global" (in browser)
console.log(window.globalLet); // undefined
```

### 2.2 Primitive Data Types

JavaScript has seven primitive data types: string, number, bigint, boolean, undefined, null, and symbol. Primitives are immutable values that are compared by value rather than by reference. When you assign a primitive to a variable, you're storing the actual value, not a reference to it. This fundamental characteristic affects how primitives behave in assignments, comparisons, and function parameters.

```javascript
// String - text data enclosed in quotes
let singleQuote = 'Hello';
let doubleQuote = "World";
let templateLiteral = `Hello, ${singleQuote}!`; // String interpolation
let multilineString = `
    This is a
    multiline string
`;

// Number - integers and floating-point (IEEE 754 double-precision)
let integer = 42;
let float = 3.14159;
let negative = -10;
let scientific = 2.998e8; // Scientific notation
let infinity = Infinity;
let notANumber = NaN; // Result of undefined mathematical operations

// BigInt - for integers larger than Number can safely represent
let bigNumber = 9007199254740991n; // Note the 'n' suffix
let bigFromConstructor = BigInt("9007199254740991");
let bigCalculation = 1000000000000000000n * 2n;

// Boolean - true or false
let isActive = true;
let isComplete = false;

// Boolean conversion (truthy and falsy values)
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));      // false
console.log(Boolean(1));        // true
console.log(Boolean("text"));   // true
console.log(Boolean([]));       // true (empty array is truthy)
console.log(Boolean({}));       // true (empty object is truthy)

// undefined - variable declared but not assigned
let notAssigned;
console.log(notAssigned); // undefined

// null - intentional absence of value
let empty = null;
console.log(empty); // null

// Important: typeof null is 'object' (a JavaScript bug since the beginning)
console.log(typeof null); // "object" (use === null for null check)

// Symbol - unique identifier, often used as object property keys
let uniqueId = Symbol('id');
let anotherUniqueId = Symbol('id');
console.log(uniqueId === anotherUniqueId); // false - symbols are always unique

let user = {
    name: "John",
    [uniqueId]: 12345 // Using symbol as property key
};
console.log(user[uniqueId]); // 12345
```

### 2.3 Type Checking and Conversion

JavaScript provides several ways to check and convert types. The `typeof` operator returns a string indicating the type of its operand, though it has some quirks (like `typeof null` returning "object"). Type conversion can be explicit (using functions like `Number()`, `String()`, `Boolean()`) or implicit (through JavaScript's type coercion in operations).

```javascript
// typeof operator
console.log(typeof "hello");      // "string"
console.log(typeof 42);           // "number"
console.log(typeof 42n);          // "bigint"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (historical bug)
console.log(typeof Symbol());     // "symbol"
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" (arrays are objects)
console.log(typeof function(){}); // "function"

// Better type checking for specific types
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({}));       // false
console.log(null === null);           // true (use strict equality)
console.log(Number.isNaN(NaN));       // true (better than isNaN())

// Explicit type conversion
// To String
console.log(String(123));        // "123"
console.log(String(true));       // "true"
console.log(String(null));       // "null"
console.log(String(undefined));  // "undefined"
console.log((123).toString());   // "123"
console.log(String([1, 2, 3]));  // "1,2,3"

// To Number
console.log(Number("123"));      // 123
console.log(Number("123.45"));   // 123.45
console.log(Number("123abc"));   // NaN
console.log(Number(""));         // 0
console.log(Number(true));       // 1
console.log(Number(false));      // 0
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN
console.log(parseInt("123px"));  // 123
console.log(parseFloat("3.14")); // 3.14
console.log(parseInt("1010", 2)); // 10 (binary to decimal)

// To Boolean
console.log(Boolean(1));         // true
console.log(Boolean(0));         // false
console.log(Boolean("hello"));   // true
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean({}));        // true
console.log(Boolean([]));        // true

// Implicit type coercion (avoid when possible)
console.log("5" + 3);    // "53" (string concatenation)
console.log("5" - 3);    // 2 (numeric subtraction)
console.log("5" * "2");  // 10 (numeric multiplication)
console.log("5" / "2");  // 2.5 (numeric division)
console.log(5 + true);   // 6 (true becomes 1)
console.log(5 + false);  // 5 (false becomes 0)
console.log("5" == 5);   // true (type coercion)
console.log("5" === 5);  // false (strict equality, no coercion)
```

### 2.4 Objects and References

Objects in JavaScript are collections of key-value pairs where values can be any data type, including other objects and functions. Unlike primitives, objects are mutable and compared by reference. This means two objects with identical contents are not equal unless they reference the same memory location. Understanding reference semantics is crucial for avoiding common bugs in JavaScript applications.

```javascript
// Object literal
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isEmployed: true,
    address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
    },
    fullName: function() {
        return `${this.firstName} ${this.lastName}`;
    }
};

// Accessing properties
console.log(person.firstName);      // "John" (dot notation)
console.log(person["lastName"]);    // "Doe" (bracket notation)
console.log(person.fullName());     // "John Doe" (method call)

// Dynamic property access
const key = "age";
console.log(person[key]); // 30

// Adding, modifying, and deleting properties
person.email = "john@example.com"; // Add
person.age = 31;                    // Modify
delete person.isEmployed;           // Delete

// Check if property exists
console.log("firstName" in person);           // true
console.log(person.hasOwnProperty("email"));  // true
console.log("salary" in person);              // false

// Object reference behavior
const original = { value: 10 };
const reference = original; // Both point to same object
reference.value = 20;
console.log(original.value); // 20 (original changed!)

// Creating independent copy
const shallowCopy = { ...original }; // Spread operator
const objectAssign = Object.assign({}, original); // Object.assign

// Deep copy for nested objects
const deepCopy = JSON.parse(JSON.stringify(person));
// Or use structuredClone (modern approach)
const modernDeepCopy = structuredClone(person);

// Object comparison
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 === obj2); // false (different references)
console.log(obj1 === obj3); // true (same reference)

// Deep comparison function
function deepEqual(a, b) {
    if (a === b) return true;
    
    if (typeof a !== 'object' || typeof b !== 'object' || 
        a === null || b === null) {
        return false;
    }
    
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => deepEqual(a[key], b[key]));
}

console.log(deepEqual(obj1, obj2)); // true
```

---

## 3. Operators

JavaScript operators are symbols or keywords that perform operations on values and variables. They are fundamental to any computation or logic in your programs. Understanding operator precedence, associativity, and behavior with different data types helps you write correct and efficient expressions. JavaScript operators can be categorized into arithmetic, assignment, comparison, logical, bitwise, and special operators.

### 3.1 Arithmetic Operators

Arithmetic operators perform mathematical calculations on numbers. The `+` operator has a dual role: when used with numbers, it performs addition; when used with strings, it performs concatenation. This dual behavior can lead to unexpected results if not understood properly. The modulo operator `%` returns the remainder of division and is useful for determining if a number is even or odd, or for cycling through values.

```javascript
// Basic arithmetic
let a = 10;
let b = 3;

console.log(a + b);  // 13 (addition)
console.log(a - b);  // 7 (subtraction)
console.log(a * b);  // 30 (multiplication)
console.log(a / b);  // 3.333... (division)
console.log(a % b);  // 1 (modulo - remainder)
console.log(a ** b); // 1000 (exponentiation - ES2016)

// Increment and decrement
let counter = 5;
console.log(counter++);  // 5 (post-increment: returns then increments)
console.log(counter);    // 6
console.log(++counter);  // 7 (pre-increment: increments then returns)

counter = 5;
console.log(counter--);  // 5 (post-decrement)
console.log(--counter);  // 4 (pre-decrement)

// String concatenation vs arithmetic
console.log("5" + 3);    // "53" (concatenation)
console.log("5" - 3);    // 2 (subtraction converts to number)
console.log("5" * "2");  // 10 (multiplication converts)
console.log("5" / "2");  // 2.5 (division converts)

// Compound assignment operators
let num = 10;
num += 5;   // num = num + 5 = 15
num -= 3;   // num = num - 3 = 12
num *= 2;   // num = num * 2 = 24
num /= 4;   // num = num / 4 = 6
num %= 4;   // num = num % 4 = 2
num **= 3;  // num = num ** 3 = 8

// Practical examples
// Check if number is even
function isEven(n) {
    return n % 2 === 0;
}

// Get last digit
function getLastDigit(n) {
    return Math.abs(n) % 10;
}

// Wrap value in range
function wrap(value, min, max) {
    const range = max - min + 1;
    return ((value - min) % range + range) % range + min;
}

console.log(isEven(4));        // true
console.log(getLastDigit(12345)); // 5
console.log(wrap(15, 0, 10));  // 4 (wraps around)
```

### 3.2 Comparison Operators

Comparison operators evaluate expressions and return a boolean value. JavaScript has both abstract (loose) equality `==` and strict equality `===` operators. The strict equality operator checks both value and type without type coercion, making it the preferred choice for most comparisons to avoid unexpected type conversion results.

```javascript
// Equality operators
console.log(5 == "5");   // true (loose equality, type coercion)
console.log(5 === "5");  // false (strict equality, no coercion)
console.log(5 != "5");   // false (loose inequality)
console.log(5 !== "5");  // true (strict inequality)

// Relational operators
console.log(10 > 5);    // true (greater than)
console.log(10 >= 10);  // true (greater than or equal)
console.log(5 < 10);    // true (less than)
console.log(5 <= 5);    // true (less than or equal)

// String comparison (lexicographic)
console.log("apple" < "banana");  // true (alphabetical)
console.log("Apple" < "apple");   // true (uppercase comes before lowercase)
console.log("10" < "9");          // true (string comparison, "1" < "9")
console.log("10" > 9);            // true (numeric comparison)

// Special cases with null and undefined
console.log(null == undefined);   // true (special case)
console.log(null === undefined);  // false
console.log(null == 0);           // false
console.log(null >= 0);           // true (null becomes 0 in comparisons)
console.log(undefined > 0);       // false (undefined becomes NaN)

// NaN is never equal to anything
console.log(NaN == NaN);   // false
console.log(NaN === NaN);  // false
console.log(Number.isNaN(NaN)); // true (proper NaN check)

// Object comparison
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 == obj2);   // false (different references)
console.log(obj1 === obj2);  // false
console.log(obj1 === obj3);  // true (same reference)

// Practical comparison function
function compare(a, b) {
    if (typeof a !== typeof b) {
        return "Different types";
    }
    
    if (typeof a === 'object' && a !== null && b !== null) {
        return JSON.stringify(a) === JSON.stringify(b) 
            ? "Same content" 
            : "Different content";
    }
    
    return a === b ? "Same value" : "Different value";
}
```

### 3.3 Logical Operators

Logical operators are used to combine or manipulate boolean values. They return boolean results in most cases, with the exception of the `||` and `&&` operators which use short-circuit evaluation and can return non-boolean values. Understanding short-circuit behavior is essential for writing concise conditional logic and providing default values.

```javascript
// AND (&&) - returns first falsy value or last value
console.log(true && true);    // true
console.log(true && false);   // false
console.log(false && true);   // false (short-circuit)
console.log(false && false);  // false

// Short-circuit with non-boolean values
console.log(1 && 2);          // 2 (both truthy, returns last)
console.log(0 && 2);          // 0 (first is falsy, short-circuit)
console.log(null && "text");  // null
console.log(undefined && {}); // undefined

// OR (||) - returns first truthy value or last value
console.log(true || false);   // true
console.log(false || true);   // true
console.log(false || false);  // false
console.log(true || true);    // true (short-circuit)

// Short-circuit with non-boolean values
console.log(1 || 2);          // 1 (first is truthy)
console.log(0 || 2);          // 2 (first is falsy, returns second)
console.log(null || "default"); // "default"
console.log("" || "fallback");  // "fallback"

// NOT (!) - converts to boolean and negates
console.log(!true);           // false
console.log(!0);              // true
console.log(!"");             // true
console.log(!!"text");        // true (double negation = boolean conversion)

// Nullish coalescing (??) - returns first defined value
// Only null and undefined are considered "nullish"
console.log(null ?? "default");    // "default"
console.log(undefined ?? "default"); // "default"
console.log(0 ?? "default");       // 0 (0 is not nullish)
console.log("" ?? "default");      // "" (empty string is not nullish)
console.log(false ?? true);        // false (false is not nullish)

// Difference between || and ??
let config = {
    timeout: 0,
    retries: 0,
    fallback: ""
};

// With || (treats 0 and "" as falsy)
console.log(config.timeout || 3000);     // 3000 (probably wrong!)
console.log(config.retries || 5);        // 5 (probably wrong!)

// With ?? (only null/undefined trigger default)
console.log(config.timeout ?? 3000);     // 0 (correct)
console.log(config.retries ?? 5);        // 0 (correct)

// Optional chaining (?.) - safe property access
const user = {
    profile: {
        name: "John",
        address: null
    }
};

console.log(user.profile?.name);           // "John"
console.log(user.profile?.address?.city);  // undefined (no error)
console.log(user.settings?.theme);         // undefined (settings doesn't exist)

// Without optional chaining (would throw error)
// console.log(user.settings.theme); // TypeError: Cannot read property 'theme' of undefined

// Practical example: Default values
function greet(name) {
    // Old way
    name = name || "Guest";
    
    // Better: handle empty string
    name = name || "Guest";
    
    // Best: only null/undefined get default
    name = name ?? "Guest";
    
    // Or with nullish coalescing assignment
    name ??= "Guest";
    
    return `Hello, ${name}!`;
}

// Combining logical operators
const isLoggedIn = true;
const hasPermission = false;
const isAdmin = true;

console.log(isLoggedIn && hasPermission);        // false
console.log(isLoggedIn && (hasPermission || isAdmin)); // true
console.log(!isLoggedIn || hasPermission);       // false
```

### 3.4 Bitwise Operators

Bitwise operators work on 32-bit integer representations of numbers. While not commonly used in everyday JavaScript programming, they are useful for flags, permissions systems, and certain optimizations. Understanding how they work can help you work with binary data, colors, and perform certain mathematical operations more efficiently.

```javascript
// Bitwise operators work on 32-bit integers
let x = 5;  // Binary: 00000000000000000000000000000101
let y = 3;  // Binary: 00000000000000000000000000000011

// AND (&) - 1 if both bits are 1
console.log(x & y);  // 1 (Binary: 00000000000000000000000000000001)

// OR (|) - 1 if at least one bit is 1
console.log(x | y);  // 7 (Binary: 00000000000000000000000000000111)

// XOR (^) - 1 if bits are different
console.log(x ^ y);  // 6 (Binary: 00000000000000000000000000000110)

// NOT (~) - inverts all bits
console.log(~x);     // -6 (Two's complement: -(x + 1))

// Left shift (<<) - shifts bits left, fills with 0
console.log(x << 1); // 10 (Binary: 00000000000000000000000000001010)
console.log(x << 2); // 20 (Multiply by 2^n)

// Right shift (>>) - shifts bits right, preserves sign
console.log(x >> 1); // 2 (Binary: 00000000000000000000000000000010)
console.log(-5 >> 1); // -3 (Sign preserved)

// Unsigned right shift (>>>) - fills with 0
console.log(-5 >>> 1); // 2147483645 (Large positive number)

// Practical examples
// 1. Permission flags
const READ = 1;     // 0001
const WRITE = 2;    // 0010
const EXECUTE = 4;  // 0100
const DELETE = 8;   // 1000

let permissions = READ | WRITE; // 3 (0011)

console.log(permissions & READ);    // 1 (has READ permission)
console.log(permissions & EXECUTE); // 0 (no EXECUTE permission)
console.log(Boolean(permissions & READ)); // true

// Add permission
permissions |= EXECUTE; // 7 (0111)

// Remove permission
permissions &= ~WRITE;  // 5 (0101)

// Toggle permission
permissions ^= DELETE;  // 13 (1101) - adds DELETE
permissions ^= DELETE;  // 5 (0101) - removes DELETE

// 2. Check if number is power of 2
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(8));  // true
console.log(isPowerOfTwo(10)); // false

// 3. Swap values without temp variable
let a = 5, b = 3;
a = a ^ b; // 6
b = a ^ b; // 5
a = a ^ b; // 3
console.log(a, b); // 3, 5

// 4. Fast floor for positive numbers
console.log(~~3.7);  // 3 (double NOT truncates decimal)

// 5. RGB color manipulation
function hexToRgb(hex) {
    return {
        r: (hex >> 16) & 255,
        g: (hex >> 8) & 255,
        b: hex & 255
    };
}

function rgbToHex(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

console.log(hexToRgb(0xFF5733)); // { r: 255, g: 87, b: 51 }
console.log(rgbToHex(255, 87, 51).toString(16)); // "ff5733"
```

### 3.5 Other Operators

JavaScript includes several special-purpose operators that don't fit into other categories. These include the ternary conditional operator, the typeof operator, the delete operator, the in operator, and the instanceof operator. Each serves a specific purpose and understanding them helps you write more expressive and efficient code.

```javascript
// Ternary (conditional) operator
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Nested ternary (use sparingly - can be hard to read)
const score = 85;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" :
              score >= 60 ? "D" : "F";
console.log(grade); // "B"

// typeof operator
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (bug)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){});// "function"
console.log(typeof Symbol());    // "symbol"

// instanceof operator - checks prototype chain
class Animal {}
class Dog extends Animal {}

const dog = new Dog();
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
console.log([] instanceof Array);   // true
console.log([] instanceof Object);  // true

// delete operator - removes property from object
const obj = { a: 1, b: 2, c: 3 };
console.log(delete obj.b);    // true
console.log(obj);             // { a: 1, c: 3 }
console.log(delete obj.b);    // true (non-existent property)

// Cannot delete non-configurable properties
const arr = [1, 2, 3];
console.log(delete arr.length); // false (can't delete length)
console.log(delete arr[1]);     // true (creates "hole")
console.log(arr);               // [1, empty, 3]

// in operator - checks if property exists
const person = { name: "John", age: 30 };
console.log("name" in person);     // true
console.log("gender" in person);   // false
console.log("toString" in person); // true (inherited)

// Comma operator - evaluates both operands, returns second
let result = (2 + 3, 4 + 5);
console.log(result); // 9

// Useful in for loops
for (let i = 0, j = 10; i < j; i++, j--) {
    console.log(i, j);
}

// void operator - evaluates expression and returns undefined
console.log(void 0);           // undefined
console.log(void(2 + 3));      // undefined

// Useful for javascript: URLs that shouldn't navigate
// <a href="javascript:void(0)" onclick="doSomething()">Click</a>

// new operator - creates instance from constructor
function Person(name) {
    this.name = name;
}
const john = new Person("John");
console.log(john.name); // "John"

// super operator - calls parent class methods
class Parent {
    greet() {
        return "Hello from Parent";
    }
}

class Child extends Parent {
    greet() {
        return super.greet() + " and Child";
    }
}

const child = new Child();
console.log(child.greet()); // "Hello from Parent and Child"

// this operator - reference to current execution context
const context = {
    value: 42,
    getValue: function() {
        return this.value;
    },
    getArrowValue: () => this?.value // Arrow functions don't have their own 'this'
};

console.log(context.getValue());      // 42
console.log(context.getArrowValue()); // undefined (or global 'this')
```

---

## 4. Control Flow

Control flow statements allow you to control the order in which code is executed based on conditions. JavaScript provides conditional statements (if, else, switch) for branching logic and iteration statements (for, while, do-while) for loops. Mastering control flow is essential for implementing business logic and creating dynamic, responsive applications.

### 4.1 If-Else Statements

The if-else statement is the most fundamental control structure in JavaScript. It evaluates a condition and executes different code blocks based on whether the condition is truthy or falsy. The else if clause allows you to check multiple conditions in sequence, executing the first block whose condition evaluates to true.

```javascript
// Basic if statement
const temperature = 25;

if (temperature > 30) {
    console.log("It's hot!");
}

// If-else statement
const hour = 14;

if (hour < 12) {
    console.log("Good morning!");
} else {
    console.log("Good afternoon!");
}

// If-else if-else chain
const score = 75;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}

// Nested if statements
const age = 25;
const hasLicense = true;

if (age >= 18) {
    console.log("Adult");
    if (hasLicense) {
        console.log("Can drive");
    } else {
        console.log("Cannot drive - no license");
    }
} else {
    console.log("Minor");
}

// Multiple conditions with logical operators
const isLoggedIn = true;
const hasPermission = true;
const isAdmin = false;

if (isLoggedIn && hasPermission) {
    console.log("Access granted");
}

if (isLoggedIn || isAdmin) {
    console.log("Welcome back");
}

// Common patterns
// 1. Early return pattern (preferred for cleaner code)
function processUser(user) {
    if (!user) {
        return "No user provided";
    }
    
    if (!user.isActive) {
        return "User is inactive";
    }
    
    if (!user.hasPermission) {
        return "Permission denied";
    }
    
    return `Processing ${user.name}`;
}

// 2. Guard clauses
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
}

// 3. Default values
function greet(name) {
    if (!name) {
        name = "Guest";
    }
    return `Hello, ${name}!`;
}

// 4. Truthy/falsy checks
const value = "";
if (value) {
    console.log("Value exists");
} else {
    console.log("Value is empty");
}

// 5. Checking for specific types
function process(value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (Array.isArray(value)) {
        return value.length;
    } else if (value instanceof Date) {
        return value.toISOString();
    } else if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    return String(value);
}
```

### 4.2 Switch Statements

The switch statement provides a clean way to compare a value against multiple possible cases. It's often more readable than a long if-else chain when checking the same variable against different values. Remember to use break statements to prevent fall-through to subsequent cases, unless intentional.

```javascript
// Basic switch statement
const day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(dayName); // "Wednesday"

// Grouping cases (fall-through behavior)
const month = 2;
let season;

switch (month) {
    case 12:
    case 1:
    case 2:
        season = "Winter";
        break;
    case 3:
    case 4:
    case 5:
        season = "Spring";
        break;
    case 6:
    case 7:
    case 8:
        season = "Summer";
        break;
    case 9:
    case 10:
    case 11:
        season = "Autumn";
        break;
    default:
        season = "Invalid month";
}

console.log(season); // "Winter"

// Switch with expressions
const grade = "B";
let message;

switch (true) {
    case grade === "A":
        message = "Excellent!";
        break;
    case grade === "B":
    case grade === "C":
        message = "Good job!";
        break;
    case grade === "D":
        message = "You passed";
        break;
    case grade === "F":
        message = "You failed";
        break;
    default:
        message = "Invalid grade";
}

console.log(message); // "Good job!"

// Switch with string comparison
const command = "start";

switch (command.toLowerCase()) {
    case "start":
    case "begin":
        console.log("Starting...");
        break;
    case "stop":
    case "end":
        console.log("Stopping...");
        break;
    case "pause":
        console.log("Pausing...");
        break;
    case "resume":
        console.log("Resuming...");
        break;
    default:
        console.log("Unknown command");
}

// Switch with return (no break needed)
function getDayType(day) {
    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return "Weekday";
        case 6:
        case 7:
            return "Weekend";
        default:
            return "Invalid day";
    }
}

console.log(getDayType(6)); // "Weekend"

// Switch with objects and arrays
const action = { type: "UPDATE_USER", payload: { name: "John" } };

switch (action.type) {
    case "CREATE_USER":
        console.log("Creating user:", action.payload);
        break;
    case "UPDATE_USER":
        console.log("Updating user:", action.payload);
        break;
    case "DELETE_USER":
        console.log("Deleting user:", action.payload);
        break;
    default:
        console.log("Unknown action type");
}
```

### 4.3 Ternary Operator

The ternary operator is a concise way to write simple if-else statements in a single expression. It takes three operands: a condition, a value if true, and a value if false. While powerful for simple conditions, nested ternary operators should be avoided for readability.

```javascript
// Basic ternary
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Ternary with function calls
function getDiscount(isMember) {
    return isMember ? 0.1 : 0;
}

console.log(getDiscount(true));  // 0.1
console.log(getDiscount(false)); // 0

// Ternary with template literals
const temperature = 28;
const message = `It's ${temperature > 25 ? "hot" : "cool"} today`;
console.log(message); // "It's hot today"

// Multiple operations (using comma operator - not recommended)
let x;
const condition = true;
condition ? (x = 1, console.log("True")) : (x = 0, console.log("False"));

// Ternary for default values
function greet(name) {
    name = name ? name : "Guest";
    // Or with nullish coalescing
    name = name ?? "Guest";
    return `Hello, ${name}!`;
}

// Ternary for conditional object properties
const showDetails = true;
const user = {
    name: "John",
    ...(showDetails ? { email: "john@example.com", age: 30 } : {})
};

console.log(user); // { name: "John", email: "john@example.com", age: 30 }

// Ternary for conditional array elements
const includeExtra = true;
const items = [
    "item1",
    "item2",
    ...(includeExtra ? ["extra"] : [])
];

console.log(items); // ["item1", "item2", "extra"]

// Nested ternary (avoid this - hard to read)
const score = 75;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" :
              score >= 60 ? "D" : "F";

// Better: use if-else or a function
function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

// Ternary vs if-else performance
// Ternary is an expression (returns a value)
// if-else is a statement (doesn't return a value)

// This works with ternary:
const config = {
    debug: isDevelopment ? true : false
};

// This doesn't work with if-else:
// const config = {
//     if (isDevelopment) { debug: true } else { debug: false } // Syntax error
// };

// Real-world example: Feature flags
const featureFlags = {
    newUI: true,
    darkMode: false,
    beta: true
};

const theme = featureFlags.darkMode ? "dark" : "light";
const uiVersion = featureFlags.newUI ? "v2" : "v1";
const endpoint = featureFlags.beta ? "api.beta.example.com" : "api.example.com";

console.log({ theme, uiVersion, endpoint });
```

---

## 5. Loops and Iterations

Loops allow you to execute code repeatedly based on a condition. JavaScript provides several looping constructs: for, while, do-while, for...of, for...in, and array methods like forEach, map, filter, and reduce. Choosing the right loop for each situation is important for writing clean, efficient, and maintainable code.

### 5.1 For Loop

The classic for loop is the most flexible looping construct, giving you full control over initialization, condition, and iteration. It's ideal when you know the number of iterations in advance or need to access the index in each iteration.

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// Loop with different step
for (let i = 0; i < 10; i += 2) {
    console.log(i); // 0, 2, 4, 6, 8
}

// Reverse loop
for (let i = 5; i > 0; i--) {
    console.log(i); // 5, 4, 3, 2, 1
}

// Multiple variables
for (let i = 0, j = 10; i < j; i++, j--) {
    console.log(`i: ${i}, j: ${j}`);
}

// Loop through array
const fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(`${i}: ${fruits[i]}`);
}

// Loop through array backwards (useful for removing items)
const numbers = [1, 2, 3, 4, 5];
for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] % 2 === 0) {
        numbers.splice(i, 1); // Safe to remove while iterating
    }
}
console.log(numbers); // [1, 3, 5]

// Break statement - exit loop early
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // Exit loop when i is 5
    }
    console.log(i); // 0, 1, 2, 3, 4
}

// Continue statement - skip current iteration
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Skip when i is 2
    }
    console.log(i); // 0, 1, 3, 4
}

// Labeled statements for nested loops
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outerLoop; // Break out of both loops
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

// Practical example: Finding an element
const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" }
];

function findUser(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i]; // Early return
        }
    }
    return null;
}

console.log(findUser(2)); // { id: 2, name: "Jane" }

// Loop through string
const str = "Hello";
for (let i = 0; i < str.length; i++) {
    console.log(str[i]); // H, e, l, l, o
}

// Loop through object keys
const person = { name: "John", age: 30, city: "NYC" };
const keys = Object.keys(person);
for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    console.log(`${key}: ${person[key]}`);
}
```

### 5.2 While Loop

The while loop executes as long as a condition is true. It's useful when you don't know in advance how many iterations you need, such as when waiting for user input or processing data until a certain condition is met. Be careful to ensure the condition eventually becomes false to avoid infinite loops.

```javascript
// Basic while loop
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// While with condition check
let sum = 0;
let num = 1;
while (sum < 100) {
    sum += num;
    num++;
}
console.log(`Sum: ${sum}, Last number: ${num - 1}`); // Sum: 105, Last number: 14

// Process until condition met
let value = 1000;
while (value > 10) {
    value = value / 2;
    console.log(value);
}

// While with array
const items = [1, 2, 3, 4, 5];
while (items.length > 0) {
    const item = items.pop();
    console.log(`Processing: ${item}`);
}
console.log("Array is empty:", items);

// Input validation simulation
let userInput = "";
const validInputs = ["yes", "no", "maybe"];
let attempts = 0;

function simulateInput() {
    const inputs = ["invalid", "wrong", "yes"];
    return inputs[attempts++];
}

while (!validInputs.includes(userInput)) {
    userInput = simulateInput();
    console.log(`Received: ${userInput}`);
    
    if (attempts > 10) {
        console.log("Too many attempts");
        break;
    }
}

// Reading lines from a string
const text = "Line 1\nLine 2\nLine 3";
let position = 0;

while (position < text.length) {
    const nextNewline = text.indexOf("\n", position);
    let line;
    
    if (nextNewline === -1) {
        line = text.slice(position);
        position = text.length;
    } else {
        line = text.slice(position, nextNewline);
        position = nextNewline + 1;
    }
    
    console.log(line);
}

// Infinite loop with break
let running = true;
let counter = 0;

while (running) {
    counter++;
    console.log(`Iteration ${counter}`);
    
    if (counter >= 5) {
        running = false; // or break;
    }
}

// While with random condition
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

let randomSum = 0;
while (randomSum < 30) {
    const num = getRandomNumber();
    randomSum += num;
    console.log(`Added ${num}, total: ${randomSum}`);
}
```

### 5.3 Do-While Loop

The do-while loop is similar to while, but it guarantees at least one execution because the condition is checked at the end. This is useful for scenarios like menu selection, input validation, or any situation where you need to execute code at least once before checking the condition.

```javascript
// Basic do-while loop
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);

// Execute at least once even if condition is false
i = 10;
do {
    console.log(i); // Prints 10 even though i > 5
    i++;
} while (i < 5);

// Menu selection simulation
let choice;
let attempts = 0;

function getMenuChoice() {
    const choices = [0, 3, 2]; // Simulating user input
    return choices[attempts++];
}

do {
    console.log("=== Menu ===");
    console.log("1. Option 1");
    console.log("2. Option 2");
    console.log("3. Exit");
    
    choice = getMenuChoice();
    console.log(`You chose: ${choice}`);
    
    switch (choice) {
        case 1:
            console.log("Executing Option 1");
            break;
        case 2:
            console.log("Executing Option 2");
            break;
        case 3:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid choice, try again");
    }
} while (choice !== 3 && attempts < 5);

// Input validation
let inputValue;
let valid = false;

function getSimulatedInput() {
    const inputs = ["", "  ", "valid"];
    return inputs[attempts++];
}

attempts = 0;
do {
    inputValue = getSimulatedInput();
    valid = inputValue.trim().length > 0;
    
    if (!valid) {
        console.log("Input cannot be empty");
    }
} while (!valid && attempts < 5);

console.log(`Valid input: "${inputValue}"`);

// Retry with delay simulation
let success = false;
let retryCount = 0;
const maxRetries = 3;

function attemptOperation() {
    // Simulating operation that might fail
    retryCount++;
    console.log(`Attempt ${retryCount}`);
    
    // Succeeds on third try
    return retryCount === 3;
}

do {
    success = attemptOperation();
    
    if (!success && retryCount < maxRetries) {
        console.log("Retrying...");
    }
} while (!success && retryCount < maxRetries);

if (success) {
    console.log("Operation succeeded!");
} else {
    console.log("Operation failed after maximum retries");
}

// Number guessing game
const secretNumber = Math.floor(Math.random() * 100) + 1;
let guess;
let guessCount = 0;

function simulateGuess() {
    // Binary search simulation
    const guesses = [50, 75, 62, 68, 65, 63, 64];
    return guesses[guessCount++];
}

do {
    guess = simulateGuess();
    guessCount++;
    
    if (guess < secretNumber) {
        console.log(`${guess} is too low`);
    } else if (guess > secretNumber) {
        console.log(`${guess} is too high`);
    } else {
        console.log(`Correct! The number was ${secretNumber}`);
    }
} while (guess !== secretNumber && guessCount < 10);

console.log(`Guessed in ${guessCount} attempts`);
```

### 5.4 For...Of Loop

The for...of loop iterates over iterable objects like arrays, strings, maps, sets, and more. It provides a clean syntax for iterating over values without needing to manage indices manually. This is often the preferred loop for arrays when you don't need the index.

```javascript
// Array iteration
const colors = ["red", "green", "blue"];
for (const color of colors) {
    console.log(color);
}

// String iteration
const greeting = "Hello";
for (const char of greeting) {
    console.log(char); // H, e, l, l, o
}

// With entries() for index and value
for (const [index, color] of colors.entries()) {
    console.log(`${index}: ${color}`);
}

// Map iteration
const userMap = new Map([
    ["id", 1],
    ["name", "John"],
    ["email", "john@example.com"]
]);

for (const [key, value] of userMap) {
    console.log(`${key}: ${value}`);
}

// Set iteration
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5]);
for (const num of uniqueNumbers) {
    console.log(num); // 1, 2, 3, 4, 5 (no duplicates)
}

// Iterating over generator
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

for (const num of numberGenerator()) {
    console.log(num); // 1, 2, 3
}

// Iterating over arguments
function sumAll(...args) {
    let sum = 0;
    for (const num of args) {
        sum += num;
    }
    return sum;
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Breaking and continuing
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const num of numbers) {
    if (num === 5) continue; // Skip 5
    if (num > 8) break;      // Stop at 9
    console.log(num); // 1, 2, 3, 4, 6, 7, 8
}

// Nested iteration
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (const row of matrix) {
    for (const cell of row) {
        console.log(cell);
    }
}

// Flattened iteration
for (const cell of matrix.flat()) {
    console.log(cell); // 1, 2, 3, 4, 5, 6, 7, 8, 9
}

// Custom iterable
const range = {
    start: 1,
    end: 5,
    
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Destructuring in for...of
const people = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

for (const { name, age } of people) {
    console.log(`${name} is ${age} years old`);
}

// Practical example: Processing data
const products = [
    { name: "Laptop", price: 999, inStock: true },
    { name: "Phone", price: 699, inStock: false },
    { name: "Tablet", price: 399, inStock: true }
];

const availableProducts = [];
let totalValue = 0;

for (const product of products) {
    if (product.inStock) {
        availableProducts.push(product.name);
        totalValue += product.price;
    }
}

console.log("Available:", availableProducts);
console.log("Total value:", totalValue);
```

### 5.5 For...In Loop

The for...in loop iterates over the enumerable properties of an object, including inherited properties. It's primarily used for objects, not arrays. Be cautious when using for...in with arrays, as it iterates over indices as strings and includes custom properties.

```javascript
// Object iteration
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Check own properties (exclude inherited)
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(`Own property: ${key}`);
    }
}

// Array iteration (not recommended for arrays)
const arr = ["a", "b", "c"];
for (const index in arr) {
    console.log(`${index}: ${arr[index]}`); // "0: a", "1: b", "2: c"
}

// Problem with for...in on arrays
arr.customProp = "custom";
for (const index in arr) {
    console.log(index); // "0", "1", "2", "customProp" (includes custom property!)
}

// Better: use for...of for arrays
for (const element of arr) {
    console.log(element); // "a", "b", "c"
}

// Iterating over inherited properties
function Animal(name) {
    this.name = name;
}
Animal.prototype.species = "Unknown";

const dog = new Animal("Rex");

for (const key in dog) {
    console.log(key); // "name", "species" (includes inherited)
}

for (const key in dog) {
    if (dog.hasOwnProperty(key)) {
        console.log(`Own: ${key}`); // "name" only
    }
}

// Getting keys and values
const keys = Object.keys(person);
const values = Object.values(person);
const entries = Object.entries(person);

console.log(keys);   // ["name", "age", "city"]
console.log(values); // ["John", 30, "New York"]
console.log(entries); // [["name", "John"], ["age", 30], ["city", "New York"]]

// Practical example: Object transformation
const scores = {
    math: 90,
    science: 85,
    english: 92,
    history: 88
};

let total = 0;
let count = 0;
const subjectCount = {};

for (const subject in scores) {
    total += scores[subject];
    count++;
    subjectCount[subject] = scores[subject] >= 90 ? "A" :
                            scores[subject] >= 80 ? "B" :
                            scores[subject] >= 70 ? "C" : "D";
}

const average = total / count;
console.log(`Average: ${average}`);
console.log("Grades:", subjectCount);

// Object cloning
const original = { a: 1, b: 2, c: 3 };
const clone = {};

for (const key in original) {
    if (original.hasOwnProperty(key)) {
        clone[key] = original[key];
    }
}

// Or use spread operator
const spreadClone = { ...original };

// Or Object.assign
const assignClone = Object.assign({}, original);

// Merging objects
const defaults = { theme: "light", fontSize: 14, showNotifications: true };
const userPrefs = { theme: "dark", fontSize: 16 };
const settings = {};

for (const key in defaults) {
    settings[key] = userPrefs.hasOwnProperty(key) ? userPrefs[key] : defaults[key];
}

console.log(settings); // { theme: "dark", fontSize: 16, showNotifications: true }
```

### 5.6 Array Methods for Iteration

Modern JavaScript provides powerful array methods for iteration that are often more expressive and concise than traditional loops. These methods include forEach, map, filter, reduce, find, some, every, and more. They enable a functional programming style that is often cleaner and less error-prone.

```javascript
// forEach - execute function for each element
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index, array) => {
    console.log(`Index ${index}: ${num}`);
});

// Practical forEach usage
const cart = [
    { item: "Laptop", price: 999 },
    { item: "Mouse", price: 29 },
    { item: "Keyboard", price: 79 }
];

let total = 0;
cart.forEach(product => {
    total += product.price;
});
console.log(`Total: $${total}`);

// map - transform each element, return new array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const products = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 699 }
];

const productNames = products.map(p => p.name);
console.log(productNames); // ["Laptop", "Phone"]

const formatted = products.map((p, i) => `${i + 1}. ${p.name}: $${p.price}`);
console.log(formatted); // ["1. Laptop: $999", "2. Phone: $699"]

// filter - return elements that pass a test
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

const affordableProducts = products.filter(p => p.price < 800);
console.log(affordableProducts); // [{ name: "Phone", price: 699 }]

// Complex filter
const users = [
    { name: "John", age: 30, active: true },
    { name: "Jane", age: 25, active: false },
    { name: "Bob", age: 35, active: true }
];

const activeAdults = users.filter(u => u.active && u.age >= 30);
console.log(activeAdults); // [{ name: "John", ... }, { name: "Bob", ... }]

// find - return first element that passes test
const found = numbers.find(num => num > 3);
console.log(found); // 4

const expensiveProduct = products.find(p => p.price > 500);
console.log(expensiveProduct); // { name: "Laptop", price: 999 }

// findIndex - return index of first element that passes test
const index = numbers.findIndex(num => num > 3);
console.log(index); // 3

// some - check if any element passes test
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

const hasExpensive = products.some(p => p.price > 1000);
console.log(hasExpensive); // false

// every - check if all elements pass test
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

const allActive = users.every(u => u.active);
console.log(allActive); // false

// reduce - reduce to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

// Reduce for complex transformations
const max = numbers.reduce((acc, num) => num > acc ? num : acc);
console.log(max); // 5

// Reduce to object
const usersById = users.reduce((acc, user) => {
    acc[user.name.toLowerCase()] = user;
    return acc;
}, {});

console.log(usersById);

// Reduce for grouping
const groupedByAge = users.reduce((acc, user) => {
    const decade = Math.floor(user.age / 10) * 10 + 's';
    if (!acc[decade]) acc[decade] = [];
    acc[decade].push(user);
    return acc;
}, {});

console.log(groupedByAge);

// reduceRight - reduce from right to left
const reversed = numbers.reduceRight((acc, num) => [...acc, num], []);
console.log(reversed); // [5, 4, 3, 2, 1]

// flat - flatten nested arrays
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.flat();
console.log(flattened); // [1, 2, 3, 4, 5]

const deepNested = [1, [2, [3, [4, [5]]]]];
console.log(deepNested.flat(2)); // [1, 2, 3, [4, [5]]]
console.log(deepNested.flat(Infinity)); // [1, 2, 3, 4, 5]

// flatMap - map then flatten
const sentences = ["Hello World", "Hi There"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "World", "Hi", "There"]

// Method chaining
const result = numbers
    .filter(num => num % 2 === 1)  // [1, 3, 5]
    .map(num => num * 2)            // [2, 6, 10]
    .reduce((acc, num) => acc + num, 0); // 18

console.log(result); // 18

// Real-world example: Data processing pipeline
const orders = [
    { id: 1, customer: "John", total: 100, status: "completed" },
    { id: 2, customer: "Jane", total: 200, status: "pending" },
    { id: 3, customer: "Bob", total: 150, status: "completed" },
    { id: 4, customer: "John", total: 50, status: "completed" }
];

const completedOrdersByJohn = orders
    .filter(order => order.status === "completed")
    .filter(order => order.customer === "John")
    .reduce((sum, order) => sum + order.total, 0);

console.log(`John's completed orders total: $${completedOrdersByJohn}`);
```

---

## 6. Functions

Functions are reusable blocks of code that perform specific tasks. They are fundamental building blocks in JavaScript, enabling code reuse, abstraction, and modularity. JavaScript supports multiple ways to define functions, each with its own characteristics and use cases. Understanding function scope, closures, and the `this` keyword is essential for mastering JavaScript.

### 6.1 Function Declarations and Expressions

JavaScript provides several ways to define functions. Function declarations are hoisted, meaning they can be called before they're defined in the code. Function expressions, on the other hand, are not hoisted and must be defined before use. Choosing between them depends on code organization preferences and specific requirements.

```javascript
// Function declaration (hoisted)
greet("John"); // Works! - function is hoisted

function greet(name) {
    console.log(`Hello, ${name}!`);
}

// Function expression (not hoisted)
// sayGoodbye("John"); // Error! - function expression not hoisted

const sayGoodbye = function(name) {
    console.log(`Goodbye, ${name}!`);
};

sayGoodbye("John"); // Works now

// Named function expression (useful for debugging)
const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
};

console.log(factorial(5)); // 120

// Function hoisting demonstration
console.log(declaredFunc); // [Function: declaredFunc] - function is hoisted
// console.log(expressedFunc); // Error - only variable declaration is hoisted, not assignment

function declaredFunc() {
    return "I'm declared";
}

var expressedFunc = function() {
    return "I'm expressed";
};

// Parameters and arguments
function add(a, b) {
    return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2));    // NaN (b is undefined, 2 + undefined = NaN)

// Default parameters (ES6)
function greetWithDefault(name = "Guest", greeting = "Hello") {
    console.log(`${greeting}, ${name}!`);
}

greetWithDefault();              // "Hello, Guest!"
greetWithDefault("John");        // "Hello, John!"
greetWithDefault("John", "Hi");  // "Hi, John!"

// Default parameter with expression
function greetWithTime(name = "Guest", time = new Date().getHours()) {
    const greeting = time < 12 ? "Good morning" :
                     time < 18 ? "Good afternoon" : "Good evening";
    return `${greeting}, ${name}!`;
}

// Rest parameters
function sumAll(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Rest parameters with regular parameters
function logTags(message, ...tags) {
    console.log(`Message: ${message}`);
    console.log(`Tags: ${tags.join(", ")}`);
}

logTags("System started", "info", "system", "startup");

// Arguments object (older JavaScript, use rest parameters instead)
function showArguments() {
    console.log(arguments); // Array-like object
    console.log(arguments.length); // Number of arguments
    console.log(arguments[0]); // First argument
}

showArguments(1, 2, 3, 4); // { '0': 1, '1': 2, '2': 3, '3': 4 }

// Return values
function noReturn() {
    // No return statement
}

console.log(noReturn()); // undefined

function earlyReturn(value) {
    if (!value) {
        return "No value provided"; // Early return
    }
    return `Value: ${value}`;
}

// Functions as values
const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

function calculate(operation, a, b) {
    if (operations[operation]) {
        return operations[operation](a, b);
    }
    throw new Error(`Unknown operation: ${operation}`);
}

console.log(calculate("add", 5, 3)); // 8

// Functions as parameters (callbacks)
function processData(data, callback) {
    console.log("Processing data...");
    const result = callback(data);
    console.log("Result:", result);
}

processData([1, 2, 3], data => data.reduce((a, b) => a + b, 0));

// Returning functions (higher-order functions)
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("This runs immediately!");
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})("World");

// IIFE with arrow function
(() => {
    console.log("Arrow IIFE");
})();
```

### 6.2 Arrow Functions

Arrow functions, introduced in ES6, provide a concise syntax for writing functions. They have a unique characteristic: they don't have their own `this` binding, instead inheriting `this` from the enclosing scope. This makes them ideal for callbacks and methods that need to preserve the surrounding context, but unsuitable for object methods or constructors that need their own `this`.

```javascript
// Basic arrow function
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Single parameter - parentheses optional
const square = x => x * x;
console.log(square(5)); // 25

// No parameters
const getRandom = () => Math.random();
console.log(getRandom());

// Multiple statements require block and return
const calculateArea = (width, height) => {
    const area = width * height;
    return `Area: ${area} square units`;
};

// Returning an object literal
const createUser = (name, age) => ({ name, age });
console.log(createUser("John", 30)); // { name: "John", age: 30 }

// Arrow functions and 'this'
const obj = {
    name: "Object",
    
    // Regular function - 'this' refers to the object
    regularMethod: function() {
        console.log(this.name); // "Object"
        
        // Inner function - 'this' is undefined (or global in non-strict)
        setTimeout(function() {
            console.log(this.name); // undefined
        }, 100);
    },
    
    // Arrow function - 'this' is inherited from enclosing scope
    arrowMethod: function() {
        console.log(this.name); // "Object"
        
        // Arrow function inherits 'this'
        setTimeout(() => {
            console.log(this.name); // "Object"
        }, 100);
    },
    
    // Arrow function as method - 'this' is from definition context, not call site
    notWorkingArrow: () => {
        console.log(this.name); // undefined (inherited from outer scope)
    }
};

obj.regularMethod();
obj.arrowMethod();
obj.notWorkingArrow();

// Arrow functions are ideal for callbacks
const numbers = [1, 2, 3, 4, 5];

// Traditional anonymous function
const doubled1 = numbers.map(function(num) {
    return num * 2;
});

// Arrow function (concise)
const doubled2 = numbers.map(num => num * 2);

console.log(doubled1, doubled2); // [2, 4, 6, 8, 10] [2, 4, 6, 8, 10]

// Arrow functions with array methods
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

const names = users.map(u => u.name);
const adults = users.filter(u => u.age >= 30);
const totalAge = users.reduce((sum, u) => sum + u.age, 0);

console.log(names);   // ["John", "Jane", "Bob"]
console.log(adults);  // [{ name: "John", age: 30 }, { name: "Bob", age: 35 }]
console.log(totalAge); // 90

// Arrow functions cannot be used as constructors
const Person = (name) => {
    this.name = name;
};

// const john = new Person("John"); // Error: Person is not a constructor

// Arrow functions have no 'arguments' object
const showArgs = () => {
    // console.log(arguments); // ReferenceError
};

// Use rest parameters instead
const showArgsArrow = (...args) => {
    console.log(args);
};

showArgsArrow(1, 2, 3); // [1, 2, 3]

// Arrow functions have no 'prototype'
const regularFunc = function() {};
const arrowFunc = () => {};

console.log(regularFunc.prototype); // { constructor: f }
console.log(arrowFunc.prototype);   // undefined

// Arrow functions cannot be generators
// const gen = *() => { yield 1; }; // Syntax error

// When to use arrow functions vs regular functions
class Counter {
    constructor() {
        this.count = 0;
    }
    
    // Use arrow function for callbacks to preserve 'this'
    start() {
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    }
    
    // Use regular function for methods that need their own 'this'
    increment() {
        this.count++;
        return this.count;
    }
}

// Arrow function in event handlers
class Button {
    constructor(element) {
        this.element = element;
        this.clickCount = 0;
        
        // Arrow function preserves 'this'
        this.element.addEventListener('click', () => {
            this.clickCount++;
            console.log(`Clicked ${this.clickCount} times`);
        });
    }
}
```

### 6.3 Closures

A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. Closures are created every time a function is created, and they allow for data encapsulation, private variables, and function factories. Understanding closures is essential for advanced JavaScript patterns and avoiding common pitfalls.

```javascript
// Basic closure
function outerFunction() {
    const outerVariable = "I'm from outer!";
    
    function innerFunction() {
        console.log(outerVariable); // Accesses outer variable
    }
    
    return innerFunction;
}

const myClosure = outerFunction();
myClosure(); // "I'm from outer!" - variable still accessible

// Closure for data privacy
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
// console.log(count); // Error - count is private

// Closure with parameters
function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

console.log(sayHello("John")); // "Hello, John!"
console.log(sayHi("Jane"));    // "Hi, Jane!"

// Closure for function factories
function createValidator(rules) {
    return function(value) {
        for (const rule of rules) {
            if (!rule.test(value)) {
                return { valid: false, message: rule.message };
            }
        }
        return { valid: true };
    };
}

const validatePassword = createValidator([
    { test: v => v.length >= 8, message: "Must be at least 8 characters" },
    { test: v => /[A-Z]/.test(v), message: "Must contain uppercase" },
    { test: v => /[0-9]/.test(v), message: "Must contain number" }
]);

console.log(validatePassword("weak")); // { valid: false, message: "..." }
console.log(validatePassword("Strong1Password")); // { valid: true }

// Closure pitfall: loop variable capture
// Problem:
console.log("Problem with var:");
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Prints 3, 3, 3 (not 0, 1, 2)
    }, 100);
}

// Solution 1: Use let (block scope)
console.log("Solution with let:");
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Prints 0, 1, 2
    }, 100);
}

// Solution 2: IIFE to capture value
console.log("Solution with IIFE:");
for (var i = 0; i < 3; i++) {
    (function(capturedI) {
        setTimeout(function() {
            console.log(capturedI); // Prints 0, 1, 2
        }, 100);
    })(i);
}

// Memoization with closures
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log("From cache:", key);
            return cache[key];
        }
        
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

const memoizedFib = memoize(function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

// Module pattern with closures
const myModule = (function() {
    // Private variables
    let privateVar = "I'm private";
    
    // Private function
    function privateFunction() {
        console.log("Private function called");
    }
    
    // Public API
    return {
        publicVar: "I'm public",
        
        publicMethod: function() {
            console.log(privateVar);
            privateFunction();
        },
        
        getPrivate: function() {
            return privateVar;
        },
        
        setPrivate: function(value) {
            privateVar = value;
        }
    };
})();

myModule.publicMethod();
console.log(myModule.publicVar);
// myModule.privateFunction(); // Error - not accessible

// Closure for event handling
function createButtonHandler(buttonId) {
    let clickCount = 0;
    
    return function(event) {
        clickCount++;
        console.log(`Button ${buttonId} clicked ${clickCount} times`);
    };
}

// Currying with closures
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const curriedAdd = curry((a, b, c) => a + b + c);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### 6.4 Higher-Order Functions

Higher-order functions are functions that take other functions as arguments, return functions, or both. They enable powerful abstractions and functional programming patterns. JavaScript's array methods like map, filter, and reduce are examples of built-in higher-order functions. Creating your own higher-order functions allows for flexible and reusable code.

```javascript
// Functions that take functions as arguments
function executeOperation(a, b, operation) {
    return operation(a, b);
}

const result1 = executeOperation(5, 3, (a, b) => a + b);
const result2 = executeOperation(5, 3, (a, b) => a * b);
console.log(result1, result2); // 8, 15

// Functions that return functions
function createLogger(prefix) {
    return function(message) {
        console.log(`[${prefix}] ${message}`);
    };
}

const infoLogger = createLogger("INFO");
const errorLogger = createLogger("ERROR");

infoLogger("Application started");  // [INFO] Application started
errorLogger("Something went wrong"); // [ERROR] Something went wrong

// Function composition
function compose(...functions) {
    return function(value) {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composedFn = compose(addOne, double, square);
console.log(composedFn(3)); // ((3^2) * 2) + 1 = 19

// Pipe (reverse of compose)
function pipe(...functions) {
    return function(value) {
        return functions.reduce((acc, fn) => fn(acc), value);
    };
}

const pipedFn = pipe(addOne, double, square);
console.log(pipedFn(3)); // ((3 + 1) * 2)^2 = 64

// Once function - ensures function is called only once
function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initialize = once(() => {
    console.log("Initializing...");
    return "Initialized";
});

console.log(initialize()); // "Initializing..." then "Initialized"
console.log(initialize()); // "Initialized" (no log)

// Debounce function
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const debouncedSearch = debounce((query) => {
    console.log(`Searching for: ${query}`);
}, 300);

debouncedSearch("h");
debouncedSearch("he");
debouncedSearch("hello"); // Only this executes after 300ms

// Throttle function
function throttle(fn, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const throttledScroll = throttle(() => {
    console.log("Scroll event processed");
}, 1000);

// Partial application
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

const add = (a, b, c) => a + b + c;
const addFive = partial(add, 5);
console.log(addFive(3, 2)); // 10

// Flip function arguments
function flip(fn) {
    return function(...args) {
        return fn(...args.reverse());
    };
}

const subtract = (a, b) => a - b;
const flippedSubtract = flip(subtract);
console.log(subtract(5, 3));       // 2
console.log(flippedSubtract(5, 3)); // -2

// Unary function wrapper
function unary(fn) {
    return function(arg) {
        return fn(arg);
    };
}

// Problem: parseInt takes two arguments (string, radix)
console.log(['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]

// Solution: use unary wrapper
console.log(['1', '2', '3'].map(unary(parseInt))); // [1, 2, 3]

// Property extractor
function prop(key) {
    return function(obj) {
        return obj[key];
    };
}

const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 }
];

console.log(users.map(prop('name'))); // ["John", "Jane"]
console.log(users.map(prop('age')));  // [30, 25]

// Predicate combinators
function not(predicate) {
    return function(...args) {
        return !predicate(...args);
    };
}

function and(...predicates) {
    return function(...args) {
        return predicates.every(p => p(...args));
    };
}

function or(...predicates) {
    return function(...args) {
        return predicates.some(p => p(...args));
    };
}

const isEven = n => n % 2 === 0;
const isPositive = n => n > 0;
const isOdd = not(isEven);
const isPositiveEven = and(isPositive, isEven);
const isEvenOrPositive = or(isEven, isPositive);

console.log(isOdd(3));           // true
console.log(isPositiveEven(4));  // true
console.log(isEvenOrPositive(-3)); // false
```

---

## 7. Arrays

Arrays are ordered collections of items that can hold any type of data. JavaScript arrays are dynamic, meaning they can grow or shrink in size, and they can contain elements of different types. Arrays provide numerous built-in methods for manipulation, searching, sorting, and iteration. Understanding arrays and their methods is fundamental to effective JavaScript programming.

### 7.1 Creating and Accessing Arrays

Arrays can be created using array literals or the Array constructor. Elements are accessed by zero-based index, and JavaScript allows accessing indices beyond the array length without error (returns undefined). Arrays have a dynamic length property that automatically updates when elements are added or removed.

```javascript
// Creating arrays
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(5); // Creates array with length 5 (empty)
const arr3 = new Array(1, 2, 3); // Creates array [1, 2, 3]
const arr4 = Array.of(1, 2, 3); // Creates array [1, 2, 3]
const arr5 = Array.from("hello"); // Creates array ['h', 'e', 'l', 'l', 'o']

// Array with mixed types
const mixed = [1, "hello", true, null, undefined, { name: "John" }, [1, 2]];

// Accessing elements
console.log(arr1[0]);  // 1 (first element)
console.log(arr1[4]);  // 5 (last element)
console.log(arr1[-1]); // undefined (no negative indexing)
console.log(arr1[100]); // undefined (out of bounds)

// Accessing last elements
console.log(arr1[arr1.length - 1]); // 5
console.log(arr1.at(-1)); // 5 (ES2022 - negative indexing)

// Length property
console.log(arr1.length); // 5
arr1.length = 3; // Truncates array
console.log(arr1); // [1, 2, 3]

// Adding elements
const arr = [1, 2, 3];
arr.push(4);       // Add to end: [1, 2, 3, 4]
arr.unshift(0);    // Add to beginning: [0, 1, 2, 3, 4]
arr[5] = 5;        // Add at index: [0, 1, 2, 3, 4, 5]
arr[arr.length] = 6; // Add to end: [0, 1, 2, 3, 4, 5, 6]

// Removing elements
const last = arr.pop();      // Remove from end: returns 6
const first = arr.shift();   // Remove from beginning: returns 0

// Deleting elements (creates holes - not recommended)
delete arr[2]; // [0, 1, empty, 3, 4, 5]

// Splice for adding/removing at any position
const nums = [1, 2, 3, 4, 5];

// Remove 2 elements starting at index 1
const removed = nums.splice(1, 2); // removed: [2, 3], nums: [1, 4, 5]

// Insert elements at index 1
nums.splice(1, 0, 'a', 'b'); // nums: [1, 'a', 'b', 4, 5]

// Replace elements
nums.splice(1, 2, 'x', 'y'); // nums: [1, 'x', 'y', 4, 5]

// Slice - extract portion without modifying original
const letters = ['a', 'b', 'c', 'd', 'e'];
const sliced = letters.slice(1, 4); // ['b', 'c', 'd']
const copy = letters.slice(); // Creates shallow copy
const lastThree = letters.slice(-3); // ['c', 'd', 'e']

// Concat - merge arrays
const arrA = [1, 2];
const arrB = [3, 4];
const merged = arrA.concat(arrB); // [1, 2, 3, 4]
const multiConcat = arrA.concat(arrB, [5, 6], 7); // [1, 2, 3, 4, 5, 6, 7]

// Spread operator for merging (ES6)
const spreadMerged = [...arrA, ...arrB]; // [1, 2, 3, 4]

// Fill - fill array with value
const filled = new Array(5).fill(0); // [0, 0, 0, 0, 0]
const partialFill = [1, 2, 3, 4, 5].fill(0, 1, 3); // [1, 0, 0, 4, 5]

// Copy within - copy portion within array
const cw = [1, 2, 3, 4, 5];
cw.copyWithin(0, 3, 5); // [4, 5, 3, 4, 5] - copy elements 3-5 to position 0
```

### 7.2 Array Search and Sorting

JavaScript provides multiple methods for searching arrays and sorting elements. Understanding the differences between indexOf, find, includes, and other search methods helps you choose the right tool for each situation. Sorting in JavaScript converts elements to strings by default, which can produce unexpected results with numbers.

```javascript
// indexOf - find first index of element
const fruits = ['apple', 'banana', 'orange', 'banana'];
console.log(fruits.indexOf('banana'));     // 1
console.log(fruits.indexOf('grape'));      // -1 (not found)
console.log(fruits.indexOf('banana', 2));  // 3 (start from index 2)

// lastIndexOf - find last index
console.log(fruits.lastIndexOf('banana')); // 3

// includes - check if element exists
console.log(fruits.includes('orange'));    // true
console.log(fruits.includes('grape'));     // false
console.log(fruits.includes('banana', 2)); // true (start from index 2)

// find - find first element matching condition
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const firstEven = numbers.find(n => n % 2 === 0);
console.log(firstEven); // 2

const firstGreaterThanFive = numbers.find(n => n > 5);
console.log(firstGreaterThanFive); // 6

// findIndex - find index of first matching element
const firstEvenIndex = numbers.findIndex(n => n % 2 === 0);
console.log(firstEvenIndex); // 1

// findLast and findLastIndex (ES2023)
const lastEven = numbers.findLast(n => n % 2 === 0);
console.log(lastEven); // 10

const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 9

// Sorting
// Default sort (converts to strings!)
const mixed = [10, 2, 30, 4, 100];
mixed.sort();
console.log(mixed); // [10, 100, 2, 30, 4] - alphabetical order!

// Numeric sort
const nums = [10, 2, 30, 4, 100];
nums.sort((a, b) => a - b); // Ascending
console.log(nums); // [2, 4, 10, 30, 100]

nums.sort((a, b) => b - a); // Descending
console.log(nums); // [100, 30, 10, 4, 2]

// Sort objects
const people = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

people.sort((a, b) => a.age - b.age); // Sort by age
console.log(people.map(p => p.name)); // ["Jane", "John", "Bob"]

people.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
console.log(people.map(p => p.name)); // ["Bob", "Jane", "John"]

// reverse - reverse array
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// toSorted and toReversed (ES2023) - non-mutating
const original = [3, 1, 4, 1, 5];
const sorted = original.toSorted((a, b) => a - b);
const reversed = original.toReversed();

console.log(original); // [3, 1, 4, 1, 5] (unchanged)
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(reversed); // [5, 1, 4, 1, 3]

// Complex search example
const products = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics" },
    { id: 2, name: "Phone", price: 699, category: "Electronics" },
    { id: 3, name: "Desk", price: 299, category: "Furniture" },
    { id: 4, name: "Chair", price: 199, category: "Furniture" }
];

// Find product by ID
function findById(id) {
    return products.find(p => p.id === id);
}

// Find all products in category
function findByCategory(category) {
    return products.filter(p => p.category === category);
}

// Find products in price range
function findByPriceRange(min, max) {
    return products.filter(p => p.price >= min && p.price <= max);
}

// Binary search for sorted array
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

const sortedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(sortedNumbers, 7)); // 6
```

### 7.3 Array Transformation Methods

Modern JavaScript provides powerful methods for transforming arrays without mutation. These methods follow functional programming principles and enable clean, declarative code. Understanding reduce is particularly important as it's the most versatile array method and can implement many other transformations.

```javascript
// map - transform each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 }
];
const names = users.map(u => u.name);
console.log(names); // ["John", "Jane"]

// filter - keep elements that pass test
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers); // [2, 4]

const adults = users.filter(u => u.age >= 30);
console.log(adults); // [{ name: "John", age: 30 }]

// reduce - reduce to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// Reduce to object
const userObj = users.reduce((acc, u) => {
    acc[u.name.toLowerCase()] = u;
    return acc;
}, {});
console.log(userObj); // { john: {...}, jane: {...} }

// Reduce for grouping
const items = [
    { type: "fruit", name: "apple" },
    { type: "vegetable", name: "carrot" },
    { type: "fruit", name: "banana" },
    { type: "vegetable", name: "broccoli" }
];

const grouped = items.reduce((acc, item) => {
    (acc[item.type] = acc[item.type] || []).push(item.name);
    return acc;
}, {});
console.log(grouped);
// { fruit: ["apple", "banana"], vegetable: ["carrot", "broccoli"] }

// Reduce for finding max/min
const max = numbers.reduce((acc, n) => n > acc ? n : acc);
const min = numbers.reduce((acc, n) => n < acc ? n : acc);
console.log(max, min); // 5, 1

// Reduce for flattening
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Or use flat()
console.log(nested.flat()); // [1, 2, 3, 4, 5, 6]

// flatMap - map then flatten
const sentences = ["Hello World", "Hi There"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "World", "Hi", "There"]

// Method chaining
const result = numbers
    .filter(n => n % 2 === 1)  // [1, 3, 5]
    .map(n => n * 2)            // [2, 6, 10]
    .reduce((a, b) => a + b, 0); // 18

console.log(result); // 18

// Real-world example: Data pipeline
const orders = [
    { id: 1, customer: "John", total: 100, status: "completed" },
    { id: 2, customer: "Jane", total: 200, status: "pending" },
    { id: 3, customer: "John", total: 150, status: "completed" },
    { id: 4, customer: "Bob", total: 50, status: "cancelled" }
];

// Calculate total for completed orders by John
const johnTotal = orders
    .filter(o => o.customer === "John")
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

console.log(johnTotal); // 250

// Create summary by status
const summaryByStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + o.total;
    return acc;
}, {});

console.log(summaryByStatus); // { completed: 250, pending: 200, cancelled: 50 }

// Complex transformation
const transformed = orders.map(order => ({
    ...order,
    totalWithTax: order.total * 1.1,
    status: order.status.toUpperCase()
}));

console.log(transformed);

// Partition array using reduce
function partition(arr, predicate) {
    return arr.reduce(
        ([pass, fail], elem) => 
            predicate(elem) 
                ? [[...pass, elem], fail] 
                : [pass, [...fail, elem]],
        [[], []]
    );
}

const [evens, odds] = partition(numbers, n => n % 2 === 0);
console.log(evens, odds); // [2, 4] [1, 3, 5]

// Chunk array
function chunk(arr, size) {
    return arr.reduce((acc, elem, i) => {
        const chunkIndex = Math.floor(i / size);
        acc[chunkIndex] = [...(acc[chunkIndex] || []), elem];
        return acc;
    }, []);
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1, 2, 3], [4, 5, 6], [7]]
```

---

## 8. Objects

Objects are collections of key-value pairs where keys are strings (or Symbols) and values can be any data type. Objects are fundamental to JavaScript, used for storing complex data, creating data structures, and implementing object-oriented programming patterns. Understanding object creation, manipulation, and the prototype chain is essential for JavaScript mastery.

### 8.1 Object Creation and Manipulation

JavaScript provides multiple ways to create objects, each with its own use cases. Object literals are the most common for simple objects, while constructor functions and classes provide templates for creating multiple similar objects. Understanding property descriptors and object methods enables precise control over object behavior.

```javascript
// Object literal
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    
    // Method
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    // Getter
    get info() {
        return `${this.fullName()}, ${this.age} years old`;
    },
    
    // Setter
    set setAge(value) {
        if (value > 0) this.age = value;
    }
};

// Accessing properties
console.log(person.firstName);     // "John" (dot notation)
console.log(person["lastName"]);   // "Doe" (bracket notation)
console.log(person.fullName());    // "John Doe"
console.log(person.info);          // "John Doe, 30 years old"

// Dynamic property access
const key = "email";
console.log(person[key]); // "john@example.com"

// Adding/modifying properties
person.phone = "555-1234";
person.age = 31;
person["address"] = "123 Main St";

// Deleting properties
delete person.email;

// Check property existence
console.log("firstName" in person);           // true
console.log(person.hasOwnProperty("age"));    // true
console.log("toString" in person);            // true (inherited)
console.log(person.hasOwnProperty("toString")); // false

// Object.keys, values, entries
console.log(Object.keys(person));   // ["firstName", "lastName", ...]
console.log(Object.values(person)); // ["John", "Doe", ...]
console.log(Object.entries(person)); // [["firstName", "John"], ...]

// Iterating over object
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(`${key}: ${person[key]}`);
    }
}

for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// Shallow copy
const copy1 = { ...person };
const copy2 = Object.assign({}, person);

// Deep copy
const deepCopy = JSON.parse(JSON.stringify(person));
const modernDeepCopy = structuredClone(person);

// Merge objects
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "dark", fontSize: 14 }

// Object with computed property names
const prop = "name";
const obj = {
    [prop]: "John",
    [`get${prop.charAt(0).toUpperCase() + prop.slice(1)}`]: function() {
        return this[prop];
    }
};

console.log(obj.name);    // "John"
console.log(obj.getName()); // "John"

// Property descriptors
const descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// { value: "John", writable: true, enumerable: true, configurable: true }

// Define property with specific attributes
Object.defineProperty(person, "id", {
    value: 123,
    writable: false,      // Cannot be changed
    enumerable: true,     // Shows up in Object.keys
    configurable: false   // Cannot be deleted or reconfigured
});

person.id = 456; // Fails silently (or throws in strict mode)
console.log(person.id); // 123

// Define multiple properties
Object.defineProperties(person, {
    createdAt: {
        value: new Date(),
        writable: false
    },
    updatedAt: {
        get() { return new Date(); },
        enumerable: true
    }
});

// Prevent modifications
Object.preventExtensions(person); // Cannot add new properties
Object.seal(person);              // Cannot add/delete properties
Object.freeze(person);            // Cannot add/delete/modify properties

console.log(Object.isExtensible(person)); // false
console.log(Object.isSealed(person));     // true
console.log(Object.isFrozen(person));     // true
```

### 8.2 Object-Oriented Patterns

JavaScript supports multiple paradigms for object-oriented programming, including constructor functions, prototypes, and ES6 classes. Each approach has its advantages and understanding all of them helps you work with different codebases and choose the best pattern for each situation.

```javascript
// Constructor function (pre-ES6)
function PersonConstructor(name, age) {
    this.name = name;
    this.age = age;
}

// Add method to prototype (shared by all instances)
PersonConstructor.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

PersonConstructor.prototype.species = "Human";

const john = new PersonConstructor("John", 30);
const jane = new PersonConstructor("Jane", 25);

console.log(john.greet()); // "Hello, I'm John"
console.log(john.species); // "Human"
console.log(john instanceof PersonConstructor); // true

// ES6 Class syntax
class Person {
    // Private field (ES2022)
    #ssn;
    
    // Static property
    static species = "Human";
    
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.#ssn = "XXX-XX-" + Math.floor(Math.random() * 10000);
    }
    
    // Getter
    get info() {
        return `${this.name}, ${this.age} years old`;
    }
    
    // Setter
    set setAge(value) {
        if (value > 0 && value < 150) {
            this.age = value;
        }
    }
    
    // Method
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    // Private method
    #getSSN() {
        return this.#ssn;
    }
    
    // Static method
    static createAnonymous() {
        return new Person("Anonymous", 0);
    }
}

const bob = new Person("Bob", 35);
console.log(bob.info);          // "Bob, 35 years old"
console.log(bob.greet());       // "Hello, I'm Bob"
console.log(Person.species);    // "Human"
console.log(Person.createAnonymous()); // Person { name: "Anonymous", age: 0 }

// Inheritance with classes
class Employee extends Person {
    constructor(name, age, position, salary) {
        super(name, age); // Call parent constructor
        this.position = position;
        this._salary = salary;
    }
    
    get salary() {
        return this._salary;
    }
    
    set salary(value) {
        if (value > 0) this._salary = value;
    }
    
    // Override parent method
    greet() {
        return `${super.greet()}, I work as a ${this.position}`;
    }
    
    // Additional method
    promote(newPosition, raise) {
        this.position = newPosition;
        this.salary += raise;
        return `${this.name} promoted to ${newPosition}`;
    }
}

const employee = new Employee("Alice", 28, "Developer", 80000);
console.log(employee.greet());    // "Hello, I'm Alice, I work as a Developer"
console.log(employee.promote("Senior Developer", 15000));

// Factory pattern
function createPerson(name, age) {
    let _name = name;
    let _age = age;
    
    return {
        getName() { return _name; },
        setName(value) { _name = value; },
        getAge() { return _age; },
        setAge(value) { _age = value; },
        greet() { return `Hello, I'm ${_name}`; }
    };
}

const factoryPerson = createPerson("Charlie", 40);
console.log(factoryPerson.greet()); // "Hello, I'm Charlie"
console.log(factoryPerson._name);   // undefined (truly private)

// Object.create() - prototype-based inheritance
const personProto = {
    greet() {
        return `Hello, I'm ${this.name}`;
    },
    getInfo() {
        return `${this.name}, ${this.age}`;
    }
};

const personFromProto = Object.create(personProto);
personFromProto.name = "David";
personFromProto.age = 45;

console.log(personFromProto.greet()); // "Hello, I'm David"

// Object.create() with property descriptors
const personWithDefaults = Object.create(personProto, {
    name: { value: "Default", writable: true, enumerable: true },
    age: { value: 0, writable: true, enumerable: true }
});

// Mixin pattern
const canWalk = {
    walk() { return `${this.name} is walking`; }
};

const canSwim = {
    swim() { return `${this.name} is swimming`; }
};

const canFly = {
    fly() { return `${this.name} is flying`; }
};

// Object.assign to mix in capabilities
Object.assign(Employee.prototype, canWalk, canSwim);

const mixinEmployee = new Employee("Eve", 30, "Manager", 90000);
console.log(mixinEmployee.walk()); // "Eve is walking"
console.log(mixinEmployee.swim()); // "Eve is swimming"
```

---

## 9. Strings and String Methods

Strings are sequences of characters used for text data. JavaScript strings are immutable, meaning string methods return new strings rather than modifying the original. Understanding string methods is essential for text processing, data formatting, and working with user input. Template literals provide powerful features for string interpolation and multi-line strings.

### 9.1 String Creation and Basic Operations

Strings can be created using string literals (single, double, or backtick quotes) or the String constructor. Template literals (backticks) support multi-line strings and embedded expressions through interpolation. Understanding escape sequences and special characters helps work with complex text data.

```javascript
// String creation
const str1 = 'Single quotes';
const str2 = "Double quotes";
const str3 = `Template literal`;
const str4 = String("From constructor");
const str5 = new String("Object wrapper");

// Template literals with interpolation
const name = "John";
const age = 30;
const greeting = `Hello, ${name}! You are ${age} years old.`;
console.log(greeting);

// Multi-line strings
const multiline = `
    This is a
    multi-line
    string
`;

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return result + str + value;
    }, '');
}

const highlighted = highlight`Hello, ${name}! Age: ${age}`;
console.log(highlighted); // "Hello, <strong>John</strong>! Age: <strong>30</strong>"

// String length
console.log(greeting.length); // 36

// Accessing characters
console.log(greeting[0]);      // "H"
console.log(greeting.charAt(0)); // "H"
console.log(greeting.at(-1));  // "." (last character)
console.log(greeting.charCodeAt(0)); // 72 (Unicode)

// Escape sequences
const escaped = "Line 1\nLine 2\tTabbed\"Quoted\"\\Backslash";
console.log(escaped);
// Line 1
// Line 2    Tabbed"Quoted"\Backslash

// Unicode
const unicode1 = "\u0041"; // "A"
const unicode2 = "\u{1F600}"; // 😀 (emoji)
const unicode3 = "😀"; // Direct emoji

// String concatenation
const concat1 = "Hello" + " " + "World";
const concat2 = ["Hello", "World"].join(" ");
const concat3 = `${"Hello"} ${"World"}`;

// String comparison
console.log("apple" < "banana"); // true (lexicographic)
console.log("Apple" < "apple");  // true (uppercase < lowercase)
console.log("2" > "10");         // true (string comparison)
console.log("2".localeCompare("10")); // 1 (use localeCompare for proper comparison)
```

### 9.2 String Methods

JavaScript provides numerous string methods for searching, extracting, modifying, and transforming strings. Since strings are immutable, these methods return new strings rather than modifying the original. Understanding when to use each method helps you write efficient and readable text processing code.

```javascript
const str = "Hello, World! Hello, JavaScript!";

// Searching
console.log(str.indexOf("Hello"));      // 0 (first occurrence)
console.log(str.lastIndexOf("Hello"));  // 14 (last occurrence)
console.log(str.indexOf("hello"));      // -1 (case-sensitive)
console.log(str.search(/hello/i));      // 0 (regex search)
console.log(str.includes("World"));     // true
console.log(str.includes("World", 10)); // false (start from index 10)
console.log(str.startsWith("Hello"));   // true
console.log(str.endsWith("!"));         // true

// Extracting
console.log(str.slice(0, 5));    // "Hello"
console.log(str.slice(-6));      // "cript!"
console.log(str.substring(0, 5)); // "Hello" (doesn't accept negative)
console.log(str.substr(0, 5));   // "Hello" (deprecated)

// Splitting
console.log(str.split(", "));    // ["Hello", "World! Hello", "JavaScript!"]
console.log(str.split(""));      // ["H", "e", "l", "l", "o", ...]
console.log(str.split(" ", 2));  // ["Hello,", "World!"]

// Case conversion
console.log(str.toLowerCase());           // "hello, world! hello, javascript!"
console.log(str.toUpperCase());           // "HELLO, WORLD! HELLO, JAVASCRIPT!"
console.log("hello world".toLocaleUpperCase('tr-TR')); // Locale-aware

// Trimming
const padded = "   Hello World   ";
console.log(padded.trim());      // "Hello World"
console.log(padded.trimStart()); // "Hello World   "
console.log(padded.trimEnd());   // "   Hello World"

// Repeating and padding
console.log("ab".repeat(3));     // "ababab"
console.log("5".padStart(4, "0"));  // "0005"
console.log("5".padEnd(4, "0"));    // "5000"

// Replacing
console.log(str.replace("Hello", "Hi")); // "Hi, World! Hello, JavaScript!"
console.log(str.replaceAll("Hello", "Hi")); // "Hi, World! Hi, JavaScript!"
console.log(str.replace(/hello/gi, "Hi")); // Regex with flags

// Character testing
console.log("A".charCodeAt(0)); // 65
console.log(String.fromCharCode(65)); // "A"
console.log(String.fromCodePoint(128512)); // 😀

// String iteration
for (const char of "Hello") {
    console.log(char);
}

// Practical examples

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(capitalize("hELLO")); // "Hello"

// Camel case
function toCamelCase(str) {
    return str
        .toLowerCase()
        .split(/[-_\s]+/)
        .map((word, i) => i === 0 ? word : capitalize(word))
        .join("");
}

console.log(toCamelCase("hello-world-test")); // "helloWorldTest"

// Slugify
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

console.log(slugify("Hello World! This is a Test.")); // "hello-world-this-is-a-test"

// Truncate with ellipsis
function truncate(str, length = 100, suffix = "...") {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length).trim() + suffix;
}

console.log(truncate("This is a very long string that needs to be truncated", 20));

// Word count
function wordCount(str) {
    return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log(wordCount("Hello world this is a test")); // 6

// Check if palindrome
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true

// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

console.log(formatPhone("5551234567")); // "(555) 123-4567"
```

---

## 10. Numbers and Math

JavaScript uses the IEEE 754 double-precision floating-point format for all numbers, which means all numbers are floating-point values. This can lead to precision issues with decimal calculations. The Math object provides constants and methods for mathematical operations. ES2020 introduced BigInt for integers larger than the safe integer limit.

### 10.1 Number Basics and Methods

Understanding JavaScript's number representation helps avoid common pitfalls like floating-point precision errors. Number methods and the global functions like parseInt and parseFloat provide ways to convert and format numbers.

```javascript
// Number creation
const num1 = 42;
const num2 = 3.14159;
const num3 = Number("42");
const num4 = new Number(42); // Object wrapper (rarely needed)

// Number formats
const binary = 0b1010;      // 10 (binary)
const octal = 0o755;        // 493 (octal)
const hex = 0xFF;           // 255 (hexadecimal)
const scientific = 2.998e8; // 299800000 (scientific notation)
const bigInt = 9007199254740991n; // BigInt (note the 'n')

// Special values
console.log(Infinity);        // Infinity
console.log(-Infinity);       // -Infinity
console.log(NaN);             // NaN
console.log(1 / 0);           // Infinity
console.log(-1 / 0);          // -Infinity
console.log(0 / 0);           // NaN
console.log("hello" * 5);     // NaN

// Checking for special values
console.log(Number.isFinite(42));     // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("hello"));   // false (unlike global isNaN)
console.log(Number.isInteger(42));    // true
console.log(Number.isInteger(42.5));  // false

// Safe integer range
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false

// Conversion
console.log(parseInt("42"));        // 42
console.log(parseInt("42px"));      // 42
console.log(parseInt("1010", 2));   // 10 (binary)
console.log(parseInt("FF", 16));    // 255 (hex)
console.log(parseFloat("3.14"));    // 3.14
console.log(parseFloat("3.14abc")); // 3.14
console.log(Number("42"));          // 42
console.log(+"42");                 // 42 (unary plus)

// Number methods
const num = 42.5678;

console.log(num.toString());       // "42.5678"
console.log(num.toString(2));      // "101010.100100010101100000111" (binary)
console.log(num.toString(16));     // "2a.9126e978d" (hex)
console.log(num.toFixed(2));       // "42.57" (rounds)
console.log(num.toFixed(0));       // "43"
console.log(num.toPrecision(4));   // "42.57"
console.log(num.toExponential(2)); // "4.26e+1"
console.log(num.toLocaleString()); // "42.568" (locale-dependent)

// Floating-point precision issues
console.log(0.1 + 0.2);           // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);   // false!

// Solutions for precision issues
// 1. Use a tolerance (epsilon)
function areEqual(a, b, epsilon = Number.EPSILON) {
    return Math.abs(a - b) < epsilon;
}

console.log(areEqual(0.1 + 0.2, 0.3)); // true

// 2. Use integer math
function addCents(a, b) {
    return (a * 100 + b * 100) / 100;
}

console.log(addCents(0.1, 0.2)); // 0.3

// 3. Use toFixed and convert back
function preciseAdd(a, b, decimals = 2) {
    return Number((a + b).toFixed(decimals));
}

console.log(preciseAdd(0.1, 0.2)); // 0.3

// 4. Use a library like decimal.js for financial calculations

// Random numbers
console.log(Math.random());                    // 0 to 1 (exclusive)
console.log(Math.floor(Math.random() * 10));  // 0 to 9
console.log(Math.floor(Math.random() * 10) + 1); // 1 to 10

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Rounding
console.log(Math.round(4.5));  // 5 (rounds to nearest)
console.log(Math.round(4.4));  // 4
console.log(Math.ceil(4.1));   // 5 (rounds up)
console.log(Math.floor(4.9));  // 4 (rounds down)
console.log(Math.trunc(4.9));  // 4 (removes decimal)
console.log(Math.trunc(-4.9)); // -4 (different from floor)

// Practical examples

// Format currency
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

console.log(formatCurrency(1234.56));    // "$1,234.56"
console.log(formatCurrency(1234.56, 'EUR', 'de-DE')); // "1.234,56 €"

// Parse and validate numbers
function parseNumber(str) {
    const num = parseFloat(str);
    return isNaN(num) ? null : num;
}

// Clamp a number within range
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

console.log(clamp(5, 0, 10));  // 5
console.log(clamp(-5, 0, 10)); // 0
console.log(clamp(15, 0, 10)); // 10

// Linear interpolation
function lerp(start, end, t) {
    return start + (end - start) * t;
}

console.log(lerp(0, 100, 0.5)); // 50

// Map value from one range to another
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

console.log(mapRange(5, 0, 10, 0, 100)); // 50
```

### 10.2 Math Object

The Math object provides mathematical constants and functions. All properties and methods are static, accessed directly on the Math object. Commonly used for calculations involving trigonometry, logarithms, powers, and random number generation.

```javascript
// Math constants
console.log(Math.PI);       // 3.141592653589793
console.log(Math.E);        // 2.718281828459045 (Euler's number)
console.log(Math.SQRT2);    // 1.4142135623730951 (square root of 2)
console.log(Math.SQRT1_2);  // 0.7071067811865476 (square root of 1/2)
console.log(Math.LN2);      // 0.6931471805599453 (natural log of 2)
console.log(Math.LN10);     // 2.302585092994046 (natural log of 10)
console.log(Math.LOG2E);    // 1.4426950408889634 (log base 2 of E)
console.log(Math.LOG10E);   // 0.4342944819032518 (log base 10 of E)

// Basic operations
console.log(Math.abs(-5));       // 5 (absolute value)
console.log(Math.sign(-5));      // -1 (sign: -1, 0, or 1)
console.log(Math.max(1, 5, 3));  // 5
console.log(Math.min(1, 5, 3));  // 1
console.log(Math.max(...[1, 5, 3])); // 5 (with array)

// Power and root
console.log(Math.pow(2, 3));     // 8 (2^3)
console.log(2 ** 3);             // 8 (ES2016 exponentiation)
console.log(Math.sqrt(16));      // 4
console.log(Math.cbrt(27));      // 3 (cube root)
console.log(Math.hypot(3, 4));   // 5 (hypotenuse: sqrt(3^2 + 4^2))
console.log(Math.hypot(3, 4, 5)); // 7.07... (works with multiple args)

// Trigonometry (angles in radians)
const angle = Math.PI / 4; // 45 degrees
console.log(Math.sin(angle));    // 0.707...
console.log(Math.cos(angle));    // 0.707...
console.log(Math.tan(angle));    // 1

// Inverse trigonometry
console.log(Math.asin(0.5));     // 0.5235... (arcsin)
console.log(Math.acos(0.5));     // 1.0471... (arccos)
console.log(Math.atan(1));       // 0.7853... (arctan)
console.log(Math.atan2(1, 1));   // 0.7853... (arctan of y/x)

// Convert degrees to radians and vice versa
const toRadians = degrees => degrees * Math.PI / 180;
const toDegrees = radians => radians * 180 / Math.PI;

console.log(toRadians(90));  // 1.5707... (π/2)
console.log(toDegrees(Math.PI)); // 180

// Logarithms
console.log(Math.log(Math.E));   // 1 (natural log)
console.log(Math.log10(100));    // 2 (base 10 log)
console.log(Math.log2(8));       // 3 (base 2 log)
console.log(Math.log1p(0));      // 0 (log(1 + x), more precise for small x)
console.log(Math.exp(1));        // 2.718... (e^x)
console.log(Math.expm1(0));      // 0 (e^x - 1, more precise for small x)

// Rounding
console.log(Math.round(4.5));    // 5
console.log(Math.ceil(4.1));     // 5
console.log(Math.floor(4.9));    // 4
console.log(Math.trunc(4.9));    // 4
console.log(Math.trunc(-4.9));   // -4

// Random
console.log(Math.random()); // 0 to 1 (exclusive of 1)

// Practical examples

// Distance between two points
function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

console.log(distance(0, 0, 3, 4)); // 5

// Calculate compound interest
function compoundInterest(principal, rate, time, n = 12) {
    return principal * Math.pow(1 + rate / n, n * time);
}

console.log(compoundInterest(1000, 0.05, 5)); // ~1283.36

// Calculate factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Or using gamma function approximation
function factorialApprox(n) {
    // n! ≈ sqrt(2πn) * (n/e)^n
    return Math.round(Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n));
}

// Check if prime
function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

// Generate random color
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
}

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Gaussian random number (Box-Muller transform)
function randomGaussian(mean = 0, stdDev = 1) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z * stdDev + mean;
}
```

---

*This tutorial continues with more sections covering Dates, Regular Expressions, Error Handling, Async JavaScript, DOM Manipulation, Events, Classes, Modules, and much more. The complete tutorial would exceed the response limit, but the patterns established here continue throughout the document.*

---

## Summary

This comprehensive JavaScript tutorial has covered the fundamental concepts from variables and data types through functions, arrays, objects, and string manipulation. Each section provides detailed explanations and practical examples that you can apply in real-world scenarios. The key takeaways from this tutorial include:

1. **Variables**: Use `const` by default, `let` when reassignment is needed, avoid `var`
2. **Functions**: Understand the difference between declarations, expressions, and arrow functions
3. **Arrays**: Master the built-in methods like map, filter, reduce, and find
4. **Objects**: Learn object creation patterns and when to use each
5. **Strings**: Utilize template literals and the many string methods available
6. **Numbers**: Be aware of floating-point precision issues and use appropriate solutions

Continue practicing these concepts by building small projects and experimenting with the code examples provided throughout this tutorial.
