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
<<<<<<< HEAD
import { baseuri } from "../../../BaseUri/baseuri"; // Import your base URI
import { Link } from "react-router-dom";
import {useRemoveFromWatchlist} from "../../../RESTAPI/Profile/ProfileRoutes"; // Import the custom hook for removing from watchlist
=======
import { baseuri } from "../../../BaseUri/baseuri"; 
import { Link } from "react-router-dom";
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

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
<<<<<<< HEAD
  listingdate,
  bidAcceptTill,
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false); // State for watchlist status
  const [loading, setLoading] = useState(false); // Loading state
  const [timeLeft, setTimeLeft] = useState(""); // Time left state
  const userId = Cookies.get("userId"); // Fetch user ID from cookies
  const cleanedUserId = userId ? userId.trim() : ""; // Cleaned user ID

  // Function to calculate time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(bidAcceptTill);
    const diff = end - now;
=======
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
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
<<<<<<< HEAD
      return `${days}d ${hours}h ${minutes}m left`;
=======

      if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} left`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} left`;
      } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
      }
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
    } else {
      return "Closed";
    }
  };

<<<<<<< HEAD
  // Update time left periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [bidAcceptTill]);

  // Handle Add to Watchlist
  const handleAddToWatchlist = async () => {
    try {
      setLoading(true); // Start loading
=======
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [listingDate, bidAcceptTill]);

  const handleAddToWatchlist = async () => {
    try {
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
      const response = await axios.post(
        `${baseuri}/cars/addtowatchlist/${carId}/${userId}`
      );

      if (response.status === 404) {
        message.warning(`Car not found with ID: ${carId}`);
      }

      if (response.status === 201) {
        message.success("Car added to watchlist!");
<<<<<<< HEAD
        setIsInWatchlist(true); // Mark as added
=======
        setIsInWatchlist(true);
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.warning("Car is already in your watchlist.");
      } else {
        message.error("Failed to add to watchlist. Please try again.");
      }
    } finally {
<<<<<<< HEAD
      setLoading(false); // Stop loading
    }
  };

  // Handle Remove from Watchlist
  const { handleRemoveFromWatchlist } = useRemoveFromWatchlist(carId, cleanedUserId, setIsInWatchlist, setLoading);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchlist();
    } else {
      handleAddToWatchlist();
=======
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
    }
  };

  return (
    <Card className="vehicle-card">
      <div className="vehDiv">
<<<<<<< HEAD
        {isInWatchlist ? (
          <HeartFilled
            className="Hicon"
            onClick={toggleWatchlist} // Trigger function on click
          />
        ) : (
          <HeartOutlined
            className="Hicon"
            onClick={toggleWatchlist} // Trigger function on click
          />
        )}
        <Link to={`/carDetails/${carId}`}>
          <img alt="vehicle" src={imageSrc} className="vehicle-image" />
        </Link>
=======
        {/* Toggle Heart Icon */}
        {isInWatchlist ? (
          <HeartFilled className="Hicon" onClick={handleAddToWatchlist} />
        ) : (
          <HeartOutlined className="Hicon" onClick={handleAddToWatchlist} />
        )}

        <img alt="vehicle" src={imageSrc} className="vehicle-image" />
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
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
