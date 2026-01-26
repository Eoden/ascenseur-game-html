# Quick Reference: Version Management System

## 🚀 Quick Start

This repository now has automated version management! Here's what you need to know:

## What Happens Automatically

When you create or update a Pull Request:

1. ✅ GitHub Action runs automatically
2. 📋 A comment is posted with a summary of all changes
3. 🔖 Version is automatically incremented (minor by default)
4. 💾 VERSION file is updated and committed

## Version Format

**Format:** `Vxx.yyyy`
- `xx` = Major version (01, 02, 03...)
- `yyyy` = Minor version (0001, 0002, 0003...)

**Examples:**
- `V01.0003` → `V01.0004` (minor increment)
- `V01.0999` → `V01.1000` (minor increment)
- `V01.0004` → `V02.0000` (major increment)

## Manual Commands

### Check Current Version
```bash
.github/scripts/manage-version.sh get
```

### Increment Version
```bash
# Increment minor version (default)
.github/scripts/manage-version.sh increment-minor

# Increment major version
.github/scripts/manage-version.sh increment-major
```

### Set Specific Version
```bash
.github/scripts/manage-version.sh set V03.0025
```

### View Change Summary
```bash
# Stage your changes first
git add .

# Then view summary
.github/scripts/summarize-changes.sh
```

## Workflow Options

### Automatic (Recommended)
Just create a PR - everything happens automatically!

### Manual Trigger
1. Go to Actions tab in GitHub
2. Select "Version Management and Change Approval"
3. Click "Run workflow"
4. Choose version type: `minor` or `major`

## When to Use Major vs Minor

**Minor (Default):**
- Bug fixes
- Small features
- Documentation updates
- Styling changes

**Major:**
- Breaking changes
- Major new features
- Significant refactoring
- API changes

## Example Workflow

1. **Make your changes** to code
2. **Create a Pull Request**
3. **Review the automated comment** on your PR
4. **Verify the version increment** is correct
5. If major version needed:
   - Go to Actions → Run workflow → Select "major"
   - Or run: `.github/scripts/manage-version.sh increment-major`
6. **Merge the PR** when approved

## Approval Process

Before merging:
- ✅ Review the change summary in PR comments
- ✅ Verify file changes are correct
- ✅ Confirm version increment is appropriate
- ✅ Check that VERSION file was updated

## Files

- **VERSION** - Current version number
- **.github/workflows/version-management.yml** - GitHub Action workflow
- **.github/scripts/manage-version.sh** - Version management script
- **.github/scripts/summarize-changes.sh** - Change summary script
- **.github/VERSION_MANAGEMENT.md** - Detailed documentation

## Troubleshooting

**Problem:** Workflow doesn't run
- Solution: Check GitHub Actions are enabled

**Problem:** Need to change version format
- Solution: Use `manage-version.sh set Vxx.yyyy`

**Problem:** Scripts not executable
- Solution: `chmod +x .github/scripts/*.sh`

## Need Help?

See the full documentation: [.github/VERSION_MANAGEMENT.md](.github/VERSION_MANAGEMENT.md)
