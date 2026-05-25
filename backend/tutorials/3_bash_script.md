
---

# The Ultimate Bash Scripting Master Guide

## Part 1: Bash Fundamentals

### 1.1 What is Bash?
**Bash (Bourne Again SHell)** is a command processor that typically runs in a text window where the user types commands that cause actions. It is the most common shell for Linux distributions and macOS. It is both a **command language** (interactive) and a **scripting language** (automated).

### 1.2 What is a Shell?
A **Shell** is a macro processor that provides an interface to the Unix/Linux operating system kernel. It takes human-readable commands and translates them into something the kernel can execute.
*   **Kernel:** The core of the OS (manages hardware).
*   **Shell:** The wrapper around the kernel (interprets your commands).

### 1.3 Difference Between Shell, Bash, Terminal, and Command Line
*   **Command Line Interface (CLI):** A generic term for any interface where the user types commands (text-based).
*   **Terminal:** The program (window/frame) that allows you to interact with the shell. It is the "hardware" or emulator.
*   **Shell:** The program running inside the terminal that actually interprets your text.
*   **Bash:** A specific *type* of shell. Others include `zsh`, `sh`, `ksh`, and `fish`.

### 1.4 Why Bash Scripting is Important
1.  **Automation:** Eliminate repetitive tasks (backups, log rotation).
2.  **System Administration:** Manage servers, users, and permissions at scale.
3.  **Portability:** Bash scripts run on almost any Unix-like system without installing extra dependencies (unlike Python or Node.js).
4.  **DevOps Foundation:** Essential for CI/CD pipelines, Docker entry points, and Kubernetes init containers.

### 1.5 Real-World Use Cases
*   Automating server backups to AWS S3.
*   Rotating and archiving application logs.
*   Setting up development environments (installing packages, configuring `.env` files).
*   Monitoring CPU/Memory and sending alerts.
*   Batch processing image resizing or file conversion.

---

## Part 2: Bash Syntax in Detail

### 2.1 Creating a Script File
A Bash script is a plain text file.
```bash
touch my_script.sh
```

### 2.2 The Shebang (`#!`)
The first line of a script tells the system which interpreter to use.
```bash
#!/bin/bash
```
*   `#!`: The "shebang" or "hashbang".
*   `/bin/bash`: The absolute path to the Bash executable.

### 2.3 Making Scripts Executable
By default, text files are not executable. You must change permissions.
```bash
chmod +x my_script.sh
```

### 2.4 Running Scripts
1.  **Direct Execution:** `./my_script.sh` (Requires execute permission).
2.  **Explicit Interpreter:** `bash my_script.sh` (Does not require execute permission, useful for debugging).
3.  **Source:** `source my_script.sh` or `. my_script.sh` (Runs in the *current* shell context, affecting current variables/environment).

### 2.5 Comments
Comments are ignored by the interpreter.
```bash
# This is a single-line comment
: '
This is a multi-line comment used rarely.
'
```

### 2.6 Variables
Bash variables are untyped (treated as strings by default unless forced to be numbers).

**Naming Rules:**
1.  Start with a letter or underscore (`_`).
2.  No spaces around the assignment operator (`=`).
3.  Case-sensitive (convention: uppercase for env vars, lowercase for local vars).

**Syntax:**
```bash
variable_name=value
```

### 2.7 Types of Variables

**A. Environment Variables:**
System-wide variables available to all child processes.
```bash
echo $HOME
echo $USER
echo $PATH
```

**B. User-Defined Variables:**
Created by the user.
```bash
name="John Doe"
age=30
echo "My name is $name and I am $age."
```
*Common Mistake:* Putting spaces around `=` (e.g., `name = "John"` will fail).

### 2.8 Special Variables (The Hero Tools)

| Variable | Description | Example Use |
| :--- | :--- | :--- |
| `$0` | The name of the script itself. | Usage messages: `Usage: $0 [options]` |
| `$1` - `$9` | The first 9 arguments passed to the script. | `./script.sh arg1` -> `$1` is "arg1" |
| `$#` | The number of arguments passed. | Check if arguments exist: `if [ $# -eq 0 ]` |
| `$@` | All arguments as separate quoted strings. | Looping args: `for arg in "$@"` |
| `$*` | All arguments as a single string. | Rarely used; prefer `$@`. |
| `$?` | Exit status of the last command (0=Success, non-zero=Failure). | Error handling. |
| `$$` | Process ID (PID) of the current script. | Creating unique temp files: `file_$$.tmp` |
| `$!` | PID of the last background command. | Managing background jobs. |

