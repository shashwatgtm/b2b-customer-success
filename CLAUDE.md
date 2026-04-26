# CLAUDE.md — B2B Customer Success Skills (GUARD Framework)

## What This Is

A Claude Code Marketplace plugin containing 5 Customer Success skills built on the GUARD Framework:

1. **guard-gauge-diagnostic** — Account health scoring (6-signal weighted model)
2. **guard-uplift-expansion** — Expansion signal analysis & business case builder
3. **guard-activate-onboarding** — Onboarding success plan builder (4-phase, 90-day)
4. **guard-review-qbr** — QBR/EBR preparation (7-section template)
5. **guard-defend-renewal** — Renewal risk assessment & save strategy (180-day cadence)

## Architecture

```
b2b-customer-success/
├── .claude-plugin/marketplace.json          ← Level 1: Marketplace
├── CLAUDE.md
├── README.md
├── LICENSE
└── plugins/b2b-customer-success/
    ├── .claude-plugin/plugin.json           ← Level 2: Plugin (4 fields ONLY)
    ├── references/                          ← Shared across all 5 skills
    │   ├── guard-operating-principles.md
    │   ├── input-specification.md
    │   └── cs-metrics-glossary.md
    └── skills/
        ├── guard-gauge-diagnostic/
        ├── guard-uplift-expansion/
        ├── guard-activate-onboarding/
        ├── guard-review-qbr/
        └── guard-defend-renewal/
```

## Non-Negotiable Rules

- Never fabricate data — use `[Missing: X]` and `[Assumption: Y]` flags
- Question Budget: maximum 2 clarifying questions per skill invocation
- plugin.json has EXACTLY 4 fields: name, version, description, author
- marketplace.json plugin entries have EXACTLY 3 fields: name, source, description
- Skills auto-discovered from `plugins/*/skills/*/SKILL.md`
- Read `~/.claude/plugin-development-reference.md` before any marketplace operations
- Apply 8-gate SOP to every skill modification

## 8-Gate SOP Status

| Gate | Status | Notes |
|------|--------|-------|
| G1: Understand (10+ scenarios) | ✅ | 50+ scenarios across 5 modes |
| G2: Plan reusable contents | ✅ | 3 shared + 5 skill-specific references |
| G3: Initialize | ✅ | Full 2-level plugin hierarchy |
| G4: Build (8 mandatory sections) | ✅ | All 5 SKILL.md files complete; handoff Issues 1-3 resolved (CS JTBD, MCP connector setup, Data Handling rule) |
| G5: Recursive 5-layer audit | ⬜ | Pending |
| G6: ToT+ReAct (10-15 scenarios) | ⬜ | Pending |
| G7: Self-Consistency (5Q×3P + L2M) | ⬜ | Pending |
| G8: Package and deliver | ⬜ | Pending |

## Data Handling

- At runtime, users MUST feed real customer data — real account names, real ARR, real NPS scores. The skill cannot function without real data.
- SKILL.md examples use descriptive patterns (e.g. "mid-market HR tech, $95K ARR, 200 employees") — never fictional company names, never fabricated metrics.
- The skill processes real data in-conversation only. It does not persist, store, or log customer data beyond the active session.
- Never commit real customer data to SKILL.md files, reference files, or any file pushed to GitHub.
- No API keys, tokens, or credentials in any file.

## Publishing Checklist

1. Run `/plugin marketplace update` to validate structure
2. Run `/plugin install` to test locally
3. Verify all 5 skills trigger correctly
4. Push to GitHub (repo: shashwatgtm/b2b-customer-success)
5. Submit to Claude Code Marketplace

## Author

Shashwat Ghosh, Cofounder & Fractional CMO, Helix GTM Consulting
GitHub: shashwatgtm | Contact: shashwat@gtmhelix.com
