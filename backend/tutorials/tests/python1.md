

# 🐍 PYTHON MASTERY SERIES — PART 1 

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



Here are 20 Python projects mapped to your Q1–Q20 basics, with hints and step-by-step guides (no code solutions).

---

# 🐍 20 PYTHON PROJECTS FOR Q1–Q20 MASTERY

---

## PROJECT 1: Personal Greeter (Q1 + Q2 + Q3)

**Concept:** A program that greets the user by name.

**Hints:**
- Use `input()` to capture the user's name.
- Store the name in a variable.
- Print a personalized greeting message.

**Steps:**
1. Ask the user for their first name.
2. Ask the user for their last name.
3. Store both names in separate variables.
4. Combine them into a full name.
5. Print a greeting like "Hello, [full name]! Welcome to Python."

---

## PROJECT 2: Simple Calculator (Q4 + Q5 + Q6 + Q7 + Q8)

**Concept:** A calculator that performs basic arithmetic.

**Hints:**
- Use `input()` twice to get two numbers.
- Convert inputs to integers or floats.
- Perform addition, subtraction, multiplication, division, floor division, and modulus.
- Display all results clearly.

**Steps:**
1. Prompt for the first number.
2. Prompt for the second number.
3. Convert both inputs to floats.
4. Calculate and display the sum.
5. Calculate and display the difference.
6. Calculate and display the product.
7. Calculate and display the quotient (regular division).
8. Calculate and display the floor division result.
9. Calculate and display the remainder.
10. Format the output so each result is labeled clearly.

---

## PROJECT 3: Age Calculator (Q9 + Q10)

**Concept:** Calculate the user's age from their birth year.

**Hints:**
- Use `input()` to get the birth year as a string.
- Convert it to an integer.
- Subtract from the current year.
- Convert the result back to a string for display.

**Steps:**
1. Ask the user for their birth year.
2. Convert the input to an integer.
3. Define the current year as a variable.
4. Subtract birth year from current year.
5. Convert the age to a string.
6. Print "You are [age] years old."

---

## PROJECT 4: Temperature Converter (Q11 + type conversion practice)

**Concept:** Convert Celsius to Fahrenheit and vice versa.

**Hints:**
- Get temperature and unit from user.
- Convert string input to float for calculations.
- Convert numeric results to strings for output.
- Use string concatenation or f-strings.

**Steps:**
1. Ask the user for a temperature value.
2. Ask the user for the unit (C or F).
3. Convert the temperature value to a float.
4. If Celsius, apply F = (C × 9/5) + 32.
5. If Fahrenheit, apply C = (F - 32) × 5/9.
6. Convert the result to a string.
7. Print the converted temperature with its unit.

---

## PROJECT 5: Score Swapper (Q12)

**Concept:** Swap scores between two players.

**Hints:**
- Use tuple unpacking for swapping.
- Display values before and after.

**Steps:**
1. Define player1_score and player2_score with initial values.
2. Print both scores before swapping.
3. Use Python's tuple unpacking to swap the values.
4. Print both scores after swapping.
5. Verify the values have exchanged places.

---

## PROJECT 6: Sentence Builder (Q13 + Q19 + Q20)

**Concept:** Build and manipulate sentences from word fragments.

**Hints:**
- Use string concatenation to join fragments.
- Use split to break apart a sentence.
- Use join to reassemble words differently.

**Steps:**
1. Create three variables with word fragments.
2. Concatenate them with spaces into a full sentence.
3. Print the sentence.
4. Split the sentence back into a list of words.
5. Print the list.
6. Rearrange the words in the list.
7. Join the rearranged list back into a new sentence.
8. Print the new sentence.

---

## PROJECT 7: Text Analyzer (Q14 + Q15 + Q16 + Q17)

**Concept:** Analyze and transform user-entered text.

**Hints:**
- Use `len()` to count characters.
- Use `.upper()` and `.lower()` for case transformation.
- Use `in` to check for specific words.

