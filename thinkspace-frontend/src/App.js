import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import ThemeCustomization from './components/ThemeCustomization';
import SavedNotes from './components/SavedNotes';
import AiGenerate from './components/AiGenerate';
import DailyTask from './components/DailyTask';

function App() {

  // const defaultColors = {
  //   primary: "#007bff",
  //   secondary: "#6c757d",
  // }

  // const [themeColors, setThemeColors] = useState(
  //   JSON.parse(localStorage.getItem("themeColors")) || defaultColors
  // );

  // useEffect(() => {
  //   document.documentElement.style.setProperty("--primary-color", themeColors.primary);
  //   document.documentElement.style.setProperty("--secondary-color", themeColors.secondary);
  // }, [themeColors]);

    return (
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/ThemeCustomization" element={<ThemeCustomization />} />
          <Route path="/saved-notes" element={<SavedNotes />} />
          <Route path="/AiGen" element={<AiGenerate />} />
          <Route path="/DailyTask" element={<DailyTask />} />
        </Routes>
      </Router>
    );
}

export default App;
