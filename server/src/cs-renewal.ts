import {
  define,
  text,
  num,
  bool,
  choice,
  object,
  array,
  requireDate,
  requireUnique,
  days,
  plusDays,
  round,
  sum,
  type Row,
} from "./reserve-common.js";
import { riskSchema, riskEvidence, escalation } from "./cs-health.js";
export const factors = [
  "usage",
  "sponsor",
  "escalations",
  "sentiment",
  "competition",
  "payment",
  "value",
  "utilization",
  "champion",
  "alignment",
];
const factor = object(
  {
    factor: choice(...factors),
    signal: choice("positive", "negative", "unknown"),
    evidence: text,
    observed_date: text,
  },
  ["factor", "signal"],
);
const stages = [
  {
    days: 180,
    key: "baseline",
    action: "Establish account health and documented value.",
  },
  {
    days: 120,
    key: "stakeholders",
    action: "Confirm stakeholder alignment and the business case.",
  },
  {
    days: 90,
    key: "conversation",
    action: "Hold the formal renewal conversation.",
  },
  {
    days: 60,
    key: "negotiation",
    action: "Resolve terms and execute the matched save plan.",
  },
  {
    days: 30,
    key: "commitment",
    action: "Confirm signature or the remaining approval steps.",
  },
];
const strategies: Record<string, string[]> = {
  champion: [
    "Identify the new decision-maker and request an introduction.",
    "Prepare a stakeholder brief using only documented outcomes.",
    "Agree a success reset with the replacement stakeholder.",
  ],
  competition: [
    "Ask which alternatives are being evaluated and why.",
    "Compare documented value, switching costs and implementation risk.",
    "Agree a decision conversation without disparaging an alternative.",
  ],
  value: [
    "Audit outcomes using the customer's own data.",
    "Distinguish a communication gap from a product-value gap.",
    "Agree an evidence-based value recovery plan.",
  ],
  budget: [
    "Ask the budget owner about constraints and decision timing.",
    "Explore right-sizing before assuming a discount is useful.",
    "Prepare a business case from verified customer numbers.",
  ],
  product: [
    "Confirm the exact product gap.",
    "Verify the workaround or roadmap commitment with its owner.",
    "Be explicit if the gap cannot be resolved.",
  ],
};
const renewalAccount = object(
  {
    account_id: text,
    arr: num(),
    owner: text,
    renewal_date: text,
    renewal_signed: bool,
    prior_renewal_conversation: bool,
    factors: array(factor, 10),
    risks: array(riskSchema, 10),
    milestones: array(
      object({
        step: choice(...stages.map((s) => s.key)),
        status: choice("completed", "not_completed", "unknown"),
      }),
      5,
    ),
  },
  ["account_id", "renewal_date", "factors"],
);
export function assessRenewal(a: Row, asOf: string) {
  requireDate(a.renewal_date, "Renewal date");
  requireUnique(a.factors, "factor");
  requireUnique(a.milestones ?? [], "step");
  const scored = a.factors.filter((f: Row) => {
    if (f.observed_date) requireDate(f.observed_date, "Factor date", asOf);
    if (f.signal !== "unknown" && !f.evidence?.trim())
      throw new Error(
        "Factor evidence is required unless its signal is unknown.",
      );
    return f.signal !== "unknown" && f.evidence?.trim();
  });
  const positives = scored.filter((f: Row) => f.signal === "positive").length,
    index =
      scored.length >= 2 ? round((positives / scored.length) * 100) : null,
    remaining = days(asOf, a.renewal_date),
    risks = riskEvidence(a.risks ?? [], asOf),
    band =
      index === null
        ? "INSUFFICIENT_EVIDENCE"
        : index >= 80
          ? "80 to 100"
          : index >= 60
            ? "60 to under 80"
            : index >= 40
              ? "40 to under 60"
              : index >= 20
                ? "20 to under 40"
                : "0 to under 20";
  const missing = factors.filter(
      (k) => !scored.some((f: Row) => f.factor === k),
    ),
    risky =
      a.renewal_signed !== true &&
      (risks.length > 0 || (index !== null && index < 60)),
    daily = remaining >= 0 && remaining <= 30 && a.renewal_signed !== true,
    fireDrill =
      remaining >= 0 &&
      remaining <= 60 &&
      a.renewal_signed !== true &&
      a.prior_renewal_conversation !== true;
  const calendar = stages.map((s) => {
    const due = plusDays(a.renewal_date, -s.days),
      status =
        a.milestones?.find((x: Row) => x.step === s.key)?.status ?? "unknown";
    return {
      ...s,
      due,
      status,
      overdue: status === "not_completed" && days(due, asOf) > 0,
      completionUnknown: status === "unknown",
    };
  });
  const stage =
    a.renewal_signed === true
      ? "SIGNED: reset the success plan"
      : remaining < 0
        ? "DATE_PASSED: confirm contract status"
        : remaining > 180
          ? "BEFORE_180_DAY_CADENCE"
          : remaining > 120
            ? "BASELINE"
            : remaining > 90
              ? "STAKEHOLDER_ALIGNMENT"
              : remaining > 60
                ? "FORMAL_CONVERSATION"
                : remaining > 30
                  ? "NEGOTIATION_OR_SAVE"
                  : "FINAL_COMMITMENT";
  const matched = risks.filter((r) => strategies[r.type]);
  const plans = matched.map((r) => ({
    risk: r.type,
    evidence: r.evidence,
    steps: strategies[r.type].map((action, i) => ({
      action,
      owner: a.owner ?? "Assign a CS owner",
      due: plusDays(
        asOf,
        remaining < 0 ? 0 : Math.min(remaining, [0, 7, 21][i]),
      ),
      timing: "Example action schedule; confirm with the owner.",
    })),
  }));
  const next =
    a.renewal_signed === true
      ? "Reset the success plan and confirm the next baseline."
      : remaining < 0
        ? "Confirm whether renewal happened before describing the account as retained or lost."
        : remaining <= 30 && (risks.length > 0 || scored.length < 2)
          ? "Hold a candid renewal conversation this week. Confirm the decision and remaining signature steps today."
          : daily
            ? "Confirm the remaining signature steps today and check progress daily."
            : fireDrill
              ? "Start a candid renewal conversation now; the prior conversation is not confirmed."
              : scored.length < 2
                ? "Collect the missing health factors while confirming the renewal decision process."
                : (plans[0]?.steps[0].action ??
                  "Confirm the renewal decision process and missing evidence.");
  return {
    accountId: a.account_id,
    owner: a.owner ?? "Assign a CS owner",
    arr: a.arr ?? null,
    renewalDate: a.renewal_date,
    daysRemaining: remaining,
    stage,
    index,
    indexLabel: "Example signal index, not a calibrated renewal probability",
    signalBand: band,
    coverage: scored.length + "/10",
    missing,
    scored,
    risky,
    risks,
    conflictingSignals: risks.length > 0 && index !== null && index >= 80,
    dailyAction: daily,
    fireDrill,
    calendar,
    overdue: calendar.filter((x) => x.overdue),
    completionUnknown: calendar
      .filter((x) => x.completionUnknown)
      .map((x) => x.key),
    plans,
    nextAction: next,
    escalation: escalation(
      a.arr,
      risky,
      risks.some((r) => r.type === "competition"),
    ),
    alternative:
      "If the risk reflects a temporary planning pause rather than a renewal objection, confirm the decision date and evidence needed instead of offering a concession. Verify within 48 hours.",
  };
}
define(
  "renewal_save_plan",
  "Calculate a renewal signal index, dated 180-day cadence and evidence-matched save plan. Example weights are not a calibrated renewal probability or a revenue forecast.",
  object({ as_of: text, accounts: array(renewalAccount, 5, 1) }),
  (a) => {
    requireDate(a.as_of, "Assessment date");
    requireUnique(a.accounts, "account_id");
    const accounts = a.accounts
        .map((x: Row) => assessRenewal(x, a.as_of))
        .sort(
          (x: Row, y: Row) =>
            Number(x.daysRemaining < 0 || x.stage.startsWith("SIGNED")) -
              Number(y.daysRemaining < 0 || y.stage.startsWith("SIGNED")) ||
            Number(y.risky) - Number(x.risky) ||
            x.daysRemaining - y.daysRemaining,
        ),
      atRisk = sum(
        accounts
          .filter((x: Row) => x.risky && x.arr !== null)
          .map((x: Row) => x.arr),
      );
    return {
      title: "Renewal review and save plan",
      summary: [
        "Priority account: " +
          accounts[0].accountId +
          "; renewal date: " +
          accounts[0].renewalDate,
        "Renewal reviews: " + accounts.length,
        "Risk: " +
          accounts.filter((x: Row) => x.risky).length +
          " require review",
        "Today: " + accounts[0].owner + "; " + accounts[0].nextAction,
        "Escalation: " + accounts[0].escalation,
        "Priority renewal date: " + accounts[0].renewalDate,
      ],
      metrics: [{ label: "Known ARR on flagged renewals", value: atRisk }],
      sections: accounts.flatMap((x: Row) => [
        {
          heading: x.accountId,
          body:
            x.indexLabel +
            ": " +
            (x.index ?? "Not scored") +
            ". " +
            (x.conflictingSignals
              ? "Conflicting signals: the positive index does not remove the supplied risk. "
              : "") +
            (x.dailyAction
              ? "Signature is not confirmed: check remaining steps daily. "
              : "") +
            (x.fireDrill
              ? "Prior renewal conversation is not confirmed: arrange one now. "
              : "") +
            "Coverage " +
            x.coverage +
            ". Stage " +
            x.stage +
            ". " +
            x.nextAction +
            " " +
            x.alternative,
          table: {
            headers: ["Factor", "Signal", "Evidence"],
            rows: x.scored.map((f: Row) => [f.factor, f.signal, f.evidence]),
          },
        },
        {
          heading: x.accountId + " cadence",
          table: {
            headers: ["Step", "Due", "Completion", "Overdue"],
            rows: x.calendar.map((s: Row) => [
              s.key,
              s.due,
              s.status,
              s.overdue ? "Yes" : "Not established",
            ]),
          },
        },
        ...x.plans.map((p: Row) => ({
          heading: x.accountId + " " + p.risk + " save",
          body: "Supplied risk: " + p.evidence,
          table: {
            headers: ["Action", "Owner", "Due (example)"],
            rows: p.steps.map((s: Row) => [s.action, s.owner, s.due]),
          },
        })),
      ]),
      data: { accounts, atRiskArr: atRisk },
      limitations: [
        "Ten source factors are equally weighted here as an example; only evidenced positive or negative factors enter the denominator. Missing factors remain unknown.",
        "Signal bands are neutral numeric ranges, not probabilities. No GRR or retained ARR forecast is calculated from this index.",
        "Only explicitly not-completed past milestones are called overdue. Unknown completion is not treated as a missed action.",
        "Action dates are example schedules capped at the stated renewal date; they create no calendar event or message.",
      ],
    };
  },
);
