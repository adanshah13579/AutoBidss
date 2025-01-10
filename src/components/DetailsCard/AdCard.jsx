import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  DashboardOutlined,
  BuildOutlined,
  HeartOutlined,
  HeartFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import "./AdCard.css";
import { baseuri } from "../../../BaseUri/baseuri"; 
import { Link } from "react-router-dom";

const AdCard = ({
  carId,
  imageSrc,
  year,
  mileage,
  fuel,
  engine,
  location,
  timeAgo,
  currentBid,
  listingDate,
  bidAcceptTill,
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [timeLeft, setTimeLeft] = useState(""); // Time left state
  const userId = Cookies.get("userId"); // Fetch user ID from cookies

  const calculateTimeLeft = () => {
    const now = new Date();
    const listingStart = new Date(listingDate);
    const bidEnd = new Date(bidAcceptTill);

    if (now < listingStart) {
      return "Listing not yet started";
    }

    const diff = bidEnd - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} left`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} left`;
      } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
      }
    } else {
      return "Closed";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [listingDate, bidAcceptTill]);

  const handleAddToWatchlist = async () => {
    try {
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
    }
  };

  return (
    <Card className="vehicle-card">
      <div className="vehDiv">
        {/* Toggle Heart Icon */}
        {isInWatchlist ? (
          <HeartFilled className="Hicon" onClick={handleAddToWatchlist} />
        ) : (
          <HeartOutlined className="Hicon" onClick={handleAddToWatchlist} />
        )}

        <img alt="vehicle" src={imageSrc} className="vehicle-image" />
      </div>
      <Link to={`/carDetails/${carId}`}>
        <div className="veh-card2">
          <div className="vehicle-details">
            <div className="detail-item">
              <CalendarOutlined className="detail-icon" /> {year}
            </div>
            <div className="detail-item">
              <DashboardOutlined className="detail-icon" /> {mileage} km
            </div>
            <div className="detail-item">
              <BuildOutlined className="detail-icon" /> {fuel}
            </div>
            <div className="detail-item">
              <BuildOutlined className="detail-icon" /> {engine} cc
            </div>
            <div className="detail-item">
              <EnvironmentOutlined className="detail-icon" /> {location}
            </div>
            <div className="detail-item">
              <ClockCircleOutlined className="detail-icon" /> {timeAgo}
            </div>
          </div>
          <div className="bid-info">
            <div className="bid-amount">Highest Bid: ${currentBid}k</div>
            <div className="bid-time">{timeLeft}</div>
          </div>
          <div>
            <button className="buyN">Buy Now</button>
            <button className="bidN">Bid Now</button>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default AdCard;
