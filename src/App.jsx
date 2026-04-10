import React, { useState } from 'react';
import Layout from './components/Layout';

function App() {
  const [activeScreen, setActiveScreen] = useState('feed');

  return (
    <Layout activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
  );
}

export default App;
