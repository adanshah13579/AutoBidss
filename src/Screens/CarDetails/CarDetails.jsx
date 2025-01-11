import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import { MessageFilled, CarFilled, MailOutlined } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchCarDetails } from "../../../RESTAPI/Profile/ProfileRoutes";
<<<<<<< HEAD
import { Carousel } from 'antd';
=======
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

import "/node_modules/react-image-gallery/styles/css/image-gallery.css";
import "./CarDetails.css";
import { useParams } from "react-router-dom";
import SimilarCars from "../Similar_cars/similarcars";
<<<<<<< HEAD
import Countdown from "react-countdown";
=======
import CustomModal from "../../components/Modals/CustomModal";
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

const CarDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
<<<<<<< HEAD

  const { carId } = useParams();
=======
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");  
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");


  const {carId} = useParams();

>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181

  const handleFetchCarDetails = () => {
    fetchCarDetails(carId, setLoading, setError, setCarDetails);
  };

  useEffect(() => {
    handleFetchCarDetails();
<<<<<<< HEAD
    console.log("Car Details", carDetails);
    console.log(carId);
  }, []);

  // const images = carDetails
  //   ? carDetails.pictures.map((pic) => ({
  //       original: pic,
  //       thumbnail: pic,
  //     }))
  //   : [];

  const media = carDetails
  ? [
      ...(carDetails.videoUrl
        ? [
            {
              original: carDetails.videoUrl,
              // thumbnail: carDetails.videoUrl || "",
              type: "video",
            },
          ]
        : []),
      ...carDetails.pictures.map((pic) => ({
        original: pic,
        thumbnail: pic,
        type: "image",
      })),
    ]
  : [];


  const renderItem = (item) => {
    return item.type === "image" ? (
      <img
        src={item.original}
        alt="car media"
        style={{ width: "100%", height: "auto" }}
      />
    ) : (
      <video
        src={item.original}
        controls
        style={{ width: "100%", height: "auto" }}
        poster={item.original}
      >
        Your browser does not support the video tag.
      </video>
    );
  };

=======
    console.log("Car Details",carDetails);
    console.log(carId);

  }, []);

  
  const images = carDetails
    ? carDetails.pictures.map((pic) => ({
        original: pic,
        thumbnail: pic,
      }))
    : [];

    const openModal = (type) => {
      setModalType(type);
  
      if (type === "bid") {
        setModalTitle("Place Your Bid");
        setModalContent("Are you sure you want to place your bid on this car?");
      } else if (type === "buy") {
        setModalTitle("Buy Now");
        setModalContent("Are you sure you want to buy this car?");
      } else if (type === "download") {
        setModalTitle("Download Car Report");
        setModalContent("You can download the car inspection report here.");
      }
  
      setIsModalVisible(true);
    };
  
    const handleCancelModal = () => {
      setIsModalVisible(false);
    };

    const handleOk = () => {
      if (modalType === "bid") {
        message.success("Bid placed successfully!");
      } else if (modalType === "buy") {
        message.success("Car purchased successfully!");
      } else if (modalType === "download") {
        message.success("Car Report downloaded successfully!");
      }
      setIsModalVisible(false);
    };
  
  
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  return (
    <div>
      <NavbarLoggedIn />
      <div className="CarDetailsMain">
        <div className="profileAndChatSection">
          <div className="sellerProfile">
            <img
              src="https://img.lovepik.com/photo/48007/1949.jpg_wh860.jpg"
              alt="Seller"
            />
            <div className="sellerTexts">
              <span className="SellerName">
                {carDetails
                  ? `${carDetails.listedByDetails.firstName} ${carDetails.listedByDetails.lastName}`
                  : "Loading..."}
              </span>
              <span>Seller</span>
            </div>
          </div>
          <Button onClick={() => {}} className="chatButtonSeller">
            Chat with Seller <MessageFilled />
          </Button>
        </div>

        <div className="detailsAndBids">
          <div className="galleryAndDetails">
<<<<<<< HEAD
            <div className="gallery" >
=======
            <div className="gallery">
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
              <span className="carTitleHead">
                {carDetails ? carDetails.carTitle : "Loading..."}
              </span>
              <span className="postDate">
                {carDetails
                  ? `Posted on ${new Date(
                      carDetails.listingDate
                    ).toDateString()}`
                  : "Loading..."}
              </span>
<<<<<<< HEAD
              {/* <ImageGallery showPlayButton={false} items={images} /> */}
              <ImageGallery
              
                items={media}
                renderItem={renderItem}
                showThumbnails={true}
                showFullscreenButton={true}
                showPlayButton={false}
              />
=======
              <ImageGallery showPlayButton={false} items={images} />
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
            </div>

            <div className="features">
              <div>
                <span className="FeaturesHead">Features</span>
              </div>
              <div className="featuresInner">
                <span>
                  <CarFilled className="spanIcon" />
                  {carDetails ? carDetails.bodyType : "Loading..."}
                </span>
                <span>
                  <CarFilled className="spanIcon" />
                  {carDetails ? `${carDetails.seats} Seats` : "Loading..."}
                </span>
<<<<<<< HEAD
                <span>
                  <CarFilled className="spanIcon" />
                  {carDetails ? carDetails.make : "Loading..."}
                </span>
                <span>
                  <CarFilled className="spanIcon" />
                  {carDetails ? `${carDetails.horsePower} HP` : "Loading..."}
                </span>
              </div>
            </div>

            <div className="overView">
              <div className="headOverView">
                <span className="overViewHead">Car Exterior</span>
              </div>
              <div className="overViewMid">
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Tier Condition:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.tiresCondition : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Parking Sensors:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.parkingSensors : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Backup Camera:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.backupCamera : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Colour:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.colour : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Wheel:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.wheels : "Loading..."}
                  </span>
