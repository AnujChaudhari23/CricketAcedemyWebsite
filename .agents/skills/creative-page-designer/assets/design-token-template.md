# Design Token Template

Fill every field. Replace `<...>`. If the project already has tokens, map to them and list only extensions.

## Colour roles (budget: 3 decorative max)

### Decorative (count these)

| Role | Token | Hex | Used on |
|---|---|---|---|
| Dominant | `bg` / `surface` | `<#______>` | Page background, cards, panels |
| Neutral | `ink` / `ink-muted` / `border` | `<#______>` | Text, dividers, outlines |
| Accent | `accent` / `accent-ink` | `<#______>` | Primary action, one active state |

Declare the count: "Three decorative roles: `#____`, `#____`, `#____`."

If you added a fourth, state why. A fourth decorative colour means either the design has a problem the colour is hiding, or one of the first three can be removed.

### Functional (exempt from budget)

| Token | Hex | Role |
|---|---|---|
| `focus` | `<#______>` | Focus ring (≥3:1 vs adjacent) |
| `success` | `<#______>` | Status only, with icon + text |
| `warning` | `<#______>` | Status only, with icon + text |
| `error` | `<#______>` | Status only, with icon + text |

### Contrast checks

| Pair | Ratio | Requirement |
|---|---|---|
| `ink` on `bg` | `<ratio>` | ≥4.5:1 |
| `ink-muted` on `bg` | `<ratio>` | ≥4.5:1 |
| `accent-ink` on `accent` | `<ratio>` | ≥4.5:1 |
| `accent` on `bg` | `<ratio>` | ≥3:1 (UI component) |

Run `python scripts/check_contrast.py <bg-hex> <ink-hex>` to verify.

## Type

| Role | Family | Weight | Size / line-height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | `<font>` | `<w>` | `clamp(<min>, <vw>, <max>) / 1.05` | `<-0.02em>` | Hero headline |
| `h2` | `<font>` | `<w>` | `<size> / 1.15` | `<>` | Section titles |
| `h3` | `<font>` | `<w>` | `<size> / 1.25` | `<>` | Card titles |
| `body` | `<font>` | `<400>` | `16–18px / 1.6` | `0` | Paragraphs (55–75ch) |
| `label` | `<font>` | `<500–600>` | `12–14px / 1.3` | `<0.04em>` | Buttons, tags, nav |
| `mono` (optional) | `<font>` | `<w>` | `<size> / 1.5` | `0` | Code, data |

Fonts: ≤2 families. `font-display: swap`.

## Scale

- Steps: `<12 / 14 / 16 / 20 / 28 / 40 / clamp(...)>`
- Rationale: `<why this contrast between steps>`

## Spacing

- Base unit: `<4 | 8>`
- Steps: `<4, 8, 12, 16, 24, 32, 48, 64, 96, 128>`
- Rhythm: section gap ≈ 2–3× inner gap
- Container: max-width `<px>`, gutters `<mobile / tablet / desktop>`
- Breakpoints: `<375 / 768 / 1024 / 1280>`

## Shape and depth

- Radius: control `<>` · card `<>` · pill `<>` (one family)
- Border: `<width, colour token>`
- Elevation: `e0 none · e1 <shadow> · e2 <shadow>` (tint toward bg hue)
- Special effects: `<none | spec + why>`

## Motion

| Token | Value | Use |
|---|---|---|
| `dur-fast` | 150ms | Hover, press |
| `dur-base` | 250ms | Reveals, toggles |
| `dur-slow` | 500ms | Hero moment |
| `ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Entrances |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| `reduced` | fade ≤150ms or none | Under `prefers-reduced-motion` |

## Tailwind mapping

```js
// tailwind.config.js → theme.extend
colors: { bg: 'var(--bg)', ink: 'var(--ink)', accent: 'var(--accent)' },
fontFamily: { display: ['<font>', 'system-ui', 'sans-serif'], body: ['<font>', 'system-ui', 'sans-serif'] },
transitionDuration: { fast: '150ms', base: '250ms', slow: '500ms' },
```

Define CSS variables in the global stylesheet; keep component code free of raw hex values.

</BDS:create_file>

<BDS:create_file fileName="creative-page-designer/assets/wireframe-template.md">

```markdown
# Wireframe Template

Fill one per option. Keep each option ~400 words. Layout blocks show relative proportions, not pixels.

OPTION [A|B]: <name>
Thesis: <one sentence: the idea that makes this option different from the other>
Theme: <3 adjectives> | Source of look: <real-world material/place/object it comes from>
Fit: <audience + page job it serves>

DESKTOP (≥1280)
┌────────────────────────────────────────────────────────┐
│ NAV   [logo]               [link] [link]      [CTA]    │
├────────────────────────────────────────────────────────┤
│ HERO                                                    │
│ ┌───────────────────────┐ ┌──────────────────────────┐ │
│ │ H1 (display)          │ │ <visual / signature      │ │
│ │ sub (body, ≤60ch)     │ │  element>                │ │
│ │ [Primary CTA] [2nd]   │ │                          │ │
│ └───────────────────────┘ └──────────────────────────┘ │
├────────────────────────────────────────────────────────┤
│ <SECTION 2: name + purpose + layout logic>              │
├────────────────────────────────────────────────────────┤
│ <SECTION 3: proof / detail>                             │
├────────────────────────────────────────────────────────┤
│ <FINAL CTA + FOOTER>                                    │
└────────────────────────────────────────────────────────┘

MOBILE (375) — re-composition

- Reorders: <what moves up/down and why>
- Collapses: <nav → ?, grid → ?>
- Replaces: <element swapped for a mobile-native one>
- Touch: targets ≥44px, primary CTA reachable in first viewport

TOKENS (compact)
Colour roles (3 max): <dominant> / <neutral> / <accent>
Functional: focus <>, error <>
type: display <font> | body <font>
scale + space: <steps>
radius/depth: <values>

SIGNATURE ELEMENT
<Passes all four tests: cannot be described generically, specific to this client,
does real work, nameable in one noun-first sentence.>

IMAGERY / SVG
<Subject, treatment, format, dimensions, lazy/preload, alt strategy.>

ANIMATIONS

- Load: <what, ms, easing>
- Scroll: <trigger once, what, ms>
- Hover/press: <element → response>
- Reduced motion: <fallback>

EVENT-BASED INTERACTIONS

| Event ↕▾ | Element ↕▾ | Response ↕▾ | Fallback / a11y ↕▾ |
|---|---|---|---|
| −hover |  |  |  |
| −focus-visible |  |  |  |
| −click |  |  |  |
| −scroll |  |  |  |
| load |  |  |  |
⚙

TRADE-OFF
<What this option gives up versus the other.>

```

## Annotated section checklist

- [ ] **Purpose:** one sentence for why this section exists.
- [ ] **Hierarchy:** one dominant element; primary action strongest in first viewport.
- [ ] **Content:** real copy where available; placeholder marked `[PLACEHOLDER]`; no invented statistics.
- [ ] **Layout logic:** why this arrangement fits the content.
- [ ] **Mobile:** re-composed, not shrunk.
- [ ] **States:** hover, focus-visible, active, disabled, loading, empty, error.
- [ ] **Motion:** at most one moment per viewport; reduced-motion fallback defined.
- [ ] **Contrast:** text over imagery checked.
- [ ] **Weight:** images and fonts within budget.
- [ ] **Defaults check:** none of the AI defaults, or a stated reason.
- [ ] **Signature test:** passes all four checks above.
- [ ] **Colour budget:** exactly three decorative roles declared.
