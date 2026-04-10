import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, CheckCircle, AlertTriangle, Shield, Database, TrendingUp, Calendar, FileText, X, Clock } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ErrorBoundary from '../components/ErrorBoundary';
import { ACCOUNT_DETAILS } from '../data/hardcodedData';
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
export default function DecisionDetail({ activeAccount, setActiveScreen }) {
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);

  const acct = ACCOUNT_DETAILS[activeAccount] || ACCOUNT_DETAILS['hargrove'];
  const isHargrove = activeAccount === 'hargrove';
  const isPinebrook = activeAccount === 'pinebrook_saas';
  const isSummit = activeAccount === 'summit_insurance';
  const isVolta = activeAccount === 'volta_energy';

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
          <span className="bc-link" onClick={() => setActiveScreen(acct.back_target)}>{acct.back_label}</span>
          <ChevronRight size={12} color="var(--text-secondary)" />
          <span className="bc-text-bold">{acct.account_info.name}</span>
          <ChevronRight size={12} color="var(--text-secondary)" />
          <span className="bc-text-dim">Decision #{acct.account_info.decision_id}</span>
        </div>
        
        <div className="header-right">
          {isSummit ? (
            <div className="header-status-badge escalate-badge" style={{ backgroundColor: '#FDECEA', borderColor: 'var(--red-danger)', color: 'var(--red-danger)' }}>
              <AlertTriangle size={14} color="var(--red-danger)" />
              Legal Review
            </div>
          ) : isHargrove ? (
            !isResolved ? (
              <div className="header-status-badge">
                <span className="pulse-dot-amber"></span>
                Awaiting Review
              </div>
            ) : (
              <div className="header-status-badge resolved">
                <CheckCircle size={14} color="var(--green-success)" />
                Overridden
              </div>
            )
          ) : (
            <div className="header-status-badge">
              <span className="pulse-dot-amber"></span>
              Awaiting Review
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
              <div className="avatar-large" style={{ background: acct.account_info.avatar_gradient !== 'none' ? acct.account_info.avatar_gradient : '#F3F3F3' }}>
                {acct.account_info.initials}
              </div>
              <div className="account-titles">
                <h2>{acct.account_info.name}</h2>
                <p>{acct.account_info.subtitle}</p>
              </div>
            </div>
            
            <div className="card-divider"></div>
            
            <div className="fields-stack">
              <div className="data-field">
                <label>Deal Size</label>
                <div className="field-val">{acct.account_info.deal_size}</div>
              </div>
              <div className="data-field">
                <label>Industry</label>
                <div className="field-val">{acct.account_info.industry}</div>
              </div>
              <div className="data-field">
                <label>Account Owner</label>
                <div className="field-val">{acct.account_info.account_owner}</div>
              </div>
              <div className="data-field">
                <label>Renewal Date</label>
                <div className="field-val val-urgent">{acct.account_info.renewal_date}</div>
              </div>
              <div className="data-field">
                <label>Account Status</label>
                <div className="field-val">{acct.account_info.account_status}</div>
              </div>
              <div className="data-field">
                <label>Agent Action Queued</label>
                <div className="field-val val-warning">{acct.account_info.agent_action}</div>
              </div>
            </div>
          </div>
          
          <div className="salesforce-objects-card">
            <div className="objects-title">Salesforce Objects Analyzed</div>
            <div className="object-pill-stack">
              <div className="obj-pill pill-account">
                <Database size={14} /> {acct.salesforce_objects[0]}
              </div>
              <div className="obj-link-line"></div>
              
              <div className="obj-pill pill-opportunity">
                <TrendingUp size={14} /> {acct.salesforce_objects[1]}
              </div>
              <div className="obj-link-line"></div>
              
              <div className="obj-pill pill-activity">
                <Calendar size={14} /> {acct.salesforce_objects[2]}
              </div>
              <div className="obj-link-line"></div>
              
              <div className="obj-pill pill-case">
                <FileText size={14} /> {acct.salesforce_objects[3]}
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
                    <span>{acct.signals.signal_1.title}</span>
                  </div>
                  <div className="signal-weight-pill">Weight: {acct.signals.signal_1.weight}</div>
                </div>
                <div className="signal-source">Source: {acct.signals.signal_1.source}</div>
                <div className="signal-detail">{acct.signals.signal_1.detail}</div>
              </div>

              {/* SIGNAL 2 */}
              <div className="signal-card anim-signal-2">
                <div className="signal-header-row">
                  <div className="signal-title-group">
                    <CheckCircle size={18} color="var(--green-success)" />
                    <span>{acct.signals.signal_2.title}</span>
                  </div>
                  <div className="signal-weight-pill">Weight: {acct.signals.signal_2.weight}</div>
                </div>
                <div className="signal-source">Source: {acct.signals.signal_2.source}</div>
                <div className="signal-detail">{acct.signals.signal_2.detail}</div>
              </div>

              {/* SIGNAL 3 (Amber Warning or Green when Resolved/NoWarning) */}
              <div className={`signal-card anim-signal-3 ${(isHargrove && !isResolved) || isPinebrook ? 'signal-amber' : ''}`}>
                <div className="signal-header-row">
                  <div className="signal-title-group">
                    {((isHargrove && !isResolved) || isPinebrook) ? (
                      <AlertTriangle size={18} color="var(--amber-warning)" />
                    ) : (
                      <CheckCircle size={18} color="var(--green-success)" />
                    )}
                    <span>{acct.signals.signal_3.title}</span>
                  </div>
                  <div className={`signal-weight-pill ${((isHargrove && !isResolved) || isPinebrook) ? 'weight-pill-amber' : ''}`}>
                    {isHargrove && isResolved ? 'Weight: High' : `Weight: ${acct.signals.signal_3.weight}`}
                  </div>
                </div>
                <div className="signal-source">Source: {acct.signals.signal_3.source}</div>
                <div className="signal-detail">{acct.signals.signal_3.detail}</div>
                
                {isHargrove ? (
                  !isResolved ? (
                    <div className="warning-banner anim-banner-pulse">
                      <AlertTriangle size={16} color="var(--amber-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div className="banner-content">
                        <div className="banner-title">{acct.signals.signal_3.warning_title}</div>
                        <div className="banner-desc">{acct.signals.signal_3.warning_desc}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="resolved-banner">
                      <CheckCircle size={16} color="var(--green-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div className="banner-content">
                        <div className="resolved-title">Override logged by Marcus Thompson — Contact data flagged as incomplete. Reassess in 30 days.</div>
                      </div>
                    </div>
                  )
                ) : isPinebrook ? (
                  <div className="warning-banner anim-banner-pulse">
                    <AlertTriangle size={16} color="var(--amber-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div className="banner-content">
                      <div className="banner-title">{acct.signals.signal_3.warning_title}</div>
                      <div className="banner-desc">{acct.signals.signal_3.warning_desc}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="assessment-row">
              <div className="assessment-title">Decision Vault Assessment</div>
              <div className="assessment-body">{acct.assessment}</div>
            </div>

          </div>

        </div>

      </div>

      {/* ---------- Bottom Action Bar ---------- */}
      {isHargrove ? (
        <div className="action-bar anim-slide-up">
          <div className="ab-metrics">
            <div className="ab-metric-col">
              <span className="ab-label">Confidence Score</span>
              <div className="confidence-bg">
                <div className="confidence-fill"></div>
              </div>
              <span className="confidence-detail">{acct.account_info.confidence_score}% — Low confidence due to data integrity flag</span>
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
                Override logged successfully — Decision #{acct.account_info.decision_id} will not execute
              </div>
            )}
          </div>
        </div>
      ) : isSummit ? (
        <div className="action-bar escalated-bar anim-slide-up" style={{ backgroundColor: '#FDECEA', borderTop: '1px solid #EA001E', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="ab-metrics">
            <div className="ab-metric-col">
              <span className="ab-label">Confidence Score</span>
              <div className="confidence-bg">
                <div className="confidence-fill" style={{ width: `${acct.account_info.confidence_score}%` }}></div>
              </div>
              <span className="confidence-detail">{acct.account_info.confidence_score}% — High confidence</span>
            </div>
            <div className="ab-metric-col">
              <span className="ab-label">Risk Level</span>
              <div className="risk-pill-large" style={{ backgroundColor: 'var(--red-danger)', color: 'white' }}>HIGH RISK</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} color="var(--red-danger)" />
              <span style={{ fontSize: '13px', color: 'var(--red-danger)', fontWeight: 500 }}>{acct.account_info.escalation_status}</span>
            </div>
            <button style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border-gray)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }} onClick={() => setActiveScreen('feed')}>
              Back to Feed
            </button>
          </div>
        </div>
      ) : (
        <div className="action-bar read-only-bar anim-slide-up" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-gray)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto' }}>
          
          <div className="ab-metrics">
            <div className="ab-metric-col">
              <span className="ab-label">Confidence Score</span>
              <div className="confidence-bg">
                <div className="confidence-fill" style={{ width: `${acct.account_info.confidence_score}%` }}></div>
              </div>
              <span className="confidence-detail">{acct.account_info.confidence_score}% — {acct.account_info.confidence_score < 75 ? 'Low confidence' : 'High confidence'}</span>
            </div>
            <div className="ab-metric-col">
              <span className="ab-label">Risk Level</span>
              <div className="risk-pill-large" style={{ backgroundColor: 'var(--red-danger)', color: 'white' }}>HIGH RISK</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{display: 'flex', alignItems: 'center'}}><Clock size={16} color="var(--amber-warning)" style={{marginRight: '4px'}} /></div>
              <span style={{ fontSize: '13px', color: 'var(--amber-warning)', fontWeight: 500 }}>{acct.account_info.queue_status}</span>
            </div>
            <button style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border-gray)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }} onClick={() => setActiveScreen('queue')}>
              Back to Queue
            </button>
          </div>
        </div>
      )}

      {/* ---------- Override Modal (Hargrove Only) ---------- */}
      {isHargrove && showModal && (
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
            
            <div className="modal-subheader">Decision #{acct.account_info.decision_id} &middot; {acct.account_info.name}</div>
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

      {/* ---------- Toast Notification (Hargrove Only) ---------- */}
      {isHargrove && showToast && (
        <div className={`toast-notification ${isToastFading ? 'toast-fade-out' : ''}`}>
          <CheckCircle size={16} color="var(--white)" />
          Decision logged &middot; {acct.account_info.name}
        </div>
      )}

    </div>
  );
}
