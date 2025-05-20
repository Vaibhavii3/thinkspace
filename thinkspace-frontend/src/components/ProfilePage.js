import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaLock, FaUser, FaSave, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "../styles/ProfilePage.css";
import ChangePassword from "./ChangePassword";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  
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
      setEditForm({
        name: decodedToken.name || "Name",  
        email: decodedToken.email || "No Email Provided",  
        profilePicture: decodedToken.profilePicture || "defaultProfilePic.jpg",
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form values
    setEditForm({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      
      setUser({
        ...user,
        ...editForm,
      });
      
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({
          ...editForm,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  }

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          {isEditing ? (
            <div className="profile-picture-edit">
              <img
                src={editForm.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <label htmlFor="profile-picture-upload" className="upload-overlay">
                <FaEdit />
                <span>Change</span>
              </label>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          
          <div>
            {isEditing ? (
              <div className="edit-form-header">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="edit-input name-input"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="edit-input email-input"
                  placeholder="Your Email"
                />
              </div>
            ) : (
              <>
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
              </>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <div className="edit-actions">
            <button className="save-button" onClick={handleSaveProfile}>
              <FaSave className="icon" />
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              <FaTimes className="icon" />
              Cancel
            </button>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEditClick}>
            <FaEdit className="icon" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Options Section */}
      <div className="profile-options">
        {/* Account Settings */}
        <div className="profile-option-card">
          <FaLock className="option-icon" />
          <h3>Account Settings</h3>
          <p>
            Manage your password and account preferences.
          </p>
          <button className="option-button" onClick={handleChangePasswordClick}>
            Change Password
          </button>
        </div>

        {/* Profile Information */}
        <div className="profile-option-card">
          <FaUser className="option-icon" />
          <h3>Profile Information</h3>
          <p>
            Update your personal information and visibility settings.
          </p>
          <button className="option-button" onClick={handleEditClick}>
            Edit Details
          </button>
        </div>
      </div>

      {showChangePassword && (
        <ChangePassword onClose={handleCloseChangePassword} />
      )}
    </div>
  );
};

export default ProfilePage;

