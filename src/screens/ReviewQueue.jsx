import React from 'react';
import { Inbox, Clock, CheckCircle, Timer, AlertTriangle, ChevronRight } from 'lucide-react';
import './ReviewQueue.css';

export default function ReviewQueue({ setActiveScreen, setActiveAccount }) {
  return (
    <div className="queue-container">
      
      {/* 1. Summary Bar */}
      <div className="summary-bar">
        <div className="summary-pill">
          <Inbox size={14} color="#747474" />
          <span className="sp-val-1">3 decisions in queue</span>
        </div>
        
        <div className="summary-pill">
          <Clock size={14} color="var(--amber-warning)" />
          <span className="sp-val-2">2 pending review</span>
        </div>
        
        <div className="summary-pill">
          <CheckCircle size={14} color="var(--green-success)" />
          <span className="sp-val-3">1 resolved today</span>
        </div>
        
        <div className="summary-pill">
          <Timer size={14} color="var(--primary-blue)" />
          <span className="sp-val-4">Avg review time: 14 min</span>
        </div>
      </div>

      {/* 2. Queue Header */}
      <div className="queue-header">
        <div className="qh-left">
          <h1>Pending Review</h1>
          <p>Decisions paused by Decision Vault — awaiting human approval before execution</p>
        </div>
        
        <div className="qh-right">
          <div className="filter-pill filter-active">All</div>
          <div className="filter-pill filter-inactive">High Risk Only</div>
        </div>
      </div>

      {/* 3. Decision Cards Stack */}
      <div className="cards-list">
        
        {/* CARD 1: Hargrove (Resolved) */}
        <div className="decision-card hargrove-card">
          <div className="card-header-row">
            <div className="header-left">
              <div className="card-title title-resolved">Hargrove Construction</div>
              <div className="card-subtitle">Credit line review flagged &middot; Commercial Lending &middot; $2.3M</div>
            </div>
            
            <div className="status-badge badge-overridden">
              <CheckCircle size={12} color="var(--green-success)" />
              Overridden
            </div>
          </div>
          
          <div className="card-divider"></div>
          
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Risk Level</span>
              <span className="detail-val val-dim">High</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assigned To</span>
              <span className="detail-val val-dim">Marcus Thompson</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Resolved</span>
              <span className="detail-val val-green">Just now</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Override Reason</span>
              <span className="detail-val val-dim">Contact data incomplete — reassess in 30 days</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Volta (Urgent) */}
        <div 
          className="decision-card volta-card volta-clickable" 
          onClick={() => { setActiveAccount('volta_energy'); setActiveScreen('detail'); }}
        >
          <div className="card-header-row">
            <div className="header-left">
              <div className="card-title title-pending">Volta Energy</div>
              <div className="card-subtitle">Account downgrade flagged &middot; Energy Sector &middot; $1.8M</div>
            </div>
            
            <div className="status-badge badge-pending">
              <div className="badge-pulse"></div>
              Pending Review
              <ChevronRight size={16} color="#747474" style={{ marginLeft: '4px' }} />
            </div>
          </div>
          
          <div className="card-divider"></div>
          
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Risk Level</span>
              <span className="risk-pill-high">High</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assigned To</span>
              <span className="detail-val val-bold">Marcus Thompson</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Waiting</span>
              <span className="detail-val val-amber">1 hour 4 min</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Threshold Triggered</span>
              <span className="detail-val val-bold">Exceeds $1M account value threshold</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Paused Action</span>
              <span className="detail-val val-bold">Account downgrade workflow — not yet executed</span>
            </div>
          </div>
          
          <div className="action-row">
            <span className="action-note">Agentforce action paused — awaiting your decision</span>
            <div className="action-buttons">
              <button className="btn-view">View Details</button>
              <button className="btn-review">Review Now</button>
            </div>
          </div>
        </div>

        {/* CARD 3: Pinebrook (Longest Waiting) */}
        <div 
          className="decision-card pinebrook-card pinebrook-clickable"
          onClick={() => { setActiveAccount('pinebrook_saas'); setActiveScreen('detail'); }}
        >
          <div className="urgency-banner">
            <AlertTriangle size={12} color="var(--red-danger)" />
            <span className="urgency-text">Waiting 4+ hours — immediate review recommended</span>
          </div>

          <div className="card-header-row">
            <div className="header-left">
              <div className="card-title title-pending">Pinebrook SaaS</div>
              <div className="card-subtitle">Churn risk flagged &middot; B2B SaaS &middot; $920K ARR</div>
            </div>
            
            <div className="status-badge badge-pending">
              <div className="badge-pulse"></div>
              Pending Review
              <ChevronRight size={16} color="var(--red-danger)" style={{ marginLeft: '4px' }} />
            </div>
          </div>
          
          <div className="card-divider"></div>
          
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Risk Level</span>
              <span className="risk-pill-high">High</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assigned To</span>
              <span className="detail-val val-bold">Marcus Thompson</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Waiting</span>
              <span className="detail-val val-red-urgent">4 hours 17 min</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Threshold Triggered</span>
              <span className="detail-val val-bold">Customer in active upsell negotiation</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Paused Action</span>
              <span className="detail-val val-bold">Churn intervention workflow — not yet executed</span>
            </div>
          </div>

          <div className="action-row">
            <span className="action-note">Agentforce action paused — awaiting your decision</span>
            <div className="action-buttons">
              <button className="btn-view">View Details</button>
              <button className="btn-review">Review Now</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
