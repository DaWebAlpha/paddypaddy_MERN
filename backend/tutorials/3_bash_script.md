I understand the issue. You need the **high-quality, production-grade code** restored, but integrated with **clear, plain-English explanations** of *why* and *when* to use the concepts. You want the best of both worlds: deep technical examples that are easy to digest logically.

Here is the corrected manual. It retains the **Enterprise Code Examples** and **Advanced Syntax**, but breaks down the logic clearly so the purpose of every line is understood.

---

# Production-Grade Bash Reference Manual

## 1: Variables
### Core Concepts
Variables are pointers to data. In a production environment, they manage configuration paths, state, and environment differences. Unlike simple scripting, production Bash requires strict control over **Scope** (where the variable is visible) and **Attributes** (is it a number? is it read-only?).

### When & Why to Use It
*   **Use when:** You need to reuse values (like directory paths) or manage system state.
*   **Why:** It prevents "magic strings" (hardcoded values) and makes the script portable across environments (Dev vs Prod).
*   **Key Rule:** Always quote variables (`"$var"`) to handle spaces safely.

### Syntax & Progressive Use Cases
**1. Easy: Basic Assignment**
```bash
# No spaces around '='
config_file="/etc/app/config.conf"
echo "Using config: $config_file"
```

**2. Intermediate: Quoting & Defaults**
```bash
# Use quotes to handle spaces in paths
user_home="/home/My User"

# Default value: Use "/tmp" if $LOG_DIR is unset or empty
dest="${LOG_DIR:-/tmp}"
```

**3. Advanced: Strict Typing & Scope**
```bash
# Declare an integer (math operations only)
declare -i count=10
count="hello" # Bash converts "hello" to 0 because it expects a number!

# Readonly variable (Cannot be changed later - safety feature)
readonly API_ENDPOINT="https://api.prod.com"
```

### Enterprise Code Example
**Scenario:** A script setup section that defines safe, global configuration variables and local counters.

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- Global Configuration (Immutable for safety) ---
# Use 'readonly' to prevent accidental overwriting during script execution.
readonly APP_NAME="DataProcessor"
readonly LOG_DIR="/var/log/${APP_NAME}"

# --- Mutable State ---
# Use 'declare -i' for variables meant for math to prevent string injection.
declare -i retry_count=0

function process_task() {
  # 'local' restricts the variable to this function only.
  # This prevents bugs where a function accidentally overwrites a global variable.
  local temp_file="$1"
  
  echo "Processing $temp_file..."
  # Logic goes here
}

# Ensure directories exist using the variable
mkdir -p "$LOG_DIR"
```

### Troubleshooting
*   **Bug:** `command not found: var`.
    *   **Why:** Spaces around `=` (e.g., `var = "val"`). Bash thinks `var` is a command.
    *   **Fix:** Remove spaces: `var="val"`.

---

## 2: Conditions
### Core Concepts
Conditions control the flow of execution based on the **Exit Code** of commands. An exit code of `0` means success (True), anything else means failure (False).

### When & Why to Use It
*   **Use when:** You need to verify a file exists, a service is running, or a string matches a pattern before proceeding.
*   **Why:** To implement "Fail Fast" logic—stopping the script immediately if requirements aren't met.

### Syntax & Progressive Use Cases
**1. Easy: File Checks**
```bash
# -f checks if file exists
if [[ -f "app.conf" ]]; then
  echo "Config found."
fi
```

**2. Intermediate: String & Numeric Logic**
```bash
# String comparison
if [[ "$1" == "start" ]]; then
  echo "Starting..."
fi

# Numeric comparison (use (( )) for math)
limit=10
if (( limit > 5 )); then
  echo "Limit exceeded."
fi
```

**3. Advanced: Complex Logic (&& and ||)**
```bash
# Check if file exists AND is readable
if [[ -f "data.db" && -r "data.db" ]]; then
  echo "Database accessible."
fi
```

### Enterprise Code Example
**Scenario:** A pre-flight check to ensure the script has the correct permissions and environment before running a critical task.

```bash
#!/usr/bin/env bash
set -euo pipefail

function check_dependencies() {
  local required_cmd="$1"

  # Check if a command exists in the system PATH
  # 'command -v' returns success (0) if found, failure (1) if not.
  if ! command -v "$required_cmd" &> /dev/null; then
    echo "ERROR: Required command '$required_cmd' not found." >&2
    return 1
  fi
}

