import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, CheckCircle, AlertTriangle, Shield, Database, TrendingUp, Calendar, FileText, X } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ErrorBoundary from '../components/ErrorBoundary';
import './DecisionDetail.css';

// ----------------------------------------------------
// Sub-component: 3D Visualization Watermark
// ----------------------------------------------------
const NodeScene = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  const pos1 = [-1, 0, 0];
  const pos2 = [0, 0.5, 0];
  const pos3 = [1, -0.5, 0];

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...pos1),
      new THREE.Vector3(...pos2),
      new THREE.Vector3(...pos3)
    ]);
  }, []);

  return (
    <group ref={groupRef}>
      <mesh position={pos1}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#0176D3" />
      </mesh>
      <mesh position={pos2}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#FF9A3C" />
      </mesh>
      <mesh position={pos3}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#EA001E" />
      </mesh>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#E5E5E5" />
      </line>
    </group>
  );
};

const NodeGraph = () => {
  return (
    <div className="three-canvas-container">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} style={{ background: 'transparent' }}>
          <NodeScene />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

// ----------------------------------------------------
// Main Component
// ----------------------------------------------------
export default function DecisionDetail({ setActiveScreen }) {
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsModalClosing(false);
    }, 150);
  };

  const handleConfirmOverride = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setIsModalClosing(true);
      setTimeout(() => {
        setShowModal(false);
        setIsModalClosing(false);
        setIsResolved(true);
        setShowToast(true);

        // Auto dismiss toast logic
        setTimeout(() => {
          setIsToastFading(true);
          setTimeout(() => {
            setShowToast(false);
            setIsToastFading(false);
          }, 400); // 400ms matching updated css
        }, 3000);
      }, 150);
    }, 400);
  };

  return (
    <div className="detail-container">
      {/* ---------- Screen Header ---------- */}
      <div className="screen-header anim-fade-in">
        <div className="breadcrumb-nav">
          <span className="bc-link" onClick={() => setActiveScreen('feed')}>Decision Feed</span>
          <ChevronRight size={12} color="var(--text-secondary)" />
          <span className="bc-text-bold">Hargrove Construction</span>
          <ChevronRight size={12} color="var(--text-secondary)" />
          <span className="bc-text-dim">Decision #DV-2847</span>
        </div>
        
        <div className="header-right">
          {!isResolved ? (
            <div className="header-status-badge">
              <span className="pulse-dot-amber"></span>
              Awaiting Review
            </div>
          ) : (
            <div className="header-status-badge resolved">
              <CheckCircle size={14} color="var(--green-success)" />
              Overridden
            </div>
          )}
          <span className="header-timestamp">Flagged 2 min ago</span>
        </div>
      </div>

      {/* ---------- Main Body ---------- */}
      <div className="main-body">
        
        {/* LEFT COLUMN */}
        <div className="col-left anim-slide-left">
          
          <div className="account-info-card">
            <div className="card-title-lockup">
              <div className="avatar-large">HC</div>
              <div className="account-titles">
                <h2>Hargrove Construction</h2>
                <p>Commercial Lending &middot; Enterprise</p>
              </div>
            </div>
            
            <div className="card-divider"></div>
            
            <div className="fields-stack">
              <div className="data-field">
                <label>Deal Size</label>
                <div className="field-val">$2,300,000</div>
              </div>
              <div className="data-field">
                <label>Industry</label>
                <div className="field-val">Commercial Lending</div>
              </div>
              <div className="data-field">
                <label>Account Owner</label>
                <div className="field-val">Sarah Chen</div>
              </div>
              <div className="data-field">
                <label>Renewal Date</label>
                <div className="field-val val-urgent">June 14, 2026</div>
              </div>
              <div className="data-field">
                <label>Account Status</label>
                <div className="field-val">Active — 3 Year Customer</div>
              </div>
              <div className="data-field">
                <label>Agent Action Queued</label>
                <div className="field-val val-warning">Initiate credit line review and flag for downgrade</div>
              </div>
            </div>
          </div>
          
          <div className="salesforce-objects-card">
            <div className="objects-title">Salesforce Objects Analyzed</div>
            <div className="object-pill-stack">
              <div className="obj-pill pill-account">
                <Database size={14} /> Account Object
              </div>
              <div className="obj-link-line"></div>
              
              <div className="obj-pill pill-opportunity">
                <TrendingUp size={14} /> Opportunity Object
              </div>
              <div className="obj-link-line"></div>
              
              <div className="obj-pill pill-activity">
                <Calendar size={14} /> Activity Object
              </div>
              <div className="obj-link-line"></div>
              
              <div className="obj-pill pill-case">
                <FileText size={14} /> Case Object
              </div>
            </div>
            <div className="objects-footer">
              Cross-object analysis powered by Salesforce metadata graph
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="col-right anim-slide-right">
          
          <div className="reasoning-chain-card">
            <div className="reasoning-header">
              <h3>Why the agent decided this</h3>
              <p>AI reasoning chain — 3 signals analyzed</p>
              <NodeGraph />
            </div>

            <div className="signals-stack">
              {/* SIGNAL 1 */}
              <div className="signal-card anim-signal-1">
                <div className="signal-header-row">
                  <div className="signal-title-group">
                    <CheckCircle size={18} color="var(--green-success)" />
                    <span>Signal 1 — Payment delays detected</span>
                  </div>
                  <div className="signal-weight-pill">Weight: High</div>
                </div>
                <div className="signal-source">Source: Salesforce Opportunity Object</div>
                <div className="signal-detail">3 invoices overdue 15+ days in the last 60 days — payment velocity declining quarter over quarter</div>
              </div>

              {/* SIGNAL 2 */}
              <div className="signal-card anim-signal-2">
                <div className="signal-header-row">
                  <div className="signal-title-group">
                    <CheckCircle size={18} color="var(--green-success)" />
                    <span>Signal 2 — Credit utilization spike</span>
                  </div>
                  <div className="signal-weight-pill">Weight: High</div>
                </div>
                <div className="signal-source">Source: Salesforce Account Object</div>
                <div className="signal-detail">Credit utilization up 40% month over month — exceeds internal risk threshold of 25%</div>
              </div>

              {/* SIGNAL 3 (Amber Warning or Green when Resolved) */}
              <div className={`signal-card anim-signal-3 ${!isResolved ? 'signal-amber' : ''}`}>
                <div className="signal-header-row">
                  <div className="signal-title-group">
                    {!isResolved ? (
                      <AlertTriangle size={18} color="var(--amber-warning)" />
                    ) : (
                      <CheckCircle size={18} color="var(--green-success)" />
                    )}
                    <span>Signal 3 — No recent contact logged</span>
                  </div>
                  <div className={`signal-weight-pill ${!isResolved ? 'weight-pill-amber' : ''}`}>Weight: High</div>
                </div>
                <div className="signal-source">Source: Salesforce Activity Object</div>
                <div className="signal-detail">Last logged activity: 47 days ago — no calls, emails, or meetings recorded in Salesforce</div>
                
                {!isResolved ? (
                  <div className="warning-banner anim-banner-pulse">
                    <AlertTriangle size={16} color="var(--amber-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div className="banner-content">
                      <div className="banner-title">Data integrity flag detected</div>
                      <div className="banner-desc">Decision Vault detected 2 unlogged activities. Rep activity exists in calendar and email but was not synced to Salesforce. This signal may be unreliable.</div>
                    </div>
                  </div>
                ) : (
                  <div className="resolved-banner">
                    <CheckCircle size={16} color="var(--green-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div className="banner-content">
                      <div className="resolved-title">Override logged by Marcus Thompson — Contact data flagged as incomplete. Reassess in 30 days.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="assessment-row">
              <div className="assessment-title">Decision Vault Assessment</div>
              <div className="assessment-body">Signal 3 contains incomplete data from the Salesforce Activity Object. Human review is required before this action executes. Approving without verification may result in incorrect account action.</div>
            </div>

          </div>

        </div>

      </div>

      {/* ---------- Bottom Action Bar ---------- */}
      <div className="action-bar anim-slide-up">
        
        <div className="ab-metrics">
          <div className="ab-metric-col">
            <span className="ab-label">Confidence Score</span>
            <div className="confidence-bg">
              <div className="confidence-fill"></div>
            </div>
            <span className="confidence-detail">73% — Low confidence due to data integrity flag</span>
          </div>

          <div className="ab-metric-col">
            <span className="ab-label">Risk Level</span>
            <div className="risk-pill-large">HIGH RISK</div>
          </div>
        </div>

        <div className="ab-buttons">
          {!isResolved ? (
            <>
              <button className="btn-secondary">
                <CheckCircle size={16} color="var(--text-secondary)" />
                Approve and Execute
              </button>
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                <Shield size={16} color="var(--white)" />
                Override Decision
              </button>
            </>
          ) : (
            <div className="resolved-pill-large">
              <CheckCircle size={16} color="var(--green-success)" />
              Override logged successfully — Decision #DV-2847 will not execute
            </div>
          )}
        </div>
      </div>

      {/* ---------- Override Modal ---------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal-card ${isModalClosing ? 'closing' : ''}`}>
            
            <div className="modal-header">
              <div className="modal-title">
                <Shield size={24} color="var(--primary-blue)" />
                Override AI Decision
              </div>
              <button className="modal-close-btn" disabled={isConfirming} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-subheader">Decision #DV-2847 &middot; Hargrove Construction</div>
            <div className="modal-divider"></div>
            
            <div className="override-form">
              <label className="override-label">Override reason</label>
              <textarea 
                className="override-textarea"
                defaultValue="Contact data incomplete — rep failed to log 2 calls with Hargrove Construction. Activity exists in calendar and email. Reassess credit risk in 30 days."
              ></textarea>
            </div>

            <div className="logged-by-row">
              <div className="logged-avatar">MT</div>
              <div className="logged-text">Logged by Marcus Thompson &middot; Chief Compliance Officer</div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" disabled={isConfirming} onClick={handleCloseModal}>Cancel</button>
              <button className="btn-primary" disabled={isConfirming} onClick={handleConfirmOverride}>
                {isConfirming ? (
                  <>
                    <span style={{width:'16px',height:'16px',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'rotateCw 600ms linear infinite'}}></span>
                    Confirming...
                  </>
                ) : (
                  <>
                    <Shield size={16} color="var(--white)" />
                    Confirm Override
                  </>
                )}
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* ---------- Toast Notification ---------- */}
      {showToast && (
        <div className={`toast-notification ${isToastFading ? 'toast-fade-out' : ''}`}>
          <CheckCircle size={16} color="var(--white)" />
          Decision logged &middot; Hargrove Construction
        </div>
      )}

    </div>
  );
}
