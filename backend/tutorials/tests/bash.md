# 🎯 PROJECT 1: COMPLETE ENTERPRISE LOG FORENSICS & INCIDENT RESPONSE SYSTEM

## PART 1: STEP-BY-STEP BUILDING BLOCKS (Learn Each Concept)

### Step 0: Create Test Data

Run these commands to create your test environment:

```bash
# Create the logs folder
mkdir -p logs

# Create auth.log with authentication events
cat > logs/auth.log << 'EOF'
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:26:01 INFO: IP blocked - ip=10.0.0.45 reason=brute_force duration=3600s
2026-05-28 14:30:45 INFO: User login successful - user=jsmith ip=192.168.1.110
2026-05-28 14:32:10 WARNING: Unusual login time - user=admin ip=45.33.22.11 geo=Russia
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
2026-05-28 14:35:00 INFO: User login successful - user=mgarcia ip=192.168.1.115
2026-05-28 14:40:22 WARNING: Privilege escalation attempt - user=guest ip=192.168.1.200 target=admin
2026-05-28 14:40:25 ERROR: Authorization denied - user=guest ip=192.168.1.200 resource=/admin/config
2026-05-28 14:45:10 INFO: User logout - user=admin ip=192.168.1.105 session_duration=1320s
2026-05-28 14:50:33 WARNING: Multiple failed login attempts detected - user=admin ip=185.220.101.42 count=8
2026-05-28 14:50:35 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:38 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:40 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:42 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3
2026-05-28 14:50:48 CRITICAL: Account lockout triggered - user=admin ip=185.220.101.42 lockout_duration=900s
2026-05-28 15:00:01 INFO: Scheduled backup started - job_id=backup_001
2026-05-28 15:05:22 INFO: User login successful - user=admin ip=192.168.1.105
2026-05-28 15:10:00 ERROR: Database connection timeout - service=auth_db ip=10.0.1.50 port=5432
2026-05-28 15:10:05 WARNING: Retry attempt 1/3 - service=auth_db
2026-05-28 15:10:10 WARNING: Retry attempt 2/3 - service=auth_db
2026-05-28 15:10:15 ERROR: Database connection failed - service=auth_db error=connection_refused
2026-05-28 15:15:00 INFO: User login successful - user=admin ip=192.168.1.105
2026-05-28 15:20:33 WARNING: Suspicious activity - user=admin ip=192.168.1.105 action=bulk_user_export
2026-05-28 15:25:12 ERROR: Permission denied - user=admin ip=192.168.1.105 resource=/etc/passwd
2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users
2026-05-28 15:35:00 INFO: Alert sent - severity=CRITICAL recipients=security@company.com
2026-05-28 15:40:00 INFO: User session terminated - user=admin ip=192.168.1.105 reason=security_alert
2026-05-28 16:00:00 INFO: User login successful - user=rjohnson ip=192.168.1.120
EOF
```

### Create `system.log`

```bash
cat > logs/system.log << 'EOF'
...
EOF
```

### Create `firewall.log`

```bash
cat > logs/firewall.log << 'EOF'
...
EOF
```

### Create `attack_signatures.txt`

```bash
cat > logs/attack_signatures.txt << 'EOF'
brute_force
password_spray
data_exfiltration
DDoS
port_scan
reconnaissance
EOF
```

### Verify Files

```bash
echo "=== Files created ==="
ls -lh logs/

echo ""
echo "=== Line counts ==="
wc -l logs/*
```

## Expected Directory Structure

```text
logs/
├── auth.log
├── system.log
├── firewall.log
└── attack_signatures.txt
```

## Learning Objectives

By the end of this project you will learn:

- Log collection and parsing
- Security event detection
- Attack signature matching
- Brute-force attack detection
- Port scan detection
- DDoS detection
- Data exfiltration detection
- Incident correlation
- Threat intelligence integration
- Alert generation
- Security reporting
- Bash scripting for cybersecurity
- Enterprise incident response workflows



# Step 1: Shebang and Strict Mode

## What this does

- `#!/bin/bash` tells the system to use Bash to run this file.
- `set -e` stops the script if any command fails.
- `set -u` stops if you use an undefined variable.
- `set -o pipefail` stops if any command in a pipe fails.
- `IFS=$'\n\t'` prevents Bash from splitting on spaces.

## Create file: `step1_shebang.sh`


```bash
#!/bin/bash

set -eou pipefail

echo "testing strict mode ..."

#undefined variable test -u
#echo $looka

#Command failure test -e
#ls logs/woda.txt

#Pipefail -o
#false | true
#echo $?

IFS=$'\n\t'

touch "my file.txt"
for file in $(ls); do
        echo "$file"
done

```
```bash
#!/bin/bash

# =============================================================================
# STEP 1: SHEBANG AND STRICT MODE
# =============================================================================

# These three settings make bash strict and safe
set -euo pipefail

# IFS controls how bash splits words
# We only split on newlines and tabs, NOT spaces
# This prevents bugs when filenames have spaces
IFS=$'\n\t'

echo "Script is running safely with strict mode enabled"
echo "Try using an undefined variable like \$LOOG_DIR to see it fail:"

# Uncomment the next line to see the error:
# echo "$LOOG_DIR"
```

## How to test

```bash
# Make it executable
chmod +x step1_shebang.sh

# Run it normally
./step1_shebang.sh
```

### Expected Output

```text
Script is running safely with strict mode enabled
```

### Test Undefined Variable Protection

Uncomment:

```bash
echo "$LOOG_DIR"
```

Run again:

```bash
./step1_shebang.sh
```

### Expected Output

```text
step1_shebang.sh: line 15: LOOG_DIR: unbound variable
```

The script stops immediately because of the typo.

---

# Step 2: Configuration Variables

## What this does

- `readonly` creates constants that cannot be changed.
- `$(basename "$0")` gets the script name.
- `$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)` gets the script directory.
- `${1:-logs}` uses the first argument or defaults to `logs`.
- `$(date +%Y%m%d_%H%M%S)` creates timestamps.

## Create file: `step2_config.sh`

