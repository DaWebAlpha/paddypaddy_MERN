 Here are all the common Python error types with examples following your pattern:

---

## SyntaxError

Occurs when Python cannot parse your code due to incorrect syntax.

```python
# This would cause SyntaxError if run:
# if x > 5
#     print("hello")

# Fix: Add colon after condition
text = "hello"

while True:
    try:
        # SyntaxError cannot be caught with try-except
        # It prevents the script from running at all
        pass
    except SyntaxError:
        print("Syntax error in code")
        continue
    break
```

---

## IndentationError

Occurs when indentation is inconsistent or missing.

```python
# This would cause IndentationError if run:
# def greet():
# print("hello")

# Fix: Indent the body of the function
text = "check indent"

while True:
    try:
        # IndentationError also cannot be caught at runtime
        pass
    except IndentationError:
        print("Fix your indentation")
        continue
    break
```

---

## NameError

Occurs when you use a variable or function that does not exist.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause NameError:
        # print(unknown_variable)
        
        if num > 0:
            print(f"{num} is positive")
        else:
            print(f"{num} is not positive")
            
    except NameError:
        print("Variable not defined")
        continue
    break
```

---

## TypeError

Occurs when you perform an operation on incompatible types.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        
        # This would cause TypeError:
        # result = num + 5  # Cannot add string and int
        
        num = int(num)
        
        if num > 0:
            print(f"{num} is positive")
            
    except TypeError:
        print("Cannot combine these types")
        continue
    break
```

---

## ValueError

Occurs when a function receives an argument of the correct type but inappropriate value.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)  # ValueError if input is "abc"
        
        if num > 0:
            print(f"{num} is positive")
        elif num == 0:
            print(f"{num} is zero")
        else:
            print(f"{num} is negative")
            
    except ValueError:
        print("Enter a valid number")
        continue
    break
```

---

## IndexError

Occurs when you try to access an index that does not exist in a list or string.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        my_list = [1, 2, 3]
        # This would cause IndexError:
        # print(my_list[10])
        
        if num > 0:
            print(f"{num} is positive")
            
    except IndexError:
        print("Index out of range")
        continue
    break
```

---

## KeyError

Occurs when you try to access a dictionary key that does not exist.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        person = {"name": "Kwame"}
        # This would cause KeyError:
        # print(person["age"])
        
        if num > 0:
            print(f"{num} is positive")
            
    except KeyError:
        print("Key not found in dictionary")
        continue
    break
```

---

## AttributeError

Occurs when you try to access an attribute or method that does not exist for an object.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        my_list = [1, 2, 3]
        # This would cause AttributeError:
        # my_list.appendd(4)  # Wrong method name
        
        if num > 0:
            print(f"{num} is positive")
            
    except AttributeError:
        print("Method or attribute does not exist")
        continue
    break
```

---

## ZeroDivisionError

Occurs when you divide a number by zero.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause ZeroDivisionError:
        # result = 10 / num  # If num is 0
        
        if num == 0:
            print("Cannot divide by zero")
        elif num > 0:
            print(f"{num} is positive")
            
    except ZeroDivisionError:
        print("Cannot divide by zero")
        continue
    break
```

---

## FileNotFoundError

Occurs when you try to open a file that does not exist.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause FileNotFoundError:
        # with open("missing.txt", "r") as f:
        #     content = f.read()
        
        if num > 0:
            print(f"{num} is positive")
            
    except FileNotFoundError:
        print("File not found")
        continue
    break
```

---

## ImportError

Occurs when Python cannot find the module or name you are trying to import.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause ImportError:
        # from math import nonexistent_function
        
        if num > 0:
            print(f"{num} is positive")
            
    except ImportError:
        print("Cannot import that name")
        continue
    break
```

---

## ModuleNotFoundError

Occurs when the module you are trying to import does not exist.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause ModuleNotFoundError:
        # import fake_module
        
        if num > 0:
            print(f"{num} is positive")
            
    except ModuleNotFoundError:
        print("Module not found, install it first")
        continue
    break
```

---

## RuntimeError

