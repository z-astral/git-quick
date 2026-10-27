# git-quick

Git workflow shortcuts - add, commit, push in one command.

## Installation

```bash
npm install -g git-quick
```

## Usage

```bash
# Save all changes (add + commit + push)
git-quick save "feat: add login page"

# Undo last commit (soft reset)
git-quick undo

# Sync with remote (fetch + merge + push)
git-quick sync

# Create backup branch with timestamp
git-quick backup

# Show short status
git-quick status
```

## Commands

| Command | Description |
|---------|-------------|
| `save <message>` | Add all changes, commit, and push |
| `undo` | Undo last commit (keeps changes) |
| `sync` | Fetch, merge, and push |
| `backup` | Create timestamped backup branch |
| `status` | Show short git status |
| `help` | Show help message |

## Why?

Git workflows are repetitive. Instead of:

```bash
git add -A
git commit -m "feat: something"
git push
```

Just:

```bash
git-quick save "feat: something"
```

## Requirements

- Node.js >= 16.0.0
- Git installed

## License

MIT
