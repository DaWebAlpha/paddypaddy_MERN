# Production-Grade Bash Reference Manual

## 1: Variables
### Core Concepts
Variables in Bash are untyped by default, treated as strings, unless explicitly declared with attributes using `declare` or `typeset`. Unlike compiled languages, variable assignment in Bash requires no spaces around the equals sign.

*   **Scope:**
    *   **Global:** Default. Visible to the entire script and any functions called.
    *   **Local:** Defined inside functions using the `local` keyword. Scoped to the function block. **Critical** for preventing side effects.
    *   **Environment:** Variables exported via `export` are copied into the environment block of child processes.
*   **Attributes:** The `declare` builtin enforces types or constraints:
    *   `-r`: Read-only (constant).
    *   `-i`: Integer (arithmetic evaluation enabled).
    *   `-a`: Indexed array.
    *   `-A`: Associative array (Bash 4.0+).
*   **Performance:** Integers declared with `declare -i` process arithmetic slightly faster than string variables evaluated inside `(( ))`.

### Syntax & Progressive Use Cases
**1. Easy: Basic Assignment & Usage**
```bash
#!/bin/bash
# No spaces around '='
filename="data.csv"
count=5

echo "Processing $filename"
```

**2. Intermediate: Quoting, Defaults, and Scope**
```bash
#!/bin/bash
# Use {} to disambiguate variable names
output_dir="/var/log/app"
logfile="${output_dir}/app.log"

# Default values if variable is unset or null
config_path="${1:-/etc/default.conf}"

function process() {
  # Local scope prevents overwriting global 'count'
  local count=0
  count=$((count + 1))
}
```

**3. Advanced: Indirect References and Namerefs**
```bash
#!/bin/bash
# Indirect expansion (referencing variable by name)
var_name="USER"
echo "Value: ${!var_name}" # Prints the value of $USER

# Nameref (Bash 4.3+) - useful for passing arrays to functions
declare -n list_ref="my_array"
list_ref[0]="new_value" # Modifies 'my_array' directly
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

# --- Configuration Management ---
# Use readonly for immutable global configuration
declare -r APP_NAME="DataProcessor"
declare -r MAX_RETRIES=3

# Integer declaration for math operations
declare -i current_retry=0

function initialize_environment() {
  local config_file="$1"
  
  # Check if file exists using variable
  if [[ ! -f "$config_file" ]]; then
    echo "ERROR: Config missing at $config_file" >&2
    return 1
  fi
  
  # Export for child processes (e.g., subshells or binaries)
  export APP_CONFIG_PATH="$config_file"
  echo "Initialized $APP_NAME with $config_file"
}

# Usage
initialize_environment "config.yaml"
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** `command not found: var` or logic errors.
    *   **Why:** Spaces used in assignment (`var = "value"`). Bash interprets `var` as a command.
    *   **Fix:** Remove spaces: `var="value"`.
2.  **Bug:** Variable value is empty/globbed unexpectedly.
    *   **Why:** Unquoted expansion (`echo $var`). Bash performs word splitting and filename expansion (globbing) on unquoted variables.
    *   **Fix:** Always quote variable expansions (`echo "$var"`).

---

## 2: Conditions
### Core Concepts
Bash conditionals rely on **exit codes**. An exit code of `0` signifies success (True), while `1-255` signifies failure (False).

*   **Test Constructs:**
    *   `[ ]` (POSIX `test`): Legacy, portable, but parsing is tricky. Requires escaping operators.
    *   `[[ ]]` (Bash/Ksh/Zsh): **Preferred.** It is a keyword, not a command. It handles word splitting and globbing automatically and supports regex (`=~`) and logical operators (`&&`, `||`).
*   **Numeric Context:** `(( ))` is optimized for arithmetic. It returns 0 (true) if the result is non-zero.
*   **Case Statements:** Efficient for multiple pattern matches, acting like a jump table.

### Syntax & Progressive Use Cases
**1. Easy: Basic File and String Checks**
```bash
#!/bin/bash
file="/etc/hosts"

# Check existence
if [[ -f "$file" ]]; then
  echo "$file exists."
fi

# String comparison
status="running"
if [[ "$status" == "running" ]]; then
  echo "Service is active."
