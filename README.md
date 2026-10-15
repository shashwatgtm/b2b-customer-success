# Customer Success: Churn and QBRs

Five Claude skills for B2B customer success managers: find accounts at risk of churn, prepare QBRs, plan onboarding, spot upsell openings and save renewals. Built on the GUARD method by Shashwat Ghosh, Helix GTM Consulting.

Plugin page with install steps for Claude Code and Cowork, and real example outputs from each skill: https://tools.gtmhelix.com/plugins/b2b-customer-success/

| Skill | What it does | Use it when |
|---|---|---|
| `account-health-check` (Gauge) | Scores account health with a 6-signal weighted model and prioritises a portfolio | An account went quiet, usage or NPS dropped, or you are reviewing your book of business |
| `upsell-and-expansion` (Uplift) | Finds expansion signals and plans the conversation | A customer is hitting limits, a new team is interested, or you are planning upsell |
| `onboarding-plan` (Activate) | Builds a 4-phase, 90-day onboarding success plan | A customer just signed, onboarding stalled, or you need a kickoff plan |
| `qbr-prep` (Review) | Prepares a 7-section QBR or EBR brief and recap | A quarterly or executive business review is coming up |
| `renewal-save-plan` (Defend) | Assesses renewal risk and builds a save plan on a 180-day cadence | A renewal is approaching, a champion left, or the customer is evaluating a competitor |

## Install

In Claude Code:

```
/plugin marketplace add shashwatgtm/b2b-customer-success
/plugin install b2b-customer-success@b2b-customer-success
```

## Example prompts

*Example only: Kissflow is a real company used to show how this skill works, using public information from its own website. It is not a customer, partner or endorser of Helix GTM Consulting, and nothing here is advice to or about it.*

In these prompts you are a customer success manager at Kissflow, which describes itself as "a unified digital operations platform to build apps, automate workflows, manage cases, and integrate systems" (https://kissflow.com/platform/). The account in each prompt is an unnamed mid-market manufacturer, and every number is a made-up test input, not a fact about Kissflow or any real customer.

1. "I am a customer success manager at Kissflow. Here are my notes on one of our accounts, a mid-market manufacturer (hypothetical numbers): usage down 30% over two months, champion changed roles, NPS 6, renewal in 5 months, ARR 80k. How healthy is this account and what should I do first?"
2. "A mid-market manufacturer (hypothetical, 200 seats) signed with us at Kissflow yesterday. The sales handoff notes are below. Build the 90-day onboarding success plan."
3. "Prepare a QBR brief for one of our Kissflow accounts, a mid-market manufacturer (hypothetical). Here is last quarter's usage, the goals we agreed at kickoff, and two open support escalations."
4. "The renewal for one of our Kissflow accounts, a mid-market manufacturer (hypothetical), is in 120 days and they mentioned a competitor evaluation. Assess the renewal risk and give me a save strategy."

The skills work only from what you give them. Where data is missing they write `[Missing: ...]` or `[Assumption: ...]` instead of inventing it.

## Claim ledger and delivery check (what runs on your computer)

From this version each skill ends every answer with a claim ledger: a small Python script in the skill's folder (`skills/<skill>/scripts/claim_ledger.py`, standard library only) that Claude runs on the exact text it will deliver (the chat reply and every saved file, Word, PowerPoint and Excel files included). It lists every sentence about you, your company, your customers, buyers or deals, a named company or a person, every figure and every label, and marks the lines that go past what you wrote, the pages Claude opened, the search results it labelled and the scripts' printed output. Claude fixes those lines (quotes your words, labels a search result, turns a guess into a question or a "[User to add: ...]" slot) and delivers exactly the text the last run printed. The script reads only the files Claude passes to it (a copy of your message, the page text and search results Claude saved in a scratch folder named ledger-check, the reply and the saved files), writes no file, makes no network call and reads no environment variable.

In Claude Code the plugin also installs a Stop hook (`hooks/hooks.json`, `hooks/delivery_check.py`, standard library only). When one of this plugin's skills ran its claim ledger in the current turn, the hook compares the reply Claude is about to send with the text the ledger last checked and sends Claude back (at most twice a turn) when they differ. It reads the hook input and the session transcript on your computer, keeps one small counter file per session next to the session transcript in Claude Code's own folder, sends nothing anywhere and makes no network call; its Python code reads no environment variable (the hook command in hooks.json uses ${CLAUDE_PLUGIN_ROOT}, the plugin folder Claude Code sets). It also sends Claude back when a file saved in the turn was not checked, and, in a conversation where one of this plugin's skills is in use, when an answer saves a file or says more than a short line without the ledger. To find saved files it looks at the names of files changed in your working folder during that turn (three levels down); it opens none of them. Hooks run in Claude Code only: in the Claude apps (claude.ai, desktop, mobile) there is no hook, and the skill's last step (the --final run) is the check. Because this plugin sits in a subfolder of its repository (`plugins/<name>/`), a directory reviewer may hold the hook for a manual look ("Scripts the validator couldn't follow"); that is a hold for review, not a block.

The tests for the script and the hook are in `tests/` at the repository root, outside the plugin folder; they are not installed with the plugin.

## Privacy

This plugin sends no data to Helix GTM Consulting or anyone else. It contains skill instructions, reference files, one claim ledger script per skill and one Stop hook for Claude Code (section above), all run on your computer; no server and no MCP server. Account data you paste into Claude is handled under your own Claude account terms.

## Security

Report security problems privately to shashwat@gtmhelix.com with the subject "Security report: b2b-customer-success". Please do not open a public issue for a security problem.

## Licence

Released under the MIT License. See [LICENSE](LICENSE). Copyright (c) 2026 Shashwat Ghosh / Helix GTM Consulting.

## Support

Shashwat Ghosh, Helix GTM Consulting: shashwat@gtmhelix.com
