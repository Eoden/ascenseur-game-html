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