fi
```

**2. Intermediate: Logic Combos and Numeric Checks**
```bash
#!/bin/bash
age=25
country="US"

# Numeric comparison in arithmetic context
if (( age >= 21 )) && [[ "$country" == "US" ]]; then
  echo "Allowed entry."
fi

# Combined logic in [[ ]]
if [[ -r "data.txt" && -w "data.txt" ]]; then
  echo "File is readable and writable."
fi
```

**3. Advanced: Regex and Pattern Matching**
```bash
#!/bin/bash
email="admin@example.com"

# Regex matching =~
if [[ "$email" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$ ]]; then
  echo "Valid email format"
fi

# Globbing in case
file_type="image.png"
case "$file_type" in
  *.jpg|*.png) echo "Image file" ;;
  *.log)       echo "Log file" ;;
  *)           echo "Unknown type" ;;
esac
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

function check_system_state() {
  local min_memory_kb=$1
  
  # Check available memory (Linux generic via proc)
  local mem_available
  mem_available=$(awk '/MemAvailable/ {print $2}' /proc/meminfo)
  
  # Handle case where MemAvailable might be missing (older kernels)
  if [[ -z "$mem_available" ]]; then
    # Fallback to MemFree (less accurate but portable)
    mem_available=$(awk '/MemFree/ {print $2}' /proc/meminfo)
  fi

  if (( mem_available < min_memory_kb )); then
    echo "CRITICAL: Low memory. Available: ${mem_available}KB"
    return 1
  fi
  
  return 0
}

# Usage: Check if memory is below 1GB (1048576KB)
if ! check_system_state 1048576; then
  exit 1
fi
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** `[: too many arguments` error.
    *   **Why:** Using `[ ]` with unquoted variables that expand to multiple words (`[ $unquoted_var == "val" ]`).
    *   **Fix:** Use `[[ ]]` (preferred) or quote variables strictly inside `[ ]`.
2.  **Bug:** String comparison acts weirdly (e.g., `-eq` used for strings).
    *   **Why:** Confusing string operators (`=`) with numeric operators (`-eq`). `-eq` treats operands as integers.
    *   **Fix:** Use `==` for strings inside `[[ ]]` and `-eq` for numbers inside `(( ))` or `[ ]`.

---

## 3: User Input
### Core Concepts
Scripts interact with users via `read` (stdin) and arguments (positional parameters).

*   **Read Builtin:** Halts execution to accept input.
    *   `-r`: **Essential.** Prevents backslash interpretation (allows paths like `C:\Users`).
    *   `-p`: Prompt.
    *   `-s`: Silent (for passwords).
*   **Select:** A loop construct for generating menus automatically.
*   **Getopts:** The standard tool for parsing command-line flags (options preceded by `-`).

### Syntax & Progressive Use Cases
**1. Easy: Basic Input**
```bash
#!/bin/bash
read -p "Enter your name: " name
echo "Hello, $name"
```

**2. Intermediate: Secure Input and Validation**
```bash
#!/bin/bash
# Silent mode for password
read -s -p "Enter Password: " pass
echo # Newline for formatting

# Validation loop
while true; do
  read -p "Confirm [y/n]: " yn
  case $yn in
    [Yy]*) break ;;
    [Nn]*) exit 0 ;;
    *)     echo "Please answer y or n." ;;
  esac
done
```

