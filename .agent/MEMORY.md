# Long Term Memory

## Project Constraints
- All repository interactions must go through agent Actions.
- No assumptions without prior read.
- Atomic commits only.

## Invariants
- getRepoTree is the structural source of truth.
- STATE.json is the single machine-readable state entry point.

## Standards
- One logical operation cycle = one commit.
- Update STATE.json before critical operations.
