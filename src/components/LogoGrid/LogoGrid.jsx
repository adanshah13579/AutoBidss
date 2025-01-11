import React from "react";
<<<<<<< HEAD
import "./LogoGrid.css"; 
import { Link } from "react-router-dom";
=======
import "./LogoGrid.css"; // Add custom styles in this CSS file
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

const LogoGrid = ({ logos }) => {
  return (
    <div className="logo-grid">
<<<<<<< HEAD
    {logos.map((logo) => (
      <Link key={logo._id} to={`/recentAdds/${logo.makes}`}>
        <div className="logo-item">
          <img src={logo.imageUrl} alt={`Logo ${logo._id}`} />
        </div>
      </Link>
    ))}
  </div>
=======
      {logos.map((logo) => (
        <div key={logo._id} className="logo-item">
          <img src={logo.imageUrl} alt={`Logo ${logo._id}`} />
        </div>
      ))}
    </div>
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  );
};

export default LogoGrid;
