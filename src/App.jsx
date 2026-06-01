import React, { useState, useEffect } from 'react';

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  amber:     '#D4A853',
  amberDim:  '#A07830',
  amberGlow: 'rgba(212,168,83,0.12)',
  amberBdr:  'rgba(212,168,83,0.35)',
  bg:        '#080808',
  s1:        '#101010',
  s2:        '#181818',
  s3:        '#222222',
  bdr:       '#272727',
  bdrL:      '#363636',
  text:      '#ECEAE4',
  muted:     '#888680',
  dim:       '#484644',
  green:     '#4ADE80',
  greenBg:   'rgba(74,222,128,0.08)',
  red:       '#F87171',
  redBg:     'rgba(248,113,113,0.08)',
  blue:      '#60A5FA',
  blueBg:    'rgba(96,165,250,0.08)',
  purple:    '#C084FC',
  purpleBg:  'rgba(192,132,252,0.08)',
};

// ─── Storage keys ────────────────────────────────────────────────────────────
const SK = {
  portfolio:  'iwaaju-positions',
  journal:    'iwaaju_journal',
  research:   'iwaaju_research',
  catalysts:  'iwaaju_catalysts',
  theses:     'iwaaju_theses',
};

// ─── Seed data ───────────────────────────────────────────────────────────────
const SEED_POSITIONS = [
    {
      id: 'p1', ticker: 'HOOD', name: 'Robinhood Markets',
      sector: 'Prediction Markets / Fintech', country: 'United States',
      entryPrice: 74.82, currentPrice: 74.82, shares: 150, allocation: 25,
      status: 'core',
      thesis: 'Robinhood is no longer a retail trading app — it\'s becoming the exchange infrastructure of the degenerate economy. Processed over 12 billion event contracts in 2025. Established Rothera JV with Susquehanna, acquired MIAXdx — a CFTC-licensed exchange. Owns the full stack when Rothera launches: order flow, clearing, settlement.',
      stopThesis: 'Federal legislation permanently banning prediction markets with no appeals pathway OR market cap exceeds $25B without corresponding revenue acceleration (above $130 without 2027 beat) OR major banks capture measurable market share (below 40% retail volume)',
      tags: ['prediction-markets', 'fintech', 'L2-behavioral', 'degenerate-economy'],
      addedDate: '2026-05-19', targetPrice: 130,
      notes: 'Q1 2026: Prediction market revenue +320% YoY at $147M. Record 8.8B event contracts. Revenue $4.5B full year 2025 with 41.1% profit margin. Rothera launch target Q2 2026 — watch for announcement before June 30. Alert: $48.63.',
    },
    {
      id: 'p2', ticker: 'YOU', name: 'Clear Secure',
      sector: 'Identity Infrastructure', country: 'United States',
      entryPrice: 60.80, currentPrice: 60.80, shares: 160, allocation: 20,
      status: 'core',
      thesis: 'The airport lane is the customer acquisition funnel. The identity platform is the moat. 41 million members, growing 31% YoY. The real thesis is identity infrastructure — Medicare contract, B2B partnerships, expanding beyond airports into digital identity at scale.',
      stopThesis: 'TSA deploys its own free biometric system nationally eliminating need for CLEAR membership OR market cap exceeds $8B before B2B identity revenue becomes meaningful (above 20% of total) OR three major competitors with equivalent biometric infrastructure launch at scale',
      tags: ['identity', 'biometric', 'L2-behavioral', 'infrastructure'],
      addedDate: '2026-05-19', targetPrice: 75,
      notes: 'Q1 2026: Revenue $253M up 19.7% YoY, beat estimates 3.5%. 85.66% gross margin. Biometric eGates launching ahead of 2026 FIFA World Cup. Goldman Sachs PT raised to $75. Alert: $39.52.',
    },
    {
      id: 'p3', ticker: 'SYM', name: 'Symbotic',
      sector: 'Warehouse Automation / Robotics', country: 'United States',
      entryPrice: 54.97, currentPrice: 54.97, shares: 180, allocation: 20,
      status: 'core',
      thesis: 'Real robots, real deployments, real Walmart revenue, real backlog. Not a promise — an execution story. Q1 2026: Revenue $630M up 29% YoY. First GAAP profitable quarter — net income $13.36M. Backlog $22.3B. Exol JV expected to deliver $500M+ in recurring high-margin revenue — the diversification engine away from Walmart concentration.',
      stopThesis: 'Walmart publicly announces shift away from Symbotic to competing automation provider OR market cap exceeds $25B before Exol and healthcare verticals generating meaningful revenue OR Amazon deploys competing warehouse robotics as a service',
      tags: ['robotics', 'physical-AI', 'L4-physical', 'warehouse'],
      addedDate: '2026-05-19', targetPrice: null,
      notes: 'Walmart concentration risk real — 84% of FY2025 revenue. Fox Robotics acquisition expanding into healthcare. Exol JV ramp-up is the key Stage 2 re-rating catalyst. Barclays PT $44, KeyBanc PT $70. Alert: $35.73.',
    },
    {
      id: 'p4', ticker: 'CBRS', name: 'Cerebras Systems',
      sector: 'AI Infrastructure / Semiconductors', country: 'United States',
      entryPrice: 255.00, currentPrice: 256.00, shares: 40, allocation: 20,
      status: 'core',
      thesis: 'Wafer-Scale Engine — entire silicon wafer as one chip. Fundamental architectural challenger to NVIDIA\'s multi-chip GPU approach. Dramatically faster inference for large language models with significantly lower energy consumption per token. Inference efficiency is the next battleground. NVIDIA paid $20B for Groq assets — validates wafer-scale architecture as real competition.',
      stopThesis: 'NVIDIA releases inference-optimized chip matching wafer-scale efficiency within 18 months OR AWS or OpenAI cancel Cerebras partnerships OR market cap exceeds $150B before revenue exceeds $2B with clear profitability path',
      tags: ['AI-infrastructure', 'semiconductors', 'L1-infrastructure', 'inference'],
      addedDate: '2026-05-23', targetPrice: null,
      notes: 'IPO listed May 29, 2026. IPO price $185, first day close $311. GTC limit at $255 executed May 23 on first dip. Revenue $510M in 2025 up 76% YoY. First earnings August 2026. Lock-up expiry ~September 2026. Alert: $165.75.',
    },
    {
      id: 'p5', ticker: 'VKTX', name: 'Viking Therapeutics',
      sector: 'Biotech / GLP-1', country: 'United States',
      entryPrice: 30.54, currentPrice: 30.54, shares: 245, allocation: 15,
      status: 'growth',
      thesis: 'Oral VK2735 — first oral dual GLP-1/GIP agonist to potentially reach market. No other dual or triple agonist currently available in both oral and injectable formulations. Phase 2 showed 12.2% mean weight loss at 13 weeks. 97% of subjects achieved 5%+ weight loss vs 10% on placebo.',
      stopThesis: 'Phase 3 VANQUISH fails primary endpoint OR competitor oral GLP-1 shows dramatically superior efficacy OR acquired by LLY or NVO (take the acquisition premium) OR FDA permanently bans oral GLP-1 class',
      tags: ['biotech', 'GLP-1', 'L3-biology', 'oral-GLP1'],
      addedDate: '2026-05-19', targetPrice: null,
      notes: 'VANQUISH-1 (4,650 adults) and VANQUISH-2 (1,000 adults) fully enrolled. Cash $706M — no dilution risk 3+ years. M&A target: LLY or NVO acquiring pre-Phase 3 readout is a genuine scenario. Q3 2026 maintenance data is first major catalyst. Alert: $15.27 (50% drawdown).',
    },
];

