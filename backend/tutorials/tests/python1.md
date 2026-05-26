I'll search for the continuation of this Python Mastery Series to find Q81–Q120 and beyond.
 Based on your uploaded file (Q1–Q80), the series covers Python basics, data types, conditionals, and loops. Since I couldn't find the exact original source for Q81–Q120, I'll complete the series by following the same educational pattern and progression. Here's the continuation:

---

# 🐍 PYTHON MASTERY SERIES — PART 3 (Q81–Q120)

---

# 🔹 FUNCTIONS & MODULAR PROGRAMMING (Q81–Q100)

---

## Q81. Define a function

**Task:**
Write a function that prints "Hello".

**Hint:**
Use `def`

**Master Guide:**
Functions are reusable blocks of code.

**Code Idea:**

```python
def greet():
    print("Hello")

greet()
```

**Explanation:**
- `def`: Keyword to define a function.
- `greet()`: Function name followed by parentheses.
- The code inside is indented. Call the function by writing its name with parentheses.

---

## Q82. Function with parameters

**Code Idea:**

```python
def greet(name):
    print("Hello", name)

greet("Kwame")
```

**Explanation:**
- `name` is a parameter (placeholder for data).
- `"Kwame"` is the argument (actual value passed).
- Functions can accept multiple inputs to make them flexible.

---

## Q83. Function with return value

**Code Idea:**

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
```

**Explanation:**
- `return`: Sends a value back to the caller.
- `result` stores the returned value (8).
- Functions that return values can be used in expressions.

---

## Q84. Default parameter value

**Code Idea:**

```python
def greet(name="User"):
    print("Hello", name)

greet()
greet("Kwame")
```

**Explanation:**
- `name="User"`: Sets a default value if no argument is provided.
- First call prints "Hello User".
- Second call prints "Hello Kwame".

---

## Q85. Multiple parameters

**Code Idea:**

```python
def introduce(name, age, country):
    print(f"{name} is {age} years old from {country}")

introduce("Kwame", 25, "Ghana")
```

**Explanation:**
- Functions can accept multiple parameters separated by commas.
- Arguments must match the order of parameters (positional arguments).

---

## Q86. Keyword arguments

**Code Idea:**

```python
def introduce(name, age, country):
    print(f"{name} is {age} years old from {country}")

introduce(age=25, country="Ghana", name="Kwame")
```

**Explanation:**
- Keyword arguments specify parameter names, so order doesn't matter.
- Makes code more readable and self-documenting.

---

## Q87. Arbitrary arguments (*args)

**Code Idea:**

```python
def total(*numbers):
    result = 0
    for n in numbers:
        result += n
    return result

print(total(1, 2, 3, 4))
```

**Explanation:**
- `*numbers`: Collects all extra positional arguments into a tuple.
- Allows passing any number of arguments.
- Output: 10.

---

## Q88. Arbitrary keyword arguments (**kwargs)

**Code Idea:**

```python
def display(**data):
    for key, value in data.items():
        print(f"{key}: {value}")

display(name="Kwame", age=25, city="Accra")
```

**Explanation:**
- `**data`: Collects all extra keyword arguments into a dictionary.
- Useful when you don't know how many named arguments will be passed.

---

## Q89. Function scope (local vs global)

**Code Idea:**

```python
x = 10  # Global variable

def change():
    x = 5  # Local variable
    print("Inside:", x)

