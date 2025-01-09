import React, { useEffect, useState } from "react";
import "./watchlist.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchUserWatchlist } from "../../../RESTAPI/Profile/ProfileRoutes";
import Cookies from "js-cookie";
import { Spin } from "antd";


const MyWatchlist = () => {
  const [adsData, setAdsData] = useState([]); // Ads list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5, // Fetch 5 ads per request
    totalPages: 1,
  });
const userId = Cookies.get("userId"); 
  // Function to load ads
  const getAds = async () => {
    if (loading) return; // Prevent duplicate calls
    setLoading(true); // Set loading to true while fetching
    try {
      const result = await fetchUserWatchlist(
        userId,
        pagination.page,
        pagination.limit
      );

      if (result.success) {
       
        const newAds = Array.isArray(result.data) ? result.data : [];
        setAdsData((prevAds) =>
          pagination.page === 1 ? newAds : [...prevAds, ...newAds]
        );
        setPagination((prevPagination) => ({
          ...prevPagination,
          totalPages: result.totalPages || 1, 
        }));
      } else {
        setError(result.error || "Failed to fetch watchlist.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching the watchlist.");
    } finally {
      setLoading(false); 
    }
  };

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;
  
    if (
      scrollPosition >= bottomPosition * 0.9 &&
      pagination.page < pagination.totalPages &&
      !loading 
    ) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
    }
  };
  useEffect(() => {
    getAds();
  }, [pagination.page]);

  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, [loading, pagination.page]);

  return (
    <>
      <NavbarLoggedIn />
      <div className="myAdsScreen">
        {/* Header */}
        <div className="myAds-header">
          <h2>My Watchlist</h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <Spin size="large" tip="Loading..." />
          </div>
        )}

        {/* Error state */}
        {error && <div className="error">{error}</div>}

        {/* Cards Section */}
        <div className="myAds-cards">
        {adsData && adsData.length > 0 ? ( // Ensure adsData is defined and has items
    adsData.map((ad, index) => (
              <MyAdsCard
                
                key={index}
                carId={ad._id}
                imageSrc={ad.pictures[0]} // Assuming the first picture is the main image
                title={ad.carTitle}
                location={ad.location}
                timeAgo={"Time ago"} // Add a real timestamp or time logic if needed
                year={ad.model}
                mileage={ad.mileage}
                fuel={ad.fuel}
                engine={ad.engine}
                transmission={ad.transmission}
                highestBid={ad.highestBid || "N/A"}
                buyNowPrice={ad.buyNowPrice || "N/A"}
                timer={ad.bidAcceptTill} // Updated timer logic
                fromHomePage={true}
              />
            ))
          ) : (
            <div>No ads available</div>
          )}
        </div>

        {/* Loader (used for detecting when to load more) */}
      </div>
      <Footer />
    </>
  );
};

export default MyWatchlist;
