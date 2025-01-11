// ResetPass.jsx
import React, { useState } from "react";
import "./ResetPass.css";
import Car from "../../../assets/Auth/Car.svg";
import { Input } from "antd";
import { UserOutlined, LockFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordRoute } from "../../../../RESTAPI/Authentication/AuthenticationRoutes";

const ResetPass = () => {
  const [newPass, setNewPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordVisible1, setPasswordVisible1] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state || {};
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!newPass || !newPass1) {
      alert("Please Enter New Password and Confirm Password");
      return;
    }
    if (newPass !== newPass1) {
      alert("Passwords do not match");
      return;
    }

    // Set loading state while waiting for API response
    setLoading(true);

    try {
      // Call the API to reset the password
      const response = await ResetPasswordRoute(email, newPass);

      if (response?.success) {
        // Password reset successful, navigate to login page
        alert("Password reset successful. You can now log in.");
        navigate("/login");
      } else {
        // Handle failure (e.g., invalid OTP or email)
        alert(response?.error);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("An error occurred. Please try again later.");
    }

    // Reset loading state and password fields
    setLoading(false);
    setNewPass("");
    setNewPass1("");
  };
  return (
    <div className="login-container" style={{ padding: 0 }}>
      <div className="login-content" style={{ height: "90%", padding: 0 }}>
        <div className="login-left1">
          <div className="inner">
            <div className="headDiv">
              <h1 className="heading">Drivebidz</h1>
              <h2 className="heading2">Reset Password</h2>
              <p>Enter your new password.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label>New Password</label>

              <Input.Password
                style={{ height: 45 }}
                prefix={<LockFilled style={{ margin: 5 }} />}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                type="password"
                id="pass"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              />

              <label htmlFor="password ">Confirm New Password</label>

              <Input.Password
                style={{ height: 45 }}
                prefix={<LockFilled style={{ margin: 5 }} />}
                visibilityToggle={{
                  visible: passwordVisible1,
                  onVisibleChange: setPasswordVisible1,
                }}
                placeholder="Confirm New Password"
                value={newPass1}
                onChange={(e) => setNewPass1(e.target.value)}
                required
              />

              <button type="submit" className="login-button">
                Reset Password
              </button>
            </form>
          </div>
        </div>
        <div
          className="login-right"
          style={{ height: "100%", paddingRight: "8px" }}
        >
          <img src={Car} alt="Car" style={{ borderRadius: "12px" }} />
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
