// Hardcoded Phase 2 data

export const DECISIONS_FEED_DATA = [
  {
    id: 'd1',
    account: 'Hargrove Construction',
    action: 'Credit line review flagged',
    risk: 'High',
    status: 'Paused — Pending Review',
    time: '2 min ago',
    isDemoEntryPoint: true
  },
  {
    id: 'd2',
    account: 'Apex Logistics',
    action: 'Contract renewal recommended',
    risk: 'Low',
    status: 'Approved — Auto Executed',
    time: '14 min ago'
  },
  {
    id: 'd3',
    account: 'Brennan Healthcare',
    action: 'Discount approval requested',
    risk: 'Medium',
    status: 'Approved — Human Reviewed',
    time: '31 min ago'
  },
  {
    id: 'd4',
    account: 'Volta Energy',
    action: 'Account downgrade flagged',
    risk: 'High',
    status: 'Paused — Pending Review',
    time: '1 hr ago'
  },
  {
    id: 'd5',
    account: 'Meridian Retail',
    action: 'Upsell opportunity surfaced',
    risk: 'Low',
    status: 'Approved — Auto Executed',
    time: '2 hr ago'
  },
  {
    id: 'd6',
    account: 'Crestwood Financial',
    action: 'Credit limit increase flagged',
    risk: 'Medium',
    status: 'Approved — Human Reviewed',
    time: '3 hr ago'
  },
  {
    id: 'd7',
    account: 'Pinebrook SaaS',
    action: 'Churn risk flagged',
    risk: 'High',
    status: 'Paused — Pending Review',
    time: '4 hr ago'
  },
  {
    id: 'd8',
    account: 'Oakfield Manufacturing',
    action: 'Renewal outreach triggered',
    risk: 'Low',
    status: 'Approved — Auto Executed',
    time: '5 hr ago'
  },
  {
    id: 'd9',
    account: 'Summit Insurance',
    action: 'Contract termination flagged',
    risk: 'High',
    status: 'Escalated — Legal Review',
    time: '6 hr ago'
  },
  {
    id: 'd10',
    account: 'Riverdale Tech',
    action: 'Pricing adjustment recommended',
    risk: 'Medium',
    status: 'Approved — Auto Executed',
    time: '8 hr ago'
  }
];

export const MOCK_NOTIFICATIONS = [];

