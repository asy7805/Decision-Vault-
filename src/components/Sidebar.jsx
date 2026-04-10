import React from 'react';
import { Shield, LayoutDashboard, FileSearch, Inbox, FileText, Activity } from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'feed', label: 'Decision Feed', icon: LayoutDashboard },
  { id: 'detail', label: 'Decision Detail', icon: FileSearch },
  { id: 'queue', label: 'Review Queue', icon: Inbox },
  { id: 'reports', label: 'Regulatory Reports', icon: FileText },
  { id: 'health', label: 'Agent Health', icon: Activity },
];

export default function Sidebar({ activeScreen, setActiveScreen }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand-lockup">
          <Shield color="white" size={20} />
          <span className="brand-name">Decision Vault</span>
        </div>
        <div className="brand-subtitle">Powered by Salesforce</div>
      </div>
      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveScreen(item.id)}
            >
              <span className="nav-border-indicator"></span>
              <Icon size={18} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom-wrapper">
        <div className="sidebar-divider"></div>
        <div className="sidebar-bottom">
          <div className="avatar">MT</div>
          <div className="user-info">
            <div className="user-name">Marcus Thompson</div>
            <div className="user-role">Chief Compliance Officer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