change()
print("Outside:", x)
```

**Explanation:**
- Variables created inside a function are **local** (only exist there).
- Variables outside are **global** (accessible everywhere).
- Output: Inside: 5, Outside: 10.

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

**Explanation:**
- `global x`: Tells Python to use the global variable, not create a local one.
- Changes inside the function affect the global variable.
- Output: 5.

---

## Q91. Lambda function

**Code Idea:**

```python
square = lambda x: x ** 2
print(square(5))
```

**Explanation:**
- `lambda`: Creates a small anonymous function in one line.
- `x` is the parameter, `x ** 2` is the return expression.
- Output: 25.

---

## Q92. Lambda with multiple parameters

**Code Idea:**

```python
multiply = lambda a, b: a * b
print(multiply(4, 5))
```

**Explanation:**
- Lambdas can take multiple arguments separated by commas.
- Best used for short, simple operations.

---

## Q93. Map function

**Code Idea:**

```python
nums = [1, 2, 3, 4]
squares = list(map(lambda x: x ** 2, nums))
print(squares)
```

**Explanation:**
- `map()`: Applies a function to every item in an iterable.
- Returns a map object, so we convert it to a list.
- Output: [1, 4, 9, 16].

---

## Q94. Filter function

**Code Idea:**

```python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)
```

**Explanation:**
- `filter()`: Keeps only items where the function returns True.
- Output: [2, 4, 6].

---

## Q95. Sorted function with key

**Code Idea:**

```python
words = ["banana", "pie", "Washington"]
sorted_words = sorted(words, key=len)
print(sorted_words)
```

**Explanation:**
- `key=len`: Sorts based on the length of each string.
- Original list remains unchanged.
- Output: ['pie', 'banana', 'Washington'].

---

## Q96. Docstrings

**Code Idea:**

```python
def greet(name):
    """This function greets the person passed in."""
    print("Hello", name)

print(greet.__doc__)
```

**Explanation:**
- Triple-quoted strings at the start of a function document what it does.
- `.__doc__`: Accesses the docstring.
- Good practice for maintainable code.

---

## Q97. Type hints

**Code Idea:**

```python
def add(a: int, b: int) -> int:
    return a + b

print(add(5, 3))
```

**Explanation:**
- `: int` indicates the expected parameter type.
- `-> int` indicates the return type.
- Python doesn't enforce these, but they help with code clarity and IDE support.

---

## Q98. Recursion (factorial)

**Code Idea:**

```python
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
```

**Explanation:**
- A function that calls itself is **recursive**.
- Must have a base case (`n == 1`) to stop infinite recursion.
- 5! = 5 × 4 × 3 × 2 × 1 = 120.

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

**Explanation:**
- Functions can be defined inside other functions.
- `inner()` is only accessible within `outer()`.
- Useful for encapsulation and closures.

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

**Explanation:**
- Functions are "first-class citizens" in Python—they can be passed as arguments.
- `apply_operation` calls whatever function is passed to it.
- Output: 8.

---

# 🔹 FILE HANDLING & EXCEPTIONS (Q101–Q110)

---

## Q101. Write to a file

**Task:**
Create a text file and write "Hello World" to it.

**Hint:**
Use `open()` with mode `"w"`

**Code Idea:**

```python
file = open("hello.txt", "w")
file.write("Hello World")
file.close()
```

**Explanation:**
- `open()`: Opens a file. `"w"` = write mode (creates new or overwrites).
- `write()`: Writes text to the file.
- `close()`: Saves and closes the file. **Always close files!**

---

## Q102. Read from a file

**Code Idea:**

```python
file = open("hello.txt", "r")
content = file.read()
file.close()
print(content)
```

**Explanation:**
- `"r"` = read mode (default).
- `read()`: Reads the entire file content as a string.
- If the file doesn't exist, Python raises a `FileNotFoundError`.

---

## Q103. Read line by line

**Code Idea:**

```python
file = open("hello.txt", "r")
for line in file:
    print(line.strip())
file.close()
```

**Explanation:**
- Looping over a file reads it line by line.
- `.strip()`: Removes extra whitespace and newline characters.
- Memory-efficient for large files.

---

## Q104. Append to file

**Code Idea:**

```python
file = open("hello.txt", "a")
file.write("\nNew line added")
file.close()
```

**Explanation:**
- `"a"` = append mode (adds to the end without deleting existing content).
- `\n`: Newline character to start on a new line.

---

## Q105. With statement (context manager)

**Code Idea:**

```python
with open("hello.txt", "r") as file:
    content = file.read()
    print(content)