**3. Advanced: Flag Parsing with getopts**
```bash
#!/bin/bash
# Usage: script.sh -u user -p port

username="default"
port=8080

while getopts "u:p:h" opt; do
  case $opt in
    u) username="$OPTARG" ;;
    p) port="$OPTARG" ;;
    h) echo "Usage: $0 [-u user] [-p port]"; exit 0 ;;
    *) echo "Invalid option"; exit 1 ;;
  esac
done
shift $((OPTIND -1)) # Remove processed flags

echo "User: $username, Port: $port"
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

function get_valid_input() {
  local prompt="$1"
  local regex="$2"
  local user_input

  while true; do
    read -r -p "$prompt: " user_input
    if [[ "$user_input" =~ $regex ]]; then
      printf "%s" "$user_input"
      return 0
    else
      echo "Invalid format. Please try again." >&2
    fi
  done
}

# Request input matching a project ID format (e.g., PROJ-001)
project_id=$(get_valid_input "Enter Project ID (PROJ-NNN)" "^PROJ-[0-9]{3}$")
echo "Selected Project: $project_id"
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Paths with backslashes break scripts.
    *   **Why:** `read` interprets `\` as an escape character by default.
    *   **Fix:** Always use `read -r`.
2.  **Bug:** `getopts` fails to parse flags on the second run (in a loop).
    *   **Why:** `OPTIND` (the option index) is not reset between calls.
    *   **Fix:** Reset `OPTIND=1` before calling `getopts` again if reusing the loop.

---

## 4: Loops
### Core Concepts
Loops iterate over lists, ranges, or based on exit conditions.

*   **For Loop:** Iterates over a list of words.
    *   **Performance:** `for i in $(cat file)` is **dangerous** (memory/space issues). Use `while read` for files.
*   **While Loop:** Runs as long as the test command returns 0.
*   **Until Loop:** Runs until the test command returns 0 (inverse of while).
*   **Control:** `break` (exit loop), `continue` (skip to next iteration).

### Syntax & Progressive Use Cases
**1. Easy: Standard Iteration**
```bash
#!/bin/bash
# Iterate over a static list
for host in web01 web02 db01; do
  echo "Pinging $host..."
done
```

**2. Intermediate: File Processing and C-Style Loops**
```bash
#!/bin/bash
# C-Style loop for counting
for ((i=0; i<5; i++)); do
  echo "Count $i"
done

# Globbing (safe way to iterate files)
for file in *.txt; do
  echo "Found text file: $file"
done
```

**3. Advanced: Reading Stream Data and Parallel Processing**
```bash
#!/bin/bash
# Reading delimited data
while IFS=: read -r user _ uid _ _ home _; do
  if (( uid >= 1000 )); then
    echo "User: $user, Home: $home"
  fi
done < /etc/passwd
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

# Retry logic with exponential backoff
function retry_command() {
  local max_attempts=5
  local timeout=2
  local attempt=1

  while (( attempt <= max_attempts )); do
    if curl -sf "http://internal-api/health" > /dev/null; then
      echo "API is healthy."
      return 0
    fi
    
    echo "Attempt $attempt failed. Retrying in ${timeout}s..."
    sleep "$timeout"
    timeout=$((timeout * 2)) # Exponential backoff
    ((attempt++))
  done

  echo "Max retries reached. Service unavailable." >&2
  return 1
}

retry_command
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Filenames with spaces are split into multiple loop iterations.
    *   **Why:** Iterating over command output like `for f in $(ls)`.
    *   **Fix:** Use shell globs: `for f in *`. Always quote `"$f"`.
2.  **Bug:** Variable set inside a loop is empty after the loop.
    *   **Why:** Piping into a `while` loop creates a **subshell**. Variable changes are lost when the subshell exits.
    *   **Fix:** Use redirection (`done < file`) or Process Substitution (`done < <(command)`).

---

## 5: Files
### Core Concepts
Bash handles I/O through File Descriptors (FDs).
*   **Standard FDs:** 0 (stdin), 1 (stdout), 2 (stderr).
*   **Redirection:**
    *   `>`: Redirect stdout (overwrite).
    *   `>>`: Redirect stdout (append).
    *   `2>&1`: Redirect stderr to stdout.
    *   `&>`: Redirect both stdout and stderr (Bash shorthand).
*   **Piping:** `|` connects stdout (FD 1) of the left command to stdin (FD 0) of the right command.

### Syntax & Progressive Use Cases
**1. Easy: Basic Redirection**
```bash
#!/bin/bash
# Overwrite file
echo "Log start" > app.log
# Append
echo "New entry" >> app.log
# Redirect errors
grep "root" /etc/shadow 2> /dev/null
```

**2. Intermediate: Redirecting Multiple Streams**
```bash
#!/bin/bash
# Redirect both stdout and stderr to the same file
./complex_task.sh &> output_full.log

# Redirect stdout and stderr separately
./install.sh > stdout.log 2> stderr.log
```

