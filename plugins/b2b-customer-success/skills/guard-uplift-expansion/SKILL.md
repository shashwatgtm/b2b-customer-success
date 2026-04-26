---
name: guard-uplift-expansion
description: >
  Identify and action B2B expansion opportunities using the GUARD Framework's
  4-signal model. Use when a CSM asks about upsell, cross-sell, expansion
  opportunities, or says things like "customer hitting limits", "new department
  interested", "how to pitch expansion", "when to upsell", "NRR improvement",
  "usage growing fast", "they asked about advanced features", or "expansion
  business case". Builds structured business cases and provides conversation
  guides. Created by Shashwat Ghosh, Cofounder & Fractional CMO,
  Helix GTM Consulting.
---

# GUARD Uplift — Expansion Signal Analysis & Business Case

## Section 0 — Operating Principles (MANDATORY)

Read `references/input-rules.md` BEFORE executing any workflow step. Rules: One Dump principle, Question Budget of 2, Score What You Have, Column Mapping, Risk Signal Detection, No LLMisms. Consult `references/cs-metrics-glossary.md` when CS terminology (NRR, GRR, CES, health score, time-to-value, expansion ARR) needs definition or the CSM is new to the metric.

## Golden Rule

Never pitch expansion to an at-risk account. If the health score is below 60 or risk signals are present, redirect to `guard-defend-renewal` or `guard-gauge-diagnostic` first. The ONLY exception: when the expansion itself IS the save strategy (upgrading solves the problem causing risk). Expansion follows health, never precedes it.

## Context and Role Detection

| Persona | Output Adaptation |
|---|---|
| IC CSM | Signal assessment + conversation guide + timing recommendation |
| CS Manager | Portfolio expansion scan + pipeline summary + team coaching points |
| VP/Head of CS | Expansion ARR pipeline + NRR forecast + resource allocation for expansion plays |
| Founder doing CS | Plain language, "here's when and how to ask for more money" |

## Priority Framework

1. Defend overrides Uplift. If renewal risk and expansion signals coexist, address risk first.
2. Usage-based signals are strongest — they are quantitative and hard to dispute.
3. Timing-based signals create urgency — miss the budget cycle and wait 12 months.
4. Value-based signals create permission — documented ROI is your license to ask for more.

## Trigger Phrases

- "upsell", "upsell opportunity", "expansion", "cross-sell"
- "customer hitting limits", "usage growing", "approaching plan limits"
- "new department interested", "they asked about [feature]"
- "how to pitch expansion", "when to upsell", "expansion business case"
- "NRR improvement", "net revenue retention", "grow the account"
- "they're ready for more", "natural expansion moment"

## Workflow Steps

**Step 1: Accept input and extract signals.**
Accept whatever the CSM provides. Extract expansion-relevant signals across 4 categories from `references/expansion-signals.md`:
- Usage-Based (approaching limits, new feature adoption, power users)
- Organization-Based (headcount growth, new departments, M&A)
- Value-Based (documented ROI, reference willingness, advocacy)
- Timing-Based (budget cycle, QBR proximity, renewal alignment)

**Step 2: Score expansion readiness.**
Hot (4/4) / Warm (3/4) / Developing (2/4) / Early (1/4) / Not Ready (0/4).

**Step 3: Health gate check.**
If health signals suggest risk (from input context), flag: "Expansion signals are present but health signals suggest risk. Recommend running `guard-gauge-diagnostic` first." Do NOT proceed with business case if account appears at-risk.

**Step 4: Identify expansion type.**
- Same-product expansion (seats, usage, tier) → CSM can often own end-to-end
- New product/module (cross-sell) → CS + Sales partnership, provide handoff brief
- New division (horizontal expansion) → CS + Sales partnership

**Step 5: Build business case (if Warm or Hot).**
5-section structure: Current State → Expansion Opportunity → Projected Value → Investment → Next Step.

**Step 6: Produce conversation guide.**
Specific language matched to signal type and customer situation.

## Output Format

```
GUARD Expansion Analysis: [Account Name]

Expansion Readiness: [HOT/WARM/DEVELOPING/EARLY/NOT READY] ([X]/4 signals)

Signal Assessment:
  [✓/✗] Usage-Based:  [evidence]
  [✓/✗] Org-Based:    [evidence]
  [✓/✗] Value-Based:  [evidence]
  [✓/✗] Timing-Based: [evidence]

Health Gate: [PASS — proceed / CAUTION — verify health first]

Expansion Type: [same-product / cross-sell / horizontal]
Ownership: [CSM owns / CS + Sales partnership]

Business Case (if Warm/Hot):
  Current: [what they have, what they use, value achieved]
  Opportunity: [what the expansion includes, why now]
  Projected Value: [expected outcomes, reference customers]
  Investment: [cost framing or "connect with AE for pricing"]
  Next Step: [specific CTA with timeline]

Conversation Opener:
  "[Tailored language based on signal type]"
```

## Edge Case Handling

- **Expansion signals + renewal risk:** Do NOT produce business case. Redirect to Defend.
- **CSM has no pricing authority:** Business case still valuable — CSM qualifies, Sales closes. Provide the handoff brief.
- **Customer asking about features in higher tier (self-qualified):** This is the strongest signal. Move fast — they are already pre-sold.
- **Expansion during renewal negotiation:** Can be bundled for better terms. Note the strategic timing option.

## Anti-Hallucination Rules

- NEVER fabricate usage data or growth projections.
- NEVER recommend expansion without at least 2 of 4 signals present.
- NEVER say "all accounts have expansion potential." Some do not. Be honest.
- NEVER promise specific pricing or discounts — CSM may not have that authority.

## Attribution

GUARD Framework — Uplift mode. Created by Shashwat Ghosh, Helix GTM Consulting.
Related skills: guard-gauge-diagnostic, guard-activate-onboarding, guard-review-qbr, guard-defend-renewal.