**Steps:**
1. Ask the user to enter a paragraph of text.
2. Store the text in a variable.
3. Print the character count.
4. Print the text in all uppercase.
5. Print the text in all lowercase.
6. Ask the user for a word to search.
7. Check if that word exists in the text using `in`.
8. Print whether the word was found or not.

---

## PROJECT 8: Email Template Generator (Q18)

**Concept:** Replace placeholders in an email template with actual values.

**Hints:**
- Create a template string with placeholder words.
- Use `.replace()` to substitute placeholders.

**Steps:**
1. Define a template string with placeholders like NAME, DATE, EVENT.
2. Ask the user for their name.
3. Ask the user for a date.
4. Ask the user for an event name.
5. Use `.replace()` to substitute each placeholder.
6. Print the final personalized email.

---

## PROJECT 9: Word Counter (Q14 + Q19 + string methods)

**Concept:** Count words, characters, and lines in user text.

**Hints:**
- Use `.split()` to break text into words.
- Use `len()` on the resulting list.

**Steps:**
1. Ask the user to paste a paragraph.
2. Count total characters using `len()`.
3. Split the text into words using `.split()`.
4. Count the words using `len()` on the list.
5. Count lines by splitting on newline characters.
6. Display all three counts with labels.

---

## PROJECT 10: Username Generator (Q13 + Q14 + Q15 + Q16)

**Concept:** Generate username variations from a full name.

**Hints:**
- Combine string methods to create different username formats.

**Steps:**
1. Ask for first name and last name.
2. Create username format 1: first initial + last name, all lowercase.
3. Create username format 2: first name + last initial, all uppercase.
4. Create username format 3: first three letters of first name + last three letters of last name.
5. Check if a specific username pattern exists in a list of taken usernames.
6. Display all generated options.

---

## PROJECT 11: Receipt Printer (Q4 + Q5 + Q6 + Q7 + Q8 + Q13)

**Concept:** Calculate and print a store receipt.

**Hints:**
- Use arithmetic to calculate subtotals, tax, and totals.
- Use string concatenation to format the receipt.

**Steps:**
1. Define prices for three items.
2. Define quantities purchased for each.
3. Calculate subtotal for each item (price × quantity).
4. Sum all subtotals.
5. Calculate tax (e.g., 8% of subtotal).
6. Calculate final total.
7. Use string operations to align and format the receipt.
8. Print a professional-looking receipt with all values.

---

## PROJECT 12: Data Type Inspector (Q9 + Q10 + Q11)

**Concept:** A tool that inspects and converts user input.

**Hints:**
- Use `type()` to check what Python sees.
- Practice converting between types safely.

**Steps:**
1. Ask the user to enter something (anything).
2. Store the input in a variable.
3. Print the data type using `type()`.
4. Attempt to convert it to an integer and print the result or error.
5. Attempt to convert it to a float and print the result.
6. Convert it to a string (even though it already is one).
7. Print a summary of all conversions.

---

## PROJECT 13: Time Splitter (Q7 + Q8)

**Concept:** Convert total minutes into hours and remaining minutes.

**Hints:**
- Use floor division for hours.
- Use modulus for remaining minutes.

**Steps:**
1. Ask the user for total minutes.
2. Convert input to an integer.
3. Calculate hours using floor division by 60.
4. Calculate remaining minutes using modulus by 60.
5. Print the result as "X hours and Y minutes."

---

## PROJECT 14: Piggy Bank (Q4 + Q5 + Q12)

**Concept:** Track coins and calculate total value.

**Hints:**
- Store counts of different coin types.
- Use arithmetic to calculate value.
- Use swapping to exchange coin types.

**Steps:**
1. Ask how many pennies, nickels, dimes, and quarters.
2. Convert all inputs to integers.
3. Calculate total value in cents.
4. Convert to dollars and cents.
5. Allow the user to "swap" their dimes for nickels (demonstrate swapping).
6. Recalculate and display the new total.

---

## PROJECT 15: Password Strength Checker (Q14 + Q15 + Q16 + Q17)

**Concept:** Evaluate a password based on length and content.

**Hints:**
- Check length with `len()`.
- Check for uppercase, lowercase, and digits using methods.

