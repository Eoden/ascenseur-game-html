# Long Term Memory

## Project Constraints
- All repository interactions must go through agent Actions.
- No assumptions without prior read.
- Atomic commits only.
- Context.md is an authoritative project-level logic file and must always be read during bootstrap.

## Invariants
- getRepoTree is the structural source of truth.
- STATE.json is the single machine-readable state entry point.
- Context.md defines operational and architectural ground rules.

## Integrity Model (Level C)
Two-level integrity validation:

### Lightweight (Every Session Start)
- Validate repository file count via getRepoTree.
- Ensure critical files exist:
  - Context.md
  - .agent/STATE.json
  - .agent/MEMORY.md

### Extended (Checkpoint Only)
- Validate consistency of:
  - TASKS.md
  - DECISIONS.md
  - ARCHITECTURE.md
- Snapshot metadata stored in CHECKPOINTS/.

## Standards
- One logical operation cycle = one commit.
- Update STATE.json before critical operations.
- Always read Context.md at session start before strategic decisions.
- Every 5 major operations → create checkpoint.

## PNG Policy
- Agent may generate valid PNG placeholders.
- Agent may accept externally provided base64 PNG.
- Valid file write = deterministic operation.
