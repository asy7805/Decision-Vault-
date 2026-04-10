import React from 'react';
import { Activity, AlertTriangle, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';
import './DecisionFeed.css';
import { DECISIONS_FEED_DATA } from '../data/hardcodedData';

const getRiskClass = (risk) => {
  switch(risk) {
    case 'High': return 'badge-high';
    case 'Medium': return 'badge-medium';
    case 'Low': return 'badge-low';
    default: return 'badge-low';
  }
};

const getStatusClass = (status) => {
  if (status.includes('Paused')) return 'status-paused';
  if (status.includes('Auto Executed')) return 'status-auto';
  if (status.includes('Human Reviewed')) return 'status-human';
  if (status.includes('Escalated')) return 'status-escalated';
  return 'status-auto';
};

export default function DecisionFeed({ setActiveScreen }) {

  return (
    <div className="feed-container">
      {/* Metric Cards Row */}
      <div className="metric-cards-row">
        <div className="metric-card animate-slide-up stagger-1">
          <div className="metric-card-top">
            <Activity size={18} color="var(--primary-blue)" />
            <span className="metric-badge" style={{ backgroundColor: 'var(--light-blue)', color: 'var(--primary-blue)' }}>Last 24 hours</span>
          </div>
          <div className="metric-card-bottom">
            <div className="metric-number">47</div>
            <div className="metric-label">Total Decisions Today</div>
          </div>
        </div>

        <div className="metric-card animate-slide-up stagger-2">
          <div className="metric-card-top">
            <AlertTriangle size={18} color="var(--amber-warning)" />
            <span className="metric-badge" style={{ backgroundColor: '#FFF4E8', color: 'var(--amber-warning)' }}>Needs attention</span>
          </div>
          <div className="metric-card-bottom">
            <div className="metric-number" style={{ color: 'var(--amber-warning)' }}>3</div>
            <div className="metric-label">Flagged for Review</div>
          </div>
        </div>

        <div className="metric-card animate-slide-up stagger-3">
          <div className="metric-card-top">
            <CheckCircle size={18} color="var(--green-success)" />
            <span className="metric-badge" style={{ backgroundColor: '#EEF6F0', color: 'var(--green-success)' }}>No action needed</span>
          </div>
          <div className="metric-card-bottom">
            <div className="metric-number" style={{ color: 'var(--green-success)' }}>38</div>
            <div className="metric-label">Auto Executed</div>
          </div>
        </div>
      </div>

      {/* Decisions Table */}
      <div className="decisions-table-container animate-slide-up stagger-4">
        
        <div className="table-row table-header">
          <div className="table-header-col">Account Name</div>
          <div className="table-header-col">Agent Action</div>
          <div className="table-header-col">Risk Level</div>
          <div className="table-header-col">Status</div>
          <div className="table-header-col">Timestamp</div>
        </div>

        <div className="table-body">
          {DECISIONS_FEED_DATA.map((row) => (
            <div
              key={row.id}
              className={`table-row table-body-row ${row.isDemoEntryPoint ? 'hargrove-row' : 'row-locked'}`}
              onClick={row.isDemoEntryPoint && setActiveScreen ? () => setActiveScreen('detail') : undefined}
              title={row.isDemoEntryPoint ? undefined : 'Demo mode — click Hargrove Construction to continue'}
            >
              <div className={row.isDemoEntryPoint ? 'hargrove-account-col' : ''}>
                {row.account}
              </div>
              <div>{row.action}</div>
              <div>
                <span className={`risk-badge ${getRiskClass(row.risk)}`}>{row.risk}</span>
              </div>
              <div>
                <span className={`status-badge ${getStatusClass(row.status)}`}>{row.status}</span>
              </div>
              <div className="timestamp-col">
                <span>{row.time}</span>
                {row.isDemoEntryPoint && (
                  <ChevronRight size={16} color="var(--text-secondary)" className="chevron-icon" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="table-footer">
          <div className="footer-left">
            Showing 10 of 47 decisions today
          </div>
          <div className="footer-right">
            <RefreshCw size={14} className="refresh-icon" color="var(--primary-blue)" />
            <span>Auto-refreshing every 30s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
