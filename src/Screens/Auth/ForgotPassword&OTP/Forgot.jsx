import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Forgot.css";
import Car from "../../../assets/Auth/Car.svg";
import { Input, Modal, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SendOtpRoute } from "../../../../RESTAPI/Authentication/AuthenticationRoutes";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email input
    if (!email) {
      alert("Please Enter Email");
      return;
    }

    // Show loading state while waiting for API response
    setLoading(true);

    try {
      // Call the API to send the OTP
      const response = await SendOtpRoute(email, navigate);

      if (response.success) {
        // OTP sent successfully, show modal
        setModalMessage("OTP sent successfully! Please check your email.");
        setIsModalVisible(true);

        // Navigate to OTP page after a delay
        setTimeout(() => {
          setIsModalVisible(false);
          navigate("/otp", { state: { email } });
        }, 2000);
      } else {
        // Handle failure (e.g., invalid email)
        setModalMessage(response.error || "Failed to send OTP.");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log("Error during OTP request:", error);
      setModalMessage("An error occurred. Please try again later.");
      setIsModalVisible(true);
    }

    // Reset the loading state
    setLoading(false);
  };

  return (
    <div className="login-container" style={{ padding: 0 }}>
      <div className="login-content" style={{ height: "90%", padding: 0 }}>
        <div className="login-left1">
          <div className="inner">
            <div className="headDiv">
              <h1 className="heading">Drivebidz</h1>
              <h2 className="heading2">Forgot Password?</h2>
              <p>Enter your email to recover your account.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>

              <Input
                prefix={<UserOutlined style={{ margin: 5 }} />}
                style={{ height: 45 }}
                type="email"
                id="email"
                placeholder="example@drivebidz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="login-button"
                style={{ marginTop: "15px" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Code"}
              </button>
            </form>
          </div>
        </div>
        <div className="login-right" style={{ height: "100%", paddingRight: "8px" }}>
          <img src={Car} alt="Car" />
        </div>
      </div>

      {/* Modal for feedback */}
      <Modal
        title="Forgot Password"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default ForgotPass;
