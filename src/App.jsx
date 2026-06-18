import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HabitForm from './pages/HabitForm';

function App() {
  // 1. State to track if Dark Mode is active (Defaults to false / Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Change the entire webpage background whenever the toggle is clicked
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#15092c'; // Dark gray background
      document.body.style.color = '#f5f5f5';           // Light text
    } else {
      document.body.style.backgroundColor = '#ffffff'; // White background
      document.body.style.color = '#333333';           // Dark text
    }
  }, [isDarkMode]);

  return (
    <div>
      {/* Header area with the title and the toggle button side-by-side */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <h1> ___Your Personal Habit Tracker___</h1>
        
        {/* The Dark Mode Switch */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '20px',
            border: '1px solid #777',
            backgroundColor: isDarkMode ? '#444' : '#eee',
            color: isDarkMode ? '#fff' : '#000',
            fontWeight: 'bold'
          }}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      
      {/* The Routes system handles swapping out the pages below the header */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<HabitForm />} />
        <Route path="/edit/:id" element={<HabitForm />} />
      </Routes>
    </div>
  );
}

export default App;