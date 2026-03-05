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

---

## Legacy Session Rule

Any session executed without verified access to agent Actions
is considered NON-DETERMINISTIC.

No architectural decision, repository assumption, or structural modification
originating from a legacy session may be considered valid
without full revalidation through the deterministic cycle:

getRepoTree → targeted file reads → state validation → atomic commit.

Conversation memory is never treated as authoritative system state.
Only repository reads and STATE.json define operational reality.

---

## 2026-02-26 — Recovery: Japow Appartement Multi-Room Refactor

### Context
Session dérivée partiellement sans persistance fiable.
Crash runtime observé :
`Cannot read properties of undefined (reading 'layout')`

### Root Cause
Exits pointant vers rooms inexistantes dans ROOMS.
Suppression partielle de chambres sans synchronisation exits.

### Validated Architectural Decision
- Appartement en multi-room (pas de mega-map).
- 7 rooms obligatoires :
  salon, couloir, chambre1, chambre2, chambre3, sdb, outside
- Portes standardisées sur murs (13x13).
- Meubles multi-tiles visibles (tile 4).
- Tous meubles interactifs.
- Clé : meuble couloir.
- Passeport : meuble chambre3.
- Sortie extérieure bloquée sans clé.

---

## 2026-03 — Rendering & Tile System Stabilization (Pierre Apartment)

### Rendering Layer Order
Renderer must follow strict layered drawing order:
1. FLOOR (tile != 1)
2. Static tiles (walls, tables, etc.)
3. Decorative sprites (plants)
4. Large sprites (sofa 4x4)
5. Player

Floor must always render under transparent sprites.

### Tile Semantic Mapping
Current stable tile mapping:

1 = wall
2 = door
3 = furniture / interactable
4 = bed / desk
5 = plant (sprite)
6 = sofa (4x4 sprite block)
7 = table
8 = kitchen block
9 = floor variation
0 = standard floor

### Sofa Rendering Rule
- Sofa uses a **single sprite rendered over a 4x4 tile area**.
- Detection is done by finding the **top-left tile** of the sofa block.

### Apartment Level Asset Structure
Level-specific sprites stored in:

`japow/assets/sprites/levels/appart_pierre/`

Current assets:
- floor.png
- canape.png
- plant.png

### Apartment Level Name
First level for Pierre is defined as:

`AppartPierre`

It uses the multi-room layout (salon → couloir → chambres → sdb).

### Deterministic Rule for Tiles
All tiles except walls must first render floor.
Decor sprites render above floor.

This rule prevents visual holes when sprites use transparency.