---

## Part 3: Data and Operations

### 3.1 Strings
**Definition:** A sequence of characters.

**Concatenation:**
```bash
a="Hello"
b="World"
c="$a, $b!"
echo $c # Output: Hello, World!
```

**String Length:**
```bash
str="Hello"
echo ${#str} # Output: 5
```

**Substring Extraction:**
Syntax: `${string:start:length}` (Start is 0-indexed).
```bash
str="Bash Scripting"
echo ${str:0:4} # Output: Bash
echo ${str:5}   # Output: Scripting (from index 5 to end)
```

### 3.2 Numbers
Bash does not handle floating-point numbers natively. Use integers only (or use `bc` calculator).

### 3.3 Arithmetic Operations
Prefer the `$(( ... ))` syntax (Arithmetic Expansion).

```bash
a=10
b=3

sum=$((a + b))
diff=$((a - b))
mul=$((a * b))
div=$((a / b))   # Integer division (3)
mod=$((a % b))   # Modulo (1)
pow=$((2**3))    # Exponent (8)

echo "Sum: $sum"
```

### 3.4 Arrays (Indexed)
Lists of values.
```bash
# Declaration
arr=("Apple" "Banana" "Cherry")

# Access single element (Index 0)
echo ${arr[0]} # Output: Apple

# Access all elements
echo ${arr[@]}

# Length of array
echo ${#arr[@]} # Output: 3

# Add element
arr+=("Date")

# Loop through
for fruit in "${arr[@]}"; do
    echo $fruit
done
```

### 3.5 Associative Arrays (Key-Value)
Must be declared explicitly.
```bash
declare -A user

user[name]="Alice"
user[age]=25
user[city]="New York"

echo ${user[name]} # Output: Alice

# Looping keys
for key in "${!user[@]}"; do
    echo "$key: ${user[$key]}"
done
```

---

## Part 4: Conditional Statements

### 4.1 The `test` Command (`[ ]` and `[[ ]]`)
*   `[ ]`: Traditional test command (POSIX standard). Prone to parsing errors with complex strings.
*   `[[ ]]`: Modern Bash extension. Safer, handles spaces and regex better. **Use this.**

### 4.2 File Tests
*   `-f`: Is it a file?
*   `-d`: Is it a directory?
*   `-e`: Does it exist?
*   `-r`, `-w`, `-x`: Is it readable, writable, executable?
*   `-s`: Is the file non-empty?

**Syntax and Example:**
```bash
file="data.txt"

if [[ -f $file ]]; then
    echo "File exists."
elif [[ -d $file ]]; then
    echo "It is a directory."
else
    echo "File not found."
fi
```

### 4.3 Numeric Comparisons
Use inside `(( ))` or with flags in `[[ ]]`.
*   `-eq`: Equal
*   `-ne`: Not equal
*   `-gt`: Greater than
*   `-lt`: Less than
*   `-ge`: Greater than or equal
*   `-le`: Less than or equal

```bash
age=20

if (( age >= 18 )); then
    echo "Adult"
else
    echo "Minor"
fi
```

### 4.4 String Comparisons
*   `==`: Equal
*   `!=`: Not equal
*   `-z`: String is empty
*   `-n`: String is not empty

```bash
name=""

if [[ -z $name ]]; then
    echo "Name cannot be empty."
fi
```

### 4.5 `case` Statement
Cleaner alternative to long `if-elif` chains.

**Syntax:**
```bash
case $variable in
    pattern1)
        commands
        ;;
    pattern2)
        commands
        ;;
    *)
        default commands
        ;;
esac
```

**Real-World Example (Service Control):**
```bash
action=$1

case $action in
    start)
        echo "Starting service..."
        ;;
    stop)
        echo "Stopping service..."
        ;;
    restart)
        echo "Restarting service..."
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
```

**Common Mistake:** Forgetting the `;;` terminator.

---

## Part 5: Loops

### 5.1 `for` Loop
**List Form:**
```bash
for item in 1 2 3 4 5; do
    echo "Number: $item"
done
```

**C-Style Form:**
```bash
for (( i=0; i<5; i++ )); do
    echo "Counter: $i"
done
```

**Looping Files:**
```bash
for file in *.txt; do
    mv "$file" "${file%.txt}.bak"
done
```

