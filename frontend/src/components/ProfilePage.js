import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPalette, FaLock, FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
  const user = {
    name: "hello",
    email: "hello@example.com",
    profilePicture:
      "IMG/p.jpg", 
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "1rem",
            }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <p style={{ margin: 0, color: "#666" }}>{user.email}</p>
          </div>
        </div>
        <button
          style={{
            backgroundColor: "#6a0dad",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          <FaEdit style={{ marginRight: "0.5rem" }} />
          Edit Profile
        </button>
      </div>

      {/* Options Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Theme Customization */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <FaPalette style={{ fontSize: "2rem", color: "#6a0dad" }} />
          <h3 style={{ margin: "1rem 0" }}>Theme Customization</h3>
          <p style={{ color: "#666" }}>
            Personalize your experience with custom themes.
          </p>
          <Link to="/ThemeCustomization">
          <button
            style={{
              backgroundColor: "#6a0dad",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Customize Theme
          </button>
            </Link>
        </div>

        {/* Account Settings */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <FaLock style={{ fontSize: "2rem", color: "#6a0dad" }} />
          <h3 style={{ margin: "1rem 0" }}>Account Settings</h3>
          <p style={{ color: "#666" }}>
            Manage your password and account preferences.
          </p>
          <button
            style={{
              backgroundColor: "#6a0dad",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Change Password
          </button>
        </div>

        {/* Logout */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <FaSignOutAlt style={{ fontSize: "2rem", color: "#6a0dad" }} />
          <h3 style={{ margin: "1rem 0" }}>Logout</h3>
          <p style={{ color: "#666" }}>
            Sign out of your account securely.
          </p>
          <button
            style={{
              backgroundColor: "#6a0dad",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
