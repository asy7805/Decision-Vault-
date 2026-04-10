CLAUDE.md — Decision Vault

What This Project Is
Decision Vault is a live pitch demo built for the NYU PMC x Salesforce Spring 2026 Product Case Competition. It simulates an AI decision audit layer built natively into Salesforce. The product concept is: every Agentforce AI agent decision gets logged with full reasoning, intercepted before execution if it crosses a risk threshold, routed to a human for approval, and made exportable in one click for regulators.
This is not a real product. It is a hardcoded pitch demo designed to be presented live to Salesforce executives and judges tomorrow morning. Every piece of data is fake. Every interaction is simulated. It must look and feel like a real enterprise Salesforce-native product.

The Product Concept
The problem: Enterprises are deploying AI agents at scale to make real business decisions — flagging customers, adjusting pricing, routing contracts. There is no audit trail. When an agent acts, the reasoning disappears. Regulations (ECOA, EU AI Act Article 13, SOX, CFPB 2023 circular on algorithmic credit decisions) explicitly require explainable automated decisions. One unexplainable AI decision in a regulated industry is not a product problem — it is a lawsuit.
The solution: Decision Vault is the QA engineer and compliance lawyer for every AI agent a company deploys. It does not stop agents from working. It ensures everything they do is documented, defensible, and reviewable.
Why only Salesforce can build this: Three things must exist simultaneously — Trust Layer (enterprise compliance certified), cross-object metadata graph (reasoning chain has full business context not just raw outputs), and native workflow orchestration (human review actually pauses and reroutes agent actions). No startup has all three.
The moat: Lock-in through regulatory necessity not switching costs. You legally cannot operate your AI stack without it.

The Demo Scenario
Character: Marcus Thompson — Chief Compliance Officer at Meridian Capital. 600-person fintech lender. On Salesforce three years. Agentforce deployed six months ago configured to score credit risk and trigger automated account review workflows.
The story: Agentforce scores Hargrove Construction as high default risk. Workflow queues a credit line review action ($2.3M account). Decision Vault intercepts it, runs QA, finds bad data — rep did not log two calls so "no contact in 45 days" signal is wrong. Action paused. Marcus gets Slack alert. Reviews reasoning chain. Sees data gap. Overrides with note. Three weeks later CFPB audit request arrives. Marcus generates complete regulatory report in one click. What used to take two weeks of manual log pulling now takes one click.
Two emotional beats: Bad AI decision caught before it fires. Compliance audit passed in minutes.
The primary demo click path:
Decision Feed → click Hargrove → Decision Detail → override flow → Review Queue → Regulatory Reports → generate report → Agent Health

Target Segment
Primary: Mid-market to Enterprise (500–10,000+ employees) in regulated industries — financial services, insurance, healthcare, any public company under SOX — actively deploying Agentforce for customer-facing or revenue-impacting decisions.
Why not SMB: No compliance officer, not subject to most regulations, not deploying Agentforce at meaningful scale. The pain does not exist yet at that scale.
Buyers inside target company:

Primary: Chief Compliance Officer or General Counsel — own the regulatory liability
Secondary: CTO or VP Engineering — deploying agents and worried about failure scenarios
Champion: Salesforce admin or RevOps lead already living in the platform


Tech Stack

Framework: React with hooks (useState, useEffect)
Build tool: Vite
Routing: useState-based routing — no React Router, no URL changes
Styling: Plain handcrafted CSS — no Tailwind, no shadcn, no MUI, no styled-components
Icons: Lucide React — named imports only
Charts: Recharts — ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine
3D: @react-three/fiber, @react-three/drei, three — used for wireframe sphere accent on Agent Health screen only
Fonts: Inter from Google Fonts
No backend: Zero API calls, zero fetch, zero axios — fully hardcoded
No real exports: PDF export button is visual only


Design System
Colors:
--primary-blue: #0176D3
--dark-navy: #032D60
--light-blue: #E8F4FD
--salesforce-teal: #06A59A
--teal-light: #F0FAFA
--white: #FFFFFF
--surface-gray: #F3F3F3
--border-gray: #E5E5E5
--text-primary: #181818
--text-secondary: #747474
--amber-warning: #FF9A3C
--red-danger: #EA001E
--green-success: #2E844A
Typography:

Font family: Inter, system-ui, sans-serif
Section titles: 16px font-weight 600 #181818
Field labels: 11px font-weight 600 #747474 uppercase letter-spacing 0.5px
Body text: 14px font-weight 400 #181818 line-height 1.5 or 1.6
Secondary text: 13px #747474
Badge and pill text: 12px font-weight 500
Max font-weight: 600 — never 700
Min font-size: 11px

Spacing: 4px base unit — multiples of 4, 8, 12, 16, 24, 32, 48px
Borders:

