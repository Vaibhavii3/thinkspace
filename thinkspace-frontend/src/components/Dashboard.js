import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave, FaMagic, FaUser, FaSignOutAlt, FaPenNib, FaLeaf } from "react-icons/fa";
import axios from "axios";
import "../styles/Dashboard.css";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [quote, setQuote] = useState("");
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({
    name: "User",
    profilePicture: null,
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          // Redirect to login if no token
          navigate("/login");
          return;
        }
        
        const decoded = jwtDecode(token);
        console.log(decoded);
        
        setUser({
          name: decoded.name,
          profilePicture: decoded.image
        })
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle token expiration or auth error
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      }
    };
    
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/quotes`);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex].text);
      } catch (err) {
        console.error(err);
        setQuote("Write your thoughts, they have the power to change your world.");
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/notes`,
          {
            title: text.split('\n')[0] || "Untitled Note",
            text,
          } ,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (response.data.success) {
          setNotes(response.data.notes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchNotes();
  }, []);
  
  const handleChange = (e) => {
    setText(e.target.value);
    setShowSaveButton(e.target.value.trim() !== "");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/notes`, 
        { text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data.success) {
        setNotes((prevNotes) => {
          if (!Array.isArray(prevNotes)) {
            return [response.data.note];
          }
          return [response.data.note, ...prevNotes];
        });
        setText(""); 
        setShowSaveButton(false);
      } else {
        alert("Failed to save the note.");
      }
    } catch (error) {
      console.error("Error saving the note:", error);
      // Handle token expiration or auth error
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        alert("An error occurred while saving the note.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <FaLeaf className="logo-icon" />
          <h1>ThinkSpace</h1>
        </div>
        
        <nav className="main-nav">
          <Link to="/dashboard" className="nav-link active">
            <FaPenNib className="nav-icon" />
            <span>Write</span>
          </Link>
          <Link to="/DailyTask" className="nav-link">
            Daily Task
          </Link>
          <Link to="/saved-notes" className="nav-link">
            Your Notes
          </Link>
        </nav>

        <div className="profile-section">
          <div className="profile-wrapper" onClick={toggleProfileMenu}>
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <div className="profile-picture-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="username">{user.name}</span>
          </div>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <Link to="/ProfilePage" className="dropdown-item">
                <FaUser className="dropdown-icon" />
                Profile
              </Link>
              <button className="dropdown-item logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-main">
        {/* Quote section */}
        <div className="quote-section">
          <h3>Today's Inspiration</h3>
          <p className="quote-text">"{quote}"</p>
          <div className="quote-divider"></div>
        </div>

        {/* Text Editor */}
        <div className="editor-section">
          <div className="editor-container">
            <textarea
              placeholder="Start writing here..."
              value={text}
              onChange={handleChange}
              className="text-editor"
            />

            {/* Save Button */}
            {showSaveButton && (
              <button
                onClick={handleSave}
                className="save-button"
              >
                <FaSave />
                <span>Save</span>
              </button>
            )}
          </div>

          {/* AI Generation Button */}
          <Link to="/AiGen" className="ai-button">
            <FaMagic />
            <span>AI Generate</span>
          </Link>
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;
