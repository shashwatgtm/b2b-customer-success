---
name: guard-gauge-diagnostic
description: >
  Diagnose B2B account health using the GUARD Framework's 6-signal weighted
  scoring model. Use when a CSM asks about account health, which accounts need
  attention, portfolio prioritization, risk signals, churn signals, or says
  things like "should I be worried about this account", "my customer went quiet",
  "NPS dropped", "usage declined", "portfolio review", "book of business",
  or "which accounts are at risk". Accepts any input format — conversational
  dump, messy notes, CRM table, or uploaded PDF. Scores what is available,
  flags what is missing. Created by Shashwat Ghosh, Cofounder & Fractional CMO,
  Helix GTM Consulting.
---

# GUARD Gauge — Account Health Diagnostic

## Section 0 — Operating Principles (MANDATORY)

Read `references/input-rules.md` BEFORE executing any workflow step. Rules: One Dump principle, Question Budget of 2, Score What You Have, Column Mapping, Risk Signal Detection, No LLMisms. The shared rules (One Dump principle, Question Budget of 2, Score What You Have, Anti-Hallucination, No LLMisms) are non-negotiable. Consult `references/cs-metrics-glossary.md` when CS terminology (NRR, GRR, CES, health score, time-to-value, expansion ARR) needs definition or the CSM is new to the metric.

## Golden Rule

Always diagnose the ACCOUNT STATE before recommending any ACTION. If a CSM asks "should I send a re-engagement email?", do NOT answer the tactical question first. Run the 6-signal health assessment. Only then recommend specific actions matched to the diagnosed risk. Diagnosis first. Action second.

## Context and Role Detection

| Persona | Output Adaptation |
|---|---|
| IC CSM (20-80 accounts) | Per-account assessment, specific actions for this week |
| CS Manager/Director | Portfolio-level patterns, resource allocation, risk concentration |
| VP/Head of CS | Revenue-framed: ARR at risk, NRR impact, portfolio summary |
| Founder doing CS | Plain language, time-efficient, actionable without CS jargon |
| CS Ops/RevOps | Scoring methodology, rubric details, reporting structure |

## Priority Framework

1. Qualitative signals ("they mentioned evaluating alternatives") override quantitative signals (healthy dashboard) when they conflict.
2. Recency overrides history. A 3-year healthy account that went dark 3 weeks ago is at risk NOW.
3. For accounts under 90 days old, default to `guard-activate-onboarding` instead — baselines are not established.
4. When Gauge detects renewal risk, recommend cross-referencing with `guard-defend-renewal`.

## Trigger Phrases

- "account health", "health score", "health check"
- "which accounts need attention", "portfolio review", "book of business"
- "should I be worried about", "is this account healthy"
- "risk signals", "churn signals", "early warning"
- "NPS dropped", "usage declined", "customer went quiet"
- "prioritize my accounts", "triage my book"

## Workflow Steps

**Step 1: Accept input and extract signals.**
Accept whatever the CSM provides. Extract signals for the 6 scoring dimensions using rules in `references/input-rules.md`. Do NOT ask for missing data — score what you have and flag gaps as `[Missing: X]`.

**Step 2: Score each signal.**
Apply `references/health-scoring-model.md`:
- Product Adoption (0-20)
- Engagement Quality (0-20)
- Value Realization (0-20)
- Sentiment Trajectory (0-15)
- Commercial Health (0-15)
- Expansion Readiness (0-10)

**Step 3: Classify.**
Total → Healthy (80-100) / Needs Attention (60-79) / At Risk (40-59) / Critical (0-39).

**Step 4: Produce output.**
Health score + signal breakdown + top risk factors + what is working + actions this week.

**Step 5: Batch mode.**
If multiple accounts provided, produce ranked table sorted by risk (lowest first). Offer deep-dive on any named account.

## Output Format

```
GUARD Health Assessment: [Account Name]

Health Score: [X]/100 — [CLASSIFICATION] ([Color])

Signal Breakdown:
  Product Adoption:    [X]/20 — [one-line evidence]
  Engagement Quality:  [X]/20 — [one-line evidence]
  Value Realization:   [X]/20 — [one-line evidence]
  Sentiment Trajectory:[X]/15 — [one-line evidence]
  Commercial Health:   [X]/15 — [one-line evidence]
  Expansion Readiness: [X]/10 — [one-line evidence]

Top Risk Factors:
  1. [Ranked by impact, with evidence]
  2. [...]

What Is Working:
  - [Positive signals worth preserving]

Actions This Week:
  1. [Specific, not generic — names a person, a task, a deadline]
  2. [...]
  3. [...]

[Missing: X, Y] — score estimated on available signals only.
[Assumption: Z] — correct if inaccurate.
```

**Batch output format:**
```
GUARD Portfolio Health: [N] Accounts

| Account | ARR | Score | Status | Primary Risk | Action This Week |
|---------|-----|-------|--------|-------------|-----------------|
| [name]  |[$$] | [X]   |[color] | [risk]      | [action]        |

At-Risk ARR: $[X] ([Y]% of portfolio)
Recommended deep-dives: [top 2-3 accounts by urgency]
```

## Edge Case Handling

- **"My customer went quiet":** Do not panic. Ask internally: how long (2 weeks vs 2 months)? Was there a trigger (champion left, escalation, seasonal)? Score with available signals. Recommend specific re-engagement action, not generic "send an email."
- **Conflicting signals (high usage, low NPS):** State the conflict explicitly. Recommend investigation before action.
- **No data at all:** Do not score. Recommend a structured discovery call checklist.
- **Account under 90 days:** Redirect to `guard-activate-onboarding`. Baselines are not meaningful yet.

## Anti-Hallucination Rules

- NEVER fabricate NPS, ARR, usage numbers, or ticket counts.
- NEVER score based on company name or industry stereotypes.
- NEVER say "all signals are healthy" without evidence for each signal.
- NEVER assign Critical classification without at least 2 corroborating risk signals.
- If data is sparse, say so. A health score of 55 with 3 signals scored is different from 55 with all 6.

## Attribution

GUARD Framework — Gauge mode. Created by Shashwat Ghosh, Helix GTM Consulting.
Part of the B2B Customer Success plugin. Related skills: guard-uplift-expansion, guard-activate-onboarding, guard-review-qbr, guard-defend-renewal.
