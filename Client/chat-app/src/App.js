import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Correct import for v6
import HomePage from './pages/HomePage'; // Ensure HomePage is default exported
import ChatPage from './pages/ChatPage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
      </div>
  );
}

export default App;
