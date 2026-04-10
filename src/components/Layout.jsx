import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

// Placeholder imports
import DecisionFeed from '../screens/DecisionFeed';
import DecisionDetail from '../screens/DecisionDetail';
import ReviewQueue from '../screens/ReviewQueue';
import RegulatoryReports from '../screens/RegulatoryReports';
import AgentHealth from '../screens/AgentHealth';

export default function Layout({ activeScreen, setActiveScreen }) {
  const [displayScreen, setDisplayScreen] = useState(activeScreen);
  const [fadeState, setFadeState] = useState('in'); // 'in' or 'out'

  useEffect(() => {
    if (activeScreen !== displayScreen) {
      // Start fade out
      setFadeState('out');
      
      // Wait for opacity to reach 0, then swap content and fade back in
      const timeoutId = setTimeout(() => {
        setDisplayScreen(activeScreen);
        setFadeState('in');
      }, 150);
      
      return () => clearTimeout(timeoutId);
    }
  }, [activeScreen, displayScreen]);

  const renderScreen = () => {
    switch (displayScreen) {
      case 'feed': return <DecisionFeed setActiveScreen={setActiveScreen} />;
      case 'detail': return <DecisionDetail />;
      case 'queue': return <ReviewQueue />;
      case 'reports': return <RegulatoryReports />;
      case 'health': return <AgentHealth />;
      default: return <DecisionFeed setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="layout-container">
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <Topbar activeScreen={activeScreen} />
      
      <main className="main-content-wrapper">
        <div className={`main-fade-container ${fadeState === 'out' ? 'fade-out' : 'fade-in'}`}>
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}
