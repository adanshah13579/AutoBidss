import React, { useState } from "react";
import "./EnterOTP.css";
import Car from "../../../assets/Auth/Car.svg";
import { Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyOtpRoute } from "../../../../RESTAPI/Authentication/AuthenticationRoutes";
import CustomModal from "../../../components/Modals/CustomModal";

const EnterOTP = () => {
  const location = useLocation();
  const email = location?.state?.email;
  const navigate = useNavigate();

  // States for modal visibility and content
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleSubmit = async (otp) => {
    // Validate fields
    if (!otp) {
      setModalContent("Please Enter OTP");
      setModalTitle("Error");
      setIsModalVisible(true);
      return;
    }
    if (otp.length < 4) {
      setModalContent("OTP is not 4 digits long");
      setModalTitle("Error");
      setIsModalVisible(true);
      return;
    }

    // Mock submit action
    console.log("OTP submitted:", otp, email);
    try {
      // Call your API to verify the OTP
      const response = await VerifyOtpRoute(otp, email);

      if (response.success) {
        console.log("response", response);
        navigate("/reset-password", { state: email });
      } else {
        setModalContent(response?.error || "Something went wrong");
        setModalTitle("Error");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setModalContent("An error occurred. Please try again.");
      setModalTitle("Error");
      setIsModalVisible(true);
    }
  };
  return (
    <>
      <div className="login-container" style={{ paddingTop: 0, padding: 0 }}>
        <div className="login-content" style={{ height: "90%", padding: 0 }}>
          <div className="login-left1">
            <div className="inner">
              <div className="headDiv">
                <h1 className="heading">Drivebidz</h1>
                <h2 className="heading2">Enter OTP</h2>
                <p>Enter the Code sent to your mail.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="Number">OTP</label>

                <Input.OTP
                  length={4}
                  variant="outlined"
                  size="large"
                  onChange={(e) => {
                    handleSubmit(e);
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <p style={{ fontFamily: "Inter", color: "black" }}>00:55 </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      color: "blue",
                      fontWeight: "500",
                      textDecoration: "underline",
                    }}
                  >
                    Resend?
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div
            className="login-right"
            style={{ height: "100%", paddingRight: "8px" }}
          >
            <img src={Car} style={{ borderRadius: "12px" }} alt="Car" />
          </div>
        </div>
      </div>
      <CustomModal
        isVisible={isModalVisible}
        title={modalTitle}
        content={modalContent}
        onOk={() => setIsModalVisible(false)} // Close modal on OK
        onCancel={() => setIsModalVisible(false)}
        singleButton={true} // Close modal on Cancel
      />
    </>
  );
};

export default EnterOTP;