**Steps:**
1. Ask the user for a password.
2. Check if length is at least 8 characters.
3. Check if it contains at least one uppercase letter.
4. Check if it contains at least one lowercase letter.
5. Check if it contains at least one digit.
6. Give feedback on each requirement.
7. Declare the password weak, moderate, or strong based on how many checks pass.

---

## PROJECT 16: Menu Formatter (Q13 + Q19 + Q20)

**Concept:** Format a restaurant menu from raw data.

**Hints:**
- Use split to separate raw menu items.
- Use join to format them nicely.

**Steps:**
1. Define a raw string with menu items separated by commas.
2. Split into a list of items.
3. Define prices in another list.
4. Combine item names and prices into formatted strings.
5. Join all formatted items with newline characters.
6. Print a nicely formatted menu.

---

## PROJECT 17: Number Analyzer (Q7 + Q8 + Q9 + Q10)

**Concept:** Analyze properties of a given number.

**Hints:**
- Use floor division and modulus to extract digits.
- Use type conversion to manipulate digits.

**Steps:**
1. Ask for a three-digit number.
2. Convert to integer.
3. Extract the hundreds digit using floor division by 100.
4. Extract the tens digit using floor division by 10 then modulus by 10.
5. Extract the ones digit using modulus by 10.
6. Sum the digits.
7. Reverse the digits by converting and concatenating.
8. Print all findings.

---

## PROJECT 18: Palindrome Checker (Q13 + Q14 + Q15 + Q16)

**Concept:** Check if a word or phrase is a palindrome.

**Hints:**
- Remove spaces and convert to lowercase.
- Compare the string with its reverse.

**Steps:**
1. Ask the user for a word or phrase.
2. Remove all spaces using `.replace()`.
3. Convert to lowercase.
4. Check if the cleaned text reads the same forwards and backwards.
5. Print whether it is a palindrome or not.

---

## PROJECT 19: Simple Quiz Game (Q3 + Q4 + Q13 + Q17)

**Concept:** A text-based quiz with scoring.

**Hints:**
- Use input for questions and answers.
- Use arithmetic to calculate score percentage.
- Use string methods to handle case-insensitive answers.

**Steps:**
1. Define five questions and their correct answers.
2. Initialize a score counter to zero.
3. Loop through each question.
4. Ask the user for their answer.
5. Convert their answer to lowercase.
6. Compare with the correct answer (also lowercase).
7. Increment score if correct.
8. Calculate percentage score.
9. Print final score with a personalized message.

---

## PROJECT 20: Daily Journal Entry (Q1 + Q2 + Q3 + Q13 + Q18)

**Concept:** Create a formatted daily journal entry.

**Hints:**
- Combine all basic concepts into one cohesive program.

**Steps:**
1. Print a welcome message.
2. Ask for the date.
3. Ask for the user's mood.
4. Ask for three things they did today (three separate inputs).
5. Ask for one thing they want to improve.
6. Store all inputs in variables.
7. Create a template string with placeholders.
8. Use `.replace()` to insert all values.
9. Print the complete formatted journal entry.
10. Print a closing message with the entry's character count.

---

# 📋 QUICK REFERENCE MAP






































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

Here are 30 Python projects mapped to your Q21–Q80, with headings, concepts, hints, and steps (no code).

---

# 🐍 30 PYTHON PROJECTS FOR Q21–Q80 MASTERY

---

## PROJECT 1: Shopping List Manager (Q21 + Q22 + Q23 + Q24 + Q25 + Q26)

**Concept:** Create and manage a grocery shopping list.

**Hints:**
- Use a list to store items.
- Use indexing to access specific items.
- Use `.append()` to add new items.
- Use `.remove()` to delete purchased items.
- Use `len()` to count total items.

**Steps:**
1. Create an empty shopping list.
2. Add five grocery items to the list.
3. Print the total number of items.
4. Access and print the third item.
5. Change the second item to a different product.
6. Remove an item that you no longer need.
7. Print the final list and confirm the count updated.

---

## PROJECT 2: Classroom Roster (Q21 + Q27 + Q73)