```bash
#!/bin/bash

set -eou pipefail
IFS=$'\n\t'

# Get the script's filename
readonly SCRIPT_NAME="$(basename "$0")"
echo "SCRIPT_NAME=$SCRIPT_NAME"

# Get the absolute directory path of the current script
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "SCRIPT_DIR=$SCRIPT_DIR"

# Use the first command-line argument as the log directory, default to logs
readonly LOG_DIR="${1:-logs}"
echo "LOG_DIR=$LOG_DIR"

# Base name for evidence collection directories
readonly EVIDENCE_BASE="evidence"

# FIX 1: Capture the timestamp ONCE to ensure consistency across paths
readonly RUN_TIMESTAMP="$(date +%Y%m%d_%H%M%S)"

# Create a unique evidence directory name
readonly EVIDENCE_DIR="${EVIDENCE_BASE}_${RUN_TIMESTAMP}"
echo "EVIDENCE_DIR = $EVIDENCE_DIR"

# REPORT_FILE now uses the exact same timestamp as EVIDENCE_DIR
readonly REPORT_FILE="${EVIDENCE_DIR}/reports/incident_report_${RUN_TIMESTAMP}.txt"
echo "REPORT_FILE=$REPORT_FILE"

# ATTACK_SIGNATURES
readonly ATTACK_SIGNATURES="${LOG_DIR}/attack_signatures.txt"
echo "ATTACK_SIGNATURES = $ATTACK_SIGNATURES"

# TEMP_DIR
readonly TEMP_DIR="${EVIDENCE_DIR}/tmp"
echo "TEMP_DIR = $TEMP_DIR"

```

REPORT_FILE=evidence_20260531_194532/reports/incident_report_20260531_194532.txt
ATTACK_SIGNATURES = logs/attack_signatures.txt
TEMP_DIR = evidence_20260531_194532/tmp
## How to test

```bash
chmod +x step2_config.sh

# Default logs directory
./step2_config.sh
```

### Expected Output

```text
SCRIPT_NAME = step2_config.sh
SCRIPT_DIR = /home/yourname/yourfolder
LOG_DIR = logs
EVIDENCE_DIR = evidence_20260531_143045
REPORT_FILE = evidence_20260531_143045/reports/incident_report_20260531_143045.txt
ATTACK_SIGNATURES = logs/attack_signatures.txt
TEMP_DIR = evidence_20260531_143045/tmp
```

### Custom Directory

```bash
./step2_config.sh other_logs
```

### Verify Timestamp Changes

```bash
./step2_config.sh
./step2_config.sh
```

Notice that `EVIDENCE_DIR` changes on every run.

---

# Step 3: Logging Functions

## What this does

- `log()` prints messages with timestamps.
- `info()`, `warn()`, `error()`, and `fatal()` are shortcuts.
- `>&2` sends output to stderr.
- `exit 1` stops the script.

## Create file: `step3_functions.sh`

```bash
#!/bin/bash

set -eou pipefail
IFS=$'\n\t'

# Print a timestamp log message with a severity level
log(){
        local level="${1:-UNKNOWN}" # Fallback if level is missing
        shift
        # ${*:-} ensures set -u doesn't crash if no message is provided
        echo "[$(date '+%Y%m%d %H%M%S')] [${level}] ${*:-}"
}

info(){
        log "INFO" "${@:-}"
}

warn() {
    log "WARN" "${@:-}" >&2
}

error() {
    log "ERROR" "${@:-}" >&2
}

fatal() {
    log "FATAL" "${@:-}" >&2
    exit 1
}

# =============================================================================
# TEST THE FUNCTIONS
# =============================================================================
info "This is an info message"
warn "This is a warning"
error "This is an error"

# Uncomment to test
# fatal "This is fatal - script will stop here"

```

## How to test

```bash
chmod +x step3_functions.sh
./step3_functions.sh
```

### Expected Output

```text
[2026-05-31 14:30:45] [INFO] This is an info message
[2026-05-31 14:30:45] [WARN] This is a warning
[2026-05-31 14:30:45] [ERROR] This is an error
[2026-05-31 14:30:45] [INFO] If you see this, fatal() was not called
```

### Test `fatal()`

Uncomment:

```bash
fatal "This is fatal - script will stop here"
```

Expected:

```text
[2026-05-31 14:30:45] [INFO] This is an info message
[2026-05-31 14:30:45] [WARN] This is a warning
[2026-05-31 14:30:45] [ERROR] This is an error
[2026-05-31 14:30:45] [FATAL] This is fatal - script will stop here
```

The last `info()` message never appears.

---

# Step 4: Check Directory Exists

## What this does

- `[[ ! -d "$LOG_DIR" ]]` checks whether a directory does not exist.
- `-d` tests for a directory.
- `!` means NOT.
- `exit 1` stops execution when the directory is missing.

## Create file: `step4_checkdir.sh`

```bash
#!/bin/bash

set -eou pipefail
IFS=$'\n\t'

LOG_DIR="logs"

# Tests if folder LOG_DIR exists or does not exist
if [[ ! -d "$LOG_DIR" ]]; then
        echo "Error: Folder $LOG_DIR does not exist" >&2
        exit 1
fi

echo "Success: Folder $LOG_DIR exists"

```

## How to test

```bash
chmod +x step4_checkdir.sh

./step4_checkdir.sh
```

### Expected Output

```text
SUCCESS: Folder logs exists
```

### Test Missing Directory

Change:

```bash
LOG_DIR="logs"
```

to:

```bash
LOG_DIR="missing"
```

Run again:

```bash
./step4_checkdir.sh
```

Expected:

```text
ERROR: Folder missing does not exist
```

Check exit code:

```bash
echo $?
```

Expected:

```text
1
```








---

# Step 5: Loop Through Files and Check Properties

## What this does

- Loops through all `.log` files.
- Checks whether files exist.
- Checks whether files are readable.
- Checks whether files are empty.

## Create file: `step5_checkfiles.sh`

```bash
#!/bin/bash

set -eou pipefail
IFS=$'\n\t'

LOG_DIR='logs'

if [[ ! -d "$LOG_DIR" ]]; then
        echo "Error folder $LOG_DIR does not exist" >&2
        exit 1
fi

# Enable nullglob to safely handle empty directories
shopt -s nullglob

# Store files in an array to comply with set -u
files=("$LOG_DIR"/*.log)

#Checks if folder is empty
if (( ${#files[@]} == 0 )); then
        echo "No files found"
        exit 0
fi

for file in "${files[@]}"; do
        FILENAME=$(basename "$file")

        if [[ ! -r "$file" ]]; then
                echo "WARNING: $FILENAME is not readable" >&2
                continue
        fi
        echo "OK: $FILENAME is readable"

        # FIXED: Added the missing $ to "file"
        if [[ ! -s "$file" ]]; then
                echo "WARNING: $FILENAME is empty"
        else
                echo "OK: $FILENAME is not empty"
        fi
        echo "-----------"
done

```