### 5.2 `while` Loop
Runs as long as the condition is true.
```bash
count=1
while [[ $count -le 5 ]]; do
    echo "Count: $count"
    ((count++))
done
```

**Reading a file line by line:**
```bash
while IFS= read -r line; do
    echo "Processing: $line"
done < "data.txt"
```
*Note: `IFS=` prevents trimming leading/trailing whitespace.*

### 5.3 `until` Loop
Runs until the condition becomes true.
```bash
count=1
until [[ $count -gt 5 ]]; do
    echo $count
    ((count++))
done
```

### 5.4 Loop Control
*   `break`: Exit the loop immediately.
*   `continue`: Skip the current iteration and go to the next.

---

## Part 6: Functions

Functions allow code reuse.

### 6.1 Defining Functions
Two syntaxes:
```bash
function greet() {
    echo "Hello"
}

greet() {
    echo "Hello"
}
```

### 6.2 Parameters
Functions do not declare parameters in the header. They use `$1`, `$2` relative to the function call.

```bash
add() {
    result=$(($1 + $2))
    echo $result
}

sum=$(add 5 10)
echo "Sum is $sum"
```

### 6.3 Scope (Local vs Global)
Variables inside functions are global by default. Use `local` to restrict scope.

```bash
name="Global"

change_name() {
    local name="Local"
    echo "Inside: $name"
}

change_name
echo "Outside: $name"
# Output:
# Inside: Local
# Outside: Global
```

---

## Part 7: Input and Output

### 7.1 User Input (`read`)
```bash
echo "Enter your name:"
read username
echo "Hello, $username"

# Silent input (for passwords)
read -s -p "Enter Password: " pass
```

### 7.2 Redirection
*   `>`: Redirect stdout to a file (Overwrite).
*   `>>`: Redirect stdout to a file (Append).
*   `2>`: Redirect stderr.
*   `&>`: Redirect both stdout and stderr.

```bash
# Save output and errors to separate files
grep "error" /var/log/syslog > results.txt 2> errors.log
```

### 7.3 Pipes (`|`)
Pass stdout of command A to stdin of command B.
```bash
cat /etc/passwd | grep "bash" | sort
```

---

## Part 8: File Handling

### 8.1 Check File Existence
```bash
if [[ -f "config.yml" ]]; then
    source config.yml
else
    echo "Config missing!"
    exit 1
fi
```

### 8.2 Reading and Writing
**Write:**
```bash
echo "Log Entry: $(date)" >> app.log
```

**Read/Parse:**
Use `while read` loops or `cat`.

### 8.3 Permissions
The `chmod` command in script:
```bash
chmod 755 start.sh
```

---

## Part 9: Important Linux Commands in Scripts

### 9.1 `grep` (Search Text)
*   `grep "error" file`: Find string.
*   `grep -r "error" dir/`: Recursive.
*   `grep -v "success"`: Invert match (exclude).
*   `grep -i "Error"`: Case insensitive.

### 9.2 `sed` (Stream Editor)
Find and replace.
```bash
# Replace 'foo' with 'bar' in file (in-place)
sed -i 's/foo/bar/g' file.txt
```

### 9.3 `awk` (Text Processing)
Great for columns.
```bash
# Print the first column of a file
awk '{print $1}' file.txt

# Print users with UID > 1000 from /etc/passwd
awk -F: '$3 > 1000 {print $1}' /etc/passwd
```

### 9.4 `find` (Search Files)
```bash
# Find all .log files larger than 100MB and delete them
find /var/log -name "*.log" -size +100M -exec rm {} \;
```

### 9.5 `cut` (Remove Sections)
```bash
# Cut the first 4 characters of every line
cut -c1-4 file.txt
```

---

## Part 10: Advanced Bash Topics

### 10.1 Error Handling
**Exit Codes:**
`0` means success. Anything else is an error.
```bash
mkdir /root/test_dir
if [[ $? -ne 0 ]]; then
    echo "Failed to create directory. Are you root?"
    exit 1
fi
```

**Strict Mode (The "Holy Trinity"):**
Put this at the top of scripts:
```bash
set -euo pipefail
```
*   `set -e`: Exit immediately if a command fails.
*   `set -u`: Treat unset variables as an error.
*   `set -o pipefail`: Return the exit code of the first failed command in a pipe.

### 10.2 `trap` (Cleanup)
Execute code when the script exits (even if interrupted by Ctrl+C).
```bash
cleanup() {
    echo "Cleaning up temp files..."
    rm -f /tmp/temp_$$
}

trap cleanup EXIT
```

