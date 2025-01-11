import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./RecentAdds.css";
import Filter from "../../components/HomePageFilter/Filters";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchallcars, filteredCars, logoCar } from "../../../RESTAPI/homepage/homepage";
import { useParams } from "react-router-dom";

const RecentAdds = () => {
  const [page, setPage] = useState(1);
  const [logosearchdata, setLogosearchdata] = useState(null);
  const [cars, setCars] = useState([]);
  const [filteredCar, setFilterCar] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    year: { from: "", to: "" },
    mileage: { min: "", max: "" },
    city: [],
    make: [],
    registeredIn: [],
    transmission: [],
  });

  const { makes } = useParams();
  const itemsPerPage = 10; // Number of cars per page

  useEffect(() => {
    const getCarsData = async () => {
      const result = await fetchallcars();
      if (result.success) {
        setCars(result.data.cars);
      } else {
        console.error("Error fetching cars:", result.error);
        setCars([]);
      }
    };

    const getLogoSearchData = async () => {
      if (makes && makes.trim() !== "") {
        const logoresult = await logoCar(makes);
        if (logoresult && logoresult.data) {
          setLogosearchdata(logoresult.data);
        }
      }
    };

    const getFilteredCars = async () => {
      const filterResult = await filteredCars(filters, page);
      if (filterResult && filterResult.data) {
        setFilterCar(filterResult.data);
      } else {
        console.error("Error fetching filtered cars:", filterResult.error);
        setFilterCar([]);
      }
    };

    const isFilterApplied =
      filters.priceRange.min ||
      filters.priceRange.max ||
      filters.year.from ||
      filters.year.to ||
      filters.mileage.min ||
      filters.mileage.max ||
      filters.city.length ||
      filters.make.length ||
      filters.registeredIn.length ||
      filters.transmission.length;

    if (isFilterApplied) {
      getFilteredCars();
    } else {
      getCarsData();
    }
    getLogoSearchData();
  }, [filters, page, makes]);

  // Handle the reset of filters
  const handleResetFilters = () => {
    setFilters({
      priceRange: { min: "", max: "" },
      year: { from: "", to: "" },
      mileage: { min: "", max: "" },
      city: [],
      make: [],
      registeredIn: [],
      transmission: [],
    });
  };

  // Clear filtered cars state
  const clearFilteredCars = () => {
    setFilterCar([]);
  };

  const getPageData = () => {
    const data = filteredCar && filteredCar.length > 0 ? filteredCar : cars;
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    const data = filteredCar && filteredCar.length > 0 ? filteredCar : cars;
    return Math.ceil(data.length / itemsPerPage);
  };

  return (
    <div>
      <NavbarLoggedIn />
      <div className="mainHome">
        <Filter setFilters={setFilters} filters={filters} clearFilteredCars={clearFilteredCars} />
        <div className="AdsDiv">
          <h3>Recent Ads</h3>

          {logosearchdata && logosearchdata.pictures && logosearchdata.pictures.length > 0 ? (
            <MyAdsCard
              key={logosearchdata._id}
              carId={logosearchdata._id}
              imageSrc={logosearchdata.pictures[0]}
              title={logosearchdata.carTitle}
              location={logosearchdata.location}
              timeAgo={
                logosearchdata.listingDate
                  ? new Date(logosearchdata.listingDate).toLocaleString()
                  : "Recently listed"
              }
              year={logosearchdata.year}
              mileage={logosearchdata.mileage}
              fuel={logosearchdata.fuel}
              engine={logosearchdata.engine}
              transmission={logosearchdata.transmission}
              highestBid={
                logosearchdata.highestCurrentBid
                  ? `$${logosearchdata.highestCurrentBid}`
                  : "No bids yet"
              }
              buyNowPrice={logosearchdata.price}
              timer={
                logosearchdata.bidAcceptTill
                  ? new Date(logosearchdata.bidAcceptTill).toLocaleString()
                  : "No deadline"
              }
            />
          ) : (
            getPageData().map((car) => (
              <MyAdsCard
                key={car._id}
                carId={car._id}
                imageSrc={car.pictures && car.pictures.length > 0 ? car.pictures[0] : "default_image_url"}
                title={car.carTitle}
                location={car.location}
                timeAgo={
                  car.listingDate
                    ? new Date(car.listingDate).toLocaleString()
                    : "Recently listed"
                }
                year={car.model}
                mileage={car.mileage}
                fuel={car.fuel}
                engine={car.engine}
                transmission={car.transmission}
                highestBid={
                  car.highestCurrentBid
                    ? `$${car.highestCurrentBid}`
                    : "No bids yet"
                }
                buyNowPrice={car.price}
                timer={
                  car.bidAcceptTill
                    ? new Date(car.bidAcceptTill).toLocaleString()
                    : "No deadline"
                }
              />
            ))
          )}
        </div>
      </div>
      <div className="paginationHomepageLoggedIn">
        {Array.from({ length: getTotalPages() }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? "buttonActive" : ""}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default RecentAdds;