const SEED = {
  portfolio: SEED_POSITIONS,
  journal: [
    {
      id: 'j1', date: '2026-05-25',
      subject: 'Scout Digest — Week of May 25, 2026 · 7 Signals',
      from: 'Iwájú Scout <scout@iwaaju.system>',
      summary: 'All 4 deployed positions received signal support. Layer 3 BREAKOUT on peptides. Prediction markets BREAKOUT confirming HOOD thesis.',
      sentiment: 'positive', positions: ['HOOD', 'YOU', 'SYM', 'VKTX', 'CBRS'],
      content: `PORTFOLIO STATUS — ALL 5 POSITIONS INTACT\n\nSIGNAL SUMMARY\n58 keywords · 4 sources · 7 signals this week\n\nBREAKOUT SIGNALS\n1. prediction markets — News +300% → HOOD thesis confirmed\n2. Vertiv — Reddit +300% → Layer 1 signal, Watch List candidate\n3. physical AI — Reddit +300% → SYM thesis confirmed\n4. biological age — Reddit +300% → VKTX Layer 3 signal\n5. GHK-Cu — Reddit +300% → Layer 3 peptide BREAKOUT\n6. BPC-157 — Reddit +167% → Layer 3 peptide signal\n7. Kalshi — Reddit +135% → HOOD thesis supporting signal\n\nPORTFOLIO MENTIONS\nHOOD: 2 signals ✓\nYOU: 2 signals ✓\nSYM: 1 signal ✓\nVKTX: 3 signals ✓\nCBRS: Not yet in calibration — added post-IPO, will appear from June 1.\n\nHOOD — Prediction Markets BREAKOUT\nNews volume on prediction markets up 300% this week. Kalshi Reddit momentum +135% as supporting signal. Rothera JV structure more defensible than headlines suggest — caution on launch is strategic, not a weakness. Thesis intact and strengthening.\n\nYOU — Behavioral Layer Signal\nBehavioral layer returned 2 portfolio mentions. Identity infrastructure narrative accelerating ahead of 2026 FIFA World Cup eGate rollout. No new competitive threats. Thesis intact.\n\nSYM — Physical AI BREAKOUT\nPhysical AI Reddit volume up 300%. Consistent with SYM execution narrative post first GAAP profitable quarter. Exol JV still the key re-rating catalyst to watch. Thesis intact.\n\nVKTX — Layer 3 Triple Signal\nThree consecutive BREAKOUT signals in biological age, GHK-Cu, and BPC-157 — strongest Layer 3 signal cluster since calibration began. Peptide and longevity cultural momentum accelerating. Thesis intact. Q3 2026 maintenance data remains the binary catalyst.\n\nCBRS — No Signal Yet\nAdded post-IPO after May 29 listing. Will enter Scout keyword rotation from June 1 calibration. First signals expected in Week 4 digest.\n\nRESEARCH TRIGGERED THIS WEEK\n· HIMS — FDA peptide catalyst in July, await ruling before entry\n· HOOD — Rothera structure reviewed, thesis intact\n· Vertiv — fails ETF eligibility rule at current price, watching $280\n· Glycans — pre-mainstream scientific validation confirmed, Scout keywords added\n\nNo action required. Scout surfaces. You decide.`,
    },
  ],
  research: [
    {
      id: 'r1', ticker: 'HOOD', date: '2026-05-26',
      title: 'Robinhood — Q1 2026 Earnings & Rothera Analysis',
      type: 'earnings', tags: ['earnings', 'prediction-markets', 'L2-behavioral'],
      sources: ['HOOD Q1 2026 Earnings Call', 'Bernstein Research', 'CFTC Filings'],
      content: 'Q1 2026: Prediction market revenue +320% YoY at $147M. Record 8.8 billion event contracts traded. Revenue $4.5B full year 2025 with 41.1% profit margin. Crypto revenue down 47% — real drag but prediction market growth more than compensates. April 2026 prediction market volume tracking toward $3B notional — second biggest month ever. Rothera JV with Susquehanna: acquired MIAXdx — a CFTC-licensed exchange. Caution on national Rothera launch is strategic — waiting for federal clarity to avoid state AG injunctions. Bernstein forecasts prediction market volume reaching $1 trillion/year by 2030. Rothera launch target: Q2 2026 — watch for announcement before June 30.',
    },
    {
      id: 'r2', ticker: 'YOU', date: '2026-05-26',
      title: 'Clear Secure — Q1 2026 Earnings & Identity Platform Thesis',
      type: 'earnings', tags: ['earnings', 'identity', 'biometric', 'L2-behavioral'],
      sources: ['YOU Q1 2026 Earnings Call', 'Goldman Sachs Research', 'TSA Partnership Filings'],
      content: 'Q1 2026: Revenue $253M up 19.7% YoY, beat estimates by 3.5%. Guided for 22.8% YoY growth next quarter. Full year 2026 FCF guidance $440M+. Operating margin 24.5%, up from 17.7%. 85.66% gross margin — exceptional for an infrastructure business. 41 million members growing 31% YoY. Biometric eGates launching ahead of 2026 FIFA World Cup — national rollout in progress. CLEAR ID launching as a compliant REAL ID — significant TAM expansion. Half of world\'s airports expected to use biometric identity by 2026. TSA partnership entering new phase with eGates at major airports. Goldman Sachs raised price target to $75 post Q1 earnings.',
    },
    {
      id: 'r3', ticker: 'SYM', date: '2026-05-26',
      title: 'Symbotic — Q1 2026 Earnings & Exol JV Analysis',
      type: 'earnings', tags: ['earnings', 'robotics', 'physical-AI', 'L4-physical'],
      sources: ['SYM Q1 2026 Earnings Call', 'Barclays Research', 'KeyBanc Research'],
      content: 'Q1 2026: Revenue $630M up 29% YoY. First ever GAAP profitable quarter — net income $13.36M. Backlog $22.3B. SymBots processed over 2 billion cases and logged nearly 200 million miles in 2025. Walmart concentration risk real — 84% of FY2025 revenue but relationship deepening not exiting (Walmart micro-fulfillment acquisition). Fox Robotics acquisition expanding into healthcare and new verticals. Exol JV expected to deliver $500M+ in recurring high-margin revenue — the key Stage 2 re-rating catalyst away from Walmart concentration. Barclays PT $44, KeyBanc PT $70 — wide range reflects uncertainty on diversification timeline.',
    },
    {
      id: 'r4', ticker: 'CBRS', date: '2026-05-29',
      title: 'Cerebras Systems — IPO Analysis & Wafer-Scale Architecture Thesis',
      type: 'analysis', tags: ['IPO', 'AI-infrastructure', 'semiconductors', 'inference'],
      sources: ['CBRS IPO Prospectus', 'AWS Partnership Announcement', 'OpenAI Partnership'],
      content: 'IPO listed May 29, 2026. IPO price $185, first day close $311 (+68%). Revenue $510M in 2025 up 76% YoY. Partnerships with AWS and OpenAI. Wafer-Scale Engine: entire silicon wafer as one chip — fundamental architectural challenger to NVIDIA\'s multi-chip GPU approach. Dramatically faster inference with significantly lower energy consumption per token. NVIDIA paid $20B for Groq assets — validates wafer-scale architecture as real competition. GTC limit at $255 executed May 23 — 18% below first day close, 38% above IPO price. Key checkpoints: first earnings August 2026, lock-up expiry ~September 2026. Non-consensus: not yet in any major ETF, limited traditional analyst coverage.',
    },
    {
      id: 'r5', ticker: 'VKTX', date: '2026-05-19',
      title: 'Viking Therapeutics — Oral GLP-1 Phase 3 Analysis',
      type: 'analysis', tags: ['biotech', 'GLP-1', 'phase-3', 'L3-biology'],
      sources: ['VKTX Phase 2 VENTURE Trial Data', 'FDA GLP-1 Pipeline Review', 'Eli Lilly Orforglipron Filing'],
      content: 'Oral VK2735 — first oral dual GLP-1/GIP agonist to potentially reach market. Phase 2 showed 12.2% mean weight loss at 13 weeks. 97% of subjects achieved 5%+ weight loss vs 10% on placebo. Phase 3: VANQUISH-1 (4,650 adults) fully enrolled, VANQUISH-2 (1,000 adults) fully enrolled. Phase 3 oral formulation trial expected Q3/Q4 2026. Cash $706M — no dilution risk for 3+ years. Market cap ~$3.5B. M&A target: LLY or NVO acquiring before Phase 3 readout is a genuine scenario. Competition intensifying: Eli Lilly launching oral orforglipron early 2026, Novo Nordisk expanding oral Wegovy offerings — market validating oral GLP-1 demand. Entered at relative weakness — down 24% from 52-week high as of late March. Q3 2026 maintenance data readout is the first major catalyst.',
    },
    {
      id: 'r6', ticker: 'HIMS', date: '2026-05-26',
      title: 'Hims & Hers — Watch List Analysis & FDA Peptide Catalyst',
      type: 'analysis', tags: ['watch-list', 'GLP-1', 'telehealth', 'L3-biology'],
      sources: ['HIMS Q1 2026 Earnings Call', 'FDA Compound Pharmacy Guidance', 'NVO & LLY Partnership Filings'],
      content: 'Status: WATCH — do not buy yet. Current price $23.84 (May 26, 2026). Thesis: data moat + peptide distribution platform + 2.6M subscriber base as unfair advantage. The telehealth delivery mechanism is the customer acquisition funnel; the data is the moat. Q1 2026: Revenue $608M up 4% YoY — missed estimates. Net loss $92.1M vs profit $49.5M prior year — BUT $33.5M was one-time restructuring from compounded GLP-1 exit. Gross margin compressed to 65% from 73%: transitioning from manufacturer to distributor of branded GLP-1s. Strategic pivot: partnership with Novo Nordisk (Wegovy) and Eli Lilly (Zepbound). Full year guidance raised to $2.8-3.0B. $250M share buyback authorized — management confidence signal. Entry conditions: (1) FDA peptide clarification July 2026 — favorable → initiate; (2) Q2 earnings August 2026 — watch gross margin trend. Entry target if both positive: $20-$26 range.',
    },
    {
      id: 'r7', ticker: 'VRT', date: '2026-05-26',
      title: 'Vertiv — AI Data Center Infrastructure & ETF Eligibility Review',
      type: 'analysis', tags: ['watch-list', 'AI-infrastructure', 'cooling', 'L1-infrastructure'],
      sources: ['VRT Q1 2026 Earnings Call', 'S&P 500 Index Inclusion Filing', 'Fidelity Portfolio Review'],
      content: 'Status: WATCH — do not buy at current price. Current price $324.01 (May 26, 2026). Thesis: liquid cooling and high-density power infrastructure for AI data centers. Picks-and-shovels play — doesn\'t matter which chip wins, every GPU cluster needs thermal management. $15B+ backlog. 20-22% organic revenue CAGR target through 2030. 27%+ adjusted operating margins target. Iwájú ruling: FAILS ETF eligibility rule — S&P 500 member since March 2026. Already held indirectly via FXAIX Roth IRA — Satellite only, not Core. Valuation concern: 83x TTM P/E, 48x forward P/E vs industry median 38x — leaves no margin for error. Pulled back 14% from ATH of $379.94. Entry target: $270-$280. At that price forward P/E ~38x = industry median. Alert set at $280 in Fidelity.',
    },
    {
      id: 'r8', ticker: 'GCAGE', date: '2026-05-26',
      title: 'GlycanAge — Pre-IPO Thesis & Longevity Biology Research',
      type: 'thesis', tags: ['private', 'longevity', 'glycomics', 'L3-biology', 'pre-IPO'],
      sources: ['Lauc et al. 2026 IgG Glycan Mortality Study', 'Peter Attia — The Drive (Brian Kennedy Episode)', 'GlycanAge Research Portal'],
      content: 'GlycanAge is private — pre-IPO opportunity. Glycans coat every cell surface and attach to over half of all human proteins. Unlike methylation clocks (tell you biological age), glycans are dynamic, actionable, and reversible. May 2026 landmark study: Professor Gordan Lauc (University of Zagreb, CSO GlycanAge) published validation of IgG glycans as predictors of mortality and demonstrated reversal via Therapeutic Plasma Exchange. 20,000+ person dataset. Scientifically validated, culturally emerging (Reddit catching it, Attia adjacent via Brian Kennedy), financially uncrowded — no pure-play public equity exists yet. Peter Attia high-probability dedicated episode within 60-90 days. Public market expressions: HAE (Haemonetics — TPE equipment), HIMS (distribution to 2.6M subscribers when Attia covers glycans). Catalyst monitors: Attia glycan episode, GlycanAge fundraising round or US expansion, major diagnostics company partnership or acquisition.',
    },
    {
      id: 'r9', ticker: 'SPCX', date: '2026-05-26',
      title: 'SpaceX — IPO Watch Protocol & Entry Discipline',
      type: 'thesis', tags: ['watch-list', 'IPO', 'space', 'L1-infrastructure', 'L4-physical'],
      sources: ['SpaceX IPO Filing', 'Starlink Revenue Data', 'Iwájú IPO Protocol'],
      content: 'IPO Date: June 12, 2026. Status: WATCH — no action at IPO. Thesis: Starlink = physical AI infrastructure for the planet — every remote location with Starlink becomes a digital economy node, directly enabling emerging market connectivity. Starship = most ambitious physical engineering project in history. Iwájú protocol: no IPO buy — maximum financial crowding event of 2026. Passive index inclusion will create forced buying post-IPO. Entry target: 40% below opening price if that opportunity arises. Timeline: mid-September 2026 (90-day lockup expiry window). Maximum size if triggered: Satellite only, not Core. Musk key-person risk: real and not diversifiable — must be sized accordingly.',
    },
  ],
  catalysts: [
    {
      id: 'c1', ticker: 'SCOUT', date: '2026-06-01',
      title: 'Scout Full Calibration Completes — Week 4',
      type: 'other', impact: 'low', status: 'pending', timeframe: 'June 2026',
      description: 'Scout calibration enters Week 4 — first full signal digest across all 58 keywords and 4 sources. First real portfolio-wide signal output since calibration began.',
      notes: 'Read digest carefully. This is the first statistically meaningful signal batch. Watch for any new BREAKOUT signals not yet in thesis map.',
    },
    {
      id: 'c2', ticker: 'SPCX', date: '2026-06-12',
      title: 'SpaceX IPO Lists — Watch Only',
      type: 'other', impact: 'low', status: 'pending', timeframe: 'June 2026',
      description: 'SpaceX lists on public markets. Iwájú protocol: no action at IPO. Maximum financial crowding event of 2026 — passive index inclusion will create forced buying post-listing.',
      notes: 'Do not buy at IPO. Entry target is 40% below opening price. Monitor lockup expiry window mid-September 2026 for potential Satellite position. Musk key-person risk must be sized accordingly.',
    },
    {
      id: 'c3', ticker: 'HIMS', date: '2026-07-01',
      title: 'FDA Peptide Telehealth Clarification Ruling',
      type: 'regulatory', impact: 'high', status: 'pending', timeframe: 'July 2026',
      description: 'FDA expected to issue ruling on peptide compound pharmacy protocols and telehealth prescribing. Binary catalyst for HIMS watch list entry decision.',
      notes: 'Favorable ruling → initiate HIMS position in $20-$26 range. Unfavorable ruling → pass, reassess full L3 peptide thesis. This is entry condition #1 for HIMS.',
    },
    {
      id: 'c4', ticker: 'HOOD', date: '2026-08-01',
      title: 'Robinhood Q2 2026 Earnings',
      type: 'earnings', impact: 'medium', status: 'pending', timeframe: 'Q2 2026',
      description: 'Q2 earnings report. Primary focus: Rothera launch announcement timing, prediction market volume trajectory, and whether crypto drag is stabilising.',
      notes: 'Thesis checkpoint. Watch for: (1) Rothera national launch announcement before June 30 confirmed or slipped; (2) prediction market revenue run rate vs Q1 $147M; (3) crypto revenue stabilisation. None of the 3 exit triggers should have been reached.',
    },
    {
      id: 'c5', ticker: 'CBRS', date: '2026-08-15',
      title: 'Cerebras Systems — First Earnings as Public Company',
      type: 'earnings', impact: 'medium', status: 'pending', timeframe: 'Q2 2026',
      description: 'First quarterly earnings report since May 2026 IPO. First real public data point on revenue trajectory, AWS and OpenAI partnership contribution, and inference market traction.',
      notes: 'Key metrics: revenue growth rate vs 76% YoY in 2025, gross margin, partnership revenue disclosure. Any AWS or OpenAI commentary is signal. Watch for guidance on 2026 full year — sets the re-rating basis before lock-up expiry.',
    },
    {
      id: 'c6', ticker: 'HIMS', date: '2026-08-20',
      title: 'Hims & Hers Q2 2026 Earnings',
      type: 'earnings', impact: 'medium', status: 'pending', timeframe: 'Q2 2026',
      description: 'Q2 earnings — entry condition #2 for HIMS. Watch gross margin recovery from Q1 65% compression, subscriber retention, and first appearance of peptide revenue post-FDA ruling.',
      notes: 'Only relevant if July FDA ruling was favorable. If gross margin below 60% with no recovery guidance → do not enter. Subscriber base must remain above 2M. Full year guidance $2.8-3.0B is the anchor.',
    },
    {
      id: 'c7', ticker: 'VKTX', date: '2026-09-15',
      title: 'Viking Therapeutics — Phase 3 Maintenance Data Readout',
      type: 'clinical-data', impact: 'high', status: 'pending', timeframe: 'Q3 2026',
      description: 'VANQUISH Phase 3 maintenance data readout — first major public data from the oral VK2735 programme. Binary outcome for the VKTX thesis.',
      notes: 'Positive data → conviction confirmed, hold. Failure on primary endpoint → stop-thesis triggered, exit. Alert at $15.27 (50% drawdown) remains active regardless. M&A by LLY or NVO before readout is also a valid exit — take the acquisition premium.',
    },
    {
      id: 'c8', ticker: 'CBRS', date: '2026-09-25',
      title: 'Cerebras Systems — 90-Day Lock-up Expiry Window',
      type: 'other', impact: 'medium', status: 'pending', timeframe: 'Q3 2026',
      description: 'Approximately 90 days post-May 29 IPO. Insider selling pressure may create entry opportunity for additional shares or may compress price. Coincides with SpaceX entry window opening.',
      notes: 'Watch for insider selling activity in the two weeks prior. If price dips materially on lock-up selling with thesis intact — evaluate adding. Do not add solely because of price weakness; thesis must be strengthened by August earnings first.',
    },
  ],
  theses: [
    {
      id: 't1', theme: 'Infrastructure Monopolies', conviction: 95,
      timeHorizon: '7–10 years', positions: ['ASML', 'ADYEN'], color: '#D4A853',
      description: 'Companies that own critical chokepoints in essential technology or financial flows. Not just good businesses — companies competitors cannot replicate regardless of capital allocation.',
      keyAssumptions: [
        'Technological complexity continues to require specialized expertise',
        'Global commerce continues to digitize',
        'No regulatory breakup of critical infrastructure',
      ],
    },
    {
      id: 't2', theme: 'Emerging Market Digital Leap', conviction: 80,
      timeHorizon: '5–8 years', positions: ['MELI'], color: '#60A5FA',
      description: 'Countries that skipped legacy infrastructure now building digital-first financial and commercial systems. Higher growth, higher risk, multi-decade runway.',
      keyAssumptions: [
        'Latin American middle class continues to expand',
        'Smartphone and internet penetration continues to grow',
        'Political stability adequate for business operations',
      ],
    },
    {
      id: 't3', theme: 'Biology as Technology', conviction: 75,
      timeHorizon: '5–12 years', positions: ['NVO'], color: '#4ADE80',
      description: 'Breakthroughs in biological understanding being productized at scale. GLP-1 is the first major monetization of metabolic biology — not the last.',
      keyAssumptions: [
        'Obesity/metabolic disease remains a massive unmet need',
        'Insurance coverage gradually expands',
        'NVO maintains first-mover advantages through pipeline',
      ],
    },
    {
      id: 't4', theme: 'Overlooked Compounders', conviction: 85,
      timeHorizon: '5–10 years', positions: ['KNSL'], color: '#C084FC',
      description: 'Small-to-mid cap companies with durable advantages under-followed by institutional investors. Tech moat in a traditional industry.',
      keyAssumptions: [
        'E&S insurance market remains fragmented',
        'Technology advantage is maintained and expanded',
        'Underwriting discipline preserved as company scales',
      ],
    },
  ],
};