## How to test

```bash
chmod +x step5_checkfiles.sh
./step5_checkfiles.sh
```

### Expected Output

```text
OK: auth.log is readable
OK: auth.log has data
---

OK: firewall.log is readable
OK: firewall.log has data
---

OK: system.log is readable
OK: system.log has data
---
```

### Test Empty File

```bash
touch logs/empty.log
./step5_checkfiles.sh
```

Expected:

```text
WARNING: empty.log is EMPTY
```

### Test Unreadable File

```bash
chmod 000 logs/auth.log
./step5_checkfiles.sh
```

Expected:

```text
WARNING: auth.log is NOT readable
```

Restore permissions:

```bash
chmod 644 logs/auth.log
```


# Step 6: Count Files with `find` and `wc`

## What this does

- `find "$LOG_DIR" -maxdepth 1 -type f -name "*.log"` searches for `.log` files.
- `| wc -l` counts the results.
- `$(...)` captures command output into a variable.









## Create file: `step6_countfiles.sh`

```bash
#!/bin/bash

set -eou pipefail
IFS=$'\n\t'

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
        echo "Error: Folder $LOG_DIR is not found" >&2
        exit 1
fi
echo "SUCCESS: Folder $LOG_DIR exists"

# Safely count files using a null-delimited stream to handle spaces/newlines
total_files=$(find "$LOG_DIR" -maxdepth 1 -type f -name "*.log" -print0 | grep -cz .)

echo "Total log files: $total_files"

```

## How to test

```bash
chmod +x step6_countfiles.sh

./step6_countfiles.sh
```

### Expected Output

```text
Total log files found: 4
```

### Add a New Log File

```bash
touch logs/new.log
./step6_countfiles.sh
```

Expected:

```text
Total log files found: 5
```

Remove it:

```bash
rm logs/new.log
```

---

# Step 7: Search Case-Insensitively with `grep -i`

## What this does

- `grep -i "error"` searches without regard to letter case.
- Matches:
  - `ERROR`
  - `error`
  - `Error`
  - `ErRoR`

## Create file: `step7_grep_i.sh`

```bash
#!/bin/bash

set -eou pipefail
IFS=$'\n\t'

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
        echo "ERROR: Folder $LOG_DIR does not exist" >&2
        exit 1
fi

echo "Success: Folder $LOG_DIR exists"
echo ""

# Enable nullglob so empty directories don't cause loop errors
shopt -s nullglob

# Store files in an array to safely handle set -u
files=("$LOG_DIR"/*.log)

if (( ${#files[@]} == 0 )); then
        echo "No files found"
        exit 0
fi

for file in "${files[@]}"; do
        FILENAME=$(basename "$file")

        if [[ ! -r "$file" ]]; then
                echo "File $file is not readable" >&2
                continue
        fi

        if [[ ! -s "$file" ]]; then
                echo "File $file is empty"
                continue
        fi

        echo "====== Searching for error in $FILENAME ======"
        
        # Added || true to prevent set -e from crashing when grep finds nothing
        grep -i "error" "$file" || true
        
        echo "--------"
        echo ""
done

```

## How to test

```bash
chmod +x step7_grep_i.sh
./step7_grep_i.sh
```

### Count Matches

```bash
grep -ci "error" logs/auth.lo
```

Expected:

```text
8
```

### Compare with Case-Sensitive Search

```bash
grep "error" logs/auth.log
```

Expected:

```text
0
```

---

# Step 8: Count Matches with `grep -c`

## What this does

- `grep -c` counts matching lines.
- Returns a number instead of the actual lines.

## Create file: `step8_grep_c.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 8: COUNT MATCHES
# =============================================================================

LOG_DIR="logs"
FILE="$LOG_DIR/auth.log"

if [[ ! -f "$FILE" ]]; then
    echo "ERROR: File $FILE does not exist"
    exit 1
fi

COUNT=$(grep -c "ERROR" "$FILE")

echo "Number of ERROR lines: $COUNT"
```

## How to test

```bash
chmod +x step8_grep_c.sh
./step8_grep_c.sh
```

### Expected Output

```text
Number of ERROR lines: 8
```

### Test Another File

```bash
FILE="$LOG_DIR/system.log" ./step8_grep_c.sh
```

Expected:

```text
Number of ERROR lines: 2
```

### Test a File with No Matches

```bash
echo "No errors here" > /tmp/clean.log
FILE="/tmp/clean.log" ./step8_grep_c.sh
```

Expected:

```text
Number of ERROR lines: 0
```

---

# Step 9: Show Line Numbers with `grep -n`

## What this does

- `grep -n` displays matching lines with line numbers.

## Create file: `step9_grep_n.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 9: SHOW LINE NUMBERS
# =============================================================================

LOG_DIR="logs"
FILE="$LOG_DIR/auth.log"

if [[ ! -f "$FILE" ]]; then
    echo "ERROR: File $FILE does not exist"
    exit 1
fi

