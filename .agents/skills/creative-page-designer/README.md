# creative-page-designer

An Agent Skill for designing web pages and UI sections **from scratch**. Produces 2 competing wireframe plans with a visible self-critique, then builds React + Tailwind only after you reply "execute".

For improving or fixing an **existing** page, use the `page-enhancer` skill instead.

## What it does

Ground → research (on demand) → 2 selectable wireframe plans → visible self-critique → approval gate → build (React + Tailwind) → build verification.

Competes on **method**, not on a style catalog.

## Folder structure

```

creative-page-designer/
├── SKILL.md
├── README.md
├── CHANGELOG.md
├── references/
│   ├── keyword-library.md
│   ├── ai-defaults-to-avoid.md
│   └── premium-signals.md
├── assets/
│   ├── design-token-template.md
│   └── wireframe-template.md
├── scripts/
│   ├── check_contrast.py
│   └── audit_page.py
└── evals/
├── README.md
├── evals.json
├── grader.md
└── analyzer.md

```

## Install

Place the folder at one of these paths depending on your agent:

- **Claude Code**: `.claude/skills/creative-page-designer/` (project) or `~/.claude/skills/creative-page-designer/` (personal)
- **GitHub Copilot**: `.github/skills/creative-page-designer/` (project) or `~/.copilot/skills/creative-page-designer/` (personal)
- **Other agents**: check the tool's docs — the folder name must remain `creative-page-designer` to match the `name` field in `SKILL.md`

**Common mistake:** `.agent/skills/` (singular) is not a recognised path for Copilot. Use `.agents/skills/` (plural) or `.github/skills/`.

## Test

1. Restart your agent so it re-scans skills.
2. Confirm the skill is listed (e.g. `/skills` in Claude Code).
3. Try: "Design a hero section for a premium charity." Expect: one batched intake message, then 2 options + critique, then an approval gate.
4. Try a non-design prompt (e.g. "fix this API 500 error"). The skill should NOT activate.

## Scripts

Both scripts use only the Python standard library.

```bash
python scripts/check_contrast.py "#ffffff" "#0a0a0a"
python scripts/check_contrast.py --file styles.css --pairs
python scripts/audit_page.py index.html
python scripts/audit_page.py index.html --css styles.css
```

Both exit with code 1 on failure, so they can be wired into CI.

## Behaviour defaults

- Asks for aesthetic direction; never assumes one silently.
- 2 options, ~400 words each, plus a short critique.
- Live web research only on request; otherwise says it used bundled references.
- Accessibility floor: warnings with fixes; the user can explicitly override.
- Follows the project's existing design system and extends it only when necessary.
- Runs `scripts/audit_page.py` after building and reports results.

</BDS:create_file>

<BDS:create_file fileName="creative-page-designer/CHANGELOG.md">

```markdown
# Changelog

## v2.2 — 2026-10

Split into two separate skills:

- **`creative-page-designer`** — designs new pages from scratch (this skill)
- **`page-enhancer`** — improves existing pages without destroying brand equity

Reason: the two jobs share less than 40% of the workflow. Splitting means each skill loads only the content it needs, cutting per-trigger token cost by roughly a third and letting each workflow specialise.

## v2.1 — 2026-10

Three targeted edits after testing against a real brief (cricket academy in Indore):

### Added

- **Colour budget** — maximum three decorative roles. Functional colours (focus ring, status) are exempt.
- **Signature test** — four checks a real signature must pass. Blocks generic signatures before tokens are written.
- **Build verification (Step 7)** — four-part check: signature survival, copy spelling, colour budget match, quality floor.

### Fixes applied

- Five decorative colours shipped in one build. Colour budget now prevents this.
- Option A's signature ("photo + button") was accepted. Signature test now blocks this.
- The build quietly diverged from the plan. Step 7a now catches it.

## v2.0 — 2026-10

Rewritten against Anthropic's official skill authoring guidance and after comparing with Anthropic's Frontend Design, Superpowers, and Superdesign.

### Added

- `scripts/check_contrast.py` — WCAG contrast ratio checker
- `scripts/audit_page.py` — accessibility and quality floor audit
- `evals/README.md`, `evals/grader.md`, `evals/analyzer.md`
- "Template chrome" as a ninth AI default to avoid
- Weighted, anchored criteria for the self-critique rubric

### Changed

- Description made pushier (per skill-creator guidance on undertriggering)
- Self-critique replaced the binary checklist with a 4-criterion weighted rubric
- `evals.json` expanded from 3 to 6 test cases

## v1.0 — Initial

Single-skill version covering both greenfield design and existing-page enhancement.

