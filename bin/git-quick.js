#!/usr/bin/env node

'use strict'

const { execSync } = require('child_process')
const path = require('path')

const [, , ...args] = process.argv
const command = args[0]
const message = args.slice(1).join(' ')

const commands = {
  save: () => {
    if (!message) {
      console.error('Usage: git-quick save <commit message>')
      process.exit(1)
    }
    execSync('git add -A', { stdio: 'inherit' })
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
  },

  undo: () => {
    execSync('git reset HEAD~1 --soft', { stdio: 'inherit' })
    console.log('Last commit undone (soft reset)')
  },

  sync: () => {
    execSync('git fetch', { stdio: 'inherit' })
    execSync('git merge', { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
  },

  backup: () => {
    const branch = `backup/${Date.now()}`
    execSync(`git checkout -b ${branch}`, { stdio: 'inherit' })
    execSync('git add -A', { stdio: 'inherit' })
    execSync(`git commit -m "backup: ${new Date().toISOString()}"`, { stdio: 'inherit' })
    execSync('git push -u origin HEAD', { stdio: 'inherit' })
    console.log(`Backup created on branch: ${branch}`)
  },

  status: () => {
    execSync('git status -s', { stdio: 'inherit' })
  },

  help: () => {
    console.log(`
git-quick v1.0.0 - Git workflow shortcuts

Usage:
  git-quick <command> [options]

Commands:
  save <message>   Add all changes, commit, and push
  undo           Undo last commit (soft reset)
  sync           Fetch, merge, and push
  backup         Create timestamped backup branch and push
  status         Show short status
  help           Show this help

Examples:
  git-quick save "feat: add login page"
  git-quick undo
  git-quick sync
  git-quick backup
`)
  }
}

const cmd = commands[command] || commands.help
cmd()