### 10.3 Debugging
1.  `bash -x script.sh`: Prints every command before executing it.
2.  `set -x` / `set +x`: Toggle debugging inside specific blocks.

### 10.4 Process Substitution
Treat output of a command as a temporary file.
```bash
diff <(sort file1.txt) <(sort file2.txt)
```

---

## Part 11: Security and Best Practices

1.  **Quote Variables:** Always use `"$var"` to prevent word splitting and globbing issues.
    *   *Bad:* `rm $file` (If file is "My File.txt", it deletes "My" and "File.txt").
    *   *Good:* `rm "$file"`.
2.  **Avoid `eval`:** It allows arbitrary code execution.
3.  **Validate Input:**
    ```bash
    if [[ ! $input =~ ^[a-zA-Z0-9]+$ ]]; then
        echo "Invalid input!"
        exit 1
    fi
    ```
4.  **Use `mktemp` for temporary files:** Do not hardcode temp file names like `/tmp/temp.txt`.

---

## Part 12: Real-World Projects

### Project 1: Automated Backup Script
```bash
#!/bin/bash
# Backup important directories

SOURCE="/home/user/documents"
DEST="/mnt/backup"
DATE=$(date +%Y-%m-%d)
LOG="backup.log"

echo "Starting backup: $DATE" >> $LOG

# Create compressed archive
tar -czf "$DEST/backup_$DATE.tar.gz" "$SOURCE" 2>> $LOG

if [[ $? -eq 0 ]]; then
    echo "Backup successful." >> $LOG
else
    echo "Backup FAILED." >> $LOG
    exit 1
fi
```

### Project 2: Log Analyzer
Count 404 errors in the last hour.
```bash
#!/bin/bash
LOG_FILE="/var/log/nginx/access.log"
TIME=$(date -d '1 hour ago' +"%H:%M")

echo "404 errors since $TIME:"
grep "404" "$LOG_FILE" | grep "$TIME" | wc -l
```

---

## Part 13: Exercises with Solutions

**Exercise 1:** Write a script that takes a directory name as an argument and creates it if it doesn't exist.
**Solution:**
```bash
#!/bin/bash
dir=$1
if [[ -z $dir ]]; then echo "Provide a directory"; exit 1; fi
if [[ ! -d $dir ]]; then mkdir -p "$dir"; echo "Created $dir"; fi
```

**Exercise 2:** Write a script to rename all `.jpeg` files in a folder to `.jpg`.
**Solution:**
```bash
#!/bin/bash
for file in *.jpeg; do
    mv "$file" "${file%.jpeg}.jpg"
done
```

---

## Part 14: Interview Questions & Cheat Sheet

### 50 Interview Questions (Selected Highlights)

1.  **What is the difference between `[ ]` and `[[ ]]`?**
    `[[ ]]` is a bash keyword that handles word splitting and path name expansion automatically. It is safer and supports regex (`=~`). `[ ]` is a synonym for the `test` command and is POSIX standard.
2.  **What does `set -e` do?**
    It causes the script to exit immediately if any command exits with a non-zero status.
3.  **How do you get the length of a string?**
    `${#string}`.
4.  **Explain `$@` vs `$*`.**
    `$@` preserves arguments as separate strings (arrays). `$*` joins all arguments into a single string.
5.  **What is a Shebang?**
    The `#!` at the start of a script that specifies the interpreter path.
6.  **How do you debug a bash script?**
    Run `bash -x script.sh` or add `set -x` inside.
7.  **What is the exit code for success?**
    0.
8.  **How do you declare an associative array?**
    `declare -A array_name`.
9.  **Difference between `>` and `>>`.**
    `>` overwrites the file; `>>` appends to the file.
10. **How to check if a variable is empty?**
    `[[ -z $var ]]`.

*(Full list covers topics like signal handling, `exec`, subshells `()`, and variable scope.)*

### Bash Cheat Sheet

**Variables:**
`var=val` | `echo $var` | `read var` | `${var:-default}`

**Tests:**
`[[ -f file ]]` (File) | `[[ -d dir ]]` (Dir) | `[[ -z str ]]` (Empty) | `(( n > 5 ))` (Num)

**Loops:**
`for i in {1..5}` | `while true` | `break` | `continue`

**Parameters:**
`$1` (Arg) | `$#` (Count) | `$@` (All Args) | `$?` (Exit Code) | `$$` (PID)

