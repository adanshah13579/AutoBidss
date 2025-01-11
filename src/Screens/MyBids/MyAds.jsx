import React, { useEffect, useState } from "react";
import { Tabs, Spin, Alert } from "antd";
import "./MyAds.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { baseuri } from "../../../BaseUri/baseuri";
import axios from "axios";
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

    
    if (key === "Active") {
      setPendingCars([]);
    } else if (key === "Won") {
      setWonCars([]);
    }

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

  return (
    <>
      <NavbarLoggedIn />
      <div className="myAdsScreen">
        <div className="myAds-header">
          <h2>My Bids</h2>
        </div>

        <Tabs defaultActiveKey="Active" onChange={handleTabChange} className="myAds-tabs" centered>
          <Tabs.TabPane tab="Active" key="Active" />
          <Tabs.TabPane tab="Won" key="Won" />
        </Tabs>

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
            )}
          </div>
        )}

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
      </div>
      <Footer />
    </>
  );
};

export default MyBids;
