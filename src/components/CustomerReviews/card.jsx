import React from "react";
import "./card.css";
import starFilled from "../../assets/svgs/starFilled.svg";
import starEmpty from "../../assets/svgs/starEmpty.svg";

const Cards = ({ picture, text, name, desgination, stars }) => {
  return (
    <div className="cards-container">
      {/* Stars Area */}
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < stars ? starFilled : starEmpty}
            alt={i < stars ? "Filled Star" : "Empty Star"}
            className="star-icon"
          />
        ))}
      </div>

      {/* Text Area */}
      <div className="text">
        <p>{text}</p>
      </div>

      {/* Profile Area */}
      <div className="profileArea">
        <img src={picture} alt={name} className="profile-picture" />
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "left",
          }}
        >
          <h4>{name}</h4>
          <p>{desgination}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
