

# 🐍 PYTHON MASTERY SERIES — PART 1 (Q1–Q40)

---

# 🔹 PYTHON BASICS (Q1–Q20)

---

## Q1. Print a message

**Task:** Write a program that prints your name.

**Hint:** Use `print()`

**Code Idea:**
```python
print("Kwame")
```

**Explanation:** `print()` is a built-in function that outputs text to the console. The text inside quotes is a string literal.

---

## Q2. Store and print a variable

**Code Idea:**
```python
name = "Kwame"
print(name)
```

**Explanation:** Variables act as containers for data. `name = "Kwame"` assigns the string to the variable `name`. `print(name)` outputs the stored value.

---

## Q3. Take user input

**Code Idea:**
```python
name = input("Enter name: ")
print(name)
```

**Explanation:** `input()` pauses execution and waits for the user to type something. It always returns a string, even if the user enters a number.

---

## Q4. Add two numbers

**Code Idea:**
```python
a = 5
b = 10
print(a + b)
```

**Explanation:** `+` is the addition operator. Python performs arithmetic on numeric types directly.

---

## Q5. Multiply numbers

**Code Idea:**
```python
a = 4
b = 3
print(a * b)
```

**Explanation:** `*` is the multiplication operator. The result of `4 * 3` is `12`.

---

## Q6. Division

**Code Idea:**
```python
print(10 / 2)
```

**Explanation:** `/` performs float division. Even when dividing evenly, the result is a float: `5.0`.

---

## Q7. Integer division

**Code Idea:**
```python
print(10 // 3)
```

**Explanation:** `//` is floor division. It divides and truncates the decimal part. `10 // 3` equals `3`.

---

## Q8. Modulus

**Code Idea:**
```python
print(10 % 3)
```

**Explanation:** `%` returns the remainder of division. `10` divided by `3` is `3` with a remainder of `1`.

---

## Q9. Check data type

**Code Idea:**
```python
x = 10
print(type(x))
```

**Explanation:** `type()` returns the data type of a value. Output: `<class 'int'>`.

---

## Q10. Convert string to int

**Code Idea:**
```python
x = "10"
print(int(x))
```

**Explanation:** `int()` converts a string of digits to an integer. Now you can perform math operations on it.

---

## Q11. Convert int to string

**Code Idea:**
```python
x = 10
print(str(x))
```

**Explanation:** `str()` converts a number to a string. This is necessary when concatenating numbers with text.

---

## Q12. Swap variables

**Code Idea:**
```python
a = 5
b = 10
a, b = b, a
print(a, b)
```

**Explanation:** Python's tuple unpacking allows swapping values in one line without a temporary variable.

---

## Q13. String concatenation

**Code Idea:**
```python
a = "Hello"
b = "World"
print(a + " " + b)
```

**Explanation:** `+` joins strings together. `" "` is a space string used as a separator.

---

## Q14. String length

**Code Idea:**
```python
text = "Python"
print(len(text))
```

**Explanation:** `len()` returns the number of characters in a string. Output: `6`.

---

## Q15. Uppercase string

**Code Idea:**
```python
print("python".upper())
```

**Explanation:** `.upper()` is a string method that converts all characters to uppercase. Output: `"PYTHON"`.

---

## Q16. Lowercase string

**Code Idea:**
```python
print("PYTHON".lower())
```

**Explanation:** `.lower()` converts all characters to lowercase. Output: `"python"`.

---

## Q17. Check substring

**Code Idea:**
```python
text = "Hello Python"
print("Python" in text)
```

**Explanation:** `in` is a membership operator. It checks if `"Python"` exists inside `text`. Returns `True`.

---

## Q18. Replace text

**Code Idea:**
```python
text = "I like Java"
print(text.replace("Java", "Python"))
```

**Explanation:** `.replace(old, new)` searches for the first argument and replaces it with the second. Output: `"I like Python"`.