```

**Explanation:**
- `with`: Automatically closes the file, even if errors occur.
- Cleaner and safer than manually calling `close()`.
- The standard way to handle files in Python.

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

**Explanation:**
- `try`: Code that might cause an error.
- `except`: Handles the specific error if it occurs.
- Prevents the program from crashing.

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

**Explanation:**
- You can catch different errors with separate `except` blocks.
- `ValueError`: Invalid conversion to int.
- `ZeroDivisionError`: Division by zero.

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

**Explanation:**
- `finally`: Executes whether an error occurred or not.
- Perfect for cleanup operations (closing resources).

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

**Explanation:**
- `raise`: Manually triggers an exception.
- Useful for validating inputs and enforcing rules.
- `as e`: Catches the error message.

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

**Explanation:**
- Create custom exceptions by inheriting from the base `Exception` class.
- Makes error handling more descriptive and organized.

---

# 🔹 OBJECT-ORIENTED PROGRAMMING (Q111–Q120)

---

## Q111. Create a class

**Task:**
Create a `Person` class with a name attribute.

**Hint:**
Use `class` keyword

**Code Idea:**

```python
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Kwame")
print(p.name)
```

**Explanation:**
- `class`: Blueprint for creating objects.
- `__init__`: Constructor method called when an object is created.
- `self`: Refers to the current instance of the class.
- `p.name`: Accesses the attribute.

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

**Explanation:**
- Methods are functions defined inside a class.
- `self` must be the first parameter of every method.
- Methods operate on the object's data.

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

**Explanation:**
- Classes can store multiple related pieces of data.
- Methods can use any of the attributes to perform operations.

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

**Explanation:**
- Object attributes can be modified directly after creation.
- This is direct attribute access (not always recommended for complex cases).

---

## Q115. Encapsulation (private attributes)

**Code Idea:**

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private attribute
    
    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
print(account.get_balance())
```

**Explanation:**
- `__balance`: Double underscore makes the attribute "private" (name mangling).
- Direct access from outside is discouraged.
- Use getter methods to access private data safely.

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

**Explanation:**
- `Dog(Animal)`: Dog inherits from Animal.
- `speak()`: Overridden in Dog to provide specific behavior.
- Inheritance promotes code reuse.

---

## Q117. Super() function

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

**Explanation:**
- `super()`: Calls the parent class's method.
- Avoids repeating code in the child class constructor.
- `d.name` comes from Animal, `d.breed` from Dog.

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

**Explanation:**
- A class can inherit from multiple parents.
- `Duck` gets methods from both `Flyer` and `Swimmer`.
- Use carefully to avoid complexity.

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

**Explanation:**
- `@staticmethod`: Belongs to the class, doesn't need `self`.
- `@classmethod`: Receives the class itself as `cls`.
- Both can be called without creating an instance.

---

## Q120. String representation (__str__)

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

**Explanation:**
- `__str__`: Defines the string representation of an object.
- Called automatically by `print()` and `str()`.
- Makes objects readable and debuggable.

---

# ✔ PYTHON MASTERY SERIES COMPLETE (Q1–Q120)

---

## 📚 Quick Reference: What You've Learned

| Section | Topics |
|---------|--------|
| **Q1–Q20** | Print, variables, input, operators, type conversion, string methods |
| **Q21–Q40** | Lists, tuples, dictionaries, sets, membership testing |
| **Q41–Q60** | If/elif/else, logical operators, nested conditions |
| **Q61–Q80** | For loops, while loops, break/continue, range, built-in functions |
| **Q81–Q100** | Functions, parameters, return values, *args, **kwargs, lambda, recursion |
| **Q101–Q110** | File I/O, context managers, exception handling, custom exceptions |
| **Q111–Q120** | Classes, objects, methods, encapsulation, inheritance, polymorphism |

---

## 🎯 Next Steps

1. **Practice**: Type every example yourself—don't just read.
2. **Build projects**: Start with a calculator, then a to-do list, then a mini banking system.
3. **Explore libraries**: NumPy, Pandas, Flask/Django, requests.
4. **Read code**: Study open-source Python projects on GitHub.
5. **Solve problems**: Use LeetCode, HackerRank, or Codewars.

---

*Master these 120 concepts and you have a solid foundation in Python programming!*