**3. Advanced: Process Substitution and File Descriptors**
```bash
#!/bin/bash
# Use custom File Descriptor (FD 3) for reading
exec 3< /etc/hosts
read -u 3 line
echo "First line: $line"
exec 3<&- # Close FD 3

# Process Substitution (treat output as a file)
diff <(sort file1.txt) <(sort file2.txt)
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="/var/log/deploy.log"

function log() {
  local timestamp
  timestamp=$(date "+%Y-%m-%d %H:%M:%S")
  # Redirect both stdout and stderr of this block to log file AND terminal
  printf "[%s] %s\n" "$timestamp" "$*" | tee -a "$LOG_FILE"
}

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Execute command, capturing output but also streaming it
if ./build.sh 2>&1 | tee -a "$LOG_FILE"; then
  log "Build succeeded."
else
  log "Build failed." # This runs because pipefail is set, or we check PIPESTATUS
fi
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Cannot write to file even with `sudo`.
    *   **Why:** Redirection (`>`) is handled by the shell *before* `sudo` executes.
    *   **Fix:** Use `tee`: `echo "data" | sudo tee /etc/protected_file`.
2.  **Bug:** Pipe fails but script continues (if `set -e` is off).
    *   **Why:** Pipe only returns the exit code of the *last* command.
    *   **Fix:** `set -o pipefail` or check `${PIPESTATUS[0]}`.

---

## 6: Functions
### Core Concepts
Functions organize code into reusable blocks. They are not just "subroutines"; they mimic scripts in behavior.

*   **Declaration:** `function name { ... }` or `name() { ... }`.
*   **Scope:** Variables inside functions are global by default. Use `local` to restrict scope.
*   **Return Values:**
    *   **Exit Code:** `return N` (0-255). Used for success/failure logic.
    *   **Data:** Functions cannot "return" strings like Python. Instead, print to stdout and capture with `var=$(func)`.

### Syntax & Progressive Use Cases
**1. Easy: Basic Definition**
```bash
#!/bin/bash
greet() {
  echo "Hello, $1"
}
greet "World"
```

**2. Intermediate: Local Variables and Return Codes**
```bash
#!/bin/bash
function check_file() {
  local file="$1" # Local scope
  if [[ -f "$file" ]]; then
    return 0 # True/Success
  else
    return 1 # False/Failure
  fi
}

if check_file "/etc/hosts"; then
  echo "File exists."
fi
```

**3. Advanced: Returning Data via Stdout**
```bash
#!/bin/bash
function get_config_value() {
  local key="$1"
  local file="config.ini"
  
  # Grep logic, returning the found value
  grep "^$key=" "$file" | cut -d= -f2
}

# Capture output
db_host=$(get_config_value "hostname")
echo "DB Host: $db_host"
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

# Function to send alerts
# Usage: send_alert "level" "message"
function send_alert() {
  local level="$1"
  local message="$2"
  local recipient="admin@company.com"

  # Only send email if mail command exists
  if command -v mail > /dev/null; then
    echo "$message" | mail -s "[ALERT] $level" "$recipient"
    return 0
  else
    echo "WARN: mail command not found. Alert: $message" >&2
    return 1
  fi
}

# Function performing a cleanup task
function cleanup() {
  local temp_dir="$1"
  if [[ -d "$temp_dir" ]]; then
    rm -rf "$temp_dir"
    echo "Cleaned up $temp_dir"
  fi
}
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Variable modified in function changes global state unexpectedly.
    *   **Why:** Forgetting `local` keyword inside a function.
    *   **Fix:** Always declare function variables with `local`.
2.  **Bug:** Script stops prematurely when a function fails.
    *   **Why:** `set -e` exits on non-zero return codes, even inside functions.
    *   **Fix:** Explicitly handle the return code or append `|| true` if failure is acceptable.

---

## 7: Arguments
### Core Concepts
Arguments passed to a script are accessible via positional parameters.

*   **Parameters:** `$1` to `$9`. Use `${10}` for double-digits.
*   **Special Variables:**
    *   `$#`: Number of arguments.
    *   `$@`: All arguments as separate quoted strings (Preserves spacing).
    *   `$*`: All arguments as a single string.
    *   `$0`: Script name.
*   **Shift:** `shift` moves arguments left (`$2` becomes `$1`). Useful for processing unknown numbers of arguments.