---

## Q19. Split string

**Code Idea:**
```python
text = "a,b,c"
print(text.split(","))
```

**Explanation:** `.split(",")` cuts the string at each comma and returns a list: `['a', 'b', 'c']`.

---

## Q20. Join strings

**Code Idea:**
```python
words = ["I", "love", "Python"]
print(" ".join(words))
```

**Explanation:** `" ".join(list)` takes a list of strings and joins them with spaces. Output: `"I love Python"`.

---

# 🔹 DATA TYPES & COLLECTIONS (Q21–Q40)

---

## Q21. Create list

**Code Idea:**
```python
nums = [1, 2, 3]
print(nums)
```

**Explanation:** Square brackets `[]` define a list. Lists are ordered, mutable collections that allow duplicates.

---

## Q22. Access list item

**Code Idea:**
```python
nums = [10, 20, 30]
print(nums[0])
```

**Explanation:** Python uses zero-based indexing. `nums[0]` accesses the first element: `10`.

---

## Q23. Change list item

**Code Idea:**
```python
nums = [1, 2, 3]
nums[0] = 100
print(nums)
```

**Explanation:** Lists are mutable. You can change an item by assigning to its index.

---

## Q24. Add to list

**Code Idea:**
```python
nums = [1, 2]
nums.append(3)
print(nums)
```

**Explanation:** `.append()` adds an item to the end of the list. Result: `[1, 2, 3]`.

---

## Q25. Remove item

**Code Idea:**
```python
nums = [1, 2, 3]
nums.remove(2)
print(nums)
```

**Explanation:** `.remove(value)` removes the first occurrence of the specified value.

---

## Q26. List length

**Code Idea:**
```python
nums = [1, 2, 3]
print(len(nums))
```

**Explanation:** `len()` returns the number of items in the list.

---

## Q27. Loop through list

**Code Idea:**
```python
for i in [1, 2, 3]:
    print(i)
```

**Explanation:** `for i in ...` iterates over each item. `i` takes each value one by one.

---

## Q28. Tuple creation

**Code Idea:**
```python
t = (1, 2, 3)
print(t)
```

**Explanation:** Parentheses `()` define a tuple. Tuples are ordered but immutable.

---

## Q29. Access tuple

**Code Idea:**
```python
t = (10, 20, 30)
print(t[1])
```

**Explanation:** Tuples support indexing like lists. Index `1` refers to the second item: `20`.

---

## Q30. Dictionary creation

**Code Idea:**
```python
person = {"name": "Kwame", "age": 25}
print(person)
```

**Explanation:** Curly braces `{}` define a dictionary. It stores data in key-value pairs.

---

## Q31. Access dictionary

**Code Idea:**
```python
person = {"name": "Kwame", "age": 25}
print(person["name"])
```

**Explanation:** Access values by their key inside square brackets. Retrieves `"Kwame"`.

---

## Q32. Add dictionary item

**Code Idea:**
```python
person = {"name": "Kwame", "age": 25}
person["country"] = "Ghana"
print(person)
```

**Explanation:** Assign a value to a new key to add it. If the key exists, it updates the value.

---

## Q33. Loop dictionary

**Code Idea:**
```python
person = {"name": "Kwame", "age": 25}
for key in person:
    print(key, person[key])
```

**Explanation:** Iterating over a dictionary loops through its keys. `person[key]` retrieves the value.

---

## Q34. Check key exists

**Code Idea:**
```python
person = {"name": "Kwame", "age": 25}
print("name" in person)
```

**Explanation:** `in` checks if a specific key exists in the dictionary. Returns `True` or `False`.

---

## Q35. Set creation

**Code Idea:**
```python
s = {1, 2, 3}
print(s)
```

**Explanation:** Curly braces with values define a set. Sets are unordered and contain only unique elements.

---

## Q36. Add set item

