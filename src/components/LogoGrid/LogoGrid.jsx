import React from "react";
import "./LogoGrid.css"; 
import { Link } from "react-router-dom";

const LogoGrid = ({ logos }) => {
  return (
    <div className="logo-grid">
    {logos.map((logo) => (
      <Link key={logo._id} to={`/recentAdds/${logo.makes}`}>
        <div className="logo-item">
          <img src={logo.imageUrl} alt={`Logo ${logo._id}`} />
        </div>
      </Link>
    ))}
  </div>
  );
};

export default LogoGrid;
