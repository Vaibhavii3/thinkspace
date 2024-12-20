import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "../styles/ProfilePage.css";



const ProfilePage = () => {
  const [ user, setUser ] = useState ({
    name: "",
    email: "",
    profilePicture: "", 
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({
        name: decodedToken.name || "Name",  
        email: decodedToken.email || "No Email Provided",  
        profilePicture: decodedToken.profilePicture || "defaultProfilePic.jpg", 
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div
      className="profile-container">
      {/* Profile Header */}
      <div
        className="profile-header">
        <div className="profile-info">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
        <button
          className="edit-button">
          <FaEdit className="icon" />
          Edit Profile
        </button>
      </div>

      {/* Options Section */}
      <div
        className="profile-options"
      >

        {/* Account Settings */}
        <div
          className="profile-option-card"
        >
          <FaLock className="option-icon" />
          <h3>Account Settings</h3>
          <p>
            Manage your password and account preferences.
          </p>
          <button className="option-button">
            Change Password
          </button>
        </div>

        {/* Logout */}
        <div
          className="profile-option-card">
          <FaSignOutAlt className="option-icon" />
          <h3>Logout</h3>
          <p>
            Sign out of your account securely.
          </p>
          <button className="option-button" onClick={handleLogout} >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