**Code Idea:**
```python
s = {1, 2, 3}
s.add(4)
print(s)
```

**Explanation:** `.add()` adds an element to the set. Since sets are unordered, position is arbitrary.

---

## Q37. Remove set item

**Code Idea:**
```python
s = {1, 2, 3}
s.remove(2)
print(s)
```

**Explanation:** `.remove()` removes the specified element. Raises an error if the element does not exist. Use `.discard()` to avoid errors.

---

## Q38. Length of set

**Code Idea:**
```python
s = {1, 2, 3}
print(len(s))
```

**Explanation:** Counts how many unique items are in the set.

---

## Q39. Convert list to set

**Code Idea:**
```python
print(set([1, 1, 2, 3]))
```

**Explanation:** `set()` converts an iterable to a set, automatically removing duplicates. Output order may vary.

---

## Q40. Check membership

**Code Idea:**
```python
print(3 in [1, 2, 3])
```

**Explanation:** Checks if the value `3` is present in the list. Membership testing is very fast on sets.

---

# 🐍 PYTHON MASTERY SERIES — PART 2 (Q41–Q80)

---

# 🔹 CONDITIONS & LOOPS (Q41–Q60)

---

## Q41. Check if number is positive

**Code Idea:**
```python
n = int(input("Enter number: "))
if n > 0:
    print("Positive")
```

**Explanation:** `if` checks a condition. The colon starts a code block. Indentation is mandatory in Python.

---

## Q42. Check negative number

**Code Idea:**
```python
n = int(input())
if n < 0:
    print("Negative")
```

**Explanation:** Checks if the number is strictly less than zero.

---

## Q43. Check even or odd

**Code Idea:**
```python
n = int(input())
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```

**Explanation:** `n % 2 == 0` uses modulo to check divisibility by 2. `else` catches all other cases.

---

## Q44. Compare two numbers

**Code Idea:**
```python
a = int(input())
b = int(input())
if a > b:
    print("A is greater")
elif a < b:
    print("B is greater")
else:
    print("Equal")
```

**Explanation:** `elif` means "else if". It allows checking multiple conditions in sequence. The first true condition executes and the rest are skipped.

---

## Q45. Check voting eligibility

**Code Idea:**
```python
age = int(input())
if age >= 18:
    print("Can vote")
else:
    print("Cannot vote")
```

**Explanation:** `>=` is the greater than or equal to operator.

---

## Q46. Grade system

**Code Idea:**
```python
marks = int(input())
if marks >= 80:
    print("A")
elif marks >= 70:
    print("B")
elif marks >= 60:
    print("C")
else:
    print("Fail")
```

**Explanation:** Logic flows top-to-bottom. If marks are 85, the first condition is met and the rest are skipped.

---

## Q47. Check password

**Code Idea:**
```python
password = input()
if password == "admin":
    print("Access granted")
else:
    print("Denied")
```

**Explanation:** `==` is the equality operator. This is basic authentication logic.

---

## Q48. Check range

**Code Idea:**
```python
n = int(input())
if 1 <= n <= 100:
    print("Valid")
```

**Explanation:** Python allows chained comparison: `1 <= n` AND `n <= 100`. Cleaner than using `and`.

---

## Q49. Nested condition

**Code Idea:**
```python
n = int(input())
if n > 0:
    if n > 10:
        print("Big positive")
```

**Explanation:** An `if` inside another `if`. For the inner message to print, both conditions must be true.

---

## Q50. Multiple conditions with and

**Code Idea:**
```python
a = int(input())
b = int(input())
if a > 0 and b > 0:
    print("Both positive")
```

**Explanation:** `and` is a logical operator. Both sides must be `True` for the whole condition to be true.

---

## Q51. OR condition

**Code Idea:**
```python
a = int(input())
b = int(input())
if a > 0 or b > 0:
    print("At least one positive")
```

**Explanation:** `or` is a logical operator. Only one side needs to be `True`.

