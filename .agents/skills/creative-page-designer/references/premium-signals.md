# Premium Signals

What makes a page feel considered. Apply selectively; premium comes from restraint and coherence, not from adding effects.

Contents: 1 Chanel's rule · 2 Whitespace · 3 Type · 4 Depth · 5 Micro-interactions · 6 Motion · 7 Imagery · 8 Consistency

## 1. Chanel's rule

Before shipping, look at the finished composition and remove one accessory: one effect, one colour, one border, one animation, one icon set. Record what you removed.

## 2. Whitespace

- Space signals confidence. Crowding signals discount.
- Fixed rhythm (4/8 base); larger jumps between sections than inside them (2–3× the inner gap).
- The emptiest area on screen should surround the most important element.
- Line length 55–75 characters for body text.

## 3. Type

- Two families max. Create hierarchy with size, weight and spacing before adding colour.
- Display: tracking ~-0.02em, line-height 1.0–1.1. Body: 1.5–1.7.
- Fluid sizes with `clamp()`.
- Line length under 80 characters. Serif gets a touch more line-height than sans.

## 4. Depth

- One depth language. Keep it consistent.
- Shadows: low-opacity, large blur, slight vertical offset; tint toward bg hue, not pure black.
- Elevation maps to meaning (raised = interactive or temporary).

## 5. Micro-interactions

- Every interactive element answers every state: hover, focus-visible, active, disabled, loading.
- Feedback within 100ms; transitions 150–250ms for controls; ease-out for entrances, ease-in for exits.
- Buttons: small physical response (1–2px translate or scale ≤1.03), not a colour flash alone.
- Focus styles are part of the design.

## 6. Motion rules

- One hero motion moment per viewport.
- Animate `transform` and `opacity` only.
- Stagger reveals 40–80ms; cap sequences around 600–800ms.
- Scroll effects trigger once.
- `prefers-reduced-motion: reduce` → fade ≤150ms or nothing.
- Motion must explain something or express brand; otherwise cut.

## 7. Imagery and SVG

- One consistent treatment across images.
- Inline SVG for icons and simple illustrations.
- Photos: WebP/AVIF, explicit dimensions, `loading="lazy"` below fold, hero preloaded.
- Real over stock. If inventing, use illustration rather than fake people.

## 8. Consistency checks

- Same radius family everywhere.
- Same icon stroke weight.
- Accent colour has one job.
- Copy tone matches visual tone.
