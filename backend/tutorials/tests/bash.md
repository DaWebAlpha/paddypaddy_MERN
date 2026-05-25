# Enterprise Bash Automation Starter (Explained)

## main.sh

``` bash
#!/bin/bash

set -Eeuo pipefail

readonly ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "$ROOT_DIR/lib/logger.sh"
source "$ROOT_DIR/lib/validator.sh"
source "$ROOT_DIR/lib/dependency.sh"
source "$ROOT_DIR/lib/filesystem.sh"
source "$ROOT_DIR/lib/project.sh"
source "$ROOT_DIR/lib/cleanup.sh"

trap cleanup EXIT
trap 'handle_error $LINENO' ERR

main(){

    log_info "Application starting"

    check_dependencies

    ask_project_info

    create_project_structure

    initialize_project

    log_info "Finished successfully"

}

main "$@"
```

### Line-by-line explanation

-   `#!/bin/bash`
    -   Tells the system to run the script with Bash.
-   `set -Eeuo pipefail`
    -   `-E`: preserve error traps
    -   `-e`: stop if a command fails
    -   `-u`: stop if undefined variables are used
    -   `pipefail`: fail if any command in a pipeline fails
-   `readonly ROOT_DIR=...`
    -   Stores the project's root folder path.
    -   `readonly` means the value cannot change later.
-   `source ...`
    -   Loads functions from other files.
-   `trap cleanup EXIT`
    -   Run cleanup automatically when script ends.
-   `trap 'handle_error $LINENO' ERR`
    -   Run error handler if something fails.
-   `main(){}`
    -   Main function where application flow lives.
-   `main "$@"`
    -   Starts program execution.
    -   `"$@"` passes command-line arguments.

------------------------------------------------------------------------

## logger.sh

``` bash
#!/bin/bash

LOGFILE="logs/app.log"

log_info(){

    local message="$1"

    echo "[INFO] $message"

    echo "[INFO] $(date): $message" >> "$LOGFILE"
}
```

### Explanation

-   `LOGFILE="logs/app.log"`
    -   Stores where logs should be written.
-   `local message="$1"`
    -   Gets first value passed to function.
-   `echo`
    -   Prints message to terminal.
-   `>>`
    -   Appends text to file.
-   `$(date)`
    -   Executes date command and inserts result.

------------------------------------------------------------------------

## validator.sh

``` bash
validate_project_name(){

    local project="$1"

    if [[ -z "$project" ]]
    then
        log_error "Project name empty"
        exit 1
    fi
}
```

### Explanation

-   `[[ ]]`
    -   Advanced Bash condition.
-   `-z`
    -   Checks if string is empty.
-   `exit 1`
    -   Stop script and return failure.

------------------------------------------------------------------------

## Flow

Start ↓ Load modules ↓ Check dependencies ↓ Validate input ↓ Create
folders ↓ Initialize project ↓ Cleanup ↓ Finish







# Bash Enterprise Expansion Guide

This section extends the enterprise Bash structure with concepts you can
plug in later.

------------------------------------------------------------------------

# Arrays

``` bash
files=(
"README.md"
"index.html"
"style.css"
"script.js"
)
```

Explanation:

-   `files=()` → creates an array
-   Each item becomes an element

Access first element:

``` bash
echo "${files[0]}"
```

Output:

``` text
README.md
```

Loop through array:

``` bash
for file in "${files[@]}"
do
    echo "$file"
done
```

------------------------------------------------------------------------

# Case

``` bash
read -p "Choose environment: " env

case "$env" in

    dev)
        echo "Development"
        ;;

    prod)
        echo "Production"
        ;;

    *)
        echo "Unknown option"
        ;;

esac
```

Explanation:

-   `case` replaces many `if/elif`
-   `;;` ends a block
-   `*` means default

------------------------------------------------------------------------

# For loops

``` bash
for i in {1..5}
do
    echo "$i"
done
```

Output:

``` text
1
2
3
4
5
```

------------------------------------------------------------------------

# While loops

``` bash
count=1

while [ "$count" -le 5 ]
do

    echo "$count"

    ((count++))

done
```

Explanation:

-   Runs until condition becomes false

------------------------------------------------------------------------

# Regex

``` bash
if [[ "$email" =~ ^.+@.+\..+$ ]]
then
    echo "Valid email"
fi
```

Explanation:

-   `=~` means match pattern
-   `^` start
-   `$` end
-   `.+` one or more characters

------------------------------------------------------------------------

# grep

Search text:

``` bash
grep "admin" users.txt
```

Find line numbers:

``` bash
grep -n "admin" users.txt
```

------------------------------------------------------------------------

# sed

Replace text:

``` bash
sed 's/old/new/' file.txt
```

Modify file permanently:

``` bash
sed -i 's/old/new/' file.txt
```

------------------------------------------------------------------------

# awk

Print first column:

``` bash
awk '{print $1}' users.txt
```

Example:

Input:

``` text
John 20
Mary 18
```

Output:

``` text
John
Mary
```

------------------------------------------------------------------------

# Command arguments

Script:

``` bash
#!/bin/bash

echo "First argument: $1"
echo "Second argument: $2"
```

Run:

``` bash
./script.sh John 25
```

Output:

``` text
First argument: John
Second argument: 25
```

------------------------------------------------------------------------

# Trap patterns

Cleanup on exit:

``` bash
cleanup(){

echo "Cleaning..."

}

trap cleanup EXIT
```

Error trap:

``` bash
handle_error(){

echo "Error happened"

}

trap handle_error ERR
```

------------------------------------------------------------------------

# Deployment automation

Example deploy script:

``` bash
#!/bin/bash

git pull

npm install

npm run build

pm2 restart app
```

Flow:

Pull latest code → Install packages → Build → Restart server

------------------------------------------------------------------------

# Docker setup

Dockerfile:

``` docker
FROM node:20

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
```

Build:

``` bash
docker build -t myapp .
```

Run:

``` bash
docker run -p 3000:3000 myapp
```

------------------------------------------------------------------------

# CI/CD script example

GitHub Actions:

``` yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

    - uses: actions/checkout@v4

    - name: Install

      run: npm install

    - name: Test

      run: npm test

    - name: Build

      run: npm run build
```

Flow:

Push code ↓ Install packages ↓ Run tests ↓ Build project ↓ Deploy