---

## Q52. Check divisible by 3 and 5

**Code Idea:**
```python
n = int(input())
if n % 3 == 0 and n % 5 == 0:
    print("FizzBuzz")
```

**Explanation:** Classic FizzBuzz logic. Checks if `n` is a multiple of both 3 and 5.

---

## Q53. Check leap year

**Code Idea:**
```python
year = int(input())
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("Leap year")
```

**Explanation:** Leap year rule: divisible by 4 but not 100, OR divisible by 400.

---

## Q54. Check string empty

**Code Idea:**
```python
text = input()
if text == "":
    print("Empty")
```

**Explanation:** Checks if the string is exactly empty. Alternatively: `if not text:`

---

## Q55. Check character type

**Code Idea:**
```python
ch = input()
if ch.isalpha():
    print("Letter")
```

**Explanation:** `.isalpha()` returns `True` if all characters in the string are letters.

---

## Q56. Check digit

**Code Idea:**
```python
ch = input()
if ch.isdigit():
    print("Number")
```

**Explanation:** `.isdigit()` returns `True` if the string contains only digits.

---

## Q57. Check uppercase

**Code Idea:**
```python
ch = input()
if ch.isupper():
    print("Uppercase")
```

**Explanation:** Checks if the string contains uppercase letters and at least one cased character.

---

## Q58. Check lowercase

**Code Idea:**
```python
ch = input()
if ch.islower():
    print("Lowercase")
```

**Explanation:** Checks if the string contains lowercase letters and no uppercase.

---

## Q59. Compare strings

**Code Idea:**
```python
a = input()
b = input()
if a == b:
    print("Same")
```

**Explanation:** String comparison is case-sensitive. `"Hello"` does not equal `"hello"`.

---

## Q60. File existence check

**Code Idea:**
```python
import os
file = "data.txt"
if os.path.exists(file):
    print("Exists")
```

**Explanation:** `os.path.exists()` returns `True` if the file or folder is found.

---

# 🔹 LOOPS (Q61–Q80)

---

## Q61. Print numbers 1 to 10

**Code Idea:**
```python
for i in range(1, 11):
    print(i)
```

**Explanation:** `range(start, stop)` generates numbers from start up to but not including stop.

---

## Q62. Sum numbers 1 to 100

**Code Idea:**
```python
total = 0
for i in range(1, 101):
    total += i
print(total)
```

**Explanation:** `total += i` is shorthand for `total = total + i`. Accumulates the sum inside the loop.

---

## Q63. Even numbers

**Code Idea:**
```python
for i in range(1, 21):
    if i % 2 == 0:
        print(i)
```

**Explanation:** Checks every number in the loop and prints only those divisible by 2.

---

## Q64. Odd numbers

**Code Idea:**
```python
for i in range(1, 21):
    if i % 2 != 0:
        print(i)
```

**Explanation:** Prints numbers where the remainder of division by 2 is not 0.

---

## Q65. Multiplication table

**Code Idea:**
```python
n = int(input())
for i in range(1, 11):
    print(n * i)
```

**Explanation:** Loops 1 to 10 and multiplies user input `n` by the loop counter `i`.

---

## Q66. While loop counter

**Code Idea:**
```python
i = 1
while i <= 5:
    print(i)
    i += 1
```

**Explanation:** `while` repeats as long as the condition is true. You must increment `i` inside the loop or it runs forever.

---

## Q67. Countdown

**Code Idea:**
```python
i = 10
while i >= 1:
    print(i)
    i -= 1
```

**Explanation:** Decrements `i` in each iteration. Counts backwards from 10 to 1.

---

## Q68. Break loop

**Code Idea:**
```python
for i in range(10):
    if i == 5:
        break
    print(i)
```

**Explanation:** `break` immediately terminates the loop entirely. Prints 0 through 4, stops before 5.

---

## Q69. Continue loop

