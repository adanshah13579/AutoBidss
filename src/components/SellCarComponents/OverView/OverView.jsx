import React, { useEffect, useState } from "react";
import { Input, Form, Select } from "antd";
import "./OverView.css";

const Overview = ({ setOverviewData, OverviewData }) => {
  // Initialize state with OverviewData or fallback to empty strings
  const [overview, setOverview] = useState({
    make: OverviewData?.make || '',
    model: OverviewData?.model || '',
    variant: OverviewData?.variant || '',
    registeredIn: OverviewData?.registeredIn || '',
    registeredDate:OverviewData?.registeredDate || '',
    mileage: OverviewData?.mileage || '',
    fuelRunsOn: OverviewData?.fuelRunsOn || '',
    carColor: OverviewData?.carColor || '',
    engineSize: OverviewData?.engineSize || '',
    transmission: OverviewData?.transmission || '',
    totalOwners:OverviewData?.totalOwners || '',
    condition:OverviewData?.condition || '',
    carIntColor:OverviewData?.carIntColor || '',
    carHistory:OverviewData?.carHistory || '',
    carSellerComnt:OverviewData?.carSellerComnt || '',


  });

  // Handler for form input changes
  const inputHandler = (e) => {
    const { name, value } = e.target || e; // Check if target is there (for Input or Select)
    setOverview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  // Update parent component whenever 'overview' changes
  useEffect(() => {
    setOverviewData((prev) => ({ ...prev, ...overview }));
  }, [overview, setOverviewData]);

  return (
    <div className="container">
      <div className="heading-container">
        <h2 className="heading">Car Overview</h2>
      </div>
      <div className="content">
        <Form layout="vertical" className="form">
          {/* Field 1: Make */}
          <div className="form-item">
            <label className="form-label">
              Make (Honda, BMW etc) <span className="required">*</span>
            </label>
            <Select
              name="make"
              className="form-input"
              placeholder="Enter Make (Honda, BMW etc)"
              value={overview.make}
              onChange={(value)=>inputHandler({name:"make",value})}
              required
            >
              <Select.Option value="" disabled selected >Select Make</Select.Option>
              <Select.Option value="Toyota">Toyota</Select.Option>
              <Select.Option value="Honda">Honda</Select.Option>
              <Select.Option value="Ford">Ford</Select.Option>
              <Select.Option value="Chevrolet">Chevrolet</Select.Option>
              <Select.Option value="Nissan">Nissan</Select.Option>
              <Select.Option value="BMW">BMW</Select.Option>
              <Select.Option value="Mercedes-Benz">Mercedes-Benz</Select.Option>
              <Select.Option value="Audi">Audi</Select.Option>
              <Select.Option value="Toyota Corolla XLi"></Select.Option>
              <Select.Option value="Toyota Corolla GLi">Toyota Corolla GLi</Select.Option>
              <Select.Option value="Toyota Corolla GTi">Toyota Corolla GTi</Select.Option>
              <Select.Option value="Honda Civic EX">Honda Civic EX</Select.Option>
              <Select.Option value="Honda Accord LX">Honda Accord LX</Select.Option>
              <Select.Option value="Ford Mustang GT">Ford Mustang GT</Select.Option>
              <Select.Option value="Ford Focus">Ford Focus</Select.Option>
              <Select.Option value="Chevrolet Malibu">Chevrolet Malibu</Select.Option>
            </Select>
          </div>

          {/* Field 2: Model */}
          <div className="form-item">
            <label className="form-label">
              Model (2001, 2022 etc) <span className="required">*</span>
            </label>
            <Select
              name="model"
              className="form-input"
              value={overview.model}
              onChange={(value) => inputHandler({ name: 'model', value })}
            
            >
              <Select.Option value="" disabled selected >Select Model</Select.Option>
              <Select.Option value="2001">2001</Select.Option>
              <Select.Option value="2002">2002</Select.Option>
              <Select.Option value="2003">2003</Select.Option>
              <Select.Option value="2004">2004</Select.Option>
            </Select>
          </div>

          {/* Field 3: Variant */}
          <div className="form-item">
            <label className="form-label">
              Variant <span className="required">*</span>
            </label>
            <Input
              name="variant"
              className="form-input"
              placeholder="Enter Variant (GTR, Corolla, etc.)"
              value={overview.variant}
              onChange={inputHandler}
            />
          </div>

          {/* Field 4: Registered In */}
          <div className="form-item">
            <label className="form-label">
              Registered In <span className="required">*</span>
            </label>
            <Input
              name="registeredIn"
              className="form-input"
              placeholder="Enter Registered In (Country)"
              value={overview.registeredIn}
              onChange={inputHandler}
            />
          </div>

          <div className="form-item">
            <label className="form-label">
              Registration Date <span className="required">*</span>
            </label>
            <Input
              type="date"
              name="registeredDate"
              className="form-input"
              placeholder="Enter Registration Date"
              value={overview.registeredDate}
              onChange={inputHandler}
            />
          </div>

          <div className="form-item">
            <label className="form-label">
              Total Owners <span className="required">*</span>
            </label>
            <Input
              
              name="totalOwners"
              className="form-input"
              placeholder="Enter Total Owners"
              value={overview.totalOwners}
              onChange={inputHandler}
            />
          </div>

          <div className="form-item">
            <label className="form-label">
              Condition <span className="required">*</span>
            </label>
            <Input
              
              name="condition"
              className="form-input"
              placeholder="Enter Car Condition in (A)"
              value={overview.condition}
              onChange={inputHandler}
            />
          </div>

          {/* Field 5: Mileage */}
          <div className="form-item">
            <label className="form-label">
              Mileage (KMs) <span className="required">*</span>
            </label>
            <Input
              name="mileage"
              className="form-input"
              placeholder="Enter Mileage (in KMs)"
              value={overview.mileage}
              onChange={inputHandler}
            />
          </div>

          {/* Field 6: Fuel Runs On */}
          <div className="form-item">
            <label className="form-label">
              Fuel Runs On <span className="required">*</span>
            </label>
            <Select
              name="fuelRunsOn"
              className="form-input"
              value={overview.fuelRunsOn}
              onChange={(value) => inputHandler({ name: 'fuelRunsOn', value })}
           
            >
              <Select.Option value="" disabled selected>Select Fuel Type (Petrol, Diesel, Electric)</Select.Option>
              <Select.Option value="Petrol">Petrol</Select.Option>
              <Select.Option value="Diesel">Diesel</Select.Option>
              <Select.Option value="Electric">Electric</Select.Option>
              <Select.Option value="Hybrid">Hybrid</Select.Option>
            </Select>
          </div>

          {/* Field 7: Car Body Color */}
          <div className="form-item">
            <label className="form-label">
              Car Body Color <span className="required">*</span>
            </label>
            <Input
              name="carColor"
              className="form-input"
              placeholder="Enter Car Color"
              value={overview.carColor}
              onChange={inputHandler}
            />
          </div>

          <div className="form-item">
            <label className="form-label">
              Car Interior Color <span className="required">*</span>
            </label>
            <Input
              name="carIntColor"
              className="form-input"
              placeholder="Enter Car Interior Color"
              value={overview.carIntColor}
              onChange={inputHandler}
            />
          </div>

          {/* Field 8: Engine Size */}
          <div className="form-item">
            <label className="form-label">
              Engine Size (cc) <span className="required">*</span>
            </label>
            <Input
              name="engineSize"
              className="form-input"
              placeholder="Enter Engine Size (cc)"
              value={overview.engineSize}
              onChange={inputHandler}
            />
          </div>

          {/* Field 9: Transmission */}
          <div className="form-item">
            <label className="form-label">
              Transmission <span className="required">*</span>
            </label>
            <Select
              name="transmission"
              className="form-input"
              value={overview.transmission}
              onChange={(value) => inputHandler({ name: 'transmission', value })}
              placeholder="Select Transmission (Manual, Automatic)"
            >
              <Select.Option value="" disabled selected>Select Transmission Type</Select.Option>
              <Select.Option value="Manual">Manual</Select.Option>
              <Select.Option value="Automatic">Automatic</Select.Option>
              <Select.Option value="Semi-Automatic">Semi-Automatic</Select.Option>
              <Select.Option value="CVT (Continuously Variable Transmission)">CVT (Continuously Variable Transmission)</Select.Option>
              <Select.Option value="Automated Manual Transmission">Automated Manual Transmission</Select.Option>
              <Select.Option value="Dual-Clutch Automatic">Dual-Clutch Automatic</Select.Option>
              
            </Select>
          </div>

           
          <div className="form-item">
            <label className="form-label">
              Car History <span className="required">*</span>
            </label>
            <Input.TextArea
              name="carHistory"
              className="form-input"
              rows={4}
              placeholder="Enter Description about car"
              value={overview.carHistory} // Bind input field to state
              onChange={inputHandler} // Update state on change
            />
          </div> 
             
           <div className="form-item">
            <label className="form-label">
              Car Seller Comments <span className="required">*</span>
            </label>
            <Input.TextArea
              name="carSellerComnt"
              className="form-input"
              rows={4}
              placeholder="Enter Description about car"
              value={overview.carSellerComnt} // Bind input field to state
              onChange={inputHandler} // Update state on change
            />
          </div> 
          
        </Form>
      </div>
    </div>
  );
};

export default Overview;
