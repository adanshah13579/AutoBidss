import React, { useEffect, useState } from "react";
import "./watchlist.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchUserWatchlist } from "../../../RESTAPI/Profile/ProfileRoutes";
import Cookies from "js-cookie";
<<<<<<< HEAD
import { Spin } from "antd";

=======
import Countdown from "react-countdown";
import TimeAgo from "react-timeago";
import Loader from "../../components/Loader/loader";
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

const MyWatchlist = () => {
  const [adsData, setAdsData] = useState([]); // Ads list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5, // Fetch 5 ads per request
    totalPages: 1,
  });
<<<<<<< HEAD
const userId = Cookies.get("userId"); 
  // Function to load ads
  const getAds = async () => {
    if (loading) return; 
    setLoading(true); 
=======
  const userId = Cookies.get("userId");
  // Function to load ads
  const getAds = async () => {
    if (loading) return;
    setLoading(true);
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
    try {
      const result = await fetchUserWatchlist(
        userId,
        pagination.page,
        pagination.limit
      );

      if (result.success) {
<<<<<<< HEAD
       
=======
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
        const newAds = Array.isArray(result.data) ? result.data : [];
        setAdsData((prevAds) =>
          pagination.page === 1 ? newAds : [...prevAds, ...newAds]
        );
        setPagination((prevPagination) => ({
          ...prevPagination,
<<<<<<< HEAD
          totalPages: result.totalPages || 1, 
=======
          totalPages: result.totalPages || 1,
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
        }));
      } else {
        setError(result.error || "Failed to fetch watchlist.");
      }
    } catch (err) {
<<<<<<< HEAD
      setError(err.message || "An error occurred while fetching the watchlist.");
    } finally {
      setLoading(false); 
=======
      setError(
        err.message || "An error occurred while fetching the watchlist."
      );
    } finally {
      setLoading(false);
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
    }
  };

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;
<<<<<<< HEAD
  
    if (
      scrollPosition >= bottomPosition * 0.9 &&
      pagination.page < pagination.totalPages &&
      !loading 
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
  useEffect(() => {
    getAds();
  }, [pagination.page]);

<<<<<<< HEAD
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); 
=======
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
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

<<<<<<< HEAD
        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <Spin size="large" tip="Loading..." />
          </div>
        )}

=======
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
        {/* Error state */}
        {error && <div className="error">{error}</div>}

        {/* Cards Section */}
        <div className="myAds-cards">
<<<<<<< HEAD
        {adsData && adsData.length > 0 ? ( 
    adsData.map((ad, index) => (
              <MyAdsCard
                
=======
          {adsData && adsData.length > 0 ? (
            adsData.map((ad, index) => (
              <MyAdsCard
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                key={index}
                carId={ad._id}
                imageSrc={ad.pictures[0]}
                title={ad.carTitle}
                location={ad.location}
<<<<<<< HEAD
                timeAgo={"Time ago"} 
=======
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
                timer={ad.bidAcceptTill} 
=======
                timer={
                  <Countdown
                    date={new Date(ad.bidAcceptTill)}
                    renderer={({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                    }) => {
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

        
=======
        {loading && <Loader />}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
      </div>
      <Footer />
    </>
  );
};

export default MyWatchlist;