**Concept:** Manage a list of student names and iterate through them.

**Hints:**
- Store names in a list.
- Use a for loop to process each name.
- Use `len()` to report class size.

**Steps:**
1. Create a list with ten student names.
2. Print the total number of students enrolled.
3. Loop through the list and print each name with a greeting.
4. Add two new students who joined late.
5. Remove one student who transferred out.
6. Print the updated roster and new count.

---

## PROJECT 3: Top Scores Tracker (Q21 + Q74 + Q75 + Q76)

**Concept:** Track game scores and find statistics.

**Hints:**
- Use a list to store numeric scores.
- Use `max()`, `min()`, and `sum()` for analysis.
- Calculate average manually.

**Steps:**
1. Create a list of ten game scores.
2. Find and print the highest score.
3. Find and print the lowest score.
4. Calculate and print the total sum of all scores.
5. Calculate and print the average score.
6. Add a new high score to the list.
7. Recalculate and display updated statistics.

---

## PROJECT 4: Coordinate Pairs (Q28 + Q29)

**Concept:** Store and access fixed geographic coordinates.

**Hints:**
- Use tuples for immutable coordinate data.
- Use indexing to access latitude and longitude.

**Steps:**
1. Create three tuples representing city coordinates.
2. Print the latitude of the second city.
3. Print the longitude of the first city.
4. Attempt to modify a coordinate and observe the error.
5. Explain why tuples are appropriate for this data.

---

## PROJECT 5: Student Profile Card (Q30 + Q31 + Q32)

**Concept:** Build a student profile using key-value pairs.

**Hints:**
- Use a dictionary to store profile data.
- Access values using keys.
- Add new fields dynamically.

**Steps:**
1. Create a dictionary with name, age, and grade.
2. Print the student's name using key access.
3. Add a new key for favorite subject.
4. Update the grade to a new value.
5. Print the complete profile.

---

## PROJECT 6: Country Capitals Quiz (Q30 + Q33 + Q34)

**Concept:** Build a capitals database and query it.

**Hints:**
- Use a dictionary mapping countries to capitals.
- Loop through keys to display all entries.
- Use `in` to check if a country exists before querying.

**Steps:**
1. Create a dictionary of ten countries and their capitals.
2. Ask the user for a country name.
3. Check if the country exists in your dictionary.
4. If yes, print the capital. If no, print a not-found message.
5. Loop through all entries and print them formatted nicely.

---

## PROJECT 7: Unique Visitor Log (Q35 + Q36 + Q37 + Q38)

**Concept:** Track unique website visitors by IP address.

**Hints:**
- Use a set for automatic duplicate removal.
- Use `.add()` to register visits.
- Use `.remove()` to block an IP.
- Use `len()` to count unique visitors.

**Steps:**
1. Create an empty set for visitor IPs.
2. Add ten IP addresses, including three duplicates.
3. Print the total unique visitor count.
4. Remove a specific IP that was flagged as malicious.
5. Attempt to add a duplicate IP and confirm it is ignored.
6. Print the final clean set.

---

## PROJECT 8: Duplicate Remover Tool (Q39)

**Concept:** Clean a list by removing duplicates while preserving order.

**Hints:**
- Convert a list to a set to remove duplicates.
- Convert back to a list if order matters.
- Compare before and after counts.

**Steps:**
1. Create a list with twenty items including multiple duplicates.
2. Print the original list and its length.
3. Convert to a set to remove duplicates.
4. Convert back to a list.
5. Print the cleaned list and new length.
6. Calculate and display how many duplicates were removed.

---

## PROJECT 9: Membership Checker (Q40)

**Concept:** Verify if items exist in various collections.

**Hints:**
- Use `in` operator on lists, sets, and dictionaries.
- Compare speed of membership testing across types.

**Steps:**
1. Create a list, a set, and a dictionary with the same items.
2. Check if a specific item exists in each collection.
3. Print the results.
4. Test with an item that does not exist.
5. Observe and note which collection type is fastest for lookups.

---

## PROJECT 10: Inventory Manager (Q21–Q40 Combined)