// ─── Storage helpers ──────────────────────────────────────────────────────────
const store = {
  get:    (k, fb = null) => { try { const v = window.localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
  set:    (k, v)         => { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  getAll: ()             => { try { return Object.fromEntries(Object.entries(SK).map(([, k]) => [k, store.get(k)])); } catch { return {}; } },
};

// ─── Utils ────────────────────────────────────────────────────────────────────
const fmt = {
  usd:  (n, d = 2) => n != null ? `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}` : '—',
  pct:  (n)        => n != null ? `${n >= 0 ? '+' : ''}${Number(n).toFixed(1)}%` : '—',
  date: (d)        => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—',
};
const pnlPct = (entry, cur) => ((cur - entry) / entry) * 100;

function nextMonday() {
  const d = new Date();
  const diff = (1 + 7 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

// ─── Shared primitives ────────────────────────────────────────────────────────
const SPIN_CSS = `@keyframes iw-spin{to{transform:rotate(360deg)}}`;

function Spinner() {
  return (
    <>
      <style>{SPIN_CSS}</style>
      <div style={{ width: 16, height: 16, border: `2px solid ${C.bdr}`, borderTop: `2px solid ${C.amber}`, borderRadius: '50%', animation: 'iw-spin .8s linear infinite', flexShrink: 0 }} />
    </>
  );
}

function Badge({ label, color = C.amber }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color, background: color + '1F', padding: '2px 7px', borderRadius: 3 }}>
      {label}
    </span>
  );
}

function Btn({ onClick, children, variant = 'ghost', disabled = false, style: sx = {} }) {
  const base = { cursor: disabled ? 'not-allowed' : 'pointer', border: 'none', borderRadius: 5, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', transition: 'opacity .15s', opacity: disabled ? .45 : 1 };
  const vs = {
    primary:   { background: C.amber,    color: '#000',   padding: '8px 16px' },
    secondary: { background: C.s3,       color: C.text,   padding: '8px 16px', border: `1px solid ${C.bdr}` },
    ghost:     { background: 'transparent', color: C.muted, padding: '6px 12px' },
    danger:    { background: C.redBg,    color: C.red,    padding: '8px 16px', border: `1px solid rgba(248,113,113,.25)` },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...vs[variant], ...sx }}>{children}</button>;
}

function Inp({ value, onChange, placeholder, multi, rows = 3, sx = {} }) {
  const base = { background: C.s2, border: `1px solid ${C.bdr}`, borderRadius: 5, color: C.text, fontFamily: 'inherit', fontSize: 13, padding: '8px 12px', outline: 'none', width: '100%', boxSizing: 'border-box', ...sx };
  if (multi) return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...base, resize: 'vertical', lineHeight: 1.6 }} />;
  return <input value={value} onChange={onChange} placeholder={placeholder} style={base} />;
}

