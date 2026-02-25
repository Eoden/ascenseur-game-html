# Agent Architecture Snapshot

## Root-Level Authoritative Files
- Context.md → Global project logic and mandatory operational rules.

Context.md must be read during every bootstrap sequence before any multi-file modification.

## Persistent Memory Layer
Located in `.agent/`

Components:
- STATE.json → Machine state
- MEMORY.md → Stable knowledge
- DECISIONS.md → Strategic log
- TASKS.md → Operational tracking
- CHECKPOINTS/ → State snapshots
- SESSIONS/ → Session summaries

## Recovery Protocol (v2)
1. Read STATE.json
2. Read Context.md (mandatory)
3. Read TASKS.md
4. Validate against getRepoTree
5. Resume from next_action

## Operational Priority Order
1. getRepoTree
2. Targeted file reads
3. Context.md validation
4. Atomic write

---

## Deterministic Execution Model (Post-Legacy Hardening)

### Structural Truth
- getRepoTree is the single structural source of truth.
- No structural reasoning is valid without fresh tree validation.

### Mandatory Read Before Write
- Every modification must be preceded by targeted file reads.
- No multi-file modification without full prior validation.

### Atomicity
- One logical operation cycle = one commit.
- No fragmented corrective chains without validation checkpoint.
- Revert is performed via additive commit only.

### Runtime Capability Validation
- Declared capabilities (OpenAPI, documentation, YAML) are NOT proof of runtime availability.
- Runtime handshake validation is required before assuming tool availability.

### Adaptive Bulk Strategy
- Bulk reads must support adaptive reduction in case of failure.
- Partial bulk reads are considered non-authoritative.

### Anti-Determinism Safeguard
- Conversation memory is never considered system state.
- Only repository reads and STATE.json define operational reality.
