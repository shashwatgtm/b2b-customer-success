# B2B Customer Success (GUARD Framework)

Five Claude skills for Customer Success Managers at B2B SaaS companies, built on the GUARD Framework by Shashwat Ghosh, Helix GTM Consulting.

| Skill | What it does | Use it when |
|---|---|---|
| `guard-gauge-diagnostic` (Gauge) | Scores account health with a 6-signal weighted model and prioritises a portfolio | An account went quiet, usage or NPS dropped, or you are reviewing your book of business |
| `guard-uplift-expansion` (Uplift) | Finds expansion signals and plans the conversation | A customer is hitting limits, a new team is interested, or you are planning upsell |
| `guard-activate-onboarding` (Activate) | Builds a 4-phase, 90-day onboarding success plan | A customer just signed, onboarding stalled, or you need a kickoff plan |
| `guard-review-qbr` (Review) | Prepares a 7-section QBR or EBR brief and recap | A quarterly or executive business review is coming up |
| `guard-defend-renewal` (Defend) | Assesses renewal risk and builds a save plan on a 180-day cadence | A renewal is approaching, a champion left, or the customer is evaluating a competitor |

## Install

In Claude Code:

```
/plugin marketplace add shashwatgtm/b2b-customer-success
/plugin install b2b-customer-success@b2b-customer-success
```

## Example prompts

1. "Here are my notes on ExampleCo: usage down 30% over two months, champion changed roles, NPS 6, renewal in 5 months, ARR 80k. How healthy is this account and what should I do first?"
2. "ExampleCo signed yesterday: 200 seats, mid-market, the sales handoff notes are below. Build the 90-day onboarding success plan."
3. "Prepare a QBR brief for ExampleCo. Here is last quarter's usage, the goals we agreed at kickoff, and two open support escalations."
4. "ExampleCo's renewal is in 120 days and they mentioned a competitor evaluation. Assess the renewal risk and give me a save strategy."

The skills work only from what you give them. Where data is missing they write `[Missing: ...]` or `[Assumption: ...]` instead of inventing it.

## Privacy

This plugin sends no data to Helix GTM Consulting or anyone else. It contains only skill instructions and reference files: no server, no scripts, no hooks and no MCP server. Account data you paste into Claude is handled under your own Claude account terms.

## Security

Report security problems privately to shashwat@hyperplays.in with the subject "Security report: b2b-customer-success". Please do not open a public issue for a security problem.

## Licence

No licence has been chosen yet, so all rights are reserved by the author. Contact shashwat@hyperplays.in about use beyond installing the plugin.

## Support

Shashwat Ghosh, Helix GTM Consulting: shashwat@hyperplays.in