### Syntax & Progressive Use Cases
**1. Easy: Basic Access**
```bash
#!/bin/bash
echo "Script: $0"
echo "First Arg: $1"
echo "Total Args: $#"
```

**2. Intermediate: Iteration and Checks**
```bash
#!/bin/bash
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <file>"
  exit 1
fi

# Loop through all arguments safely
for arg in "$@"; do
  echo "Processing $arg"
done
```

**3. Advanced: Parsing Mixed Arguments (Flags + Files)**
```bash
#!/bin/bash
verbose=0
files=()

# Parse flags and collect files
while [[ $# -gt 0 ]]; do
  case "$1" in
    -v|--verbose)
      verbose=1
      shift
      ;;
    *)
      files+=("$1") # Add to array
      shift
      ;;
  esac
done

echo "Verbose: $verbose"
echo "Files: ${files[@]}"
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

function usage() {
  cat <<EOF
Usage: $0 [OPTIONS] <input_file>

Options:
  -o, --output DIR   Output directory (default: ./out)
  -f, --force        Force overwrite
  -h, --help         Display this help
EOF
  exit 0
}

output_dir="./out"
force=false
input_file=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -o|--output) output_dir="$2"; shift 2 ;;
    -f|--force)  force=true; shift ;;
    -h|--help)   usage ;;
    *)           input_file="$1"; shift ;;
  esac
done

# Validation
if [[ -z "$input_file" ]]; then
  echo "Error: Input file required." >&2; exit 1
fi

mkdir -p "$output_dir"
echo "Processing $input_file into $output_dir"
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Arguments with spaces break logic.
    *   **Why:** Accessing `$*` or unquoted `$@`.
    *   **Fix:** Always use `"$@"` to preserve argument boundaries.
2.  **Bug:** `shift` causes infinite loop or errors.
    *   **Why:** Not decrementing the argument list properly or checking `$#`.
    *   **Fix:** Ensure `shift` is called inside the `while` loop for every matched case.

---

## 8: Arrays
### Core Concepts
Bash supports two types of arrays: Indexed (0-based) and Associative (key-value).

*   **Indexed Arrays:** Standard lists.
    *   `arr=(item1 item2)`
    *   Access: `${arr[0]}`
*   **Associative Arrays:** Require explicit declaration `declare -A`. Keys are arbitrary strings.
*   **Sparse Arrays:** Bash arrays can have gaps (index 0 and 5 defined, 1-4 empty).

### Syntax & Progressive Use Cases
**1. Easy: Basic Indexed Array**
```bash
#!/bin/bash
servers=("web01" "db01" "cache01")
echo "First server: ${servers[0]}"
echo "All servers: ${servers[@]}"
```

**2. Intermediate: Iteration and Manipulation**
```bash
#!/bin/bash
ids=(101 102 105)

# Add element
ids+=(110)

# Iterate keys (indices)
for i in "${!ids[@]}"; do
  echo "Index $i has ID ${ids[$i]}"
done

# Length
echo "Count: ${#ids[@]}"
```

**3. Advanced: Associative Arrays**
```bash
#!/bin/bash
declare -A config
config[port]=8080
config[host]="localhost"

# Iterate keys
for key in "${!config[@]}"; do
  echo "Setting: $key = ${config[$key]}"
done
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

# Maintain a list of active nodes
declare -a active_nodes=()

function check_nodes() {
  local nodes=("node1" "node2" "node3")
  
  for node in "${nodes[@]}"; do
    if ping -c 1 "$node" &> /dev/null; then
      active_nodes+=("$node")
    fi
  done
}

check_nodes

if [[ ${#active_nodes[@]} -eq 0 ]]; then
  echo "CRITICAL: No nodes available." >&2
  exit 1
fi

echo "Active cluster members: ${active_nodes[*]}"
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** `${arr}` prints only the first element.
    *   **Why:** Missing the `[@]` subscript.
    *   **Fix:** Use `${arr[@]}` to get all elements.
2.  **Bug:** Glob patterns expand inside array assignment.
    *   **Why:** `files=( *.txt )` expands at assignment time. If no files match, it stores the literal string `*.txt` (depending on shell options).
    *   **Fix:** Use `shopt -s nullglob` to make globs expand to nothing if no match.

---

## 9: grep
### Core Concepts
`grep` searches patterns in text. It is highly optimized for text scanning.

*   **Regex Types:**
    *   Basic (BRE): Default.
    *   Extended (ERE): `-E` flag. Enables `+`, `?`, `|`, `()` without escaping.
    *   Fixed String: `-F` flag. Treats pattern literally (fastest, no regex).
*   **Exit Codes:** 0 (found), 1 (not found), 2 (error).

### Syntax & Progressive Use Cases
**1. Easy: Basic Searching**
```bash
#!/bin/bash
# Basic search
grep "error" application.log