echo "=== Errors with line numbers ==="
grep -n "ERROR" "$FILE"
```

## How to test

```bash
chmod +x step9_grep_n.sh
./step9_grep_n.sh
```

### Expected Output

```text
4:2026-05-28 14:25:15 ERROR: Authentication failure...
5:2026-05-28 14:25:18 ERROR: Authentication failure...
...
```

### Verify a Line Number

```bash
sed -n '4p' logs/auth.log
```

The output should match line 4 shown by `grep -n`.

---

# Step 10: List Files With and Without Matches (`-l` and `-L`)

## What this does

- `grep -l` lists files containing a match.
- `grep -L` lists files that do not contain a match.

## Create file: `step10_grep_l_L.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 10: LIST FILES WITH/WITHOUT MATCHES
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Files that CONTAIN CRITICAL ==="
grep -l "CRITICAL" "$LOG_DIR"/*.log

echo ""

echo "=== Files that DO NOT contain CRITICAL ==="
grep -L "CRITICAL" "$LOG_DIR"/*.log
```

## How to test

```bash
chmod +x step10_grep_l_L.sh
./step10_grep_l_L.sh
```

### Expected Output

```text
=== Files that CONTAIN CRITICAL ===
logs/auth.log
logs/firewall.log
logs/system.log

=== Files that DO NOT contain CRITICAL ===
logs/attack_signatures.txt
```

### Test Non-Existent Pattern

Replace:

```bash
CRITICAL
```

with:

```bash
NONEXISTENT
```

Expected:

```text
logs/auth.log
logs/firewall.log
logs/system.log
logs/attack_signatures.txt
```

under the "DO NOT contain" section.

---

# Step 11: Search Recursively with `grep -r`

## What this does

- Searches all files and subdirectories recursively.

## Create file: `step11_grep_r.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 11: SEARCH RECURSIVELY
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Searching recursively for 'breach' ==="
grep -r "breach" "$LOG_DIR"
```

## How to test

```bash
chmod +x step11_grep_r.sh
./step11_grep_r.sh
```

### Create a Subdirectory

```bash
mkdir -p logs/subfolder

echo "2026-05-28 17:00:00 CRITICAL: New breach detected" \
> logs/subfolder/extra.log

./step11_grep_r.sh
```

Expected:

- Includes results from `logs/subfolder/extra.log`.

Cleanup:

```bash
rm -rf logs/subfolder
```

---

# Step 12: Match Whole Words with `grep -w`

## What this does

- Matches only complete words.
- `breach` matches `breach`.
- Does not match:
  - `breaches`
  - `breachlog`

## Create file: `step12_grep_w.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 12: MATCH WHOLE WORDS
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Whole word 'breach' ==="
grep -w "breach" "$LOG_DIR"/*.log

echo ""

echo "=== Without -w (matches parts of words too) ==="
grep "breach" "$LOG_DIR"/*.log
```

## How to test

```bash
chmod +x step12_grep_w.sh
./step12_grep_w.sh
```

### Additional Test

Add a line:

```text
breaches were found
```

to a log file.

Expected:

```bash
grep -w "breach"
```

does not match.

```bash
grep "breach"
```

does match.

---

# Step 13: Match Exact Lines with `grep -x`

## What this does

- Matches an entire line exactly.
- Does not match longer lines containing the word.

## Create file: `step13_grep_x.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 13: MATCH EXACT LINES
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Exact line match 'CRITICAL' ==="
grep -x "CRITICAL" "$LOG_DIR"/*.log

echo ""
echo "(Probably no matches because no line is JUST 'CRITICAL')"
```

## How to test

```bash
chmod +x step13_grep_x.sh
./step13_grep_x.sh
```

### Create an Exact Match

```bash
echo "CRITICAL" > logs/test_exact.log

./step13_grep_x.sh
```

Expected:

```text
logs/test_exact.log:CRITICAL
```

Cleanup:

```bash
rm logs/test_exact.log
```

---

# Step 14: Show Context Lines with `-A`, `-B`, and `-C`

## What this does

| Option | Meaning |
|----------|----------|
| `-A N` | Show N lines After match |
| `-B N` | Show N lines Before match |
| `-C N` | Show N lines before and after |

## Create file: `step14_grep_ABC.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 14: SHOW CONTEXT LINES
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== 2 lines AFTER CRITICAL ==="
grep -A 2 "CRITICAL" "$LOG_DIR/auth.log" | head -n 9

echo ""

echo "=== 1 line BEFORE CRITICAL ==="
grep -B 1 "CRITICAL" "$LOG_DIR/auth.log" | head -n 6

echo ""

echo "=== 2 lines context around CRITICAL ==="
grep -C 2 "CRITICAL" "$LOG_DIR/auth.log" | head -n 12
```

## How to test

```bash
chmod +x step14_grep_ABC.sh
./step14_grep_ABC.sh
```

### Additional Tests

```bash
grep -A 5 "CRITICAL" logs/auth.log | head -n 20

grep -B 3 "CRITICAL" logs/auth.log | head -n 15

grep -C 1 "CRITICAL" logs/auth.log | head -n 10
```

Verify that:

- `-A` shows lines after matches.
- `-B` shows lines before matches.
- `-C` shows both before and after.


# Step 15: Extended Regex with `grep -E`

## What this does

- `grep -E` enables Extended Regular Expressions (ERE).
- Allows the use of `|` (OR operator) without escaping.
- Useful for matching multiple patterns in a single command.

## Create file: `step15_grep_E.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 15: EXTENDED REGEX
# =============================================================================

LOG_DIR="logs"

# Check if folder exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

# -E = extended regex (enables | for OR without escaping)
# The | means OR in regex

echo "=== Multiple attack patterns ==="
grep -E "brute_force|password_spray|data_exfiltration|DDoS" "$LOG_DIR"/*.log
```

## How to test

```bash
chmod +x step15_grep_E.sh
./step15_grep_E.sh
```

### Expected Output

Shows all lines containing:

- brute_force
- password_spray
- data_exfiltration
- DDoS

### Additional Tests

```bash
grep -E "ERROR|WARNING|CRITICAL" logs/auth.log
```

Expected:

```text
All ERROR, WARNING, and CRITICAL lines.
```

Compare with basic regex:

```bash
grep "ERROR\|CRITICAL" logs/auth.log
```

Expected:

```text
Same result, but \| must be escaped.
```

---

# Step 16: Literal String Matching with `grep -F`

## What this does

- `grep -F` treats patterns as literal text.
- Special regex characters lose their meaning.
- Faster than regex searches for fixed strings.

## Create file: `step16_grep_F.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 16: LITERAL STRING MATCHING
# =============================================================================

LOG_DIR="logs"

# Check if folder exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Literal IP match ==="
grep -F "192.168.1.105" "$LOG_DIR/auth.log"
```

## How to test

```bash
chmod +x step16_grep_F.sh
./step16_grep_F.sh
```

### Expected Output

All lines containing:

```text
192.168.1.105
```

### Compare `-F` vs Regex

```bash
echo "192.168.1.105" > logs/test_ip.txt
echo "192X168X1X105" >> logs/test_ip.txt
```

Using `-F`:

```bash
grep -F "192.168.1.105" logs/test_ip.txt
```

Expected:

```text
192.168.1.105
```

Using regex:

```bash
grep "192.168.1.105" logs/test_ip.txt
```

Expected:

```text
192.168.1.105
192X168X1X105
```

Cleanup:

```bash
rm logs/test_ip.txt
```

---

# Step 17: Multiple Patterns with `grep -e`

## What this does

- `-e` specifies a search pattern.
- Multiple `-e` options perform OR matching.

## Create file: `step17_grep_e.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 17: MULTIPLE PATTERNS
# =============================================================================

LOG_DIR="logs"

# Check if folder exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Multiple patterns ==="
grep -e "ERROR" -e "CRITICAL" "$LOG_DIR/auth.log"
```

## How to test

```bash
chmod +x step17_grep_e.sh
./step17_grep_e.sh
```

### Expected Output

All lines containing:

```text
ERROR
CRITICAL
```

### Add More Patterns

```bash
grep -e "ERROR" -e "CRITICAL" -e "WARNING" logs/auth.log
```

### Compare with `-E`

```bash
grep -E "ERROR|CRITICAL" logs/auth.log
```

Expected:

```text
Same result.
```

---

# Step 18: Read Patterns from File with `grep -f`

## What this does

- `grep -f` reads patterns from a file.
- Each line in the file is treated as a separate search pattern.

## Create file: `step18_grep_f.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 18: READ PATTERNS FROM FILE
# =============================================================================

LOG_DIR="logs"
SIGNATURES="$LOG_DIR/attack_signatures.txt"

# Check if folder exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

# Check if signatures file exists
if [[ ! -f "$SIGNATURES" ]]; then
    echo "ERROR: Signatures file $SIGNATURES does not exist"
    exit 1
fi

echo "=== Signature-based detection ==="
grep -f "$SIGNATURES" "$LOG_DIR"/*.log
```

## How to test

```bash
chmod +x step18_grep_f.sh
./step18_grep_f.sh
```

### Add a Signature

```bash
echo "brute_force" >> logs/attack_signatures.txt
./step18_grep_f.sh
```

### Remove a Signature

```bash
sed -i '/DDoS/d' logs/attack_signatures.txt
./step18_grep_f.sh
```

### Restore Original File

```bash
cat > logs/attack_signatures.txt << 'EOF'
brute_force
password_spray
data_exfiltration
DDoS
port_scan
reconnaissance
EOF
```

---

# Step 19: Control Filename Display with `-h` and `-H`

## What this does

| Option | Description |
|----------|----------|
| `-h` | Hide filenames |
| `-H` | Always show filenames |

## Create file: `step19_grep_h_H.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 19: CONTROL FILENAME DISPLAY
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== No filenames ==="
grep -h "ERROR" "$LOG_DIR"/*.log | head -n 5

echo ""

echo "=== With filenames ==="
grep -H "ERROR" "$LOG_DIR/auth.log" | head -n 5
```

## How to test

```bash
chmod +x step19_grep_h_H.sh
./step19_grep_h_H.sh
```

### Additional Tests

```bash
grep "ERROR" logs/*.log | head -n 3
```

Default:

```text
Shows filenames.
```

```bash
grep -h "ERROR" logs/*.log | head -n 3
```

Expected:

```text
No filenames displayed.
```

---

# Step 20: Suppress Errors with `-s` and Silent Check with `-q`

## What this does

| Option | Description |
|----------|----------|
| `-s` | Suppress error messages |
| `-q` | Quiet mode (no output) |

## Create file: `step20_grep_s_q.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 20: SUPPRESS ERRORS AND SILENT CHECK
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

if grep -qs "CRITICAL" "$LOG_DIR"/*.log; then
    echo "ALERT: CRITICAL found in logs!"
else
    echo "No CRITICAL alerts found"
fi

echo ""

echo "=== Searching non-existent file (no error shown) ==="
grep -s "ERROR" "$LOG_DIR/nonexistent.log" || echo "File not found (but no error message)"
```

## How to test

```bash
chmod +x step20_grep_s_q.sh
./step20_grep_s_q.sh
```

### Expected Output

```text
ALERT: CRITICAL found in logs!

=== Searching non-existent file (no error shown) ===
File not found (but no error message)
```

### Test Without `-s`

```bash
grep "ERROR" logs/nonexistent.log
```

Expected:

```text
Error message displayed.
```

### Test Exit Codes

```bash
grep -q "CRITICAL" logs/auth.log
echo $?
```

Expected:

```text
0
```

```bash
grep -q "NONEXISTENT" logs/auth.log
echo $?
```

Expected:

```text
1
```

---

# Step 21: Max Count with `-m` and Byte Offset with `-b`

## What this does

| Option | Description |
|----------|----------|
| `-m N` | Stop after N matches |
| `-b` | Show byte offsets |

## Create file: `step21_grep_m_b.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 21: MAX COUNT AND BYTE OFFSET
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== First 10 ERROR matches ==="
grep -m 10 "ERROR" "$LOG_DIR/auth.log"

echo ""

echo "=== Byte offsets of CRITICAL ==="
grep -b "CRITICAL" "$LOG_DIR/auth.log" | head -n 5
```

## How to test

```bash
chmod +x step21_grep_m_b.sh
./step21_grep_m_b.sh
```

### Additional Tests

```bash
grep -m 3 "ERROR" logs/auth.log
```

Expected:

```text
Only 3 matching lines.
```

```bash
grep -m 100 "ERROR" logs/auth.log
```

Expected:

```text
All ERROR lines.
```

---

# Step 22: Colorize Output with `--color`

## What this does

- Highlights matching text.
- Useful for visual analysis.

## Create file: `step22_grep_color.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 22: COLORIZE OUTPUT
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Colorized CRITICAL alerts ==="
grep --color=always "CRITICAL" "$LOG_DIR/auth.log" | head -n 5
```

## How to test

```bash
chmod +x step22_grep_color.sh
./step22_grep_color.sh
```

### Additional Tests

```bash
grep --color=always "CRITICAL" logs/auth.log > /tmp/color_test.txt
cat /tmp/color_test.txt
```

```bash
grep --color=auto "CRITICAL" logs/auth.log | cat
```

Expected:

```text
No colors when piped.
```

---

# Step 23: Extract Only Matching Parts with `grep -o`

## What this does

- Prints only the matched text.
- Useful for extracting data.

## Create file: `step23_grep_o.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 23: EXTRACT ONLY MATCHING PARTS
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Extract only IP addresses ==="
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" "$LOG_DIR/auth.log"
```

## How to test

```bash
chmod +x step23_grep_o.sh
./step23_grep_o.sh
```

### Count Unique IPs

```bash
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" logs/auth.log | sort | uniq
```

### Extract Usernames

```bash
grep -o "user=[a-z]*" logs/auth.log
```

Expected:

```text
user=admin
user=root
...
```

---

# Step 24: Sort and Count Unique with `sort`, `uniq`, and `uniq -c`

## What this does

- `sort` sorts data.
- `uniq` removes duplicates.
- `uniq -c` counts occurrences.

## Create file: `step24_sort_uniq.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 24: SORT AND COUNT UNIQUE
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== IP frequency (most common first) ==="
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" "$LOG_DIR/auth.log" | sort | uniq -c | sort -nr
```

## How to test

```bash
chmod +x step24_sort_uniq.sh
./step24_sort_uniq.sh
```

### Verify Counts

```bash
grep -o "192.168.1.105" logs/auth.log | wc -l
```

### Incorrect Usage Example

```bash
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" logs/auth.log | uniq -c
```

Expected:

```text
Incorrect counts because uniq only removes adjacent duplicates.
```

---

# Step 25: Extract Columns with `cut`

## What this does

- Extracts specific fields from text.
- Uses a delimiter to separate columns.

## Create file: `step25_cut.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 25: EXTRACT COLUMNS WITH CUT
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Date and time columns ==="
cut -d" " -f1,2 "$LOG_DIR/auth.log"
```

## How to test

```bash
chmod +x step25_cut.sh
./step25_cut.sh
```

### Extract Log Levels

```bash
cut -d" " -f3 logs/auth.log
```

Expected:

```text
INFO:
ERROR:
WARNING:
CRITICAL:
```

### Extract First Three Columns

```bash
cut -d" " -f1,2,3 logs/auth.log
```

### Use a Different Delimiter

```bash
cut -d"=" -f2 logs/auth.log | head -n 5
```

Expected:

```text
Values appearing after "=" signs.
```


# Step 26: Extract and Filter with `awk`

## What this does

- `awk` is a powerful text-processing tool.
- `awk '{print $1}'` prints the first field.
- `awk '{print $2}'` prints the second field.
- `-F` specifies a custom delimiter.
- Can perform filtering, calculations, and conditional logic.

## Create file: `step26_awk.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 26: EXTRACT AND FILTER WITH AWK
# =============================================================================

LOG_DIR="logs"

# Check if folder exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

# awk = text processing tool
# '{print $1}' = print first field
# Default delimiter = whitespace

echo "=== First column only ==="
awk '{print $1}' "$LOG_DIR/auth.log"

echo ""

# -F"," = comma delimiter
# '{print $2}' = print second field

echo "=== If we had comma-separated data ==="
echo "name,age,city" | awk -F"," '{print $2}'

echo ""

# Filter high attempt counts
# /attempts=/ = process lines containing attempts=
# split() = split string into array
# a[2]+0 converts string to number

echo "=== High attempt counts (>5) ==="
awk '/attempts=/ {split($0,a,"attempts="); if(a[2]+0 > 5) print}' "$LOG_DIR/auth.log"
```

## How to test

```bash
chmod +x step26_awk.sh
./step26_awk.sh
```

### Extract Different Fields

```bash
awk '{print $2}' logs/auth.log
```

Expected:

```text
Time column
```

### Perform Calculations

```bash
echo "10 20 30" | awk '{print $1 + $2 + $3}'
```

Expected:

```text
60
```

### Filter Lines

```bash
awk '/CRITICAL/ {print}' logs/auth.log
```

Expected:

```text
Only CRITICAL lines
```

### Count CRITICAL Events

```bash
awk '/CRITICAL/ {count++} END {print count}' logs/auth.log
```

Expected:

```text
Number of CRITICAL events
```

---

# Step 27: Preview Files with `head` and `tail`

## What this does

| Command | Description |
|----------|----------|
| `head -n 20` | Show first 20 lines |
| `tail -n 20` | Show last 20 lines |
| `tail -f` | Follow file in real time |

## Create file: `step27_head_tail.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 27: PREVIEW FILES WITH HEAD AND TAIL
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== First 5 lines ==="
head -n 5 "$LOG_DIR/auth.log"

echo ""

echo "=== Last 5 lines ==="
tail -n 5 "$LOG_DIR/auth.log"
```

## How to test

```bash
chmod +x step27_head_tail.sh
./step27_head_tail.sh
```

### Additional Tests

```bash
head -n 1 logs/auth.log
```

Expected:

```text
First line only
```

```bash
tail -n 1 logs/auth.log
```

Expected:

```text
Last line only
```

### Display Lines 6–10

```bash
head -n 10 logs/auth.log | tail -n 5
```

### Follow Log Updates

```bash
tail -f logs/auth.log
```

In another terminal:

```bash
echo "New line" >> logs/auth.log
```

Expected:

```text
New line appears immediately
```

Press:

```text
Ctrl+C
```

to stop.

---

# Step 28: Create Directories with `mkdir -p`

## What this does

- Creates directories recursively.
- Does not fail if directories already exist.
- Brace expansion creates multiple folders at once.

## Create file: `step28_mkdir.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 28: CREATE DIRECTORIES WITH MKDIR -P
# =============================================================================

mkdir -p "evidence_$(date +%F)"/{raw,reports,archive}

echo "Created evidence folder with subfolders"

ls -la "evidence_$(date +%F)"
```

## How to test

```bash
chmod +x step28_mkdir.sh
./step28_mkdir.sh
```

### Expected Structure

```text
evidence_2026-05-31/
├── raw
├── reports
└── archive
```

### Run Again

```bash
./step28_mkdir.sh
```

Expected:

```text
No errors
```

### Verify Structure

```bash
ls -R evidence_2026-05-31
```

---

# Step 29: Create Archive with `tar`

## What this does

| Option | Meaning |
|----------|----------|
| `-c` | Create archive |
| `-z` | Compress with gzip |
| `-f` | Specify filename |

## Create file: `step29_tar.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 29: CREATE ARCHIVE WITH TAR
# =============================================================================

LOG_DIR="logs"

tar -czf logs_backup.tar.gz "$LOG_DIR"

echo "Created archive: logs_backup.tar.gz"

ls -lh logs_backup.tar.gz
```

## How to test

```bash
chmod +x step29_tar.sh
./step29_tar.sh
```

### Verify Archive Contents

```bash
tar -tzf logs_backup.tar.gz | head -n 10
```

### Extract Archive

```bash
mkdir /tmp/tar_test

tar -xzf logs_backup.tar.gz -C /tmp/tar_test

ls /tmp/tar_test/logs/
```

Expected:

```text
All log files present
```

### Cleanup

```bash
rm -rf /tmp/tar_test
```

---

# Step 30: Write Report with `echo` and Redirection

## What this does

| Operator | Meaning |
|-----------|----------|
| `>` | Overwrite file |
| `>>` | Append to file |

## Create file: `step30_report.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 30: WRITE REPORT WITH ECHO AND REDIRECTION
# =============================================================================

REPORT="report.txt"

echo "INCIDENT REPORT" > "$REPORT"
echo "Date: $(date)" >> "$REPORT"

echo "========================" >> "$REPORT"
echo "Errors found: 5" >> "$REPORT"

echo "Report created:"
cat "$REPORT"
```

## How to test

```bash
chmod +x step30_report.sh
./step30_report.sh
```

### Verify File Exists

```bash
ls -l report.txt
```

### Append Data

```bash
echo "New line" >> report.txt

cat report.txt
```

### Overwrite File

```bash
echo "New content" > report.txt

cat report.txt
```

Expected:

```text
Only "New content" remains
```

---

# Step 31: Check System Status

## What this does

| Command | Purpose |
|----------|----------|
| `uptime` | Show uptime |
| `df -h` | Show disk space |
| `free -m` | Show memory |

## Create file: `step31_system.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 31: CHECK SYSTEM STATUS
# =============================================================================

echo "=== UPTIME ==="
uptime

echo ""
echo "=== DISK SPACE ==="
df -h

echo ""
echo "=== MEMORY ==="
free -m
```

## How to test

```bash
chmod +x step31_system.sh
./step31_system.sh
```

### Disk Usage of Root Filesystem

```bash
df -h /
```

### Show Memory Line Only

```bash
free -m | grep Mem
```

### Extract Uptime Field

```bash
uptime | awk '{print $3}'
```

---

# Step 32: Replace Text with `sed`

## What this does

- `sed` edits text streams.
- `s/old/new/g` replaces all matches.
- Useful for redaction and report cleanup.

## Create file: `step32_sed.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 32: REPLACE TEXT WITH SED
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Redacted IPs ==="

sed 's/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/[REDACTED]/g' "$LOG_DIR/auth.log" | head -n 5
```

## How to test

```bash
chmod +x step32_sed.sh
./step32_sed.sh
```

### Replace ERROR

```bash
sed 's/ERROR/[ERROR]/g' logs/auth.log | head -n 5
```

### In-Place Edit

```bash
cp logs/auth.log logs/auth.log.bak

sed -i 's/ERROR/ERROR!!!/g' logs/auth.log

head -n 5 logs/auth.log
```

### Restore

```bash
mv logs/auth.log.bak logs/auth.log
```

---

# Step 33: Check Processes with `ps`

## What this does

- Lists running processes.
- Detects suspicious commands.
- Uses grep pattern trick to avoid matching itself.

## Create file: `step33_ps.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 33: CHECK PROCESSES WITH PS
# =============================================================================

echo "=== Checking for suspicious processes ==="

if ps aux | grep -q "[p]ython.*exfil\|[n]c.*185.220\|[c]url.*-T"; then
    echo "ALERT: Suspicious process detected!"
else
    echo "No suspicious processes found"
fi

echo ""

echo "=== All running processes ==="

ps aux | head -n 5
```

## How to test

```bash
chmod +x step33_ps.sh
./step33_ps.sh
```

### Simulate Background Process

```bash
python3 -c "import time; time.sleep(60)" &
```

Run again:

```bash
./step33_ps.sh
```

Stop process:

```bash
kill %1
```

---

# Step 34: Find Files by Time and Size

## What this does

| Option | Meaning |
|----------|----------|
| `-mtime -1` | Modified within 24 hours |
| `-size +100M` | Larger than 100 MB |

## Create file: `step34_find.sh`

```bash
#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 34: FIND FILES BY TIME AND SIZE
# =============================================================================

LOG_DIR="logs"

if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

echo "=== Recently modified files (last 24 hours) ==="

find "$LOG_DIR" -maxdepth 1 -type f -mtime -1

echo ""

echo "=== Large files (>100MB) ==="

find "$LOG_DIR" -maxdepth 1 -type f -size +100M || echo "None found"
```

## How to test

```bash
chmod +x step34_find.sh
./step34_find.sh
```

### Create Old File

```bash
touch -d "2 days ago" logs/old.log

./step34_find.sh
```

Expected:

```text
old.log should NOT appear under recently modified files
```

### Create Large File

```bash
dd if=/dev/zero of=logs/bigfile.log bs=1M count=120
```

Run again:

```bash
./step34_find.sh
```

Expected:

```text
bigfile.log appears in large file list
```

### Cleanup

```bash
rm logs/bigfile.log
rm logs/old.log
```


enterprise-forensics/
├── config/
├── logs/
├── evidence/
├── reports/
├── archives/
├── scripts/
│   ├── parser.sh
│   ├── threat_hunter.sh
│   ├── correlator.sh
│   ├── evidence_collector.sh
│   ├── reporter.sh
│   └── main.sh
├── signatures/
├── templates/
└── README.md

The **Full Enterprise Script** is the final phase where Steps 1–70 are no longer separate learning exercises. Everything is merged into a **single production-grade incident response platform**.

A typical enterprise structure would look like:

````markdown
# Step 71: Full Enterprise Forensics and Incident Response Script

## Goal

Combine all previous modules into one automated security analysis platform.

The script should:

1. Load configuration
2. Validate environment
3. Parse logs
4. Detect threats
5. Extract IOCs
6. Correlate events
7. Collect evidence
8. Generate reports
9. Archive results
10. Cleanup temporary files
11. Exit with meaningful status codes

---

# Enterprise Architecture

```text
main.sh
│
├── configuration
├── validation
├── logging
├── threat_detection
├── ioc_extraction
├── incident_correlation
├── evidence_collection
├── reporting
├── archiving
├── cleanup
└── exit_codes
```

---

# Configuration Module

## Purpose

Centralized settings.

Example:

```bash
readonly LOG_DIR="./logs"
readonly REPORT_DIR="./reports"
readonly EVIDENCE_DIR="./evidence"
readonly ARCHIVE_DIR="./archives"

readonly BRUTE_FORCE_THRESHOLD=10
readonly PASSWORD_SPRAY_THRESHOLD=15
readonly PORT_SCAN_THRESHOLD=20

readonly COMPANY_NAME="Example Corp"
```

Benefits:

```text
Change settings in one place.
```

---

# Validation Module

## Purpose

Verify environment before execution.

Checks:

```bash
validate_environment() {
    command -v grep >/dev/null || exit 3
    command -v awk >/dev/null || exit 3
    command -v sed >/dev/null || exit 3

    [[ -d "$LOG_DIR" ]] || exit 2
}
```

Checks:

```text
Directories
Permissions
Dependencies
Disk Space
Required Files
```

---

# Logging Framework

## Purpose

Log every action.

Example:

```bash
log() {
    local level="$1"
    shift

    echo "$(date '+%F %T') [$level] $*" \
        | tee -a "$REPORT_DIR/runtime.log"
}
```

Usage:

```bash
log INFO "Analysis started"
log WARNING "Multiple login failures"
log CRITICAL "Brute-force attack detected"
```

---

# Threat Detection Engine

## Purpose

Identify attacks automatically.

Modules:

```text
Brute Force
Password Spray
Port Scan
DDoS
Privilege Escalation
Data Exfiltration
```

Example:

```bash
detect_bruteforce() {
    awk '/FAILED_LOGIN/' auth.log \
        | sort \
        | uniq -c \
        | awk '$1 > 10'
}
```

---

# IOC Extraction Engine

## Purpose

Extract indicators of compromise.

IOC Types:

```text
IP Addresses
Domains
URLs
Hashes
Usernames
Processes
```

Example:

```bash
extract_ips() {
    grep -oE \
    '[0-9]{1,3}(\.[0-9]{1,3}){3}' \
    "$LOG_DIR"/*.log \
    | sort -u
}
```

Output:

```text
iocs/ips.txt
```

---

# Incident Correlation Engine

## Purpose

Link related events together.

Example:

```text
Port Scan
↓
Brute Force
↓
Successful Login
↓
Privilege Escalation
```

Produces:

```text
Attack Timeline
```

Example:

```bash
correlate_events() {
    sort incident_events.txt
}
```

---

# Risk Scoring Engine

## Purpose

Calculate attack severity.

Example:

```bash
score=0

((score+=10))  # brute force
((score+=20))  # privilege escalation
((score+=50))  # exfiltration
```

Classification:

```text
0–20     LOW
21–50    MEDIUM
51–80    HIGH
81+      CRITICAL
```

---

# Evidence Collection Engine

## Purpose

Preserve forensic evidence.

Structure:

```text
evidence/
├── logs
├── hashes
├── timelines
├── screenshots
└── reports
```

Collection:

```bash
cp logs/*.log evidence/logs/
```

Hashing:

```bash
sha256sum evidence/logs/* \
> evidence/hashes/log_hashes.txt
```

---

# Chain of Custody Engine

## Purpose

Track evidence handling.

Record:

```text
Evidence ID
Collector
Date
Hash
Location
```

Example:

```bash
echo "$EVIDENCE_ID,$USER,$DATE,$HASH" \
>> chain_of_custody.csv
```

---

# Reporting Engine

## Purpose

Generate investigation reports.

Outputs:

```text
Executive Report
Technical Report
IOC Report
Timeline Report
```

Files:

```text
reports/
├── executive_report.txt
├── technical_report.txt
├── ioc_report.txt
└── timeline_report.txt
```

---

# Executive Report

Audience:

```text
Management
Executives
```

Contains:

```text
Incident Summary
Business Impact
Risk Rating
Recommendations
```

---

# Technical Report

Audience:

```text
SOC
IR Team
Engineers
```

Contains:

```text
Indicators
Evidence
Timeline
Root Cause
```

---

# IOC Report

Contains:

```text
IPs
Domains
URLs
Hashes
Users
```

Example:

```text
185.220.101.10
malicious-domain.com
5f4dcc3b5aa765...
```

---

# Timeline Report

Example:

```text
08:01 Port Scan
08:03 Password Spray
08:05 Login Success
08:06 Privilege Escalation
08:08 Data Exfiltration
```

---

# Archiving Engine

## Purpose

Preserve investigation artifacts.

Create archive:

```bash
tar -czf \
archives/case_001.tar.gz \
evidence reports
```

Verify:

```bash
sha256sum \
archives/case_001.tar.gz \
> archives/case_001.sha256
```

---

# Cleanup Engine

## Purpose

Remove temporary data.

Example:

```bash
cleanup() {
    rm -rf tmp/*
}
```

Cleanup:

```text
Temporary Files
Working Data
Caches
Intermediate Results
```

---

# Exit Code Framework

| Code | Meaning |
|--------|---------|
| 0 | Success |
| 1 | General Error |
| 2 | Missing File |
| 3 | Dependency Missing |
| 4 | Permission Error |
| 5 | Threat Detected |
| 6 | Critical Threat Detected |

Example:

```bash
exit 6
```

when a critical incident is discovered.

---

# Main Execution Flow

```text
START
 │
 ▼
Load Configuration
 │
 ▼
Validate Environment
 │
 ▼
Parse Logs
 │
 ▼
Detect Threats
 │
 ▼
Extract IOCs
 │
 ▼
Correlate Events
 │
 ▼
Risk Scoring
 │
 ▼
Collect Evidence
 │
 ▼
Generate Reports
 │
 ▼
Archive Results
 │
 ▼
Cleanup
 │
 ▼
Exit
```

---

# Enterprise Main Function

```bash
main() {

    load_configuration

    validate_environment

    initialize_logging

    detect_threats

    extract_iocs

    correlate_events

    calculate_risk

    collect_evidence

    generate_reports

    archive_results

    cleanup

    log INFO "Analysis complete"
}

main "$@"
```

---

# Final Enterprise Deliverables

```text
enterprise-forensics/
├── config/
├── logs/
├── evidence/
├── archives/
├── reports/
├── signatures/
├── scripts/
│   ├── main.sh
│   ├── threat_detection.sh
│   ├── ioc_extraction.sh
│   ├── correlation.sh
│   ├── evidence.sh
│   ├── reporting.sh
│   └── archive.sh
└── README.md
```

Result:

A production-style Bash-based Security Operations Center (SOC) toolkit capable of log analysis, threat hunting, incident response, evidence preservation, IOC extraction, reporting, and forensic archiving.
````

