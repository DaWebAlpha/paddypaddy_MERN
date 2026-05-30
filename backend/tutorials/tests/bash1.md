Here is the grep flags information without tables:

---

**-i** (ignore-case)
Case-insensitive matching. `grep -i "error"` matches ERROR, Error, error, ErRoR.

**-v** (invert-match)
Show lines that do NOT match. `grep -v "ERROR"` shows everything except lines containing ERROR.

**-c** (count)
Count matching lines only, returns a number. `grep -c "ERROR"` outputs `7`.

**-n** (line-number)
Show line numbers with each match. `grep -n "ERROR"` outputs something like `3:2026-05-26 10:17:12 ERROR Connection timeout...`

**-l** (files-with-matches)
Only print filenames that contain at least one match. `grep -l "error" *.txt` lists matching files.

**-L** (files-without-match)
Only print filenames that contain NO matches. `grep -L "error" *.txt` lists files without the pattern.

**-r** or **-R** (recursive)
Search directories recursively. `grep -r "error" /var/log/` searches all files under /var/log.

**-w** (word-regexp)
Match whole words only. `grep -w "error"` matches "error" but not "errors" or "errorHandler".

**-x** (line-regexp)
Match entire lines only. `grep -x "ERROR"` matches a line that is exactly "ERROR", not "ERROR: failed".

**-o** (only-matching)
Print only the matching part, not the whole line. `grep -o "ERROR.*"` prints just the error message portion.

**-A n** (after-context)
Show n lines after each match. `grep -A 2 "ERROR"` shows the matching line plus 2 lines below it.

**-B n** (before-context)
Show n lines before each match. `grep -B 1 "ERROR"` shows 1 line above plus the matching line.

**-C n** (context)
Show n lines before and after each match. `grep -C 2 "ERROR"` shows 2 lines above, the match, and 2 lines below.

**-E** (extended-regexp)
Use extended regular expressions. No need to escape `|`, `+`, `?`, `()`, `{}`. `grep -E "ERROR|WARNING"` matches either word.

**-F** (fixed-strings)
Treat pattern as a literal string, not a regex. `grep -F "a.b"` matches the exact string "a.b", not "a followed by any character followed by b".

**-e** (regexp)
Specify multiple patterns. `grep -e "ERROR" -e "FATAL"` matches lines with either ERROR or FATAL.

**-f** (file)
Read patterns from a file. `grep -f patterns.txt log.txt` where patterns.txt contains one pattern per line.

**-h** (no-filename)
Do not show the filename prefix when searching multiple files. `grep -h "error" *.txt` shows only matching lines.

**-H** (with-filename)
Always show the filename, even with only one file. `grep -H "error" file.txt` outputs `file.txt:matching line`.

**-s** (no-messages)
Suppress error messages about missing or unreadable files. `grep -s "error" missing.txt` stays silent.

**-q** (quiet or silent)
No output at all, just exit code. Exit code 0 means found, 1 means not found. `grep -q "error" log.txt && echo "found"` prints "found" only if the pattern exists.

**-m n** (max-count)
Stop reading after n matches. `grep -m 5 "ERROR"` finds the first 5 errors and stops.

**-b** (byte-offset)
Show the byte offset of each match within the file. `grep -b "ERROR"` outputs something like `128:2026-05-26 10:17:12 ERROR...`

