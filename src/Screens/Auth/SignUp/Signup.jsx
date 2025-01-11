import React, { useState } from "react";
import { Input, Button, Tabs, Form, InputNumber } from "antd";
import {
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  IdcardOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
  BankOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import "./Signup.css";
import UploadImage from "./UploadImage";
import Navbar from "../../../components/Navbar/navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Car from "../../../assets/Auth/Car.svg";
import { baseuri } from "../../../../BaseUri/baseuri";
import { message } from "antd";

const { TabPane } = Tabs;

const Signup = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");

  const onFinish = async (values) => {
    const userType = activeTab === "1" ? "individual" : "trader";
    // Map data for traders
    const dataToSend =
      userType === "trader"
        ? {
            userType,
            firstName: values.firstName,
            lastName: values.lastName,
            city: values.city,
            postCode: values.postCode,
            phone: values.mobileNumber,
            companyName: values.companyName,
            emiratesId: values.emiratesId,
            isNextGearCustomer: true,
            DrivingLicensePicUri: values.drivingLicense,
            BillPicUri: values.utilityBill,
            BankStatementPicUri: values.bankStatement,
            directorName: values.directorName,
            personalAddressOfDirector: values.personalAddressOfDirector,
            businessAddress: values.businessAddress,
            email: values.email,
            password: values.password,
          }
        : {
            userType,
            fullName: values.FullName,
            email: values.email,
            emiratesId: values.emiratesId,
            password: values.password,
          };
          console.log('Data to send:', dataToSend.DrivingLicensePicUri); 

    try {
      const response = await axios.post(`${baseuri}/auth/signup`, dataToSend);
      console.log("response data", response);

      // Show success message using Ant Design's message component
      message.success("User Signup successful"); // Success message
    } catch (error) {
      console.error("Error:", error);

      // Show error message using Ant Design's message component
      message.error(
        error.response?.data?.message || "Signup failed. Please try again." // Error message
      );
    }
  };
  return (
    <>
      <Navbar />
      <div className="signup-container" style={{ height: "60%" }}>
        <div className="signup-content" style={{ height: "30%", padding: 0 }}>
          <div className="signup-left" style={{ height: "60%", padding: 0 }}>
            <h2 className="signup-subtitle">Create an account</h2>
            <p>Sign up to enjoy the feature of Drivebidz</p>

            <Tabs
              defaultActiveKey="1"
              centered
              activeKey={activeTab}
              onChange={setActiveTab}
            >
              <TabPane tab="Individual" key="1">
                <Form form={form} layout="horizontal" onFinish={onFinish}>
                  <div className="IndiForm">
                    <Form.Item
                      className="IndiInput"
                      name="FullName"
                      rules={[
                        { required: true, message: "Full Name is required" },
                      ]}
                    >
                      <Input
                        className="IndiInput"
                        prefix={
                          <UsergroupDeleteOutlined style={{ padding: 5 }} />
                        }
                        placeholder="Full Name"
                      />
                    </Form.Item>
                    <Form.Item
                      className="IndiInput"
                      name="email"
                      rules={[{ required: true, message: "Email is required" }]}
                    >
                      <Input
                        className="IndiInput"
                        prefix={<UserOutlined style={{ padding: 5 }} />}
                        placeholder="Email"
                      />
                    </Form.Item>

                    <Form.Item
                      name="emiratesId"
                      rules={[
                        { required: true, message: "Emirates ID is required" },
                      ]}
                    >
                      <InputNumber
                        prefix={<IdcardOutlined style={{ padding: 5 }} />}
                        className="IndiInput"
                        placeholder="Emirates ID"
                        style={{ width: "100%" }} // Make sure the input spans full width
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                    >
                      <Input.Password
                        className="IndiInput"
                        prefix={<LockOutlined style={{ padding: 5 }} />}
                        placeholder="Password"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="signup-btn"
                        
                      >
                        Sign Up
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </TabPane>

              <TabPane tab="Trader" key="2">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <div className="TraderForm">
                    <Form.Item
                      className="TraderItem"
                      name="firstName"
                      rules={[
                        { required: true, message: "First Name is required" },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<UserOutlined />}
                        placeholder="First Name"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="lastName"
                      rules={[
                        { required: true, message: "Last Name is required" },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<UserOutlined />}
                        placeholder="Last Name"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="email"
                      rules={[{ required: true, message: "Email is required" }]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<UserOutlined />}
                        placeholder="Email"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="businessAddress"
                      rules={[
                        {
                          required: true,
                          message: "Business Address is required",
                        },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<HomeOutlined />}
                        placeholder="Business Address"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="companyName"
                      rules={[
                        { required: true, message: "Company Name is required" },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<HomeOutlined />}
                        placeholder="Company Name"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="emiratesId"
                      rules={[
                        { required: true, message: "Emirates ID is required" },
                      ]}
                    >
                      <InputNumber
                        className="TraderInput"
                        prefix={<IdcardOutlined />}
                        placeholder="Emirates ID"
                        style={{ width: "100%" }} // Make sure the input spans full width
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="mobileNumber"
                      rules={[
                        {
                          required: true,
                          message: "Mobile Number is required",
                        },
                        
                      ]}
                    >
                      <InputNumber
                        className="TraderInput"
                        prefix={<PhoneOutlined />}
                        placeholder="Mobile Number"
                        style={{ width: "100%" }}
                        controls={false}
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="directorName"
                      rules={[
                        {
                          required: true,
                          message: "Director Name is required",
                        },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<UserOutlined />}
                        placeholder="Director Name"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="personalAddressOfDirector"
                      rules={[
                        {
                          required: true,
                          message: "Personal Address of Director is required",
                        },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<EnvironmentOutlined />}
                        placeholder="Personal Address of Director"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="postCode"
                      rules={[
                        { required: true, message: "Post Code is required" },
                        {
                          type: "number",
                          message: "Enter a valid Post Code",
                        },
                        {
                          pattern: /^[0-9]{4}$/,
                          message: "Enter a valid Post Code (4 digits only)",
                        },
                      ]}
                    >
                      <InputNumber
                        className="TraderInput"
                        prefix={<PushpinOutlined />}
                        placeholder="Post Code"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="city"
                      rules={[{ required: true, message: "City is required" }]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<BankOutlined />}
                        placeholder="City"
                      />
                    </Form.Item>

                    <Form.Item
                      className="TraderItem"
                      name="country"
                      rules={[
                        { required: true, message: "Country is required" },
                      ]}
                    >
                      <Input
                        className="TraderInput"
                        prefix={<GlobalOutlined />}
                        placeholder="Country"
                      />
                    </Form.Item>
                  </div>

                  <div className="Security">
                    <h3>Security Details</h3>
                    <Form.Item
                      className="TraderItem"
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                        { min: 6, message: "Password must be at least 6 characters long" },
                      ]}
                    >
                      <Input.Password
                        className="TraderInput"
                        prefix={<LockOutlined />}
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item
                      className="TraderItem"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                        { min: 6, message: "Password must be at least 6 characters long" },
                      ]}
                    >
                      <Input.Password
                        className="TraderInput"
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </div>

                  <div className="Security">
                    <h3>
                      Upload Documents for Verification (Any one of these)
                    </h3>
                    <div className="uploadsDiv">
                      <div className="itemImg">
                        <Form.Item
                          className="TraderItem"
                          name="drivingLicense"
                          label="Driving License"
                        >
                          <UploadImage />
                        </Form.Item>
                      </div>
                      <div className="itemImg">
                        <Form.Item
                          className="TraderItem"
                          name="utilityBill"
                          label="Utility Bill"
                        >
                          <UploadImage />
                        </Form.Item>
                      </div>
                      <div className="itemImg">
                        <Form.Item
                          className="TraderItem"
                          name="bankStatement"
                          label="Bank Statement"
                        >
                          <UploadImage />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item className="TraderItemS">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="signup-btn"
                        
                      >
                        Sign Up
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </TabPane>
            </Tabs>

            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
          <div
            className="signup-right"
            style={{
              height: "100vh",
              paddingRight: "0px",
              backgroundColor: "white",
            }}
          >
            <img src={Car} alt="Car" style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