**Concept:** Combine lists, dictionaries, and sets for a store inventory.

**Hints:**
- Use a list for item categories.
- Use a dictionary for item details and quantities.
- Use a set for out-of-stock items.

**Steps:**
1. Create a list of product categories.
2. Create a dictionary mapping product names to quantities.
3. Create a set of products that need restocking.
4. Add a new product to the dictionary.
5. Update quantity when a sale occurs.
6. Move a product to the restocking set when quantity hits zero.
7. Print a complete inventory report.

---

## PROJECT 11: Number Classifier (Q41 + Q42 + Q43)

**Concept:** Classify numbers as positive, negative, even, or odd.

**Hints:**
- Use `if`, `elif`, and `else` chains.
- Use modulo operator for even or odd check.
- Handle zero as a special case.

**Steps:**
1. Ask the user for a number.
2. Check if the number is positive, negative, or zero.
3. If not zero, check if it is even or odd.
4. Print a complete classification like "Positive even" or "Negative odd".
5. Loop to allow checking multiple numbers.

---

## PROJECT 12: Smart Thermostat (Q44 + Q45 + Q48)

**Concept:** Control temperature based on multiple conditions.

**Hints:**
- Use chained comparisons for temperature ranges.
- Use `elif` for different comfort zones.
- Combine with user age for special handling.

**Steps:**
1. Ask for current temperature and occupant age.
2. If temperature is below 18, print "Heating on".
3. If temperature is between 18 and 24, print "Comfortable".
4. If temperature is above 24, print "Cooling on".
5. If occupant is over 65, adjust comfort range by 2 degrees.
6. Print the final thermostat decision.

---

## PROJECT 13: Exam Grader (Q46)

**Concept:** Assign letter grades based on numeric scores.

**Hints:**
- Use cascading `elif` conditions.
- Ensure ranges do not overlap.
- Handle invalid scores below zero or above 100.

**Steps:**
1. Ask for a numeric score between 0 and 100.
2. Validate the score is within valid range.
3. Assign A for 90 and above, B for 80 to 89, C for 70 to 79, D for 60 to 69, F for below 60.
4. Print the letter grade.
5. Add a message based on the grade level.

---

## PROJECT 14: Secure Vault (Q47 + Q49)

**Concept:** Multi-level password protection with nested conditions.

**Hints:**
- Use nested `if` statements for multiple security layers.
- Check password length before content.
- Use a secret code for admin override.

**Steps:**
1. Ask for a username and password.
2. Check if username exists in authorized list.
3. If yes, check if password matches.
4. If password matches, check if user has admin flag.
5. If admin, grant full access. If regular user, grant limited access.
6. Log all failed attempts.

---

## PROJECT 15: Number Validator (Q48 + Q50 + Q51)

**Concept:** Validate user input against multiple rules.

**Hints:**
- Use `and` for rules that must all pass.
- Use `or` for alternative acceptable values.
- Use chained comparisons for range checks.

**Steps:**
1. Ask the user for a number.
2. Check if it is between 1 and 100 inclusive.
3. Check if it is divisible by both 3 and 5.
4. Check if it is either even or a prime number under 20.
5. Print which conditions passed and which failed.

---

## PROJECT 16: Calendar Helper (Q52 + Q53)

**Concept:** Determine special dates and properties of years.

**Hints:**
- Use modulo for divisibility checks.
- Combine multiple conditions with parentheses.
- Create a menu for different checks.

**Steps:**
1. Ask the user for a year.
2. Check if it is a leap year using the full rule.
3. Check if the year number is divisible by 3 and 5.
4. Check if the century is divisible by 400.
5. Print all findings about that year.

---

## PROJECT 17: Text Validator (Q54 + Q55 + Q56 + Q57 + Q58 + Q59)

**Concept:** Analyze and validate text input for a registration form.

**Hints:**
- Use string methods like `.isalpha()`, `.isdigit()`, `.isupper()`, `.islower()`.
- Check for empty strings before other tests.
- Compare strings for exact matches.