**Code Idea:**
```python
for i in range(10):
    if i == 5:
        continue
    print(i)
```

**Explanation:** `continue` skips the rest of the current iteration and jumps to the next one. Prints 0-4, skips 5, prints 6-9.

---

## Q70. Nested loop

**Code Idea:**
```python
for i in range(3):
    for j in range(3):
        print(i, j)
```

**Explanation:** The inner loop runs completely for every single iteration of the outer loop.

---

## Q71. Loop through list

**Code Idea:**
```python
nums = [1, 2, 3]
for n in nums:
    print(n)
```

**Explanation:** `for each` loop. `n` takes the value of each item sequentially.

---

## Q72. Loop through string

**Code Idea:**
```python
for ch in "Python":
    print(ch)
```

**Explanation:** Strings are iterable. The loop prints one character at a time.

---

## Q73. Count elements

**Code Idea:**
```python
nums = [1, 2, 3, 4]
print(len(nums))
```

**Explanation:** `len()` works on lists, tuples, strings, dictionaries, and sets.

---

## Q74. Find max value

**Code Idea:**
```python
nums = [3, 8, 2, 10]
print(max(nums))
```

**Explanation:** `max()` is a built-in function that finds the highest value.

---

## Q75. Find min value

**Code Idea:**
```python
nums = [3, 8, 2, 10]
print(min(nums))
```

**Explanation:** `min()` finds the lowest value.

---

## Q76. Sum list

**Code Idea:**
```python
nums = [1, 2, 3]
print(sum(nums))
```

**Explanation:** `sum()` adds all numeric elements together.

---

## Q77. Loop with index

**Code Idea:**
```python
nums = [10, 20, 30]
for i in range(len(nums)):
    print(i, nums[i])
```

**Explanation:** `range(len(nums))` generates indices 0, 1, 2. `nums[i]` accesses the value at that index.

---

## Q78. Reverse loop

**Code Idea:**
```python
for i in range(10, 0, -1):
    print(i)
```

**Explanation:** `range(start, stop, step)` with step `-1` counts backwards. Stops before 0.

---

## Q79. Loop with step

**Code Idea:**
```python
for i in range(0, 10, 2):
    print(i)
```

**Explanation:** Step `2` jumps by 2. Output: 0, 2, 4, 6, 8.

---

## Q80. Infinite loop with break

**Code Idea:**
```python
while True:
    print("Running...")
    break
```

**Explanation:** `while True` creates an infinite loop. `break` is required to exit. Common pattern in servers or menus.

---

# 🐍 PYTHON MASTERY SERIES — PART 3 (Q81–Q120)

---

# 🔹 FUNCTIONS & MODULES (Q81–Q100)

---

## Q81. Define a function

**Task:** Write a function that prints "Hello".

**Hint:** Use `def`

**Code Idea:**
```python
def greet():
    print("Hello")

greet()
```

**Explanation:** `def` defines a function. The code inside is indented. Call the function by writing its name with parentheses.

---

## Q82. Function with parameters

**Code Idea:**
```python
def greet(name):
    print("Hello", name)

greet("Kwame")
```

**Explanation:** `name` is a parameter. `"Kwame"` is the argument. Functions accept inputs to make them flexible.

---

## Q83. Function with return value

**Code Idea:**
```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
```

**Explanation:** `return` sends a value back to the caller. `result` stores the returned value.

---

## Q84. Default parameter value

**Code Idea:**
```python
def greet(name="User"):
    print("Hello", name)

greet()
greet("Kwame")
```

**Explanation:** `name="User"` sets a default if no argument is provided. First call prints "Hello User". Second prints "Hello Kwame".

---

## Q85. Multiple parameters

**Code Idea:**
```python
def introduce(name, age, country):
    print(f"{name} is {age} years old from {country}")

introduce("Kwame", 25, "Ghana")
```

**Explanation:** Functions can accept multiple parameters separated by commas. Arguments must match the order.