function Sel({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} style={{ background: C.s2, border: `1px solid ${C.bdr}`, borderRadius: 5, color: C.text, fontFamily: 'inherit', fontSize: 13, padding: '8px 12px', outline: 'none', width: '100%' }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Fld({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, color: C.muted, letterSpacing: '0.09em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 600 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.s1, border: `1px solid ${C.bdr}`, borderRadius: 8, width: '100%', maxWidth: width, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: `1px solid ${C.bdr}` }}>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{title}</span>
          <Btn onClick={onClose} variant="ghost">✕</Btn>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── PORTFOLIO TAB ────────────────────────────────────────────────────────────
function PositionCard({ p, onClick }) {
  const gain = pnlPct(p.entryPrice, p.currentPrice);
  const val  = p.currentPrice * p.shares;
  const pos  = gain >= 0;
  const statusColor = { core: C.amber, growth: C.blue, watch: C.muted }[p.status] || C.muted;
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.s1, border: `1px solid ${hov ? C.amberBdr : C.bdr}`, borderRadius: 8, padding: '20px 22px', cursor: 'pointer', transition: 'border-color .15s', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: pos ? C.green : C.red, opacity: .55 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 19, fontWeight: 800, color: C.text, letterSpacing: '.02em' }}>{p.ticker}</span>
            <Badge label={p.status} color={statusColor} />
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>{p.name}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: pos ? C.green : C.red }}>{fmt.pct(gain)}</div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 1 }}>unrealized</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[['Entry', fmt.usd(p.entryPrice)], ['Current', fmt.usd(p.currentPrice)], ['Value', fmt.usd(val, 0)]].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize: 9, color: C.dim, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 2 }}>{l}</div>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55, borderTop: `1px solid ${C.bdr}`, paddingTop: 12 }}>
        {p.thesis.length > 110 ? p.thesis.slice(0, 110) + '…' : p.thesis}
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {(p.tags || []).slice(0, 3).map(t => <span key={t} style={{ fontSize: 10, color: C.dim, background: C.s2, padding: '2px 6px', borderRadius: 3 }}>{t}</span>)}
        <span style={{ marginLeft: 'auto', fontSize: 10, color: C.amber, background: C.amberGlow, padding: '2px 6px', borderRadius: 3 }}>{p.allocation}%</span>
      </div>
    </div>
  );
}