**Redirection:**
`>` (Out) | `2>` (Err) | `&>` (All) | `|` (Pipe) | `<` (In)

**Expansion:**
`${var%pattern}` (Remove from end) | `${var#pattern}` (Remove from start) | `${var/old/new}` (Replace)

---

### Bash Project Ideas
1.  **Server Health Check:** Script to check CPU, RAM, and Disk usage. Send email if usage > 90%.
2.  **Passgen:** A password generator script accepting length as an argument.
3.  **File Organizer:** Script that moves files into folders based on extension (e.g., `.jpg` to `/Images`, `.mp3` to `/Music`).
4.  **Batch Image Resizer:** Using `imagemagick` within a loop to resize all images in a folder.



This section expands the handbook to cover two critical advanced domains: **DevOps/Full-Stack Development (MERN)** and **Cybersecurity/Ethical Hacking**.

---

## Part 15: Bash for MERN Stack Developers

In a modern web development workflow, Bash is the glue that holds your development, build, and deployment pipelines together.

### 1. Environment & Project Scaffolding
Instead of manually creating folders and files for a new Express/React project, automate it.

**Real-World Use Case:** You frequently start new microservices and need a standard directory structure.

**Script: `create_mern_structure.sh`**
```bash
#!/bin/bash

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./create_mern_structure.sh <project_name>"
    exit 1
fi

echo "Creating MERN project structure for: $PROJECT_NAME..."

# Create Root Directories
mkdir -p "$PROJECT_NAME"/{server,client}

# Create Server Structure (Node/Express)
mkdir -p "$PROJECT_NAME/server"/{config,models,routes,controllers,middleware,utils}

# Create Standard Files
touch "$PROJECT_NAME/server/app.js"
touch "$PROJECT_NAME/server/.env"
touch "$PROJECT_NAME/server/.gitignore"
echo "node_modules" >> "$PROJECT_NAME/server/.gitignore"

# Initialize Node Project
cd "$PROJECT_NAME/server" && npm init -y

echo "Project $PROJECT_NAME created successfully!"
echo "Next steps: cd $PROJECT_NAME/server && npm install express mongoose dotenv"
```

### 2. MongoDB Database Backups (Automation)
In the MERN stack, data is king. You need automated backups of your MongoDB database.

**Real-World Use Case:** A cron job that runs every night to backup your production database.

**Script: `mongo_backup.sh`**
```bash
#!/bin/bash

# Configuration
DB_NAME="my_mern_db"
BACKUP_DIR="/backups/mongodb"
MONGO_URI="mongodb://localhost:27017/$DB_NAME" # Or your Atlas URI

# Timestamp
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_PATH="$BACKUP_DIR/$DB_NAME_$DATE"

echo "Starting backup for $DB_NAME..."

# Create Directory
mkdir -p "$BACKUP_PATH"

# Use mongodump
# For local DB:
mongodump --db "$DB_NAME" --out "$BACKUP_PATH"

# For remote/Atlas (using URI):
# mongodump --uri="$MONGO_URI" --out "$BACKUP_PATH"

# Compress the backup
tar -czf "$BACKUP_PATH.tar.gz" -C "$BACKUP_DIR" "$DB_NAME_$DATE"

# Remove uncompressed folder
rm -rf "$BACKUP_PATH"

# Optional: Delete backups older than 7 days
find "$BACKUP_DIR" -type f -name "*.tar.gz" -mtime +7 -exec rm {} \;

echo "Backup complete: $BACKUP_PATH.tar.gz"
```

### 3. Deployment Automation (CI/CD)
When you push code to production, you need to pull changes, install dependencies, build the React frontend, and restart the Node server.

**Script: `deploy_mern.sh`**
```bash
#!/bin/bash
set -e # Exit on error

PROJECT_DIR="/var/www/my-mern-app"
REPO_URL="https://github.com/user/repo.git"

echo "Starting Deployment..."

cd "$PROJECT_DIR"

# 1. Pull Latest Code
echo "Pulling latest code..."
git pull origin main

# 2. Backend Setup
echo "Installing backend dependencies..."
cd server
npm install
npm audit fix

# 3. Frontend Setup (React)
echo "Building frontend..."
cd ../client
npm install
npm run build

# 4. Restart Services (using PM2 for Node)
echo "Restarting server..."
cd ../server
pm2 restart my-app-api

echo "Deployment Successful!"
```