# Verify 'curl' is installed before trying to use it
check_dependencies "curl"

# Verify we are root user (EUID 0)
if (( EUID != 0 )); then
  echo "ERROR: This script must be run as root." >&2
  exit 1
fi

echo "All checks passed. Proceeding..."
```

### Troubleshooting
*   **Bug:** `[: too many arguments`.
    *   **Why:** Using single `[ ]` with unquoted variables that expand to empty strings.
    *   **Fix:** Always use `[[ ]]` (double brackets), which handles empty variables safely.

---

## 3: User Input
### Core Concepts
Interactivity allows scripts to be dynamic. However, in production, we prefer non-interactive (argument-based) scripts. `read` is used for interactive prompts, and `select` for menus.

### When & Why to Use It
*   **Use when:** You need a password (hidden input) or need the user to choose from a specific list of options.
*   **Why:** To prevent typos. If you ask a user to type a filename, they might typo it. Offering a menu (`select`) prevents this.

### Syntax & Progressive Use Cases
**1. Easy: Basic Prompt**
```bash
read -p "Enter directory: " dir_path
echo "You entered: $dir_path"
```

**2. Intermediate: Secure Password Input**
```bash
# -s (silent) hides the typing
read -s -p "Enter Password: " pass
echo # Print newline for formatting
```

**3. Advanced: Menu Selection**
```bash
select env in "dev" "staging" "prod"; do
  echo "You selected: $env"
  break
done
```

### Enterprise Code Example
**Scenario:** A deployment confirmation script that asks for a specific environment and requires a "yes" confirmation to prevent accidental production deployments.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Available environments:"
# PS3 is the prompt shown by 'select'
PS3="Select target environment (1-3): "

select env in "development" "staging" "production"; do
  if [[ -n "$env" ]]; then
    TARGET_ENV="$env"
    break
  else
    echo "Invalid selection. Try again."
  fi
done

# Confirmation step for safety
read -p "Deploy to $TARGET_ENV? Type 'yes' to confirm: " confirm
if [[ "$confirm" != "yes" ]]; then
  echo "Deployment cancelled."
  exit 0
fi

echo "Deploying to $TARGET_ENV..."
```

### Troubleshooting
*   **Bug:** Backslashes in user input disappear.
    *   **Why:** `read` interprets backslashes as escapes.
    *   **Fix:** Always use `read -r` to treat input literally.

---

## 4: Loops
### Core Concepts
Loops automate repetitive tasks. The most common production pattern is iterating over a list of servers or files.

### When & Why to Use It
*   **Use when:** You need to perform the same action on a dynamic list of items (e.g., rotating logs for every service).
*   **Why:** It eliminates code duplication.

### Syntax & Progressive Use Cases
**1. Easy: Iterating a List**
```bash
for host in web01 web02; do
  echo "Pinging $host"
done
```

**2. Intermediate: File Globbing**
```bash
# Safely iterate over all .log files
for file in *.log; do
  gzip "$file"
done
```

**3. Advanced: C-Style Loop (Range)**
```bash
# Loop exactly 5 times with a counter
for ((i=1; i<=5; i++)); do
  echo "Attempt $i"
done
```

### Enterprise Code Example
**Scenario:** A batch processing script that reads a list of URLs from a file and checks their HTTP status code. Includes a retry mechanism.

```bash
#!/usr/bin/env bash
set -euo pipefail

INPUT_FILE="urls.txt"
declare -i MAX_RETRIES=3

# Check if file exists before looping
if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Error: $INPUT_FILE not found." >&2
  exit 1
fi

# Read file line-by-line (safe method)
while read -r url; do
  # Skip empty lines or comments
  [[ -z "$url" || "$url" == \#* ]] && continue

  for ((attempt=1; attempt<=MAX_RETRIES; attempt++)); do
    echo "Checking $url (Attempt $attempt)..."
    
    # curl -f fails on HTTP errors (like 404/500)
    if curl -sf "$url" -o /dev/null; then
      echo "  -> Success: $url"
      break # Break the retry loop on success
    else
      echo "  -> Failed."
      sleep 1
    fi
  done

done < "$INPUT_FILE"
```

### Troubleshooting
*   **Bug:** Loop processes filenames with spaces as separate items.
    *   **Why:** Iterating over command output like `for f in $(ls)`.
    *   **Fix:** Iterate using shell globs: `for f in *` and quote `"$f"`.

---

## 5: Files
### Core Concepts
Bash handles files via **File Descriptors (FDs)**. FD 0 is stdin (input), FD 1 is stdout (normal output), FD 2 is stderr (error output). Understanding redirection is key to logging.

### When & Why to Use It
*   **Use when:** You need to save logs to a file, discard error messages, or read configuration data.
*   **Why:** To create audit trails (logs) and prevent error messages from cluttering the screen.

### Syntax & Progressive Use Cases
**1. Easy: Output Redirection**
```bash
# Overwrite file
echo "Start" > log.txt
# Append to file
echo "Next line" >> log.txt
```

**2. Intermediate: Error Redirection**
```bash
# Redirect stderr (2) to wherever stdout (1) is going
grep "root" /etc/shadow 2>&1 | tee output.txt
```

**3. Advanced: Reading & Writing**
```bash
# Read line by line safely
while IFS= read -r line; do
  echo "Processing: $line"
done < input.txt
```

### Enterprise Code Example
**Scenario:** A logging function that writes timestamps to both the console and a log file simultaneously using `tee`.

```bash
#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="/var/log/maintenance.log"

# Function to log messages with timestamp
# Usage: log "INFO" "Message text"
log() {
  local level="$1"
  local message="$2"
  local timestamp
  timestamp=$(date "+%Y-%m-%d %H:%M:%S")
  
  # Print to screen AND append to file
  #>&2 redirects the output to stderr so it doesn't interfere with pipe logic.
  printf "[%s] [%s] %s\n" "$timestamp" "$level" "$message" | tee -a "$LOG_FILE" >&2
}

log "INFO" "Starting backup process."

# Simulate a command that outputs data
if tar -czf /tmp/backup.tar.gz /etc; then
  log "INFO" "Backup successful."
else
  log "ERROR" "Backup failed."
fi
```

### Troubleshooting
*   **Bug:** `Permission denied` when writing to `/var/log`.
    *   **Why:** Standard users cannot write to system directories.
    *   **Fix:** Run script with `sudo` or write to a user-accessible path.

---

## 6: Functions
### Core Concepts
Functions are reusable blocks of code. In production, they allow you to modularize logic, making scripts easier to test and maintain.

### When & Why to Use It
*   **Use when:** You use the same logic (like checking a status or sending an alert) in multiple places.
*   **Why:** **DRY (Don't Repeat Yourself)**. If you fix a bug in a function, it's fixed everywhere.

### Syntax & Progressive Use Cases
**1. Easy: Basic Definition**
```bash
greet() {
  echo "Hello, $1"
}
greet "Admin"
```

**2. Intermediate: Local Variables**
```bash
calc() {
  local total=$(( $1 + $2 ))
  echo "$total"
}
result=$(calc 5 10)
```

**3. Advanced: Return Codes**
```bash
is_alive() {
  if ping -c 1 "$1" &> /dev/null; then
    return 0 # Success/True
  else
    return 1 # Failure/False
  fi
}
```

### Enterprise Code Example
**Scenario:** A robust cleanup function that removes temporary files. This function is triggered automatically when the script exits (even if it crashes), ensuring no junk files are left behind.

```bash
#!/usr/bin/env bash
set -euo pipefail

TEMP_DIR=$(mktemp -d)

# 1. Define the cleanup function
cleanup() {
  echo "Cleaning up temp files..."
  # -rf ensures it doesn't stop on errors
  rm -rf "$TEMP_DIR"
}

# 2. Trap ensures 'cleanup' runs on EXIT, INT (Ctrl+C), or TERM (kill)
trap cleanup EXIT INT TERM

echo "Working in $TEMP_DIR..."
# Simulate work creating files
touch "$TEMP_DIR/data.tmp"

# Script finishes (or crashes), cleanup runs automatically.
```

### Troubleshooting
*   **Bug:** Variable modified in a function affects the global script.
    *   **Why:** Missing `local` keyword.
    *   **Fix:** Always use `local` for variables specific to the function.

---

## 7: Arguments
### Core Concepts
Arguments are inputs provided to the script at runtime (`./script.sh arg1 arg2`). They allow scripts to be dynamic tools rather than static files.

### When & Why to Use It
*   **Use when:** You want to pass filenames, flags, or configuration values to the script from the command line.
*   **Why:** It allows automation tools (like Jenkins or Cron) to control the script behavior without editing code.

### Syntax & Progressive Use Cases
**1. Easy: Accessing Arguments**
```bash
# $1 is first arg, $2 is second
echo "Hello, $1. You are $2 years old."
```

**2. Intermediate: Checking Argument Count**
```bash
# $# is the number of arguments
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <filename>"
  exit 1
fi
```

**3. Advanced: Handling Flags with `getopts`**
```bash
while getopts "u:p:" opt; do
  case "$opt" in
    u) user="$OPTARG" ;;
    p) port="$OPTARG" ;;
  esac
done
```

### Enterprise Code Example
**Scenario:** A script that accepts a mandatory filename and an optional verbose flag (`-v`).

```bash
#!/usr/bin/env bash
set -euo pipefail

verbose=0
target_file=""

# Parse flags first
while getopts "vh" opt; do
  case "$opt" in
    v) verbose=1 ;; # Set verbose mode
    h) echo "Usage: $0 [-v] filename"; exit 0 ;;
    *) exit 1 ;;
  esac
done
# Shift processed flags away so $1 becomes the filename
shift $((OPTIND-1))

# Check if filename argument exists
if [[ $# -lt 1 ]]; then
  echo "Error: Filename required." >&2
  exit 1
fi

target_file="$1"

if (( verbose )); then
  echo "Processing $target_file in verbose mode..."
else
  echo "Processing $target_file..."
fi
```

### Troubleshooting
*   **Bug:** `shift` fails or logic breaks.
    *   **Why:** Shifting more times than there are arguments.
    *   **Fix:** Always check `$#` or use `getopts` for robust parsing.

---

## 8: Arrays
### Core Concepts
Arrays hold lists of values. This is crucial when a single variable isn't enough (e.g., a list of servers to patch).

### When & Why to Use It
*   **Use when:** You need to store multiple items that belong together, especially if those items have spaces in them.
*   **Why:** Arrays preserve the integrity of items with spaces, which simple strings cannot do.

### Syntax & Progressive Use Cases
**1. Easy: Defining Arrays**
```bash
servers=("web01" "web02" "db01")
echo "First server: ${servers[0]}"
```

**2. Intermediate: Iterating**
```bash
# "${servers[@]}" expands to all elements
for s in "${servers[@]}"; do
  echo "Server: $s"
done
```

**3. Advanced: Adding Elements**
```bash
servers+=("cache01") # Append to array
length=${#servers[@]} # Get count
```

### Enterprise Code Example
**Scenario:** Managing a cluster. The script defines a list of hosts and iterates over them to check uptime.

```bash
#!/usr/bin/env bash
set -euo pipefail

# Define list of production nodes
declare -a NODES=("node-alpha" "node-beta" "node-gamma")
declare -a FAILED_NODES=() # Empty array to collect failures

echo "Checking cluster health..."

for node in "${NODES[@]}"; do
  # Check uptime command remotely (assuming SSH keys are set up)
  if ssh "$node" "uptime" &> /dev/null; then
    echo "  [OK] $node"
  else
    echo "  [FAIL] $node"
    FAILED_NODES+=("$node")
  fi
done

# Report results
if [[ ${#FAILED_NODES[@]} -gt 0 ]]; then
  echo "Warning: The following nodes failed: ${FAILED_NODES[*]}"
else
  echo "All nodes operational."
fi
```

### Troubleshooting
*   **Bug:** `echo $array` prints only the first element.
    *   **Why:** Arrays require specific expansion syntax.
    *   **Fix:** Use `${array[@]}` for all elements.

---

## 9: grep
### Core Concepts
`grep` filters text. It searches for patterns (regular expressions) and prints matching lines.

### When & Why to Use It
*   **Use when:** You need to find specific errors in logs or extract lines containing a specific ID.
*   **Why:** It is the fastest way to filter large amounts of text.

### Syntax & Progressive Use Cases
**1. Easy: Basic Search**
```bash
grep "ERROR" app.log
```

**2. Intermediate: Invert & Count**
```bash
# -v: Show lines that do NOT match
# -c: Count matches
grep -v "SUCCESS" app.log
grep -c "404" access.log
```

**3. Advanced: Extended Regex & Quiet Mode**
```bash
# -E: Extended regex (use +, | without escaping)
# -q: Quiet mode (for if-statements, checks existence only)
if grep -qE "error|fail" app.log; then
  echo "Errors found."
fi
```

### Enterprise Code Example
**Scenario:** Log monitoring script that checks if a critical service has crashed.

```bash
#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="/var/log/syslog"
PATTERN="kernel: panic"

# -E for extended regex, -i for case-insensitive
# Check for critical errors
if grep -qiE "$PATTERN" "$LOG_FILE"; then
  echo "CRITICAL: Kernel panic detected in logs!"
  # Extract the last 5 lines for context
  grep -A 5 "$PATTERN" "$LOG_FILE" | tail -n 5
  exit 2 # Exit with error code
else
  echo "System logs look healthy."
fi
```

### Troubleshooting
*   **Bug:** `grep` returns exit code 1 (causing script crash with `set -e`) when no match is found.
    *   **Why:** `grep` returns 1 if no lines match.
    *   **Fix:** Append `|| true` to the command: `grep "term" file || true`.

---

## 10: sed
### Core Concepts
`sed` (Stream Editor) transforms text. It reads text line-by-line and applies editing commands. It is best for automated search-and-replace.

### When & Why to Use It
*   **Use when:** You need to update a configuration file automatically (e.g., changing a port number or IP address).
*   **Why:** It allows "Infrastructure as Code" to modify files without manual editing.

### Syntax & Progressive Use Cases
**1. Easy: Substitution**
```bash
# s/old/new/g
sed 's/8080/80/g' config.txt
```

**2. Intermediate: In-Place Editing**
```bash
# -i: Edit file directly (overwrite)
sed -i 's/off/on/g' settings.conf
```

**3. Advanced: Capturing Groups**
```bash
# -E for extended regex
# Change "User: admin" to "User: [admin]"
sed -E 's/User: (.*)/User: [\1]/' data.txt
```

### Enterprise Code Example
**Scenario:** Updating a web server configuration file to point to a new database IP address.

```bash
#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE="wp-config.php"
OLD_DB="192.168.1.50"
NEW_DB="10.0.0.5"

if [[ -f "$CONFIG_FILE" ]]; then
  # Use a different delimiter (|) because IP addresses have slashes
  sed -i "s|${OLD_DB}|${NEW_DB}|g" "$CONFIG_FILE"
  echo "Updated database host in $CONFIG_FILE"
else
  echo "Config file not found!" >&2
  exit 1
fi
```

### Troubleshooting
*   **Bug:** Script crashes because the search term contains `/`.
    *   **Why:** `/` is the default delimiter in `sed`.
    *   **Fix:** Use a different delimiter like `|` or `#`: `sed 's#path/old#path/new#g'`.

---

## 11: awk
### Core Concepts
`awk` is a powerful tool for processing columnar data. It splits lines into fields (columns) and allows math or logic on them.

### When & Why to Use It
*   **Use when:** You need to extract specific columns from a command output (like getting just the size of files from `ls`).
*   **Why:** It is far more robust than `cut` and can handle variable spacing.

### Syntax & Progressive Use Cases
**1. Easy: Print Columns**
```bash
# Print column 1 and 3 (default separator is space)
awk '{print $1, $3}' data.txt
```

**2. Intermediate: Filtering Logic**
```bash
# Print lines where column 3 is greater than 100
awk '$3 > 100 {print $0}' data.txt
```

**3. Advanced: Sum Calculation**
```bash
# Sum up all values in column 5 and print total at the end
awk '{sum += $5} END {print sum}' sales.txt
```

### Enterprise Code Example
**Scenario:** Checking disk usage and alerting if the usage percentage is over 90%.

```bash
#!/usr/bin/env bash
set -euo pipefail

# df -h output: Filesystem Size Used Avail Use% Mounted on
# We want column 5 (Use%) and column 6 (Mounted on)
# NR>2 skips the header row

df -h | awk 'NR>2 {
  usage=$5;
  mount=$6;
  # Remove the % character to allow numeric comparison
  gsub(/%/, "", usage);

  if (usage > 90) {
    print "WARNING: Partition " mount " is " usage "% full.";
  }
}'
```

### Troubleshooting
*   **Bug:** `awk` script fails to filter correctly.
    *   **Why:** Bash variables aren't expanded inside single quotes `'...'`.
    *   **Fix:** Pass variables using `-v`: `awk -v var="$bash_var" '$1 == var' file`.

---

## 12: System Automation
### Core Concepts
Automation involves running scripts without human intervention. This requires scheduling (Cron) and robust signal handling (Traps).

### When & Why to Use It
*   **Use when:** You need nightly backups, log rotation, or system health checks.
*   **Why:** To ensure maintenance happens consistently without human error.

### Syntax & Progressive Use Cases
**1. Easy: Simple Trap**
```bash
# Run function 'finish' when script exits
trap 'echo "Done."' EXIT
```

**2. Intermediate: Cleanup on Cancel**
```bash
# Trap Ctrl+C (INT) and Kill (TERM)
trap 'rm -f /tmp/lock; exit' INT TERM
```

**3. Advanced: Lockfile for Concurrency**
```bash
# Prevent script from running twice at the same time
if ! mkdir /tmp/lock; then
  echo "Script already running."
  exit 1
fi
```

### Enterprise Code Example
**Scenario:** A robust backup script that creates a lockfile to prevent overlaps and cleans it up even if the script is killed.

```bash
#!/usr/bin/env bash
set -euo pipefail

LOCK_DIR="/tmp/backup.lock"
LOG_FILE="/var/log/backup.log"

# 1. Concurrency Control
# mkdir is atomic - it either succeeds or fails. Perfect for locking.
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "Backup already running. Exiting." | tee -a "$LOG_FILE"
  exit 1
fi

# 2. Signal Handling
# If script receives TERM, INT, or EXIT, remove the lock directory.
cleanup() {
  rmdir "$LOCK_DIR"
  echo "Lock released."
}
trap cleanup EXIT INT TERM

# 3. The Job
echo "$(date): Starting backup..." | tee -a "$LOG_FILE"
rsync -av /data/ /backup/
echo "$(date): Backup complete." | tee -a "$LOG_FILE"

# Lock is automatically removed when script exits via the trap.
```

### Troubleshooting
*   **Bug:** Cron job runs but script fails to find commands.
    *   **Why:** Cron runs with a very minimal PATH variable.
    *   **Fix:** Use full paths (`/usr/bin/rsync`) or define `PATH=/usr/bin:/bin` at the top of the script.

---

## 13: Production Bash Projects
### Core Concepts
Production scripts prioritize **Maintainability** and **Safety**. This means using a standard header, enabling strict error checking, and writing helpful help messages.

### When & Why to Use It
*   **Use when:** Writing scripts that will be shared with a team or run on critical servers.
*   **Why:** It prevents silent failures and makes debugging easy for others.

### The "Strict Mode" Header
This should be at the top of every script. It catches bugs immediately.
```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

### Enterprise Code Example
**Scenario:** A complete, reusable template for a command-line tool.

```bash
#!/usr/bin/env bash
# ==============================================================================
# Script Name: manage_service.sh
# Description: Restarts a service and verifies it is running.
# Usage:       ./manage_service.sh <service_name>
# ==============================================================================

# --- Strict Mode & Safety -----------------------------------------------------
set -euo pipefail
IFS=$'\n\t'

# --- Global Variables ---------------------------------------------------------
readonly SCRIPT_NAME=$(basename "$0")
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# --- Helper Functions ---------------------------------------------------------

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

usage() {
  cat <<EOF
Usage: $SCRIPT_NAME [options] <service_name>

Options:
  -h, --help     Show this help message.
  -f, --force    Force restart without check.

Example:
  $SCRIPT_NAME nginx
EOF
  exit 0
}

# --- Argument Parsing ---------------------------------------------------------

if [[ $# -lt 1 ]]; then
  usage
fi

SERVICE_NAME="$1"

# --- Main Logic ---------------------------------------------------------------

log "Attempting to restart $SERVICE_NAME..."

# Example logic using the concepts above
if systemctl restart "$SERVICE_NAME"; then
  log "Success: $SERVICE_NAME restarted."
else
  log "Error: Failed to restart $SERVICE_NAME."
  exit 1
fi
```

### Troubleshooting
*   **Bug:** `shellcheck` (linter tool) gives warnings about quoting.
    *   **Why:** It looks for potential issues with spaces in variables.
    *   **Fix:** Follow `shellcheck` advice. It is the best way to learn Bash best practices. Install it and run `shellcheck myscript.sh`.