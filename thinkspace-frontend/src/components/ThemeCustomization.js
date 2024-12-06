import React, { useState } from "react";

const ThemeCustomization = () => {
  // Predefined themes
  const themes = [
    { name: "Classic Light", primary: "#ffffff", secondary: "#f4f4f4" },
    { name: "Midnight Blue", primary: "#001f3f", secondary: "#001f3f" },
    { name: "Pastel Pink", primary: "#ffb6c1", secondary: "#ffe4e1" },
    { name: "Mint Green", primary: "#98ff98", secondary: "#e0ffe0" },
  ];

  // State for current theme and custom theme
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [customTheme, setCustomTheme] = useState({
    primary: "#000000",
    secondary: "#ffffff",
  });

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    // Save to localStorage or backend
  };

  const handleCustomThemeChange = (e) => {
    const { name, value } = e.target;
    setCustomTheme((prev) => ({ ...prev, [name]: value }));
  };

  const applyCustomTheme = () => {
    setCurrentTheme(customTheme);
    // Save to localStorage or backend
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Theme Customization
      </h1>

      {/* Predefined Themes */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Choose a Predefined Theme</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {themes.map((theme, index) => (
            <div
              key={index}
              onClick={() => handleThemeChange(theme)}
              style={{
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                cursor: "pointer",
                textAlign: "center",
                backgroundColor: theme.primary,
                color: theme.secondary === "#ffffff" ? "#000" : "#fff",
              }}
            >
              <p style={{ fontWeight: "bold" }}>{theme.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Theme */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>Customize Your Theme</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div>
            <label>Primary Color: </label>
            <input
              type="color"
              name="primary"
              value={customTheme.primary}
              onChange={handleCustomThemeChange}
              style={{ marginLeft: "1rem" }}
            />
          </div>
          <div>
            <label>Secondary Color: </label>
            <input
              type="color"
              name="secondary"
              value={customTheme.secondary}
              onChange={handleCustomThemeChange}
              style={{ marginLeft: "1rem" }}
            />
          </div>
        </div>
        <button
          onClick={applyCustomTheme}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#6a0dad",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Apply Custom Theme
        </button>
      </div>

      {/* Preview */}
      <div>
        <h2>Preview Current Theme</h2>
        <div
          style={{
            border: "2px solid #ddd",
            borderRadius: "8px",
            padding: "2rem",
            textAlign: "center",
            backgroundColor: currentTheme.primary,
            color: currentTheme.secondary === "#ffffff" ? "#000" : "#fff",
          }}
        >
          <p style={{ fontSize: "1.2rem" }}>This is how your theme looks!</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomization;
