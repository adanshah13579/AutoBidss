import React, { useEffect, useState } from "react";
import "./earlist.css";
import { ArrowDownOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer/Footer";
import {  fetchearliestcar } from "../../../RESTAPI/homepage/homepage";
import AdCard from "../../components/DetailsCard/AdCard";


const EarliestCars = () => {
  const [adsData, setAdsData] = useState([]);  // State to store fetched ads data
  

  // Fetch the cards when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchearliestcar();
      console.log("eeresult", result);  // Check the full response
      console.log("eecars", result.data.cars);  // Check the 'cars' array

      if (result.success) {
        setAdsData(result.data.cars);  // Set 'cars' array to state
      } else {
        console.error(result.error);
      }
    };
    fetchData();
  }, []); // Empty array ensures this effect runs only once on component mount


  return (
    <>
     

    

      <div className="topLevel">
       
        

        <div className="headings">
          <h2 className="cats">Earliest Auction</h2>
          <a className="viewMore">
            View More <ArrowDownOutlined style={{ marginTop: 3 }} />
          </a>
        </div>
        <div className="AdsSection">
          {/* Render each ad using map only if adsData is an array */}
          {Array.isArray(adsData) && adsData.map((ad) => (
        
           <AdCard
           carId={ad._id}  
              imageSrc={ad.pictures}
              year={ad.year}
              mileage={ad.mileage}
              fuel={ad.fuel}
              engine={ad.engine}
              location={ad.location}
              timeAgo={ad.timeAgo}
              title={ad.title}
              currentBid={ad.highestCurrentBid}
              bidAcceptTill={ad.timeLeft}
              
            />
          ))}
        </div>
        
      </div>
    </>
  );
};

export default EarliestCars;