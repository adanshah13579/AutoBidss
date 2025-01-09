import React, { useEffect, useState } from "react";
import "./SellCar.css";
import BackgroundSVG from "../../../assets/SellCarAssests/Assets/BG-Vector.svg";

import Basic from "../../../components/SellCarComponents/Basic/Basic";
import OverView from "../../../components/SellCarComponents/OverView/OverView";
import CarImages from "../../../components/SellCarComponents/CarImages/CarImages";
import SelectFeatures from "../Features/SelectFeatures";
import Inspection from "../../../components/SellCarComponents/Inspection/Inspection";
import Pricing from "../Pricing/Pricing";

const SellCar = () => {

  const [activeStep, setActiveStep] = useState(1);
  const [basicData, setData] = useState({});  //state to manage the data of basic 
  const [OverviewData,SetOData]=useState({});  //state to manage the overview data
  const [imageData,setImageData]=useState({});
  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

//Displaying basic data
  useEffect(()=>{
      console.log("Basic Data Updated",basicData)
  },[basicData])

//Displaying image data
  useEffect(() => {
    console.log("Overview Data Updated:", OverviewData);
  }, [OverviewData]);

//Displaying overview data
  useEffect(()=>{
    console.log("Image Data Updated",imageData);
  },[imageData]);

  return (
    <div className="sell-car-container">
      <img
        src={BackgroundSVG}
        alt="Background SVG"
        className="background-svg"
      />

      <h1 className="main-heading">New Listing</h1>
      <h2 className="sub-heading">Sell your Car With 3 Easy & Simple Steps!</h2>

      <div className="steps-card">
        {/* Steps */}
        <div
          onClick={() => {
            setActiveStep(1);
          }}
          className={`step ${activeStep >= 1 ? "active" : ""}`}
        >
          <div className="step-number">1</div>
          <span className="step-text">Basic Details</span>
          <div className="step-dots">-----</div>
        </div>
        <div
          id="stepdiv"
          onClick={() => {
            setActiveStep(2);
          }}
          className={`step ${activeStep >= 2 ? "active" : ""}`}
        >
          <div className="step-number">2</div>
          <span className="step-text">Features/Car Inspection</span>
          <div className="step-dots">-----</div>
        </div>
        <div
          id="stepdiv"
          onClick={() => {
            setActiveStep(3);
          }}
          className={`step ${activeStep >= 3 ? "active" : ""}`}
        >
          <div className="step-number">3</div>
          <span className="step-text">Pricing</span>
        </div>
        {/* Save & Next Button */}
        <button className="next-button" onClick={handleNext}>
          Save & Next
        </button>
        {activeStep == 1 && (
          <>
            {/* basic Component */}
            <div className="basic-container">
              <Basic  basicData={basicData} setBasicData = {setData}/>
            
            </div>

            {/* OverView Component */}
            <div className="OverView-container">
              <OverView   OverviewData={OverviewData} setOverviewData={SetOData} />
              
            </div>

            {/* CarImages Component */}
            <div className="CarImages-container">
              <CarImages  imageData={imageData}  SetImageData={setImageData} />
              
            </div>
          </>
        )}
        {activeStep == 2 && (
          <>
            <div className="SelectFeatures-container">
              <SelectFeatures  />
            </div>
            <div className="CarImages-container">
              <Inspection />
            </div>
          </>
        )}

        {activeStep == 3 && (
          <div className="Pricing-container">
            <Pricing />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellCar;
