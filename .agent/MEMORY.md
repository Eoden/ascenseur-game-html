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

## Tile Symbol System

Room layouts may now use symbolic tiles for readability.

Mapping:
W = wall
D = door
. = floor
C = commode
B = bed
P = plant
S = sofa
V = tv
K = kitchen
T = table
H = bathtub
L = sink
M = washing_machine
