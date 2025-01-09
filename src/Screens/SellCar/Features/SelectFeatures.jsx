import React, { useEffect, useState } from "react";
import { Checkbox, Input, Form, Select } from "antd"; 
import "./SelectFeatures.css";

// Import SVGs
import FeatureSVG1 from "../../../assets/SellCarAssests/Assets/Svgs/ABS.svg";
import FeatureSVG2 from "../../../assets/SellCarAssests/Assets/Svgs/AC.svg";
import FeatureSVG3 from "../../../assets/SellCarAssests/Assets/Svgs/IKey.svg";
import FeatureSVG4 from "../../../assets/SellCarAssests/Assets/Svgs/DoorLock.svg";
import FeatureSVG5 from "../../../assets/SellCarAssests/Assets/Svgs/CarDoor.svg";
import FeatureSVG6 from "../../../assets/SellCarAssests/Assets/Svgs/Radio.svg";
import FeatureSVG7 from "../../../assets/SellCarAssests/Assets/Svgs/AirBag.svg";
import FeatureSVG8 from "../../../assets/SellCarAssests/Assets/Svgs/Navigation.svg";
import FeatureSVG9 from "../../../assets/SellCarAssests/Assets/Svgs/Wheel.svg";

const SelectFeatures = () => {
  // Unified State Management
  const [features, setFeatures] = useState({
    accidentHistory: "",
    tireCondition: "New",
    bodyType: "",
    fuelEconomy: "",
    numCylinders: "",
    horsepower: "",
    wheels: "",
    feature1: false,
    feature2: false,
    feature3: false,
    feature4: false,
    feature5: false,
    feature6: false,
    feature7: false,
    feature8: false,
    feature9: false,
  });

  // Handle input changes (generic for all fields)
  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target || e; 
    setFeatures((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Checkbox or Input
    }));
  };

  // Pass data to parent (optional)
  useEffect(() => {
    console.log(features);
  });

  // Features List
  const featureList = [
    { id: "feature1", text: "ABS", svg: FeatureSVG1 },
    { id: "feature2", text: "AC", svg: FeatureSVG2 },
    { id: "feature3", text: "IKey", svg: FeatureSVG3 },
    { id: "feature4", text: "Door Lock", svg: FeatureSVG4 },
    { id: "feature5", text: "Car Door", svg: FeatureSVG5 },
    { id: "feature6", text: "Radio", svg: FeatureSVG6 },
    { id: "feature7", text: "Air Bag", svg: FeatureSVG7 },
    { id: "feature8", text: "Navigation", svg: FeatureSVG8 },
    { id: "feature9", text: "Wheel", svg: FeatureSVG9 },
  ];

  return (
    <div className="select-features-container">
      <div className="heading-container">
        <h2 className="heading">Select Features</h2>
      </div>

      {/* Feature Checkboxes */}
      <div className="features-grid">
        {featureList.map((feature) => (
          <div key={feature.id} className="feature-item">
            <input
              type="checkbox"
              id={feature.id}
              name={feature.id}
              checked={features[feature.id]}
              onChange={inputHandler}
            />
            <label htmlFor={feature.id}>
              <img src={feature.svg} alt={feature.text} className="feature-svg" />
              <span>{feature.text}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Accident History */}
      <div className="heading-container">
      <h2 className="heading">Accident History</h2>
      </div>
      <div className="features-grid">
        {["No Damage", "Minor Damage", "Major Damage"].map((option) => (
          <div key={option} className="accident-history-item">
            <input
              type="radio"
              id={option}
              name="accidentHistory"
              value={option}
              checked={features.accidentHistory === option}
              onChange={inputHandler}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="heading-container">
      <h2 className="heading">Additional Car Features</h2>
      </div>
      <div className="content">
        <Form layout="vertical" className="form">
          {/* Body Type */}
          <div className="form-item">
            <label className="form-label">
              Body Type <span className="required">*</span>
            </label>
            <Input
              name="bodyType"
              className="form-input"
              placeholder="Enter Body Type"
              value={features.bodyType}
              onChange={inputHandler}
            />
          </div>

          {/* Fuel Economy */}
          <div className="form-item">
            <label className="form-label">
              Fuel Economy <span className="required">*</span>
            </label>
            <Input
              name="fuelEconomy"
              className="form-input"
              placeholder="Enter Fuel Economy"
              value={features.fuelEconomy}
              onChange={inputHandler}
            />
          </div>

          {/* No of Cylinders */}
          <div className="form-item">
            <label className="form-label">
              No of Cylinders <span className="required">*</span>
            </label>
            <Input
              name="numCylinders"
              className="form-input"
              placeholder="Eg: 2"
              value={features.numCylinders}
              onChange={inputHandler}
            />
          </div>

          {/* Horsepower */}
          <div className="form-item">
            <label className="form-label">
              Horsepower <span className="required">*</span>
            </label>
            <Input
              name="horsepower"
              className="form-input"
              placeholder="Eg: 200"
              value={features.horsepower}
              onChange={inputHandler}
            />
          </div>

          {/* Wheels */}
          <div className="form-item">
            <label className="form-label">
              Wheels <span className="required">*</span>
            </label>
            <Input
              name="wheels"
              className="form-input"
              placeholder="Eg: 16-inch, 18-inch"
              value={features.wheels}
              onChange={inputHandler}
            />
          </div>

          {/* Tire Condition */}
          <div className="form-item">
            <label className="form-label">
              Tire Condition <span className="required">*</span>
            </label>
            <Select
              name="tireCondition"
              className="form-input"
              value={features.tireCondition}
              onChange={(value) => inputHandler({ name: "tireCondition", value })}
            >
              {["New", "Fair", "Like-New", "Worn", "Good", "Bald"].map((condition) => (
                <Select.Option key={condition} value={condition}>
                  {condition}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SelectFeatures;
