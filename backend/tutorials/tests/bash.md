# 🎯 PROJECT 1: COMPLETE ENTERPRISE LOG FORENSICS & INCIDENT RESPONSE SYSTEM

## PART 1: STEP-BY-STEP BUILDING BLOCKS (Learn Each Concept)

---

## Step 0: Create Test Data

Run these commands to create your test environment:

### Create the logs folder

```bash
mkdir -p logs
```

**What it does:** Creates a directory named `logs` to store all log files. The `-p` flag ensures no error if the directory already exists.

**Expected output:**
```
# (No output if successful, or nothing if directory already exists)
```

---

### Create auth.log with authentication events

```bash
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

**What it does:** Uses a heredoc (`<< 'EOF'`) to create `auth.log` with 35 lines of realistic authentication events. The single quotes around `EOF` prevent variable expansion, ensuring raw text is written exactly as provided. This log simulates a real-world attack scenario including brute force, password spraying, and data exfiltration.

**Expected output:**
```
# (No output if successful - the file is created silently)
```

---

### Create system.log

```bash
cat > logs/system.log << 'EOF'
2026-05-28 14:00:00 INFO: System startup - kernel=5.15.0-105-generic
2026-05-28 14:00:05 INFO: Service sshd started - pid=1234
2026-05-28 14:00:10 INFO: Service nginx started - pid=1235
2026-05-28 14:00:15 INFO: Service mysql started - pid=1236
2026-05-28 14:05:00 WARN: High memory usage - process=mysql usage=78%
2026-05-28 14:10:00 INFO: Cron job executed - job=daily_backup status=success
2026-05-28 14:15:00 ERROR: Disk space low - filesystem=/var usage=95%
2026-05-28 14:20:00 WARN: CPU load high - load_avg=8.5 cores=4
2026-05-28 14:25:00 CRITICAL: Kernel panic - module=nvme0n1 error=I/O_timeout
2026-05-28 14:30:00 INFO: System reboot initiated - reason=kernel_panic
2026-05-28 14:35:00 INFO: System startup - kernel=5.15.0-105-generic
2026-05-28 14:40:00 INFO: Service sshd started - pid=2345
2026-05-28 14:45:00 INFO: Service nginx started - pid=2346
2026-05-28 14:50:00 INFO: Service mysql started - pid=2347
2026-05-28 15:00:00 INFO: Scheduled maintenance started - window=15:00-16:00
2026-05-28 15:05:00 WARN: Network latency high - interface=eth0 latency=450ms
2026-05-28 15:10:00 ERROR: Service nginx crashed - pid=2346 signal=SIGSEGV
2026-05-28 15:15:00 INFO: Service nginx restarted - pid=3456
2026-05-28 15:20:00 INFO: Cron job executed - job=hourly_check status=success
2026-05-28 15:25:00 WARN: Connection pool exhausted - service=mysql max=100 current=100
2026-05-28 15:30:00 CRITICAL: Database corruption detected - table=users rows=5000
2026-05-28 15:35:00 INFO: Backup initiated - target=/backup/daily size=2.4GB
2026-05-28 15:40:00 INFO: Backup completed - duration=300s size=2.4GB
2026-05-28 15:45:00 WARN: SSL certificate expiring - domain=company.com days=7
2026-05-28 15:50:00 ERROR: Failed to resolve DNS - server=8.8.8.8 query=api.company.com
2026-05-28 16:00:00 INFO: Scheduled maintenance completed - duration=3600s
2026-05-28 16:05:00 INFO: User session cleanup - removed=45 stale_sessions
2026-05-28 16:10:00 WARN: Swap usage high - usage=82% total=4GB
2026-05-28 16:15:00 ERROR: Permission denied - user=www-data path=/var/log/auth.log
2026-05-28 16:20:00 CRITICAL: Unauthorized root access detected - tty=pts/0 ip=185.220.101.42
2026-05-28 16:25:00 INFO: Security alert sent - severity=CRITICAL recipients=security@company.com
2026-05-28 16:30:00 INFO: System shutdown initiated - reason=security_incident
EOF
```

**What it does:** Creates `system.log` with 30 lines of system-level events. Simulates server operations including kernel panics, service crashes, database corruption, and unauthorized root access. Each line follows a standard syslog format with timestamp, severity, and detailed message.

**Expected output:**
```
# (No output if successful - the file is created silently)
```

---

### Create firewall.log

```bash
cat > logs/firewall.log << 'EOF'
2026-05-28 14:00:00 ALLOW tcp 192.168.1.105:54322 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 14:05:00 ALLOW tcp 192.168.1.110:54323 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 14:10:00 BLOCK tcp 45.33.22.11:54324 -> 10.0.0.10:22 [SSH] reason=geo_block
2026-05-28 14:15:00 ALLOW tcp 192.168.1.115:54325 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 14:20:00 BLOCK tcp 10.0.0.45:54326 -> 10.0.0.10:22 [SSH] reason=brute_force
2026-05-28 14:25:00 ALLOW tcp 192.168.1.120:54327 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 14:30:00 BLOCK udp 185.220.101.42:54328 -> 10.0.0.10:53 [DNS] reason=rate_limit
2026-05-28 14:35:00 ALLOW tcp 192.168.1.105:54329 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 14:40:00 BLOCK tcp 45.33.22.11:54330 -> 10.0.0.10:443 [HTTPS] reason=geo_block
2026-05-28 14:45:00 ALLOW tcp 192.168.1.110:54331 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 14:50:00 BLOCK tcp 185.220.101.42:54332 -> 10.0.0.10:22 [SSH] reason=brute_force
2026-05-28 14:55:00 ALLOW tcp 192.168.1.115:54333 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 15:00:00 BLOCK tcp 10.0.0.45:54334 -> 10.0.0.10:443 [HTTPS] reason=brute_force
2026-05-28 15:05:00 ALLOW tcp 192.168.1.120:54335 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 15:10:00 BLOCK udp 45.33.22.11:54336 -> 10.0.0.10:53 [DNS] reason=geo_block
2026-05-28 15:15:00 ALLOW tcp 192.168.1.105:54337 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 15:20:00 BLOCK tcp 185.220.101.42:54338 -> 10.0.0.10:443 [HTTPS] reason=brute_force
2026-05-28 15:25:00 ALLOW tcp 192.168.1.110:54339 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 15:30:00 BLOCK tcp 10.0.0.45:54340 -> 10.0.0.10:22 [SSH] reason=brute_force
2026-05-28 15:35:00 ALLOW tcp 192.168.1.115:54341 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 15:40:00 BLOCK tcp 45.33.22.11:54342 -> 10.0.0.10:22 [SSH] reason=geo_block
2026-05-28 15:45:00 ALLOW tcp 192.168.1.120:54343 -> 10.0.0.10:443 [HTTPS] len=52
2026-05-28 15:50:00 BLOCK tcp 185.220.101.42:54344 -> 10.0.0.10:22 [SSH] reason=brute_force
2026-05-28 15:55:00 ALLOW tcp 192.168.1.105:54345 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 16:00:00 BLOCK tcp 10.0.0.45:54346 -> 10.0.0.10:443 [HTTPS] reason=brute_force
2026-05-28 16:05:00 ALLOW tcp 192.168.1.110:54347 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 16:10:00 BLOCK udp 45.33.22.11:54348 -> 10.0.0.10:53 [DNS] reason=geo_block
2026-05-28 16:15:00 ALLOW tcp 192.168.1.115:54349 -> 10.0.0.10:22 [SSH] len=60
2026-05-28 16:20:00 BLOCK tcp 185.220.101.42:54350 -> 10.0.0.10:443 [HTTPS] reason=brute_force
2026-05-28 16:25:00 ALLOW tcp 192.168.1.120:54351 -> 10.0.0.10:443 [HTTPS] len=52
EOF
```

**What it does:** Creates `firewall.log` with 30 lines of firewall events. Uses a custom format showing timestamp, action (ALLOW/BLOCK), protocol, source IP:port, destination IP:port, service name, packet length, and block reason. This demonstrates how different log formats require different parsing strategies.

**Expected output:**
```
# (No output if successful - the file is created silently)
```

---

### Create attack_signatures.txt

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

**What it does:** Creates a signature file containing 6 known attack patterns. This file acts as a threat intelligence feed that the forensics script will use to detect known attack patterns in the logs. Each line represents a distinct attack type to search for.

**Expected output:**
```
# (No output if successful - the file is created silently)
```

---

### Verify Files

```bash
echo "=== Files created ==="
ls -lh logs/

