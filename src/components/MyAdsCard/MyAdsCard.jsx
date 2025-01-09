import React, { useState } from "react";
import axios from "axios";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { baseuri } from "../../../BaseUri/baseuri";
import Cookies from "js-cookie";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./MyAdsCard.css";

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

  const userId = Cookies.get("userId");
  const cleanedUserId = userId?.trim();

  const handleRemoveFromWatchlist = async () => {
    if (!userId) {
      message.warning(
        "You need to log in to remove items from your watchlist."
      );
      return;
    }

    try {
      const response = await axios.delete(
        `${baseuri}/cars/removefromwatchlist/${carId}/${cleanedUserId}`
      );
      if (response.status === 200) {
        message.success("Car removed from watchlist!");
        setIsInWatchlist(false);
      }
    } catch (error) {
      message.error("Failed to remove from watchlist. Please try again.");
    } finally {
    }
  };

  return (
    <div>
      
        <div className="car-card">
          <div className="car-image-container">
            {isInWatchlist ? (
              <HeartFilled
                className="heart-icon"
                onClick={handleRemoveFromWatchlist}
              />
            ) : (
              <HeartOutlined
                className="heart-icon"
                onClick={handleRemoveFromWatchlist}
              />
            )}
            <img src={imageSrc} alt="Car" className="car-image" />
          </div>
          <Link to={`/carDetails/${carId}`}>
          <div className="car-content">
            <div className="titleandchat">
              <h3>{title}</h3>
              <MessageOutlined className="chat-icon" />
            </div>
            <div className="car-header">
              <span className="car-location">
                <EnvironmentOutlined /> {location} • <ClockCircleOutlined />{" "}
                {timeAgo}
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
          </Link>
        </div>
     
    </div>
  );
};

export default MyAdsCard;
