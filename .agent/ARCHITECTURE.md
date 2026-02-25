# Agent Architecture Snapshot

## Persistent Memory Layer
Located in `.agent/`

Components:
- STATE.json → Machine state
- MEMORY.md → Stable knowledge
- DECISIONS.md → Strategic log
- TASKS.md → Operational tracking
- CHECKPOINTS/ → State snapshots
- SESSIONS/ → Session summaries

## Recovery Protocol
1. Read STATE.json
2. Read TASKS.md
3. Validate against getRepoTree
4. Resume from next_action
