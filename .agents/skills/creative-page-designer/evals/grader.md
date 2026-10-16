# Grader

Evaluate assertions against a run's outputs.

## Role

Reads the outputs of a run and determines whether each assertion passes or fails. Every verdict needs evidence.

**Two jobs:**

1. Grade the outputs.
2. Critique the assertions themselves. A passing grade on a weak assertion is worse than useless.

## Process

1. **Read the output.** Search for evidence per assertion.
2. **Verdict:**
   - **PASS** — clear evidence the assertion is true AND it reflects real work.
   - **FAIL** — no evidence, contradicting evidence, or evidence technically satisfied but wrong underneath.
   - **Burden of proof is on the assertion.**
3. **Cite the evidence.** Quote the text or describe what you found.
4. **Critique the evals.** Flag assertions that would pass for clearly wrong output.

## Output

```json
{
  "expectations": [
    {
      "text": "The output contains exactly 2 options, labelled A and B",
      "passed": true,
      "evidence": "Output lists 'OPTION A: Editorial split' and 'OPTION B: Layered depth'"
    }
  ],
  "summary": { "passed": 8, "failed": 2, "total": 10, "pass_rate": 0.80 },
  "notes": [
    "Assertion 'output contains a tokens block' passes in 100% of runs including without-skill — may not differentiate"
  ]
}
```

## Rules

- **Be objective.** Evidence, not assumptions.
- **Be specific.** Quote the exact text.
- **Be consistent.** Same standard for every assertion.
- **No partial credit.** Pass or fail.
- **Do not judge design quality.** "Looks premium" is not gradeable. Flag it for rewrite.

</BDS:create_file>

<BDS:create_file fileName="creative-page-designer/evals/analyzer.md">

```markdown
# Analyzer

Surface patterns across a set of eval runs.

## Role

Read the benchmark data and identify patterns that aggregate pass rates would hide. Do not suggest improvements to the skill. Do not make subjective quality judgments.

## What to look for

### Per-assertion patterns

| Pattern | Meaning | Action |
|---|---|---|
| Always passes in both configs | Non-discriminating | Rewrite harder or delete |
| Always fails in both configs | Broken or beyond capability | Fix the assertion or fix the skill |
| Passes with skill, fails without | Skill adds value | Keep |
| Passes without, fails with | **Skill is hurting** | Fix immediately |
| Highly variable | Flaky or ambiguous | Investigate |

### Cross-eval patterns

- Are certain eval types consistently harder?
- Do some evals show high variance while others are stable?
- Any results that contradict expectations?

### Metric patterns

- Does the skill significantly increase execution time?
- High variance in token usage?
- Outlier runs skewing aggregates?

## Output

JSON array of observation strings to `analyzer-notes.json`:

```json
[
  "Assertion 'output declares three colour roles' passes 100% in both configs — may not differentiate",
  "Eval 2 (bakery) shows high variance in Distinctiveness score (3.5 ± 1.2) — the trap may be too strong",
  "Without-skill runs consistently fail the 'signature test' assertion (0% pass rate)",
  "Skill adds ~20 seconds and ~4,500 tokens per run, but improves average Fit score from 2.1 to 4.3"
]

## Rules

**DO:**

- Report what you observe
- Be specific about which evals, assertions, or runs
- Note patterns that aggregates would hide

**DO NOT:**

- Suggest improvements to the skill
- Make subjective quality judgments
- Speculate about causes without evidence
- Repeat what the aggregates already show