---

## Q86. Keyword arguments

**Code Idea:**
```python
def introduce(name, age, country):
    print(f"{name} is {age} years old from {country}")

introduce(age=25, country="Ghana", name="Kwame")
```

**Explanation:** Keyword arguments specify parameter names, so order does not matter. Makes code more readable.

---

## Q87. Arbitrary arguments with *args

**Code Idea:**
```python
def total(*numbers):
    result = 0
    for n in numbers:
        result += n
    return result

print(total(1, 2, 3, 4))
```

**Explanation:** `*numbers` collects all extra positional arguments into a tuple. Allows passing any number of arguments.

---

## Q88. Arbitrary keyword arguments with **kwargs

**Code Idea:**
```python
def display(**data):
    for key, value in data.items():
        print(f"{key}: {value}")

display(name="Kwame", age=25, city="Accra")
```

**Explanation:** `**data` collects all extra keyword arguments into a dictionary. Useful when you don't know how many named arguments will be passed.

---

## Q89. Function scope

**Code Idea:**
```python
x = 10

def change():
    x = 5
    print("Inside:", x)

change()
print("Outside:", x)
```

**Explanation:** Variables inside functions are local. Variables outside are global. Output: Inside: 5, Outside: 10.

---

## Q90. Global keyword

**Code Idea:**
```python
x = 10

def change():
    global x
    x = 5

change()
print(x)
```

**Explanation:** `global x` tells Python to use the global variable, not create a local one. Output: 5.

---

## Q91. Lambda function

**Code Idea:**
```python
square = lambda x: x ** 2
print(square(5))
```

**Explanation:** `lambda` creates a small anonymous function in one line. `x` is the parameter, `x ** 2` is the return expression.

---

## Q92. Lambda with multiple parameters

**Code Idea:**
```python
multiply = lambda a, b: a * b
print(multiply(4, 5))
```

**Explanation:** Lambdas can take multiple arguments separated by commas. Best used for short, simple operations.

---

## Q93. Map function

**Code Idea:**
```python
nums = [1, 2, 3, 4]
squares = list(map(lambda x: x ** 2, nums))
print(squares)
```

**Explanation:** `map()` applies a function to every item in an iterable. Returns a map object, so convert to list. Output: `[1, 4, 9, 16]`.

---

## Q94. Filter function

**Code Idea:**
```python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)
```

**Explanation:** `filter()` keeps only items where the function returns True. Output: `[2, 4, 6]`.

---

## Q95. Sorted with key

**Code Idea:**
```python
words = ["banana", "pie", "Washington"]
sorted_words = sorted(words, key=len)
print(sorted_words)
```

**Explanation:** `key=len` sorts based on the length of each string. Original list remains unchanged.

---

## Q96. Docstrings

**Code Idea:**
```python
def greet(name):
    """This function greets the person passed in."""
    print("Hello", name)

print(greet.__doc__)
```

**Explanation:** Triple-quoted strings at the start of a function document what it does. `.__doc__` accesses the docstring.

---

## Q97. Type hints

**Code Idea:**
```python
def add(a: int, b: int) -> int:
    return a + b

print(add(5, 3))
```

**Explanation:** `: int` indicates expected parameter type. `-> int` indicates return type. Python does not enforce these, but they help with code clarity.

---

## Q98. Recursion

**Code Idea:**
```python
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
```

**Explanation:** A function that calls itself is recursive. Must have a base case to stop infinite recursion. 5 factorial equals 120.

---

## Q99. Nested functions

**Code Idea:**
```python
def outer():
    print("Outer function")
    
    def inner():
        print("Inner function")
    
    inner()

outer()
```

**Explanation:** Functions can be defined inside other functions. `inner()` is only accessible within `outer()`. Useful for encapsulation and closures.

---

## Q100. Function as argument

