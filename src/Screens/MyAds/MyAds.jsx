import React, { useEffect, useState } from "react";
import "./myadss.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchUserAds } from "../../../RESTAPI/Profile/ProfileRoutes";
import Cookies from "js-cookie";
<<<<<<< HEAD
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
=======
import Loader from "../../components/Loader/loader"; // Assuming you have a loader component

import TimeAgo from "react-timeago";
import Countdown from "react-countdown";

const MyAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 1,
  });
  const userId = Cookies.get("userId");

  const getAds = async () => {
    setLoading(true); // Show loader when fetching data
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
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
<<<<<<< HEAD
        totalPages: result?.data?.totalPages, // Update total pages
      }));
    } else {
      setError(result.error); // Set error if fetching fails
    }
    setLoading(false); // Set loading to false after fetching
  };

  // Function to handle scroll and check if user reached 90% of the page
=======
        totalPages: result?.data?.totalPages,
      }));
    } else {
      setError(result.error);
    }
    setLoading(false); // Hide loader after data is fetched
  };

>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;
<<<<<<< HEAD
  
    // Check if the user has scrolled near the bottom and there are more pages to fetch
    if (
      scrollPosition >= bottomPosition * 0.9 &&
      pagination.page < pagination.totalPages &&
      !loading // Ensure no simultaneous fetch calls
=======

    if (
      scrollPosition >= bottomPosition * 0.9 &&
      pagination.page < pagination.totalPages &&
      !loading
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
    ) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
    }
  };
<<<<<<< HEAD
  
=======

>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  useEffect(() => {
    getAds();
  }, [pagination.page]);

<<<<<<< HEAD
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
=======
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
        <div className="myAds-header">
          <h2>My Ads</h2>
        </div>
  
        {error && <div className="error">{error}</div>}
  
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
        <div className="myAds-cards">
          {adsData.length > 0 ? (
            adsData.map((ad, index) => (
              <MyAdsCard
<<<<<<< HEAD
                key={index}
                imageSrc={ad.pictures[0]} // Assuming the first picture is the main image
                title={ad.carTitle}
                location={ad.location}
                timeAgo={"Time ago"} // Add a real timestamp or time logic if needed
=======
                carId={ad._id}
                key={index}
                imageSrc={ad.pictures[0]} 
                title={ad.carTitle}
                location={ad.location}
                timeAgo={<TimeAgo date={ad.listingDate} />} 
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                year={ad.model}
                mileage={ad.mileage}
                fuel={ad.fuel}
                engine={ad.engine}
                transmission={ad.transmission}
                highestBid={ad.highestBid || "N/A"}
                buyNowPrice={ad.buyNowPrice || "N/A"}
<<<<<<< HEAD
                timer={ad.bidMaturity} // Adjust if you have a real timer logic
=======
                timer={
                  <Countdown
                    date={new Date(ad.bidAcceptTill)}
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
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                fromHomePage={true}
              />
            ))
          ) : (
            <div>No ads available</div>
          )}
        </div>
<<<<<<< HEAD

        {/* Loader (used for detecting when to load more) */}
      </div>
=======
        {loading && <Loader />}
      </div>
       
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
      
      <Footer />
    </>
  );
<<<<<<< HEAD
=======
  
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
};

export default MyAds;
