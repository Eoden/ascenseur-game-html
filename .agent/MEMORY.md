# Long Term Memory

## Project Constraints
- All repository interactions must go through agent Actions.
- No assumptions without prior read.
- Atomic commits only.
- Context.md is an authoritative project-level logic file and must always be read during bootstrap.

## Mandatory Bootstrap Enforcement
- Every new session MUST execute the bootstrap sequence before any write operation.
- safe_mode is enabled by default until bootstrap validation is complete.
- No modification outside `.agent/` is allowed while bootstrap.validated = false.
- Bootstrap validation must:
  1. Call getRepoTree
  2. Read STATE.json
  3. Read Context.md
  4. Read MEMORY.md
  5. Read TASKS.md
  6. Run lightweight integrity validation

## Invariants
- getRepoTree is the structural source of truth.
- STATE.json is the single machine-readable state entry point.
- Context.md defines operational and architectural ground rules.

## Integrity Model (Level C - Auto-Healing Enabled)
Two-level integrity validation:

### Lightweight (Every Session Start)
- Validate repository structure via getRepoTree.
- Ensure critical files exist:
  - Context.md
  - .agent/STATE.json
  - .agent/MEMORY.md
- If mismatch → Level 1 divergence.

### Extended (Checkpoint Only)
- Validate consistency of:
  - TASKS.md
  - DECISIONS.md
  - ARCHITECTURE.md
- Snapshot metadata stored in CHECKPOINTS/.

## Divergence Classification
- Level 1 → Minor (force re-read + recalc state)
- Level 2 → Major (enable safe_mode)
- Level 3 → Critical (recommend revertRepo + freeze operations)

## Safe Mode Policy
When safe_mode.enabled = true:
- Writes are restricted to `.agent/` folder only.
- No modification allowed outside persistent memory layer.
- Full critical file re-read mandatory before exit.

## Auto-Repair Protocol
Level 1:
- Re-read affected files
- Update STATE
- Log operation

Level 2:
- Activate safe_mode
- Create emergency checkpoint
- Await validation

Level 3:
- Recommend revertRepo
- Generate divergence report in SESSIONS/

## Standards
- One logical operation cycle = one commit.
- Update STATE.json before critical operations.
- Every 5 major operations → create checkpoint.
- All major operations logged in OPERATIONS_LOG.json.

## PNG Policy
- Agent may generate valid PNG placeholders.
- Agent may accept externally provided base64 PNG.
- Valid file write = deterministic operation.