function PosForm({ initial, onSave, onCancel }) {
  const blank = { ticker: '', name: '', sector: '', country: '', entryPrice: '', currentPrice: '', shares: '', allocation: '', status: 'core', thesis: '', stopThesis: '', tags: '', notes: '', targetPrice: '' };
  const [f, setF] = useState(initial ? { ...initial, tags: (initial.tags || []).join(', ') } : blank);
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => onSave({ ...f, id: initial?.id || `p${Date.now()}`, entryPrice: +f.entryPrice || 0, currentPrice: +f.currentPrice || 0, shares: +f.shares || 0, allocation: +f.allocation || 0, targetPrice: +f.targetPrice || null, tags: f.tags.split(',').map(t => t.trim()).filter(Boolean), addedDate: initial?.addedDate || new Date().toISOString().slice(0, 10) });
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Fld label="Ticker"><Inp value={f.ticker} onChange={e => u('ticker', e.target.value.toUpperCase())} placeholder="AAPL" /></Fld>
        <Fld label="Company Name"><Inp value={f.name} onChange={e => u('name', e.target.value)} placeholder="Apple Inc." /></Fld>
        <Fld label="Sector"><Inp value={f.sector} onChange={e => u('sector', e.target.value)} placeholder="Technology" /></Fld>
        <Fld label="Country"><Inp value={f.country} onChange={e => u('country', e.target.value)} placeholder="United States" /></Fld>
        <Fld label="Entry Price ($)"><Inp value={f.entryPrice} onChange={e => u('entryPrice', e.target.value)} placeholder="0.00" /></Fld>
        <Fld label="Current Price ($)"><Inp value={f.currentPrice} onChange={e => u('currentPrice', e.target.value)} placeholder="0.00" /></Fld>
        <Fld label="Shares"><Inp value={f.shares} onChange={e => u('shares', e.target.value)} placeholder="0" /></Fld>
        <Fld label="Allocation (%)"><Inp value={f.allocation} onChange={e => u('allocation', e.target.value)} placeholder="0.0" /></Fld>
        <Fld label="Status"><Sel value={f.status} onChange={e => u('status', e.target.value)} options={[{ value: 'core', label: 'Core' }, { value: 'growth', label: 'Growth' }, { value: 'watch', label: 'Watch' }]} /></Fld>
        <Fld label="Target Price ($)"><Inp value={f.targetPrice || ''} onChange={e => u('targetPrice', e.target.value)} placeholder="0.00" /></Fld>
      </div>
      <Fld label="Investment Thesis"><Inp multi value={f.thesis} onChange={e => u('thesis', e.target.value)} placeholder="Why you own this..." rows={3} /></Fld>
      <Fld label="Stop-Thesis Condition"><Inp multi value={f.stopThesis || ''} onChange={e => u('stopThesis', e.target.value)} placeholder="What would make you sell..." rows={2} /></Fld>
      <Fld label="Notes"><Inp multi value={f.notes} onChange={e => u('notes', e.target.value)} placeholder="Position notes..." rows={3} /></Fld>
      <Fld label="Tags (comma-separated)"><Inp value={f.tags} onChange={e => u('tags', e.target.value)} placeholder="monopoly, AI, Europe" /></Fld>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Btn onClick={onCancel} variant="ghost">Cancel</Btn>
        <Btn onClick={save} variant="primary">Save Position</Btn>
      </div>
    </div>
  );
}

function PortfolioTab({ portfolio, setPortfolio }) {
  const [addOpen, setAddOpen]   = useState(false);
  const [editId, setEditId]     = useState(null);
  const [viewId, setViewId]     = useState(null);

  const save = pos => {
    setPortfolio(prev => {
      const next = prev.find(p => p.id === pos.id) ? prev.map(p => p.id === pos.id ? pos : p) : [...prev, pos];
      store.set(SK.portfolio, next);
      return next;
    });
    setAddOpen(false); setEditId(null);
  };
  const del = id => {
    setPortfolio(prev => { const next = prev.filter(p => p.id !== id); store.set(SK.portfolio, next); return next; });
    setViewId(null);
  };

  const total  = portfolio.reduce((s, p) => s + p.currentPrice * p.shares, 0);
  const cost   = portfolio.reduce((s, p) => s + p.entryPrice   * p.shares, 0);
  const totPnl = cost ? ((total - cost) / cost) * 100 : 0;
  const best   = portfolio.length ? portfolio.reduce((a, b) => pnlPct(a.entryPrice, a.currentPrice) > pnlPct(b.entryPrice, b.currentPrice) ? a : b) : null;

  const vp = viewId ? portfolio.find(p => p.id === viewId) : null;
  const vpPnl = vp ? pnlPct(vp.entryPrice, vp.currentPrice) : 0;

  return (
    <div>
      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: C.bdr, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
        {[
          { l: 'Portfolio Value', v: fmt.usd(total, 0), color: C.text },
          { l: 'Total Return',    v: fmt.pct(totPnl),   color: totPnl >= 0 ? C.green : C.red },
          { l: 'Positions',       v: portfolio.length,  color: C.text },
          { l: 'Top Performer',   v: best?.ticker || '—', color: C.amber },
        ].map(({ l, v, color }) => (
          <div key={l} style={{ background: C.s1, padding: '18px 20px' }}>
            <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 5 }}>{l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: C.muted }}>{portfolio.length} position{portfolio.length !== 1 ? 's' : ''}</span>
        <Btn onClick={() => setAddOpen(true)} variant="primary">+ Add Position</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))', gap: 14 }}>
        {portfolio.map(p => <PositionCard key={p.id} p={p} onClick={() => setViewId(p.id)} />)}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Position" width={680}>
        <PosForm onSave={save} onCancel={() => setAddOpen(false)} />
      </Modal>
      <Modal open={!!editId} onClose={() => setEditId(null)} title="Edit Position" width={680}>
        {editId && <PosForm initial={portfolio.find(p => p.id === editId)} onSave={save} onCancel={() => setEditId(null)} />}
      </Modal>

      {/* View detail modal */}
      <Modal open={!!viewId} onClose={() => setViewId(null)} title={vp?.ticker || ''} width={640}>
        {vp && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{vp.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{vp.sector} · {vp.country}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: vpPnl >= 0 ? C.green : C.red }}>{fmt.pct(vpPnl)}</div>
                <div style={{ fontSize: 11, color: C.muted }}>unrealized return</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
              {[['Entry', fmt.usd(vp.entryPrice)], ['Current', fmt.usd(vp.currentPrice)], ['Value', fmt.usd(vp.currentPrice * vp.shares, 0)], ['Shares', vp.shares], ['Allocation', `${vp.allocation}%`], ['Target', vp.targetPrice ? fmt.usd(vp.targetPrice) : '—']].map(([l, v]) => (
                <div key={l} style={{ background: C.s2, borderRadius: 6, padding: '12px 14px' }}>
                  <div style={{ fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Investment Thesis</div>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.75, background: C.s2, padding: '12px 14px', borderRadius: 6 }}>{vp.thesis}</div>
            </div>
            {vp.stopThesis && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: C.red, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Stop-Thesis Condition</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.75, background: C.redBg, border: `1px solid rgba(248,113,113,.2)`, padding: '12px 14px', borderRadius: 6 }}>{vp.stopThesis}</div>
              </div>
            )}
            {vp.notes && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Notes</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{vp.notes}</div>
              </div>
            )}
            {vp.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                {vp.tags.map(t => <Badge key={t} label={t} color={C.muted} />)}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: `1px solid ${C.bdr}` }}>
              <Btn onClick={() => del(vp.id)} variant="danger">Delete Position</Btn>
              <Btn onClick={() => { setViewId(null); setEditId(vp.id); }} variant="secondary">Edit</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── SCOUT JOURNAL TAB ────────────────────────────────────────────────────────
function AIAnalysis({ portfolio, research, journal }) {
  const [q, setQ]         = useState('');
  const [resp, setResp]   = useState('');
  const [loading, setLod] = useState(false);

  const analyze = async () => {
    if (!q.trim()) return;
    setLod(true); setResp('');
    const ctx = `PORTFOLIO:\n${JSON.stringify(portfolio, null, 2)}\n\nRESEARCH:\n${JSON.stringify(research, null, 2)}\n\nJOURNAL (recent 3):\n${journal.slice(0, 3).map(j => `${j.date} — ${j.subject}\n${j.content}`).join('\n\n')}`;
    const prompt = `You are the Iwájú Scout, an investment intelligence analyst. The investor's complete data is below. Answer their question with precision. Be direct, evidence-based, with clear reasoning. End every response with "Scout surfaces. You decide."\n\nINVESTOR DATA:\n${ctx}\n\nQUESTION: ${q}`;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'anthropic-version': '2023-06-01', 'content-type': 'application/json', 'anthropic-dangerous-direct-browser-calls': 'true' },
        body: JSON.stringify({ model: 'claude-opus-4-8', max_tokens: 1024, messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setResp(data.content?.[0]?.text || 'No response received.');
    } catch (err) {
      setResp(`Analysis unavailable: ${err.message}`);
    } finally {
      setLod(false);
    }
  };

  return (
    <div style={{ background: C.s1, border: `1px solid ${C.amberBdr}`, borderRadius: 8, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.amber, boxShadow: `0 0 8px ${C.amber}55` }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.amber, letterSpacing: '.08em', textTransform: 'uppercase' }}>Scout Analysis</span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Inp value={q} onChange={e => setQ(e.target.value)} placeholder="Ask the Scout about your portfolio…" sx={{ flex: 1 }} />
        <Btn onClick={analyze} variant="primary" disabled={loading} sx={{ whiteSpace: 'nowrap' }}>{loading ? 'Analyzing…' : 'Analyze'}</Btn>
      </div>
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 0', color: C.muted, fontSize: 13 }}>
          <Spinner /> Scout surfaces. You decide.
        </div>
      )}
      {resp && !loading && (
        <div style={{ marginTop: 14, background: C.s2, border: `1px solid ${C.bdr}`, borderRadius: 6, padding: 16, fontSize: 13, color: C.text, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
          {resp}
        </div>
      )}
    </div>
  );
}

