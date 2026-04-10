import React, { useState } from 'react';
import { FileText, ChevronDown, ShieldCheck, Download } from 'lucide-react';
import './RegulatoryReports.css';

const FRAMEWORK_MAP = {
  CFPB: {
    kicker: 'COMPLIANCE AUDIT REPORT',
    title: 'CFPB / ECOA — Equal Credit Opportunity Act',
    reportId: 'RPT-2026-Q1-CFPB-0041',
    complianceDesc: 'This report meets CFPB examination standards for algorithmic decision-making transparency under the 2023 circular on automated credit decisions.',
    prevReportTitle: 'CFPB Compliance Report — Q4 2025',
  },
  SOX: {
    kicker: 'COMPLIANCE AUDIT REPORT',
    title: 'SOX — Sarbanes-Oxley Section 404',
    reportId: 'RPT-2026-Q1-SOX-0041',
    complianceDesc: 'This report meets SOX Section 404 internal control requirements for automated financial decisions, with full audit trail documentation.',
    prevReportTitle: 'SOX Compliance Report — Q4 2025',
  },
  EU: {
    kicker: 'COMPLIANCE AUDIT REPORT',
    title: 'EU AI Act — Article 13 High-Risk Systems',
    reportId: 'RPT-2026-Q1-EUAI-0041',
    complianceDesc: 'This report meets EU AI Act Article 13 transparency requirements for high-risk AI systems, including full reasoning chain documentation.',
    prevReportTitle: 'EU AI Act Report — Q4 2025',
  },
  HIPAA: {
    kicker: 'COMPLIANCE AUDIT REPORT',
    title: 'HIPAA — Privacy Rule Audit',
    reportId: 'RPT-2026-Q1-HIPAA-0041',
    complianceDesc: 'This report meets HIPAA Privacy Rule audit requirements for automated decisions involving protected health information.',
    prevReportTitle: 'HIPAA Compliance Report — Q4 2025',
  },
  GDPR: {
    kicker: 'COMPLIANCE AUDIT REPORT',
    title: 'GDPR — Article 22 Automated Decision-Making',
    reportId: 'RPT-2026-Q1-GDPR-0041',
    complianceDesc: 'This report meets GDPR Article 22 transparency requirements for automated decisions with legal or similarly significant effect.',
    prevReportTitle: 'GDPR Compliance Report — Q4 2025',
  },
};

