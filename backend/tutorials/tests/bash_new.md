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