=======
              </div>
            </div>

            <div className="descriptionSection">
              <div className="features">
                <div>
                  <span className="FeaturesHead">Seller Comments</span>
                </div>
                <div className="sellerComment">
                  <p>
                    {carDetails
                      ? carDetails.description
                      : "No comments available."}
                  </p>
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                </div>
              </div>
            </div>
          </div>

          <div className="bidDetailsAndReportsSection">
            <div className="bidDetails">
              <div className="colflex">
                <span style={{ fontWeight: 600 }}>Buy Now Price</span>
                <span style={{ fontWeight: 600, color: "#2B59FF" }}>
                  {carDetails
                    ? `${carDetails.priceForPublic.toLocaleString()} AED`
                    : "Loading..."}
                </span>
              </div>
              <hr />
              <div className="colflex">
                <span style={{ fontWeight: 500 }}>Minimum Bid</span>
                <span className="highB">
                  {carDetails
                    ? `${carDetails.minimumBidPrice.toLocaleString()} AED`
                    : "Loading..."}
                </span>
                <div className="endingTimer">
                  <span>Ending in </span>
                  <br />
                  <span style={{ color: "red" }}>
<<<<<<< HEAD
                    {carDetails ? (
                      <Countdown
                        date={new Date(carDetails.bidAcceptTill)}
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
                    ) : (
                      "Loading..."
                    )}
=======
                    {carDetails
                      ? new Date(carDetails.bidAcceptTill).toLocaleString()
                      : "Loading..."}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                  </span>
                </div>
              </div>
              <hr />
              <div className="colflex">
                <MailOutlined />
                <span style={{ fontWeight: 600 }}>Location</span>
                <span>{carDetails ? carDetails.location : "Loading..."}</span>
              </div>
            </div>

            <div className="reportDetails">
              <div className="colflex">
                <span style={{ fontWeight: 600 }}>Car Report </span>
                <span style={{ fontWeight: 600, color: "#2B59FF" }}>
<<<<<<< HEAD
                  <a style={{ cursor: "pointer" }}> Download Car Report</a>
=======
                  <a onClick={() => openModal("download")}style={{ cursor: "pointer" }}> Download Car Report</a>
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                </span>
              </div>
            </div>

            <div className="overView">
              <div className="headOverView">
                <span className="overViewHead">Car Overview</span>
              </div>

              <div className="overViewMid">
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
<<<<<<< HEAD
=======
                  <span className="overViewtext1">Make:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.make : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                  <span className="overViewtext1">Model:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.model : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Transmission:</span>
                  <span className="overViewtext1">
<<<<<<< HEAD
                    {carDetails ? carDetails.transmission : "Loading..."}
=======
                    {carDetails
                      ? carDetails.transmission
                      : "Loading..."}
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Fuel:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.fuel : "Loading..."}
                  </span>
                </div>
<<<<<<< HEAD
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Engine:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.engine : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Mileage:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.mileage : "Loading..."}
                  </span>
                </div>

                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Variant:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.variant : "Loading..."}
                  </span>
                </div>

                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Fuel Economy:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.fuelEconomy : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Cylinders:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.cylinders : "Loading..."}
                  </span>
                </div>

                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Entertainment System:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.entertainmentSystem : "Loading..."}
                  </span>
                </div>
              </div>

              <hr className="linehr" />
              <div className="overViewActions">
                <button className="overViewbuy-button">Buy Now</button>
                <button className="overViewbid-button">Bid Now</button>
              </div>
            </div>

            <div className="overView">
              <div className="headOverView">
                <span className="overViewHead">Car Interior</span>
              </div>
              <div className="overViewMid">
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Interior Color:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.interiorColor : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Sun Roof:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.sunroof : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Seating Material:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.seatingMaterial : "Loading..."}
                  </span>
                </div>
              </div>
            </div>

            <div className="overView">
              <div className="headOverView">
                <span className="overViewHead">Car Accident History</span>
              </div>
              <div className="overViewMid">
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Accident History:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.accidentHistory : "Loading..."}
                  </span>
                </div>
=======
              </div>
              <hr className="linehr" />
              <div className="overViewActions">
                <button className="overViewbuy-button"  onClick={() => openModal("buy")}>
                  Buy Now
                </button>
                <button className="overViewbid-button" onClick={() => openModal("bid")}>
                  Bid Now 
                </button>
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>
      {loading && <Spin size="large" tip="Loading..." />}
      {error && <div>{error}</div>}
      <SimilarCars />
=======
       
      </div>
      <SimilarCars />
      <CustomModal
        isVisible={isModalVisible}
        title={modalTitle}
        content={modalContent}
        onOk={handleOk}
        onCancel={handleCancelModal}
        singleButton={false}
        type={modalType === "download" ? "default" : "primary"}
      />
      {loading && <Spin size="large" tip="Loading..." />}
      {error && <div>{error}</div>}
      
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
      <Footer />
    </div>
  );
};

export default CarDetails;
