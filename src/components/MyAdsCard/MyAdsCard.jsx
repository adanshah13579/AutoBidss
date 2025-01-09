import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeartOutlined, HeartFilled, MessageOutlined, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import { baseuri } from "../../../BaseUri/baseuri"; 
import Cookies from "js-cookie"; 
import "./MyAdsCard.css";
import Loader from "../Loader/loader";

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
  const [loading, setLoading] = useState(false); // For individual actions
  const [isPageLoading, setIsPageLoading] = useState(true); // For the entire page

  const userId = Cookies.get("userId");
  const cleanedUserId = userId?.trim();

  const handleRemoveFromWatchlist = async () => {
    if (!userId) {
      message.warning("You need to log in to remove items from your watchlist.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(`${baseuri}/cars/removefromwatchlist/${carId}/${cleanedUserId}`);
      if (response.status === 200) {
        message.success("Car removed from watchlist!");
        setIsInWatchlist(false);
      }
    } catch (error) {
      message.error("Failed to remove from watchlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsPageLoading(false);
      }, 2000); // Simulated delay
    };
    fetchData();
  }, []);

  return (
    <div className="car-card">
      {isPageLoading ? (
        <Loader /> // Reusable Loader component
      ) : (
        <>
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
                onClick={handleRemoveFromWatchlist}
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
        </>
      )}
    </div>
  );
};

export default MyAdsCard;
