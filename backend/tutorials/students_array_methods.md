# ARRAY METHODS MASTER DOCUMENTATION WITH YOUR STUDENT DATA

This document is built from your student results array and is written for easy study, search, copying, and extension.

Each method section includes:
- what the method does
- syntax
- beginner example
- intermediate example
- advanced example
- answer/output
- chain examples with other methods

It also includes **Part 2** with newer methods and advanced JavaScript patterns.

---

# TABLE OF CONTENTS

- [DATA SETUP](#data-setup)
- [HELPER UTILITIES](#helper-utilities)
- [PART 1 CORE METHODS](#part-1-core-methods)
  - [MAP METHOD](#map-method)
  - [FLATMAP METHOD](#flatmap-method)
  - [FILTER METHOD](#filter-method)
  - [REDUCE METHOD](#reduce-method)
  - [SORT METHOD](#sort-method)
  - [FIND METHOD](#find-method)
  - [FINDINDEX METHOD](#findindex-method)
  - [SOME METHOD](#some-method)
  - [EVERY METHOD](#every-method)
  - [FOREACH METHOD](#foreach-method)
  - [OBJECT.KEYS METHOD](#objectkeys-method)
  - [OBJECT.VALUES METHOD](#objectvalues-method)
  - [OBJECT.ENTRIES METHOD](#objectentries-method)
  - [OBJECT.FROMENTRIES METHOD](#objectfromentries-method)
  - [INCLUDES METHOD](#includes-method)
  - [JOIN METHOD](#join-method)
  - [SLICE METHOD](#slice-method)
  - [SPLICE METHOD](#splice-method)
  - [AT METHOD](#at-method)
  - [SET + ARRAY.FROM](#set--arrayfrom)
- [PART 2 MODERN METHODS AND ADVANCED PATTERNS](#part-2-modern-methods-and-advanced-patterns)
  - [REVERSE METHOD](#reverse-method)
  - [CONCAT METHOD](#concat-method)
  - [TOSORTED METHOD](#tosorted-method)
  - [TOREVERSED METHOD](#toreversed-method)
  - [TOSPLICED METHOD](#tospliced-method)
  - [ARRAY ENTRIES VALUES KEYS](#array-entries-values-keys)
  - [DESTRUCTURING](#destructuring)
  - [OPTIONAL CHAINING](#optional-chaining)
  - [NULLISH COALESCING](#nullish-coalescing)
  - [REAL REPORT PATTERNS](#real-report-patterns)
  - [DATA SETUP](#data-setup)
  - [HELPER UTILITIES](#helper-utilities)
  * [GROUPBY METHOD](#groupby-method)
  * [STRUCTURED CLONE](#structured-clone)
  * [DEEP MERGE PATTERN](#deep-merge-pattern)
  * [OBJECT FREEZE](#object-freeze)
  * [OBJECT SEAL](#object-seal)
  * [OBJECT HASOWN](#object-hasown)
  * [PART 3 PERFORMANCE](#part-3-performance)
  * [MAP OBJECT](#map-object)
  * [SET OBJECT](#set-object)
  * [MEMOIZATION](#memoization)
  * [PART 4 ASYNC PATTERNS](#part-4-async-patterns)
  * [PROMISE ALLSETTLED](#promise-allsettled)
  * [ABORTCONTROLLER](#abortcontroller)
* [PART 5 LOCALIZATION](#part-5-localization)
  * [NUMBER FORMAT](#number-format)
  * [DATE FORMAT](#date-format)
  * [REAL ENTERPRISE PIPELINE](#real-enterprise-pipeline)





---

# DATA SETUP

```javascript
const students = [
  { 
    Index: "0051804001",
    Name: "ABAMA SIAKA ABDULAI JUNIOR",
    Gender: "Male",
    Dob: "17/05/2007",
    Subjects: {
      "SOCIAL STUDIES": "B3",
      "ENGLISH LANG": "C5",
      "MATHEMATICS(CORE)": "C6",
      "INTEGRATED SCIENCE": "B3",
      "MATHEMATICS(ELECT)": "E8",
      "BIOLOGY": "E8",
      "CHEMISTRY": "C6",
      "PHYSICS": "E8"
    }
  },
  {
    Index: "0051804002",
    Name: "ABBIW SYLVIA",
    Gender: "Female",
    Dob: "20/02/2006",
    Subjects: {
      "SOCIAL STUDIES": "C6",
      "ENGLISH LANG": "C5",
      "MATHEMATICS(CORE)": "C6",
      "INTEGRATED SCIENCE": "B3",
      "BIOLOGY": "F9",
      "FOODS & NUTRITION": "C4",
      "MGT IN LIVING": "C4",
      "GEN KNOW IN ART": "C6"
    }
  }
];
```

---

# HELPER UTILITIES

```javascript
const failGrades = ["E8", "F9"];

const isFail = grade => failGrades.includes(grade);
const isPass = grade => !failGrades.includes(grade);
```

---

# PART 1 CORE METHODS

# MAP METHOD

## What `map()` does

`map()` transforms each item in an array and returns a new array.

## Syntax

```javascript
array.map((item, index, array) => transformedValue)
```

## Beginner Example

```javascript
const result = students.map(student => student.Name);
console.log(result);
```

### Answer

```javascript
[
  "ABAMA SIAKA ABDULAI JUNIOR",
  "ABBIW SYLVIA"
]
```

## Intermediate Example

```javascript
const result = students.map(student => ({
  name: student.Name,
  gender: student.Gender
}));

console.log(result);
```

### Answer

```javascript
[
  { name: "ABAMA SIAKA ABDULAI JUNIOR", gender: "Male" },
  { name: "ABBIW SYLVIA", gender: "Female" }
]
```

## Advanced Example

```javascript
const result = students.map(student => ({
  index: student.Index,
  name: student.Name,
  subjectCount: Object.keys(student.Subjects).length,
  failCount: Object.values(student.Subjects).filter(isFail).length
}));

console.log(result);
```

### Answer

```javascript
[
  {
    index: "0051804001",
    name: "ABAMA SIAKA ABDULAI JUNIOR",
    subjectCount: 8,
    failCount: 3
  },
  {
    index: "0051804002",
    name: "ABBIW SYLVIA",
    subjectCount: 8,
    failCount: 1
  }
]
```

## `map()` chain examples

```javascript
const result = students.map(student => student.Name).join(", ");
console.log(result);
```

### Answer

```javascript
"ABAMA SIAKA ABDULAI JUNIOR, ABBIW SYLVIA"
```

```javascript
const result = students
  .map(student => ({
    name: student.Name,
    failCount: Object.values(student.Subjects).filter(isFail).length
  }))
  .filter(student => student.failCount > 1);

console.log(result);
```

### Answer

```javascript
[
  { name: "ABAMA SIAKA ABDULAI JUNIOR", failCount: 3 }
]
```

---

# FLATMAP METHOD

## What `flatMap()` does

`flatMap()` maps each item and flattens one level. It is best when one student produces many rows.

## Syntax

```javascript
array.flatMap((item, index, array) => returnedArray)
```

## Beginner Example

```javascript
const result = students.flatMap(student => Object.keys(student.Subjects));
console.log(result);
```

### Answer

```javascript
[
  "SOCIAL STUDIES",
  "ENGLISH LANG",
  "MATHEMATICS(CORE)",
  "INTEGRATED SCIENCE",
  "MATHEMATICS(ELECT)",
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS",
  "SOCIAL STUDIES",
  "ENGLISH LANG",
  "MATHEMATICS(CORE)",
  "INTEGRATED SCIENCE",
  "BIOLOGY",
  "FOODS & NUTRITION",
  "MGT IN LIVING",
  "GEN KNOW IN ART"
]
```

## Print out unique name subject names
``` javascript
const result = [...new Set(students.flatMap(student => Object.keys(student.Subjects)))];
console.log(result);
```

## ANSWER
``` javascript
[
  'SOCIAL STUDIES',
  'ENGLISH LANG',
  'MATHEMATICS(CORE)',
  'INTEGRATED SCIENCE',
  'MATHEMATICS(ELECT)',
  'BIOLOGY',
  'CHEMISTRY',
  'PHYSICS',
  'FOODS & NUTRITION',
  'MGT IN LIVING',
  'GEN KNOW IN ART',
  'CHRISTIAN REL STUD',
  'ECONOMICS',
  'GEOGRAPHY',
  'GOVERNMENT',
  'TWI(ASANTE)',
  'BUSINESS MANAGEMENT',
  'FINANCIAL ACCOUNTING',
  'PRIN OF COST ACCTS',
  'GENERAL AGRICULTURE',
  'FORESTRY',
  'CROP HUSB & HORT',
  'GRAPHIC DESIGN',
  'LEATHERWORK',
  'CLOTHING & TEXTILES',
  'ANIMAL HUSBANDRY',
  'PICTURE MAKING',
  'SCULPTURE',
  'INFO. & COMM. TECHNOLOGY',
  'LIT-IN-ENGLISH',
  'FRENCH',
  'ISLAMIC REL STUD'
]
```
## Intermediate Example

```javascript
const result = students.flatMap(student =>
  Object.entries(student.Subjects).map(([subject, grade]) => ({
    name: student.Name,
    subject,
    grade
  }))
);

console.log(result);
```

### Answer

```javascript
[
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "SOCIAL STUDIES", grade: "B3" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "ENGLISH LANG", grade: "C5" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "MATHEMATICS(CORE)", grade: "C6" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "INTEGRATED SCIENCE", grade: "B3" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "MATHEMATICS(ELECT)", grade: "E8" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "BIOLOGY", grade: "E8" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "CHEMISTRY", grade: "C6" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "PHYSICS", grade: "E8" },
  { name: "ABBIW SYLVIA", subject: "SOCIAL STUDIES", grade: "C6" },
  { name: "ABBIW SYLVIA", subject: "ENGLISH LANG", grade: "C5" },
  { name: "ABBIW SYLVIA", subject: "MATHEMATICS(CORE)", grade: "C6" },
  { name: "ABBIW SYLVIA", subject: "INTEGRATED SCIENCE", grade: "B3" },
  { name: "ABBIW SYLVIA", subject: "BIOLOGY", grade: "F9" },
  { name: "ABBIW SYLVIA", subject: "FOODS & NUTRITION", grade: "C4" },
  { name: "ABBIW SYLVIA", subject: "MGT IN LIVING", grade: "C4" },
  { name: "ABBIW SYLVIA", subject: "GEN KNOW IN ART", grade: "C6" }
]
```

## Advanced Example

```javascript
const result = students.flatMap(student =>
  Object.entries(student.Subjects)
    .filter(([_, grade]) => isFail(grade))
    .map(([subject, grade]) => ({
      name: student.Name,
      subject,
      grade
    }))
);

console.log(result);
```

### Answer

```javascript
[
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "MATHEMATICS(ELECT)", grade: "E8" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "BIOLOGY", grade: "E8" },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", subject: "PHYSICS", grade: "E8" },
  { name: "ABBIW SYLVIA", subject: "BIOLOGY", grade: "F9" }
]
```

## `flatMap()` chain examples

```javascript
const result = students
  .flatMap(student => Object.values(student.Subjects))
  .reduce((acc, grade) => {
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

console.log(result);
```

### Answer

```javascript
{
  B3: 3,
  C5: 2,
  C6: 4,
  E8: 3,
  F9: 1,
  C4: 2
}
```

---

# FILTER METHOD

## What `filter()` does

`filter()` keeps only items that pass a condition and returns a new array.

## Syntax

```javascript
array.filter((item, index, array) => condition)
```

## Beginner Example

```javascript
const result = students.filter(student => student.Gender === "Female");
console.log(result.map(student => student.Name));
```

### Answer

```javascript
["ABBIW SYLVIA"]
```

## Intermediate Example

```javascript
const result = students.filter(student => "PHYSICS" in student.Subjects);
console.log(result.map(student => student.Name));
```

### Answer

```javascript
["ABAMA SIAKA ABDULAI JUNIOR"]
```

## Advanced Example

```javascript
const result = students.filter(student =>
  Object.values(student.Subjects).some(isFail)
);

console.log(result.map(student => student.Name));
```

### Answer

```javascript
[
  "ABAMA SIAKA ABDULAI JUNIOR",
  "ABBIW SYLVIA"
]
```

## `filter()` chain examples

```javascript
const result = students
  .filter(student => student.Gender === "Female")
  .map(student => student.Name);

console.log(result);
```

### Answer

```javascript
["ABBIW SYLVIA"]
```

---

# REDUCE METHOD

## What `reduce()` does

`reduce()` combines an array into one final value such as a number, object, array, summary, or lookup table.

## Syntax

```javascript
array.reduce((accumulator, item, index, array) => {
  return updatedAccumulator;
}, initialValue)
```

## Beginner Example

```javascript
const result = students.reduce((acc, student) => acc + 1, 0);
console.log(result);
```

### Answer

```javascript
2
```

## Intermediate Example

```javascript
const result = students.reduce((acc, student) => {
  acc[student.Gender] = (acc[student.Gender] || 0) + 1;
  return acc;
}, {});

console.log(result);
```

### Answer

```javascript
{
  Male: 1,
  Female: 1
}
```



## COUNT THE NUMBER OF TIMES A NAME APPEAR IN DATA
``` javascript
const result = students.map(student => student.Name);
const single_names = result.join(",").replaceAll(",", " ").split(" ");

const result1 = single_names.reduce((acc, cumm) => {
  acc[cumm] = (acc[cumm] || 0) + 1;
  return acc;
},{})
console.log(result1);
```

### ANSWER
``` javascript
{
  ABAMA: 1,
  SIAKA: 1,
  ABDULAI: 1,
  JUNIOR: 6,
  ABBIW: 1,
  SYLVIA: 2,
  ABDELLA: 1,
  AJARA: 1,
  ABDUL: 6,
  RASHID: 1,
  ABDALLAH: 1,
  RAUF: 2,
  KARIM: 5,
  ABINDAU: 1,
  ...................
}
```
## Advanced Example

```javascript
const result = students.reduce((acc, student) => {
  Object.values(student.Subjects).forEach(grade => {
    acc[grade] = (acc[grade] || 0) + 1;
  });
  return acc;
}, {});

console.log(result);
```

### Answer

```javascript
{
  B3: 3,
  C5: 2,
  C6: 4,
  E8: 3,
  F9: 1,
  C4: 2
}
```

## `reduce()` chain examples

```javascript
const result = students
  .flatMap(student => Object.keys(student.Subjects))
  .reduce((acc, subject) => {
    acc[subject] = (acc[subject] || 0) + 1;
    return acc;
  }, {});

console.log(result);
```

### Answer

```javascript
{
  "SOCIAL STUDIES": 2,
  "ENGLISH LANG": 2,
  "MATHEMATICS(CORE)": 2,
  "INTEGRATED SCIENCE": 2,
  "MATHEMATICS(ELECT)": 1,
  "BIOLOGY": 2,
  "CHEMISTRY": 1,
  "PHYSICS": 1,
  "FOODS & NUTRITION": 1,
  "MGT IN LIVING": 1,
  "GEN KNOW IN ART": 1
}
```

---

# SORT METHOD


---

# 📘 JavaScript `.sort()` — Complete Master Guide

The `.sort()` method is one of the most powerful array methods in JavaScript.
It allows you to arrange elements in an array based on custom logic.

> ⚠️ Important: `.sort()` **mutates (modifies)** the original array.

---

# 🔹 1. Syntax

## Basic Syntax (Not Recommended)

```js
array.sort();
```

## With Compare Function (Recommended)

```js
array.sort((a, b) => {
  if (a < b) return -1; // a comes first
  if (a > b) return 1;  // b comes first
  return 0;             // no change
});
```

---

# 🔹 2. How `.sort()` Works Internally

The compare function determines order based on return values:

| Return Value | Meaning              |
| ------------ | -------------------- |
| Negative     | `a` comes before `b` |
| Positive     | `b` comes before `a` |
| `0`          | Keep original order  |

---

# 🔹 3. Critical Rules (Must Know)

## ⚠️ Rule 1: Mutation

```js
const arr = [3, 1, 2];
arr.sort(); 
console.log(arr); // [1, 2, 3] (original changed)
```

### ✅ Safe Version (Immutable)

```js
const sorted = [...arr].sort();
```

---

## ⚠️ Rule 2: Default Sorting is STRING-Based

```js
[10, 2].sort(); // [10, 2]
```

👉 Because:

```js
"10" < "2" // true
```

### ✅ Always Use Compare Function for Numbers

```js
[10, 2].sort((a, b) => a - b); // [2, 10]
```

---

# 🔹 4. Core Examples

---

## 🅐 Numeric Sorting

### Ascending

```js
const scores = [40, 100, 1, 5, 25];

scores.sort((a, b) => a - b);
// [1, 5, 25, 40, 100]
```

### Descending

```js
scores.sort((a, b) => b - a);
// [100, 40, 25, 5, 1]
```

---

## 🅑 String Sorting

### Default (Case-Sensitive)

```js
const names = ["Zion", "aba", "Beta", "alpha"];

names.sort();
// ["Beta", "Zion", "aba", "alpha"]
```

### ✅ Best Practice (localeCompare)

```js
names.sort((a, b) => a.localeCompare(b));
// ["aba", "alpha", "Beta", "Zion"]
```

---

## 🅒 Sorting Objects

```js
const students = [
  { Name: "Zack", Age: 20 },
  { Name: "Ada", Age: 18 }
];
```

### Sort by Age

```js
students.sort((a, b) => a.Age - b.Age);
```

### Sort by Name

```js
students.sort((a, b) => a.Name.localeCompare(b.Name));
```

---

# 🔹 5. Advanced Sorting Techniques

---

## 🅓 Computed / Logical Sorting

Sort students by number of failed subjects:

```js
const isFail = (grade) => ["F9", "E8"].includes(grade);

const sorted = [...students].sort((a, b) => {
  const aFails = Object.values(a.Subjects).filter(isFail).length;
  const bFails = Object.values(b.Subjects).filter(isFail).length;

  return bFails - aFails;
});
```

---

## 🅔 Frequency Sorting (Very Important Pattern)

```js
const counts = {
  "ABAMA": 2,
  "SIAKA": 5,
  "JUNIOR": 1
};

const sortedCounts = Object.entries(counts)
  .sort((a, b) => b[1] - a[1]);

// [
//   ["SIAKA", 5],
//   ["ABAMA", 2],
//   ["JUNIOR", 1]
// ]
```


``` javascript

const result = Object.entries([...students]
            .map(student => student.Name)
            .join(",")
            .replaceAll(",", " ")
            .split(" ")
            .reduce((a, b) => {
                a[b] = (a[b] || 0) + 1;
                return a
            }, {}))
            .sort((a, b) => b[1] - a[1])

console.log(result);
```

### ANSWER

``` javascript
[
  [ 'OWUSU', 33 ],     [ 'OPOKU', 20 ],     [ 'OSEI', 20 ],
  [ 'BOATENG', 17 ],   [ 'EMMANUEL', 15 ],  [ 'AGYEI', 15 ],
  [ 'MENSAH', 14 ],    [ 'YEBOAH', 14 ],    [ 'AGYEMANG', 14 ],
  [ 'BOAKYE', 14 ],    [ 'SAMUEL', 13 ],    [ 'FRIMPONG', 13 ],
......]
```


---

## 🅕 Sorting by String Length

```js
const words = ["apple", "kiwi", "banana"];

words.sort((a, b) => a.length - b.length);
// ["kiwi", "apple", "banana"]
```

---

## 🅖 Boolean Sorting

```js
const values = [true, false, true, false];

values.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
// [true, true, false, false]
```

---

# 🔹 6. Multi-Level Sorting (VERY IMPORTANT 🔥)

Sort by Grade, then by Name if equal:

```js
students.sort((a, b) => {
  if (a.grade !== b.grade) {
    return a.grade.localeCompare(b.grade);
  }

  return a.name.localeCompare(b.name);
});
```

---

# 🔹 7. Sorting Nested Data

```js
students.sort((a, b) => {
  const aMath = a.Subjects["MATHEMATICS(CORE)"];
  const bMath = b.Subjects["MATHEMATICS(CORE)"];

  return aMath.localeCompare(bMath);
});
```

---

# 🔹 8. Combining `.sort()` with Other Methods (Real Power 🚀)

---

## Example: Filter + Sort + Map

```js
const result = students
  .filter(student => student.Gender === "Male")
  .sort((a, b) => a.Name.localeCompare(b.Name))
  .map(student => ({
    name: student.Name,
    index: student.Index
  }));
```

---

## Example: Count Fails → Sort → Return Clean Data

```js
const result = students
  .map(student => {
    const fails = Object.values(student.Subjects)
      .filter(g => ["F9", "E8"].includes(g)).length;

    return { ...student, fails };
  })
  .sort((a, b) => b.fails - a.fails);
```

---

# 🔹 9. Summary Table

| Goal                    | Logic                                  |
| ----------------------- | -------------------------------------- |
| Numbers (Ascending)     | `(a, b) => a - b`                      |
| Numbers (Descending)    | `(a, b) => b - a`                      |
| Strings (Alphabetical)  | `(a, b) => a.localeCompare(b)`         |
| Boolean (True first)    | `(a, b) => (a === b ? 0 : a ? -1 : 1)` |
| Length (Shortest first) | `(a, b) => a.length - b.length`        |

---

# 🔹 10. Best Practices (Senior Level)

✔ Always use a compare function
✔ Use `localeCompare` for strings
✔ Clone arrays when needed (`[...]`)
✔ Keep compare functions simple and readable
✔ Chain `.map()`, `.filter()`, `.reduce()` for pipelines

---

# 🔥 Final Takeaway

`.sort()` is not just sorting — it is a **data transformation tool**.

When combined with:

* `map()`
* `filter()`
* `reduce()`
* `Object.entries()`

👉 You can build **production-level data processing systems**

---

# FIND METHOD

## What `find()` does

`find()` returns the first matching item or `undefined`.

## Beginner Example

```javascript
const result = students.find(student => student.Index === "0051804001");
console.log(result.Name);
```

### Answer

```javascript
"ABAMA SIAKA ABDULAI JUNIOR"
```

## Intermediate Example

```javascript
const result = students.find(student => "PHYSICS" in student.Subjects);
console.log(result.Name);
```

### Answer

```javascript
"ABAMA SIAKA ABDULAI JUNIOR"
```

## Advanced Example

```javascript
const result = students.find(student =>
  Object.values(student.Subjects).filter(isFail).length > 2
);

console.log(result.Name);
```

### Answer

```javascript
"ABAMA SIAKA ABDULAI JUNIOR"
```

## `find()` chain example

```javascript
const result = Object.keys(
  students.find(student => student.Name === "ABBIW SYLVIA").Subjects
);

console.log(result);
```

### Answer

```javascript
[
  "SOCIAL STUDIES",
  "ENGLISH LANG",
  "MATHEMATICS(CORE)",
  "INTEGRATED SCIENCE",
  "BIOLOGY",
  "FOODS & NUTRITION",
  "MGT IN LIVING",
  "GEN KNOW IN ART"
]
```

---

# FINDINDEX METHOD

## What `findIndex()` does

`findIndex()` returns the index position of the first matching item or `-1`.

## Example

```javascript
const result = students.findIndex(student => student.Name === "ABBIW SYLVIA");
console.log(result);
```

### Answer

```javascript
1
```

## Chain example

```javascript
const index = students.findIndex(student => student.Gender === "Female");
const result = students.at(index);

console.log(result.Name);
```

### Answer

```javascript
"ABBIW SYLVIA"
```

---

# SOME METHOD

## What `some()` does

`some()` checks if at least one item matches a condition.

## Example

```javascript
const result = students.some(student =>
  Object.values(student.Subjects).includes("F9")
);

console.log(result);
```

### Answer

```javascript
true
```

## Chain example

```javascript
const result = students.filter(student =>
  Object.keys(student.Subjects).some(subject => subject.includes("MATH"))
);

console.log(result.map(student => student.Name));
```

### Answer

```javascript
[
  "ABAMA SIAKA ABDULAI JUNIOR",
  "ABBIW SYLVIA"
]
```

---

# EVERY METHOD

## What `every()` does

`every()` checks whether all items match a condition.

## Example

```javascript
const result = students.every(student => "ENGLISH LANG" in student.Subjects);
console.log(result);
```

### Answer

```javascript
true
```

## Chain example

```javascript
const result = students
  .map(student => Object.keys(student.Subjects).length)
  .every(count => count === 8);

console.log(result);
```

### Answer

```javascript
true
```

---

# FOREACH METHOD

## What `forEach()` does

`forEach()` runs code for each item. It is for side effects, not transformation.

## Example

```javascript
students.forEach(student => {
  console.log(student.Name);
});
```

### Answer printed to console

```javascript
ABAMA SIAKA ABDULAI JUNIOR
ABBIW SYLVIA
```

## Chain example

```javascript
Object.entries(students[0].Subjects).forEach(([subject, grade]) => {
  console.log(`${subject}: ${grade}`);
});
```

### Answer printed to console

```javascript
SOCIAL STUDIES: B3
ENGLISH LANG: C5
MATHEMATICS(CORE): C6
INTEGRATED SCIENCE: B3
MATHEMATICS(ELECT): E8
BIOLOGY: E8
CHEMISTRY: C6
PHYSICS: E8
```

---

# OBJECT.KEYS METHOD

## What `Object.keys()` does

Returns an array of keys from an object.

## Example

```javascript
const result = Object.keys(students[0].Subjects);
console.log(result);
```

### Answer

```javascript
[
  "SOCIAL STUDIES",
  "ENGLISH LANG",
  "MATHEMATICS(CORE)",
  "INTEGRATED SCIENCE",
  "MATHEMATICS(ELECT)",
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS"
]
```

## Chain example

```javascript
const result = Object.keys(students[0].Subjects).sort((a, b) => a.localeCompare(b));
console.log(result);
```

### Answer

```javascript
[
  "BIOLOGY",
  "CHEMISTRY",
  "ENGLISH LANG",
  "INTEGRATED SCIENCE",
  "MATHEMATICS(CORE)",
  "MATHEMATICS(ELECT)",
  "PHYSICS",
  "SOCIAL STUDIES"
]
```

---

# OBJECT.VALUES METHOD

## What `Object.values()` does

Returns an array of values from an object.

## Example

```javascript
const result = Object.values(students[1].Subjects);
console.log(result);
```

### Answer

```javascript
[
  "C6",
  "C5",
  "C6",
  "B3",
  "F9",
  "C4",
  "C4",
  "C6"
]
```

## Chain example

```javascript
const result = Object.values(students[0].Subjects).filter(isFail);
console.log(result);
```

### Answer

```javascript
["E8", "E8", "E8"]
```

---

# OBJECT.ENTRIES METHOD

## What `Object.entries()` does

Returns an array of `[key, value]` pairs.

## Example

```javascript
const result = Object.entries(students[0].Subjects);
console.log(result);
```

### Answer

```javascript
[
  ["SOCIAL STUDIES", "B3"],
  ["ENGLISH LANG", "C5"],
  ["MATHEMATICS(CORE)", "C6"],
  ["INTEGRATED SCIENCE", "B3"],
  ["MATHEMATICS(ELECT)", "E8"],
  ["BIOLOGY", "E8"],
  ["CHEMISTRY", "C6"],
  ["PHYSICS", "E8"]
]
```


``` javascript
import { students } from "./index1.js";



const result = students.map(student =>{ 
  const score = Object.entries(student.Subjects).map(([subject, grade])=>([
    subject,
    grade.slice(1),
  ]));
 
  

  return ({
  Name: student.Name,
  Index: student.Index,
  Gender: student.Gender,
  DOB: student.Dob,
  subjects: Object.fromEntries(score)
  
  })

})
console.log(JSON.stringify(result.slice(0, 1), null, 2));
console.dir(result.slice(0, 1), { depth: null });
```

### ANSWER

```
[
  {
    "Name": "ABAMA SIAKA ABDULAI JUNIOR",
    "Index": "0051804001",
    "Gender": "Male",
    "DOB": "17/05/2007",
    "subjects": {
      "SOCIAL STUDIES": "3",
      "ENGLISH LANG": "5",
      "MATHEMATICS(CORE)": "6",
      "INTEGRATED SCIENCE": "3",
      "MATHEMATICS(ELECT)": "8",
      "BIOLOGY": "8",
      "CHEMISTRY": "6",
      "PHYSICS": "8"
    }
  }
]
[
  {
    Name: 'ABAMA SIAKA ABDULAI JUNIOR',
    Index: '0051804001',
    Gender: 'Male',
    DOB: '17/05/2007',
    subjects: {
      'SOCIAL STUDIES': '3',
      'ENGLISH LANG': '5',
      'MATHEMATICS(CORE)': '6',
      'INTEGRATED SCIENCE': '3',
      'MATHEMATICS(ELECT)': '8',
      BIOLOGY: '8',
      CHEMISTRY: '6',
      PHYSICS: '8'
    }
  }
]
```
## Chain example

```javascript
const result = Object.entries(students[0].Subjects).map(([subject, grade]) => ({
  subject,
  grade
}));

console.log(result);
```

### Answer

```javascript
[
  { subject: "SOCIAL STUDIES", grade: "B3" },
  { subject: "ENGLISH LANG", grade: "C5" },
  { subject: "MATHEMATICS(CORE)", grade: "C6" },
  { subject: "INTEGRATED SCIENCE", grade: "B3" },
  { subject: "MATHEMATICS(ELECT)", grade: "E8" },
  { subject: "BIOLOGY", grade: "E8" },
  { subject: "CHEMISTRY", grade: "C6" },
  { subject: "PHYSICS", grade: "E8" }
]
```

---

# OBJECT.FROMENTRIES METHOD

## What `Object.fromEntries()` does

Converts entries back into an object.

## Example

```javascript
const result = Object.fromEntries(
  Object.entries(students[0].Subjects).filter(([_, grade]) => isPass(grade))
);

console.log(result);
```

### Answer

```javascript
{
  "SOCIAL STUDIES": "B3",
  "ENGLISH LANG": "C5",
  "MATHEMATICS(CORE)": "C6",
  "INTEGRATED SCIENCE": "B3",
  "CHEMISTRY": "C6"
}
```


### GET CORE SUBJECTS ONLY 

``` javascript
const core_subjects = ["SOCIAL STUDIES",
      "ENGLISH LANG",
      "MATHEMATICS(CORE)",
      "INTEGRATED SCIENCE"]

const isCore = (grade) => core_subjects.includes(grade);
const notCore = (grade) => !core_subjects.includes(grade);

const result = students.map(student => Object.fromEntries(
    Object.entries(student.Subjects).filter(([subject, _]) => core_subjects.includes(subject))
));


console.log(result);

```

##  Answer

``` javascript
{
    'SOCIAL STUDIES': 'B3',
    'ENGLISH LANG': 'C5',
    'MATHEMATICS(CORE)': 'C6',
    'INTEGRATED SCIENCE': 'B3'
  },
  {
    'SOCIAL STUDIES': 'C6',
    'ENGLISH LANG': 'C5',
    'MATHEMATICS(CORE)': 'C6',
    'INTEGRATED SCIENCE': 'B3'
  },

```


### SPLITS SUBJECTS INTO CORE AND ELECTIVE
``` javascript
const core_subjects = ["SOCIAL STUDIES",
      "ENGLISH LANG",
      "MATHEMATICS(CORE)",
      "INTEGRATED SCIENCE"]

const isCore = (grade) => core_subjects.includes(grade);
const notCore = (grade) => !core_subjects.includes(grade);

const result = students.map(student => ({
    Name: student.Name,
    Gender: student.Gender,
    core_subject: Object.fromEntries(
    Object.entries(student.Subjects).filter(([subject, _]) => isCore(subject))),
    elective_subject: Object.fromEntries(
        Object.entries(student.Subjects).filter(([subject, _]) => notCore(subject))
    )
})
);


console.log(result);

```


### ANSWER

``` javascript
[{
    Name: 'ADU CHRISTOPHER',
    Gender: 'Male',
    core_subject: {
      'SOCIAL STUDIES': 'B3',
      'ENGLISH LANG': 'B3',
      'MATHEMATICS(CORE)': 'C6',
      'INTEGRATED SCIENCE': 'B3'
    },
    elective_subject: {
      ECONOMICS: 'C6',
      GEOGRAPHY: 'B3',
      GOVERNMENT: 'C6',
      'TWI(ASANTE)': 'B3'
    }
  },
  {
    Name: 'ADU DANIEL',
    Gender: 'Male',
    core_subject: {
      'SOCIAL STUDIES': 'F9',
      'ENGLISH LANG': 'F9',
      'MATHEMATICS(CORE)': 'D7',
      'INTEGRATED SCIENCE': 'C5'
    },
    elective_subject: {
      'BUSINESS MANAGEMENT': 'F9',
      'FINANCIAL ACCOUNTING': 'B3',
      'PRIN OF COST ACCTS': 'D7',
      ECONOMICS: 'F9'
    }
  }]
```


## Chain example

```javascript
const result = Object.fromEntries(
  Object.entries(students[1].Subjects).map(([subject, grade]) => [
    subject.toLowerCase(),
    grade
  ])
);

console.log(result);
```

### Answer

```javascript
{
  "social studies": "C6",
  "english lang": "C5",
  "mathematics(core)": "C6",
  "integrated science": "B3",
  "biology": "F9",
  "foods & nutrition": "C4",
  "mgt in living": "C4",
  "gen know in art": "C6"
}
```

---

# INCLUDES METHOD

## What `includes()` does

Checks whether an array or string contains a value.

## Example

```javascript
const result = Object.keys(students[0].Subjects).includes("BIOLOGY");
console.log(result);
```

### Answer

```javascript
true
```

## Chain example

```javascript
const result = students
  .map(student => student.Name)
  .includes("ABBIW SYLVIA");

console.log(result);
```

### Answer

```javascript
true
```

---

# JOIN METHOD

## What `join()` does

Combines array items into one string.

## Example

```javascript
const result = students.map(student => student.Name).join(" | ");
console.log(result);
```

### Answer

```javascript
"ABAMA SIAKA ABDULAI JUNIOR | ABBIW SYLVIA"
```

## Chain example

```javascript
const result = Object.keys(students[1].Subjects).join(", ");
console.log(result);
```

### Answer

```javascript
"SOCIAL STUDIES, ENGLISH LANG, MATHEMATICS(CORE), INTEGRATED SCIENCE, BIOLOGY, FOODS & NUTRITION, MGT IN LIVING, GEN KNOW IN ART"
```

---

# SLICE METHOD

## What `slice()` does

Returns part of an array without changing the original array.

## Example

```javascript
const result = students.slice(0, 1);
console.log(result.map(student => student.Name));
```

### Answer

```javascript
["ABAMA SIAKA ABDULAI JUNIOR"]
```

## Chain example

```javascript
const result = students
  .map(student => student.Name)
  .slice(0, 1);

console.log(result);
```

### Answer

```javascript
["ABAMA SIAKA ABDULAI JUNIOR"]
```

---

# SPLICE METHOD

## What `splice()` does

Adds, removes, or replaces elements in the original array.

## Example

```javascript
const copy = [...students];
copy.splice(1, 1);
console.log(copy.map(student => student.Name));
```

### Answer

```javascript
["ABAMA SIAKA ABDULAI JUNIOR"]
```

---

# AT METHOD

## What `at()` does

Gets an item by index, including negative indexes.

## Example

```javascript
const result = students.at(-1);
console.log(result.Name);
```

### Answer

```javascript
"ABBIW SYLVIA"
```

## Chain example

```javascript
const result = Object.keys(students[0].Subjects).at(-1);
console.log(result);
```

### Answer

```javascript
"PHYSICS"
```

---

# SET + ARRAY.FROM

## What `Set` does

Stores unique values only. `Array.from()` converts that Set into an array.

## Example

```javascript
const result = Array.from(
  new Set(students.flatMap(student => Object.keys(student.Subjects)))
);

console.log(result);
```

### Answer

```javascript
[
  "SOCIAL STUDIES",
  "ENGLISH LANG",
  "MATHEMATICS(CORE)",
  "INTEGRATED SCIENCE",
  "MATHEMATICS(ELECT)",
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS",
  "FOODS & NUTRITION",
  "MGT IN LIVING",
  "GEN KNOW IN ART"
]
```

## Chain example

```javascript
const result = Array.from(
  new Set(students.flatMap(student => Object.keys(student.Subjects)))
).sort((a, b) => a.localeCompare(b));

console.log(result);
```

### Answer

```javascript
[
  "BIOLOGY",
  "CHEMISTRY",
  "ENGLISH LANG",
  "FOODS & NUTRITION",
  "GEN KNOW IN ART",
  "INTEGRATED SCIENCE",
  "MATHEMATICS(CORE)",
  "MATHEMATICS(ELECT)",
  "MGT IN LIVING",
  "PHYSICS",
  "SOCIAL STUDIES"
]
```



OR
``` javascript
const result1 = [...new Set(students.flatMap(student => Object.keys(student.Subjects)))].sort((a, b)=> a.localeCompare(b));
console.log(result);
```

### ANSWER

``` javascript
[
  'ANIMAL HUSBANDRY',
  'BIOLOGY',
  'BUSINESS MANAGEMENT',
  'CHEMISTRY',
  'CHRISTIAN REL STUD',
  'CLOTHING & TEXTILES',
  'CROP HUSB & HORT',
  'ECONOMICS',
  'ENGLISH LANG',
  'FINANCIAL ACCOUNTING',
  'FOODS & NUTRITION',
  'FORESTRY',
  'FRENCH',
  'GEN KNOW IN ART',
  'GENERAL AGRICULTURE',
  'GEOGRAPHY',
  'GOVERNMENT',
  'GRAPHIC DESIGN',
  'INFO. & COMM. TECHNOLOGY',
  'INTEGRATED SCIENCE',
  'ISLAMIC REL STUD',
  'LEATHERWORK',
  'LIT-IN-ENGLISH',
  'MATHEMATICS(CORE)',
  'MATHEMATICS(ELECT)',
  'MGT IN LIVING',
  'PHYSICS',
  'PICTURE MAKING',
  'PRIN OF COST ACCTS',
  'SCULPTURE',
  'SOCIAL STUDIES',
  'TWI(ASANTE)'
]
```

---

# PART 2 MODERN METHODS AND ADVANCED PATTERNS

# REVERSE METHOD

## What `reverse()` does

`reverse()` reverses an array in place.

## Example

```javascript
const result = [...students].reverse().map(student => student.Name);
console.log(result);
```

### Answer

```javascript
[
  "ABBIW SYLVIA",
  "ABAMA SIAKA ABDULAI JUNIOR"
]
```

---

# CONCAT METHOD

## What `concat()` does

Combines arrays into one new array.

## Example

```javascript
const extraStudents = [
  {
    Index: "0051804003",
    Name: "NEW STUDENT",
    Gender: "Male",
    Dob: "01/01/2007",
    Subjects: { "ENGLISH LANG": "B3" }
  }
];

const result = students.concat(extraStudents);
console.log(result.map(student => student.Name));
```

### Answer

```javascript
[
  "ABAMA SIAKA ABDULAI JUNIOR",
  "ABBIW SYLVIA",
  "NEW STUDENT"
]
```

---

# TOSORTED METHOD

## What `toSorted()` does

`toSorted()` returns a sorted copy without mutating the original array.

## Example

```javascript
const result = students.toSorted((a, b) => a.Name.localeCompare(b.Name));
console.log(result.map(student => student.Name));
```

### Answer

```javascript
[
  "ABAMA SIAKA ABDULAI JUNIOR",
  "ABBIW SYLVIA"
]
```

---

# TOREVERSED METHOD

## What `toReversed()` does

`toReversed()` returns a reversed copy without changing the original array.

## Example

```javascript
const result = students.toReversed().map(student => student.Name);
console.log(result);
```

### Answer

```javascript
[
  "ABBIW SYLVIA",
  "ABAMA SIAKA ABDULAI JUNIOR"
]
```

---

# TOSPLICED METHOD

## What `toSpliced()` does

`toSpliced()` returns a changed copy without mutating the original.

## Example

```javascript
const result = students.toSpliced(1, 1).map(student => student.Name);
console.log(result);
```

### Answer

```javascript
["ABAMA SIAKA ABDULAI JUNIOR"]
```

---

# ARRAY ENTRIES VALUES KEYS

## What they do

- `array.entries()` gives `[index, value]`
- `array.values()` gives values
- `array.keys()` gives indexes

## Example with `entries()`

```javascript
const result = Array.from(students.map(student => student.Name).entries());
console.log(result);
```

### Answer

```javascript
[
  [0, "ABAMA SIAKA ABDULAI JUNIOR"],
  [1, "ABBIW SYLVIA"]
]
```

## Example with `keys()`

```javascript
const result = Array.from(students.keys());
console.log(result);
```

### Answer

```javascript
[0, 1]
```

## Example with `values()`

```javascript
const result = Array.from(students.values()).map(student => student.Name);
console.log(result);
```

### Answer

```javascript
[
  "ABAMA SIAKA ABDULAI JUNIOR",
  "ABBIW SYLVIA"
]
```

---

# DESTRUCTURING

## What destructuring does

Destructuring lets you pull values out of arrays or objects more cleanly.

## Example

```javascript
const [{ Name: firstName }, { Name: secondName }] = students;
console.log(firstName, secondName);
```

### Answer

```javascript
"ABAMA SIAKA ABDULAI JUNIOR" "ABBIW SYLVIA"
```

## Nested destructuring example

```javascript
const { Subjects: { BIOLOGY } } = students[1];
console.log(BIOLOGY);
```

### Answer

```javascript
"F9"
```

---

# OPTIONAL CHAINING

## What optional chaining does

Optional chaining safely checks nested values without throwing an error when something is missing.

## Example

```javascript
const result = students[0]?.Subjects?.PHYSICS;
console.log(result);
```

### Answer

```javascript
"E8"
```

## Safe missing example

```javascript
const result = students[0]?.Subjects?.ECONOMICS;
console.log(result);
```

### Answer

```javascript
undefined
```

---

# NULLISH COALESCING

## What `??` does

`??` gives a fallback only when the left side is `null` or `undefined`.

## Example

```javascript
const result = students[0]?.Subjects?.ECONOMICS ?? "Not offered";
console.log(result);
```

### Answer

```javascript
"Not offered"
```

---

# REAL REPORT PATTERNS

# Student fail report

```javascript
const result = students.map(student => ({
  student: student.Name,
  failedSubjects: Object.entries(student.Subjects)
    .filter(([_, grade]) => isFail(grade))
    .map(([subject, grade]) => ({ subject, grade }))
}));

console.log(result);
```

### Answer

```javascript
[
  {
    student: "ABAMA SIAKA ABDULAI JUNIOR",
    failedSubjects: [
      { subject: "MATHEMATICS(ELECT)", grade: "E8" },
      { subject: "BIOLOGY", grade: "E8" },
      { subject: "PHYSICS", grade: "E8" }
    ]
  },
  {
    student: "ABBIW SYLVIA",
    failedSubjects: [
      { subject: "BIOLOGY", grade: "F9" }
    ]
  }
]
```

# Subject performance table

```javascript
const result = students
  .flatMap(student =>
    Object.entries(student.Subjects).map(([subject, grade]) => ({
      subject,
      grade
    }))
  )
  .reduce((acc, row) => {
    if (!acc[row.subject]) {
      acc[row.subject] = {};
    }

    acc[row.subject][row.grade] = (acc[row.subject][row.grade] || 0) + 1;
    return acc;
  }, {});

console.log(result);
```

### Answer

```javascript
{
  "SOCIAL STUDIES": { B3: 1, C6: 1 },
  "ENGLISH LANG": { C5: 2 },
  "MATHEMATICS(CORE)": { C6: 2 },
  "INTEGRATED SCIENCE": { B3: 2 },
  "MATHEMATICS(ELECT)": { E8: 1 },
  "BIOLOGY": { E8: 1, F9: 1 },
  "CHEMISTRY": { C6: 1 },
  "PHYSICS": { E8: 1 },
  "FOODS & NUTRITION": { C4: 1 },
  "MGT IN LIVING": { C4: 1 },
  "GEN KNOW IN ART": { C6: 1 }
}
```

# Ranking report

```javascript
const result = students
  .map(student => ({
    name: student.Name,
    passCount: Object.values(student.Subjects).filter(isPass).length,
    failCount: Object.values(student.Subjects).filter(isFail).length
  }))
  .sort((a, b) => {
    if (b.passCount !== a.passCount) {
      return b.passCount - a.passCount;
    }
    return a.failCount - b.failCount;
  });

console.log(result);
```

### Answer

```javascript
[
  { name: "ABBIW SYLVIA", passCount: 7, failCount: 1 },
  { name: "ABAMA SIAKA ABDULAI JUNIOR", passCount: 5, failCount: 3 }
]
```

---

# QUICK METHOD SELECTION GUIDE

- Use `map()` when one input becomes one output.
- Use `flatMap()` when one input becomes many rows.
- Use `filter()` when you want only matching items.
- Use `reduce()` when you want one final result.
- Use `sort()` when you want order.
- Use `find()` when you want the first match.
- Use `findIndex()` when you want the position of the first match.
- Use `some()` when one match is enough.
- Use `every()` when all items must match.
- Use `forEach()` when you only want side effects.
- Use `Object.keys()` for subject names.
- Use `Object.values()` for grades.
- Use `Object.entries()` for subject-grade pairs.
- Use `Object.fromEntries()` to rebuild an object after filtering or mapping entries.

---

# FINAL NOTE

The most important advanced pattern for your data is:

```javascript
const result = students.flatMap(student =>
  Object.entries(student.Subjects).map(([subject, grade]) => ({
    name: student.Name,
    subject,
    grade
  }))
);
```

### Answer

It converts the nested `Subjects` object into flat row data, which is the foundation for:

- fail reports
- pass reports
- subject analysis
- grade distribution
- ranking
- export tables
- WASSCE analyzer logic






Perfect — now we’re doing this **properly (senior-level notes)**.
I’ve expanded everything with:

✔ Clear explanations
✔ Real-world use cases
✔ Step-by-step breakdowns
✔ Multiple examples (your dataset style)
✔ Still clean Markdown + your structure intact

---

# PART 2 ENTERPRISE PATTERNS

---

# GROUPBY METHOD

## 🔍 What it does

`Object.groupBy()` groups items in an array into categories based on a condition.

👉 Think of it as:

> “Split this data into buckets”

---

## 🧠 Why it matters (REAL USE CASE)

Used in:

* Dashboards (group students by gender)
* Reports (group transactions by status)
* Analytics (group users by region)

---

## ✅ Basic Example

```javascript
const grouped = Object.groupBy(students, s => s.Gender);
```

### Result

```javascript
{
  Male: [ {...}, {...} ],
  Female: [ {...} ]
}
```

---

## 🔥 Advanced Example (Your Dataset)

Group students by **pass/fail status**

```javascript
const grouped = Object.groupBy(students, student => {
  const hasFail = Object.values(student.Subjects).some(isFail);
  return hasFail ? "Failed" : "Passed";
});
```

---

## 🧠 Explanation

1. `Object.values(student.Subjects)` → gets all grades
2. `.some(isFail)` → checks if at least one fail exists
3. Returns group name → `"Failed"` or `"Passed"`

---

## ⚠️ Important

* Returns an **object**, not array
* Keys are your group labels

---

## 🔄 Old Way (Important for Interviews)

```javascript
const grouped = students.reduce((acc, student) => {
  const key = student.Gender;

  if (!acc[key]) acc[key] = [];
  acc[key].push(student);

  return acc;
}, {});
```

---

# STRUCTURED CLONE

## 🔍 What it does

Creates a **deep copy** of an object.

---

## ⚠️ Problem it solves

Normal copying:

```javascript
const copy = students;
```

👉 This creates a **reference**, not a copy

---

## ❌ Dangerous Example

```javascript
const copy = students;

copy[0].Name = "Changed";

console.log(students[0].Name); 
// ❌ Also changed (BUG)
```

---

## ✅ Correct Way

```javascript
const deepCopy = structuredClone(students);
```

---

## 🔥 Real Example

```javascript
const cloned = structuredClone(students);

cloned[0].Subjects["ENGLISH LANG"] = "A1";

console.log(students[0].Subjects["ENGLISH LANG"]);
// Original stays safe ✅
```

---

## 🧠 Use Cases

* Editing forms safely
* Undo/redo systems
* State management (React, Redux)

---

# DEEP MERGE PATTERN

## 🔍 What it does

Combines objects **without losing nested data**

---

## ⚠️ Problem

```javascript
const result = { ...defaults, ...userPrefs };
```

👉 This **overwrites nested objects completely**

---

## ❌ Example Problem

```javascript
const defaults = {
  notifications: { email: true, sms: false }
};

const user = {
  notifications: { sms: true }
};
```

```javascript
{ ...defaults, ...user }
// ❌ email is LOST
```

---

## ✅ Correct Deep Merge

```javascript
const final = {
  ...structuredClone(defaults),
  notifications: {
    ...defaults.notifications,
    ...user.notifications
  }
};
```

---

## 🧠 Real Use Case

* User settings system
* App configurations
* Feature flags

---

# OBJECT FREEZE

## 🔍 What it does

Makes an object **completely immutable**

---

## ✅ Example

```javascript
const CONFIG = Object.freeze({
  version: "1.0"
});
```

---

## ❌ Attempt to modify

```javascript
CONFIG.version = "2.0"; // ❌ ignored
```

---

## 🧠 Use Cases

* API configs
* Environment constants
* Security-sensitive data

---

# OBJECT SEAL

## 🔍 What it does

Locks structure, but allows value updates

---

## ✅ Example

```javascript
const userSession = Object.seal({
  id: 1,
  name: "Kashi"
});
```

---

## Allowed

```javascript
userSession.name = "Updated"; // ✅
```

---

## Not Allowed

```javascript
delete userSession.id; // ❌
userSession.newProp = "x"; // ❌
```

---

## 🧠 Use Case

* Session objects
* Controlled state systems

---

# OBJECT HASOWN

## 🔍 What it does

Safely checks if a property exists

---

## ✅ Example

```javascript
Object.hasOwn(students[0], "Name");
```

---

## ⚠️ Why NOT use `.hasOwnProperty()`

```javascript
obj.hasOwnProperty("x"); // ❌ can be overridden
```

---

## 🧠 Real Use Case

* API validation
* Safe data parsing

---

# PART 3 PERFORMANCE

---

# MAP OBJECT

## 🔍 What it is

A faster key-value store than objects

---

## ✅ Example

```javascript
const map = new Map();

map.set("0051804001", students[0]);

const student = map.get("0051804001");
```

---

## 🧠 Why use Map?

| Feature   | Object         | Map       |
| --------- | -------------- | --------- |
| Speed     | Medium         | Fast      |
| Key Types | Strings only   | Any type  |
| Order     | Not guaranteed | Preserved |

---

## 🔥 Real Use Case

* Caching users
* Fast lookup by ID

---

# SET OBJECT

## 🔍 What it is

Stores **unique values only**

---

## ✅ Example

```javascript
const set = new Set([1, 2, 2, 3]);
console.log(set); // {1,2,3}
```

---

## 🔥 Real Example (Your Data)

```javascript
const uniqueSubjects = new Set(
  students.flatMap(s => Object.keys(s.Subjects))
);
```

---

## 🧠 Use Cases

* Remove duplicates
* Fast existence check

---

# MEMOIZATION

## 🔍 What it does

Caches results of expensive operations

---

## ✅ Example

```javascript
const memo = new Map();

function compute(id) {
  if (memo.has(id)) return memo.get(id);

  const result = id * 10;
  memo.set(id, result);

  return result;
}
```

---

## 🧠 Real Use Case

* API caching
* Expensive calculations
* React performance

---

# PART 4 ASYNC PATTERNS

---

# PROMISE ALLSETTLED

## 🔍 What it does

Runs multiple async tasks without failing everything

---

## ❌ Problem with Promise.all

```javascript
await Promise.all([...]); // fails if ONE fails
```

---

## ✅ Solution

```javascript
const results = await Promise.allSettled([
  fetch("/user"),
  fetch("/posts")
]);
```

---

## 🧠 Handling Results

```javascript
results.forEach(res => {
  if (res.status === "fulfilled") {
    console.log(res.value);
  } else {
    console.error(res.reason);
  }
});
```

---

## 🧠 Use Cases

* Dashboards
* Multiple APIs
* Fault-tolerant systems

---

# ABORTCONTROLLER

## 🔍 What it does

Cancels a request

---

## ✅ Example

```javascript
const controller = new AbortController();

fetch("/api", { signal: controller.signal });

controller.abort();
```

---

## 🧠 Use Cases

* Cancel search requests
* Prevent memory leaks
* Improve UX

---

# PART 5 LOCALIZATION

---

# NUMBER FORMAT

## 🔍 What it does

Formats numbers for different countries

---

## ✅ Example

```javascript
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

usd.format(1234);
```

---

## 🧠 Use Case

* Financial apps
* Reports

---

# DATE FORMAT

## 🔍 What it does

Formats dates based on region

---

## ✅ Example

```javascript
const date = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full"
});

date.format(new Date());
```

---

## 🧠 Use Case

* Logs
* Reports
* International apps

---

# REAL ENTERPRISE PIPELINE

## 🔍 What it does

Combines:

* groupBy
* map
* reduce
* sort

---

## ✅ Example

```javascript
const report = Object.groupBy(students, s => s.Gender);

const processed = Object.entries(report)
  .map(([group, list]) => {
    const totalFails = list.reduce((sum, student) => {
      return sum + Object.values(student.Subjects).filter(isFail).length;
    }, 0);

    return {
      group,
      count: list.length,
      totalFails
    };
  })
  .sort((a, b) => b.totalFails - a.totalFails);
```

---

## 🧠 Breakdown

1. Group students
2. Convert to array
3. Calculate totals
4. Sort results

---

## 🔥 Real Output

```javascript
[
  { group: "Male", count: 10, totalFails: 25 },
  { group: "Female", count: 8, totalFails: 12 }
]
```

---


