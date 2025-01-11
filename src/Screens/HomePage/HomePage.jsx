import React, { useEffect, useState } from "react";
import "./HomePage.css";
import LogoGrid from "../../components/LogoGrid/LogoGrid";
import { ArrowDownOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer/Footer";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import { fetchallcars, locationCar } from "../../../RESTAPI/homepage/homepage";
import Homepageslider from "../../components/HomePageSlider/homepageslider";
import AdCard from "../../components/DetailsCard/AdCard";
import EarliestCars from "../Homeearliestcar/earliestcar";
import { searchCar } from "../../../RESTAPI/homepage/homepage";
import { Link } from "react-router-dom";


const sliderImages = [
  "https://s3-alpha-sig.figma.com/img/452a/ec23/9a0fe53d8b65ea54238738035e27648e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RG383RiVdNt3n9JZdpgoZdFMydqjgqATT5cOw2dG2T0Vuduy71Ci25bokBpxbgCgQ5-bBT9jxTiIcbbO1jJVCNJtmTH48SUyG7Gguvt2q-bOijxVL6Wc8BWO2vJK2GXfRqQi-CM8OVmC4wiqNFdpaoFULweOf38yy~-iLPIg0YoV6MHUJ42q5TnoyH0uEwIB1t9HchOgqZHVpuIv3PhjIqfDnrmYZqxcOdJX5YgSo~QNh~K5kc1lFeeP2I4Wber0YmW4EowmBK7IwNR0Y7OljQuYVFW15NRG1OKggFfgwRmK-~qblhpb0AYSTHeDZEm8tZhYZcNxTqrnfJjeBaH3Zw__",
  // Add more image URLs here
];

const HomePage = () => {
  const [adsData, setAdsData] = useState([]); //main page cards state
  const [searchValue, setSearchValue] = useState(""); //state to store fetched search value from navbar
  const [location, setLocation] = useState(""); // state to store fetched location value from navbar
  const [searchData, setSearchData] = useState([]); //state to store searched data API
  const [locationData, setLocationData] = useState(""); //state to store searched location data API
  const [showResults, setShowResults] = useState(false); //state to show the results

  const handleSearchUpdate = (value) => {
    setSearchValue(value);
    setShowResults(true);
  };

  const handleLocationUpdate = (value) => {
    console.log("location  homepage", value);
    setLocation(value);
  };

  useEffect(() => {
    const fetchSearchCars = async () => {
      try {
        const result = await searchCar(searchValue);

        if (result?.success) {
          setSearchData(result?.data);
        } else {
          console.error(result?.error);
        }
      } catch (error) {
        console.error("Error fetching search cars:", error);
      }
    };
    if (searchValue) {
      fetchSearchCars();
    }
  }, [searchValue]);

  useEffect(() => {
    const fetchLocationCars = async () => {
      try {
        const result = await locationCar(location);
        if (result?.success) {
          setLocationData(result?.data);
          console.log("Locatoin Car Data",result?.data);
        } else {
          console.error(result?.error);
        }
      } catch (error) {
        console.error("Error fetching location cars:", error);
      }
    };

    if (location) {
      fetchLocationCars();
    }
  }, [location]);

  const logos = [
    {
      _id: "1",
      makes:"honda",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
    },
    {
      _id: "3",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
    },
    {
      _id: "4",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
    },
    {
      _id: "5",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
    },
    {
      _id: "6",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
    },
    {
      _id: "7",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
    }, 
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchallcars();

      if (result.success) {
        setAdsData(result.data.cars); // Set 'cars' array to state
      } else {
        console.error(result.error);
      }
    };
    fetchData();
  }, []);

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  console.log("adsdata",adsData);
  

  return (
    <>
      <NavbarLoggedIn
        onSearchUpdate={handleSearchUpdate}
        onLocationUpdate={handleLocationUpdate}
      />

      {/* Image Slider */}
      <Homepageslider />

      <div className="topLevel">
        <div className="headings">
          <h2 className="cats">Categories</h2>
          <a className="viewMore">
            View More <ArrowDownOutlined style={{ marginTop: 3 }} />
          </a>
        </div>

        <LogoGrid logos={logos} />

        {locationData?.data?.length > 0 && (
          <div className="searchResultsDiv">
            <h3>Search Results for "{location}"</h3>
            <div className="AdsSection">
              {Array.isArray(locationData.data) &&
                locationData.data.map((car) => (
                  <AdCard
                    key={car._id}
                    carId={car._id}
                    imageSrc={car.pictures}
                    year={car.year}
                    mileage={car.mileage}
                    fuel={car.fuel}
                    engine={car.engine}
                    location={car.location}
                    timeAgo={car.timeAgo}
                    title={car.title}
                    currentBid={car.highestCurrentBid}
                    bidAcceptTill={car.timeLeft}
                    listingDate={car.listingDate}
                    searchData={location}
                  />
                ))}
            </div>
          </div>
        )}
        {locationData?.data?.length === 0 && (
          <>
            <h2 className="searchResultsDiv">Search Data</h2>
            <div className="searchResultsDiv">
              No cars found matching "{location}"
            </div>
          </>
        )}

        {searchData?.data?.length > 0 && (
          <div className="searchResultsDiv">
            <h3>Search Results for "{searchValue}"</h3>
            <div className="AdsSection">
              {Array.isArray(searchData.data) &&
                searchData.data.map((car) => (
                  <AdCard
                    key={car._id}
                    carId={car._id}
                    imageSrc={car.pictures}
                    year={car.year}
                    mileage={car.mileage}
                    fuel={car.fuel}
                    engine={car.engine}
                    location={car.location}
                    timeAgo={car.timeAgo}
                    title={car.title}
                    currentBid={car.highestCurrentBid}
                    bidAcceptTill={car.timeLeft}
                    listingDate={car.listingDate}
                    searchData={searchValue}
                  />
                ))}
            </div>
          </div>
        )}
        {searchData?.data?.length === 0 && (
          <>
            <h2 className="searchResultsDiv">Search Data</h2>
            <div className="searchResultsDiv">
              No cars found matching "{searchValue}"
            </div>
          </>
        )}

        <div className="headings">
          <h2 className="cats">Latest Auctions</h2>
          <Link className="viewMore" to="/recentAdds">
            View More <ArrowDownOutlined style={{ marginTop: 3 }} />
          </Link>
        </div>

        <div className="AdsSection">
          {/* Render each ad using map only if adsData is an array */}
          {Array.isArray(adsData) &&
            adsData.map((ad) => (
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
                listingDate={ad.listingDate}
              />
            ))}
        </div>

        <EarliestCars />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
// import React, { useEffect, useState } from "react";
// import "./HomePage.css";
// import LogoGrid from "../../components/LogoGrid/LogoGrid";
// import { ArrowDownOutlined } from "@ant-design/icons";
// import Footer from "../../components/Footer/Footer";
// import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
// import { fetchallcars } from "../../../RESTAPI/homepage/homepage";
// import Homepageslider from "../../components/HomePageSlider/homepageslider";
// import AdCard from "../../components/DetailsCard/AdCard";
// import EarliestCars from "../Homeearliestcar/earliestcar";
// import { Link } from "react-router-dom";
// import TimeAgo from "react-timeago";

// const sliderImages = [
//   "https://s3-alpha-sig.figma.com/img/452a/ec23/9a0fe53d8b65ea54238738035e27648e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RG383RiVdNt3n9JZdpgoZdFMydqjgqATT5cOw2dG2T0Vuduy71Ci25bokBpxbgCgQ5-bBT9jxTiIcbbO1jJVCNJtmTH48SUyG7Gguvt2q-bOijxVL6Wc8BWO2vJK2GXfRqQi-CM8OVmC4wiqNFdpaoFULweOf38yy~-iLPIg0YoV6MHUJ42q5TnoyH0uEwIB1t9HchOgqZHVpuIv3PhjIqfDnrmYZqxcOdJX5YgSo~QNh~K5kc1lFeeP2I4Wber0YmW4EowmBK7IwNR0Y7OljQuYVFW15NRG1OKggFfgwRmK-~qblhpb0AYSTHeDZEm8tZhYZcNxTqrnfJjeBaH3Zw__",
//   // Add more image URLs here
// ];

// const HomePage = () => {
//   const [adsData, setAdsData] = useState([]); // State to store fetched ads data
//   const logos = [
//     {
//       _id: "1",
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
//     },
//     {
//       _id: "2",
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO9ZiUp-Lk56FE7YOWrthGxJlKKAehVVAS8w&s",
//     },
//     // Add more image objects here
//   ];

//   // Fetch the cards when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetchallcars();
//       console.log("result", result); // Check the full response
//       console.log("cars", result.data.cars); // Check the 'cars' array

//       if (result.success) {
//         setAdsData(result.data.cars); // Set 'cars' array to state
//       } else {
//         console.error(result.error);
//       }
//     };
//     fetchData();
//   }, []); // Empty array ensures this effect runs only once on component mount

//   // Slick slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   console.log("adsssdata", adsData);

//   return (
//     <>
//       <NavbarLoggedIn />

//       {/* Image Slider */}
//       <Homepageslider />

//       <div className="topLevel">
//         <div className="headings">
//           <h2 className="cats">Categories</h2>
//           <a className="viewMore">
//             View More <ArrowDownOutlined style={{ marginTop: 3 }} />
//           </a>
//         </div>
//         <LogoGrid logos={logos} />

//         <div className="headings">
//           <h2 className="cats">Latest Auctions</h2>
//           <Link className="viewMore" to="/recentAdds">
//             View More <ArrowDownOutlined style={{ marginTop: 3 }} />
//           </Link>
//         </div>
//         <div className="AdsSection">
//           {Array.isArray(adsData) &&
//             adsData.map((ad) => (
//               <AdCard
//                 carId={ad._id}
//                 imageSrc={ad.pictures}
//                 year={ad.make}
//                 mileage={ad.mileage}
//                 fuel={ad.fuel}
//                 engine={ad.engine}
//                 location={ad.location}
//                 timeAgo={<TimeAgo date={ad.listingDate} />}
//                 title={ad.title}
//                 currentBid={ad.highestCurrentBid}
//                 bidAcceptTill={ad.bidAcceptTill}
//                 listingDate={ad.listingDate}
//               />
//             ))}
//         </div>
//         <EarliestCars />
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default HomePage;
