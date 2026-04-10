import React from 'react';
import { Bell } from 'lucide-react';
import './Topbar.css';

const SCREEN_TITLES = {
  feed: 'Decision Feed',
  detail: 'Decision Detail',
  queue: 'Review Queue',
  reports: 'Regulatory Reports',
  health: 'Agent Health',
};

export default function Topbar({ activeScreen }) {
  const currentTitle = SCREEN_TITLES[activeScreen] || 'Dashboard';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">{currentTitle}</h2>
      </div>
      <div className="topbar-right">
        <div className="notification-bell">
          <Bell size={18} color="var(--text-secondary)" />
          <span className="notification-dot"></span>
        </div>
        
        <div className="live-badge">
          <span className="pulse-dot"></span>
          Live
        </div>

        <div className="topbar-date">
          Apr 9, 2026 &nbsp;&middot;&nbsp; Today
        </div>
      </div>
    </header>
  );
}
