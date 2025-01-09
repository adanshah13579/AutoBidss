import React, { useEffect, useState } from "react";
import "./myadss.css";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchUserAds } from "../../../RESTAPI/Profile/ProfileRoutes";
import Cookies from "js-cookie";

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
        totalPages: result?.data?.totalPages,
      }));
    } else {
      setError(result.error);
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
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener on unmount
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

        <div className="myAds-cards">
          {adsData.length > 0 ? (
            adsData.map((ad, index) => (
              <MyAdsCard
                key={index}
                imageSrc={ad.pictures[0]} // Assuming the first picture is the main image
                title={ad.carTitle}
                location={ad.location}
                timeAgo={<TimeAgo date={ad.listingDate} />} // Time ago for listing date
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
                    daysInHours={true}
                    renderer={({ hours, minutes, seconds, completed }) => {
                      if (completed) {
                        return <span>Expired</span>;
                      }
                      return (
                        <span>
                          {hours}h {minutes}m {seconds}s
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
      </div>

      <Footer />
    </>
  );
};

export default MyAds;
