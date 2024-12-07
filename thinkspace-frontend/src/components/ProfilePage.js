import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPalette, FaLock, FaSignOutAlt } from "react-icons/fa";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const user = {
    name: "hello",
    email: "hello@example.com",
    profilePicture:
      "IMG/p.jpg", 
  };

  return (
    <div
      className="profile-container"
    >
      {/* Profile Header */}
      <div
        className="profile-header"
      >
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
          className="edit-button"
        >
          <FaEdit className="icon" />
          Edit Profile
        </button>
      </div>

      {/* Options Section */}
      <div
        className="profile-options"
      >
        {/* Theme Customization */}
        <div
          className="profile-option-card"
        >
          <FaPalette className="option-icon" />
          <h3>Theme Customization</h3>
          <p>
            Personalize your experience with custom themes.
          </p>
          <Link to="/ThemeCustomization">
          <button
            className="option-button"
          >
            Customize Theme
          </button>
            </Link>
        </div>

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
          <button className="option-button" >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