# Invert match (lines NOT containing)
grep -v "success" application.log
```

**2. Intermediate: Extended Regex and Quiet Mode**
```bash
#!/bin/bash
# Extended regex (error OR warning)
grep -E "error|warning" application.log

# Quiet mode (check existence in if-statement)
if grep -q "config_version=2" settings.cfg; then
  echo "Config is v2"
fi
```

**3. Advanced: Performance and Context**
```bash
#!/bin/bash
# Fixed string (faster for large files, ignores regex chars)
grep -F "special*chars?" data.txt

# Show context (2 lines before, 2 after)
grep -C 2 "panic" kernel.log

# Only output matched portion
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="/var/log/auth.log"
THRESHOLD=5

# Count failed login attempts for a specific user
count=$(grep -cE "Failed password.*invalid user" "$LOG_FILE")

if (( count > THRESHOLD )); then
  echo "High number of invalid attempts: $count"
  # Extract attacking IPs using grep -o (only matching)
  grep -oE "from [0-9.]+" "$LOG_FILE" | awk '{print $2}' | sort | uniq -c | sort -nr
fi
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** "Binary file matches" output instead of text.
    *   **Why:** `grep` detects binary characters in the file.
    *   **Fix:** Use `grep -a` to treat binary files as text.
2.  **Bug:** `grep` returns exit code 1 causing script exit (with `set -e`).
    *   **Why:** No match found returns exit code 1. `set -e` interprets this as failure.
    *   **Fix:** Append `|| true`: `grep "term" file || true`.

---

## 10: sed
### Core Concepts
`sed` (Stream Editor) performs non-interactive text transformations. It processes line-by-line.

*   **Execution Cycle:** Read line -> Execute commands -> Print line (unless `-n`).
*   **Substitution:** `s/find/replace/flags`.
*   **In-Place:** `-i` modifies the file directly. **Warning:** Destroys original file.

### Syntax & Progressive Use Cases
**1. Easy: Substitution**
```bash
#!/bin/bash
# Replace first occurrence per line
sed 's/foo/bar/' file.txt

# Replace all occurrences globally
sed 's/foo/bar/g' file.txt
```

**2. Intermediate: In-Place and Deletion**
```bash
#!/bin/bash
# In-place edit (Linux syntax)
sed -i 's/old/new/g' config.txt

# Delete lines matching pattern
sed '/^#/d' config.txt # Remove comments
```

**3. Advanced: Capturing Groups and Multi-line**
```bash
#!/bin/bash
# Capture group replacement
# Change "User: admin" to "User: [admin]"
sed -E 's/User: (.*)/User: [\1]/' data.txt

# Run multiple commands with -e
sed -e 's/a/A/g' -e 's/b/B/g' file.txt
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_FILE="deploy.yaml"
DEST_FILE="app.yaml"

# Replace placeholders with environment variables
# Usage: Safely inject configuration
sed -e "s/{{DB_HOST}}/${DB_HOST}/g" \
    -e "s/{{DB_PORT}}/${DB_PORT}/g" \
    "$TEMPLATE_FILE" > "$DEST_FILE"

echo "Configuration rendered to $DEST_FILE"
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Script fails on macOS but works on Linux.
    *   **Why:** BSD `sed` (macOS) requires `sed -i ''`. GNU `sed` (Linux) uses `sed -i`.
    *   **Fix:** For portability, avoid `-i` or use: `sed 's/x/y/g' file > tmp && mv tmp file`.
2.  **Bug:** Delimiter conflict (e.g., file paths `/var/log`).
    *   **Why:** Using `/` as delimiter when pattern contains `/`.
    *   **Fix:** Use a different delimiter: `sed 's#/var/log#/var/log2#g'`.

---

## 11: awk
### Core Concepts
`awk` is a powerful data-driven programming language optimized for columnar text processing.

*   **Structure:** `pattern { action }`.
*   **Fields:** Lines are split into fields (`$1`, `$2`...) based on the Field Separator (`FS`).
*   **Built-ins:** `NR` (Record Number), `NF` (Number of Fields), `$0` (Whole Line).

### Syntax & Progressive Use Cases
**1. Easy: Column Extraction**
```bash
#!/bin/bash
# Print first and third column (whitespace separated)
awk '{print $1, $3}' data.txt