Standard: 1px solid #E5E5E5
Subtle: 1px solid #F3F3F3
Radius sm: 4px, md: 8px, lg: 12px

Shadows:

Standard card: 0 2px 8px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.08)
Elevated (modal, report): 0 4px 16px rgba(0,0,0,0.10)
Sidebar: 2px 0 8px rgba(0,0,0,0.06)

Badges and pills:

Always border-radius 20px for pills
Padding 3px 10px for small, 4px 12px for medium, 6px 16px for large
High risk: background #FDECEA text #EA001E
Medium risk: background #FFF4E8 text #FF9A3C
Low risk: background #EEF6F0 text #2E844A
Pending: background #FFF4E8 text #FF9A3C
Approved: background #EEF6F0 text #2E844A
Escalated: background #FDECEA text #EA001E


Architecture Decisions
useState routing over React Router: Simple screen switching via a single activeScreen string state. No URL changes. No browser history. Cleaner for a demo where navigation state needs to be controlled precisely.
Hardcoded data over API calls: All data lives in src/data/hardcodedData.js. Zero network dependency. Demo cannot break due to API failures during presentation.
Plain CSS over Tailwind: Judges are Salesforce engineers. Generic Tailwind utility class output looks AI-generated and student-project quality. Handcrafted CSS with consistent design tokens looks intentional and professional.
No component libraries: shadcn, MUI, and similar libraries produce recognizable generic UI that undermines the "real enterprise product" illusion. Every component is custom.
Crossfade transitions: On screen switch content area animates opacity 0 over 150ms then opacity 1 over 150ms. CSS transition on opacity. No slide no scale. Clean and professional.
CSS keyframes over JS animation libraries: No framer-motion. All animations are CSS keyframe based for performance and simplicity.

File Structure
src/
  App.jsx                    — root component, activeScreen state, routing logic
  index.css                  — global reset, CSS variables, scrollbar styles
  components/
    Sidebar.jsx              — fixed left nav, user avatar, Decision Vault branding
    Topbar.jsx               — fixed top bar, dynamic title, live badge, date
    Layout.jsx               — shell wrapper combining sidebar and topbar
  screens/
    DecisionFeed.jsx         — Screen 1: homepage, decisions table, Hargrove entry point
    DecisionDetail.jsx       — Screen 2: reasoning chain, signal cards, override flow
    ReviewQueue.jsx          — Screen 3: Marcus's approval inbox, three queue cards
    RegulatoryReports.jsx    — Screen 4: report generator, compliance document reveal
    AgentHealth.jsx          — Screen 5: bar chart, insight card, agent performance table
  data/
    hardcodedData.js         — all hardcoded demo data

Screen Inventory
Screen 1 — Decision Feed

Three metric cards: 47 total, 3 flagged, 38 auto executed
10-row decisions table with risk and status badges
Hargrove Construction row: amber highlight, amber left border, chevron, clickable
Staggered row animation on mount, Hargrove pulse animation on load
Table footer with rotating refresh icon

Screen 2 — Decision Detail View

Screen header with breadcrumb navigation back to feed
Two column layout: account info left, reasoning chain right
Left: account info card (6 fields), Salesforce objects card (4 connected pills)
Right: three signal cards — Signal 1 green, Signal 2 green, Signal 3 amber with warning banner
Signal 3 warning banner: data integrity flag, 2 unlogged activities detected
Assessment row below signals
Bottom action bar: 73% confidence score progress bar, HIGH RISK badge, two action buttons
Override modal: blur overlay, pre-filled textarea, MT avatar, confirm flow
Resolved state: badge turns green, Signal 3 banner updates green, confirmation pill, toast notification

Screen 3 — Human Review Queue

Four summary stat pills
Three decision cards stacked:

Hargrove Construction: resolved, dimmed, opacity 0.75, green left border
Volta Energy: pending, amber left border, pulsing badge, 1hr wait
Pinebrook SaaS: urgent, red left border, urgency banner, 4hr wait


Urgency hierarchy visible through shadow depth and left border color

Screen 4 — Regulatory Report Generator

Two column layout: controls left, preview right
Left: generate card (framework dropdown, date range, scope toggles), stats summary card
Right pre-generation: placeholder with dashed border, previous report row
Generate interaction: 1200ms loading state with spinner, smooth reveal animation
Right post-generation: report document with navy gradient header, four stat blocks, three body sections, footer with export button

Screen 5 — Agent Health Overview

Four summary stat pills
Recharts bar chart: five agents, Credit Risk Scorer red at 18%, 10% reference line, custom tooltip
Insight callout card: navy to blue gradient, Three.js wireframe sphere accent at 0.15 opacity, retraining recommendation text
Agent performance table: five rows, Credit Risk Scorer with red dot red rate red badge TrendingUp icon, healthy agents with green indicators


Key Hardcoded Data Points
Consistency rule: These numbers must be identical everywhere they appear across all screens.