Occurs when an error does not fall into any other category.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause RuntimeError:
        # raise RuntimeError("Something went wrong")
        
        if num > 0:
            print(f"{num} is positive")
            
    except RuntimeError:
        print("Runtime error occurred")
        continue
    break
```

---

## RecursionError

Occurs when the maximum recursion depth is exceeded.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause RecursionError:
        # def infinite():
        #     return infinite()
        # infinite()
        
        if num > 0:
            print(f"{num} is positive")
            
    except RecursionError:
        print("Too many recursive calls")
        continue
    break
```

---

## MemoryError

Occurs when Python runs out of memory.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause MemoryError:
        # huge = [0] * (10 ** 12)
        
        if num > 0:
            print(f"{num} is positive")
            
    except MemoryError:
        print("Out of memory")
        continue
    break
```

---

## PermissionError

Occurs when you try to access a resource without sufficient permissions.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause PermissionError:
        # with open("/root/secret.txt", "r") as f:
        #     content = f.read()
        
        if num > 0:
            print(f"{num} is positive")
            
    except PermissionError:
        print("Permission denied")
        continue
    break
```

---

## TimeoutError

Occurs when an operation exceeds the maximum allowed time.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause TimeoutError:
        # import socket
        # socket.setdefaulttimeout(0.001)
        # socket.create_connection(("google.com", 80))
        
        if num > 0:
            print(f"{num} is positive")
            
    except TimeoutError:
        print("Operation timed out")
        continue
    break
```

---

## AssertionError

Occurs when an assert statement fails.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause AssertionError:
        # assert num > 0, "Number must be positive"
        
        if num > 0:
            print(f"{num} is positive")
            
    except AssertionError:
        print("Assertion failed")
        continue
    break
```

---

## EOFError

Occurs when input() hits an end-of-file condition without reading any data.

```python
text = "-123"

while True:
    try:
        # This would cause EOFError if no input is available:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        if num > 0:
            print(f"{num} is positive")
            
    except EOFError:
        print("No input available")
        continue
    break
```

---

## KeyboardInterrupt

Occurs when the user presses Ctrl+C.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        if num > 0:
            print(f"{num} is positive")
            
    except KeyboardInterrupt:
        print("\nUser interrupted")
        continue
    break
```

---

## OSError

Occurs when a system operation fails.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause OSError:
        # import os
        # os.remove("nonexistent_file.txt")
        
        if num > 0:
            print(f"{num} is positive")
            
    except OSError:
        print("System operation failed")
        continue
    break
```

---

## UnicodeDecodeError

Occurs when decoding bytes to string fails.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause UnicodeDecodeError:
        # b"\xff".decode("utf-8")
        
        if num > 0:
            print(f"{num} is positive")
            
    except UnicodeDecodeError:
        print("Cannot decode bytes to string")
        continue
    break
```

---

## UnicodeEncodeError

Occurs when encoding a string to bytes fails.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would cause UnicodeEncodeError:
        # "\ud800".encode("utf-8")
        
        if num > 0:
            print(f"{num} is positive")
            
    except UnicodeEncodeError:
        print("Cannot encode string to bytes")
        continue
    break
```

---

## LookupError

Base class for IndexError and KeyError. Catches both.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        my_list = [1, 2, 3]
        my_dict = {"a": 1}
        
        # This would trigger LookupError (IndexError or KeyError):
        # print(my_list[10])  # IndexError
        # print(my_dict["z"])  # KeyError
        
        if num > 0:
            print(f"{num} is positive")
            
    except LookupError:
        print("Index or key not found")
        continue
    break
```

---

## ArithmeticError

Base class for ZeroDivisionError, OverflowError, and FloatingPointError.

```python
text = "-123"

while True:
    try:
        num = input("Enter any number: ").strip()
        num = int(num)
        
        # This would trigger ArithmeticError:
        # result = 10 / num  # ZeroDivisionError if num is 0
        
        if num > 0:
            print(f"{num} is positive")
            
    except ArithmeticError:
        print("Arithmetic operation failed")
        continue
    break
```

---

