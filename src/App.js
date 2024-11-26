import './App.css';
import React, { useEffect, useState } from 'react';
// import { ThemeProvider } from 'styled-components';
// import NotesPage from './components/NotesPage';
// import { FiSun, FiMoon } from "react-icons/fi";
// import ThemeSettings from './styles/themeSettings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import NoteManagement from './components/NoteManagement';
import ArchiveFeature from './components/ArchiveFeature';
import TaggingSystem from './components/TaggingSystem';
import ProfilePage from './components/ProfilePage';
import ThemeCustomization from './components/ThemeCustomization';


function App() {

  const defaultColors = {
    primary: "#007bff",
    secondary: "#6c757d",
  }

  const [themeColors, setThemeColors] = useState(
    JSON.parse(localStorage.getItem("themeColors")) || defaultColors
  );

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", themeColors.primary);
    document.documentElement.style.setProperty("--secondary-color", themeColors.secondary);
  }, [themeColors]);

  

  

    return (
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notemanagement" element={<NoteManagement />} />
          <Route path="/archivefeature" element={<ArchiveFeature />} />
          <Route path="/taggingsystem" element={<TaggingSystem />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/ThemeCustomization" element={<ThemeCustomization />} />

        </Routes>
      </Router>
    );
}

export default App;
