import React, { useEffect, useState } from "react";
import "./myadss.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchUserAds } from "../../../RESTAPI/Profile/ProfileRoutes";
import Cookies from "js-cookie";
import { Spin } from "antd";
import Filter from "../../components/HomePageFilter/Filters";
const MyAds = () => {
  const [adsData, setAdsData] = useState([]); // Ads list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5, // Fetch 5 ads per request
    totalPages: 1,
  });
  const userId = Cookies.get("userId"); // User ID (hardcoded)

  // Function to load ads
  const getAds = async () => {
    setLoading(true); // Set loading to true while fetching
    const result = await fetchUserAds(
      userId,
      pagination.page,
      pagination.limit
    );

    if (result.success) {
      if (pagination?.page === 1) {
        setAdsData(result.data.cars);
      } else {
        setAdsData((prevAds) => [...prevAds, ...result.data.cars]);
      }
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: result?.data?.totalPages, // Update total pages
      }));
    } else {
      setError(result.error); // Set error if fetching fails
    }
    setLoading(false); // Set loading to false after fetching
  };

  // Function to handle scroll and check if user reached 90% of the page
  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;
  
    // Check if the user has scrolled near the bottom and there are more pages to fetch
    if (
      scrollPosition >= bottomPosition * 0.9 &&
      pagination.page < pagination.totalPages &&
      !loading // Ensure no simultaneous fetch calls
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

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener on unmount
    };
  }, [loading, pagination.page]);

  return (
    <>
      <NavbarLoggedIn />
     
      <div className="myAdsScreen">
     
        {/* Header */}
        <div className="myAds-header">
          <h2>My Ads</h2>
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
          {adsData.length > 0 ? (
            adsData.map((ad, index) => (
              <MyAdsCard
                key={index}
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
                timer={ad.bidMaturity} // Adjust if you have a real timer logic
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

export default MyAds;
