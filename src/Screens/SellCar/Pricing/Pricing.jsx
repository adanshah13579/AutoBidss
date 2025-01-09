import React, { useState } from "react";
import "./Pricing.css";

const Pricing = () => {
  const [formData, setFormData] = useState({
    startingBidPrice: "",
    reservedBidPrice: "",
    buyingNowPrice: "",
    auctionTimePeriod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    
    <div className="pricing-container" style={{width:'100%'}}>
      <div className="heading-container" style={{width:'900px'}}>
        <h2 className="heading"style={{width:'100%'}}>Pricing</h2>
      </div>
      <div className="form-container"style={{width:'100%',paddingTop:'40px'}}>
        <div className="input-group" >
          <label htmlFor="startingBidPrice" className="label">
            Starting Bid Price (USD) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="startingBidPrice"
            name="startingBidPrice"
            value={formData.startingBidPrice}
            onChange={handleChange}
            placeholder="Enter Starting Bid Price"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="reservedBidPrice" className="label">
            Reserved Bid Price (USD)
          </label>
          <input
            type="number"
            id="reservedBidPrice"
            name="reservedBidPrice"
            value={formData.reservedBidPrice}
            onChange={handleChange}
            placeholder="Enter Reserved Bid Price"
          />
        </div>
        <div className="input-group">
          <label htmlFor="buyingNowPrice" className="label">
            Buying Now Price (USD)
          </label>
          <input
            type="number"
            id="buyingNowPrice"
            name="buyingNowPrice"
            value={formData.buyingNowPrice}
            onChange={handleChange}
            placeholder="Enter Buying Now Price"
          />
        </div>
        <div className="input-group">
          <label htmlFor="auctionTimePeriod" className="label">
            Auction Time Period (Days) <span className="required">*</span>
          </label>
          <select
            id="auctionTimePeriod"
            name="auctionTimePeriod"
            value={formData.auctionTimePeriod}
            onChange={handleChange}
            required
          >
            <option value="">Select Time Period</option>
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>
      </div>
    </div>
    
  );
};

export default Pricing;
