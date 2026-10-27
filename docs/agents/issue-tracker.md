# Issue tracker: Beads (bd)

Issues and specs for this repo live in a local beads database under `.beads/` (embedded Dolt). Use the `bd` CLI for every operation; never edit files in `.beads/` by hand. For the full command reference run `bd prime` or read `.agents/skills/beads/SKILL.md`.

## Conventions

- A spec is an epic: `bd create "<title>" -t epic --body-file <spec.md> --silent`
- Implementation issues are child issues of that epic, one per ticket: `bd create "<title>" --parent <epic-id> --body-file - --silent`
- Triage state is recorded as labels (see `triage-labels.md` for the role strings): `bd update <id> --add-label <label>` / `--remove-label <label>`
- Comments and conversation history: `bd comment <id> "text"` (or `--file`); read them with `bd comments <id>`
- Blocking relationships: `bd dep add <blocked-id> <blocker-id>`

## When a skill says "publish to the issue tracker"

Run `bd create ... --silent` and report the returned issue ID.

## When a skill says "fetch the relevant ticket"

Run `bd show <id>` and `bd comments <id>`. The user will normally pass the issue ID directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is an epic with one **child** issue per ticket.

- **Map**: an epic whose description holds the Notes / Decisions-so-far / Fog body. Update it with `bd update <epic-id> --body-file -`.
- **Child ticket**: `bd create "<question>" --parent <epic-id> --body-file -`. The ticket type (`research`/`prototype`/`grilling`/`task`) is a `wayfinder:<type>` label; the map itself carries `wayfinder:map`.
- **Blocking**: `bd dep add <child-id> <blocker-id>`. A ticket is unblocked when every blocker is closed.
- **Frontier**: `bd ready --parent <epic-id> --unassigned`; first result wins.
- **Claim**: `bd update <id> --claim` before any work.
- **Resolve**: `bd comment <id>` with the answer under an `## Answer` heading, then `bd close <id>`, then append a context pointer (gist + issue ID) to the map's Decisions-so-far.
