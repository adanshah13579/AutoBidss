import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import { MessageFilled, CarFilled, MailOutlined } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";
import Footer from "../../components/Footer/Footer";
import { fetchCarDetails } from "../../../RESTAPI/Profile/ProfileRoutes";

import "/node_modules/react-image-gallery/styles/css/image-gallery.css";
import "./CarDetails.css";
import { useParams } from "react-router-dom";
import SimilarCars from "../Similar_cars/similarcars";
import CustomModal from "../../components/Modals/CustomModal";

const CarDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");  
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");


  const {carId} = useParams();


  const handleFetchCarDetails = () => {
    fetchCarDetails(carId, setLoading, setError, setCarDetails);
  };

  useEffect(() => {
    handleFetchCarDetails();
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
            <div className="gallery">
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
              <ImageGallery showPlayButton={false} items={images} />
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
                    {carDetails
                      ? new Date(carDetails.bidAcceptTill).toLocaleString()
                      : "Loading..."}
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
                  <a onClick={() => openModal("download")}style={{ cursor: "pointer" }}> Download Car Report</a>
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
                  <span className="overViewtext1">Make:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.make : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Model:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.model : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Transmission:</span>
                  <span className="overViewtext1">
                    {carDetails
                      ? carDetails.transmission
                      : "Loading..."}
                  </span>
                </div>
                <div className="overViewInner">
                  <CarFilled className="overViewIcon" />
                  <span className="overViewtext1">Fuel:</span>
                  <span className="overViewtext1">
                    {carDetails ? carDetails.fuel : "Loading..."}
                  </span>
                </div>
              </div>
              <hr className="linehr" />
              <div className="overViewActions">
                <button className="overViewbuy-button"  onClick={() => openModal("buy")}>
                  Buy Now
                </button>
                <button className="overViewbid-button" onClick={() => openModal("bid")}>
                  Bid Now 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <SimilarCars />
      <Footer />
    </div>
  );
};

export default CarDetails;