**Steps:**
1. Ask for a username, password, and confirmation password.
2. Check username is not empty and contains only letters.
3. Check password is not empty and contains at least one uppercase, one lowercase, and one digit.
4. Check password matches confirmation.
5. Print which validations passed or failed.

---

## PROJECT 18: File Guard (Q60)

**Concept:** Protect operations by verifying file existence first.

**Hints:**
- Use `os.path.exists()` before file operations.
- Check if path is a file or directory.
- Provide helpful error messages.

**Steps:**
1. Ask the user for a filename.
2. Check if the file exists.
3. If yes, check if it is a regular file or directory.
4. If regular file, print its size and last modified time.
5. If it does not exist, offer to create it.
6. Handle permission errors gracefully.

---

## PROJECT 19: Multiplication Practice (Q61 + Q65)

**Concept:** Generate multiplication problems for practice.

**Hints:**
- Use `range()` to generate number sequences.
- Use nested loops for table generation.
- Track correct answers.

**Steps:**
1. Ask which multiplication table to practice.
2. Generate ten problems using a loop.
3. For each problem, show the question and get user answer.
4. Check if answer is correct.
5. Print score at the end.

---

## PROJECT 20: Number Aggregator (Q62 + Q76)

**Concept:** Calculate sums and averages for custom ranges.

**Hints:**
- Use accumulation variables in loops.
- Use `sum()` as a shortcut for verification.
- Calculate average by dividing sum by count.

**Steps:**
1. Ask user for start and end numbers.
2. Validate that start is less than end.
3. Calculate sum using a loop.
4. Verify with built-in `sum()` and `range()`.
5. Calculate and print average.
6. Also print count of even and odd numbers in range.

---

## PROJECT 21: Even Odd Separator (Q63 + Q64)

**Concept:** Split a range of numbers into even and odd lists.

**Hints:**
- Use modulo to test divisibility.
- Append to separate lists based on result.
- Use list comprehensions as an alternative.

**Steps:**
1. Ask for a range of numbers.
2. Loop through the range.
3. Add even numbers to one list, odd to another.
4. Print both lists with their counts.
5. Print the sum of each list.

---

## PROJECT 22: Countdown Timer (Q66 + Q67)

**Concept:** Create a countdown with user-defined start and interval.

**Hints:**
- Use `while` loop with decrement.
- Use `time.sleep()` for realistic delays.
- Handle invalid inputs.

**Steps:**
1. Ask user for countdown start number.
2. Validate it is a positive integer.
3. Count down to zero, printing each number.
4. Wait one second between each number.
5. Print a final message when reaching zero.
6. Ask if user wants another countdown.

---

## PROJECT 23: Search and Stop (Q68)

**Concept:** Search a list for a target value and stop when found.

**Hints:**
- Use `break` to exit loop early.
- Report the position where found.
- Handle case where target is not found.

**Steps:**
1. Create a list of twenty random numbers.
2. Ask user for a target number.
3. Loop through the list searching for the target.
4. If found, print position and break immediately.
5. If loop completes without finding, print not found.

---

## PROJECT 24: Skip the Multiples (Q69)

**Concept:** Process numbers but skip specific multiples.

**Hints:**
- Use `continue` to skip iterations.
- Combine multiple skip conditions.
- Track how many were skipped.

**Steps:**
1. Ask for a number range.
2. Loop through all numbers.
3. Skip multiples of 3.
4. Skip multiples of 5.
5. Print only numbers that pass both checks.
6. Print total skipped count at the end.

---

## PROJECT 25: Pattern Printer (Q70)

**Concept:** Print various patterns using nested loops.

**Hints:**
- Outer loop controls rows.
- Inner loop controls columns.
- Use print with `end` parameter for formatting.

**Steps:**
1. Ask user for pattern size.
2. Print a square of asterisks.
3. Print a right triangle of numbers.
4. Print a pyramid pattern.
5. Print a multiplication table grid.

---

## PROJECT 26: Gradebook Processor (Q71 + Q77)

**Concept:** Process student grades with indices and values.

**Hints:**
- Use `range(len())` when index is needed.
- Use direct iteration when only values matter.
- Calculate statistics per student.

