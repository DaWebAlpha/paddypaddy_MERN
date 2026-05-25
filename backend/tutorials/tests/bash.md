
# Project 1 — Directory Creator

## Task

Write a script that:

* Creates a variable:

```bash
project="website"
```

* Checks whether the directory exists
* If it exists:

```text
Directory already exists
```

* Otherwise create it
* Move into the directory
* Print:

```text
You are now inside website
```

## Tips

Variable:

```bash
name="something"
```

Check directory:

```bash
[ -d "$name" ]
```

Create directory:

```bash
mkdir "$name"
```

Change directory:

```bash
cd "$name"
```

Print:

```bash
echo "message"
```

## Solution

```bash
#!/bin/bash

project="website"

if [ -d "$project" ]; then
    echo "Directory already exists."
else
    mkdir "$project"
    echo "Directory created."
fi

cd "$project" || exit

echo "You are now inside $project"
```

---

# Project 2 — Greeting System

## Task

Write a script that:

* Ask:

```text
Enter your name:
```

* Store the answer
* Print:

```text
Hello Kashi
```

## Tips

Read input:

```bash
read variable
```

Display variable:

```bash
echo "$variable"
```

## Solution

```bash
#!/bin/bash

echo "Enter your name:"
read name

echo "Hello $name"
```

---

# Project 3 — Age Checker

## Task

Write a script that:

* Ask for age
* If age ≥ 18:

```text
Adult
```

* Else:

```text
Minor
```

* Validate input so only numbers work

## Tips

Numeric operators:

```bash
-ge
-gt
-le
-lt
-eq
-ne
```

Regex number check:

```bash
[[ "$age" =~ ^[0-9]+$ ]]
```

## Solution

```bash
#!/bin/bash

echo "Enter your age:"
read age

if [[ "$age" =~ ^[0-9]+$ ]]; then

    if [ "$age" -ge 18 ]; then
        echo "Adult"
    else
        echo "Minor"
    fi

else
    echo "Please enter numbers only"
fi
```

---

# Project 4 — Student File Generator

## Task

Write a script that:

* Create folder:

```text
students
```

* Create:

```text
student1.txt
student2.txt
student3.txt
student4.txt
student5.txt
```

## Tips

Loop:

```bash
for i in {1..5}
do
    commands
done
```

Create files:

```bash
touch file$i.txt
```

## Solution

```bash
#!/bin/bash

mkdir -p students

cd students || exit

for i in {1..5}
do
    touch student$i.txt
done

echo "Files created successfully"
```

---

# Project 5 — Notes Writer

## Task

Write a script that:

* Create:

```text
notes.txt
```

* Add:

```text
Welcome
Bash is fun
Learning every day
```

* Display contents

## Tips

Overwrite:

```bash
>
```

Append:

```bash
>>
```

Display:

```bash
cat file.txt
```

## Solution

```bash
#!/bin/bash

echo "Welcome" > notes.txt
echo "Bash is fun" >> notes.txt
echo "Learning every day" >> notes.txt

cat notes.txt
```

---

# Project 6 — Student Registration System

## Task

Write a script that:

1. Create folder:

```text
records
```

2. Ask:

```text
Enter student name:
```

3. Create:

```text
John.txt
```

4. Ask:

```text
Enter age:
```

5. Save:

```text
Name: John
Age: 17
```

6. Display:

```text
Student registered successfully
```

## Tips

Create folder:

```bash
mkdir -p records
```

Read:

```bash
read name
```

Write:

```bash
echo "text" > file
```

Append:

```bash
echo "text" >> file
```

## Solution

```bash
#!/bin/bash

mkdir -p records

echo "Enter student name:"
read name

echo "Enter age:"
read age

file="records/$name.txt"

echo "Name: $name" > "$file"
echo "Age: $age" >> "$file"

echo "Student registered successfully"
```

---

# Project 7 — Project Scaffolder

## Task

Write a script that:

* Ask:

```text
Enter project name:
```

* Create project directory
* Move into it
* Create:

```text
README.md
index.html
style.css
script.js
```

* Print:

```text
Project setup complete
```

## Tips

Create many files:

```bash
touch file1 file2 file3
```

## Solution

```bash
#!/bin/bash

echo "Enter project name:"
read project

mkdir -p "$project"

cd "$project" || exit

touch README.md index.html style.css script.js

echo "Project setup complete"
```

---

Learning path after these:

```text
Variables
↓
Conditions
↓
User input
↓
Loops
↓
Files
↓
Functions
↓
Arguments ($1, $2)
↓
Arrays
↓
grep
↓
sed
↓
awk
↓
System automation
↓
Production Bash projects
```

Try solving them without opening the solutions first, then compare your version against the answer.
