import React from "react";
import "./LogoGrid.css"; // Add custom styles in this CSS file

const LogoGrid = ({ logos }) => {
  return (
    <div className="logo-grid">
      {logos.map((logo) => (
        <div key={logo._id} className="logo-item">
          <img src={logo.imageUrl} alt={`Logo ${logo._id}`} />
        </div>
      ))}
    </div>
  );
};

export default LogoGrid;