**Code Idea:**
```python
def apply_operation(a, b, operation):
    return operation(a, b)

def add(x, y):
    return x + y

print(apply_operation(5, 3, add))
```

**Explanation:** Functions are first-class citizens in Python. They can be passed as arguments. `apply_operation` calls whatever function is passed to it.

---

# 🔹 FILE HANDLING & EXCEPTIONS (Q101–Q110)

---

## Q101. Write to a file

**Task:** Create a text file and write "Hello World" to it.

**Hint:** Use `open()` with mode `"w"`

**Code Idea:**
```python
file = open("hello.txt", "w")
file.write("Hello World")
file.close()
```

**Explanation:** `open()` opens a file. `"w"` is write mode. `write()` writes text. `close()` saves and closes the file.

---

## Q102. Read from a file

**Code Idea:**
```python
file = open("hello.txt", "r")
content = file.read()
file.close()
print(content)
```

**Explanation:** `"r"` is read mode. `read()` reads the entire file content as a string. If the file does not exist, Python raises a FileNotFoundError.

---

## Q103. Read line by line

**Code Idea:**
```python
file = open("hello.txt", "r")
for line in file:
    print(line.strip())
file.close()
```

**Explanation:** Looping over a file reads it line by line. `.strip()` removes extra whitespace and newline characters. Memory-efficient for large files.

---

## Q104. Append to file

**Code Idea:**
```python
file = open("hello.txt", "a")
file.write("\nNew line added")
file.close()
```

**Explanation:** `"a"` is append mode. Adds to the end without deleting existing content. `\n` is a newline character.

---

## Q105. With statement

**Code Idea:**
```python
with open("hello.txt", "r") as file:
    content = file.read()
    print(content)
```

**Explanation:** `with` automatically closes the file, even if errors occur. Cleaner and safer than manually calling `close()`. The standard way to handle files.

---

## Q106. Try-except block

**Code Idea:**
```python
try:
    num = int(input("Enter a number: "))
    print(num)
except ValueError:
    print("That's not a number!")
```

**Explanation:** `try` contains code that might cause an error. `except` handles the specific error if it occurs. Prevents the program from crashing.

---

## Q107. Multiple except blocks

**Code Idea:**
```python
try:
    a = int(input("Enter a: "))
    b = int(input("Enter b: "))
    print(a / b)
except ValueError:
    print("Please enter valid numbers")
except ZeroDivisionError:
    print("Cannot divide by zero")
```

**Explanation:** You can catch different errors with separate `except` blocks. `ValueError` for invalid conversion. `ZeroDivisionError` for division by zero.

---

## Q108. Finally block

**Code Idea:**
```python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("This always runs")
```

**Explanation:** `finally` executes whether an error occurred or not. Perfect for cleanup operations like closing resources.

---

## Q109. Raise exception

**Code Idea:**
```python
def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    check_age(-5)
except ValueError as e:
    print(e)
```

**Explanation:** `raise` manually triggers an exception. Useful for validating inputs and enforcing rules. `as e` catches the error message.

---

## Q110. Custom exception

**Code Idea:**
```python
class ValidationError(Exception):
    pass

def validate_name(name):
    if len(name) < 2:
        raise ValidationError("Name too short")

try:
    validate_name("A")
except ValidationError as e:
    print(e)
```

**Explanation:** Create custom exceptions by inheriting from the base `Exception` class. Makes error handling more descriptive and organized.

---

# 🔹 OBJECT-ORIENTED PROGRAMMING (Q111–Q120)

---

## Q111. Create a class

**Task:** Create a Person class with a name attribute.

**Hint:** Use `class` keyword

**Code Idea:**
```python
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Kwame")
print(p.name)
```

**Explanation:** `class` is the blueprint for creating objects. `__init__` is the constructor called when an object is created. `self` refers to the current instance.

---

## Q112. Class with methods

