import React, { useEffect, useState } from "react";
import "./similarcars.css";
import { ArrowDownOutlined } from "@ant-design/icons";
import AdCard from "../../components/DetailsCard/AdCard";
import { fetchSimilarCars } from "../../../RESTAPI/homepage/homepage";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
=======
import TimeAgo from "react-timeago";
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

const SimilarCars = () => {
  const [adsData, setAdsData] = useState([]); // State to store fetched similar cars data
  const [error, setError] = useState(""); // State to handle and display errors (optional)
  const {carId} = useParams();

  
  
  useEffect(() => {
    const fetchData = async () => {
      if (!carId) {
        setError("Car ID is required to fetch similar cars.");
        return;
      }

      const result = await fetchSimilarCars(carId); 
      console.log("Similar cars result:", result); 

      if (result.success) {
        setAdsData(result.data.similarCars); 
      } else {
        setError(result.error); 
        console.error(result.error);
      }
    };

    fetchData();
  }, [carId]); 

  return (
    <>
      <div className="topLevel">
        <div className="headings">
          <h2 className="cats">Similar Cars</h2>
          <a className="viewMore">
            View More <ArrowDownOutlined style={{ marginTop: 3 }} />
          </a>
        </div>
        <div className="AdsSection">
          {/* Display error message if any */}
          {error && <p className="error">{error}</p>}

          {/* Render each ad using map only if adsData is an array */}
          {Array.isArray(adsData) && adsData.length > 0 ? (
            adsData.map((ad) => (
              <AdCard
                key={ad._id}
                carId={ad._id}
                imageSrc={ad.pictures}
<<<<<<< HEAD
                year={ad.year}
=======
                year={ad.make}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                mileage={ad.mileage}
                fuel={ad.fuel}
                engine={ad.engine}
                location={ad.location}
<<<<<<< HEAD
                timeAgo={ad.timeAgo}
=======
                 timeAgo={<TimeAgo date={ad.listingDate} />}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                title={ad.title}
                currentBid={ad.highestCurrentBid}
                bidAcceptTill={ad.timeLeft}
              />
            ))
          ) : (
            <p>No similar cars available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SimilarCars;