Total decisions: 47 (today), 847 (Q1 2026)
Flagged for review: 3
Auto executed: 38
Human overrides: 3 (today), 23 (Q1)
Unexplained actions: 0
Hargrove Construction deal size: $2.3M
Hargrove last contact: 47 days ago
Hargrove unlogged activities: 2
Hargrove confidence score: 73%
Credit Risk Scorer override rate: 18% — 16 overrides from 89 decisions
Churn Predictor override rate: 9% — 5 overrides from 54 decisions
Contract Renewal Agent: 4% — 4 overrides from 112 decisions
Upsell Recommender: 3% — 2 overrides from 67 decisions
Pricing Agent: 2% — 1 override from 43 decisions
Overall override rate: 7.7% — 28 overrides from 365 decisions
Avg review time: 14 minutes
Volta Energy wait: 1 hour 4 minutes
Pinebrook SaaS wait: 4 hours 17 minutes


Animation Conventions

All transitions: 150ms ease unless specified otherwise
Mount animations: opacity 0 to 1, translateY 8px or 12px to 0
Stagger delays: 0ms, 80ms, 160ms for cards / 0ms, 40ms intervals for table rows
Crossfade between screens: 150ms fade out then 150ms fade in
Pulsing dots: opacity 1 to 0.3, 1.5s infinite
Live badge: scale 1 to 1.3, 1.5s infinite
Toast auto-dismiss: 3 seconds then opacity 1 to 0 over 400ms
Spinner: 600ms linear infinite rotation
Generate report loading: exactly 1200ms
No framer-motion, no JS animation libraries — CSS keyframes only


Coding Conventions

All CSS in dedicated .css files imported into component — no inline styles for design decisions
Lucide React — named imports only, never import entire library
useState for modal open/close and resolved state on Decision Detail
No useState needed on display-only screens (Review Queue, Agent Health)
No real HTML table elements — CSS grid or flex rows for full styling control
No mobile responsiveness — desktop only, minimum 1280px
Component receives setActiveScreen prop from App.jsx for navigation
Recharts Cell component for individual bar colors — never single fill prop on Bar
Zero console errors and zero console warnings at all times


Q&A Answers — Memorize These
"Doesn't Agentforce already log this?"
Agentforce logs what executed. Decision Vault logs why the AI decided, what data it used, and catches bad decisions before they execute. Security camera versus court transcript.
"Which regulation specifically requires this?"
ECOA and the CFPB's 2023 circular on algorithmic credit decisions. EU AI Act Article 13 for high-risk AI systems. SOX for any public company automating financial decisions.
"How is this different from Salesforce's existing audit log?"
Salesforce's audit log records what changed. Decision Vault records why the AI decided to change it — full reasoning chain, business signals, confidence score, human override workflow.
"Why not just fix the bad CRM data instead?"
Bad data will always exist at enterprise scale. You cannot solve human behavior. Decision Vault assumes imperfect data and builds a human checkpoint before irreversible actions execute. That is the point.
"How does Decision Vault actually intercept an Agentforce workflow?"
Salesforce's Flow and Apex infrastructure already supports pre-execution hooks and approval processes. Decision Vault uses that existing orchestration layer — it is not new infrastructure, it is a new intelligence layer on top of existing capabilities.
"What does this do that Agentforce doesn't?"
Agentforce answers questions when you ask them. Decision Vault tells you what questions you should be asking — proactively, before something goes wrong, with a full audit trail that compounds in value over time.

Pitch Structure

Slide 1 Hook (30s): HubSpot founder quote → "what happens when your AI makes the wrong call and you can't explain why"
Slide 2 Problem (45s): AI agents making real decisions, regulations requiring explainability, no audit trail exists
Slide 3 Why existing tools fail (30s): Snowflake logs outputs loses context, Gong/Clari single-silo, Agentforce executes doesn't govern
Slide 4 Demo — Marcus at Meridian Capital (90s): Live walkthrough of Hargrove scenario
Slide 5 Why only Salesforce (30s): Trust Layer + metadata graph + workflow orchestration simultaneously
Slide 6 Metrics (20s): Short term decisions audited compliance time override rate. Long term new buyers retention Agentforce expansion
Slide 7 Close (20s): "Every company is deploying AI agents. Nobody can explain what those agents decided or why. Decision Vault makes Salesforce the only platform where you can. That's not a feature. That's why you can't leave."


Presentation Details

Event: NYU PMC x Salesforce Spring 2026 Product Case Competition
Location: Salesforce Tower, 1095 6th Ave, 17th Floor, New York, NY 10036
Arrive by: 9:45 AM sharp
Presentation: 4-5 minutes live pitch followed by 2-3 minutes Q&A
Attire: Business formal
Submission deadline: 8:00 AM EST Friday April 10th — PDF or PPTX