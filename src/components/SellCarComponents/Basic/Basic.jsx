import React, { useEffect, useState } from "react";
import { Input, Form } from "antd";
import "./Basic.css";

const Basic = ({setBasicData,basicData}) => {

  //state management for all form fields
  const[basic,setBasic]=useState({
    id: basicData?.id || '',
    title:basicData?.title || '',
    description:basicData?.description || '',
    location:basicData?.location || '',
  });
  const inputHandler=(e)=>{
    const {name,value}=e.target; 
    setBasic({...basic,[name]:value});
  
  }

  useEffect(() => {
    
    setBasicData((prev) => ({ ...prev, ...basic })); // Merges old and new data
 }, [basic]);



  // You can handle form submission or other actions here
  const handleSubmit = () => {
    // For example, logging the form data to the console
    console.log("testing");
    console.log(basic);
  };  

  return (
    <div className="container">
      <div className="heading-container">
        <h2 className="heading">Basic Details</h2>
      </div>
      <div className="content">
        <Form layout="vertical" className="form" onFinish={handleSubmit}>
          <div className="form-item">
            <label className="form-label">
              Ad ID <span className="required">*</span>
            </label>
            <Input
              name="id"
              className="form-input"
              placeholder="12345649275y3y24"
              value={basic.id} // Bind input field to state
              onChange={inputHandler} // Update state on change
            />
          </div>
          <div className="form-item">
            <label className="form-label">
              Ad Title <span className="required">*</span>
            </label>
            <Input
              name="title"
              className="form-input"
              placeholder="Enter title for your ad"
              value={basic.title} // Bind input field to state
              onChange={inputHandler} // Update state on change
            />
          </div>

          <div className="form-item">
            <label className="form-label">
              Ad Description <span className="required">*</span>
            </label>
            <Input.TextArea
              name="description"
              className="form-input"
              rows={4}
              placeholder="Enter Description about car"
              value={basic.description} // Bind input field to state
              onChange={inputHandler} // Update state on change
            />
          </div>
          
          <div className="form-item">
            <label className="form-label">
              Ad Location <span className="required">*</span>
            </label>
            <Input
              name="location"
              className="form-input"
              placeholder="Enter location of your car"
              value={basic.location} // Bind input field to state
              onChange={inputHandler} // Update state on change
            />
          </div>
        </Form>
      </div>
      {/* Add the Pricing component here */}
    </div>
  );
};

export default Basic;
