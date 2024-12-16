// import React, { useState } from "react";
// import { SketchPicker } from "react-color";

// const ThemeSettings = ({ themeColors, setThemeColors }) => {
//   const [primaryColor, setPrimaryColor] = useState(themeColors.primary);
//   const [secondaryColor, setSecondaryColor] = useState(themeColors.secondary);

//   const handleSave = () => {
//     setThemeColors({ primary: primaryColor, secondary: secondaryColor });
//     localStorage.setItem("themeColors", JSON.stringify({ primary: primaryColor, secondary: secondaryColor }));
//   };

//   return (
//     <div style={{ padding: "1rem", textAlign: "center" }}>
//       <h3>Customize Theme Colors</h3>
//       <div style={{ marginBottom: "1rem" }}>
//         <p>Primary Color:</p>
//         <SketchPicker
//           color={primaryColor}
//           onChangeComplete={(color) => setPrimaryColor(color.hex)}
//         />
//       </div>
//       <div style={{ marginBottom: "1rem" }}>
//         <p>Secondary Color:</p>
//         <SketchPicker
//           color={secondaryColor}
//           onChangeComplete={(color) => setSecondaryColor(color.hex)}
//         />
//       </div>
//       <button
//         onClick={handleSave}
//         style={{
//           padding: "0.5rem 1rem",
//           backgroundColor: primaryColor,
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Save Theme
//       </button>
//     </div>
//   );
// };

// export default ThemeSettings;
