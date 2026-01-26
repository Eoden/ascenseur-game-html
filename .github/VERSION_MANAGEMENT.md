# Version Management System

This repository uses an automated version management system with GitHub Actions.

## Version Format

Versions follow the format: **Vxx.yyyy**
- `xx` = Major version (2 digits, zero-padded)
- `yyyy` = Minor version (4 digits, zero-padded)

Example: `V01.0003`, `V02.0000`, `V15.0247`

## How It Works

### Automatic Version Increment

When you create a Pull Request, the GitHub Action workflow automatically:

1. **Summarizes all changes** in the PR
2. **Increments the version** (minor by default)
3. **Posts a comment** on the PR with:
   - List of changed files
   - File statistics
   - Previous and new version
   - Version increment type
4. **Commits the version update** to the VERSION file

### Manual Scripts

You can also manage versions manually using the provided scripts:

#### Get Current Version
```bash
.github/scripts/manage-version.sh get
```

#### Increment Minor Version (default)
```bash
.github/scripts/manage-version.sh increment-minor
```

#### Increment Major Version
```bash
.github/scripts/manage-version.sh increment-major
```

#### Set Specific Version
```bash
.github/scripts/manage-version.sh set V02.0015
```

#### Summarize Changes
```bash
.github/scripts/summarize-changes.sh
```

## Workflow Triggers

The version management workflow runs on:

1. **Pull Request Events**: `opened`, `synchronize`, `reopened`
2. **Manual Trigger**: You can manually trigger the workflow from the Actions tab
   - Choose between `minor` or `major` version increment

## Approval Process

Before any commit/push is merged:

1. Review the automated comment on your PR
2. Check the change summary
3. Verify the version increment is appropriate
4. If you need a major version bump instead of minor:
   - Manually run the workflow with `major` option
   - Or use the manual script: `.github/scripts/manage-version.sh increment-major`

## Version File

The current version is stored in the `VERSION` file at the root of the repository.

## Examples

### Example PR Comment

```markdown
## 📋 Change Summary

**Current Version:** `V01.0003`

### Changed Files:
M       index.html
A       new-feature.js

### File Statistics:
 index.html     | 10 +++++-----
 new-feature.js | 25 +++++++++++++++++++++++++
 2 files changed, 30 insertions(+), 5 deletions(-)

### 🔖 Version Information:
- **Previous Version:** `V01.0003`
- **New Version:** `V01.0004`
- **Increment Type:** `minor`

---
⚠️ **Action Required:** Please review the changes above and approve before merging.
```

## Best Practices

1. **Always review** the automated PR comment before merging
2. Use **minor increments** for bug fixes and small features
3. Use **major increments** for breaking changes or major features
4. The VERSION file should **never be manually edited** directly - use the scripts
5. Each commit in the main branch should have a corresponding version bump

## Troubleshooting

### Workflow doesn't run
- Ensure the `.github/workflows/version-management.yml` file exists
- Check that GitHub Actions are enabled for the repository

### Scripts not executable
```bash
chmod +x .github/scripts/*.sh
```

### Version format is incorrect
Use the `set` command to fix it:
```bash
.github/scripts/manage-version.sh set V01.0001
```