function JournalTab({ journal, setJournal, portfolio, research }) {
  const [sel, setSel]     = useState(journal[0]?.id || null);
  const [addOpen, setAdd] = useState(false);
  const [f, setF] = useState({ subject: '', date: new Date().toISOString().slice(0, 10), summary: '', content: '', positions: '', sentiment: 'neutral' });
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));

  const entry = journal.find(j => j.id === sel);
  const sentCol = { positive: C.green, cautious: C.amber, negative: C.red, neutral: C.muted };

  const saveEntry = () => {
    const e = { ...f, id: `j${Date.now()}`, from: 'Manual Entry', positions: f.positions.split(',').map(t => t.trim().toUpperCase()).filter(Boolean) };
    const next = [e, ...journal];
    setJournal(next); store.set(SK.journal, next);
    setAdd(false); setSel(e.id);
    setF({ subject: '', date: new Date().toISOString().slice(0, 10), summary: '', content: '', positions: '', sentiment: 'neutral' });
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: 0, background: C.bdr, borderRadius: 8, overflow: 'hidden', marginBottom: 20, minHeight: 480 }}>
        {/* Sidebar */}
        <div style={{ background: C.s1, borderRight: `1px solid ${C.bdr}`, overflow: 'auto' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.bdr}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '.08em' }}>Entries</span>
            <Btn onClick={() => setAdd(true)} variant="ghost" sx={{ fontSize: 11, padding: '3px 8px' }}>+ Entry</Btn>
          </div>
          {journal.map(j => {
            const active = sel === j.id;
            return (
              <div key={j.id} onClick={() => setSel(j.id)} style={{ padding: '13px 16px', borderBottom: `1px solid ${C.bdr}`, cursor: 'pointer', background: active ? C.s2 : 'transparent', borderLeft: active ? `3px solid ${C.amber}` : '3px solid transparent', transition: 'background .1s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: C.muted }}>{fmt.date(j.date)}</span>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: sentCol[j.sentiment] || C.muted, marginTop: 2 }} />
                </div>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginBottom: 3, lineHeight: 1.3 }}>{j.subject}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{j.summary}</div>
                {j.positions?.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 7, flexWrap: 'wrap' }}>
                    {j.positions.map(t => <span key={t} style={{ fontSize: 9, color: C.amber, background: C.amberGlow, padding: '1px 5px', borderRadius: 2, fontWeight: 700 }}>{t}</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ background: C.s1, padding: 28, overflow: 'auto' }}>
          {entry ? (
            <>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{entry.from}</div>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 12 }}>{fmt.date(entry.date)}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 12, lineHeight: 1.3 }}>{entry.subject}</div>
              {entry.summary && <div style={{ fontSize: 13, color: C.muted, fontStyle: 'italic', marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${C.bdr}` }}>{entry.summary}</div>}
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>{entry.content}</div>
              {entry.positions?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: C.muted }}>Mentions:</span>
                  {entry.positions.map(t => <Badge key={t} label={t} color={C.amber} />)}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: C.dim, textAlign: 'center', marginTop: 80 }}>Select an entry to read.</div>
          )}
        </div>
      </div>

      <AIAnalysis portfolio={portfolio} research={research} journal={journal} />

      <Modal open={addOpen} onClose={() => setAdd(false)} title="New Journal Entry">
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Fld label="Subject / Title"><Inp value={f.subject} onChange={e => u('subject', e.target.value)} placeholder="Scout Report — Week XX" /></Fld>
            <Fld label="Date"><Inp value={f.date} onChange={e => u('date', e.target.value)} placeholder="YYYY-MM-DD" /></Fld>
          </div>
          <Fld label="Summary"><Inp value={f.summary} onChange={e => u('summary', e.target.value)} placeholder="One-line summary…" /></Fld>
          <Fld label="Content"><Inp multi value={f.content} onChange={e => u('content', e.target.value)} placeholder="Entry content…" rows={8} /></Fld>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Fld label="Positions (comma-sep)"><Inp value={f.positions} onChange={e => u('positions', e.target.value)} placeholder="AAPL, MSFT" /></Fld>
            <Fld label="Sentiment"><Sel value={f.sentiment} onChange={e => u('sentiment', e.target.value)} options={[{ value: 'positive', label: 'Positive' }, { value: 'cautious', label: 'Cautious' }, { value: 'negative', label: 'Negative' }, { value: 'neutral', label: 'Neutral' }]} /></Fld>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Btn onClick={() => setAdd(false)} variant="ghost">Cancel</Btn>
            <Btn onClick={saveEntry} variant="primary">Save Entry</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── RESEARCH TAB ─────────────────────────────────────────────────────────────
const TYPE_META = {
  'annual-report': { color: C.amber,  label: 'Annual Report' },
  'analysis':      { color: C.blue,   label: 'Analysis'      },
  'earnings':      { color: C.green,  label: 'Earnings'      },
  'interview':     { color: C.purple, label: 'Interview'     },
  'article':       { color: C.muted,  label: 'Article'       },
  'thesis':        { color: C.amber,  label: 'Thesis'        },
};

function ResearchCard({ note, onClick }) {
  const tm = TYPE_META[note.type] || { color: C.muted, label: note.type };
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.s1, border: `1px solid ${hov ? C.bdrL : C.bdr}`, borderRadius: 8, padding: '18px 20px', cursor: 'pointer', transition: 'border-color .15s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: C.amber }}>{note.ticker}</span>
          <Badge label={tm.label} color={tm.color} />
        </div>
        <span style={{ fontSize: 10, color: C.muted }}>{fmt.date(note.date)}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8, lineHeight: 1.3 }}>{note.title}</div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{note.content.length > 140 ? note.content.slice(0, 140) + '…' : note.content}</div>
      {note.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
          {note.tags.map(t => <span key={t} style={{ fontSize: 10, color: C.dim, background: C.s2, padding: '2px 6px', borderRadius: 3 }}>{t}</span>)}
        </div>
      )}
    </div>
  );
}

function ResearchTab({ research, setResearch }) {
  const [filter, setFil] = useState('all');
  const [addOpen, setAdd] = useState(false);
  const [viewId, setView] = useState(null);
  const blank = { ticker: '', title: '', date: new Date().toISOString().slice(0, 10), type: 'analysis', content: '', sources: '', tags: '' };
  const [f, setF] = useState(blank);
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));

  const tickers = ['all', ...Array.from(new Set(research.map(r => r.ticker)))];
  const shown   = filter === 'all' ? research : research.filter(r => r.ticker === filter);
  const vn      = viewId ? research.find(r => r.id === viewId) : null;

  const saveNote = () => {
    const n = { ...f, id: `r${Date.now()}`, sources: f.sources.split('\n').filter(Boolean), tags: f.tags.split(',').map(t => t.trim()).filter(Boolean) };
    const next = [n, ...research];
    setResearch(next); store.set(SK.research, next);
    setAdd(false); setF(blank);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tickers.map(t => <Btn key={t} onClick={() => setFil(t)} variant={filter === t ? 'primary' : 'ghost'} sx={{ fontSize: 11, padding: '5px 10px' }}>{t === 'all' ? 'All' : t}</Btn>)}
        </div>
        <Btn onClick={() => setAdd(true)} variant="primary">+ Add Research</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: 14 }}>
        {shown.map(n => <ResearchCard key={n.id} note={n} onClick={() => setView(n.id)} />)}
      </div>
      {shown.length === 0 && <div style={{ textAlign: 'center', color: C.dim, padding: 60, fontSize: 14 }}>No research notes yet.</div>}

      <Modal open={!!viewId} onClose={() => setView(null)} title={vn?.title || ''} width={640}>
        {vn && (
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: C.amber }}>{vn.ticker}</span>
              <Badge label={(TYPE_META[vn.type] || {}).label || vn.type} color={(TYPE_META[vn.type] || {}).color || C.muted} />
              <span style={{ fontSize: 11, color: C.muted, marginLeft: 'auto' }}>{fmt.date(vn.date)}</span>
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: 16 }}>{vn.content}</div>
            {vn.sources?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Sources</div>
                {vn.sources.map((s, i) => <div key={i} style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>· {s}</div>)}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={() => { setResearch(prev => { const next = prev.filter(r => r.id !== vn.id); store.set(SK.research, next); return next; }); setView(null); }} variant="danger">Delete Note</Btn>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={addOpen} onClose={() => setAdd(false)} title="Add Research Note" width={640}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <Fld label="Ticker"><Inp value={f.ticker} onChange={e => u('ticker', e.target.value.toUpperCase())} placeholder="AAPL" /></Fld>
            <Fld label="Date"><Inp value={f.date} onChange={e => u('date', e.target.value)} placeholder="YYYY-MM-DD" /></Fld>
            <Fld label="Type"><Sel value={f.type} onChange={e => u('type', e.target.value)} options={Object.entries(TYPE_META).map(([v, m]) => ({ value: v, label: m.label }))} /></Fld>
          </div>
          <Fld label="Title"><Inp value={f.title} onChange={e => u('title', e.target.value)} placeholder="Research note title…" /></Fld>
          <Fld label="Content"><Inp multi value={f.content} onChange={e => u('content', e.target.value)} placeholder="Findings and notes…" rows={7} /></Fld>
          <Fld label="Sources (one per line)"><Inp multi value={f.sources} onChange={e => u('sources', e.target.value)} placeholder={"Source 1\nSource 2"} rows={2} /></Fld>
          <Fld label="Tags (comma-separated)"><Inp value={f.tags} onChange={e => u('tags', e.target.value)} placeholder="fundamentals, moat" /></Fld>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Btn onClick={() => setAdd(false)} variant="ghost">Cancel</Btn>
            <Btn onClick={saveNote} variant="primary">Save Note</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── CATALYSTS TAB ────────────────────────────────────────────────────────────
function CatalystItem({ c }) {
  const daysUntil = Math.ceil((new Date(c.date) - new Date()) / 86400000);
  const impactCol = { high: C.red, medium: C.amber, low: C.muted }[c.impact] || C.muted;
  const statusMeta = { pending: { color: C.blue, label: 'Pending' }, triggered: { color: C.green, label: 'Triggered' }, expired: { color: C.dim, label: 'Expired' } }[c.status] || {};
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.s1, border: `1px solid ${hov ? C.bdrL : C.bdr}`, borderRadius: 8, padding: '18px 20px', display: 'flex', gap: 18, transition: 'border-color .15s' }}>
      <div style={{ textAlign: 'center', minWidth: 52 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: c.status === 'pending' && daysUntil >= 0 ? C.amber : C.dim, lineHeight: 1 }}>
          {c.status === 'pending' && daysUntil >= 0 ? daysUntil : '—'}
        </div>
        <div style={{ fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '.05em' }}>{c.status === 'pending' ? 'days' : ''}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.amber }}>{c.ticker}</span>
            <Badge label={statusMeta.label} color={statusMeta.color} />
            <span style={{ fontSize: 10, color: impactCol, fontWeight: 700, textTransform: 'uppercase' }}>{c.impact} impact</span>
          </div>
          <span style={{ fontSize: 11, color: C.muted }}>{fmt.date(c.date)}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>{c.title}</div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>{c.description}</div>
        {c.notes && <div style={{ fontSize: 11, color: C.muted, marginTop: 8, fontStyle: 'italic', borderTop: `1px solid ${C.bdr}`, paddingTop: 8 }}>{c.notes}</div>}
      </div>
    </div>
  );
}

function CatalystsTab({ catalysts, setCatalysts }) {
  const [status, setStatus] = useState('pending');
  const [addOpen, setAdd]   = useState(false);
  const blank = { ticker: '', date: '', title: '', type: 'earnings', description: '', impact: 'medium', status: 'pending', timeframe: '', notes: '' };
  const [f, setF] = useState(blank);
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));

  const shown  = (status === 'all' ? catalysts : catalysts.filter(c => c.status === status)).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const counts = { pending: catalysts.filter(c => c.status === 'pending').length, triggered: catalysts.filter(c => c.status === 'triggered').length, expired: catalysts.filter(c => c.status === 'expired').length };

  const save = () => {
    const next = [...catalysts, { ...f, id: `c${Date.now()}` }];
    setCatalysts(next); store.set(SK.catalysts, next);
    setAdd(false); setF(blank);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['all', `All (${catalysts.length})`], ['pending', `Pending (${counts.pending})`], ['triggered', `Triggered (${counts.triggered})`], ['expired', `Expired (${counts.expired})`]].map(([v, l]) => (
            <Btn key={v} onClick={() => setStatus(v)} variant={status === v ? 'primary' : 'ghost'} sx={{ fontSize: 11, padding: '5px 10px' }}>{l}</Btn>
          ))}
        </div>
        <Btn onClick={() => setAdd(true)} variant="primary">+ Add Catalyst</Btn>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.map(c => <CatalystItem key={c.id} c={c} />)}
        {shown.length === 0 && <div style={{ textAlign: 'center', color: C.dim, padding: 60, fontSize: 14 }}>No catalysts in this view.</div>}
      </div>

      <Modal open={addOpen} onClose={() => setAdd(false)} title="Add Catalyst">
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Fld label="Ticker"><Inp value={f.ticker} onChange={e => u('ticker', e.target.value.toUpperCase())} placeholder="AAPL" /></Fld>
            <Fld label="Date"><Inp value={f.date} onChange={e => u('date', e.target.value)} placeholder="YYYY-MM-DD" /></Fld>
            <Fld label="Type"><Sel value={f.type} onChange={e => u('type', e.target.value)} options={[{ value: 'earnings', label: 'Earnings' }, { value: 'clinical-data', label: 'Clinical Data' }, { value: 'product-launch', label: 'Product Launch' }, { value: 'regulatory', label: 'Regulatory' }, { value: 'macro', label: 'Macro Event' }, { value: 'other', label: 'Other' }]} /></Fld>
            <Fld label="Impact"><Sel value={f.impact} onChange={e => u('impact', e.target.value)} options={[{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }]} /></Fld>
            <Fld label="Status"><Sel value={f.status} onChange={e => u('status', e.target.value)} options={[{ value: 'pending', label: 'Pending' }, { value: 'triggered', label: 'Triggered' }, { value: 'expired', label: 'Expired' }]} /></Fld>
            <Fld label="Timeframe"><Inp value={f.timeframe} onChange={e => u('timeframe', e.target.value)} placeholder="Q3 2025" /></Fld>
          </div>
          <Fld label="Title"><Inp value={f.title} onChange={e => u('title', e.target.value)} placeholder="Catalyst title…" /></Fld>
          <Fld label="Description"><Inp multi value={f.description} onChange={e => u('description', e.target.value)} placeholder="What to watch and why it matters…" rows={3} /></Fld>
          <Fld label="Scout Notes"><Inp multi value={f.notes} onChange={e => u('notes', e.target.value)} placeholder="Threshold conditions, what to look for…" rows={2} /></Fld>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Btn onClick={() => setAdd(false)} variant="ghost">Cancel</Btn>
            <Btn onClick={save} variant="primary">Save Catalyst</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── THESIS MAP TAB ───────────────────────────────────────────────────────────
const THEME_COLORS = ['#D4A853', '#60A5FA', '#4ADE80', '#C084FC', '#F87171', '#34D399', '#FBBF24'];

function ThesisCard({ thesis, portfolio, onEdit }) {
  const related = portfolio.filter(p => thesis.positions.includes(p.ticker));
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onEdit}
      style={{ background: C.s1, border: `1px solid ${hov ? thesis.color + '55' : C.bdr}`, borderRadius: 8, padding: '22px 24px', cursor: 'pointer', transition: 'border-color .15s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>{thesis.theme}</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{thesis.description}</div>
        </div>
        <div style={{ textAlign: 'right', marginLeft: 16, flexShrink: 0 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: thesis.color }}>{thesis.conviction}%</div>
          <div style={{ fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '.07em' }}>conviction</div>
        </div>
      </div>
      <div style={{ background: C.s3, borderRadius: 3, height: 4, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ width: `${thesis.conviction}%`, height: '100%', background: thesis.color, borderRadius: 3 }} />
      </div>
      {related.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {related.map(p => {
            const g = pnlPct(p.entryPrice, p.currentPrice);
            return (
              <div key={p.id} style={{ background: C.s2, border: `1px solid ${C.bdr}`, borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.ticker}</div>
                <div style={{ fontSize: 11, color: g >= 0 ? C.green : C.red }}>{fmt.pct(g)}</div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ borderTop: `1px solid ${C.bdr}`, paddingTop: 14 }}>
        <div style={{ fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Key Assumptions</div>
        {thesis.keyAssumptions.map((a, i) => (
          <div key={i} style={{ fontSize: 11, color: C.muted, marginBottom: 5, display: 'flex', gap: 8 }}>
            <span style={{ color: thesis.color, flexShrink: 0 }}>·</span><span>{a}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: C.dim }}>Horizon: {thesis.timeHorizon}</div>
    </div>
  );
}

function ThesisMapTab({ theses, setTheses, portfolio }) {
  const [addOpen, setAdd] = useState(false);
  const [editId, setEdit] = useState(null);
  const blank = { theme: '', description: '', conviction: 80, timeHorizon: '5–10 years', positions: '', keyAssumptions: '', color: C.amber };
  const [f, setF] = useState(blank);
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));

  const openEdit = t => {
    setEdit(t.id);
    setF({ ...t, positions: t.positions.join(', '), keyAssumptions: t.keyAssumptions.join('\n') });
    setAdd(true);
  };
  const openAdd = () => { setEdit(null); setF(blank); setAdd(true); };

  const save = () => {
    const t = { ...f, id: editId || `t${Date.now()}`, conviction: +f.conviction || 80, positions: typeof f.positions === 'string' ? f.positions.split(',').map(x => x.trim().toUpperCase()).filter(Boolean) : f.positions, keyAssumptions: typeof f.keyAssumptions === 'string' ? f.keyAssumptions.split('\n').filter(Boolean) : f.keyAssumptions };
    const next = editId ? theses.map(x => x.id === editId ? t : x) : [...theses, t];
    setTheses(next); store.set(SK.theses, next);
    setAdd(false); setEdit(null);
  };

  const del = () => {
    const next = theses.filter(t => t.id !== editId);
    setTheses(next); store.set(SK.theses, next);
    setAdd(false); setEdit(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 13, color: C.muted }}>Investment frameworks that drive position selection.</span>
        <Btn onClick={openAdd} variant="primary">+ Add Thesis</Btn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 16 }}>
        {theses.map(t => <ThesisCard key={t.id} thesis={t} portfolio={portfolio} onEdit={() => openEdit(t)} />)}
      </div>
      {theses.length === 0 && <div style={{ textAlign: 'center', color: C.dim, padding: 80, fontSize: 14 }}>No theses defined yet.</div>}

      <Modal open={addOpen} onClose={() => { setAdd(false); setEdit(null); }} title={editId ? 'Edit Thesis' : 'Add Thesis'} width={640}>
        <div>
          <Fld label="Theme Name"><Inp value={f.theme} onChange={e => u('theme', e.target.value)} placeholder="Infrastructure Monopolies" /></Fld>
          <Fld label="Description"><Inp multi value={f.description} onChange={e => u('description', e.target.value)} placeholder="What this thesis is about…" rows={3} /></Fld>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Fld label="Conviction (0–100)"><Inp value={f.conviction} onChange={e => u('conviction', e.target.value)} placeholder="80" /></Fld>
            <Fld label="Time Horizon"><Inp value={f.timeHorizon} onChange={e => u('timeHorizon', e.target.value)} placeholder="5–10 years" /></Fld>
          </div>
          <Fld label="Positions (comma-separated tickers)"><Inp value={f.positions} onChange={e => u('positions', e.target.value)} placeholder="AAPL, MSFT" /></Fld>
          <Fld label="Key Assumptions (one per line)"><Inp multi value={f.keyAssumptions} onChange={e => u('keyAssumptions', e.target.value)} placeholder={"Assumption 1\nAssumption 2"} rows={4} /></Fld>
          <Fld label="Color">
            <div style={{ display: 'flex', gap: 8 }}>
              {THEME_COLORS.map(col => (
                <div key={col} onClick={() => u('color', col)} style={{ width: 26, height: 26, borderRadius: '50%', background: col, cursor: 'pointer', border: f.color === col ? `3px solid ${C.text}` : '3px solid transparent', transition: 'border-color .15s' }} />
              ))}
            </div>
          </Fld>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editId ? <Btn onClick={del} variant="danger">Delete</Btn> : <div />}
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn onClick={() => { setAdd(false); setEdit(null); }} variant="ghost">Cancel</Btn>
              <Btn onClick={save} variant="primary">Save Thesis</Btn>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'portfolio',  label: 'Portfolio'      },
  { id: 'journal',    label: 'Scout Journal'  },
  { id: 'research',   label: 'Research'       },
  { id: 'catalysts',  label: 'Catalysts'      },
  { id: 'theses',     label: 'Thesis Map'     },
];

export default function IwaajuDashboard() {
  const [tab,       setTab]       = useState('portfolio');
  const [portfolio, setPortfolio] = useState([]);
  const [journal,   setJournal]   = useState([]);
  const [research,  setResearch]  = useState([]);
  const [catalysts, setCatalysts] = useState([]);
  const [theses,    setTheses]    = useState([]);
  const [toast,     setToast]     = useState(null);

  useEffect(() => {
    setPortfolio(store.get(SK.portfolio) || SEED_POSITIONS);
    setJournal(  store.get(SK.journal)   || SEED.journal);
    setResearch( store.get(SK.research)  || SEED.research);
    setCatalysts(store.get(SK.catalysts) || SEED.catalysts);
    setTheses(   store.get(SK.theses)    || SEED.theses);
  }, []);

  const showToast = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast(null), 2600); };

  const exportData = () => {
    try {
      const blob = new Blob([JSON.stringify({ exportDate: new Date().toISOString(), portfolio, journal, research, catalysts, theses }, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `iwaaju-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Backup exported');
    } catch { showToast('Export failed', 'err'); }
  };

  const pendingCount = catalysts.filter(c => c.status === 'pending').length;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: '"Inter","SF Pro Display",-apple-system,BlinkMacSystemFont,sans-serif' }}>
      <style>{`*{box-sizing:border-box;} body{margin:0;} ::placeholder{color:${C.dim};} select option{background:${C.s2};} @media(max-width:640px){.iw-grid-4{grid-template-columns:1fr 1fr!important;} .iw-sidebar{display:none!important;}}`}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: toast.type === 'err' ? C.redBg : C.s2, border: `1px solid ${toast.type === 'err' ? C.red : C.amber}`, color: toast.type === 'err' ? C.red : C.amber, padding: '10px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, boxShadow: '0 4px 24px rgba(0,0,0,.5)' }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.bdr}`, background: C.s1, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18, paddingBottom: 10 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.amber, letterSpacing: '.06em', lineHeight: 1 }}>IWÁJÚ</div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 3 }}>Investing in what lies ahead</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 11, color: C.muted, textAlign: 'right' }}>
                {portfolio.length} position{portfolio.length !== 1 ? 's' : ''} · {pendingCount} catalyst{pendingCount !== 1 ? 's' : ''} · Next Scout: {nextMonday()}
              </div>
              <Btn onClick={exportData} variant="secondary" sx={{ fontSize: 11, padding: '6px 13px' }}>↓ Export</Btn>
            </div>
          </div>
          <nav style={{ display: 'flex' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px', fontSize: 13, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? C.amber : C.muted, borderBottom: tab === t.id ? `2px solid ${C.amber}` : '2px solid transparent', marginBottom: -1, transition: 'all .15s', fontFamily: 'inherit', letterSpacing: '.02em' }}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {tab === 'portfolio'  && <PortfolioTab  portfolio={portfolio}   setPortfolio={setPortfolio} />}
        {tab === 'journal'    && <JournalTab    journal={journal}       setJournal={setJournal}     portfolio={portfolio} research={research} />}
        {tab === 'research'   && <ResearchTab   research={research}     setResearch={setResearch}   />}
        {tab === 'catalysts'  && <CatalystsTab  catalysts={catalysts}   setCatalysts={setCatalysts} />}
        {tab === 'theses'     && <ThesisMapTab  theses={theses}         setTheses={setTheses}       portfolio={portfolio} />}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.bdr}`, padding: '16px 24px', textAlign: 'center', background: C.s1 }}>
        <div style={{ fontSize: 11, color: C.dim, letterSpacing: '.05em' }}>
          No action required. Scout surfaces. You decide. · <span style={{ color: C.amberDim }}>Iwájú</span> — Investing in what lies ahead.
        </div>
      </footer>
    </div>
  );
}