echo ""
echo "=== Line counts ==="
wc -l logs/*
```

**What it does:**
- `ls -lh logs/` lists all files in the logs directory with human-readable sizes
- `wc -l logs/*` counts lines in each file, verifying data was written correctly

**Expected output:**
```
=== Files created ===
total 16K
-rw-r--r-- 1 user user  128 May 28 14:00 attack_signatures.txt
-rw-r--r-- 1 user user 2.8K May 28 14:00 auth.log
-rw-r--r-- 1 user user 2.5K May 28 14:00 firewall.log
-rw-r--r-- 1 user user 2.2K May 28 14:00 system.log

=== Line counts ===
  6 logs/attack_signatures.txt
 35 logs/auth.log
 30 logs/firewall.log
 30 logs/system.log
 101 total
```

---

## Expected Directory Structure

```text
logs/
├── auth.log              (35 lines - Authentication events)
├── system.log            (30 lines - System events)
├── firewall.log          (30 lines - Firewall events)
└── attack_signatures.txt (6 lines - Known attack patterns)
```

---

## PART 2: THE COMPLETE FORENSICS SCRIPT (Enterprise-Grade)

Below is the complete, production-ready script with detailed comments explaining every single line.

```bash
#!/bin/bash
# =============================================================================
# PROJECT 1: ENTERPRISE LOG FORENSICS & INCIDENT RESPONSE SYSTEM
# =============================================================================
# Purpose: Comprehensive log analysis for security incident detection and response
# Author: Security Operations Team
# Version: 1.0.0
# =============================================================================

# ---------------------------------------------------------------------------
# SECTION 1: STRICT MODE & CONFIGURATION
# ---------------------------------------------------------------------------
# Enable strict error handling - the script exits immediately if any command fails
set -eou pipefail

# IFS (Internal Field Separator) set to newline and tab only
# This prevents issues with spaces in filenames and ensures safe word splitting
IFS=$'\n\t'

# Define the log directory path
LOG_DIR="logs"

# ---------------------------------------------------------------------------
# SECTION 2: DIRECTORY VALIDATION
# ---------------------------------------------------------------------------
# Check if the logs directory exists
# NOTE: The original script had a bug here - it checked if directory EXISTS
# but printed "does not exist". The corrected version below uses proper logic.
if [[ ! -d "$LOG_DIR" ]]; then
        echo "ERROR: Folder $LOG_DIR does not exist" >&2
        exit 1
fi

echo "SUCCESS: Folder $LOG_DIR exists"

# ---------------------------------------------------------------------------
# SECTION 3: FILE DISCOVERY & GLOB HANDLING
# ---------------------------------------------------------------------------
# Enable nullglob: if no files match the pattern, the array becomes empty
# instead of containing the literal pattern string
shopt -s nullglob

# Create an array of all .log files in the LOG_DIR
# The quotes around "$LOG_DIR"/*.log prevent word splitting on filenames with spaces
files=("$LOG_DIR"/*.log)

# Check if any .log files were found
if (( ${#files[@]} == 0 )); then
        echo "No files found"
        exit 0
fi

# ---------------------------------------------------------------------------
# SECTION 4: FILE VALIDATION LOOP
# ---------------------------------------------------------------------------
# Iterate through each discovered log file
for file in "${files[@]}"; do
        # Extract just the filename (not the full path) for cleaner output
        FILENAME=$(basename "$file")

        # Check if the file is readable by the current user
        if [[ ! -r "$file" ]]; then
                echo "WARNING: $FILENAME is not readable" >&2
                continue  # Skip to next file if not readable
        fi
        echo "OK: $FILENAME is readable"

        # Check if the file has content (size > 0)
        if [[ ! -s "$file" ]]; then
                echo "WARNING: $FILENAME is empty"
        else
                echo "OK: $FILENAME is not empty"
        fi
        echo "-----------"

        # -------------------------------------------------------------------
        # SECTION 5: ERROR DETECTION (Case-Insensitive)
        # -------------------------------------------------------------------
        echo "====== Searching for error in $FILENAME ======"

        # grep -i: case-insensitive search for "error"
        # || true: ensures the script doesn't exit if grep finds no matches
        # (set -e would otherwise cause exit on grep's non-zero exit code)
        grep -i "error" "$file" || true

        # Count total error occurrences (-c = count, -i = case-insensitive)
        count=$(grep -c -i "error" "$file" || true)
        echo "Error: $count"

        # -------------------------------------------------------------------
        # SECTION 6: MULTI-LEVEL LOG ANALYSIS
        # -------------------------------------------------------------------
        # Define an array of severity levels to analyze
        LEVELS=("error" "info" "warn" "critical")

        # Loop through each severity level and count occurrences
        for level in "${LEVELS[@]}"; do
                count=$(grep -c -i "$level" "$file" || true)
                echo "$level: $count"
        done

        # Show line numbers for ERROR matches (-n = show line numbers)
        grep -n -i "Error" "$file"
done

# ---------------------------------------------------------------------------
# SECTION 7: FILE STATISTICS
# ---------------------------------------------------------------------------
# Count total .log files using find with null-terminated output
# -maxdepth 1: don't search subdirectories
# -type f: only regular files (not directories)
# -name "*.log": only files ending in .log
# -print0: output filenames separated by null characters (safe for special chars)
# grep -cz .: count (-c) null-terminated (-z) non-empty lines (.) 
# This is a robust way to count files that handles filenames with spaces/newlines
total_files=$(find "$LOG_DIR" -maxdepth 1 -type f -name "*.log" -print0 | grep -cz .)
echo "Total Files: $total_files"

# ---------------------------------------------------------------------------
# SECTION 8: CRITICAL PATTERN ANALYSIS
# ---------------------------------------------------------------------------
# Find files CONTAINING the word "CRITICAL"
# grep -l: list only filenames (not matching lines)
# || true: prevent exit if no matches found
echo " ==== FILES CONTAINING CRITICAL ==== "
grep -l "CRITICAL" "${files[@]}" || true
echo ""

# Find files NOT containing "CRITICAL"
# grep -L: list filenames that do NOT contain the pattern
echo " ==== FILES NOT CONTAINING CRITICAL ==== "
grep -L "CRITICAL" "${files[@]}" || true
echo ""

# ---------------------------------------------------------------------------
# SECTION 9: RECURSIVE & ADVANCED GREP SEARCHES
# ---------------------------------------------------------------------------
# Recursive search for "breach" in all files under LOG_DIR
echo "=== Searching recursively for 'breach' ==="
grep -r "breach" "$LOG_DIR"

# Search without -w flag (matches parts of words too, e.g., "breached")
echo "=== Without -w (matches parts of words too) ==="
grep "breach" "$LOG_DIR"/*.log

# Exact line match: only lines that are EXACTLY "CRITICAL" (no extra text)
echo "=== Exact line match 'CRITICAL' ==="
grep -x "CRITICAL" "$LOG_DIR"/*.log

# Show 2 lines AFTER each CRITICAL match (-A = After)
echo "=== 2 lines AFTER CRITICAL ==="
grep -A 2 "CRITICAL" "$LOG_DIR/auth.log" | head -n 9

echo ""

# Show 1 line BEFORE each CRITICAL match (-B = Before)
echo "=== 1 line BEFORE CRITICAL ==="
grep -B 1 "CRITICAL" "$LOG_DIR/auth.log" | head -n 6

echo ""

# Show 2 lines of context around each CRITICAL match (-C = Context)
echo "=== 2 lines context around CRITICAL ==="
grep -C 2 "CRITICAL" "$LOG_DIR/auth.log" | head -n 12

# ---------------------------------------------------------------------------
# SECTION 10: EXTENDED REGEX & FIXED STRING SEARCHES
# ---------------------------------------------------------------------------
# Extended regex: match ERROR OR WARNING OR CRITICAL
# -E: enable Extended Regular Expressions (| acts as OR operator)
grep -E "ERROR|WARNING|CRITICAL" logs/auth.log

# Fixed string search: search for exact string (no regex interpretation)
# -F: treat pattern as literal string (faster, safer for special characters)
grep -F "192.168.1.105" "$LOG_DIR/auth.log"

# Multiple patterns using -e flags
echo "=== Multiple patterns ==="
grep -e "ERROR" -e "CRITICAL" "$LOG_DIR/auth.log"

# Signature-based detection: read patterns from file
# -f: read patterns from file (one pattern per line)
echo "=== Signature-based detection ==="
# Define SIGNATURES variable if not already set
SIGNATURES="$LOG_DIR/attack_signatures.txt"
grep -f "$SIGNATURES" "$LOG_DIR"/*.log

# ---------------------------------------------------------------------------
# SECTION 11: OUTPUT FORMATTING OPTIONS
# ---------------------------------------------------------------------------
# Suppress filenames in output (-h = no filename headers)
echo "=== No filenames ==="
grep -h "ERROR" "$LOG_DIR"/*.log | head -n 5

echo ""

# Show filenames with each match (-H = force filename headers)
echo "=== With filenames ==="
grep -H "ERROR" "$LOG_DIR/auth.log" | head -n 5

# Limit to first 10 matches (-m = max count)
echo "=== First 10 ERROR matches ==="
grep -m 10 "ERROR" "$LOG_DIR/auth.log"

echo ""

# Show byte offsets (-b = show byte offset of each match)
echo "=== Byte offsets of CRITICAL ==="
grep -b "CRITICAL" "$LOG_DIR/auth.log" | head -n 5

# Colorized output (always color, even when piping)
echo "=== Colorized CRITICAL alerts ==="
grep --color=always "CRITICAL" "$LOG_DIR/auth.log" | head -n 5

# Demonstrate color codes in output
grep --color=always "CRITICAL" logs/auth.log > /tmp/color_test.txt
cat /tmp/color_test.txt

# Auto color: color only if output is terminal (disabled when piping to cat)
grep --color=auto "CRITICAL" logs/auth.log | cat

# ---------------------------------------------------------------------------
# SECTION 12: IP ADDRESS EXTRACTION & ANALYSIS
# ---------------------------------------------------------------------------
# Extract all IP addresses using regex
# -o: output only matching parts (not whole lines)
# -E: extended regex
# [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}: IPv4 pattern
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" logs/auth.log | sort | uniq

# Extract username patterns
# Matches "user=" followed by lowercase letters only
grep -o "user=[a-z]*" logs/auth.log

# IP frequency analysis: find most common IP addresses
echo "=== IP frequency (most common first) ==="
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" "$LOG_DIR/auth.log" | sort | uniq -c | sort -nr
# sort: alphabetically sort IPs
# uniq -c: count occurrences of each unique IP
# sort -nr: sort numerically in reverse order (highest count first)

# ---------------------------------------------------------------------------
# SECTION 13: AWK TEXT PROCESSING
# ---------------------------------------------------------------------------
# Print first column (space-separated) of auth.log
echo "=== First column only ==="
awk '{print $1}' "$LOG_DIR/auth.log"
# Default field separator is space/tab
# $1 refers to the first field (timestamp date)

echo ""

# Demonstrate custom field separator (comma)
echo "=== If we had comma-separated data ==="
echo "name,age,city" | awk -F"," '{print $2}'
# -F"," sets comma as field separator
# $2 extracts the second field ("age")

echo ""

# Advanced awk: filter lines with attempt counts > 5
echo "=== High attempt counts (>5) ==="
awk '/attempts=/ {split($0,a,"attempts="); if(a[2]+0 > 5) print}' "$LOG_DIR/auth.log"
# /attempts=/: only process lines containing "attempts="
# split($0,a,"attempts="): split line into array "a" at "attempts="
# a[2]+0: convert second part to number (the +0 forces numeric context)
# if > 5: only print if attempts exceed 5

# Print second column of auth.log (time field)
awk '{print $2}' logs/auth.log

# Arithmetic with awk: sum three numbers
echo "10 20 30" | awk '{print $1 + $2 + $3}'
# $1, $2, $3 are the three input numbers
# awk performs floating-point arithmetic automatically

# Print all lines containing CRITICAL
awk '/CRITICAL/ {print}' logs/auth.log
# /CRITICAL/ is a pattern match; {print} is the action

# Count CRITICAL occurrences using awk
awk '/CRITICAL/ {count++} END {print count}' logs/auth.log
# count++: increment counter for each match
# END {print count}: after all lines processed, print total

# ---------------------------------------------------------------------------
# SECTION 14: HEAD & TAIL OPERATIONS
# ---------------------------------------------------------------------------
# Show first 5 lines
echo "=== First 5 lines ==="
head -n 5 "$LOG_DIR/auth.log"
# -n 5: limit to 5 lines from the top

echo ""

# Show last 5 lines
echo "=== Last 5 lines ==="
tail -n 5 "$LOG_DIR/auth.log"
# -n 5: limit to 5 lines from the bottom

# Show first line only
head -n 1 logs/auth.log

# Show last line only
tail -n 1 logs/auth.log

# Show lines 6-10 (head then tail pipeline)
head -n 10 logs/auth.log | tail -n 5
# head -n 10: get first 10 lines
# tail -n 5: from those 10, get last 5 (lines 6-10)

# Follow log in real-time (like tail -f)
tail -f logs/auth.log
# -f: follow mode - keeps file open and shows new lines as they are added
# Press Ctrl+C to stop following

# Append a new line to demonstrate tail -f
echo "New line" >> logs/auth.log
# >>: append operator (doesn't overwrite existing content)

# ---------------------------------------------------------------------------
# SECTION 15: EVIDENCE COLLECTION & ARCHIVING
# ---------------------------------------------------------------------------
# Create evidence directory with dated name and subdirectories
# $(date +%F): expands to current date in YYYY-MM-DD format
# {raw,reports,archive}: bash brace expansion creates all three subdirectories
mkdir -p "evidence_$(date +%F)"/{raw,reports,archive}

echo "Created evidence folder with subfolders"

# List the created directory structure
ls -la "evidence_$(date +%F)"

# ---------------------------------------------------------------------------
# SECTION 16: LOG BACKUP & COMPRESSION
# ---------------------------------------------------------------------------
# Re-define LOG_DIR (redundant but ensures variable is set)
LOG_DIR="logs"

# Create compressed tar.gz archive of logs directory
# -c: create archive
# -z: compress with gzip
# -f: specify filename
tar -czf logs_backup.tar.gz "$LOG_DIR"

echo "Created archive: logs_backup.tar.gz"

# Show archive details
ls -lh logs_backup.tar.gz

# List contents of archive (without extracting)
# -t: list contents
# -z: handle gzip compression
# -f: specify archive file
tar -tzf logs_backup.tar.gz | head -n 10

# Create temporary directory for extraction test
mkdir /tmp/tar_test

# Extract archive to test directory
# -x: extract
# -C: change to directory before extracting
tar -xzf logs_backup.tar.gz -C /tmp/tar_test

# Verify extracted contents
ls /tmp/tar_test/logs/

# Clean up test directory
rm -rf /tmp/tar_test

# ---------------------------------------------------------------------------
# SECTION 17: INCIDENT REPORT GENERATION
# ---------------------------------------------------------------------------
# Define report filename
REPORT="report.txt"

# Create report with header and timestamp
# > : overwrite/create file
echo "INCIDENT REPORT" > "$REPORT"
# >> : append to file
echo "Date: $(date)" >> "$REPORT"
# $(date): command substitution - inserts current date and time
```

---

## PART 3: EXPECTED OUTPUTS FROM EACH SECTION

### Section 2 Output (Directory Validation)
```
SUCCESS: Folder logs exists
```

### Section 4 Output (File Validation)
```
OK: auth.log is readable
OK: auth.log is not empty
-----------
====== Searching for error in auth.log ======
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:40:25 ERROR: Authorization denied - user=guest ip=192.168.1.200 resource=/admin/config
2026-05-28 14:50:35 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:38 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:40 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:42 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 15:10:00 ERROR: Database connection timeout - service=auth_db ip=10.0.1.50 port=5432
2026-05-28 15:10:15 ERROR: Database connection failed - service=auth_db error=connection_refused
2026-05-28 15:25:12 ERROR: Permission denied - user=admin ip=192.168.1.105 resource=/etc/passwd
Error: 13
error: 13
info: 14
warn: 6
critical: 5
1:2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2:2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
3:2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
4:2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
5:2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
... (continues for all 35 lines)
```

### Section 7 Output (File Statistics)
```
Total Files: 3
```

### Section 8 Output (Critical Pattern Analysis)
```
 ==== FILES CONTAINING CRITICAL ==== 
logs/auth.log
logs/system.log

 ==== FILES NOT CONTAINING CRITICAL ==== 
logs/firewall.log
```

### Section 9 Output (Recursive & Advanced Searches)
```
=== Searching recursively for 'breach' ===
logs/auth.log:2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray

=== Without -w (matches parts of words too) ===
logs/auth.log:2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray

=== Exact line match 'CRITICAL' ===
# (No output - no line is EXACTLY "CRITICAL" without other text)

=== 2 lines AFTER CRITICAL ===
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:26:01 INFO: IP blocked - ip=10.0.0.45 reason=brute_force duration=3600s
2026-05-28 14:30:45 INFO: User login successful - user=jsmith ip=192.168.1.110
--
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
2026-05-28 14:35:00 INFO: User login successful - user=mgarcia ip=192.168.1.115
2026-05-28 14:40:22 WARNING: Privilege escalation attempt - user=guest ip=192.168.1.200 target=admin

=== 1 line BEFORE CRITICAL ===
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
--
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray

=== 2 lines context around CRITICAL ===
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:26:01 INFO: IP blocked - ip=10.0.0.45 reason=brute_force duration=3600s
2026-05-28 14:30:45 INFO: User login successful - user=jsmith ip=192.168.1.110
--
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
2026-05-28 14:35:00 INFO: User login successful - user=mgarcia ip=192.168.1.115
2026-05-28 14:40:22 WARNING: Privilege escalation attempt - user=guest ip=192.168.1.200 target=admin
```

### Section 10 Output (Extended Regex & Fixed Strings)
```
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:32:10 WARNING: Unusual login time - user=admin ip=45.33.22.11 geo=Russia
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
2026-05-28 14:40:22 WARNING: Privilege escalation attempt - user=guest ip=192.168.1.200 target=admin
2026-05-28 14:40:25 ERROR: Authorization denied - user=guest ip=192.168.1.200 resource=/admin/config
2026-05-28 14:50:33 WARNING: Multiple failed login attempts detected - user=admin ip=185.220.101.42 count=8
2026-05-28 14:50:35 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:38 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:40 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:42 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3
2026-05-28 14:50:48 CRITICAL: Account lockout triggered - user=admin ip=185.220.101.42 lockout_duration=900s
2026-05-28 15:10:00 ERROR: Database connection timeout - service=auth_db ip=10.0.1.50 port=5432
2026-05-28 15:10:05 WARNING: Retry attempt 1/3 - service=auth_db
2026-05-28 15:10:10 WARNING: Retry attempt 2/3 - service=auth_db
2026-05-28 15:10:15 ERROR: Database connection failed - service=auth_db error=connection_refused
2026-05-28 15:20:33 WARNING: Suspicious activity - user=admin ip=192.168.1.105 action=bulk_user_export
2026-05-28 15:25:12 ERROR: Permission denied - user=admin ip=192.168.1.105 resource=/etc/passwd
2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users
2026-05-28 15:35:00 INFO: Alert sent - severity=CRITICAL recipients=security@company.com

=== Multiple patterns ===
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
2026-05-28 14:40:25 ERROR: Authorization denied - user=guest ip=192.168.1.200 resource=/admin/config
2026-05-28 14:50:35 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:38 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:40 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:42 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3
2026-05-28 14:50:48 CRITICAL: Account lockout triggered - user=admin ip=185.220.101.42 lockout_duration=900s
2026-05-28 15:10:00 ERROR: Database connection timeout - service=auth_db ip=10.0.1.50 port=5432
2026-05-28 15:10:15 ERROR: Database connection failed - service=auth_db error=connection_refused
2026-05-28 15:25:12 ERROR: Permission denied - user=admin ip=192.168.1.105 resource=/etc/passwd
2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users

=== Signature-based detection ===
logs/auth.log:2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
logs/auth.log:2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
logs/auth.log:2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3
logs/auth.log:2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users
```

### Section 11 Output (Formatting Options)
```
=== No filenames ===
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password

=== With filenames ===
logs/auth.log:2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
logs/auth.log:2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
logs/auth.log:2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
logs/auth.log:2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
logs/auth.log:2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password

=== First 10 ERROR matches ===
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:32:12 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:32:15 ERROR: Authentication failure - user=admin ip=45.33.22.11 reason=invalid_password
2026-05-28 14:40:25 ERROR: Authorization denied - user=guest ip=192.168.1.200 resource=/admin/config
2026-05-28 14:50:35 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:38 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:40 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password
2026-05-28 14:50:42 ERROR: Authentication failure - user=admin ip=185.220.101.42 reason=invalid_password

=== Byte offsets of CRITICAL ===
0:2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
142:2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
284:2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3
426:2026-05-28 14:50:48 CRITICAL: Account lockout triggered - user=admin ip=185.220.101.42 lockout_duration=900s
568:2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users

=== Colorized CRITICAL alerts ===
# (Output will show "CRITICAL" in red text - exact display depends on terminal)
```

### Section 12 Output (IP Analysis)
```
10.0.0.45
10.0.1.50
185.220.101.42
192.168.1.105
192.168.1.110
192.168.1.115
192.168.1.120
192.168.1.200
45.33.22.11

user=admin
user=guest
user=jsmith
user=mgarcia
user=root
user=rjohnson

=== IP frequency (most common first) ===
     12 192.168.1.105
      6 185.220.101.42
      5 10.0.0.45
      3 45.33.22.11
      2 192.168.1.110
      2 192.168.1.115
      1 192.168.1.120
      1 192.168.1.200
      1 10.0.1.50
```

### Section 13 Output (AWK Processing)
```
=== First column only ===
2026-05-28
2026-05-28
2026-05-28
2026-05-28
2026-05-28
... (all 35 dates)

=== If we had comma-separated data ===
age

=== High attempt counts (>5) ===
2026-05-28 14:50:33 WARNING: Multiple failed login attempts detected - user=admin ip=185.220.101.42 count=8
2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3

14:23:01
14:23:05
14:25:12
14:25:15
... (all timestamps)

60

2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:32:18 CRITICAL: Potential breach attempt - user=admin ip=45.33.22.11 pattern=password_spray
2026-05-28 14:50:45 CRITICAL: Brute force attack detected - target=admin ip=185.220.101.42 attempts=8 threshold=3
2026-05-28 14:50:48 CRITICAL: Account lockout triggered - user=admin ip=185.220.101.42 lockout_duration=900s
2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users

5
```

### Section 14 Output (Head & Tail)
```
=== First 5 lines ===
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password

=== Last 5 lines ===
2026-05-28 15:25:12 ERROR: Permission denied - user=admin ip=192.168.1.105 resource=/etc/passwd
2026-05-28 15:30:00 CRITICAL: Data exfiltration detected - user=admin ip=192.168.1.105 records=5000 table=users
2026-05-28 15:35:00 INFO: Alert sent - severity=CRITICAL recipients=security@company.com
2026-05-28 15:40:00 INFO: User session terminated - user=admin ip=192.168.1.105 reason=security_alert
2026-05-28 16:00:00 INFO: User login successful - user=rjohnson ip=192.168.1.120

2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2

2026-05-28 16:00:00 INFO: User login successful - user=rjohnson ip=192.168.1.120

2026-05-28 14:25:22 ERROR: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:25 CRITICAL: Brute force attack detected - target=root ip=10.0.0.45 attempts=5 threshold=3
2026-05-28 14:26:01 INFO: IP blocked - ip=10.0.0.45 reason=brute_force duration=3600s
2026-05-28 14:30:45 INFO: User login successful - user=jsmith ip=192.168.1.110
2026-05-28 14:32:10 WARNING: Unusual login time - user=admin ip=45.33.22.11 geo=Russia
```

### Section 15 Output (Evidence Collection)
```
Created evidence folder with subfolders
total 12
drwxr-xr-x 5 user user 4096 Jun  1 10:48 .
drwxr-xr-x 1 user user 4096 Jun  1 10:48 ..
drwxr-xr-x 2 user user 4096 Jun  1 10:48 archive
drwxr-xr-x 2 user user 4096 Jun  1 10:48 raw
drwxr-xr-x 2 user user 4096 Jun  1 10:48 reports
```

### Section 16 Output (Backup & Compression)
```
Created archive: logs_backup.tar.gz
-rw-r--r-- 1 user user 3.2K Jun  1 10:48 logs_backup.tar.gz
logs/
logs/attack_signatures.txt
logs/auth.log
logs/firewall.log
logs/system.log

auth.log
attack_signatures.txt
firewall.log
system.log
```

---

## PART 4: LEARNING OBJECTIVES SUMMARY

By the end of this project you will have mastered:

| Skill | Command Examples | Use Case |
|-------|-----------------|----------|
| **Log Collection** | `mkdir`, `cat > file` | Creating test environments |
| **File Validation** | `[[ -r file ]]`, `[[ -s file ]]` | Pre-processing checks |
| **Pattern Matching** | `grep -i`, `grep -E`, `grep -F` | Finding security events |
| **Context Analysis** | `grep -A`, `grep -B`, `grep -C` | Understanding attack sequences |
| **Regex Extraction** | `grep -oE` | Pulling IPs, usernames from logs |
| **Frequency Analysis** | `sort \| uniq -c \| sort -nr` | Finding top attackers |
| **Field Processing** | `awk '{print $1}'`, `awk -F","` | Parsing structured logs |
| **Conditional Filtering** | `awk 'if (condition) print'` | Advanced log filtering |
| **File Sampling** | `head`, `tail`, `head \| tail` | Quick log inspection |
| **Real-time Monitoring** | `tail -f` | Live incident monitoring |
| **Evidence Handling** | `mkdir -p`, `tar -czf` | Forensic preservation |
| **Report Generation** | `echo > file`, `echo >> file` | Documentation creation |

---

## PART 5: COMMON BUGS & FIXES

### Bug 1: Directory Check Logic Error
```bash
# WRONG (from original script):
if [[ -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"  # This is backwards!

# CORRECT:
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi
```

### Bug 2: grep Exit Code with set -e
```bash
# PROBLEM: With "set -e", grep returns exit code 1 when no matches found
# This causes the entire script to abort!

grep "pattern" file  # Script dies here if no matches

# FIX: Use "|| true" to force exit code 0
grep "pattern" file || true
```

### Bug 3: Unset Variables with set -u
```bash
# PROBLEM: "set -u" causes error if SIGNATURES variable is not defined
grep -f "$SIGNATURES" file  # ERROR: SIGNATURES: unbound variable

# FIX: Define the variable before use
SIGNATURES="logs/attack_signatures.txt"
grep -f "$SIGNATURES" file
```

---

## PART 6: ENTERPRISE BEST PRACTICES

1. **Always use `set -eou pipefail`** for production scripts
2. **Quote all variables** to prevent word splitting: `"$VAR"` not `$VAR`
3. **Use `|| true`** with grep when "no matches" is an expected outcome
4. **Use `find -print0 | grep -z`** for robust file counting
5. **Use `mkdir -p`** to avoid errors when directories exist
6. **Use `shopt -s nullglob`** to handle empty glob results gracefully
7. **Log to stderr** (`>&2`) for errors and warnings
8. **Use heredocs with quoted delimiters** (`<< 'EOF'`) to prevent variable expansion
9. **Use `tar -czf`** for compressed backups and `tar -tzf` to verify contents
10. **Always validate inputs** before processing (check readability, non-emptiness)

---

*Document generated for Enterprise Log Forensics Training*
*Version: 1.0.0 | Date: 2026-06-01*


---

# 🔥 PART 7: STEPS 31-34 — ADVANCED SYSTEM FORENSICS

---

## Step 31: Check System Status

### What This Does

| Command | Purpose |
|---------|---------|
| `uptime` | Show how long the system has been running + load averages |
| `df -h` | Show disk space usage in human-readable format |
| `free -m` | Show memory usage in megabytes |

These commands give you a **snapshot of system health** — critical for determining if an attack has caused resource exhaustion (DDoS, cryptomining, etc.).

### Create file: `step31_system.sh`

```bash
#!/bin/bash

# Enable strict mode: exit on error, undefined variables, pipe failures
set -euo pipefail

# Set safe Internal Field Separator (newline and tab only)
IFS=$'\n\t'

# =============================================================================
# STEP 31: CHECK SYSTEM STATUS
# =============================================================================
# This script collects baseline system metrics for forensic analysis.
# Run this BEFORE and AFTER an incident to compare system state.
# =============================================================================

# Show system uptime and load averages
# uptime output format: "14:30:00 up 5 days, 2:15, 3 users, load average: 0.52, 0.58, 0.59"
echo "=== UPTIME ==="
uptime

# Add blank line for readability
echo ""

# Show disk space usage for all filesystems
# -h = human-readable (shows KB, MB, GB instead of blocks)
echo "=== DISK SPACE ==="
df -h

# Add blank line for readability
echo ""

# Show memory usage in megabytes
# -m = display in megabytes (easier to read than bytes)
# Output columns: total, used, free, shared, buff/cache, available
echo "=== MEMORY ==="
free -m
```

### How to test

```bash
chmod +x step31_system.sh
./step31_system.sh
```

### Expected Output

```
=== UPTIME ===
 14:30:00 up 5 days, 2:15, 3 users,  load average: 0.52, 0.58, 0.59

=== DISK SPACE ===
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   12G   36G  26% /
tmpfs           391M  1.2M  390M   1% /run
/dev/sdb1       100G   45G   55G  46% /data

=== MEMORY ===
              total        used        free      shared  buff/cache   available
Mem:           7812        2341        1234         345        4236        4567
Swap:          2048           0        2048
```

### Bonus Commands

#### Disk Usage of Root Filesystem Only

```bash
df -h /
```

**What it does:** The `/` argument tells `df` to only show the root filesystem. Useful when you only care about the main system disk (where logs are typically stored).

**Expected output:**
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   12G   36G  26% /
```

#### Show Memory Line Only

```bash
free -m | grep Mem
```

**What it does:** Pipes `free -m` output to `grep`, filtering only lines containing "Mem". This removes the header and Swap line, giving you just the memory statistics.

**Expected output:**
```
Mem:           7812        2341        1234         345        4236        4567
```

#### Extract Uptime Field (Days)

```bash
uptime | awk '{print $3}'
```

**What it does:**
- `uptime` outputs: `14:30:00 up 5 days, 2:15, 3 users, load average: 0.52, 0.58, 0.59`
- `awk '{print $3}'` extracts the 3rd field: `5`
- This gives you just the number of days the system has been up

**Expected output:**
```
5
```

> ⚠️ **Note:** If uptime is less than 1 day, the format changes to `up 2:15` and `$3` would extract `2:15,` instead. Production scripts should handle this with more robust parsing.

---

## Step 32: Replace Text with `sed`

### What This Does

- `sed` (Stream Editor) edits text **non-interactively** — perfect for batch processing logs.
- `s/old/new/g` is the substitution command: **s**ubstitute, **g**lobal (all occurrences per line).
- In forensics, `sed` is essential for **redacting sensitive data** (IPs, usernames) before sharing logs externally.

### Create file: `step32_sed.sh`

```bash
#!/bin/bash

# Enable strict mode
set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 32: REPLACE TEXT WITH SED
# =============================================================================
# This script demonstrates log redaction techniques.
# NEVER modify original logs — always work on copies!
# =============================================================================

LOG_DIR="logs"

# Validate logs directory exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

# Redact all IP addresses by replacing them with [REDACTED]
# sed pattern breakdown:
#   s/           = substitute command
#   [0-9]\{1,3\} = match 1-3 digits (octet)
#   \.          = literal dot (escaped with \)
#   {3}          = repeat the octet+dot pattern 3 times
#   [0-9]\{1,3\} = final octet
#   /[REDACTED]/ = replacement text
#   g            = global (replace ALL IPs on each line)
# | head -n 5    = pipe to head to show only first 5 lines
echo "=== Redacted IPs ==="
sed 's/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/[REDACTED]/g' "$LOG_DIR/auth.log" | head -n 5
```

### How to test

```bash
chmod +x step32_sed.sh
./step32_sed.sh
```

### Expected Output

```
=== Redacted IPs ===
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=[REDACTED] session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=[REDACTED] count=5
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=[REDACTED] reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=[REDACTED] reason=invalid_password
```

> 🔒 **Security Note:** All IP addresses are replaced with `[REDACTED]`, making the log safe to share with third parties while preserving the event structure.

### Bonus Commands

#### Replace ERROR with Bracketed Version

```bash
sed 's/ERROR/[ERROR]/g' logs/auth.log | head -n 5
```

**What it does:**
- `s/ERROR/[ERROR]/g`: Replace every occurrence of "ERROR" with "[ERROR]"
- This makes ERROR lines stand out visually in reports

**Expected output:**
```
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 [ERROR]: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 [ERROR]: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
```

#### In-Place Edit (DANGEROUS — Always Backup First!)

```bash
# Create a backup BEFORE modifying
cp logs/auth.log logs/auth.log.bak

# -i flag = edit in-place (modifies the actual file!)
sed -i 's/ERROR/ERROR!!!/g' logs/auth.log

# Verify the change
head -n 5 logs/auth.log
```

**What it does:**
- `cp`: Creates backup copy (CRITICAL safety step)
- `sed -i`: Edits file **in-place** (no output to terminal, file is modified directly)
- `s/ERROR/ERROR!!!/g`: Makes errors more visible

**Expected output:**
```
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 ERROR!!!: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR!!!: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
```

#### Restore Original File

```bash
mv logs/auth.log.bak logs/auth.log
```

**What it does:** Restores the original file from backup. Always verify backups work before relying on them!

---

## Step 33: Check Processes with `ps`

### What This Does

- `ps aux` lists **all running processes** with detailed information.
- In incident response, process analysis detects:
  - **Malware** running under suspicious names
  - **Data exfiltration** tools (`nc`, `curl`, `scp`)
  - **Cryptominers** consuming CPU
  - **Reverse shells** from compromised accounts
- The `[p]ython` trick prevents `grep` from matching itself in the process list.

### Create file: `step33_ps.sh`

```bash
#!/bin/bash

# Enable strict mode
set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 33: CHECK PROCESSES WITH PS
# =============================================================================
# Detects suspicious running processes that may indicate active compromise.
# Uses the "bracket trick" to prevent grep from matching itself.
# =============================================================================

echo "=== Checking for suspicious processes ==="

# Check for suspicious process patterns:
#   [p]ython.*exfil  = Python scripts with "exfil" in name (data exfiltration)
#   [n]c.*185.220   = netcat connections to known malicious IP
#   [c]url.*-T       = curl uploads (file transfer to remote server)
#
# The bracket trick: [p]ython matches "python" but NOT "[p]ython"
# This prevents the grep process itself from appearing in results
if ps aux | grep -q "[p]ython.*exfil\|[n]c.*185.220\|[c]url.*-T"; then
    echo "ALERT: Suspicious process detected!"
else
    echo "No suspicious processes found"
fi

# Add blank line for readability
echo ""

# Show first 5 lines of process list (header + 4 processes)
# ps aux columns: USER, PID, %CPU, %MEM, VSZ, RSS, TTY, STAT, START, TIME, COMMAND
echo "=== All running processes ==="
ps aux | head -n 5
```

### How to test

```bash
chmod +x step33_ps.sh
./step33_ps.sh
```

### Expected Output (Normal System)

```
=== Checking for suspicious processes ===
No suspicious processes found

=== All running processes ===
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 168576 12345 ?        Ss   Jun01   0:01 /sbin/init
root       123  0.0  0.2  23456  6789 ?        Ss   Jun01   0:00 /lib/systemd/systemd-journald
root       456  0.0  0.1  34567  4567 ?        Ss   Jun01   0:00 /usr/sbin/cron -f
root       789  0.0  0.3  45678  8901 ?        Ssl  Jun01   0:02 /usr/sbin/rsyslogd -n
```

### Bonus: Simulate Suspicious Process

#### Start a Background Process

```bash
python3 -c "import time; time.sleep(60)" &
```

**What it does:**
- `python3 -c`: Runs a Python one-liner
- `import time; time.sleep(60)`: Keeps process alive for 60 seconds
- `&`: Runs in background (returns immediately, doesn't block terminal)
- The process name will appear as `python3` in `ps aux`

#### Run Detection Again

```bash
./step33_ps.sh
```

**Expected output:**
```
=== Checking for suspicious processes ===
No suspicious processes found

=== All running processes ===
... (process list now includes the python3 process)
```

> ⚠️ **Note:** The simulated process won't trigger the alert because it doesn't contain "exfil", "nc", or "curl -T". To test the alert, you'd need: `python3 -c "import time; time.sleep(60)" exfil &`

#### Stop the Background Process

```bash
kill %1
```

**What it does:**
- `%1` refers to job number 1 (the most recent background job)
- `kill` sends SIGTERM (graceful termination signal)
- Use `kill -9 %1` for forceful kill (SIGKILL, cannot be ignored)

---

## Step 34: Find Files by Time and Size

### What This Does

| Option | Meaning |
|--------|---------|
| `-mtime -1` | Modified **less than 1 day ago** (within last 24 hours) |
| `-size +100M` | Larger than **100 megabytes** |
| `-maxdepth 1` | Only search current directory (don't recurse into subdirectories) |

These `find` options are critical for:
- **Detecting recently dropped malware** (files created during breach window)
- **Finding large exfiltration staging files** (attackers often compress data before sending)
- **Identifying log rotation issues** (logs growing too large)

### Create file: `step34_find.sh`

```bash
#!/bin/bash

# Enable strict mode
set -euo pipefail
IFS=$'\n\t'

# =============================================================================
# STEP 34: FIND FILES BY TIME AND SIZE
# =============================================================================
# Identifies recently modified and oversized files for forensic review.
# Large files may indicate data staging. Recent files may indicate malware.
# =============================================================================

LOG_DIR="logs"

# Validate logs directory exists
if [[ ! -d "$LOG_DIR" ]]; then
    echo "ERROR: Folder $LOG_DIR does not exist"
    exit 1
fi

# Find files modified in the last 24 hours
# -mtime -1: modified time less than 1 day (24 hours)
# -type f: only regular files (not directories)
# -maxdepth 1: don't search subdirectories
echo "=== Recently modified files (last 24 hours) ==="
find "$LOG_DIR" -maxdepth 1 -type f -mtime -1

# Add blank line for readability
echo ""

# Find files larger than 100MB
# -size +100M: size greater than 100 megabytes
# || echo "None found": if find returns no results, print friendly message
echo "=== Large files (>100MB) ==="
find "$LOG_DIR" -maxdepth 1 -type f -size +100M || echo "None found"
```

### How to test

```bash
chmod +x step34_find.sh
./step34_find.sh
```

### Expected Output (Fresh Environment)

```
=== Recently modified files (last 24 hours) ===
logs/auth.log
logs/system.log
logs/firewall.log
logs/attack_signatures.txt

=== Large files (>100MB) ===
None found
```

### Bonus: Create Test Files

#### Create an "Old" File (Modified 2 Days Ago)

```bash
touch -d "2 days ago" logs/old.log
./step34_find.sh
```

**What it does:**
- `touch -d "2 days ago"`: Creates/updates file with timestamp from 2 days ago
- When you run `./step34_find.sh` again, `old.log` should NOT appear in "recently modified"

**Expected output:**
```
=== Recently modified files (last 24 hours) ===
logs/auth.log
logs/system.log
logs/firewall.log
logs/attack_signatures.txt
# old.log is NOT listed because it's older than 24 hours

=== Large files (>100MB) ===
None found
```

#### Create a Large File (120MB)

```bash
dd if=/dev/zero of=logs/bigfile.log bs=1M count=120
```

**What it does:**
- `dd`: Disk duplication/data dump utility
- `if=/dev/zero`: Input file = infinite stream of zero bytes
- `of=logs/bigfile.log`: Output file = our test file
- `bs=1M`: Block size = 1 megabyte (write in 1MB chunks)
- `count=120`: Write 120 blocks = 120MB total

**Expected output:**
```
120+0 records in
120+0 records out
125829120 bytes (126 MB, 120 MiB) copied, 0.123456 s, 1.0 GB/s
```

#### Run Detection Again

```bash
./step34_find.sh
```

**Expected output:**
```
=== Recently modified files (last 24 hours) ===
logs/auth.log
logs/system.log
logs/firewall.log
logs/attack_signatures.txt
logs/bigfile.log    # <-- NEW: Just created!

=== Large files (>100MB) ===
logs/bigfile.log    # <-- DETECTED: Over 100MB threshold
```

#### Cleanup Test Files

```bash
rm logs/bigfile.log
rm logs/old.log
```

**What it does:** Removes the test files to restore clean environment.

---



---

# 🔥 PART 8: STEPS 31-34 — ADVANCED SYSTEM FORENSICS

---

## Step 31: Check System Status

### What This Does

| Command | Purpose |
|---------|---------|
| `uptime` | Show how long the system has been running + load averages |
| `df -h` | Show disk space usage in human-readable format |
| `free -m` | Show memory usage in megabytes |

These commands give you a **snapshot of system health** — critical for determining if an attack has caused resource exhaustion (DDoS, cryptomining, etc.).

### Create file: `step31_system.sh`

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

**What each line does:**
- `#!/bin/bash` — Shebang: tells the system this is a bash script
- `set -euo pipefail` — Strict mode: exit on error, undefined vars, pipe failures
- `IFS=$'\n\t'` — Set field separator to newline+tab only (safe word splitting)
- `echo "=== UPTIME ==="` — Print section header
- `uptime` — Show system uptime and load averages
- `echo ""` — Print blank line for readability
- `echo "=== DISK SPACE ==="` — Print section header
- `df -h` — Show disk usage in human-readable format (-h = human readable)
- `echo "=== MEMORY ==="` — Print section header
- `free -m` — Show memory in megabytes (-m = megabytes)

### How to test

```bash
chmod +x step31_system.sh
./step31_system.sh
```

### Expected Output

```
=== UPTIME ===
 14:30:00 up 5 days, 2:15, 3 users,  load average: 0.52, 0.58, 0.59

=== DISK SPACE ===
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   12G   36G  26% /
tmpfs           391M  1.2M  390M   1% /run
/dev/sdb1       100G   45G   55G  46% /data

=== MEMORY ===
              total        used        free      shared  buff/cache   available
Mem:           7812        2341        1234         345        4236        4567
Swap:          2048           0        2048
```

### Bonus Commands

#### Disk Usage of Root Filesystem

```bash
df -h /
```

**What it does:** The `/` argument tells `df` to only show the root filesystem. Useful when you only care about the main system disk (where logs are typically stored).

**Expected output:**
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   12G   36G  26% /
```

#### Show Memory Line Only

```bash
free -m | grep Mem
```

**What it does:** Pipes `free -m` output to `grep`, filtering only lines containing "Mem". This removes the header and Swap line, giving you just the memory statistics.

**Expected output:**
```
Mem:           7812        2341        1234         345        4236        4567
```

#### Extract Uptime Field

```bash
uptime | awk '{print $3}'
```

**What it does:**
- `uptime` outputs: `14:30:00 up 5 days, 2:15, 3 users, load average: 0.52, 0.58, 0.59`
- `awk '{print $3}'` extracts the 3rd field: `5`
- This gives you just the number of days the system has been up

**Expected output:**
```
5
```

> ⚠️ **Note:** If uptime is less than 1 day, the format changes to `up 2:15` and `$3` would extract `2:15,` instead. Production scripts should handle this with more robust parsing.

---

## Step 32: Replace Text with `sed`

### What This Does

- `sed` (Stream Editor) edits text **non-interactively** — perfect for batch processing logs.
- `s/old/new/g` is the substitution command: **s**ubstitute, **g**lobal (all occurrences per line).
- In forensics, `sed` is essential for **redacting sensitive data** (IPs, usernames) before sharing logs externally.

### Create file: `step32_sed.sh`

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

**What each line does:**
- `#!/bin/bash` — Shebang for bash interpreter
- `set -euo pipefail` — Strict error handling mode
- `IFS=$'\n\t'` — Safe field separator
- `LOG_DIR="logs"` — Define path to logs directory
- `if [[ ! -d "$LOG_DIR" ]]` — Check if directory does NOT exist
- `echo "ERROR: Folder $LOG_DIR does not exist"` — Print error message
- `exit 1` — Exit with error code 1
- `fi` — End if statement
- `echo "=== Redacted IPs ==="` — Print section header
- `sed 's/.../[REDACTED]/g'` — Substitute all IP addresses with [REDACTED]
  - `[0-9]\{1,3\}` = match 1-3 digits (octet)
  - `\.` = literal dot (escaped)
  - Repeated 4 times with dots = full IPv4 address
  - `g` = global (replace ALL IPs on each line)
- `"$LOG_DIR/auth.log"` — Input file
- `| head -n 5` — Pipe to head, show only first 5 lines

### How to test

```bash
chmod +x step32_sed.sh
./step32_sed.sh
```

### Expected Output

```
=== Redacted IPs ===
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=[REDACTED] session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=[REDACTED] count=5
2026-05-28 14:25:15 ERROR: Authentication failure - user=root ip=[REDACTED] reason=invalid_password
2026-05-28 14:25:18 ERROR: Authentication failure - user=root ip=[REDACTED] reason=invalid_password
```

> 🔒 **Security Note:** All IP addresses are replaced with `[REDACTED]`, making the log safe to share with third parties while preserving the event structure.

### Bonus Commands

#### Replace ERROR with Bracketed Version

```bash
sed 's/ERROR/[ERROR]/g' logs/auth.log | head -n 5
```

**What it does:**
- `s/ERROR/[ERROR]/g`: Replace every occurrence of "ERROR" with "[ERROR]"
- This makes ERROR lines stand out visually in reports

**Expected output:**
```
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 [ERROR]: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 [ERROR]: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
```

#### In-Place Edit (DANGEROUS — Always Backup First!)

```bash
# Create a backup BEFORE modifying
cp logs/auth.log logs/auth.log.bak

# -i flag = edit in-place (modifies the actual file!)
sed -i 's/ERROR/ERROR!!!/g' logs/auth.log

# Verify the change
head -n 5 logs/auth.log
```

**What it does:**
- `cp`: Creates backup copy (CRITICAL safety step)
- `sed -i`: Edits file **in-place** (no output to terminal, file is modified directly)
- `s/ERROR/ERROR!!!/g`: Makes errors more visible

**Expected output:**
```
2026-05-28 14:23:01 INFO: User login successful - user=admin ip=192.168.1.105 session=a7f3d9e2
2026-05-28 14:23:05 INFO: Session created - session_id=a7f3d9e2 user=admin
2026-05-28 14:25:12 WARNING: Multiple failed login attempts detected - user=root ip=10.0.0.45 count=5
2026-05-28 14:25:15 ERROR!!!: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
2026-05-28 14:25:18 ERROR!!!: Authentication failure - user=root ip=10.0.0.45 reason=invalid_password
```

#### Restore Original File

```bash
mv logs/auth.log.bak logs/auth.log
```

**What it does:** Restores the original file from backup. Always verify backups work before relying on them!

---

## Step 33: Check Processes with `ps`

### What This Does

- `ps aux` lists **all running processes** with detailed information.
- In incident response, process analysis detects:
  - **Malware** running under suspicious names
  - **Data exfiltration** tools (`nc`, `curl`, `scp`)
  - **Cryptominers** consuming CPU
  - **Reverse shells** from compromised accounts
- The `[p]ython` trick prevents `grep` from matching itself in the process list.

### Create file: `step33_ps.sh`

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

**What each line does:**
- `#!/bin/bash` — Shebang for bash
- `set -euo pipefail` — Strict mode
- `IFS=$'\n\t'` — Safe field separator
- `echo "=== Checking for suspicious processes ==="` — Print section header
- `if ps aux | grep -q "[p]ython.*exfil\|[n]c.*185.220\|[c]url.*-T"` — Check for suspicious processes
  - `ps aux` = list all processes
  - `|` = pipe output to grep
  - `grep -q` = quiet mode (no output, just exit code)
  - `[p]ython.*exfil` = Python scripts with "exfil" in name (data exfiltration)
  - `[n]c.*185.220` = netcat connections to known malicious IP
  - `[c]url.*-T` = curl uploads (file transfer to remote server)
  - The bracket trick: `[p]ython` matches "python" but NOT "[p]ython"
  - This prevents the grep process itself from appearing in results
- `then` — Start if-true block
- `echo "ALERT: Suspicious process detected!"` — Alert message
- `else` — Start if-false block
- `echo "No suspicious processes found"` — All-clear message
- `fi` — End if statement
- `echo ""` — Blank line
- `echo "=== All running processes ==="` — Print section header
- `ps aux | head -n 5` — Show first 5 lines of process list (header + 4 processes)
  - Columns: USER, PID, %CPU, %MEM, VSZ, RSS, TTY, STAT, START, TIME, COMMAND

### How to test

```bash
chmod +x step33_ps.sh
./step33_ps.sh
```

### Expected Output (Normal System)

```
=== Checking for suspicious processes ===
No suspicious processes found

=== All running processes ===
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 168576 12345 ?        Ss   Jun01   0:01 /sbin/init
root       123  0.0  0.2  23456  6789 ?        Ss   Jun01   0:00 /lib/systemd/systemd-journald
root       456  0.0  0.1  34567  4567 ?        Ss   Jun01   0:00 /usr/sbin/cron -f
root       789  0.0  0.3  45678  8901 ?        Ssl  Jun01   0:02 /usr/sbin/rsyslogd -n
```

### Bonus: Simulate Suspicious Process

#### Start a Background Process

```bash
python3 -c "import time; time.sleep(60)" &
```

**What it does:**
- `python3 -c`: Runs a Python one-liner
- `import time; time.sleep(60)`: Keeps process alive for 60 seconds
- `&`: Runs in background (returns immediately, doesn't block terminal)
- The process name will appear as `python3` in `ps aux`

#### Run Detection Again

```bash
./step33_ps.sh
```

**Expected output:**
```
=== Checking for suspicious processes ===
No suspicious processes found

=== All running processes ===
... (process list now includes the python3 process)
```

> ⚠️ **Note:** The simulated process won't trigger the alert because it doesn't contain "exfil", "nc", or "curl -T". To test the alert, you'd need: `python3 -c "import time; time.sleep(60)" exfil &`

#### Stop the Background Process

```bash
kill %1
```

**What it does:**
- `%1` refers to job number 1 (the most recent background job)
- `kill` sends SIGTERM (graceful termination signal)
- Use `kill -9 %1` for forceful kill (SIGKILL, cannot be ignored)

---

## Step 34: Find Files by Time and Size

### What This Does

| Option | Meaning |
|--------|---------|
| `-mtime -1` | Modified **less than 1 day ago** (within last 24 hours) |
| `-size +100M` | Larger than **100 megabytes** |
| `-maxdepth 1` | Only search current directory (don't recurse into subdirectories) |

These `find` options are critical for:
- **Detecting recently dropped malware** (files created during breach window)
- **Finding large exfiltration staging files** (attackers often compress data before sending)
- **Identifying log rotation issues** (logs growing too large)

### Create file: `step34_find.sh`

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

**What each line does:**
- `#!/bin/bash` — Shebang
- `set -euo pipefail` — Strict mode
- `IFS=$'\n\t'` — Safe field separator
- `LOG_DIR="logs"` — Define logs directory path
- `if [[ ! -d "$LOG_DIR" ]]` — Check if directory doesn't exist
- `echo "ERROR: Folder $LOG_DIR does not exist"` — Error message
- `exit 1` — Exit with error
- `fi` — End if
- `echo "=== Recently modified files (last 24 hours) ==="` — Section header
- `find "$LOG_DIR" -maxdepth 1 -type f -mtime -1` — Find recently modified files
  - `"$LOG_DIR"` = search in logs directory
  - `-maxdepth 1` = don't go into subdirectories
  - `-type f` = only regular files (not directories)
  - `-mtime -1` = modified less than 1 day ago (within 24 hours)
- `echo ""` — Blank line
- `echo "=== Large files (>100MB) ==="` — Section header
- `find "$LOG_DIR" -maxdepth 1 -type f -size +100M` — Find large files
  - `-size +100M` = size greater than 100 megabytes
- `|| echo "None found"` — If find returns no results, print friendly message

### How to test

```bash
chmod +x step34_find.sh
./step34_find.sh
```

### Expected Output (Fresh Environment)

```
=== Recently modified files (last 24 hours) ===
logs/auth.log
logs/system.log
logs/firewall.log
logs/attack_signatures.txt

=== Large files (>100MB) ===
None found
```

### Bonus: Create Test Files

#### Create an "Old" File (Modified 2 Days Ago)

```bash
touch -d "2 days ago" logs/old.log
./step34_find.sh
```

**What it does:**
- `touch -d "2 days ago"`: Creates/updates file with timestamp from 2 days ago
- When you run `./step34_find.sh` again, `old.log` should NOT appear in "recently modified"

**Expected output:**
```
=== Recently modified files (last 24 hours) ===
logs/auth.log
logs/system.log
logs/firewall.log
logs/attack_signatures.txt
# old.log is NOT listed because it's older than 24 hours

=== Large files (>100MB) ===
None found
```

#### Create a Large File (120MB)

```bash
dd if=/dev/zero of=logs/bigfile.log bs=1M count=120
```

**What it does:**
- `dd`: Disk duplication/data dump utility
- `if=/dev/zero`: Input file = infinite stream of zero bytes
- `of=logs/bigfile.log`: Output file = our test file
- `bs=1M`: Block size = 1 megabyte (write in 1MB chunks)
- `count=120`: Write 120 blocks = 120MB total

**Expected output:**
```
120+0 records in
120+0 records out
125829120 bytes (126 MB, 120 MiB) copied, 0.123456 s, 1.0 GB/s
```

#### Run Detection Again

```bash
./step34_find.sh
```

**Expected output:**
```
=== Recently modified files (last 24 hours) ===
logs/auth.log
logs/system.log
logs/firewall.log
logs/attack_signatures.txt
logs/bigfile.log    # <-- NEW: Just created!

=== Large files (>100MB) ===
logs/bigfile.log    # <-- DETECTED: Over 100MB threshold
```

#### Cleanup Test Files

```bash
rm logs/bigfile.log
rm logs/old.log
```

**What it does:** Removes the test files to restore clean environment.

---

# 🏗️ PART 9: ENTERPRISE ARCHITECTURE — THE COMPLETE PLATFORM

---

## Step 71: Full Enterprise Forensics and Incident Response Script

### Goal

Combine all previous modules (Steps 1–70) into **one automated security analysis platform**.

The script should:

1. **Load configuration** — Centralized settings for easy customization
2. **Validate environment** — Check dependencies, directories, permissions
3. **Parse logs** — Extract and normalize data from multiple log sources
4. **Detect threats** — Identify known attack patterns and anomalies
5. **Extract IOCs** — Pull out Indicators of Compromise (IPs, hashes, domains)
6. **Correlate events** — Link related events into attack timelines
7. **Collect evidence** — Preserve forensic integrity with hashing
8. **Generate reports** — Executive and technical reports for stakeholders
9. **Archive results** — Compress and hash all artifacts for long-term storage
10. **Cleanup temporary files** — Remove working data, keep only evidence
11. **Exit with meaningful status codes** — Allow automation and alerting integration

---

## Enterprise Architecture Diagram

```text
main.sh
│
├── configuration        ← Settings, thresholds, paths
├── validation           ← Dependency and environment checks
├── logging              ← Runtime audit trail
├── threat_detection     ← Attack pattern matching
├── ioc_extraction       ← Pull indicators from logs
├── incident_correlation ← Build attack timelines
├── risk_scoring         ← Calculate severity scores
├── evidence_collection  ← Preserve with chain of custody
├── reporting            ← Generate stakeholder reports
├── archiving            ← Compress and hash artifacts
├── cleanup              ← Remove temporary data
└── exit_codes           ← Return meaningful status
```

---

## Configuration Module

### Purpose

Centralized settings so you can change behavior in **one place** without touching code.

### Example

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

**What each line does:**
- `readonly LOG_DIR="./logs"` — Define logs directory path (readonly = cannot be modified later)
- `readonly REPORT_DIR="./reports"` — Define reports output directory
- `readonly EVIDENCE_DIR="./evidence"` — Define evidence preservation directory
- `readonly ARCHIVE_DIR="./archives"` — Define archive storage directory
- `readonly BRUTE_FORCE_THRESHOLD=10` — Set threshold: 10+ failed logins = brute force alert
- `readonly PASSWORD_SPRAY_THRESHOLD=15` — Set threshold: 15+ attempts across users = password spray
- `readonly PORT_SCAN_THRESHOLD=20` — Set threshold: 20+ unique ports = port scan alert
- `readonly COMPANY_NAME="Example Corp"` — Organization name for reports

### Benefits

```text
✅ Change settings in one place
✅ No code modification needed for tuning
✅ Easy to version control (config vs. logic separation)
✅ Supports multiple environments (dev/staging/prod configs)
```

---

## Validation Module

### Purpose

Verify the environment is ready before starting analysis. **Fail fast** if something is wrong.

### Checks

```bash
validate_environment() {
    command -v grep >/dev/null || exit 3
    command -v awk >/dev/null || exit 3
    command -v sed >/dev/null || exit 3

    [[ -d "$LOG_DIR" ]] || exit 2
}
```

**What each line does:**
- `validate_environment() {` — Define a bash function named validate_environment
- `command -v grep >/dev/null` — Check if `grep` command exists
  - `command -v` = returns path to command if installed, nothing if not
  - `>/dev/null` = discard output (we only care about exit code)
- `|| exit 3` — If grep not found, exit with code 3 (dependency missing)
- `command -v awk >/dev/null` — Check if `awk` exists
- `|| exit 3` — Exit if missing
- `command -v sed >/dev/null` — Check if `sed` exists
- `|| exit 3` — Exit if missing
- `[[ -d "$LOG_DIR" ]]` — Check if LOG_DIR exists and is a directory
- `|| exit 2` — If directory missing, exit with code 2 (missing file)
- `}` — End function definition

### Validation Checklist

```text
✅ Required commands installed (grep, awk, sed, tar, sha256sum)
✅ Required directories exist (or are created)
✅ Sufficient disk space available
✅ Read permissions on log directory
✅ Write permissions on output directories
✅ Required log files present
```

---

## Logging Framework

### Purpose

Create an **audit trail** of every action the script performs. Essential for:
- Debugging failures
- Proving analysis was conducted properly
- Regulatory compliance (SOC 2, ISO 27001, etc.)

### Example

```bash
log() {
    local level="$1"
    shift

    echo "$(date '+%F %T') [$level] $*" \
        | tee -a "$REPORT_DIR/runtime.log"
}
```

**What each line does:**
- `log() {` — Define a function named log
- `local level="$1"` — First argument is the severity level (INFO, WARNING, CRITICAL)
  - `local` = variable only exists inside this function
- `shift` — Remove first argument from the list, so $* contains only the message
- `echo "$(date '+%F %T') [$level] $*"` — Format the log message
  - `$(date '+%F %T')` = current timestamp in YYYY-MM-DD HH:MM:SS format
  - `[$level]` = severity level in brackets
  - `$*` = all remaining arguments (the message text)
- `|` — Pipe the output
- `tee -a "$REPORT_DIR/runtime.log"` — Write to both terminal AND file
  - `tee` = copies output to both stdout and file
  - `-a` = append mode (don't overwrite existing log)
  - `"$REPORT_DIR/runtime.log"` = path to runtime audit log
- `}` — End function

### Usage Examples

```bash
log INFO "Analysis started"
log WARNING "Multiple login failures"
log CRITICAL "Brute-force attack detected"
```

**What each line does:**
- `log INFO "Analysis started"` — Log an informational message
- `log WARNING "Multiple login failures"` — Log a warning
- `log CRITICAL "Brute-force attack detected"` — Log a critical alert

### Expected Log Format

```text
2026-06-01 11:15:32 [INFO] Analysis started
2026-06-01 11:15:33 [INFO] Environment validation passed
2026-06-01 11:15:35 [WARNING] Multiple login failures from IP 185.220.101.42
2026-06-01 11:15:36 [CRITICAL] Brute-force attack detected - threshold exceeded
2026-06-01 11:15:37 [INFO] Evidence collection started
2026-06-01 11:15:38 [INFO] Report generation completed
2026-06-01 11:15:39 [INFO] Analysis complete - exit code 6
```

---

## Threat Detection Engine

### Purpose

**Automatically identify attacks** by applying detection rules to parsed logs.

### Detection Modules

```text
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Brute Force    │  │  Password Spray  │  │   Port Scan     │
│  Detection      │  │  Detection       │  │   Detection     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│     DDoS        │  │ Privilege Escal  │  │ Data Exfiltra-  │
│   Detection     │  │   Detection      │  │   tion Detect   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Example: Brute Force Detection

```bash
detect_bruteforce() {
    awk '/FAILED_LOGIN/' auth.log \
        | sort \
        | uniq -c \
        | awk '$1 > 10'
}
```

**What each line does:**
- `detect_bruteforce() {` — Define function for brute force detection
- `awk '/FAILED_LOGIN/' auth.log` — Filter auth.log for lines containing "FAILED_LOGIN"
  - `awk '/pattern/'` = print lines matching pattern
- `|` — Pipe output to next command
- `sort` — Sort lines alphabetically (groups identical lines together)
- `|` — Pipe to next command
- `uniq -c` — Count occurrences of each unique line
  - Output format: `  5  2026-05-28...` (count + line)
- `|` — Pipe to next command
- `awk '$1 > 10'` — Filter only lines where count (first field) is greater than 10
  - `$1` = the count from uniq -c
- `}` — End function

### Detection Logic Summary

| Attack Type | Detection Method | Threshold |
|-------------|-----------------|-----------|
| Brute Force | Count failed logins per IP | > 10 failures |
| Password Spray | Count failed logins per user across IPs | > 15 attempts |
| Port Scan | Count unique destination ports per source | > 20 ports |
| DDoS | Count requests per minute | > 1000 req/min |
| Privilege Escalation | Monitor sudo/admin access patterns | Any unauthorized attempt |
| Data Exfiltration | Monitor large outbound transfers | > 1GB or bulk record access |

---

## IOC Extraction Engine

### Purpose

**Extract Indicators of Compromise** — the forensic artifacts that prove an attack occurred.

### IOC Types

```text
┌─────────────────────────────────────────────────────────────┐
│                    INDICATORS OF COMPROMISE                  │
├──────────────┬──────────────┬──────────────┬────────────────┤
│   IP Addr    │   Domains    │    URLs      │    Hashes      │
│  192.168.x   │ evil.com     │ /malware.exe │ 5f4dcc3b...    │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  Usernames   │  Processes   │   Files      │   Registry     │
│   admin      │  python3     │  /tmp/.x     │   HKLM\...    │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

### Example: IP Address Extraction

```bash
extract_ips() {
    grep -oE \
    '[0-9]{1,3}(\.[0-9]{1,3}){3}' \
    "$LOG_DIR"/*.log \
    | sort -u
}
```

**What each line does:**
- `extract_ips() {` — Define function for IP extraction
- `grep -oE` — Extract only matching parts, using extended regex
- `'[0-9]{1,3}(\.[0-9]{1,3}){3}'` — IPv4 address pattern
  - `[0-9]{1,3}` = 1-3 digits (first octet)
  - `(\.[0-9]{1,3}){3}` = dot + 1-3 digits, repeated 3 times (remaining octets)
- `"$LOG_DIR"/*.log` — Search all .log files in logs directory
- `|` — Pipe to next command
- `sort -u` — Sort and keep only unique entries (deduplication)
- `}` — End function

### Expected Output

```text
10.0.0.45
10.0.1.50
185.220.101.42
192.168.1.105
192.168.1.110
192.168.1.115
192.168.1.120
192.168.1.200
45.33.22.11
```

---

## Incident Correlation Engine

### Purpose

**Link related events** into a coherent attack timeline. A single event might be benign; a sequence of events reveals the attack.

### Example Attack Chain

```text
08:01:15  Port Scan        →  Attacker maps network
08:03:22  Password Spray   →  Attacker tries common passwords
08:05:47  Login Success    →  Attacker gains access
08:06:12  Privilege Escal  →  Attacker gains admin rights
08:08:33  Data Exfiltra    →  Attacker steals data
```

### Example: Timeline Generation

```bash
correlate_events() {
    sort incident_events.txt
}
```

**What each line does:**
- `correlate_events() {` — Define function for event correlation
- `sort incident_events.txt` — Sort events file chronologically
  - Assumes each line starts with a timestamp
  - Sorting by timestamp creates attack timeline
- `}` — End function

---

## Risk Scoring Engine

### Purpose

**Calculate a numerical risk score** to prioritize incidents and communicate severity to management.

### Example

```bash
score=0

((score+=10))  # brute force
((score+=20))  # privilege escalation
((score+=50))  # exfiltration
```

**What each line does:**
- `score=0` — Initialize risk score to zero
- `((score+=10))` — Add 10 points for brute force detection
  - `(( ))` = bash arithmetic evaluation
  - `score+=10` = increment score by 10
- `# brute force` — Comment explaining what the 10 points represent
- `((score+=20))` — Add 20 points for privilege escalation
- `# privilege escalation` — Comment
- `((score+=50))` — Add 50 points for data exfiltration (most severe)
- `# exfiltration` — Comment

### Classification

```text
0–20     LOW
21–50    MEDIUM
51–80    HIGH
81+      CRITICAL
```

---

## Evidence Collection Engine

### Purpose

**Preserve forensic evidence** with integrity verification. Evidence must be:
- **Complete** — nothing missing
- **Authentic** — not tampered with
- **Admissible** — legally defensible in court

### Structure

```text
evidence/
├── logs/              ← Original log copies
├── hashes/            ← SHA-256 checksums of all evidence
├── timelines/         ← Generated attack timelines
├── screenshots/       ← Terminal output captures
└── chain_of_custody/  ← Handling records
```

### Collection

```bash
cp logs/*.log evidence/logs/
```

**What it does:**
- `cp` = copy command
- `logs/*.log` = all .log files in logs directory
- `evidence/logs/` = destination directory for evidence preservation

### Hashing

```bash
sha256sum evidence/logs/* \
> evidence/hashes/log_hashes.txt
```

**What each line does:**
- `sha256sum evidence/logs/*` — Generate SHA-256 hashes of all evidence files
  - SHA-256 = cryptographic hash function (any change = completely different hash)
- `>` — Redirect output to file
- `evidence/hashes/log_hashes.txt` — Save hashes for integrity verification

---

## Chain of Custody Engine

### Purpose

**Track evidence handling** for legal proceedings and compliance audits.

### Record

```text
Evidence ID
Collector
Date
Hash
Location
```

### Example

```bash
echo "$EVIDENCE_ID,$USER,$DATE,$HASH" \
>> chain_of_custody.csv
```

**What each line does:**
- `echo` — Print a line of text
- `"$EVIDENCE_ID,$USER,$DATE,$HASH"` — CSV format with:
  - `$EVIDENCE_ID` = unique identifier for this evidence
  - `$USER` = current username (who handled the evidence)
  - `$DATE` = timestamp of handling
  - `$HASH` = SHA-256 hash at time of handling
- `\` — Line continuation (command continues on next line)
- `>>` — Append to file (don't overwrite)
- `chain_of_custody.csv` — CSV file tracking all evidence handling

---

## Reporting Engine

### Purpose

Generate **multiple report types** for different audiences:
- **Executive Report** — High-level summary for C-suite
- **Technical Report** — Detailed findings for SOC/IR team
- **IOC Report** — Machine-readable indicators for threat intel platforms
- **Timeline Report** — Chronological attack sequence

### Outputs

```text
reports/
├── executive_report.txt    ← Management summary
├── technical_report.txt    ← Detailed findings
├── ioc_report.txt          ← Machine-readable IOCs
└── timeline_report.txt      ← Attack chronology
```

---

## Executive Report

### Audience

```text
Management
Executives
```

### Contains

```text
Incident Summary
Business Impact
Risk Rating
Recommendations
```

---

## Technical Report

### Audience

```text
SOC
IR Team
Engineers
```

### Contains

```text
Indicators
Evidence
Timeline
Root Cause
```

---

## IOC Report

### Contains

```text
IPs
Domains
URLs
Hashes
Users
```

### Example

```text
185.220.101.10
malicious-domain.com
5f4dcc3b5aa765...
```

---

## Timeline Report

### Example

```text
08:01 Port Scan
08:03 Password Spray
08:05 Login Success
08:06 Privilege Escalation
08:08 Data Exfiltration
```

---

## Archiving Engine

### Purpose

**Preserve investigation artifacts** for long-term storage, legal holds, and compliance audits.

### Create archive

```bash
tar -czf \
archives/case_001.tar.gz \
evidence reports
```

**What each line does:**
- `tar -czf` — Create compressed archive
  - `-c` = create
  - `-z` = gzip compression
  - `-f` = specify filename
- `archives/case_001.tar.gz` — Output archive path
- `evidence reports` — Directories to include in archive

### Verify

```bash
sha256sum \
archives/case_001.tar.gz \
> archives/case_001.sha256
```

**What each line does:**
- `sha256sum archives/case_001.tar.gz` — Generate hash of archive
- `>` — Redirect to file
- `archives/case_001.sha256` — Save hash for future integrity checks

---

## Cleanup Engine

### Purpose

**Remove temporary data** while preserving evidence and reports. Prevents disk space issues and maintains clean workspace.

### Example

```bash
cleanup() {
    rm -rf tmp/*
}
```

**What each line does:**
- `cleanup() {` — Define cleanup function
- `rm -rf tmp/*` — Remove all files in tmp directory
  - `rm` = remove
  - `-r` = recursive (directories too)
  - `-f` = force (no confirmation prompts)
  - `tmp/*` = all files in tmp directory
- `}` — End function

### Cleanup Checklist

```text
✅ Temporary files removed (tmp/)
✅ Backup files removed (*.bak)
✅ Working data removed
✅ Evidence preserved (evidence/)
✅ Reports preserved (reports/)
✅ Archive preserved (archives/)
```

---

## Exit Code Framework

### Purpose

**Return meaningful status codes** so other scripts and automation tools can react appropriately.

### Exit Code Table

| Code | Meaning | When to Use |
|------|---------|-------------|
| 0 | Success | Analysis completed, no threats found |
| 1 | General Error | Unexpected failure during execution |
| 2 | Missing File | Required file or directory not found |
| 3 | Dependency Missing | Required command not installed |
| 4 | Permission Error | Cannot read logs or write output |
| 5 | Threat Detected | Non-critical threats found (score 21-50) |
| 6 | Critical Threat | Critical threats found (score 81+) |

### Example

```bash
exit 6
```

**What it does:**
- `exit 6` — Terminate script with exit code 6
- Code 6 = Critical threat detected
- Parent processes (cron, CI/CD, SOAR) can read this code and trigger alerts

---

## Main Execution Flow

### Complete Flow Diagram

```text
START
 │
 ▼
┌─────────────────────┐
│  Load Configuration │ ← Set paths, thresholds, company info
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│ Validate Environment│ ← Check deps, dirs, permissions, disk space
└─────────────────────┘
 │  (Exit 2-4 if failed)
 ▼
┌─────────────────────┐
│ Initialize Logging  │ ← Create runtime.log, start audit trail
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│   Detect Threats    │ ← Run all detection modules
└─────────────────────┘
 │  (brute force, password spray, port scan, etc.)
 ▼
┌─────────────────────┐
│  Extract IOCs       │ ← Pull IPs, hashes, domains from logs
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│ Correlate Events    │ ← Build attack timeline
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│  Calculate Risk     │ ← Score severity (0-100)
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│ Collect Evidence    │ ← Copy logs, generate hashes, chain of custody
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│ Generate Reports    │ ← Executive, technical, IOC, timeline
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│  Archive Results    │ ← tar.gz + SHA-256 of everything
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│      Cleanup        │ ← Remove tmp files, keep evidence+reports
└─────────────────────┘
 │
 ▼
┌─────────────────────┐
│  Exit with Status   │ ← Return code 0, 5, or 6
└─────────────────────┘
 │
 ▼
END
```

---

## Enterprise Main Function

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

**What each line does:**
- `main() {` — Define the main orchestration function
- `load_configuration` — Call function to load settings
- `validate_environment` — Call function to check prerequisites
- `initialize_logging` — Call function to start audit trail
- `detect_threats` — Call function to find attacks
- `extract_iocs` — Call function to pull indicators
- `correlate_events` — Call function to build timeline
- `calculate_risk` — Call function to score severity
- `collect_evidence` — Call function to preserve logs
- `generate_reports` — Call function to create deliverables
- `archive_results` — Call function to compress artifacts
- `cleanup` — Call function to remove temporary data
- `log INFO "Analysis complete"` — Log completion message
- `}` — End main function
- `main "$@"` — Execute main function with all command-line arguments
  - `"$@"` = all arguments passed to the script

---

## Final Enterprise Deliverables

### Complete Directory Structure

```text
enterprise-forensics/
│
├── config/
│   └── settings.conf           ← Centralized configuration
│
├── logs/                       ← Source log files (read-only)
│   ├── auth.log
│   ├── system.log
│   ├── firewall.log
│   └── attack_signatures.txt
│
├── evidence/                   ← Preserved forensic evidence
│   ├── logs/                   ← Copied original logs
│   ├── hashes/                 ← SHA-256 checksums
│   ├── iocs/                   ← Extracted indicators
│   └── chain_of_custody.csv   ← Handling records
│
├── archives/                   ← Compressed investigation packages
│   └── case_001_2026-06-01.tar.gz
│   └── case_001_2026-06-01.sha256
│
├── reports/                    ← Generated reports
│   ├── executive_report.txt
│   ├── technical_report.txt
│   ├── ioc_report.txt
│   ├── timeline_report.txt
│   └── runtime.log            ← Audit trail
│
├── signatures/                 ← Threat intelligence feeds
│   ├── attack_signatures.txt
│   └── ioc_blacklist.txt
│
├── scripts/                    ← Modular bash components
│   ├── main.sh                ← Entry point (orchestrates all)
│   ├── config.sh              ← Configuration loader
│   ├── validation.sh          ← Environment checker
│   ├── threat_detection.sh    ← Attack detectors
│   ├── ioc_extraction.sh      ← IOC extractors
│   ├── correlation.sh         ← Timeline builder
│   ├── evidence.sh            ← Evidence collector
│   ├── reporting.sh           ← Report generators
│   └── archive.sh             ← Archiving functions
│
└── README.md                   ← Documentation and usage guide
```

### Result

A **production-style Bash-based Security Operations Center (SOC) toolkit** capable of:

| Capability | Description |
|------------|-------------|
| ✅ Log Analysis | Parse and normalize multiple log formats |
| ✅ Threat Hunting | Detect known attack patterns and anomalies |
| ✅ Incident Response | Automated detection, scoring, and alerting |
| ✅ Evidence Preservation | Hash-verified copies with chain of custody |
| ✅ IOC Extraction | Pull IPs, domains, hashes for threat intel |
| ✅ Attack Correlation | Build chronological attack timelines |
| ✅ Risk Scoring | Numerical severity for prioritization |
| ✅ Multi-Audience Reporting | Executive, technical, and machine-readable |
| ✅ Forensic Archiving | Compressed, hashed, long-term storage |
| ✅ Automation Integration | Meaningful exit codes for SOAR/SIEM |

---

*Document continues from Part 1-6 (Steps 0-30) and Part 8 (Steps 31-34)*
*Complete Enterprise Log Forensics & Incident Response Training Guide*
*Version: 3.0.0 | Date: 2026-06-01*