**Code Idea:**
```python
class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        print(f"Hello, my name is {self.name}")

p = Person("Kwame")
p.greet()
```

**Explanation:** Methods are functions defined inside a class. `self` must be the first parameter of every method. Methods operate on the object's data.

---

## Q113. Class with multiple attributes

**Code Idea:**
```python
class Person:
    def __init__(self, name, age, country):
        self.name = name
        self.age = age
        self.country = country
    
    def info(self):
        print(f"{self.name}, {self.age}, from {self.country}")

p = Person("Kwame", 25, "Ghana")
p.info()
```

**Explanation:** Classes can store multiple related pieces of data. Methods can use any of the attributes to perform operations.

---

## Q114. Modify object attributes

**Code Idea:**
```python
class Car:
    def __init__(self, brand):
        self.brand = brand
        self.speed = 0

my_car = Car("Toyota")
my_car.speed = 60
print(my_car.speed)
```

**Explanation:** Object attributes can be modified directly after creation. This is direct attribute access.

---

## Q115. Encapsulation with private attributes

**Code Idea:**
```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance
    
    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
print(account.get_balance())
```

**Explanation:** `__balance` with double underscore makes the attribute private through name mangling. Direct access from outside is discouraged. Use getter methods to access private data safely.

---

## Q116. Inheritance

**Code Idea:**
```python
class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

d = Dog()
d.speak()
```

**Explanation:** `Dog(Animal)` means Dog inherits from Animal. `speak()` is overridden in Dog to provide specific behavior. Inheritance promotes code reuse.

---

## Q117. Super function

**Code Idea:**
```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

d = Dog("Rex", "German Shepherd")
print(d.name, d.breed)
```

**Explanation:** `super()` calls the parent class's method. Avoids repeating code in the child class constructor. `d.name` comes from Animal, `d.breed` from Dog.

---

## Q118. Multiple inheritance

**Code Idea:**
```python
class Flyer:
    def fly(self):
        print("Flying")

class Swimmer:
    def swim(self):
        print("Swimming")

class Duck(Flyer, Swimmer):
    pass

d = Duck()
d.fly()
d.swim()
```

**Explanation:** A class can inherit from multiple parents. Duck gets methods from both Flyer and Swimmer. Use carefully to avoid complexity.

---

## Q119. Class methods and static methods

**Code Idea:**
```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b
    
    @classmethod
    def info(cls):
        print(f"This is {cls.__name__}")

print(MathUtils.add(5, 3))
MathUtils.info()
```

**Explanation:** `@staticmethod` belongs to the class, does not need self. `@classmethod` receives the class itself as `cls`. Both can be called without creating an instance.

---

## Q120. String representation with __str__

**Code Idea:**
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"{self.name} ({self.age} years old)"

p = Person("Kwame", 25)
print(p)
```

**Explanation:** `__str__` defines the string representation of an object. Called automatically by `print()` and `str()`. Makes objects readable and debuggable.

---

# ✔ PYTHON MASTERY SERIES COMPLETE (Q1–Q120)

---

## Quick Reference: What You Have Learned

Q1 to Q20: Print, variables, input, operators, type conversion, string methods

Q21 to Q40: Lists, tuples, dictionaries, sets, membership testing

Q41 to Q60: If, elif, else, logical operators, nested conditions

Q61 to Q80: For loops, while loops, break, continue, range, built-in functions

Q81 to Q100: Functions, parameters, return values, args, kwargs, lambda, recursion

Q101 to Q110: File input and output, context managers, exception handling, custom exceptions

Q111 to Q120: Classes, objects, methods, encapsulation, inheritance, polymorphism

---

## Next Steps

Practice by typing every example yourself. Build projects starting with a calculator, then a to-do list, then a mini banking system. Explore libraries like NumPy, Pandas, Flask, and Django. Solve problems on LeetCode, HackerRank, or Codewars.

Master these 120 concepts and you have a solid foundation in Python programming.