# GitHub Copilot Instructions

This document provides context and guidelines for GitHub Copilot when working with this repository.

## Project Overview

This is an HTML-based elevator game (`ascenseur-game-html`). The project uses plain HTML, CSS, and JavaScript without a build system.

## Project Structure

```
/
├── index.html          # Main entry point
├── ascenseur.html      # Elevator game page
├── ranking.html        # Ranking/leaderboard page
├── style.css           # Main stylesheet
├── VERSION             # Version file (format: Vxx.yyyy)
└── .github/
    ├── workflows/      # GitHub Actions workflows
    ├── scripts/        # Automation scripts
    └── *.md           # Documentation files
```

## Version Management

This project uses an automated version management system:

- **Version Format**: `Vxx.yyyy` (e.g., `V01.0003`)
  - `xx` = Major version (2 digits, zero-padded)
  - `yyyy` = Minor version (4 digits, zero-padded)

- **VERSION File**: Stores the current version at the root of the repository

- **Scripts**:
  - `.github/scripts/manage-version.sh` - Version management (get, increment-minor, increment-major, set)
  - `.github/scripts/summarize-changes.sh` - Summarize changes before commit/push

- **GitHub Action**: `.github/workflows/version-management.yml`
  - Runs automatically on Pull Requests
  - Posts PR comment with change summary and version info
  - Increments version (minor by default)
  - Commits version update to PR branch

## Coding Conventions

### HTML
- Use semantic HTML5 elements
- Keep consistent indentation (appears to use 2 or 4 spaces)
- Include appropriate meta tags and charset declarations

### CSS
- Organize styles logically by component or page
- Use consistent naming conventions
- Keep selectors as specific as needed but avoid over-specificity

### JavaScript
- Use modern ES6+ syntax when appropriate
- Keep code modular and maintainable
- Add comments for complex logic

### Version Control
- **Never manually edit the VERSION file** - always use the version management scripts
- Use conventional commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `chore:` for maintenance tasks
- Each PR should increment the version automatically

## GitHub Actions Workflow

### Version Management Workflow
- **Trigger**: Pull Request events (opened, synchronize, reopened) or manual dispatch
- **Process**:
  1. Summarizes all changes in the PR
  2. Increments version (minor by default, major optional)
  3. Posts detailed PR comment with changes and version info
  4. Commits updated VERSION file

### Manual Version Control
```bash
# Get current version
.github/scripts/manage-version.sh get

# Increment minor version (bug fixes, small features)
.github/scripts/manage-version.sh increment-minor

# Increment major version (breaking changes, major features)
.github/scripts/manage-version.sh increment-major

# Set specific version
.github/scripts/manage-version.sh set V02.0015
```

## Best Practices

### When Making Changes
1. Create a feature branch from the main branch
2. Make your changes
3. Create a Pull Request
4. Review the automated version management comment
5. Verify the version increment is appropriate
6. For major version bumps, manually trigger the workflow with "major" option
7. Merge after approval

### Version Increment Guidelines
- **Minor (default)**: Bug fixes, documentation, small features, styling changes
- **Major**: Breaking changes, major features, significant refactoring, API changes

### Files to Avoid Committing
- Build artifacts
- Dependencies (if any added in future)
- Temporary files
- IDE-specific files (should be in `.gitignore`)
- Test output files

## Testing
- Currently no automated test suite
- Manual testing required for HTML/CSS/JavaScript changes
- Test in multiple browsers when making UI changes

## Documentation
- Keep README.md updated with major changes
- Version management documentation in `.github/VERSION_MANAGEMENT.md`
- Quick reference in `.github/QUICK_REFERENCE.md`

## Helpful Commands

```bash
# View change summary before committing
.github/scripts/summarize-changes.sh

# Check current version
cat VERSION

# View git status
git status

# View recent commits
git log --oneline -10
```

## Notes for Copilot

- This is a simple HTML game project without complex build processes
- Focus on maintaining simplicity and avoiding over-engineering
- Always use the version management scripts - never manually edit VERSION
- When suggesting changes, consider the impact on version numbering
- Be mindful of browser compatibility for JavaScript and CSS