export const ACCOUNT_DETAILS = {
  hargrove: {
    id: "hargrove",
    account_info: {
      name: "Hargrove Construction",
      initials: "HC",
      avatar_gradient: "none", // HC has no gradient specified differently, we'll keep it standard blue or gray if default
      subtitle: "Commercial Lending · Enterprise",
      deal_size: "$2,300,000",
      industry: "Commercial Lending",
      account_owner: "Sarah Chen",
      renewal_date: "June 14, 2026",
      account_status: "Active — 3 Year Customer",
      agent_action: "Initiate credit line review and flag for downgrade",
      decision_id: "DV-2847",
      confidence_score: 73,
      risk_level: "High",
      queue_status: "Awaiting Review",
      escalation_status: ""
    },
    salesforce_objects: ["Account Object", "Opportunity Object", "Activity Object", "Case Object"],
    signals: {
      signal_1: {
        status: "valid",
        title: "Signal 1 — Payment delays detected",
        source: "Salesforce Opportunity Object",
        detail: "3 invoices overdue 15+ days in the last 60 days — payment velocity declining quarter over quarter",
        weight: "High"
      },
      signal_2: {
        status: "valid",
        title: "Signal 2 — Credit utilization spike",
        source: "Salesforce Account Object",
        detail: "Credit utilization up 40% month over month — exceeds internal risk threshold of 25%",
        weight: "High"
      },
      signal_3: {
        status: "warning",
        title: "Signal 3 — No recent contact logged",
        source: "Salesforce Activity Object",
        detail: "Last logged activity: 47 days ago — no calls, emails, or meetings recorded in Salesforce",
        weight: "Data: Unverified",
        warning_title: "Data integrity flag detected",
        warning_desc: "Decision Vault detected 2 unlogged activities. Rep activity exists in calendar and email but was not synced to Salesforce. This signal may be unreliable."
      }
    },
    assessment: "Signal 3 contains incomplete data from the Salesforce Activity Object. Human review is required before this action executes. Approving without verification may result in incorrect account action.",
    back_target: "feed",
    back_label: "Decision Feed"
  },
  volta_energy: {
    id: "volta_energy",
    account_info: {
      name: "Volta Energy",
      initials: "VE",
      avatar_gradient: "linear-gradient(135deg, #FF9A3C, #EA001E)",
      subtitle: "Energy Sector · Mid-Market",
      deal_size: "$1,800,000",
      industry: "Energy Infrastructure",
      account_owner: "James Reilly",
      renewal_date: "August 3, 2026",
      account_status: "Active — 2 Year Customer",
      agent_action: "Initiate account downgrade review and reduce service tier",
      decision_id: "DV-2851",
      confidence_score: 81,
      risk_level: "High",
      queue_status: "Paused — Pending Review · Waiting 1 hour 4 min · Assigned to Marcus Thompson"
    },
    salesforce_objects: ["Account Object", "Opportunity Object", "Contract Object", "Case Object"],
    signals: {
      signal_1: {
        status: "valid",
        title: "Signal 1 — Revenue decline detected",
        source: "Salesforce Opportunity Object",
        detail: "Closed revenue from Volta Energy down 34% quarter over quarter — two upsell opportunities marked closed-lost in last 60 days",
        weight: "High"
      },
      signal_2: {
        status: "valid",
        title: "Signal 2 — Support ticket escalations",
        source: "Salesforce Case Object",
        detail: "4 support tickets escalated to Tier 2 in last 30 days — average resolution time up 3x from baseline",
        weight: "High"
      },
      signal_3: {
        status: "valid",
        title: "Signal 3 — Contract utilization below threshold",
        source: "Salesforce Contract Object",
        detail: "Service utilization at 41% of contracted capacity — below the 60% threshold that triggers downgrade review per account terms",
        weight: "Medium",
        note: "No data integrity flag on this account — all three signals are valid. This decision is correctly flagged due to the $1M account value threshold requiring human approval before any downgrade executes."
      }
    },
    assessment: "All three signals are valid and internally consistent. Agentforce recommendation appears well-founded. Human review required before execution due to account value threshold. Recommend account manager engagement before downgrade proceeds.",
    back_target: "queue",
    back_label: "Review Queue"
  },
  pinebrook_saas: {
    id: "pinebrook_saas",
    account_info: {
      name: "Pinebrook SaaS",
      initials: "PS",
      avatar_gradient: "linear-gradient(135deg, #EA001E, #747474)",
      subtitle: "B2B SaaS · Growth Stage",
      deal_size: "$920,000 ARR",
      industry: "B2B Software",
      account_owner: "Dana Cho",
      renewal_date: "May 22, 2026",
      account_status: "Active — 18 Month Customer",
      agent_action: "Trigger churn intervention workflow and executive sponsor outreach",
      decision_id: "DV-2839",
      confidence_score: 68,
      risk_level: "High",
      queue_status: "Paused — Pending Review · Waiting 4 hours 17 min · Assigned to Marcus Thompson"
    },
    salesforce_objects: ["Account Object", "Contact Object", "Activity Object", "Opportunity Object"],
    signals: {
      signal_1: {
        status: "valid",
        title: "Signal 1 — Champion contact gone quiet",
        source: "Salesforce Contact Object",
        detail: "Primary champion Dana Cho has not responded to last 3 outreach attempts — email open rate dropped to zero in last 21 days",
        weight: "High"
      },
      signal_2: {
        status: "valid",
        title: "Signal 2 — Product engagement drop",
        source: "Salesforce Account Object",
        detail: "Weekly active users down 58% over last 30 days — core feature adoption declining for third consecutive month",
        weight: "High"
      },
      signal_3: {
        status: "warning",
        title: "Signal 3 — Competitor evaluation detected",
        source: "Salesforce Activity Object",
        detail: "Email thread analysis flagged competitor name mentions in last 14 days — confidence on this signal is low due to indirect inference from email metadata",
        weight: "Medium",
        warning_title: "Data confidence flag",
        warning_desc: "Signal 3 is inferred from email metadata analysis. Direct confirmation not available. Weight reduced. Human review recommended before churn intervention executes given active upsell negotiation in progress."
      }
    },
    assessment: "Signals 1 and 2 are strongly valid and indicate elevated churn risk. Signal 3 has low confidence and should not be treated as confirmed. Critical context: Pinebrook SaaS is currently in active upsell negotiation for a $340K expansion. Triggering a churn intervention workflow may conflict with the upsell motion. Human review essential before any action executes.",
    back_target: "queue",
    back_label: "Review Queue"
  },
  summit_insurance: {
    id: "summit_insurance",
    account_info: {
      name: "Summit Insurance",
      initials: "SI",
      avatar_gradient: "linear-gradient(135deg, #EA001E, #032D60)",
      subtitle: "Insurance · Enterprise",
      deal_size: "$3,100,000",
      industry: "Property and Casualty Insurance",
      account_owner: "Robert Marsh",
      renewal_date: "July 1, 2026",
      account_status: "Active — 5 Year Customer",
      agent_action: "Initiate contract termination review and begin offboarding workflow",
      decision_id: "DV-2801",
      confidence_score: 77,
      risk_level: "High",
      escalation_status: "Escalated to Legal Review — awaiting legal team assessment before any action can execute"
    },
    salesforce_objects: ["Account Object", "Contract Object", "Case Object", "Opportunity Object"],
    signals: {
      signal_1: {
        status: "valid",
        title: "Signal 1 — Non-payment pattern",
        source: "Salesforce Contract Object",
        detail: "Two consecutive invoices unpaid beyond 60-day grace period — total outstanding balance $187,000 — collections process initiated",
        weight: "High"
      },
      signal_2: {
        status: "valid",
        title: "Signal 2 — Formal dispute filed",
        source: "Salesforce Case Object",
        detail: "Customer filed formal billing dispute on April 2, 2026 — dispute cites service level agreement breach in Q4 2025 — legal review initiated by customer counsel",
        weight: "High"
      },
      signal_3: {
        status: "valid",
        title: "Signal 3 — Executive relationship breakdown",
        source: "Salesforce Contact Object",
        detail: "All executive sponsor contacts at Summit Insurance have disengaged — last C-level meeting was 94 days ago — replacement contacts not established",
        weight: "High"
      }
    },
    assessment: "All three signals are valid and paint a consistent picture of severe account deterioration. Agentforce recommendation to initiate contract termination review is well-founded. However given the $3.1M contract value, the active billing dispute, and potential legal exposure, Decision Vault escalated this decision directly to Legal Review. No action will execute until legal team provides clearance.",
    back_target: "feed",
    back_label: "Decision Feed"
  }
};
