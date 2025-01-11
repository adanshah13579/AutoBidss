import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Tabs, Spin, Alert } from "antd";
=======
import { Tabs, Spin, Alert } from "antd"; // Removed Pagination since it's no longer needed
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
import "./MyAds.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { baseuri } from "../../../BaseUri/baseuri";
import axios from "axios";
<<<<<<< HEAD
import Cookies from "js-cookie";
import Countdown from 'react-countdown';
import TimeAgo from 'react-timeago';

const MyBids = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [pendingCars, setPendingCars] = useState([]);
  const [wonCars, setWonCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const userId = Cookies.get("userId");
  console.log("cookie userid", userId);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
    setHasMore(true);

    
=======

const MyBids = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("Active");
  const [pendingCars, setPendingCars] = useState([]); // Data for "Pending" cars
  const [wonCars, setWonCars] = useState([]); // Data for "Won" cars
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [hasMore, setHasMore] = useState(true); // Flag to check if there is more data to load
  
  const userId = "67136ee1fbb477e663dd867a";

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1); // Reset page number when tab changes
    setHasMore(true); // Reset 'hasMore' flag
    // Clear the cars data when switching tabs
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
    if (key === "Active") {
      setPendingCars([]);
    } else if (key === "Won") {
      setWonCars([]);
    }