---

## Part 16: Bash for Ethical Hacking & Security

Bash is the native language of penetration testing. It allows you to write quick scripts to scan networks, enumerate users, or analyze logs.

> **⚠️ DISCLAIMER:** These scripts are for educational purposes and authorized security testing only. Unauthorized scanning or hacking of systems you do not own is illegal.

### 1. Reconnaissance: Network Port Scanner
You can write a simple port scanner using Bash's built-in `/dev/tcp` pseudo-device. This is useful when you don't have `nmap` installed on a target machine.

**Concept:** Try to open a TCP connection to a specific port. If successful, the port is open.

**Script: `simple_port_scan.sh`**
```bash
#!/bin/bash

TARGET=$1

if [ -z "$TARGET" ]; then
    echo "Usage: ./scan.sh <IP>"
    exit 1
fi

echo "Scanning common ports on $TARGET..."

# Common ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 21 (FTP)
for port in 21 22 80 443 3306 8080; do
    # /dev/tcp/host/port
    # syntax: (echo > /dev/tcp/$TARGET/$port) &
    # The & makes it run in background, we wait a split second then check
    
    (echo > /dev/tcp/$TARGET/$port) >/dev/null 2>&1 &
    PID=$!
    
    # Wait briefly for connection
    sleep 0.2
    
    # Check if process is still running or completed successfully
    if kill -0 $PID 2>/dev/null; then
        # If process is still running, it might be hanging (filtered)
        # A quick connect usually returns immediately
        wait $PID
        STATUS=$?
        if [ $STATUS -eq 0 ]; then
            echo "Port $port is OPEN"
        fi
    else
        # Process finished quickly, check exit code
        wait $PID
        if [ $? -eq 0 ]; then
            echo "Port $port is OPEN"
        fi
    fi
done

echo "Scan complete."
```

### 2. Log Analysis: Detecting Brute-Force Attacks
System administrators use Bash to parse logs and find attackers.

**Real-World Use Case:** Checking your SSH log to find IP addresses that are trying to guess passwords.

**Script: `ssh_intruder_check.sh`**
```bash
#!/bin/bash

LOG_FILE="/var/log/auth.log"

echo "Analyzing SSH login attempts..."

# Search for "Failed password"
# awk prints the source IP (usually the 11th column in standard auth.log format, adjust if needed)
# sort and uniq count occurrences

echo "Top 10 Offending IPs:"
grep "Failed password" "$LOG_FILE" | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -10

echo "------------------------------------------------"
echo "Total Failed Attempts: $(grep -c "Failed password" "$LOG_FILE")"
```

### 3. Forensics: Finding Sensitive Data Leaks
Attackers (and auditors) look for files that might contain passwords or keys left in the wrong places.

**Script: `find_secrets.sh`**
```bash
#!/bin/bash

SEARCH_DIR="/var/www"

echo "Searching for potential secrets in $SEARCH_DIR..."

# Find .env files
echo "Found .env files:"
find "$SEARCH_DIR" -name ".env"

# Find files containing "password" string (case insensitive)
echo "Files containing 'password':"
grep -ril "password" "$SEARCH_DIR" 2>/dev/null

# Check permissions (files readable by 'others' are risky)
echo "Files readable by everyone:"
find "$SEARCH_DIR" -type f -perm -0004 -ls
```

### 4. Defense: Automated IP Banning (Simple Fail2Ban)
A script to automatically ban IPs that hit your server too many times.

**Script: `ban_attackers.sh`**
```bash
#!/bin/bash

# Get IPs with more than 5 failed attempts
BANNED_IPS=$(grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | awk '$1 > 5 {print $2}')

for ip in $BANNED_IPS; do
    # Check if already banned
    if ! sudo iptables -C INPUT -s $ip -j DROP 2>/dev/null; then
        echo "Banning IP: $ip"
        sudo iptables -A INPUT -s $ip -j DROP
    else
        echo "IP $ip is already banned."
    fi
done
```

---

## Summary of Advanced Uses

| Domain | Key Bash Concepts Used | Real World Application |
| :--- | :--- | :--- |
| **MERN/DevOps** | Pipes (`|`), Redirection (`>`), Variables, Cron Jobs | Automating `npm` builds, DB Backups, Env setup. |
| **Hacking/Sec** | `/dev/tcp`, `grep`, `awk`, `iptables`, `find` | Port scanning, Log forensics, Automated banning. |

