---
title: 'Generating GitHub Line Links with Vim in VS Code'
date: '2025-07-07T09:00:00.000Z'
description: 'Another keybinding I wish I had added sooner'
thumbnail: '/img/blog/thumbnail10.png'
---

# Generate GitHub Line Links with a Vim Shortcut in VS Code

Sharing specific lines of code requires navigating to GitHub, finding the file, and copying the URL with line anchor. This process is inefficient and interrupts development flow.

This guide shows how to create a keyboard shortcut that generates GitHub links for the current line in VS Code/Cursor with VSCodeVim.

## Problem

Manual GitHub link creation involves:
1. Opening GitHub in browser
2. Navigating to repository and file
3. Finding the specific line
4. Copying URL with line anchor

This workflow breaks focus and wastes time during code reviews and collaboration.

## Solution

A VS Code task that automatically:
- Extracts current file path and line number
- Determines git repository information
- Constructs GitHub URL with line anchor
- Copies result to clipboard

## Implementation

### Create VS Code Task

Add `.vscode/tasks.json` to your workspace:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Generate Git Link",
            "type": "shell",
            "command": "bash",
            "args": [
                "-c",
                "FILE='${file}'; LINE='${lineNumber}'; GIT_ROOT=$(git rev-parse --show-toplevel); RELATIVE_PATH=$(realpath --relative-to=\"$GIT_ROOT\" \"$FILE\"); BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse HEAD); REMOTE_URL=$(git config --get remote.origin.url); if [[ $REMOTE_URL == git@github.com:* ]]; then GITHUB_URL=\"https://github.com/${REMOTE_URL#git@github.com:}\"; GITHUB_URL=\"${GITHUB_URL%.git}\"; elif [[ $REMOTE_URL == https://github.com/* ]]; then GITHUB_URL=\"${REMOTE_URL%.git}\"; else echo \"Error: Remote URL format not supported: $REMOTE_URL\"; exit 1; fi; LINK=\"${GITHUB_URL}/blob/${BRANCH}/${RELATIVE_PATH}#L${LINE}\"; echo \"$LINK\"; if command -v xclip &> /dev/null; then echo -n \"$LINK\" | xclip -selection clipboard && echo \"Link copied to clipboard\"; elif command -v wl-copy &> /dev/null; then echo -n \"$LINK\" | wl-copy && echo \"Link copied to clipboard\"; else echo \"Install xclip or wl-copy for clipboard functionality\"; fi"
            ],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new",
                "showReuseMessage": false,
                "clear": true,
                "close": false
            },
            "problemMatcher": []
        }
    ]
}
```

### Configure Vim Keybinding

Add to User Settings (`Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)"):

```json
{
  "vim.leader": "<space>",
  "vim.normalModeKeyBindings": [
    {
      "before": ["<leader>", "g", "l"],
      "commands": [
        {
          "command": "workbench.action.tasks.runTask",
          "args": "Generate Git Link"
        }
      ],
      "silent": true
    }
  ]
}
```

### Install Clipboard Support

Linux/WSL:
```bash
sudo apt update && sudo apt install -y xclip
```

macOS:
```bash
brew install xclip
```

## Technical Details

The script uses VS Code variables:
- `${file}` - Current file absolute path
- `${lineNumber}` - Current cursor line number

Git operations:
- `git rev-parse --show-toplevel` - Find repository root
- `git symbolic-ref --short HEAD` - Get current branch
- `git config --get remote.origin.url` - Get remote URL

URL construction handles both SSH (`git@github.com:user/repo.git`) and HTTPS (`https://github.com/user/repo.git`) remote formats.

## Usage

1. Position cursor on target line
2. Press `<Space>gl` in normal mode
3. GitHub URL is displayed and copied to clipboard

Output format:
```
https://github.com/user/repo/blob/branch/path/file.ext#L42
Link copied to clipboard
```

## Configuration Options

Modify keybinding in `vim.normalModeKeyBindings`:
```json
"before": ["<leader>", "u"]  // <Space>u
"before": ["g", "h"]         // gh
```

## Troubleshooting

- **Task not found**: Verify `.vscode/tasks.json` exists in workspace root
- **Keybinding inactive**: VSCodeVim settings must be in User Settings, not Workspace Settings  
- **No clipboard**: Install `xclip` or `wl-copy`
- **Wrong branch**: Script uses current git HEAD

## Requirements

- Git repository with GitHub remote
- VSCodeVim extension
- Bash shell
- Optional: `xclip` or `wl-copy` for clipboard functionality

This automation reduces a multi-step browser workflow to a two-keystroke operation. 