<<<<<<< HEAD

    fetchData(key, 1);
  };

  // const fetchData = useFetchData(userId, baseuri, setPendingCars, setWonCars, setLoading, setError, setHasMore, setCurrentPage);
  const fetchData = async (tab, page = 1, limit = 10) => {
    if (loading || !hasMore || !userId) return;

    setLoading(true);
    setError("");

    try {
      const url =
        tab === "Active"
          ? `${baseuri}/cars/pending/${userId}?page=${page}&limit=${limit}`
          : `${baseuri}/cars/won/${userId}?page=${page}&limit=${limit}`;

      const response = await axios.get(url);

      if (tab === "Active") {
        setPendingCars((prevCars) => (page === 1 ? response.data.cars : [...prevCars, ...response.data.cars]));
      } else {
        setWonCars((prevCars) => (page === 1 ? response.data.cars : [...prevCars, ...response.data.cars]));
      }

      setCurrentPage(page);
      if (response.data.cars.length < limit) setHasMore(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  let debounceTimer;
  const handleScroll = () => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 100 && !loading && hasMore) {
        fetchData(activeTab, currentPage + 1);
      }
    }, 200);
  };

  useEffect(() => {
    if (userId) {
      fetchData(activeTab, 1);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userId, activeTab]);

=======
    fetchData(key, 1); // Fetch data for new tab
  };

  // Fetch data function
  const fetchData = async (tab, page = 1, limit = 10) => {
    if (loading || !hasMore) return; // Prevent multiple requests while loading

    setLoading(true); // Start loader
    setError(""); // Clear previous errors

    let url = "";

    try {
      if (tab === "Active") {
        url = `${baseuri}/cars/pending/${userId}?page=${page}&limit=${limit}`;
      } else if (tab === "Won") {
        url = `${baseuri}/cars/won/${userId}?page=${page}&limit=${limit}`;
      }

      // API Call with Axios
      const response = await axios.get(url);

      if (tab === "Active") {
        setPendingCars((prevCars) => [...prevCars, ...response.data.cars]); // Append new data for Active cars
      } else if (tab === "Won") {
        setWonCars((prevCars) => [...prevCars, ...response.data.cars]); // Append new data for Won cars
      }

      setCurrentPage(page); // Update current page state

      // Check if there is more data to load
      if (response.data.cars.length < limit) {
        setHasMore(false); // No more data available
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to load data."); // Set error message
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Scroll Handler for infinite scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight; // How far the user has scrolled
    const documentHeight = document.documentElement.scrollHeight; // Total height of the document

    if (scrollPosition / documentHeight >= 0.8 && !loading && hasMore) {
      // Trigger data load when the user scrolls to 80% of the page
      fetchData(activeTab, currentPage + 1);
    }
  };

  useEffect(() => {
    fetchData(activeTab, currentPage); // Initial data fetch
    window.addEventListener("scroll", handleScroll); // Listen for scroll event

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up event listener
    };
  }, [activeTab, currentPage]); // Re-fetch data if tab or page changes

  // Render component
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  return (
    <>
      <NavbarLoggedIn />
      <div className="myAdsScreen">
<<<<<<< HEAD
=======
        {/* Header */}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
        <div className="myAds-header">
          <h2>My Bids</h2>
        </div>

<<<<<<< HEAD
        <Tabs defaultActiveKey="Active" onChange={handleTabChange} className="myAds-tabs" centered>
=======
        {/* Tabs */}
        <Tabs
          defaultActiveKey="Active"
          onChange={handleTabChange}
          className="myAds-tabs"
          centered
        >
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
          <Tabs.TabPane tab="Active" key="Active" />
          <Tabs.TabPane tab="Won" key="Won" />
        </Tabs>

<<<<<<< HEAD
        {loading && <Spin size="large" style={{ display: "block", margin: "20px auto" }} />}
        

        {activeTab === "Active" && (
          <div className="myAds-cards">
            {pendingCars.length > 0 ? (
              pendingCars.map((car) => (
                <MyAdsCard
                  key={car._id}
                  carId={car._id}
                  imageSrc={car.pictures[0]}
                  title={car.carTitle}
                  location={car.location}
                  timeAgo={<TimeAgo date={car.listingDate} />}
                  year={car.model}
                  mileage={car.mileage}
                  fuel={car.fuel}
                  engine={car.engine}
                  transmission={car.transmission}
                  highestBid={car.highestBid || "N/A"}
                  buyNowPrice={car.buyNowPrice || "N/A"}
                  timer={
                    <Countdown
                      date={new Date(car.bidAcceptTill)}
                      renderer={({ days, hours, minutes, seconds, completed }) => {
                        if (completed) {
                          return <span>Expired</span>;
                        }
                
                        if (days > 30) {
                          const months = Math.floor(days / 30);
                          return (
                            <span>
                              {months} month{months > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (days > 7) {
                          const weeks = Math.floor(days / 7);
                          return (
                            <span>
                              {weeks} week{weeks > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (days > 0) {
                          return (
                            <span>
                              {days} day{days > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (hours > 0) {
                          return (
                            <span>
                              {hours} hour{hours > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (minutes > 0) {
                          return (
                            <span>
                              {minutes} minute{minutes > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        return (
                          <span>
                            {seconds} second{seconds > 1 ? "s" : ""} left
                          </span>
                        );
                      }}
                    />
                  }
                  fromHomePage={true}
                />
              ))
            ) : (
              <p>No active bids found.</p>
=======
        

        {/* Error Message */}
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "20px" }} />}

        {/* Cards Section for Active Tab */}
        {activeTab === "Active" && (
          <div className="myAds-cards">
            {!loading && !error && pendingCars.length > 0 ? (
              pendingCars.map((car) => (
                <MyAdsCard
                  key={car._id || '23'}
                  name={car.name || "No Name"} // Assuming car object has a 'name' field
                  highestBid={car.highestCurrentBid || 0} // Fallback value if data is missing
                  totalBids={car.totalBidsCount || 0} // Fallback value
                  listedBy={car.listedByDetails?.name || "Unknown"} // Safe access
                />
              ))
            ) : (
              !loading && !error && <p>No active bids found.</p>
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
            )}
          </div>
        )}

<<<<<<< HEAD
        {activeTab === "Won" && (
          <div className="myAds-cards">
            {wonCars.length > 0 ? (
              wonCars.map((car) => (
                <MyAdsCard 
                  key={car._id}
                  carId={car._id}
                  imageSrc={car.pictures[0]}
                  title={car.carTitle}
                  location={car.location}
                  timeAgo={<TimeAgo date={car.listingDate} />}
                  year={car.model}
                  mileage={car.mileage}
                  fuel={car.fuel}
                  engine={car.engine}
                  transmission={car.transmission}
                  highestBid={car.highestBid || "N/A"}
                    buyNowPrice={car.buyNowPrice || "N/A"}
                  timer={
                    <Countdown
                      date={new Date(car.bidAcceptTill)}
                      renderer={({ days, hours, minutes, seconds, completed }) => {
                        if (completed) {
                          return <span>Expired</span>;
                        }
                
                        if (days > 30) {
                          const months = Math.floor(days / 30);
                          return (
                            <span>
                              {months} month{months > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (days > 7) {
                          const weeks = Math.floor(days / 7);
                          return (
                            <span>
                              {weeks} week{weeks > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (days > 0) {
                          return (
                            <span>
                              {days} day{days > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (hours > 0) {
                          return (
                            <span>
                              {hours} hour{hours > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        if (minutes > 0) {
                          return (
                            <span>
                              {minutes} minute{minutes > 1 ? "s" : ""} left
                            </span>
                          );
                        }
                
                        return (
                          <span>
                            {seconds} second{seconds > 1 ? "s" : ""} left
                          </span>
                        );
                      }}
                    />
                  }
                  fromHomePage={true}
                />
              ))
            ) : (
              <p>No won bids found.</p>
            )}
          </div>
        )}
=======
        {/* Cards Section for Won Tab */}
        {activeTab === "Won" && (
          <div className="myAds-cards">
            {!loading && !error && wonCars.length > 0 ? (
              wonCars.map((car) => (
                <MyAdsCard
                  key={car._id || '23'}
                  name={car.name || "No Name"} // Assuming car object has a 'name' field
                  highestBid={car.highestCurrentBid || 0} // Fallback value if data is missing
                  totalBids={car.totalBidsCount || 0} // Fallback value
                  listedBy={car.listedByDetails?.name || "Unknown"} // Safe access
                />
              ))
            ) : (
              !loading && !error && <p>No won bids found.</p>
            )}
          </div>
        )}

        {/* Optional: Message when no more data */}
        {!hasMore && !loading && <p style={{ textAlign: "center", color: "gray" }}>No more items to load.</p>}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
      </div>
      <Footer />
    </>
  );
};

export default MyBids;
