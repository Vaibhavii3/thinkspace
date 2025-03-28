import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import SavedNotes from './components/SavedNotes';
import AiGenerate from './components/AiGenerate';
import DailyTask from './components/DailyTask';

function App() {

    return (
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/saved-notes" element={<SavedNotes />} />
          <Route path="/AiGen" element={<AiGenerate />} />
          <Route path="/DailyTask" element={<DailyTask />} />
        </Routes>
      </Router>
    );
}

export default App;
