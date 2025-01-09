import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./RecentAdds.css";
import Filter from "../../components/HomePageFilter/Filters";
import MyAdsCard from "../../components/MyAdsCard/MyAdsCard";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
const RecentAdds = () => {
  const [page, setpage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    year: { from: "", to: "" },
    mileage: { min: "", max: "" },
    city: [],
    make: [],
    registeredIn: [],
    transmission: [],
  });

  return (
    <div>
      <NavbarLoggedIn/>
      <div className="mainHome">
        <Filter setFilters={setFilters} filters={filters} />
        <div className="AdsDiv">
          <h3>Recent Ads</h3>
          <MyAdsCard></MyAdsCard>
          <MyAdsCard></MyAdsCard>
          <MyAdsCard></MyAdsCard>
          <MyAdsCard></MyAdsCard>
          <MyAdsCard></MyAdsCard>
        </div>
      </div>
      <div className="paginationHomepageLoggedIn">
        <Button
          onClick={() => setpage(1)}
          className={page == 1 ? "buttonActive" : ""}
        >
          1
        </Button>
        <Button
          onClick={() => setpage(2)}
          className={page == 2 ? "buttonActive" : ""}
        >
          2
        </Button>
        <Button
          onClick={() => setpage(3)}
          className={page == 3 ? "buttonActive" : ""}
        >
          3
        </Button>

        <Button
          onClick={() => setpage(4)}
          className={page == 4 ? "buttonActive" : ""}
        >
          {">"}
        </Button>
      </div>
      <Footer/>
    </div>
  );
};
export default RecentAdds;
