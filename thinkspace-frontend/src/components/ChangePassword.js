import React, { useState } from "react";
import { FaLock, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import "../styles/ChangePassword.css";

const ChangePassword = ({ onClose }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setErrors({
          general: "You are not authenticated. Please log in again."
        });
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/changePassword`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle different error responses
      if (error.response) {
        if (error.response.status === 403) {
          setErrors({
            currentPassword: "Current password is incorrect"
          });
        } else if (error.response.data && error.response.data.message) {
          setErrors({
            general: error.response.data.message
          });
        } else {
          setErrors({
            general: "Failed to change password. Please try again."
          });
        }
      } else {
        setErrors({
          general: "Network error. Please check your connection and try again."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-modal">
      <div className="change-password-content">
        <div className="change-password-header">
          <FaLock className="header-icon" />
          <h2>Change Password</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        {success ? (
          <div className="success-message">
            <FaCheck className="success-icon" />
            <p>Password changed successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="password-form">
            {errors.general && (
              <div className="error-message general-error">{errors.general}</div>
            )}
            
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className={errors.currentPassword ? "input-error" : ""}
              />
              {errors.currentPassword && (
                <p className="error-text">{errors.currentPassword}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className={errors.newPassword ? "input-error" : ""}
              />
              {errors.newPassword && (
                <p className="error-text">{errors.newPassword}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;