import React, { useEffect, useState } from "react";
import "./watchlist.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchUserWatchlist } from "../../../RESTAPI/Profile/ProfileRoutes";
import Cookies from "js-cookie";
import Countdown from "react-countdown";
import TimeAgo from "react-timeago";
import Loader from "../../components/Loader/loader";

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
    if (loading) return;
    setLoading(true);
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
      setError(
        err.message || "An error occurred while fetching the watchlist."
      );
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

        {/* Error state */}
        {error && <div className="error">{error}</div>}

        {/* Cards Section */}
        <div className="myAds-cards">
          {adsData && adsData.length > 0 ? (
            adsData.map((ad, index) => (
              <MyAdsCard
                key={index}
                carId={ad._id}
                imageSrc={ad.pictures[0]}
                title={ad.carTitle}
                location={ad.location}
                timeAgo={<TimeAgo date={ad.listingDate} />}
                year={ad.model}
                mileage={ad.mileage}
                fuel={ad.fuel}
                engine={ad.engine}
                transmission={ad.transmission}
                highestBid={ad.highestBid || "N/A"}
                buyNowPrice={ad.buyNowPrice || "N/A"}
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
                fromHomePage={true}
              />
            ))
          ) : (
            <div>No ads available</div>
          )}
        </div>
        {loading && <Loader />}
      </div>
      <Footer />
    </>
  );
};

export default MyWatchlist;