# Print specific lines
awk 'NR==5' data.txt
```

**2. Intermediate: Filtering and Custom Separators**
```bash
#!/bin/bash
# Filter by column value
awk '$3 > 100 {print $0}' sales.txt

# CSV processing
awk -F, '{print $1}' data.csv
```

**3. Advanced: Aggregation and Variables**
```bash
#!/bin/bash
# Sum the values in the 5th column
awk '{sum += $5} END {print sum}' data.txt

# Count occurrences of unique values in column 1
awk '{count[$1]++} END {for (key in count) print key, count[key]}' data.txt
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

# Parse Nginx access log
# Fields: $1=IP, $4=Date, $7=URL, $9=Status, $10=Bytes

LOG_FILE="/var/log/nginx/access.log"

awk '
  $9 ~ /^5[0-9][0-9]$/ { 
    # Count 5xx errors
    server_errors++ 
    ips[$1]++
  }
  END { 
    print "Total Server Errors:", server_errors
    for (ip in ips) print "IP:", ip, "Count:", ips[ip]
  }
' "$LOG_FILE"
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** `awk` script fails on regex characters.
    *   **Why:** Using `/` inside regex unescaped.
    *   **Fix:** Escape slashes `\/` or use explicit regex operator `~`.
2.  **Bug:** Variable assignment from shell to `awk` is tricky.
    *   **Why:** Single quotes prevent shell expansion.
    *   **Fix:** Use `-v` flag: `awk -v var="$shell_var" '{print var}'`.

---

## 12: System Automation
### Core Concepts
Production scripts often run unattended. Robustness requires scheduling, signal handling, and logging.

*   **Cron:** Time-based scheduler. Minimal environment variables. Requires absolute paths.
*   **Traps:** Capture signals (SIGINT, SIGTERM, EXIT) to execute cleanup code.
*   **Lockfiles:** Prevent concurrent script execution.

### Syntax & Progressive Use Cases
**1. Easy: Simple Trap**
```bash
#!/bin/bash
echo "Script running..."
# Trap Ctrl+C (SIGINT)
trap 'echo "Interrupted!"; exit 1' INT
sleep 10
```

**2. Intermediate: Cleanup Function**
```bash
#!/bin/bash
tmp_file=$(mktemp)

cleanup() {
  rm -f "$tmp_file"
  echo "Cleaned up temp file."
}

# Execute cleanup on exit, kill, or error
trap cleanup EXIT INT TERM

echo "Using $tmp_file"
sleep 5
```

