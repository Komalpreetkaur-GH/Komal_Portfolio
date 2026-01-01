import { useState, useEffect } from 'react';
import Home from './components/Home';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <InteractiveBackground theme={theme} />
      <Home theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

export default App;
