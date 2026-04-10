import React, { useRef } from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { Canvas, useFrame } from '@react-three/fiber';
import { Activity, AlertTriangle, TrendingDown, CheckCircle, Zap, TrendingUp, Minus, Info } from 'lucide-react';
import ErrorBoundary from '../components/ErrorBoundary';
import './AgentHealth.css';

const CHART_DATA = [
  { name: "Credit Risk Scorer", rate: 18, fill: "#EA001E" },
  { name: "Churn Predictor", rate: 9, fill: "#FF9A3C" },
  { name: "Contract Renewal", rate: 4, fill: "#0176D3" },
  { name: "Upsell Recommender", rate: 3, fill: "#0176D3" },
  { name: "Pricing Agent", rate: 2, fill: "#0176D3" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="ah-chart-tooltip">
        <div className="ah-tooltip-val">{payload[0].payload.name} &mdash; {payload[0].value}% override rate</div>
      </div>
    );
  }
  return null;
};

// Subtle 3D background accent
function WireframeSphere() {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.8, 12, 12]} />
      <meshBasicMaterial color="white" wireframe={true} />
    </mesh>
  );
}

export default function AgentHealth() {
  return (
    <div className="ah-container">

      {/* 1. Summary Pills */}
      <div className="ah-summary-pills">
        <div className="ah-summary-pill">
          <Activity size={14} color="#0176D3" />
          <span style={{ color: '#0176D3' }}>5 agents monitored</span>
        </div>
        <div className="ah-summary-pill">
          <AlertTriangle size={14} color="#EA001E" />
          <span style={{ color: '#EA001E' }}>1 needs retraining</span>
        </div>
        <div className="ah-summary-pill">
          <TrendingDown size={14} color="#FF9A3C" />
          <span style={{ color: '#FF9A3C' }}>1 under monitoring</span>
        </div>
        <div className="ah-summary-pill">
          <CheckCircle size={14} color="#2E844A" />
          <span style={{ color: '#2E844A' }}>3 performing well</span>
        </div>
      </div>

      {/* 2. Chart Card */}
      <div className="ah-chart-card">
        <div className="ah-chart-header">
          <div className="ah-ch-left">
            <div className="ah-ch-title">Agent Override Rate &mdash; Last 30 Days</div>
            <div className="ah-ch-subtitle">Percentage of decisions overridden by human reviewers per agent</div>
          </div>
          <div className="ah-ch-right">
            <div className="ah-time-pill ah-tp-inactive">7 Days</div>
            <div className="ah-time-pill ah-tp-active">30 Days</div>
            <div className="ah-time-pill ah-tp-inactive">90 Days</div>
          </div>
        </div>

        <div className="ah-chart-wrapper">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={CHART_DATA} margin={{ top: 0, right: 24, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F3F3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#747474' }} axisLine={false} tickLine={false} />
              <YAxis 
                tick={{ fontSize: 12, fill: '#747474' }} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(val) => `${val}%`} 
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ cursor: 'crosshair', fill: 'rgba(0,0,0,0.02)' }} 
                isAnimationActive={false}
              />
              <ReferenceLine 
                y={10} 
                stroke="#E5E5E5" 
                strokeDasharray="4 4" 
                label={{ position: 'insideTopRight', value: '10% threshold', fill: '#747474', fontSize: 11 }} 
              />
              <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="ah-chart-footer">
          <Info size={14} color="#747474" />
          <span className="ah-cf-text">Override rate above 10% indicates agent may require retraining</span>
        </div>
      </div>

      {/* 3. Insight Callout Card */}
      <div className="ah-insight-card">
        <div className="ah-threejs-container">
          <ErrorBoundary>
            <Canvas camera={{ position: [0, 0, 3.5] }}>
              <WireframeSphere />
            </Canvas>
          </ErrorBoundary>
        </div>

        <div className="ah-ic-content">
          <div className="ah-ic-top">
            <Zap size={18} color="white" />
            <div className="ah-ic-kicker">Decision Vault Insight</div>
          </div>
          
          <div className="ah-ic-main">
            Your Credit Risk Scorer agent is overriding 1 in 5 decisions. After 30 days of Decision Vault data, this pattern is statistically significant &mdash; the agent's training data may not reflect your current customer portfolio. Recommended: schedule retraining with Q1 2026 override data.
          </div>

          <div className="ah-ic-bottom">
            <div className="ah-icB-left">
              <div className="ah-icB-stat">
                <span className="ah-icB-val">18%</span>
                <span className="ah-icB-lbl">Override Rate</span>
              </div>
              <div className="ah-icB-stat">
                <span className="ah-icB-val">89 decisions</span>
                <span className="ah-icB-lbl">Sample Size</span>
              </div>
            </div>
            <button className="ah-icB-btn">Schedule Retraining</button>
          </div>
        </div>
      </div>

      {/* 4. Agent Performance Table */}
      <div className="ah-table-card">
        <div className="ah-tbl-header-bar">
          <div className="ah-tbl-hb-left">Agent Performance Details</div>
          <div className="ah-tbl-hb-right">Last 30 days &middot; 365 total decisions analyzed</div>
        </div>

        <div className="ah-tbl-row ah-tbl-cols">
          <div className="ah-tbl-col-1">Agent Name</div>
          <div className="ah-tbl-col-2">Decisions Made</div>
          <div className="ah-tbl-col-3">Overrides</div>
          <div className="ah-tbl-col-4">Override Rate</div>
          <div className="ah-tbl-col-5">Trend</div>
          <div className="ah-tbl-col-6">Status</div>
        </div>

        {/* Row 1 */}
        <div className="ah-tbl-row ah-tbl-data-row">
          <div className="ah-tbl-col-1 ah-td-agent">
            <div className="ah-td-dot ah-dot-red"></div>
            Credit Risk Scorer
          </div>
          <div className="ah-tbl-col-2 ah-td-val">89</div>
          <div className="ah-tbl-col-3 ah-td-val">16</div>
          <div className="ah-tbl-col-4 ah-td-rate ah-rate-red">18%</div>
          <div className="ah-tbl-col-5">
            <TrendingUp size={16} color="var(--red-danger)" />
          </div>
          <div className="ah-tbl-col-6">
            <span className="ah-td-badge ah-badge-retrain">Needs Retraining</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="ah-tbl-row ah-tbl-data-row">
          <div className="ah-tbl-col-1 ah-td-agent">
            <div className="ah-td-dot ah-dot-amber"></div>
            Churn Predictor
          </div>
          <div className="ah-tbl-col-2 ah-td-val">54</div>
          <div className="ah-tbl-col-3 ah-td-val">5</div>
          <div className="ah-tbl-col-4 ah-td-rate ah-rate-amber">9%</div>
          <div className="ah-tbl-col-5">
            <Minus size={16} color="#747474" />
          </div>
          <div className="ah-tbl-col-6">
            <span className="ah-td-badge ah-badge-monitor">Monitoring</span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="ah-tbl-row ah-tbl-data-row">
          <div className="ah-tbl-col-1 ah-td-agent">
            <div className="ah-td-dot ah-dot-green"></div>
            Contract Renewal Agent
          </div>
          <div className="ah-tbl-col-2 ah-td-val">112</div>
          <div className="ah-tbl-col-3 ah-td-val">4</div>
          <div className="ah-tbl-col-4 ah-td-rate ah-rate-green">4%</div>
          <div className="ah-tbl-col-5">
            <TrendingDown size={16} color="var(--green-success)" />
          </div>
          <div className="ah-tbl-col-6">
            <span className="ah-td-badge ah-badge-healthy">Healthy</span>
          </div>
        </div>

        {/* Row 4 */}
        <div className="ah-tbl-row ah-tbl-data-row">
          <div className="ah-tbl-col-1 ah-td-agent">
            <div className="ah-td-dot ah-dot-green"></div>
            Upsell Recommender
          </div>
          <div className="ah-tbl-col-2 ah-td-val">67</div>
          <div className="ah-tbl-col-3 ah-td-val">2</div>
          <div className="ah-tbl-col-4 ah-td-rate ah-rate-green">3%</div>
          <div className="ah-tbl-col-5">
            <TrendingDown size={16} color="var(--green-success)" />
          </div>
          <div className="ah-tbl-col-6">
            <span className="ah-td-badge ah-badge-healthy">Healthy</span>
          </div>
        </div>

        {/* Row 5 */}
        <div className="ah-tbl-row ah-tbl-data-row">
          <div className="ah-tbl-col-1 ah-td-agent">
            <div className="ah-td-dot ah-dot-green"></div>
            Pricing Agent
          </div>
          <div className="ah-tbl-col-2 ah-td-val">43</div>
          <div className="ah-tbl-col-3 ah-td-val">1</div>
          <div className="ah-tbl-col-4 ah-td-rate ah-rate-green">2%</div>
          <div className="ah-tbl-col-5">
            <TrendingDown size={16} color="var(--green-success)" />
          </div>
          <div className="ah-tbl-col-6">
            <span className="ah-td-badge ah-badge-healthy">Healthy</span>
          </div>
        </div>

        <div className="ah-tbl-footer">
          <div>365 total decisions &middot; 28 overrides &middot; 7.7% overall override rate</div>
          <div className="ah-tbl-f-right">Data updates continuously as Decision Vault logs new decisions</div>
        </div>
      </div>

    </div>
  );
}