**--color**
Highlight matching text in color. `grep --color "ERROR"` makes ERROR appear in red (or your terminal's highlight color).

---

## Combining Flags Examples

Case-insensitive, show line numbers, 2 lines of context:
`grep -inC 2 "error" log.txt`

Count warnings and errors together using extended regex:
`grep -cE "ERROR|WARNING" log.txt`

Recursive search, only filenames, case-insensitive:
`grep -ril "error" /var/log/`

Quiet check in a script:
`if grep -q "FATAL" log.txt; then echo "Critical errors found!"; fi`

---

## Quick Reference by Task

Find something regardless of case: use `-i`

Count occurrences: use `-c`

See line numbers: use `-n`

See surrounding lines: use `-A`, `-B`, or `-C`

Exclude matching lines: use `-v`

Search folders recursively: use `-r`

Match exact word only: use `-w`

Use complex patterns with `|` or `+`: use `-E`

Check silently in scripts: use `-q`

Search multiple terms: use `-e` or `-E` with `\|`

---

## Regular Expression Basics with grep

`.` matches any single character

`*` matches zero or more of the preceding character

`+` matches one or more (requires `-E`)

`?` matches zero or one (requires `-E`)

`^` anchors to start of line

`$` anchors to end of line

`[abc]` matches any character in the set

`[^abc]` matches any character NOT in the set

`\(a\|b\)` matches a or b (basic regex, needs escaping)

`(a|b)` matches a or b (extended regex with `-E`)

---

## Example grep Commands

Find all lines starting with ERROR:
`grep "^ERROR" log.txt`

Find all lines ending with a number:
`grep "[0-9]$" log.txt`

Find lines with IP addresses:
`grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" log.txt`

Find empty lines:
`grep "^$" log.txt`

Find lines with exactly 3 digits:
`grep -E "^[0-9]{3}$" log.txt`

---

# 🔥 BASH MASTER SERIES — 200 HARD QUESTIONS

## PART 1 (Q1–Q50)

---

# 🔹 FILE SYSTEM & VALIDATION (Q1–Q10)

---

## Q1. Check if a file exists and is not empty

**Task:**
Write a script that checks if `data.txt` exists and is not empty.

**Hint:**
Use `-f` and `-s`

**Master Guide:**
Always validate files before processing.

**Code Idea:**

```bash
file="data.txt"

if [ -f "$file" ] && [ -s "$file" ]; then
  echo "File exists and is not empty"
else
  echo "Invalid file"
fi
```

**Explanation:**
- `file="data.txt"`: Sets the variable `file` to the target filename.
- `[ -f "$file" ]`: This condition checks if the file exists and is a regular file (not a directory or device).
- `[ -s "$file" ]`: This condition checks if the file size is greater than zero (not empty).
- `&&`: This is a logical AND operator. Both conditions must be true for the block to execute.
- If both checks pass, it prints "File exists and is not empty". Otherwise, it prints "Invalid file".

---

## Q2. Create a file if it does not exist

**Task:**
Create `log.txt` only if it does not exist.

**Hint:**
Use `-f`

**Master Guide:**
Avoid overwriting existing data.

**Code Idea:**

```bash
file="log.txt"

if [ ! -f "$file" ]; then
  echo "Created at $(date)" > "$file"
fi
```

**Explanation:**
- `[ ! -f "$file" ]`: The `!` negates the condition. So this reads: "If it is NOT true that the file exists..."
- `echo "Created at $(date)" > "$file"`: If the file is missing, this command writes a timestamp into a new file named `log.txt`. The single `>` operator creates the file (or overwrites if it existed, but the `if` statement prevents overwriting).

---

## Q3. Backup all .txt files

**Task:**
Copy all `.txt` files into backup folder.

**Hint:**
Use wildcard.

**Master Guide:**
Batch operations improve automation.

**Code Idea:**

```bash
mkdir -p backup
cp *.txt backup/
```

**Explanation:**
- `mkdir -p backup`: Creates a directory named `backup`. The `-p` flag ensures no error is thrown if the directory already exists and creates parent directories if needed.
- `cp *.txt backup/`: The `*` is a wildcard that matches any character string ending in `.txt`. `cp` copies all matched files into the `backup/` directory.

---

## Q4. Safe delete confirmation

**Task:**
Ask user before deleting file.

**Code Idea:**

```bash
read -p "File name: " file
read -p "Delete? (yes/no): " ans

if [ "$ans" = "yes" ]; then
  rm "$file"
fi



OR


#!/bin/bash



while true; do
        read -p "Enter file to delete: " filename

        if [[ "$filename" == "q" ]] || [[ "$filename" == "quit" ]]; then
                echo "Exiting ....."
                exit 0
        fi

        if [[ -z "$filename" ]]; then
                echo "Input cannot be empty"
                echo ""
                continue
        fi


        if [[ ! -f "$filename" ]]; then
                echo "File $filename does not exist"
                echo ""
                continue
        fi


        break
done


rm "$filename"
echo "$filename has been deleted"
```

**Explanation:**
- `read -p "File name: " file`: Prompts the user to type a filename and stores the input in the variable `$file`.
- `read -p "Delete? (yes/no): " ans`: Prompts the user for confirmation and stores the input in `$ans`.
- `if [ "$ans" = "yes" ]`: Checks if the user typed exactly "yes".
- `rm "$file"`: If the condition is true, the `rm` command removes the specified file.

---

## Q5. Count error lines

**Code Idea:**

```bash
grep -c "error" log.txt
```

TEXT O TEXT ON

2026-05-28 10:00:01 INFO: Server started successfully
2026-05-28 10:00:05 ERROR: Connection failed to database
2026-05-28 10:00:10 error: retrying connection attempt 1
2026-05-28 10:00:15 ERROR: Database timeout after 30s
2026-05-28 10:00:20 INFO: Retry successful
2026-05-28 10:00:25 MyError: custom exception thrown
2026-05-28 10:00:30 error_handler function called
2026-05-28 10:00:35 ERROR: Critical system failure
2026-05-28 10:00:40 WARNING: High memory usage detected
2026-05-28 10:00:45 errors found in batch processing
2026-05-28 10:00:50 INFO: Job completed
2026-05-28 10:00:55 DEBUG: Cleaning up temp files


EXAMPLE OF A log.txt
**Explanation:**
- `grep`: A command used for searching text.
- `-c`: This flag tells grep to count the number of matching lines instead of printing the lines themselves.
- `"error"`: The pattern to search for.
- `log.txt`: The file to search within. The output is simply a number representing how many lines contain "error".

---

## Q6. File size check (>1MB)

**Code Idea:**

```bash
file="data.txt"
size=$(stat -c%s "$file")

if (( size > 1048576 )); then
  echo "Large file"
fi
```

**Explanation:**
- `stat -c%s "$file"`: The `stat` command displays file status. `-c%s` formats the output to show only the file size in bytes.
- `size=$(...)`: This captures the output of the stat command into the variable `size`.
- `(( size > 1048576 ))`: This is an arithmetic comparison. 1048576 bytes equals 1 Megabyte (1024 * 1024). If the file size exceeds this number, it prints "Large file".

---

## Q7. List directories only

**Code Idea:**

```bash
for d in */; do
  echo "$d"
done
```

**Explanation:**
- `for d in */; do`: The pattern `*/` matches only directories in the current location (the trailing slash is specific to directories).
- `echo "$d"`: Prints the name of each directory found.
- `done`: Marks the end of the loop.

---

## Q8. Find empty files

**Code Idea:**

```bash
find . -type f -empty
```

**Explanation:**
- `find .`: Starts a search in the current directory (`.`).
- `-type f`: Restricts the search to only files (ignoring directories).
- `-empty`: Matches files that have zero bytes in size.

---

## Q9. Delete all logs

**Code Idea:**

```bash
rm -f *.log
```

**Explanation:**
- `rm`: The remove command.
- `-f`: Stands for "force". It ignores nonexistent files and arguments and never prompts for confirmation.
- `*.log`: Matches every file in the current directory ending with the `.log` extension.

---

## Q10. Rename files with prefix

**Code Idea:**

```bash
for f in *.txt; do
  mv "$f" "new_$f"
done
```

**Explanation:**
- `for f in *.txt; do`: Loops through every file ending in `.txt`.
- `mv "$f" "new_$f"`: Renames (moves) the file. The new name concatenates the string "new_" with the original filename (`$f`). For example, `file.txt` becomes `new_file.txt`.

---

# 🔹 INPUT VALIDATION (Q11–Q20)

---

## Q11. Check empty input

**Code Idea:**

```bash
read input

if [ -z "$input" ]; then
  echo "Empty input"
fi
```

**Explanation:**
- `read input`: Pauses the script to wait for user input and stores it in the variable `input`.
- `[ -z "$input" ]`: The `-z` flag checks if the length of the string is zero (empty).
- If the user pressed Enter without typing anything, it prints "Empty input".

---

## Q12. Password check

**Code Idea:**

```bash
read -s pass

if [ "$pass" = "1234" ]; then
  echo "Access granted"
fi
```

**Explanation:**
- `read -s pass`: The `-s` flag stands for "silent" (secure). It prevents the password from being displayed on the screen as the user types.
- `[ "$pass" = "1234" ]`: Compares the input stored in `$pass` against the string "1234".
- If they match, it prints "Access granted".

---

## Q13. Numeric validation

**Code Idea:**

```bash
read n

if [[ "$n" =~ ^[0-9]+$ ]]; then
  echo "Valid number"
fi
```

**Explanation:**
- `[[ ... ]]`: This is an extended test command in Bash which supports regular expressions.
- `=~`: The regex match operator.
- `^[0-9]+$`: This regex means "start of string (`^`), followed by one or more digits (`[0-9]+`), followed by end of string (`$`)". It ensures the input contains only numbers.

---

## Q14. Range check (1–100)

**Code Idea:**

```bash
read n

if (( n >= 1 && n <= 100 )); then
  echo "Valid range"
fi
```

**Explanation:**
- `(( ... ))`: This denotes an arithmetic context in Bash.
- `n >= 1 && n <= 100`: Checks if the number `n` is greater than or equal to 1 AND less than or equal to 100.
- If the number falls within this range, it prints "Valid range".

---

## Q15. Loop until valid input

**Code Idea:**

```bash
while true; do
  read n
  [[ "$n" =~ ^[0-9]+$ ]] && break
done
```

**Explanation:**
- `while true; do`: Creates an infinite loop.
- `read n`: Asks for input repeatedly inside the loop.
- `[[ "$n" =~ ^[0-9]+$ ]]`: Checks if input is numeric (regex).
- `&& break`: If the regex matches (input is valid), the `break` command executes, stopping the loop. If not, the loop repeats.

---

## Q16. Confirm action

**Code Idea:**

```bash
read -p "Continue? (y/n): " ans
[[ "$ans" == "y" ]] && echo "Proceed"
```

**Explanation:**
- `read -p`: Prompts the user with a question inline.
- `[[ "$ans" == "y" ]]`: Checks if the answer is strictly "y".
- `&&`: A logical AND operator used here for a shorthand `if` statement. If the condition is true, `echo "Proceed"` runs.

---

## Q17. Two number validation

**Code Idea:**

```bash
read a b

if [[ "$a" =~ ^[0-9]+$ && "$b" =~ ^[0-9]+$ ]]; then
  echo "Valid"
fi
```

**Explanation:**
- `read a b`: Reads two words from the user input, assigning the first to `a` and the second to `b`.
- The `if` statement checks if *both* variables match the numeric regex `^[0-9]+$`.
- Only if both inputs are numbers does it print "Valid".

---

## Q18. Default value

**Code Idea:**

```bash
read name
name=${name:-Guest}
echo $name
```

**Explanation:**
- `read name`: Accepts user input.
- `${name:-Guest}`: This is parameter expansion. It means: "If `name` is unset or null, use the default value 'Guest' instead."
- If the user presses Enter without typing, `$name` becomes "Guest".

---

## Q19. Hidden password input

**Code Idea:**

```bash
read -s password
echo "Saved"
```

**Explanation:**
- `read -s password`: Takes user input silently (characters are not displayed on screen), which is standard for password entry.
- `echo "Saved"`: Confirms the action to the user after input is complete.

---

## Q20. Username validation

**Code Idea:**

```bash
read user

if [ -n "$user" ]; then
  echo "Valid user"
fi
```

**Explanation:**
- `[ -n "$user" ]`: The `-n` flag checks if the length of the string is non-zero.
- This ensures the user actually typed something (the username is not empty).

---

# 🔹 LOOPS (Q21–Q30)

---

## Q21. Print even numbers

**Code Idea:**

```bash
for i in {1..20}; do
  (( i % 2 == 0 )) && echo $i
done
```

**Explanation:**
- `{1..20}`: Generates a sequence of numbers from 1 to 20.
- `(( i % 2 == 0 ))`: The modulo operator `%` returns the remainder of division by 2. If the remainder is 0, the number is even.
- `&& echo $i`: If the condition is true, the number is printed.

---

## Q22. Sum numbers 1–10

**Code Idea:**

```bash
sum=0
for i in {1..10}; do
  sum=$((sum + i))
done
echo $sum
```

**Explanation:**
- `sum=0`: Initializes the accumulator variable.
- `sum=$((sum + i))`: Adds the current value of `i` to the existing `sum`. `$((...))` is used for arithmetic expansion.
- The loop runs 10 times, adding 1, then 2, etc., to `sum`.
- Finally, the total `sum` (55) is printed.

---

## Q23. Count file lines

**Code Idea:**

```bash
count=0
while read line; do
  ((count++))
done < file.txt

echo $count
```

**Explanation:**
- `done < file.txt`: Redirects the content of `file.txt` into the loop.
- `while read line`: Reads the file one line at a time.
- `((count++))`: Increments the counter variable by 1 for every line read.
- This effectively counts the total lines in the file manually.

---

## Q24. Countdown

**Code Idea:**

```bash
for i in {10..1}; do
  echo $i
  sleep 1
done
```

**Explanation:**
- `{10..1}`: Creates a range counting backwards from 10 to 1.
- `echo $i`: Displays the current number.
- `sleep 1`: Pauses the script execution for 1 second between each number.

---

## Q25. Infinite loop

**Code Idea:**

```bash
while true; do
  date
  sleep 2
done
```

**Explanation:**
- `while true; do`: The condition is always `true`, so this loop runs forever until manually stopped (Ctrl+C).
- `date`: Prints the current date and time.
- `sleep 2`: Waits 2 seconds before repeating.

---

## Q26. Loop arguments

**Code Idea:**

```bash
for arg in "$@"; do
  echo $arg
done
```

**Explanation:**
- `"$@"`: A special variable that holds all command-line arguments passed to the script.
- The loop iterates through each argument one by one and prints it.

---

## Q27. Process files

**Code Idea:**

```bash
for f in *.txt; do
  echo "Processing $f"
done
```

**Explanation:**
- `for f in *.txt`: Iterates over every file ending in `.txt` in the current directory.
- `echo "Processing $f"`: Simulates an action on the file by printing its name.

---

## Q28. Find max

**Code Idea:**

```bash
max=0
for i in 3 7 2 9; do
  (( i > max )) && max=$i
done
echo $max
```

**Explanation:**
- `max=0`: Starts the maximum value assumption at 0.
- `for i in 3 7 2 9`: Loops through this specific list of numbers.
- `(( i > max )) && max=$i`: If the current number `i` is greater than the stored `max`, update `max` to equal `i`.
- Result: It eventually finds and prints 9.

---

## Q29. Skip iteration

**Code Idea:**

```bash
for i in {1..10}; do
  [[ $i == 5 ]] && continue
  echo $i
done
```

**Explanation:**
- `[[ $i == 5 ]]`: Checks if `i` is equal to 5.
- `continue`: When this command runs, it stops the current iteration immediately and jumps to the next iteration of the loop.
- Therefore, "5" is never printed, but the loop continues with 6, 7, etc.

---

## Q30. Break loop

**Code Idea:**

```bash
for i in {1..10}; do
  [[ $i == 6 ]] && break
  echo $i
done
```

**Explanation:**
- `[[ $i == 6 ]]`: Checks if `i` is 6.
- `break`: This command terminates the loop entirely.
- The numbers 1 through 5 print. When `i` becomes 6, the loop stops immediately, and no further numbers are processed.

---

# 🔹 FUNCTIONS (Q31–Q40)

---

## Q31. Simple function

**Code Idea:**

```bash
hello() {
  echo "Hello"
}
hello
```

**Explanation:**
- `hello() { ... }`: Defines a function named `hello`.
- `echo "Hello"`: The body of the function contains the code to run.
- `hello`: This line "calls" or executes the function.

---

## Q32. Function with args

**Code Idea:**

```bash
greet() {
  echo "Hi $1"
}
greet Kwame
```

**Explanation:**
- `greet()`: Defines the function.
- `$1`: Inside a function, `$1` refers to the first argument passed to that specific function.
- `greet Kwame`: Calls the function and passes "Kwame" as the first argument. The output is "Hi Kwame".

---

## Q33. Add function

**Code Idea:**

```bash
add() {
  echo $(( $1 + $2 ))
}
```

**Explanation:**
- `add()`: Defines a function to perform addition.
- `$(( $1 + $2 ))`: Performs arithmetic on the first and second arguments passed to the function.
- `echo`: Prints the result. (Note: To use this, you would call it like `add 5 3`).

---

## Q34. File check function

**Code Idea:**

```bash
exists() {
  [ -f "$1" ] && echo "Exists"
}
```

**Explanation:**
- `exists()`: Defines a utility function to check file existence.
- `[ -f "$1" ]`: Tests if the first argument provided is a valid file.
- `&& echo "Exists"`: If the test passes, it prints "Exists".

---

## Q35. Logging function

**Code Idea:**

```bash
log() {
  echo "[$(date)] $1"
}
```

**Explanation:**
- `log()`: A function designed to format log messages.
- `[$(date)]`: Captures the current date/time and wraps it in brackets.
- `$1`: Appends the message passed as the first argument.
- Example usage: `log "System starting"` results in `[Mon Oct 30 ...] System starting`.

---

## Q36. Loop in function

**Code Idea:**

```bash
print() {
  for i in {1..3}; do echo $i; done
}
```

**Explanation:**
- `print()`: Defines a function containing a loop.
- The logic inside is a standard `for` loop printing 1, 2, and 3.
- Calling `print` executes the entire loop sequence.

---

## Q37. Nested function

**Code Idea:**

```bash
a() { echo "A"; }
b() { a; echo "B"; }
b
```

**Explanation:**
- `a()`: Defines a helper function that prints "A".
- `b()`: Defines a second function that calls `a` first, then prints "B".
- When `b` is called, it runs `a` (printing "A"), then runs its own print command (printing "B").

---

## Q38. Calculator function

**Code Idea:**

```bash
calc() {
  echo $(( $1 + $2 ))
}
```

**Explanation:**
- Similar to Q33, this creates a reusable calculator component.
- It takes two numbers as arguments (`$1`, `$2`), adds them, and outputs the result.

---

## Q39. Exit function

**Code Idea:**

```bash
fail() {
  echo "Error"
  exit 1
}
```

**Explanation:**
- `fail()`: A function designed to handle fatal errors.
- `echo "Error"`: Informs the user of the failure.
- `exit 1`: Terminates the entire script immediately with a status code of 1 (standard convention for an error).

---

## Q40. Multi function system

**Code Idea:**

```bash
start() { echo "Start"; }
stop() { echo "Stop"; }

start
stop
```

**Explanation:**
- Defines two separate functions, `start` and `stop`.
- The script calls them sequentially: `start` runs first, then `stop` runs. This mimics a basic service control structure.

---

# 🔹 SYSTEM TOOLS (Q41–Q50)

---

## Q41. Process check

**Code Idea:**

```bash
ps aux | grep bash
```

**Explanation:**
- `ps`: Reports a snapshot of current processes.
- `aux`: `a` shows processes for all users, `u` displays the process's user/owner, `x` shows processes not attached to a terminal.
- `| grep bash`: Filters the output to show only lines containing the word "bash".

---

## Q42. Disk usage

**Code Idea:**

```bash
df -h
```

**Explanation:**
- `df`: "Disk Free" – reports file system disk space usage.
- `-h`: "Human-readable" – prints sizes in powers of 1024 (e.g., 12G, 500M) instead of raw blocks.

---

## Q43. Memory usage

**Code Idea:**

```bash
free -m
```

**Explanation:**
- `free`: Displays the total amount of free and used physical and swap memory.
- `-m`: Shows the output in megabytes (MiB).

---

## Q44. Internet check

**Code Idea:**

```bash
ping -c 1 google.com
```

**Explanation:**
- `ping`: Sends ICMP ECHO_REQUEST packets to network hosts.
- `-c 1`: Limits the count to 1 packet. Without this, `ping` runs indefinitely.
- Useful in scripts to check if the machine has an active internet connection.

---

## Q45. Sort file

**Code Idea:**

```bash
sort file.txt
```

**Explanation:**
- `sort`: Writes sorted concatenation of files to standard output.
- It reads `file.txt` and prints all lines in alphabetical/numerical order.

---

## Q46. Unique values

**Code Idea:**

```bash
sort file.txt | uniq
```

**Explanation:**
- `sort file.txt`: Sorts the file first (required for `uniq` to work correctly on adjacent lines).
- `uniq`: Filters out repeated lines that are adjacent.
- Combined, this prints the file content with duplicates removed.

---

## Q47. Word count

**Code Idea:**

```bash
wc -w file.txt
```

**Explanation:**
- `wc`: "Word Count".
- `-w`: Instructs `wc` to count only words (newline counts as a word delimiter).
- It prints the total number of words in the file.

---

## Q48. First lines

**Code Idea:**

```bash
head -n 5 file.txt
```

**Explanation:**
- `head`: Outputs the first part of files.
- `-n 5`: Specifies the number of lines to display (5 lines).
- Useful for previewing the top of a large log file.

---

## Q49. Live monitoring

**Code Idea:**

```bash
tail -f file.txt
```

**Explanation:**
- `tail`: Outputs the last part of files.
- `-f`: "Follow" mode. As the file grows, `tail` appends new data to the output in real-time.
- Standard tool for watching active log files.

---

## Q50. System summary

**Code Idea:**

```bash
uptime
free -m
df -h
```

**Explanation:**
- `uptime`: Shows how long the system has been running and the load average.
- `free -m`: Shows memory usage.
- `df -h`: Shows disk space.
- Running these three commands sequentially provides a quick health snapshot of the server.

---

# ✔ PART 1 COMPLETE (Q1–Q50)

---









































































































































Here are 20 Bash projects mapped to your Q1–Q50 Bash Master Series, with hints and step-by-step guides (no code solutions).

---

# ⚡ 20 BASH PROJECTS FOR Q1–Q50 MASTERY

---

## PROJECT 1: File Guardian (Q1 + Q2)

**Concept:** A script that checks if critical files exist and creates them with default content if missing.

**Hints:**
- Use `-f` to check file existence.
- Use `-s` to verify the file is not empty.
- Use `>` to create and write default content.

**Steps:**
1. Define a list of three critical files your application needs.
2. Loop through each file name.
3. Check if the file exists and is not empty.
4. If missing or empty, create it and write a timestamped header line.
5. Print a status message for each file checked.

---

## PROJECT 2: Smart Backup Tool (Q3 + Q10)

**Concept:** Backup files with a timestamp and prefix, then verify the backup.

**Hints:**
- Use wildcards `*` to select files.
- Use `mkdir -p` to ensure the backup directory exists.
- Use a loop with `mv` and string concatenation for renaming.

**Steps:**
1. Ask the user for a file extension to backup (like txt or log).
2. Create a backup directory named with today's date.
3. Find all matching files in the current directory.
4. Copy each file into the backup directory with a "bak_" prefix.
5. List the backup directory to confirm success.

---

## PROJECT 3: Safe File Remover (Q4 + Q11 + Q16)

**Concept:** Delete files only after multiple confirmations and validations.

**Hints:**
- Use `read` with prompts.
- Use `-z` to check for empty input.
- Use string comparison for yes/no validation.

**Steps:**
1. Prompt for a filename.
2. Validate the input is not empty.
3. Check if the file actually exists.
4. Ask for confirmation with a yes/no prompt.
5. If confirmed, delete the file and print success.
6. If not confirmed, print cancellation and exit cleanly.

---

## PROJECT 4: Log Analyzer Dashboard (Q5 + Q41 + Q45 + Q46 + Q47 + Q48 + Q49)

**Concept:** Analyze a log file and display a summary dashboard.

**Hints:**
- Use `grep -c` to count occurrences.
- Use `sort` and `uniq` to find unique entries.
- Use `wc` for counting lines and words.
- Use `head` and `tail` for previews.

**Steps:**
1. Accept a log filename as an argument.
2. Check if the file exists.
3. Count total lines, words, and bytes.
4. Count how many lines contain "ERROR", "WARNING", and "INFO".
5. Show the first 5 and last 5 lines.
6. Extract and list all unique IP addresses or timestamps.
7. Display everything in a formatted summary.

---

## PROJECT 5: Storage Monitor (Q6 + Q42 + Q43)

**Concept:** Monitor disk and file sizes, alert if thresholds are exceeded.

**Hints:**
- Use `stat -c%s` to get file size in bytes.
- Use `df -h` for disk usage.
- Use arithmetic comparison for threshold checks.

**Steps:**
1. Define a size threshold in bytes (like 1MB).
2. Check a specific file's size.
3. If it exceeds the threshold, print a warning.
4. Check overall disk usage with `df`.
5. If disk usage is above 90%, print a critical alert.
6. Check memory usage with `free`.
7. Log all findings to a status file.

---

## PROJECT 6: Directory Inspector (Q7 + Q8)

**Concept:** Scan a directory and report on its contents.

**Hints:**
- Use `*/` pattern to match only directories.
- Use `find` with `-type f -empty` for empty files.
- Use loops to process findings.

**Steps:**
1. Ask the user for a target directory.
2. Validate the directory exists.
3. Count and list all subdirectories.
4. Find and list all empty files.
5. Count files by extension (how many .txt, .log, .py).
6. Print a formatted report.

---

## PROJECT 7: Log Cleaner (Q9 + Q3)

**Concept:** Safely clean up old log files after confirmation.

**Hints:**
- Use `rm -f` for force removal.
- Use wildcards to target log files.
- Use backup logic before deletion.

**Steps:**
1. Find all `.log` files in a directory.
2. Show the user which files will be deleted.
3. Ask for confirmation.
4. If confirmed, backup the logs first to a timestamped folder.
5. Delete the original log files.
6. Report how many files were removed and where backups are stored.

---

## PROJECT 8: Batch Renamer (Q10)

**Concept:** Rename multiple files with custom prefixes, suffixes, or numbering.

**Hints:**
- Use a `for` loop with wildcards.
- Use string concatenation for new names.
- Use `mv` for renaming.

**Steps:**
1. Ask the user for a file pattern (like *.jpg).
2. Ask for a prefix to add.
3. Loop through matching files.
4. Construct a new name with the prefix.
5. Rename each file and print old name vs new name.
6. Handle edge cases like duplicate names.

---

## PROJECT 9: Input Validator Tool (Q11 + Q13 + Q14 + Q15 + Q17 + Q18 + Q20)

**Concept:** A reusable validation module for user inputs.

**Hints:**
- Use `-z` for empty checks.
- Use regex with `=~` for numeric validation.
- Use parameter expansion `${var:-default}` for defaults.
- Use arithmetic context for range checks.

**Steps:**
1. Create a function that validates if input is not empty.
2. Create a function that validates if input is numeric.
3. Create a function that validates if a number is within a range.
4. Create a function that provides a default value if input is empty.
5. Test all functions with various inputs.
6. Combine them into a single validation pipeline.

---

## PROJECT 10: Secure Login Prompt (Q12 + Q19)

**Concept:** A multi-attempt login system with hidden password entry.

**Hints:**
- Use `read -s` for silent password input.
- Use a loop for multiple attempts.
- Use string comparison for password checking.

**Steps:**
1. Set a hardcoded correct password.
2. Allow the user 3 attempts.
3. Each attempt prompts for password silently.
4. If correct, grant access and exit.
5. If wrong, decrement attempts and warn.
6. After 3 failures, lock out and exit with error code.

---

## PROJECT 11: Number Processor (Q14 + Q15 + Q21 + Q22 + Q28)

**Concept:** Process a list of numbers with various operations.

**Hints:**
- Use loops for iteration.
- Use arithmetic context for calculations.
- Use conditionals for filtering.

**Steps:**
1. Accept a space-separated list of numbers as input.
2. Validate that all inputs are numeric.
3. Calculate and print the sum.
4. Calculate and print the average.
5. Find and print the maximum and minimum.
6. Print all even numbers from the list.
7. Print all numbers within a user-defined range.

---

## PROJECT 12: File Line Counter (Q23)

**Concept:** Count lines, words, and characters across multiple files.

**Hints:**
- Use `while read` loops for manual counting.
- Use `wc` as a comparison.
- Use redirection `<` to feed files into loops.

**Steps:**
1. Accept multiple filenames as arguments.
2. For each file, check if it exists.
3. Count lines manually using a while loop.
4. Count words manually by splitting lines.
5. Compare your manual counts with `wc` output.
6. Print a formatted table of results.

---

## PROJECT 13: Timer and Alarm (Q24 + Q25)

**Concept:** A countdown timer with optional alarm message.

**Hints:**
- Use `sleep` for delays.
- Use `date` for timestamps.
- Use infinite loops with break conditions.

**Steps:**
1. Ask the user for a countdown duration in seconds.
2. Validate the input is a positive number.
3. Loop from the duration down to zero.
4. Print the remaining time each second.
5. At zero, print a completion message.
6. Optionally loop to allow multiple timers.

---

## PROJECT 14: Argument Processor (Q26 + Q30)

**Concept:** A script that processes command-line arguments flexibly.

**Hints:**
- Use `"$@"` to access all arguments.
- Use loops to iterate through them.
- Use functions to handle different argument types.

**Steps:**
1. Print the total number of arguments received.
2. Print each argument with its position number.
3. Identify which arguments are filenames (check if they exist).
4. Identify which arguments are numeric.
5. Print a categorized summary.

---

## PROJECT 15: File Batch Processor (Q27)

**Concept:** Process all files of a specific type with a custom action.

**Hints:**
- Use `for` loops with wildcards.
- Use file tests to validate each file.
- Use functions to encapsulate the processing logic.

**Steps:**
1. Ask the user for a file extension to process.
2. Find all matching files in the current directory.
3. For each file, print its name and size.
4. Create a summary report listing all processed files.
5. Count the total number of files and total size.

---

## PROJECT 16: Smart Skipper (Q29 + Q30)

**Concept:** Process a range of numbers with custom skip and stop rules.

**Hints:**
- Use `continue` to skip iterations.
- Use `break` to stop early.
- Use conditional logic for rules.

**Steps:**
1. Define a range of numbers (like 1 to 50).
2. Skip all multiples of 3 (use continue).
3. Stop completely when reaching a multiple of 7 (use break).
4. Print each number that is processed.
5. Print a summary of how many were skipped and why the loop ended.

---

## PROJECT 17: Calculator Suite (Q31 + Q32 + Q33 + Q38)

**Concept:** A modular calculator with multiple operations.

**Hints:**
- Define separate functions for each operation.
- Pass arguments to functions.
- Return results using echo.

**Steps:**
1. Create functions for add, subtract, multiply, divide.
2. Each function takes two arguments and prints the result.
3. Create a menu system to let the user choose an operation.
4. Validate that inputs are numeric before calculation.
5. Handle division by zero with an error message.
6. Loop to allow multiple calculations.

---

## PROJECT 18: File Checker Utility (Q34 + Q35 + Q39)

**Concept:** A reusable utility for checking files and logging results.

**Hints:**
- Use functions with file path arguments.
- Use `date` for timestamps in logs.
- Use `exit` for error handling.

**Steps:**
1. Create a function that checks if a file exists.
2. Create a function that checks if a file is readable.
3. Create a function that checks if a file is writable.
4. Create a logging function that timestamps messages.
5. Test all functions on various files.
6. If any check fails, log the error and exit with code 1.

---

## PROJECT 19: Service Controller (Q36 + Q37 + Q40)

**Concept:** A simple service controller with start, stop, and status commands.

**Hints:**
- Use nested functions.
- Use sequential function calls.
- Use status checks between operations.

**Steps:**
1. Create a start function that prints "Starting service..." and simulates a delay.
2. Create a stop function that prints "Stopping service..." and simulates a delay.
3. Create a status function that checks if a PID file exists.
4. Create a main controller that accepts commands: start, stop, restart, status.
5. For restart, call stop then start.
6. Validate commands and print usage for invalid ones.

---

## PROJECT 20: System Health Reporter (Q41 + Q42 + Q43 + Q44 + Q50)

**Concept:** A comprehensive system health check that generates a report.

**Hints:**
- Combine multiple system commands.
- Use functions for each check category.
- Redirect output to a report file.

**Steps:**
1. Check running processes for a specific service name using `ps`.
2. Check disk usage with `df` and flag any partition over 80%.
3. Check memory usage with `free`.
4. Check internet connectivity with `ping`.
5. Check system uptime.
6. Compile all results into a formatted report.
7. Save the report to a file with a timestamp in the filename.
8. Print a summary to the screen.

































# 💪 BASH MASTER SERIES — 200 HARD QUESTIONS

## PART 2 (Q51–Q100)

---

# 🔹 CONDITIONAL STATEMENTS (Q51–Q70)

---

## Q51. Check if number is positive

**Task:**
Write a script that checks if a number is positive.

**Hint:**
Use `(( ))` comparison.

**Master Guide:**
Conditions control program flow.

**Code Idea:**

```bash
read n

if (( n > 0 )); then
  echo "Positive number"
fi
```

**Explanation:**
- `read n`: Accepts user input and stores it in variable `n`.
- `(( n > 0 ))`: Uses arithmetic evaluation to check if `n` is greater than zero.
- If the condition is true, it prints "Positive number". No action is taken for zero or negative numbers.

---

## Q52. Check if number is negative

**Code Idea:**

```bash
read n

if (( n < 0 )); then
  echo "Negative number"
fi
```

**Explanation:**
- `(( n < 0 ))`: Checks if the number is strictly less than zero.
- This logic identifies negative integers.

---

## Q53. Check even or odd

**Code Idea:**

```bash
read n

if (( n % 2 == 0 )); then
  echo "Even"
else
  echo "Odd"
fi
```

**Explanation:**
- `n % 2`: The modulo operator calculates the remainder when `n` is divided by 2.
- If the remainder is 0, the number is Even. Otherwise, it flows to the `else` block and prints "Odd".

---

## Q54. Compare two numbers

**Code Idea:**

```bash
read a b

if (( a > b )); then
  echo "A is greater"
elif (( a < b )); then
  echo "B is greater"
else
  echo "Equal"
fi
```

**Explanation:**
- `read a b`: Reads two inputs simultaneously.
- `elif`: Stands for "else if". It checks a second condition if the first one fails.
- The logic covers three possibilities: A is larger, B is larger, or they are equal.

---

## Q55. Check if file exists

**Code Idea:**

```bash
read file

if [ -f "$file" ]; then
  echo "File exists"
fi
```

**Explanation:**
- `[ -f "$file" ]`: The `-f` flag tests if the provided path exists and is a regular file (not a directory).
- It returns true only if the file is found.

---

## Q56. Check directory exists

**Code Idea:**

```bash
read dir

if [ -d "$dir" ]; then
  echo "Directory exists"
fi
```

**Explanation:**
- `[ -d "$dir" ]`: The `-d` flag specifically tests for the existence of a directory.
- It distinguishes folders from files.

---

## Q57. Check empty string

**Code Idea:**

```bash
read str

if [ -z "$str" ]; then
  echo "Empty string"
fi
```

**Explanation:**
- `[ -z "$str" ]`: Returns true if the length of the string `str` is zero.
- This is the standard way to check if a user pressed Enter without typing input.

---

## Q58. Password validation

**Code Idea:**

```bash
read pass

if [ "$pass" = "admin" ]; then
  echo "Access granted"
fi
```

**Explanation:**
- `[ "$pass" = "admin" ]`: Performs a string comparison.
- It checks if the user input exactly matches the string "admin".

---

## Q59. Check file writable

**Code Idea:**

```bash
read file

if [ -w "$file" ]; then
  echo "Writable"
fi
```

**Explanation:**
- `[ -w "$file" ]`: Checks if the file exists **and** if the current user has write permissions for it.

---

## Q60. Check file readable

**Code Idea:**

```bash
read file

if [ -r "$file" ]; then
  echo "Readable"
fi
```

**Explanation:**
- `[ -r "$file" ]`: Checks if the file exists **and** if the current user has read permissions.

---

## Q61. Nested if example

**Code Idea:**

```bash
read n

if (( n > 0 )); then
  if (( n > 10 )); then
    echo "Big positive number"
  fi
fi
```

**Explanation:**
- The outer `if` checks if the number is positive.
- Only if it is positive does it enter the inner `if`, which checks if it is greater than 10.
- This logic filters for numbers in a specific subset (e.g., 11, 12, 100...).

---

## Q62. AND condition

**Code Idea:**

```bash
read a b

if (( a > 0 && b > 0 )); then
  echo "Both positive"
fi
```

**Explanation:**
- `&&`: The logical AND operator inside arithmetic brackets `(( ))`.
- Both conditions (`a > 0` and `b > 0`) must be true for the echo command to run.

---

## Q63. OR condition

**Code Idea:**

```bash
read a b

if (( a > 0 || b > 0 )); then
  echo "At least one positive"
fi
```

**Explanation:**
- `||`: The logical OR operator.
- The condition is true if *either* `a` is positive *or* `b` is positive (or both).

---

## Q64. File size check

**Code Idea:**

```bash
file="data.txt"
size=$(stat -c%s "$file")

if (( size > 1000 )); then
  echo "Large file"
fi
```

**Explanation:**
- `stat -c%s "$file"`: Retrieves the file size in bytes.
- `(( size > 1000 ))`: Checks if the size exceeds 1000 bytes.
- This is useful for filtering out small or empty files.

---

## Q65. Username validation

**Code Idea:**

```bash
read user

if [ -n "$user" ]; then
  echo "Valid user"
fi
```

**Explanation:**
- `[ -n "$user" ]`: The `-n` flag checks if the string length is non-zero.
- It ensures the user did not submit an empty username.

---

## Q66. Multiple condition check

**Code Idea:**

```bash
read n

if (( n >= 1 && n <= 100 )); then
  echo "Valid range"
fi
```

**Explanation:**
- Combines two comparisons with `&&`.
- Checks if `n` is between 1 and 100 inclusive.

---

## Q67. Check file is empty

**Code Idea:**

```bash
read file

if [ ! -s "$file" ]; then
  echo "File is empty"
fi
```

**Explanation:**
- `-s "$file"`: Returns true if the file size is greater than zero.
- `!`: Negates the condition.
- So, `[ ! -s "$file" ]` means "If it is NOT true that the file has size > 0", i.e., the file is empty.

---

## Q68. Compare strings

**Code Idea:**

```bash
read a b

if [ "$a" = "$b" ]; then
  echo "Equal"
fi
```

**Explanation:**
- Uses the single `=` sign for string equality inside single brackets `[ ]`.
- Checks if the two input strings are identical.

---

## Q69. Case sensitive check

**Code Idea:**

```bash
read str

if [[ "$str" == "Hello" ]]; then
  echo "Matched"
fi
```

**Explanation:**
- `[[ ... ]]`: Double brackets are used for more advanced pattern matching.
- `==`: Performs a string comparison. It is case-sensitive, so "hello" or "HELLO" would not match "Hello".

---

## Q70. File type check

**Code Idea:**

```bash
read file

if [ -f "$file" ]; then
  echo "Regular file"
elif [ -d "$file" ]; then
  echo "Directory"
fi
```

**Explanation:**
- Checks the file type using `elif`.
- If `-f` is true, it's a regular file. If not, it checks `-d` to see if it's a directory.

---

# 🔹 LOOPS ADVANCED (Q71–Q90)

---

## Q71. Print numbers 1–100

**Code Idea:**

```bash
for i in {1..100}; do
  echo $i
done
```

**Explanation:**
- `{1..100}`: Bash brace expansion that generates a sequence from 1 to 100.
- The loop iterates through every number in that sequence.

---

## Q72. Sum even numbers

**Code Idea:**

```bash
sum=0
for i in {1..20}; do
  (( i % 2 == 0 )) && sum=$((sum + i))
done
echo $sum
```

**Explanation:**
- Iterates 1 to 20.
- `(( i % 2 == 0 ))`: Checks if the number is even.
- `sum=$((sum + i))`: Adds the even number to the running total.
- Calculates the sum of 2+4+6...+20.

---

## Q73. Print multiplication table

**Code Idea:**

```bash
read n

for i in {1..10}; do
  echo $((n * i))
done
```

**Explanation:**
- Takes a number `n` as input.
- Loops from 1 to 10.
- `$((n * i))`: Multiplies the input number by the loop counter, effectively printing the multiplication table for that number.

---

## Q74. Countdown loop

**Code Idea:**

```bash
for i in {10..1}; do
  echo $i
done
```

**Explanation:**
- `{10..1}`: Generates a sequence in reverse order.
- Prints numbers starting from 10 down to 1.

---

## Q75. While loop counter

**Code Idea:**

```bash
i=1
while (( i <= 10 )); do
  echo $i
  ((i++))
done
```

**Explanation:**
- `i=1`: Initializes the counter variable.
- `while (( i <= 10 ))`: Runs the loop as long as `i` is less than or equal to 10.
- `((i++))`: Increments `i` by 1 in every iteration. This is the C-style increment operator.

---

## Q76. Until loop

**Code Idea:**

```bash
i=1
until (( i > 5 )); do
  echo $i
  ((i++))
done
```

**Explanation:**
- `until`: This loop is the opposite of `while`. It runs *until* the condition becomes true.
- It keeps running while `i` is NOT greater than 5. Once `i` becomes 6, the condition `i > 5` is true, and the loop stops.

---

## Q77. Infinite loop safe stop

**Code Idea:**

```bash
while true; do
  echo "Running..."
  sleep 1
done
```

**Explanation:**
- `while true`: Creates an infinite loop.
- `sleep 1`: Pauses execution for 1 second between prints to avoid consuming 100% CPU.
- (Note: To stop this script, you must manually interrupt it with Ctrl+C).

---

## Q78. Skip number 5

**Code Idea:**

```bash
for i in {1..10}; do
  [[ $i == 5 ]] && continue
  echo $i
done
```

**Explanation:**
- `[[ $i == 5 ]]`: Checks if the iterator is 5.
- `continue`: Skips the rest of the current iteration code and jumps immediately to the next iteration.
- Number 5 is never printed.

---

## Q79. Break at 7

**Code Idea:**

```bash
for i in {1..10}; do
  [[ $i == 7 ]] && break
  echo $i
done
```

**Explanation:**
- Loops 1 through 10.
- When `i` reaches 7, `break` executes.
- `break` terminates the loop entirely. Numbers 7, 8, 9, and 10 are never reached or printed.

---

## Q80. Loop through arguments

**Code Idea:**

```bash
for arg in "$@"; do
  echo $arg
done
```

**Explanation:**
- `"$@"`: Represents all command-line arguments passed to the script.
- The loop iterates through each argument one by one.

---

## Q81. File loop

**Code Idea:**

```bash
for f in *.txt; do
  echo "$f"
done
```

**Explanation:**
- `*.txt`: A glob pattern matching all files ending in `.txt`.
- The loop iterates through the filenames found in the current directory.

---

## Q82. Count files

**Code Idea:**

```bash
count=0
for f in *; do
  ((count++))
done
echo $count
```

**Explanation:**
- `for f in *`: Loops through every item (file and directory) in the current folder.
- `((count++))`: Adds 1 to the counter for every item found.
- Finally prints the total count.

---

## Q83. Find max number

**Code Idea:**

```bash
max=0
for i in 3 8 2 9; do
  (( i > max )) && max=$i
done
echo $max
```

**Explanation:**
- Loops through the specific list: 3, 8, 2, 9.
- Compares the current number `i` with the stored `max`.
- If `i` is bigger, it becomes the new `max`. Finally prints 9.

---

## Q84. Nested loop

**Code Idea:**

```bash
for i in 1 2; do
  for j in 1 2; do
    echo "$i,$j"
  done
done
```

**Explanation:**
- The outer loop runs for `i=1` and `i=2`.
- For every iteration of the outer loop, the inner loop runs completely for `j=1` and `j=2`.
- Output will be: 1,1; 1,2; 2,1; 2,2.

---

## Q85. Loop with step

**Code Idea:**

```bash
for i in {0..10..2}; do
  echo $i
done
```

**Explanation:**
- `{0..10..2}`: This brace expansion syntax means "start at 0, end at 10, increment by 2".
- Output will be: 0, 2, 4, 6, 8, 10.

---

## Q86. File line reader

**Code Idea:**

```bash
while read line; do
  echo $line
done < file.txt
```

**Explanation:**
- `done < file.txt`: Redirects the file into the loop.
- `while read line`: Reads the file line by line.
- This is the standard, memory-efficient way to process text files in Bash.

---

## Q87. Process file lines

**Code Idea:**

```bash
count=0
while read line; do
  ((count++))
done < file.txt

echo $count
```

**Explanation:**
- Combines file redirection with a counter.
- Increments `count` for every line read from `file.txt`.
- Effectively counts the total number of lines in the file.

---

## Q88. Loop with condition

**Code Idea:**

```bash
for i in {1..10}; do
  if (( i % 3 == 0 )); then
    echo $i
  fi
done
```

**Explanation:**
- Loops 1 to 10.
- The `if` statement checks if the number is divisible by 3 (`i % 3 == 0`).
- Only prints numbers 3, 6, and 9.

---

## Q89. Reverse loop

**Code Idea:**

```bash
for ((i=10;i>=1;i--)); do
  echo $i
done
```

**Explanation:**
- `for ((i=10;i>=1;i--))`: This is C-style syntax for a for loop.
- `i=10`: Initialization.
- `i>=1`: Condition (run while true).
- `i--`: Decrement operator (decreases `i` by 1 each time).
- Prints 10 down to 1.

---

## Q90. Parallel loop simulation

**Code Idea:**

```bash
for i in 1 2 3; do
  echo "Task $i running"
done
```

**Explanation:**
- A simple loop simulating the start of multiple tasks.
- In a real scenario, the body of the loop might trigger background processes (using `&`), but here it just logs the activity sequentially.

---

# 🔹 FUNCTIONS (Q91–Q100)

---

## Q91. Basic function

**Code Idea:**

```bash
hello() {
  echo "Hello World"
}
hello
```

**Explanation:**
- `hello() { ... }`: Defines a function named `hello`.
- `hello`: The command that calls/executes the function.

---

## Q92. Function with parameter

**Code Idea:**

```bash
greet() {
  echo "Hi $1"
}
greet John
```

**Explanation:**
- `$1`: Inside a function, this refers to the first argument passed *to the function*, not the script.
- `greet John`: Calls the function and passes "John" as the first argument. Output: "Hi John".

---

## Q93. Add function

**Code Idea:**

```bash
add() {
  echo $(( $1 + $2 ))
}
```

**Explanation:**
- Accepts two arguments (`$1`, `$2`).
- Performs arithmetic addition and prints the result.
- Usage: `add 5 3` would output `8`.

---

## Q94. Subtract function

**Code Idea:**

```bash
sub() {
  echo $(( $1 - $2 ))
}
```

**Explanation:**
- Performs arithmetic subtraction.
- Usage: `sub 10 4` would output `6`.

---

## Q95. Multiply function

**Code Idea:**

```bash
mul() {
  echo $(( $1 * $2 ))
}
```

**Explanation:**
- Performs arithmetic multiplication using the `*` operator inside `$(( ))`.

---

## Q96. Divide function

**Code Idea:**

```bash
div() {
  echo $(( $1 / $2 ))
}
```

**Explanation:**
- Performs integer division.
- Usage: `div 10 3` would output `3` (decimals are truncated in Bash arithmetic).

---

## Q97. File check function

**Code Idea:**

```bash
check() {
  [ -f "$1" ] && echo "Exists"
}
```

**Explanation:**
- A reusable function to test if a file exists.
- It uses the `-f` test on the first argument passed to it.

---

## Q98. Logging function

**Code Idea:**

```bash
log() {
  echo "[$(date)] $1"
}
```

**Explanation:**
- Formats a message with a timestamp.
- `$(date)` executes the date command and inserts the output.
- Usage: `log "System boot"` -> `[Mon Oct 30 10:00:00 UTC 2023] System boot`.

---

## Q99. Exit function

**Code Idea:**

```bash
fail() {
  echo "Error"
  exit 1
}
```

**Explanation:**
- Designed for error handling.
- Prints "Error" to stdout.
- `exit 1`: Terminates the script immediately with an exit status of 1 (indicating failure).

---

## Q100. Multi-function system

**Code Idea:**

```bash
start() { echo "Start"; }
stop() { echo "Stop"; }

start
stop
```

**Explanation:**
- Defines two distinct functions.
- The script calls them in sequence, creating a simple "start then stop" workflow.
- Demonstrates how scripts can be modularized into different actions.

---

# ✔ PART 2 COMPLETE (Q51–Q100)

---




















































Here is the expanded version of **PART 3 (Q101–Q150)**. All original content has been preserved, and detailed explanations have been added to every code block.

---

# 💪 BASH MASTER SERIES — 200 HARD QUESTIONS

## PART 3 (Q101–Q150)

---

# 🔹 FILE OPERATIONS & MANAGEMENT (Q101–Q120)

---

## Q101. Create multiple files at once

**Task:**
Create files `file1.txt` to `file5.txt`.

**Hint:**
Use loop and `touch`

**Master Guide:**
Batch file creation is common in automation.

**Code Idea:**

```bash
for i in {1..5}; do
  touch "file$i.txt"
done
```

**Explanation:**
- `for i in {1..5}`: Loops with `$i` taking values 1, 2, 3, 4, 5.
- `touch "file$i.txt"`: The `touch` command updates the timestamp of a file or creates it if it doesn't exist.
- This loop creates `file1.txt`, `file2.txt`, etc., efficiently.

---

## Q102. Delete files by pattern

**Task:**
Delete all `.tmp` files.

**Hint:**
Use wildcard `*`

**Master Guide:**
Always filter before deleting.

**Code Idea:**

```bash
rm -f *.tmp
```

**Explanation:**
- `rm`: The remove command.
- `-f`: Force flag; it does not prompt for confirmation and ignores nonexistent files.
- `*.tmp`: A glob pattern that matches every file ending in `.tmp` in the current directory.

---

## Q103. Move files to folder

**Code Idea:**

```bash
mkdir -p archive
mv *.txt archive/
```

**Explanation:**
- `mkdir -p archive`: Creates the destination directory. `-p` prevents errors if it already exists.
- `mv *.txt archive/`: Moves all text files from the current directory into the `archive` folder.

---

## Q104. Copy files with condition

**Task:**
Copy only `.txt` files larger than 1KB.

**Code Idea:**

```bash
find . -type f -name "*.txt" -size +1k -exec cp {} backup/ \;
```

**Explanation:**
- `find .`: Start searching in the current directory.
- `-type f -name "*.txt"`: Look only for regular files ending in `.txt`.
- `-size +1k`: Filter for files larger than 1 kilobyte.
- `-exec cp {} backup/ \;`: Executes the `cp` command on every file found. `{}` is a placeholder replaced by the filename.

---

## Q105. Find largest file

**Code Idea:**

```bash
ls -S | head -n 1
```

**Explanation:**
- `ls -S`: Lists files sorted by size (largest first).
- `| head -n 1`: Pipes the output to `head`, which displays only the first line (the largest file).

---

## Q106. Find smallest file

**Code Idea:**

```bash
ls -S | tail -n 1
```

**Explanation:**
- `ls -S`: Lists files sorted by size (largest to smallest).
- `| tail -n 1`: Takes the last line of that output, which represents the smallest file.

---

## Q107. Show file permissions

**Code Idea:**

```bash
ls -l
```

**Explanation:**
- `ls`: List directory contents.
- `-l`: Use long listing format. This displays permissions (e.g., `-rwxr-xr-x`), owner, group, size, and modification time.

---

## Q108. Change file permissions

**Code Idea:**

```bash
chmod 755 script.sh
```

**Explanation:**
- `chmod`: Change mode (permissions).
- `755`: An octal code. `7` (Owner: Read/Write/Execute), `5` (Group: Read/Execute), `5` (Others: Read/Execute). This is standard for executable scripts.

---

## Q109. Make script executable

**Code Idea:**

```bash
chmod +x script.sh
```

**Explanation:**
- `+x`: A symbolic mode that adds the execute permission for everyone (User, Group, Others).
- A simpler way to make a script runnable without setting specific read/write numbers.

---

## Q110. Change ownership (simulated)

**Code Idea:**

```bash
ls -l file.txt
```

**Explanation:**
- (Note: The code here simulates checking the current owner).
- `ls -l file.txt`: Displays the owner and group of the specific file. To actually change ownership, the command `chown user:group file.txt` would be used.

---

## Q111. Count files in directory

**Code Idea:**

```bash
ls | wc -l
```

**Explanation:**
- `ls`: Lists all non-hidden files.
- `| wc -l`: Pipes the list to `wc` (word count) with the `-l` flag, which counts the number of lines (items).

---

## Q112. Find hidden files

**Code Idea:**

```bash
ls -a
```

**Explanation:**
- `ls`: List command.
- `-a`: "All" flag. It shows hidden files (those starting with a dot `.`) which are normally suppressed.

---

## Q113. Create nested directories

**Code Idea:**

```bash
mkdir -p a/b/c
```

**Explanation:**
- `mkdir`: Make directory.
- `-p`: "Parents" flag. It creates parent directories `a` and `a/b` if they don't exist, allowing the creation of the full tree `a/b/c` in one command.

---

## Q114. Remove directory tree

**Code Idea:**

```bash
rm -rf folder
```

**Explanation:**
- `rm`: Remove command.
- `-r`: Recursive. Deletes the folder and all its contents (sub-folders/files).
- `-f`: Force. Suppresses warnings for non-existent files or write-protected files.
- **Warning**: This is irreversible and powerful.

---

## Q115. Rename directory

**Code Idea:**

```bash
mv olddir newdir
```

**Explanation:**
- `mv`: The move command, which doubles as the rename command.
- It moves `olddir` to the name `newdir` effectively renaming it if they are in the same location.

---

## Q116. List files with details

**Code Idea:**

```bash
ls -lh
```

**Explanation:**
- `-l`: Long format.
- `-h`: Human-readable sizes (e.g., 4.0K, 12M instead of raw bytes).
- Combining them gives a detailed, easy-to-read list.

---

## Q117. Sort files by time

**Code Idea:**

```bash
ls -lt
```

**Explanation:**
- `-l`: Long format.
- `-t`: Sort by modification time (newest first). Useful for seeing what was recently changed.

---

## Q118. Find files by extension

**Code Idea:**

```bash
find . -name "*.sh"
```

**Explanation:**
- `find .`: Search current directory recursively.
- `-name "*.sh"`: Matches filenames ending in `.sh`.

---

## Q119. Find empty directories

**Code Idea:**

```bash
find . -type d -empty
```

**Explanation:**
- `-type d`: Look only for directories.
- `-empty`: Match only directories that contain no files.

---

## Q120. Backup system folder

**Code Idea:**

```bash
tar -czf backup.tar.gz myfolder/
```

**Explanation:**
- `tar`: Tape archive command.
- `-c`: Create a new archive.
- `-z`: Compress with gzip.
- `-f`: Filename of the archive (`backup.tar.gz`).
- This bundles `myfolder` into a single compressed file.

---

# 🔹 TEXT PROCESSING (Q121–Q140)

---

## Q121. Search word in file

**Code Idea:**

```bash
grep "error" file.txt
```

**Explanation:**
- `grep`: Global Regular Expression Print.
- Searches `file.txt` for the string "error" and prints every line that contains it.

---

## Q122. Case-insensitive search

**Code Idea:**

```bash
grep -i "error" file.txt
```

**Explanation:**
- `-i`: Ignore case.
- Matches "error", "ERROR", "Error", etc.

---

## Q123. Count matches

**Code Idea:**

```bash
grep -c "error" file.txt
```

**Explanation:**
- `-c`: Count.
- Instead of printing the lines, it outputs the total number of lines matching "error".

---

## Q124. Show line numbers

**Code Idea:**

```bash
grep -n "error" file.txt
```

**Explanation:**
- `-n`: Number.
- Prepends each output line with its line number in the original file (e.g., `14:error found`).

---

## Q125. Replace text (sed)

**Code Idea:**

```bash
sed 's/linux/bash/' file.txt
```

**Explanation:**
- `sed`: Stream Editor.
- `s/linux/bash/`: The substitution command. It replaces the *first* occurrence of "linux" with "bash" on every line.
- Output goes to screen; the file is not modified unless `-i` is used.

---

## Q126. Replace all occurrences

**Code Idea:**

```bash
sed 's/linux/bash/g' file.txt
```

**Explanation:**
- `g`: Global flag.
- Replaces *all* occurrences of "linux" with "bash" on every line, not just the first one.

---

## Q127. Extract column

**Code Idea:**

```bash
cut -d":" -f1 file.txt
```

**Explanation:**
- `cut`: Cuts out sections from each line of files.
- `-d":"`: Sets the delimiter to a colon.
- `-f1`: Selects the first field (column) based on that delimiter. Commonly used to parse `/etc/passwd`.

---

## Q128. Sort file

**Code Idea:**

```bash
sort file.txt
```

**Explanation:**
- Reads the file and outputs the lines in sorted order (alphabetical by default).

---

## Q129. Remove duplicates

**Code Idea:**

```bash
sort file.txt | uniq
```

**Explanation:**
- `sort`: Sorts the file (required because `uniq` only detects adjacent duplicates).
- `uniq`: Removes repeated lines.
- The pipe `|` passes sorted data to `uniq`.

---

## Q130. Count unique lines

**Code Idea:**

```bash
sort file.txt | uniq -c
```

**Explanation:**
- `uniq -c`: Counts how many times each line appears.
- Output example: `   5 Error 404` (meaning "Error 404" appeared 5 times).

---

## Q131. Word count

**Code Idea:**

```bash
wc -w file.txt
```

**Explanation:**
- `wc`: Word count.
- `-w`: Prints the number of words in the file.

---

## Q132. Line count

**Code Idea:**

```bash
wc -l file.txt
```

**Explanation:**
- `wc -l`: Prints the number of lines in the file.

---

## Q133. Character count

**Code Idea:**

```bash
wc -m file.txt
```

**Explanation:**
- `-m`: Prints the character count (including spaces and newlines).

---

## Q134. First 10 lines

**Code Idea:**

```bash
head file.txt
```

**Explanation:**
- `head`: Prints the top of the file.
- By default, it prints the first 10 lines.

---

## Q135. Last 10 lines

**Code Idea:**

```bash
tail file.txt
```

**Explanation:**
- `tail`: Prints the end of the file.
- By default, it prints the last 10 lines.

---

## Q136. Live file monitoring

**Code Idea:**

```bash
tail -f file.txt
```

**Explanation:**
- `-f`: Follow mode.
- As the file grows (like a log file), `tail` continues to display new lines written to it in real-time.

---

## Q137. Search multiple files

**Code Idea:**

```bash
grep "error" *.txt
```

**Explanation:**
- `*.txt`: A glob matching all text files.
- `grep` searches for "error" in every matched file and labels the output with the filename.

---

## Q138. Combine grep + sort

**Code Idea:**

```bash
grep "bash" file.txt | sort
```

**Explanation:**
- `grep`: Filters lines containing "bash".
- `| sort`: Takes those specific lines and sorts them alphabetically.

---

## Q139. Extract specific field with awk

**Code Idea:**

```bash
awk '{print $1}' file.txt
```

**Explanation:**
- `awk`: A powerful text processing tool.
- `$1`: Represents the first column (default separated by whitespace).
- This prints only the first word/column of every line.

---

## Q140. Filter rows using awk

**Code Idea:**

```bash
awk '$2 > 50' file.txt
```

**Explanation:**
- `awk` checks a condition: If the second column (`$2`) is greater than 50.
- It implicitly prints the entire line if the condition is true. This acts like a row filter based on numerical value.

---

# 🔹 PIPELINES & LOG ANALYSIS (Q141–Q150)

---

## Q141. Basic pipeline usage

**Code Idea:**

```bash
cat file.txt | grep "error"
```

**Explanation:**
- `cat file.txt`: Dumps the file content to standard output.
- `|`: The pipe operator passes that output to the next command.
- `grep "error"`: Filters the incoming stream for lines with "error".
- (Note: `grep "error" file.txt` is more efficient, but this demonstrates piping).

---

## Q142. Chain multiple commands

**Code Idea:**

```bash
cat file.txt | grep "error" | sort
```

**Explanation:**
- Demonstrates chaining more than two commands.
- 1. Read file.
- 2. Filter for "error".
- 3. Sort the error lines alphabetically.

---

## Q143. Find errors and count

**Code Idea:**

```bash
grep "error" file.txt | wc -l
```

**Explanation:**
- `grep`: Extracts lines with "error".
- `wc -l`: Counts the lines.
- Result: Total number of errors.

---

## Q144. Show top results

**Code Idea:**

```bash
cat file.txt | head -n 5
```

**Explanation:**
- Reads the file and extracts only the first 5 lines using `head`.

---

## Q145. Show last results

**Code Idea:**

```bash
cat file.txt | tail -n 5
```

**Explanation:**
- Reads the file and extracts only the last 5 lines using `tail`.

---

## Q146. Live log error tracking

**Code Idea:**

```bash
tail -f log.txt | grep "error"
```

**Explanation:**
- `tail -f`: Monitors the log file as it grows.
- `| grep "error"`: Filters the live stream, printing only new lines that contain "error". This is crucial for real-time debugging.

---

## Q147. Extract and sort logs

**Code Idea:**

```bash
cat log.txt | grep "fail" | sort
```

**Explanation:**
- Finds all lines with "fail" in the log and sorts them alphabetically.
- Useful for grouping similar failure messages together.

---

## Q148. Unique error list

**Code Idea:**

```bash
grep "error" log.txt | sort | uniq
```

**Explanation:**
- `grep`: Get error lines.
- `sort`: Sort them (required for `uniq`).
- `uniq`: Remove duplicates.
- Result: A list of distinct error messages found in the log.

---

## Q149. Count errors per file

**Code Idea:**

```bash
grep -c "error" log.txt
```

**Explanation:**
- Uses `grep`'s built-in count flag.
- Returns a single integer representing how many lines in `log.txt` contain "error".

---

## Q150. Log analyzer mini system

**Code Idea:**

```bash
echo "Error Report"
grep "error" log.txt | wc -l
echo "Done"
```

**Explanation:**
- A simple script to generate a report.
- `echo`: Prints a header.
- `grep ... | wc -l`: Calculates the count.
- Prints "Done" at the end. This simulates a basic automated status check script.

---

# ✔ PART 3 COMPLETE (Q101–Q150)

---











































Here is the expanded version of the **FINAL PART (Q151–Q200)**. All original content has been preserved, and detailed explanations have been added to every code block to ensure full understanding of these advanced concepts.

---

# 💪 BASH MASTER SERIES — 200 HARD QUESTIONS

## PART 4 (Q151–Q200)

---

# 🔹 SYSTEM MONITORING (Q151–Q170)

---

## Q151. Check system uptime

**Task:**
Display how long the system has been running.

**Hint:**
Use `uptime`

**Master Guide:**
System monitoring starts with uptime.

**Code Idea:**

```bash
uptime
```

**Explanation:**
- `uptime`: This command displays the current time, how long the system has been running, how many users are currently logged in, and the system load averages for the past 1, 5, and 15 minutes. It is the quickest way to check server health stability.

---

## Q152. Show CPU usage snapshot

**Code Idea:**

```bash
top -bn1 | head
```

**Explanation:**
- `top`: A dynamic real-time viewer for system processes.
- `-b`: "Batch mode" – allows sending output to a file or pipe.
- `-n1`: Limits the output to exactly 1 iteration (snapshot) instead of updating continuously.
- `| head`: Displays only the top portion (summary and leading processes), providing a quick CPU status.

---

## Q153. Show memory usage

**Code Idea:**

```bash
free -m
```

**Explanation:**
- `free`: Displays the total amount of free and used physical and swap memory.
- `-m`: Shows the output in megabytes (MiB). Without flags, it defaults to kilobytes.

---

## Q154. Show disk usage

**Code Idea:**

```bash
df -h
```

**Explanation:**
- `df`: "Disk Free" – reports file system disk space usage.
- `-h`: "Human-readable" – prints sizes in powers of 1024 (e.g., 15G, 2.5M) making it easier to read than raw blocks.

---

## Q155. Monitor running processes

**Code Idea:**

```bash
ps aux
```

**Explanation:**
- `ps`: Process status.
- `a`: Show processes for all users.
- `u`: Display the process's user/owner.
- `x`: Show processes not attached to a terminal (like daemons).
- This gives a complete snapshot of every process running on the system.

---

## Q156. Find specific process

**Code Idea:**

```bash
ps aux | grep bash
```

**Explanation:**
- `ps aux`: Lists all processes.
- `| grep bash`: Filters the list to show only lines containing the word "bash".
- This is the standard way to verify if a specific service or script is currently running.

---

## Q157. Kill process by PID

**Code Idea:**

```bash
kill -9 1234
```

**Explanation:**
- `kill`: A command to send a signal to a process.
- `1234`: The Process ID (PID) to target.
- `-9`: The signal number for `SIGKILL`. This forces the process to terminate immediately without allowing it to clean up (use as a last resort).

---

## Q158. Background process

**Code Idea:**

```bash
sleep 30 &
```

**Explanation:**
- `sleep 30`: Pauses execution for 30 seconds.
- `&`: The ampersand placed at the end of a command pushes it to the background.
- This frees up your terminal so you can run other commands while `sleep` counts down in the background.

---

## Q159. List jobs

**Code Idea:**

```bash
jobs
```

**Explanation:**
- `jobs`: Lists the active jobs currently running in the background or stopped for the current shell session.
- It shows the job number and status (e.g., Running, Stopped).

---

## Q160. Bring job to foreground

**Code Idea:**

```bash
fg
```

**Explanation:**
- `fg`: "Foreground".
- Moves a background job into the foreground so it becomes the active process on your terminal. If multiple jobs exist, you can specify `%1`, `%2`, etc.

---

## Q161. Send job to background

**Code Idea:**

```bash
bg
```

**Explanation:**
- `bg`: "Background".
- Resumes a suspended (stopped) job in the background.
- Commonly used after pausing a process with `Ctrl+Z`.

---

## Q162. Check internet connection

**Code Idea:**

```bash
ping -c 1 google.com
```

**Explanation:**
- `ping`: Sends ICMP packets to a network host to check connectivity.
- `-c 1`: Limits the count to 1 packet. Without this, `ping` runs indefinitely.
- Useful in scripts to check if a server is online before attempting a download.

---

## Q163. Download file with wget

**Code Idea:**

```bash
wget https://example.com/file.txt
```

**Explanation:**
- `wget`: A non-interactive network downloader.
- It downloads the file from the URL to the current directory.
- It is robust and handles resuming downloads automatically if interrupted.

---

## Q164. Download file with curl

**Code Idea:**

```bash
curl -O https://example.com/file.txt
```

**Explanation:**
- `curl`: Transfer data to or from a server.
- `-O` (Capital O): Saves the file with the same name as it has on the remote server.
- Without `-O`, `curl` would dump the file content to the screen (stdout).

---

## Q165. System load check

**Code Idea:**

```bash
uptime
```

**Explanation:**
- This repeats the uptime command (Q151).
- The specific focus here is the "load average" section. Load averages under 1.0 (per CPU core) typically indicate a healthy system. High numbers suggest the CPU is overloaded.

---

## Q166. Show logged users

**Code Idea:**

```bash
who
```

**Explanation:**
- `who`: Shows who is currently logged into the system.
- It displays the username, terminal line, login time, and remote host IP.

---

## Q167. Show system date

**Code Idea:**

```bash
date
```

**Explanation:**
- `date`: Prints the current system date and time.
- Highly customizable with format strings (e.g., `date +%Y-%m-%d`) for use in log filenames.

---

## Q168. Show hardware info

**Code Idea:**

```bash
lscpu
```

**Explanation:**
- `lscpu`: Displays information about the CPU architecture.
- Includes cores, threads, model name, and cache size. Critical for performance tuning.

---

## Q169. Show memory details

**Code Idea:**

```bash
cat /proc/meminfo
```

**Explanation:**
- `/proc/meminfo`: A special virtual file containing detailed statistics about memory usage.
- `cat` dumps this file.
- It provides much more granular detail than the `free` command (e.g., buffers, cache, active/inactive memory).

---

## Q170. System health summary

**Code Idea:**

```bash
uptime
free -m
df -h
```

**Explanation:**
- Runs three commands sequentially.
- Provides a quick, holistic snapshot of Load (uptime), RAM (free), and Disk (df).
- A standard combination for a "first glance" at server health.

---

# 🔹 ADVANCED FILE AUTOMATION (Q171–Q185)

---

## Q171. Create backup archive

**Code Idea:**

```bash
tar -czf backup.tar.gz folder/
```

**Explanation:**
- `tar`: Tape archiver.
- `-c`: Create a new archive.
- `-z`: Compress with gzip (reduces file size).
- `-f`: Specify the filename (`backup.tar.gz`).
- Bundles `folder/` into a single compressed file, ideal for backups.

---

## Q172. Extract archive

**Code Idea:**

```bash
tar -xzf backup.tar.gz
```

**Explanation:**
- `-x`: Extract from an archive.
- `-z`: Handle the gzip compression (unzip).
- `-f`: Specify the filename to extract.
- Reconstructs the original files from the archive in the current directory.

---

## Q173. Delete temporary files

**Code Idea:**

```bash
rm -rf /tmp/*
```

**Explanation:**
- `rm -rf`: Remove recursively and forcefully.
- `/tmp/*`: Targets all files inside the `/tmp` directory.
- **Warning**: This deletes system temporary files; should be used with caution in production scripts.

---

## Q174. Log error handler

**Code Idea:**

```bash
command || echo "Failed" >> error.log
```

**Explanation:**
- `||`: The "OR" logical operator. It executes the command on the right ONLY if the command on the left fails (returns a non-zero exit status).
- `>> error.log`: Appends the error message to a log file.
- This is a simple yet powerful error handling pattern.

---

## Q175. Auto log creation

**Code Idea:**

```bash
echo "$(date) System check" >> log.txt
```

**Explanation:**
- `$(date)`: Embeds the current timestamp.
- `>> log.txt`: Appends the string to `log.txt`. If the file doesn't exist, it creates it.
- Perfect for adding timestamped entries to a maintenance log.

---

## Q176. Script execution log

**Code Idea:**

```bash
bash script.sh >> output.log
```

**Explanation:**
- Runs `script.sh`.
- `>> output.log`: Redirects the standard output (stdout) of the script into a log file.
- This prevents output from cluttering the console and creates a record of the execution.

---

## Q177. Find large files

**Code Idea:**

```bash
find . -size +10M
```

**Explanation:**
- `find .`: Search current directory.
- `-size +10M`: Matches files larger than 10 Megabytes.
- Useful for finding space hogs on a server.

---

## Q178. Find recent files

**Code Idea:**

```bash
find . -mtime -1
```

**Explanation:**
- `-mtime -1`: Filters for files modified less than 1 day ago (within the last 24 hours).
- Great for checking what work was done today or verifying recent uploads.

---

## Q179. Delete old files

**Code Idea:**

```bash
find . -mtime +7 -delete
```

**Explanation:**
- `-mtime +7`: Matches files modified more than 7 days ago.
- `-delete`: Performs the delete action on the found files.
- Automates cleanup of old logs or backups (a common cron job).

---

## Q180. File permissions report

**Code Idea:**

```bash
ls -l
```

**Explanation:**
- Lists files in long format.
- Displays permissions, owner, group, size, and date.
- Essential for auditing security access on sensitive files.

---

## Q181. Change permissions recursively

**Code Idea:**

```bash
chmod -R 755 folder/
```

**Explanation:**
- `chmod`: Change mode.
- `-R`: Recursive. Applies the change to the folder and everything inside it.
- `755`: Sets full access for the owner, and read/execute for everyone else. Common for web directories.

---

## Q182. Create project structure

**Code Idea:**

```bash
mkdir -p project/{src,bin,logs}
```

**Explanation:**
- `mkdir -p`: Creates parents as needed.
- `{src,bin,logs}`: Brace expansion. This creates three directories (`src`, `bin`, `logs`) inside `project/` in a single command.
- Efficient way to scaffold a standard project layout.

---

## Q183. Copy folder safely

**Code Idea:**

```bash
cp -r project backup/
```

**Explanation:**
- `cp`: Copy.
- `-r`: Recursive. Copies the directory and all its contents (sub-folders/files).
- Creates a duplicate of the entire project structure.

---

## Q184. Move files by type

**Code Idea:**

```bash
mv *.txt textfiles/
```

**Explanation:**
- `mv`: Move.
- `*.txt`: Wildcard matching all text files.
- Moves all text files from the current directory into the `textfiles` directory. Used for organizing messy directories.

---

## Q185. Compress logs folder

**Code Idea:**

```bash
tar -czf logs.tar.gz logs/
```

**Explanation:**
- Creates a compressed archive of the `logs` folder.
- Combines bundling and compression into one standard operation for archiving old data.

---

# 🔹 FINAL DEVOPS PROJECTS (Q186–Q200)

---

## Q186. System monitoring script

**Code Idea:**

```bash
echo "UPTIME"
uptime

echo "MEMORY"
free -m

echo "DISK"
df -h
```

**Explanation:**
- A script that combines multiple basic commands with labeled output (`echo`).
- Provides a structured, readable dashboard when logged into a server.
- Simple but effective for manual checks.

---

## Q187. Log analyzer system

**Code Idea:**

```bash
grep "error" log.txt | wc -l
```

**Explanation:**
- Filters `log.txt` for lines containing "error".
- `wc -l`: Counts those lines.
- Outputs a single number: the total count of errors. Useful for quick health checks.

---

## Q188. Auto backup system

**Code Idea:**

```bash
tar -czf backup_$(date +%F).tar.gz project/
```

**Explanation:**
- `$(date +%F)`: Command substitution. Inserts the date in YYYY-MM-DD format (e.g., `2023-10-27`).
- Filename becomes `backup_2023-10-27.tar.gz`.
- Ensures backups never overwrite each other and are sortable by date.

---

## Q189. Cleanup system script

**Code Idea:**

```bash
rm -f *.log
echo "Logs cleaned"
```

**Explanation:**
- `rm -f *.log`: Forcibly deletes all log files.
- `echo`: Provides user feedback confirming the action.
- A common maintenance script, though in production one usually archives logs rather than deleting them.

---

## Q190. Process watchdog

**Code Idea:**

```bash
ps aux | grep nginx
```

**Explanation:**
- Checks if the `nginx` web server process is running.
- If the output shows lines of nginx processes, the server is up.
- Often used in "if" statements to restart a service if it is found missing.

---

## Q191. Auto restart simulation

**Code Idea:**

```bash
echo "Restarting service..."
```

**Explanation:**
- Simulates a restart command.
- In a real scenario, this line would be `systemctl restart nginx` or similar.
- Demonstrates the logic placeholder for service management.

---

## Q192. File integrity check

**Code Idea:**

```bash
md5sum file.txt
```

**Explanation:**
- `md5sum`: Calculates and prints a 128-bit MD5 hash (checksum).
- If the file content changes even slightly, the hash changes completely.
- Used to verify that a file has not been corrupted or tampered with during transfer.

---

## Q193. Disk alert system

**Code Idea:**

```bash
df -h | grep "/dev"
```

**Explanation:**
- `df -h`: Shows disk usage.
- `grep "/dev"`: Filters to show only actual storage devices (ignoring virtual filesystems like tmpfs).
- The first step in creating an alert (e.g., checking if usage is > 90%).

---

## Q194. CPU monitor script

**Code Idea:**

```bash
top -bn1 | head
```

**Explanation:**
- Takes a snapshot of `top` (CPU processes).
- `head` limits the output.
- Allows a script to "see" the top processes consuming resources at that moment.

---

## Q195. Memory alert system

**Code Idea:**

```bash
free -m
```

**Explanation:**
- Outputs memory stats.
- A script would parse this output (using `awk`) to trigger an alert if "Available" memory drops below a threshold.

---

## Q196. Simple deployment script

**Code Idea:**

```bash
cp -r app/ /var/www/html/
```

**Explanation:**
- Simulates a basic deployment strategy.
- Copies the local `app` directory to the web server root (`/var/www/html`).
- Automates the transfer of code to the production environment.

---

## Q197. Environment setup script

**Code Idea:**

```bash
mkdir -p app/{src,config,logs}
```

**Explanation:**
- Automates the creation of a standard project skeleton.
- Uses brace expansion to create three necessary folders in one line.
- Ensures consistency across developer environments.

---

## Q198. Cron job example

**Code Idea:**

```bash
* * * * * /home/user/script.sh
```

**Explanation:**
- This is a line format for the `crontab` file (scheduler).
- The 5 asterisks (`* * * * *`) represent: Minute, Hour, Day of Month, Month, Day of Week.
- This specific example runs `script.sh` **every minute**.
- Essential for automating backups, monitoring, and cleanup.

---

## Q199. Full system report generator

**Code Idea:**

```bash
echo "REPORT $(date)" > report.txt
uptime >> report.txt
free -m >> report.txt
df -h >> report.txt
```

**Explanation:**
- `>`: Creates/Overwrites `report.txt` with the header.
- `>>`: Appends subsequent command outputs to the file.
- Generates a text file summary of system health. This can be emailed to an admin.

---

## Q200. FINAL MASTER PROJECT — FULL AUTOMATION SYSTEM

**Code Idea:**

```bash
echo "SYSTEM REPORT - $(date)" > system_report.txt

echo "UPTIME" >> system_report.txt
uptime >> system_report.txt

echo "MEMORY" >> system_report.txt
free -m >> system_report.txt

echo "DISK" >> system_report.txt
df -h >> system_report.txt

echo "PROCESSES" >> system_report.txt
ps aux >> system_report.txt

echo "REPORT COMPLETE"
```

**Explanation:**
- Combines file redirection, command substitution, and system monitoring tools.
- Builds a comprehensive text file (`system_report.txt`) containing a labeled, timestamped snapshot of the entire system state.
- This represents a "Capstone" script: it automates data collection, formats it, and saves it to a file, which is the core purpose of many DevOps Bash scripts.

---

# 🎉 FULL 200 BASH PRACTICE QUESTIONS COMPLETED

You now have:

✔ Beginner → Advanced progression
✔ Real DevOps scripts
✔ File systems + automation
✔ Text processing mastery
✔ System monitoring tools
✔ Real-world production scripts








Here is the expanded version of the **50 BASH INTERVIEW TRICK QUESTIONS**. I have kept the original questions, traps, and answer ideas, and added a **Detailed Explanation** for each to clarify the underlying Bash mechanics.

---

# 💣 50 BASH INTERVIEW TRICK QUESTIONS (HARD TRAPS)

These questions test your understanding of *why* Bash behaves the way it does, exposing common pitfalls in word splitting, globbing, and syntax parsing.

---

## Q1. Why does this fail?
```bash
if [ $name = "John" ]; then
```

**Trap:**
Unquoted variable → word splitting errors.

**Answer Idea:**
Always use:
```bash
if [ "$name" = "John" ]; then
```

**Detailed Explanation:**
If `$name` is empty or contains spaces, the shell expands this line incorrectly.
- If `name` is empty: It becomes `[ = "John" ]`. This is a syntax error because the `[` command expects an argument before the `=`.
- If `name` is "John Doe": It becomes `[ John Doe = "John" ]`. This arguments list is too long for the `[` command.
Quoting `"$name"` ensures it is treated as a single argument, even if it is empty or contains spaces.

---

## Q2. What happens if file name has spaces?
```bash
rm my file.txt
```

**Trap:**
Splits into 2 arguments.

**Detailed Explanation:**
Bash splits arguments based on whitespace (unless quoted).
- This command passes two arguments to `rm`: `my` and `file.txt`.
- It will delete a file named `my` and a file named `file.txt`, rather than the single file "my file.txt".
- **Fix:** Use quotes: `rm "my file.txt"`.

---

## Q3. Why does this always return true?
```bash
[ $var = "test" ]
```

**Trap:**
Empty `$var` breaks condition.

**Detailed Explanation:**
Technically, this causes a syntax error if `$var` is empty, not "true".
- If `var` is empty, it expands to `[ = "test" ]`, which errors out: `unary operator expected`.
- If `var` is just a space ` `, word splitting might result in empty arguments leading to confusing logic.
- The "always true" trap is often associated with `[ -n $var ]` (where empty var becomes `[ -n ]`, which is true because `-n` is a non-empty string). In both cases, **quoting is the fix**.

---

## Q4. Difference between = and == in [ ]?

**Trap:**
`==` is not POSIX standard in single brackets.

**Detailed Explanation:**
- Inside single brackets `[ ]`: `=` is the POSIX standard for string comparison. `==` is a Bash extension (builtin). Using `==` inside `[ ]` works in Bash but fails in strict POSIX `sh`.
- Inside double brackets `[[ ]]`: `==` is the standard for pattern matching.
- **Best Practice:** Use `=` inside `[ ]` for portability, or use `[[ ]]` for Bash-specific scripts.

---

## Q5. What is wrong here?
```bash
if (( $a = 5 )); then
```

**Trap:**
Assignment instead of comparison.

**Detailed Explanation:**
- Inside arithmetic context `(( ))`, the single `=` is an **assignment** operator.
- This code assigns `5` to `a`. The result of the expression is 5 (non-zero), so the condition evaluates to "true" (success).
- **Fix:** Use `==` for comparison: `if (( $a == 5 )); then`.

---

## Q6. Why does this loop break early?
```bash
for i in $(ls)
```

**Trap:**
Word splitting + unsafe parsing.

**Detailed Explanation:**
- `$(ls)` executes `ls`, and Bash performs word splitting on the output based on spaces, tabs, and newlines.
- If a file is named `my file.txt`, the loop iterates once for `my` and once for `file.txt`.
- **Fix:** Use globbing: `for i in *; do`.

---

## Q7. What happens if file does not exist?
```bash
cat file.txt | grep "test"
```

**Trap:**
`cat` error ignored in pipeline.

**Detailed Explanation:**
- If `file.txt` does not exist, `cat` prints an error to stderr.
- However, the pipe `|` passes the stdout (which is empty) to `grep`.
- `grep` searches empty input and finds nothing, exiting with status 0 (usually).
- The script might appear to succeed (exit code 0) despite the file missing, unless `set -o pipefail` is enabled.
- **Fix:** `grep "test" file.txt` (grep will report error if file missing).

---

## Q8. Why is this unsafe?
```bash
rm -rf $dir/*
```

**Trap:**
Unquoted variable expansion.

**Detailed Explanation:**
- If `$dir` contains spaces, the expansion breaks (e.g., `rm -rf my dir/*` deletes `my`).
- **Critical Danger:** If `$dir` is empty, it expands to `rm -rf /*` (deleting root). This is because `/*` is evaluated.
- **Fix:** Always quote: `rm -rf "$dir"/*` (and check if variable is empty first).

---

## Q9. What does this return?
```bash
echo "a b c" | while read x; do echo $x; done
```

**Trap:**
Only first word processed.

**Detailed Explanation:**
- `read x` reads a line of text.
- Since only one variable `x` is provided, `read` assigns the **first word** ("a") to `x`, and the **rest of the line** ("b c") is discarded (or put in `$REPLY` depending on implementation, but not in `x`).
- Result: It prints "a".
- **Fix:** Use `read x rest` to capture the remainder, or just `read line` to capture the whole line.

---

## Q10. Why does this fail?
```bash
count=0
count = $count + 1
```

**Trap:**
Spaces break assignment.

**Detailed Explanation:**
- Variable assignment in Bash (`var=value`) **cannot** have spaces around the `=`.
- `count = ...` is interpreted as running a command named `count` with arguments `=` and `...`.
- **Fix:** `count=$((count + 1))` or `((count++))`.

---

## Q11. What is wrong?
```bash
if [ $a -gt $b ]
```

**Trap:**
Unquoted variables.

**Detailed Explanation:**
- If `$a` or `$b` is empty or non-numeric, the `[` command will throw a syntax error or perform incorrect logic.
- **Fix:** Quote variables: `if [ "$a" -gt "$b" ]`.

---

## Q12. Why is this dangerous?
```bash
eval $input
```

**Trap:**
Command injection.

**Detailed Explanation:**
- `eval` executes the string contained in `$input` as a command.
- If `$input` comes from a user and contains `rm -rf /` or `; cat /etc/passwd`, it will execute that code.
- **Fix:** Never use `eval` on untrusted input.

---

## Q13. What does this print?
```bash
x=10
((x++))
echo $x
```

**Trap:**
Post-increment behavior.

**Detailed Explanation:**
- `((x++))` uses the C-style post-increment.
- It returns the value *before* incrementing (10), but it **increments the variable** `x` to 11.
- `echo $x` prints `11`.

---

## Q14. Why does this not work?
```bash
read file
cat $file
```

**Trap:**
Spaces in filename.

**Detailed Explanation:**
- If the user inputs "my file.txt", `$file` becomes "my file.txt".
- `cat $file` performs word splitting: `cat my file.txt`.
- `cat` tries to open two files: `my` and `file.txt`.
- **Fix:** Quote the variable: `cat "$file"`.

---

## Q15. What happens here?
```bash
ls | grep "txt" | rm
```

**Trap:**
`rm` doesn't accept stdin.

**Detailed Explanation:**
- Pipes pass the output of the left command to the Standard Input (stdin) of the right command.
- `rm` deletes files provided as **arguments**, not via stdin.
- This command will likely hang or do nothing (or wait for input depending on version).
- **Fix:** Use `xargs`: `ls | grep "txt" | xargs rm`.

---

## Q16. Why is this wrong?
```bash
for i in `cat file`
```

**Trap:**
Word splitting + whitespace loss.

**Detailed Explanation:**
- Similar to Q6, this reads the file content and splits it by whitespace (newlines, spaces).
- You lose the structure of the file lines.
- **Fix:** `while read line; do ...; done < file`.

---

## Q17. Difference between $* and $@?

**Trap:**
Argument splitting behavior.

**Detailed Explanation:**
- `$*`: All arguments combine into a single string (`"$1 $2 ..."`).
- `$@`: Arguments remain separate (`"$1" "$2" ...`).
- **Crucial:** Always quote them (`"$@"`) to preserve arguments containing spaces.

---

## Q18. What happens here?
```bash
[ 1 = 01 ]
```

**Trap:**
String comparison, not numeric.

**Detailed Explanation:**
- `[ ]` performs string (lexicographical) comparison.
- "1" and "01" are different strings.
- It returns False.
- **Fix:** Use numeric comparison: `[ 1 -eq 01 ]`.

---

## Q19. Why does this fail in script?
```bash
echo $((1/0))
```

**Trap:**
Division by zero.

**Detailed Explanation:**
- Bash arithmetic cannot divide by zero.
- This generates an error message "division by 0" and usually returns exit code 1. It does not print "infinity" or "null".

---

## Q20. What is wrong?
```bash
if grep "test" file.txt; then echo yes; fi
```

**Trap:**
Actually valid but exit status misunderstanding.

**Detailed Explanation:**
- This is actually **correct syntax**. `grep` returns exit status 0 if found (True).
- The trap is thinking it needs `[ ]`. `if` works directly on command exit codes.

---

## Q21. Why does this loop break?
```bash
while read line; do
done < file.txt | sort
```

**Trap:**
Pipeline vs input redirection confusion.

**Detailed Explanation:**
- The pipe `|` creates a subshell for the `while` loop.
- The input redirection `< file.txt` applies to the `while` loop.
- However, the `sort` command receives the output of the loop. If the loop prints nothing, `sort` gets nothing.
- If the trap is about variables: Variables modified inside a pipeline loop are lost when the pipeline finishes (subshell scope).

---

## Q22. What happens here?
```bash
var=$(ls *.txt)
```

**Trap:**
Too many arguments error.

**Detailed Explanation:**
- `ls *.txt` expands filenames. If there are many files, the output is a long string with newlines.
- It doesn't cause a syntax error, but `var` becomes a single string containing all filenames separated by spaces/newlines.
- Using `$var` later will invoke word splitting again.

---

## Q23. Why is this unsafe?
```bash
cp $file /backup
```

**Trap:**
Unquoted variable expansion.

**Detailed Explanation:**
- If `$file` is empty, `cp` sees `cp /backup`.
- Depending on implementation, this might try to copy `/backup` to current directory or throw an error.
- If `$file` has spaces, it breaks.
- **Fix:** `cp "$file" /backup`.

---

## Q24. What does this return?
```bash
[ 0 ]
```

**Trap:**
Always true (0 is non-empty string).

**Detailed Explanation:**
- Inside `[ ]`, a single argument is tested for non-emptiness.
- The string "0" is not empty.
- Therefore, it returns True (exit code 0).
- It does NOT check if the number equals zero.

---

## Q25. Why does this not increment?
```bash
x=5
x+1
```

**Trap:**
No arithmetic context.

**Detailed Explanation:**
- Bash treats `x+1` as a command name.
- It looks for a program named `x+1` in your PATH.
- **Fix:** Use arithmetic expansion: `x=$((x+1))`.

---

## Q26. What is wrong?
```bash
echo "file is $file"
```

**Trap:**
Nothing wrong → trick question.

**Detailed Explanation:**
- This is valid syntax.
- It demonstrates that quoting is correctly used, preventing word splitting on `$file` inside the string.

---

## Q27. Why is this broken?
```bash
for i in $(seq 1 10)
```

**Trap:**
Command substitution overhead.

**Detailed Explanation:**
- It works, but it's slower and uses an external command (`seq`).
- **Optimization:** Use Bash built-in brace expansion: `for i in {1..10}`.

---

## Q28. What happens?
```bash
rm -rf /*
```

**Trap:**
Dangerous system destruction.

**Detailed Explanation:**
- `/*` matches every file and directory in the root.
- It attempts to delete the entire operating system.
- **DO NOT RUN.**

---

## Q29. Why does this fail?
```bash
if test $a -eq 5
```

**Trap:**
Unquoted variable.

**Detailed Explanation:**
- `test` is the command equivalent to `[`.
- If `$a` is empty, it becomes `test -eq 5`, which is a syntax error.
- **Fix:** Quote it: `if test "$a" -eq 5`.

---

## Q30. What is output?
```bash
echo $((2+3*4))
```

**Trap:**
Operator precedence.

**Detailed Explanation:**
- Bash arithmetic follows standard math rules (PEMDAS).
- Multiplication (`*`) happens before addition (`+`).
- `3 * 4` = 12. `2 + 12` = 14.
- Output: `14`.

---

## Q31. Why is this wrong?
```bash
[ $a -eq $b ]
```

**Trap:**
String vs numeric confusion.

**Detailed Explanation:**
- While `-eq` handles numeric comparison, unquoted variables are dangerous.
- If variables are empty, syntax errors occur.
- If variables contain strings (e.g., "abc"), errors occur.
- **Fix:** Quote variables: `[ "$a" -eq "$b" ]`.

---

## Q32. What happens?
```bash
echo "Hello" > file.txt > file2.txt
```

**Trap:**
Second redirection overwrites first.

**Detailed Explanation:**
- Bash processes redirections from left to right.
- It opens `file.txt` for writing.
- Then it opens `file2.txt` for writing.
- "Hello" is written to the last file redirected (`file2.txt`).
- `file.txt` will be truncated (emptied) but empty.

---

## Q33. Why does this fail?
```bash
var= hello
```

**Trap:**
Space invalid assignment.

**Detailed Explanation:**
- Bash interprets this as: Set `var` to empty string, then run command `hello`.
- The space disallows assignment in that manner.
- **Fix:** `var="hello"` or `var=hello` (no spaces).

---

## Q34. What is wrong?
```bash
if [ "$a" = "$b" ]
then echo yes
```

**Trap:**
Missing `fi`.

**Detailed Explanation:**
- Every `if` statement must be closed with `fi`.
- This code results in a syntax error "unexpected end of file".

---

## Q35. Why is this slow?
```bash
cat file | while read line
```

**Trap:**
Useless cat.

**Detailed Explanation:**
- `cat` creates a subprocess just to feed the file to the pipe.
- It is slower and uses more resources.
- **Fix:** Redirect directly: `while read line; do ...; done < file`.

---

## Q36. What happens?
```bash
echo *
```

**Trap:**
Filename expansion (globbing).

**Detailed Explanation:**
- `*` is a wildcard that expands to all filenames in the current directory.
- `echo *` prints all filenames as a space-separated string.
- If no files exist, it prints literal `*` (unless specific options are set).

---

## Q37. Why is this dangerous?
```bash
chmod -R 777 /
```

**Trap:**
Full system permission exposure.

**Detailed Explanation:**
- Recursively sets world-read-write-execute permissions on the entire filesystem.
- This destroys security, allowing any user to modify system files.
- **DO NOT RUN.**

---

## Q38. What is wrong?
```bash
find . -name *.txt
```

**Trap:**
Globbing expands before find runs.

**Detailed Explanation:**
- The shell expands `*.txt` *before* passing arguments to `find`.
- If files exist (e.g., `a.txt`, `b.txt`), the command becomes `find . -name a.txt b.txt`.
- This is invalid syntax for `find`.
- **Fix:** Quote the pattern: `find . -name "*.txt"`.

---

## Q39. Why does this fail?
```bash
read -p "Enter: " $var
```

**Trap:**
Wrong variable usage.

**Detailed Explanation:**
- `read` expects the **name** of the variable, not the variable expansion.
- `$var` expands to the *value* inside var.
- **Fix:** `read -p "Enter: " var` (no `$`).

---

## Q40. What happens?
```bash
x=5; x=$x+1
```

**Trap:**
String concatenation not arithmetic.

**Detailed Explanation:**
- `$x+1` performs string concatenation.
- `x` becomes "5+1" (the literal string).
- **Fix:** Use arithmetic: `x=$((x+1))`.

---

## Q41. Why is this wrong?
```bash
if [ 1 < 2 ]
```

**Trap:**
Redirect symbol interpreted.

**Detailed Explanation:**
- Inside `[ ]`, `<` is treated as a file redirection operator.
- It tries to read input from a file named `2`.
- **Fix:** Escape it `[ 1 \< 2 ]` or use `[[ 1 < 2 ]]`.

---

## Q42. What is output?
```bash
echo "a\nb"
```

**Trap:**
No newline interpretation.

**Detailed Explanation:**
- By default, `echo` treats `\n` as literal characters, not a newline.
- Output: `a\nb`.
- **Fix:** Use `echo -e "a\nb"` or `printf "a\nb\n"`.

---

## Q43. Why does this fail?
```bash
for i in $(cat file.txt)
```

**Trap:**
Word splitting.

**Detailed Explanation:**
- Splits content by spaces/newlines.
- If lines contain spaces, the loop iterates over words, not lines.

---

## Q44. What happens?
```bash
: > file.txt
```

**Trap:**
Truncates file silently.

**Detailed Explanation:**
- `:` is a "no-op" command (does nothing, returns true).
- `> file.txt` redirects output to the file, truncating it (emptying it).
- This is a standard way to empty a file without deleting it.

---

## Q45. Why is this unsafe?
```bash
rm -rf $1
```

**Trap:**
Missing quotes = disaster.

**Detailed Explanation:**
- If the script argument `$1` is empty, it runs `rm -rf` (which fails safely usually).
- If `$1` is a path with spaces, it breaks.
- **Fix:** `rm -rf "$1"`.

---

## Q46. What does this do?
```bash
set -e
```

**Trap:**
Script exits on any error.

**Detailed Explanation:**
- This setting makes the script exit immediately if any command returns a non-zero status (fails).
- It is best practice for preventing scripts from continuing in a broken state.

---

## Q47. Why is this confusing?
```bash
[ ! $var ]
```

**Trap:**
Negation logic unclear.

**Detailed Explanation:**
- If `$var` is empty, this expands to `[ ! ]`. `[ ! ]` checks if string "!" is non-empty (True).
- This logic is inverted from what is expected (checking if var is empty).
- **Fix:** `[ -z "$var" ]` (is empty) or properly quote/construct logic.

---

## Q48. What happens?
```bash
echo $((10/3))
```

**Trap:**
Integer division truncation.

**Detailed Explanation:**
- Bash arithmetic is integer-only.
- 10 divided by 3 is 3.333...
- Bash truncates the decimal.
- Output: `3`.

---

## Q49. Why is this broken?
```bash
if [[ $a > $b ]]
```

**Trap:**
String comparison not numeric.

**Detailed Explanation:**
- Inside `[[ ]]`, `>` sorts lexicographically (like a dictionary).
- If `a=5` and `b=10`, it checks if "5" comes after "10" (False, because "5" char > "1" char).
- **Fix:** Use arithmetic: `if (( a > b ))` or `-gt`.

---

## Q50. Final trap
```bash
rm -rf $HOME/*
```

**Trap:**
Danger if HOME is unset or wrong.

**Detailed Explanation:**
- If `$HOME` is accidentally unset or empty, this becomes `rm -rf /*` (delete system).
- **Fix:** Quote variables and verify variables before running destructive commands.

---