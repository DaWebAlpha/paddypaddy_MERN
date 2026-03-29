# TABLE OF CONTENTS

* [CHECK FOR TYPE](#check-for-type)

  * [ARRAY TYPE CHECK](#array-type-check)
  * [STRING TYPE CHECK](#string-type-check)
  * [NUMBER TYPE CHECK](#number-type-check)
  * [INTEGER CHECK](#integer-check)
  * [BOOLEAN TYPE CHECK](#boolean-type-check)
  * [OBJECT TYPE CHECK](#object-type-check)
  * [NULL CHECK](#null-check)
  * [UNDEFINED CHECK](#undefined-check)
  * [NULL OR UNDEFINED CHECK](#null-or-undefined-check)
  * [FUNCTION TYPE CHECK](#function-type-check)
  * [DATE TYPE CHECK](#date-type-check)
  * [ARRAY OF OBJECTS CHECK](#array-of-objects-check)
  * [ARRAY OF STRINGS CHECK](#array-of-strings-check)
  * [ARRAY OF NUMBERS CHECK](#array-of-numbers-check)
  * [POSITIVE NUMBER CHECK](#positive-number-check)
  * [COMMON MISTAKES](#common-mistakes)
  * [REAL WORLD VALIDATION](#real-world-validation)

---

# ARRAY TYPE CHECK

## Non-empty array

```javascript
if (!Array.isArray(studentsData) || studentsData.length === 0) {
  throw new Error("studentsData must be a non-empty array");
}
```

## Explanation

* `Array.isArray()` ensures value is an array
* `.length === 0` ensures it's not empty

---

# STRING TYPE CHECK

## Basic string check

```javascript
if (typeof str !== "string") {
  throw new Error("Value must be a string");
}
```

## Non-empty string check

```javascript
if (typeof str !== "string" || str.trim() === "") {
  throw new Error("Value must be a non-empty string");
}
```

## Explanation

* `typeof` checks type
* `trim()` removes spaces
* prevents `"   "` from passing

---

# NUMBER TYPE CHECK

## Basic number check

```javascript
if (typeof num !== "number") {
  throw new Error("Value must be a number");
}
```

## Valid number check (avoid NaN)

```javascript
if (typeof num !== "number" || Number.isNaN(num)) {
  throw new Error("Value must be a valid number");
}
```

## Explanation

* `typeof NaN === "number"` → tricky!
* Always use `Number.isNaN()`

---

# INTEGER CHECK

```javascript
if (!Number.isInteger(num)) {
  throw new Error("Value must be an integer");
}
```

---

# BOOLEAN TYPE CHECK

```javascript
if (typeof isActive !== "boolean") {
  throw new Error("Value must be a boolean");
}
```

---

# OBJECT TYPE CHECK

## Plain object only

```javascript
if (
  typeof value !== "object" ||
  value === null ||
  Array.isArray(value)
) {
  throw new Error("Value must be a plain object");
}
```

## Explanation

* excludes `null`
* excludes arrays

---

# NULL CHECK

```javascript
if (value === null) {
  throw new Error("Value must not be null");
}
```

---

# UNDEFINED CHECK

```javascript
if (typeof value === "undefined") {
  throw new Error("Value is undefined");
}
```

---

# NULL OR UNDEFINED CHECK

```javascript
if (value == null) {
  throw new Error("Value is required");
}
```

## Explanation

* `== null` checks both:

  * `null`
  * `undefined`

---

# FUNCTION TYPE CHECK

```javascript
if (typeof callback !== "function") {
  throw new Error("Value must be a function");
}
```

---

# DATE TYPE CHECK

```javascript
if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
  throw new Error("Value must be a valid Date");
}
```

---

# ARRAY OF OBJECTS CHECK

```javascript
if (
  !Array.isArray(data) ||
  data.length === 0 ||
  !data.every(
    item => typeof item === "object" && item !== null && !Array.isArray(item)
  )
) {
  throw new Error("Must be a non-empty array of objects");
}
```

---

# ARRAY OF STRINGS CHECK

```javascript
if (
  !Array.isArray(tags) ||
  tags.length === 0 ||
  !tags.every(tag => typeof tag === "string" && tag.trim() !== "")
) {
  throw new Error("Must be array of non-empty strings");
}
```

---

# ARRAY OF NUMBERS CHECK

```javascript
if (
  !Array.isArray(numbers) ||
  numbers.length === 0 ||
  !numbers.every(num => typeof num === "number" && !Number.isNaN(num))
) {
  throw new Error("Must be array of valid numbers");
}
```

---

# POSITIVE NUMBER CHECK

```javascript
if (typeof num !== "number" || Number.isNaN(num) || num <= 0) {
  throw new Error("Must be a positive number");
}
```

---

# NEGATIVE NUMBER CHECK

```javascript
if (typeof num !== "number" || Number.isNaN(num) || num >= 0) {
  throw new Error("Must be a negative number");
}
```

---

# EMPTY OBJECT CHECK

```javascript
if (
  typeof obj !== "object" ||
  obj === null ||
  Array.isArray(obj) ||
  Object.keys(obj).length === 0
) {
  throw new Error("Must be non-empty object");
}
```

---

# COMMON MISTAKES

## ❌ Wrong: typeof array

```javascript
typeof []
// "object"
```

## ✅ Correct

```javascript
Array.isArray([])
```

---

## ❌ Wrong: assignment instead of comparison

```javascript
if (typeof num = "number")
```

## ✅ Correct

```javascript
if (typeof num === "number")
```

---

## ❌ Wrong: allowing empty string

```javascript
if (typeof str === "string")
```

## ✅ Correct

```javascript
if (typeof str !== "string" || str.trim() === "")
```

---

## ❌ Wrong: ignoring NaN

```javascript
typeof NaN === "number"
```

## ✅ Correct

```javascript
!Number.isNaN(num)
```

---

# REAL WORLD VALIDATION

```javascript
function validateUser(user) {
  if (
    typeof user !== "object" ||
    user === null ||
    Array.isArray(user)
  ) {
    throw new Error("User must be an object");
  }

  if (
    typeof user.name !== "string" ||
    user.name.trim() === ""
  ) {
    throw new Error("Name must be valid");
  }

  if (
    typeof user.age !== "number" ||
    Number.isNaN(user.age)
  ) {
    throw new Error("Age must be valid");
  }

  if (
    !Array.isArray(user.skills) ||
    user.skills.length === 0
  ) {
    throw new Error("Skills must be array");
  }

  return user;
}
```

---

# QUICK REFERENCE (SEARCH FAST)

| Type     | Check                                         |
| -------- | --------------------------------------------- |
| Array    | `Array.isArray(value)`                        |
| String   | `typeof value === "string"`                   |
| Number   | `typeof value === "number"`                   |
| Boolean  | `typeof value === "boolean"`                  |
| Function | `typeof value === "function"`                 |
| Object   | `typeof value === "object" && value !== null` |

---

# EXTENSION READY

You can now easily add new sections like:

```
# MAP CHECK
# SET CHECK
# FILE TYPE CHECK
# API VALIDATION
# MONGOOSE VALIDATION
```