**Steps:**
1. Create a list of student grade lists.
2. Print each student's grades with their position.
3. Calculate average for each student.
4. Find the highest grade in the class.
5. Find which student has the highest average.

---

## PROJECT 27: Character Analyzer (Q72)

**Concept:** Analyze frequency and types of characters in text.

**Hints:**
- Loop through string directly for characters.
- Use character methods for classification.
- Use a dictionary to count frequencies.

**Steps:**
1. Ask user for a sentence.
2. Count total characters.
3. Count vowels and consonants separately.
4. Count digits and special characters.
5. Print frequency of each character type.
6. Print the most frequent character.

---

## PROJECT 28: Reverse Everything (Q78)

**Concept:** Reverse lists, strings, and number sequences.

**Hints:**
- Use `range()` with negative step.
- Use slicing `[::-1]` as alternative.
- Apply to different data types.

**Steps:**
1. Create a list of numbers.
2. Print the list in reverse using a loop.
3. Create a string and print it in reverse.
4. Count down from 100 to 0 by fives.
5. Compare loop method versus slicing method.

---

## PROJECT 29: Step Counter (Q79)

**Concept:** Generate sequences with custom steps and analyze them.

**Hints:**
- Use `range(start, stop, step)`.
- Handle negative and positive steps.
- Calculate properties of the sequence.

**Steps:**
1. Ask for start, stop, and step values.
2. Validate step is not zero.
3. Generate and print the sequence.
4. Calculate sum, average, max, and min.
5. Count how many are even and odd.

---

## PROJECT 30: Menu-Driven Application (Q80 + Combined)

**Concept:** Build a complete menu system using all concepts.

**Hints:**
- Use `while True` for main loop.
- Use `break` to exit.
- Combine lists, dictionaries, loops, and conditionals.

**Steps:**
1. Display a menu with five options.
2. Option 1: Add item to a list.
3. Option 2: Remove item from list.
4. Option 3: Display list statistics.
5. Option 4: Search for an item.
6. Option 5: Exit the program.
7. Validate all menu choices.
8. Loop until user chooses exit.

---

# 📋 QUICK REFERENCE MAP

| Project | Topics Covered |
|---------|---------------|
| 1. Shopping List Manager | Q21, Q22, Q23, Q24, Q25, Q26 |
| 2. Classroom Roster | Q21, Q27, Q73 |
| 3. Top Scores Tracker | Q21, Q74, Q75, Q76 |
| 4. Coordinate Pairs | Q28, Q29 |
| 5. Student Profile Card | Q30, Q31, Q32 |
| 6. Country Capitals Quiz | Q30, Q33, Q34 |
| 7. Unique Visitor Log | Q35, Q36, Q37, Q38 |
| 8. Duplicate Remover Tool | Q39 |
| 9. Membership Checker | Q40 |
| 10. Inventory Manager | Q21–Q40 Combined |
| 11. Number Classifier | Q41, Q42, Q43 |
| 12. Smart Thermostat | Q44, Q45, Q48 |
| 13. Exam Grader | Q46 |
| 14. Secure Vault | Q47, Q49 |
| 15. Number Validator | Q48, Q50, Q51 |
| 16. Calendar Helper | Q52, Q53 |
| 17. Text Validator | Q54, Q55, Q56, Q57, Q58, Q59 |
| 18. File Guard | Q60 |
| 19. Multiplication Practice | Q61, Q65 |
| 20. Number Aggregator | Q62, Q76 |
| 21. Even Odd Separator | Q63, Q64 |
| 22. Countdown Timer | Q66, Q67 |
| 23. Search and Stop | Q68 |
| 24. Skip the Multiples | Q69 |
| 25. Pattern Printer | Q70 |
| 26. Gradebook Processor | Q71, Q77 |
| 27. Character Analyzer | Q72 |
| 28. Reverse Everything | Q78 |
| 29. Step Counter | Q79 |
| 30. Menu-Driven Application | Q80 + All Combined |

---

## 🎯 Mastery Checklist












































































































































































































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