**3. Advanced: Lockfile Implementation**
```bash
#!/bin/bash
LOCK_FILE="/tmp/my_script.lock"

# Try to acquire lock (atomic check)
if ! mkdir "$LOCK_FILE" 2>/dev/null; then
  echo "Script already running." >&2
  exit 1
fi

trap 'rmdir "$LOCK_FILE"' EXIT

# Main logic
echo "Job running exclusively..."
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
set -euo pipefail

PROG_NAME=$(basename "$0")
LOCK_DIR="/tmp/${PROG_NAME}.lock"
LOG_TAG="backup_job"

# Setup logging to syslog
exec 1> >(logger -t "$LOG_TAG" -s 2>&1) # Redirect stdout to logger
exec 2>&1

# Concurrency Control
if ! mkdir "$LOCK_DIR"; then
  echo "Another instance is already running."
  exit 1
fi
trap 'rmdir "$LOCK_DIR"' EXIT

# Main Logic
echo "Starting backup..."
tar -czf /backup/home.tar.gz /home
echo "Backup complete."
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** Cron job runs but commands fail.
    *   **Why:** Cron environment has a minimal `PATH` (often just `/usr/bin:/bin`).
    *   **Fix:** Define `PATH=/usr/local/bin:/usr/bin:/bin` inside the script or crontab.
2.  **Bug:** Script leaves stale lockfile after crash.
    *   **Why:** Hard kill (SIGKILL) cannot be trapped.
    *   **Fix:** Use `flock` utility for robust locking, or verify PID inside lockfile to check if process is still alive.

---

## 13: Production Bash Projects
### Core Concepts
A production script is self-documenting, safe, and tested.

*   **Strict Mode:** `set -euo pipefail` is the "seatbelt" of Bash.
    *   `-e`: Exit immediately if a command exits with non-zero status.
    *   `-u`: Treat unset variables as error.
    *   `-o pipefail`: Return value of pipeline is the status of the last command to exit with non-zero status.
*   **Boilerplate:** Standard headers with description, usage, and dependencies.
*   **Linting:** `shellcheck` is a mandatory tool for catching common bugs before deployment.

### Syntax & Progressive Use Cases
**1. Easy: Strict Mode Implementation**
```bash
#!/bin/bash
set -euo pipefail
IFS=$'\n\t' # Safer Internal Field Separator
```

**2. Intermediate: Usage Function**
```bash
#!/bin/bash
function usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -h  Show this help"
  exit 1
}
```

**3. Advanced: Full Production Template**
```bash
#!/usr/bin/env bash
# ==============================================================================
# Script Name: manage_service.sh
# Description: Restarts a service and verifies health.
# ==============================================================================

set -euo pipefail
IFS=$'\n\t'

# --- Constants ----------------------------------------------------------------
readonly SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
readonly LOG_FILE="/var/log/service_manager.log"

# --- Functions ----------------------------------------------------------------
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

usage() {
  cat <<EOF
Usage: $0 <service_name>
EOF
  exit 1
}

# --- Main ---------------------------------------------------------------------
if [[ $# -ne 1 ]]; then usage; fi

log "Starting management for $1"
# ... logic ...
```

### Enterprise Code Example
```bash
#!/usr/bin/env bash
# ==============================================================================
# Script: deploy_artifact.sh
# Description: Fetches and deploys an artifact with checksum verification.
# ==============================================================================

set -euo pipefail
IFS=$'\n\t'

# --- Configuration ------------------------------------------------------------
readonly ARTIFACT_URL="https://repo.internal/app.tar.gz"
readonly DEPLOY_DIR="/opt/app"
readonly WORK_DIR=$(mktemp -d)

# --- Cleanup Trap -------------------------------------------------------------
cleanup() {
  local exit_code=$?
  log "Cleaning up temp directory..."
  rm -rf "$WORK_DIR"
  exit $exit_code
}
trap cleanup EXIT

# --- Helper Functions ---------------------------------------------------------
log() {
  printf "[%s] %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

check_deps() {
  local deps=("curl" "sha256sum")
  for dep in "${deps[@]}"; do
    if ! command -v "$dep" > /dev/null; then
      log "ERROR: Missing dependency: $dep"
      return 1
    fi
  done
}

# --- Main Logic ---------------------------------------------------------------
log "Deployment started."

check_deps

log "Downloading artifact..."
curl -sL "$ARTIFACT_URL" -o "${WORK_DIR}/app.tar.gz"

# Verify (Mock verification)
log "Verifying integrity..."

mkdir -p "$DEPLOY_DIR"
tar -xzf "${WORK_DIR}/app.tar.gz" -C "$DEPLOY_DIR"

log "Deployment successful."
```

### Troubleshooting & Common Pitfalls
1.  **Bug:** `set -e` causes script to exit on valid non-zero return (e.g., `grep` finding nothing).
    *   **Why:** Strict mode treats all non-zero as fatal.
    *   **Fix:** Explicitly handle: `grep "term" file || true` or `if grep ...`.
2.  **Bug:** `shellcheck` errors regarding quoting.
    *   **Why:** Quoting is complex in Bash expansions.
    *   **Fix:** Follow ShellCheck suggestions rigorously. It prevents logic failures on edge cases (spaces in filenames, empty variables).