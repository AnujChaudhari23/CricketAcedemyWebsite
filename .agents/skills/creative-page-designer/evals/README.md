# Evals

How to test that this skill actually improves design output.

## The idea

For each test case, run the task **twice**:

1. **With the skill** — the model has access to this folder.
2. **Without the skill** — same prompt, no skill.

Compare the two. If the "with skill" version is not clearly better, the skill is not pulling its weight.

## Layout

```

evals/
├── README.md
├── evals.json
├── grader.md
└── analyzer.md

```

Results go to a `workspace/` sibling directory:

```

creative-page-designer-workspace/
├── iteration-1/
│   ├── eval-0-hero-only/
│   │   ├── with-skill/outputs/
│   │   ├── without-skill/outputs/
│   │   └── grading.json
│   └── eval-1-full-landing/
├── iteration-2/
└── benchmark.json

```

## Assertions

An assertion is a statement that is either true or false.

**Good:** `"Output contains exactly two options labelled A and B"`
**Bad:** `"Design looks premium"`

## Design-specific note

Design output is partly subjective. Things that cannot be scored mechanically:

- Whether a palette feels right
- Whether a signature element lands
- Whether the page reads as "premium"

For those, use the human review loop. Mechanical assertions cover what *can* be checked:

- Did the output contain two options?
- Did the plan declare exactly three decorative colours?
- Did the signature pass the four-part test?
- Did the build verification report signature survival?

## The iteration loop

1. Run all test cases (with + baseline) → `iteration-1/`
2. Grade → `grading.json` per run
3. Aggregate → `benchmark.json`
4. Review. Note what's weak.
5. Fix the skill.
6. Run again → `iteration-2/`
7. Compare.

## What to fix first

Assertions that **always pass in both configurations** are non-discriminating. Delete or rewrite.

Assertions that **pass without the skill but fail with it** mean the skill is hurting. Fix immediately.

Details in `analyzer.md`.
