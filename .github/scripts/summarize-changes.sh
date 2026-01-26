#!/bin/bash

# Change Summary Script
# Summarizes all changes before commit/push

echo "========================================="
echo "📋 CHANGE SUMMARY"
echo "========================================="
echo ""

# Get current version
current_version=$(cat VERSION 2>/dev/null || echo "Unknown")
echo "📌 Current Version: $current_version"
echo ""

# Check if there are staged changes
if ! git diff --cached --quiet 2>/dev/null; then
    echo "✅ Staged Changes:"
    echo "-----------------------------------------"
    git diff --cached --stat
    echo ""
    echo "📝 Detailed Changes:"
    echo "-----------------------------------------"
    git diff --cached --unified=3
    echo ""
else
    echo "ℹ️  No staged changes found."
    echo ""
fi

# Check for unstaged changes
if ! git diff --quiet 2>/dev/null; then
    echo "⚠️  Unstaged Changes (not included in commit):"
    echo "-----------------------------------------"
    git diff --stat
    echo ""
fi

# Check for untracked files
untracked=$(git ls-files --others --exclude-standard 2>/dev/null)
if [ -n "$untracked" ]; then
    echo "📁 Untracked Files:"
    echo "-----------------------------------------"
    echo "$untracked"
    echo ""
fi

echo "========================================="
echo "🎯 Files to be committed:"
echo "========================================="
git diff --cached --name-status 2>/dev/null || echo "No files staged"
echo ""

# Show commit count
commit_count=$(git rev-list --count HEAD 2>/dev/null || echo "0")
echo "📊 Total commits in repository: $commit_count"
echo ""

echo "========================================="
echo "Please review the changes above."
echo "========================================="
