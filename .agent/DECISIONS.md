# Decision Log

---

## [Initialization]
### Decision
Adopt production-grade persistent agent memory architecture.

### Context
Need resilience against session loss and tool detachment.

### Impact
All future operations must update .agent state files.

### Reversible
Yes

---

## [Enforced Pre-Commit Validation]
### Decision
Activate mandatory Pre-Commit Validation Protocol.

### Context
Prevent silent structural or gameplay modifications without explicit user approval.

### Impact
All write operations now require:
- PLAN DE MODIFICATION
- Explicit file listing
- Risk analysis
- Explicit user GO before sendAgentCommand

### Reversible
Yes

---

## [OBJECTS Driven Interaction System]
### Decision
Adopt OBJECTS configuration as the single source of truth for interactable furniture.

### Context
Previous interaction logic relied on room-specific coordinates and
was incompatible with multi-tile furniture.

### Impact
- Furniture interactions defined in `japow/world/objects.js`
- Game logic reads interaction metadata directly from OBJECTS
- Renderer and Game engine separated cleanly

### Reversible
Yes
