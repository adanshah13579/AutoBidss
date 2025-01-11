import React, { useState } from "react";
import axios from "axios";
import { HeartOutlined, HeartFilled, MessageOutlined, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import "./MyAdsCard.css";
import { baseuri } from "../../../BaseUri/baseuri"; // Import base URI for API calls
import Cookies from "js-cookie"; // Assuming you are using cookies to store userId
import {useRemoveFromWatchlist} from "../../../RESTAPI/Profile/ProfileRoutes";

const MyAdsCard = ({
  carId,
  imageSrc,
  title,
  location,
  timeAgo,
  year,
  mileage,
  fuel,
  engine,
  transmission,
  highestBid,
  buyNowPrice,
  timer,
  fromHomePage = true,
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(true); 
  const [loading, setLoading] = useState(false); 
  
  const userId = Cookies.get("userId");  
  const cleanedUserId = userId ? userId.trim() : "";  

  const { handleRemoveFromWatchlist } = useRemoveFromWatchlist(carId, cleanedUserId, setIsInWatchlist, setLoading);

  const handleAddToWatchlist = async () => {
    try {
      setLoading(true); 
      const response = await axios.post(
        `${baseuri}/cars/addtowatchlist/${carId}/${userId}`
      );

      if (response.status === 404) {
        message.warning(`Car not found with ID: ${carId}`);
      }

      if (response.status === 201) {
        message.success("Car added to watchlist!");
        setIsInWatchlist(true); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.warning("Car is already in your watchlist.");
      } else {
        message.error("Failed to add to watchlist. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleRemove = async () => {
    try {
      await handleRemoveFromWatchlist();
      message.success("Car removed successfully!"); // Show success message
    } catch (error) {
      console.error(error);
      message.error("Failed to remove car from watchlist.");
    }
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      handleRemove();
    } else {
      handleAddToWatchlist();
    }
  };

  return (
    <div className="car-card">
      <div className="car-image-container">
        {isInWatchlist ? (
          <HeartFilled
            className="heart-icon"
            onClick={toggleWatchlist}
            disabled={loading}
          />
        ) : (
          <HeartOutlined
            className="heart-icon"
            onClick={toggleWatchlist}
            disabled={loading}
          />
        )}
        <img src={imageSrc} alt="Car" className="car-image" />
      </div>
      <div className="car-content">
        <div className="titleandchat">
          <h3>{title}</h3>
          <MessageOutlined className="chat-icon" />
        </div>
        <div className="car-header">
          <span className="car-location">
            <EnvironmentOutlined /> {location} • <ClockCircleOutlined /> {timeAgo}
          </span>
        </div>
        <div className="car-info">
          <span>{year}</span>
          <span>{mileage}</span>
          <span>{fuel}</span>
          <span>{engine}</span>
          <span>{transmission}</span>
        </div>
        <div id="titleandchat2" className="titleandchat">
          <div className="car-pricing">
            <p>
              <strong>Highest Bid:</strong> {highestBid}
            </p>
            <p>
              <strong>Buy Now:</strong> {buyNowPrice}
            </p>
          </div>
          <div>
            <span className="timer-text">{timer}</span>
          </div>
        </div>
        <div className={fromHomePage ? "car-actions2" : "car-actions"}>
          <button className="buy-button">Buy Now</button>
          <button className="bid-button">Bid Now</button>
        </div>
      </div>
    </div>
  );
};

export default MyAdsCard;
