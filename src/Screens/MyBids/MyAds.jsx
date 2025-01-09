import React, { useEffect, useState } from "react";
import { Tabs, Spin, Alert } from "antd"; // Removed Pagination since it's no longer needed
import "./MyAds.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { baseuri } from "../../../BaseUri/baseuri";
import axios from "axios";

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
    if (key === "Active") {
      setPendingCars([]);
    } else if (key === "Won") {
      setWonCars([]);
    }
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
  return (
    <>
      <NavbarLoggedIn />
      <div className="myAdsScreen">
        {/* Header */}
        <div className="myAds-header">
          <h2>My Bids</h2>
        </div>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="Active"
          onChange={handleTabChange}
          className="myAds-tabs"
          centered
        >
          <Tabs.TabPane tab="Active" key="Active" />
          <Tabs.TabPane tab="Won" key="Won" />
        </Tabs>

        {/* Loader */}
        {loading && <Spin size="large" style={{ display: "block", margin: "20px auto" }} />}

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
            )}
          </div>
        )}

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
      </div>
      <Footer />
    </>
  );
};

export default MyBids;
