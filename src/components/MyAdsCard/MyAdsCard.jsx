import React, { useState } from "react";
import axios from "axios";
import { HeartOutlined, HeartFilled, MessageOutlined, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import "./MyAdsCard.css";
import { baseuri } from "../../../BaseUri/baseuri"; // Import base URI for API calls
import Cookies from "js-cookie"; // Assuming you are using cookies to store userId

const MyAdsCard = ({
  carId="",
  imageSrc = "https://img.lovepik.com/photo/48007/1949.jpg_wh860.jpg",
  title = "Car for sale, clean and restored",
  location = "Denver, CO",
  timeAgo = "48 mins ago",
  year = "1967",
  mileage = "200,000 km",
  fuel = "Diesel",
  engine = "34000 cc",
  transmission = "Manual",
  highestBid = "$25,000",
  buyNowPrice = "$30,000",
  timer = "10h:20m:11s",
  fromHomePage = true,
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(true); // Initial state of the car being in the watchlist (can be dynamically set)
  const [loading, setLoading] = useState(false); // Loading state for requests
  
  const userId = Cookies.get("userId");  // Getting userId from cookies
  const cleanedUserId = userId.trim();  // Remove any extra spaces or newlines


  const handleRemoveFromWatchlist = async () => {
    if (!userId) {
      message.warning("You need to log in to remove items from your watchlist.");
      return;
    }
  
    setLoading(true); // Start loading
    try {
      const response = await axios.delete(`${baseuri}/cars/removefromwatchlist/${carId}/${cleanedUserId}`);

      if (response.status === 200) {
        message.success("Car removed from watchlist!");
        setIsInWatchlist(false); // Mark as removed
      }
    } catch (error) {
      message.error("Failed to remove from watchlist. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="car-card">
      <div className="car-image-container">
      
        {isInWatchlist ? (
          <HeartFilled
            className="heart-icon"
            onClick={handleRemoveFromWatchlist} 
            disabled={loading}
          />
        ) : (
          <HeartOutlined
            className="heart-icon"
            onClick={handleRemoveFromWatchlist} // Trigger remove from watchlist
            disabled={loading} // Disable the heart icon while loading
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
