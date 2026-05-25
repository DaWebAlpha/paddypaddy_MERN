# TABLE OF CONTENTS

* [Bypass Browser Auth with Personal Access Token](#bypass-browser-auth-with-personal-access-token)
* [Git Config Help & Guide](#git-config-help--guide)

---

## Bypass Browser Auth with Personal Access Token

To bypass the browser authentication prompt and push instantly using a personal access token (PAT), you need to configure Git to cache or store your token using a credential helper. Here are the two best ways to do this, depending on your operating system.

### Option 1: Use Git Credential Manager (Recommended)

This securely saves your token in your operating system's native keychain (like Windows Credential Manager or macOS Keychain). You only have to enter it once.

1. Run this command to set up the helper:
   ```bash
   git config --global credential.helper manager
   ```
2. Run your `git push` command.
3. When the prompt appears, choose the **Token** option (or **Sign in with a token**) instead of the browser option.
4. Paste your token. Git will remember it forever.

---

## Git Config Help & Guide

The `git config` command allows you to view and change settings that control how Git looks and operates. These settings can be applied at three different levels of scope.

### Configuration Scopes

* **System**: Applies to every user and all repositories on the machine.
  ```bash
  git config --system
  ```
* **Global**: Applies specifically to your user account across all your repositories.
  ```bash
  git config --global
  ```
* **Local**: Applies only to the specific repository you are currently inside (Default).
  ```bash
  git config --local
  ```

### Most Common Operations

* **List all settings**: See every configuration variable currently active.
  ```bash
  git config --list
  ```
* **Edit configuration file**: Open your global config file directly in a text editor.
  ```bash
  git config --global --edit
  ```
* **Get a specific value**: Check what a single setting is currently set to.
  ```bash
  git config user.name
  ```

### Essential First-Time Setup

Before working with repositories, you should always set your identity:

```bash
# Set your commit name
git config --global user.name "Your Name"

# Set your commit email
git config --global user.email "your.email@example.com"

# Set your default text editor (e.g., nano, vim, code)
git config --global core.editor nano

# Set your default initial branch name
git config --global init.defaultBranch main
```
