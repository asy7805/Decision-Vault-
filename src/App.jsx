import React, { useState } from 'react';
import Layout from './components/Layout';

function App() {
  const [activeScreen, setActiveScreen] = useState('feed');
  const [activeAccount, setActiveAccount] = useState('hargrove');

  return (
    <Layout 
      activeScreen={activeScreen} 
      setActiveScreen={setActiveScreen} 
      activeAccount={activeAccount} 
      setActiveAccount={setActiveAccount} 
    />
  );
}

export default App;