export default function RegulatoryReports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [genSuccess, setGenSuccess] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('CFPB');
  const [activeFramework, setActiveFramework] = useState('CFPB');

  const handleGenerateClick = () => {
    if (isGenerating || reportGenerated) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGenSuccess(true);
      setTimeout(() => setGenSuccess(false), 600);
      setActiveFramework(selectedFramework);
      setReportGenerated(true);
    }, 1200);
  };

  const fw = FRAMEWORK_MAP[activeFramework];

  return (
    <div className="rr-container">
      
      {/* LEFT COLUMN */}
      <div className="rr-left">
        
        {/* Generate Card */}
        <div className="generate-card">
          <div className="gen-header-title">Generate Compliance Report</div>
          <div className="gen-header-subtitle">Select a framework and date range to produce an audit-ready export</div>
          <div className="gen-divider"></div>
          
          <div className="form-fields">
            {/* Field 1 */}
            <div className="form-field">
              <label className="form-field-label">Compliance Framework</label>
              <div className="select-wrapper">
                <select
                  className="form-select"
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                >
                  <option value="CFPB">CFPB / ECOA</option>
                  <option value="SOX">SOX</option>
                  <option value="EU">EU AI Act</option>
                  <option value="HIPAA">HIPAA</option>
                  <option value="GDPR">GDPR</option>
                </select>
                <ChevronDown className="select-arrow" size={16} color="#747474" />
              </div>
            </div>

            {/* Field 2 */}
            <div className="form-field" style={{ marginTop: '16px' }}>
              <label className="form-field-label">Date Range</label>
              <div className="date-row">
                <div className="date-input-wrap">
                  <input type="text" className="date-input" defaultValue="2026-01-01" />
                  <span className="date-sublabel">From</span>
                </div>
                <div className="date-dash">&ndash;</div>
                <div className="date-input-wrap">
                  <input type="text" className="date-input" defaultValue="2026-04-09" />
                  <span className="date-sublabel">To</span>
                </div>
              </div>
            </div>

            {/* Field 3 */}
            <div className="form-field" style={{ marginTop: '16px' }}>
              <label className="form-field-label">Report Scope</label>
              <div className="scope-row">
                <div className="scope-pill scope-active">All Decisions</div>
                <div className="scope-pill scope-inactive">Overrides Only</div>
                <div className="scope-pill scope-inactive">Flagged Only</div>
              </div>
            </div>
          </div>
          
          <button 
            className={`btn-generate ${genSuccess ? 'btn-generate-success' : ''}`}
            onClick={handleGenerateClick}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="btn-spinner"></div>
                Generating...
              </>
            ) : (
              <>
                <FileText size={18} color="white" />
                Generate Report
              </>
            )}
          </button>
        </div>

        {/* Stats Card */}
        <div className="stats-card">
          <div className="stats-header-title">Q1 2026 Summary</div>
          <div className="stats-header-subtitle">Jan 1 &ndash; Apr 9, 2026</div>
          <div className="stats-divider"></div>

          <div className="stats-grid">
            <div className="stat-block">
              <span className="sb-val val-black">847</span>
              <span className="sb-lbl">Total AI Decisions</span>
            </div>
            <div className="stat-block">
              <span className="sb-val val-amber">23</span>
              <span className="sb-lbl">Human Overrides</span>
            </div>
            <div className="stat-block">
              <span className="sb-val val-green">0</span>
              <span className="sb-lbl">Unexplained Actions</span>
            </div>
            <div className="stat-block">
              <span className="sb-val val-blue">100%</span>
              <span className="sb-lbl">Audit Coverage</span>
            </div>
          </div>

          <div className="compliance-badge">
            <ShieldCheck size={16} color="var(--green-success)" />
            <span className="cb-text">All decisions audit-ready &mdash; 0 compliance gaps detected</span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="rr-right">
        {!reportGenerated && (
          <div className={`pre-gen-container ${isGenerating ? 'fade-out' : ''}`}>
            
            <div className="placeholder-card">
              <FileText size={48} color="#E5E5E5" style={{ marginBottom: '16px' }} />
              <div className="placeholder-title">No report generated yet</div>
              <div className="placeholder-subtitle">
                Select a compliance framework and click Generate Report to produce your audit export
              </div>
              <div className="placeholder-pill">
                Supports CFPB, SOX, EU AI Act, HIPAA, GDPR
              </div>
            </div>

            <div className="prev-report-card">
              <div className="prc-header">
                <div className="prc-header-title">Previously Generated</div>
                <div className="prc-date-pill">Mar 15, 2026</div>
              </div>
              <div className="prev-report-row">
                <FileText size={20} color="#0176D3" />
                <div className="prr-mid">
                  <div className="prr-title">{FRAMEWORK_MAP[selectedFramework].prevReportTitle}</div>
                  <div className="prr-meta">Generated by Marcus Thompson &middot; 312 decisions &middot; 0 gaps</div>
                </div>
                <Download size={16} color="#0176D3" className="prr-action" />
              </div>
            </div>

          </div>
        )}

        {reportGenerated && (
          <div className="report-doc">
            {/* Header section (Gradient Navy) */}
            <div className="rd-header">
              <div className="rdH-top">
                <div>
                  <div className="rdH-kicker">{fw.kicker}</div>
                  <div className="rdH-title">{fw.title}</div>
                  <div className="rdH-meta">Decision Vault &middot; Meridian Capital &middot; Q1 2026</div>
                </div>
                <div className="rdH-audit-badge">
                  <ShieldCheck size={14} color="white" />
                  Audit Ready
                </div>
              </div>

              <div className="rdH-bottom">
                <div className="rd-stat" style={{flex: 1, textAlign: 'center'}}>
                  <span className="rd-stat-val">47</span>
                  <span className="rd-stat-lbl">Decisions Reviewed</span>
                </div>
                <div className="rd-stat" style={{flex: 1, textAlign: 'center'}}>
                  <span className="rd-stat-val">3</span>
                  <span className="rd-stat-lbl">Human Overrides</span>
                </div>
                <div className="rd-stat" style={{flex: 1, textAlign: 'center'}}>
                  <span className="rd-stat-val">38</span>
                  <span className="rd-stat-lbl">Auto Approved</span>
                </div>
                <div className="rd-stat" style={{flex: 1, textAlign: 'center'}}>
                  <span className="rd-stat-val">0</span>
                  <span className="rd-stat-lbl">Unexplained Actions</span>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="rd-body">
              {/* Section 1: Details */}
              <div className="rd-section-lbl">REPORT DETAILS</div>
              
              <div className="rd-detail-row">
                <span className="rd-dr-lbl">Report ID</span>
                <span className="rd-dr-val">{fw.reportId}</span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-dr-lbl">Generated</span>
                <span className="rd-dr-val">April 9, 2026 at 09:14 AM EST</span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-dr-lbl">Generated By</span>
                <span className="rd-dr-val">Marcus Thompson &mdash; Chief Compliance Officer</span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-dr-lbl">Coverage Period</span>
                <span className="rd-dr-val">January 1, 2026 &ndash; April 9, 2026</span>
              </div>
              
              <div className="rd-divider"></div>

              {/* Section 2: Decision Breakdown */}
              <div className="rd-section-lbl">DECISION BREAKDOWN</div>

              <div className="rd-type-row">
                <div className="rd-tr-left">
                  <div className="rd-dot rd-dot-green"></div>
                  Auto Approved &mdash; No Risk Threshold Exceeded
                </div>
                <span className="rd-tr-val val-t-green">38 decisions</span>
              </div>

              <div className="rd-type-row">
                <div className="rd-tr-left">
                  <div className="rd-dot rd-dot-amber"></div>
                  Human Reviewed &mdash; Approved After Review
                </div>
                <span className="rd-tr-val val-t-amber">6 decisions</span>
              </div>

              <div className="rd-type-row">
                <div className="rd-tr-left">
                  <div className="rd-dot rd-dot-blue"></div>
                  Overridden &mdash; AI Decision Corrected by Human
                </div>
                <span className="rd-tr-val val-t-blue">3 decisions</span>
              </div>

              <div className="rd-divider"></div>

              {/* Section 3: Compliance Status */}
              <div className="rd-section-lbl">COMPLIANCE STATUS</div>
              <div className="rd-compliance-block">
                <ShieldCheck size={20} color="var(--green-success)" className="rcb-icon" />
                <div>
                  <div className="rcb-title">All AI decisions fully auditable</div>
                  <div className="rcb-desc">
                    Every decision in this report contains a complete reasoning chain, data source attribution, confidence score, and human review record where applicable. {fw.complianceDesc}
                  </div>
                </div>
              </div>

            </div>

            {/* Document Footer */}
            <div className="rd-footer">
              <div className="rd-f-left">
                Report generated by Decision Vault &middot; Powered by Salesforce Trust Layer
              </div>
              <div className="rd-f-right">
                <button className="btn-share">Share with Legal</button>
                <button className="btn-export">
                  <Download size={14} color="white" />
                  Export to PDF
                </button>
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
