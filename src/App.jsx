import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/Auth/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  );
}

export default App;
