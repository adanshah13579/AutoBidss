import React, { useState } from "react";
import "./Login.css";
import Car from "../../../assets/Auth/Car.svg";
import { Input, Spin, message } from "antd";
import { UserOutlined, LockFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginRoute } from "../../../../RESTAPI/Authentication/AuthenticationRoutes";
import Cookies from "js-cookie";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Start login process
    setLoading(true);

    const loginCredentials = { email, password };
    const result = await LoginRoute(loginCredentials);

    if (result?.success) {
      // Set Cookies and show success notification
      Cookies.set("token", result?.data?.token, { expires: 7 });
      Cookies.set("email", result?.data?.email, { expires: 7 });
      Cookies.set("userId", result?.data?.payload?.userId, { expires: 7 });
      Cookies.set("userType", result?.data?.payload?.userType, { expires: 7 });
      Cookies.set("name", result?.data?.payload?.name, { expires: 7 });

      setLoading(false); // End login process

      message.success("You have successfully logged in.");

      // Redirect after 2 seconds
      setTimeout(() => navigate("/home"), 2000);
    } else {
      // Handle wrong password or other errors
      if (result?.error === "Incorrect password") {
        message.error("Wrong password. Please try again.");
      } else {
        message.error(result?.error || "Login failed. Please try again."); // General error message
      }
      setLoading(false); // End login process
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <div className="inner">
            <div className="headDiv">
              <h1 className="heading">Drivebidz</h1>
              <h2 className="heading2">Login</h2>
              <p style={{ marginBottom: "5px" }}>
                Please login to continue to your account.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <label
                style={{ display: "flex", justifyContent: "start" }}
                htmlFor="email"
              >
                Email
              </label>

              <Input
                prefix={<UserOutlined style={{ margin: 5 }} />}
                style={{ height: 45 }}
                type="email"
                id="email"
                placeholder="example@drivebidz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label
                style={{ display: "flex", justifyContent: "start" }}
                htmlFor="password"
              >
                Password
              </label>
              <div className="password-container">
                <Input.Password
                  style={{ height: 45 }}
                  prefix={<LockFilled style={{ margin: 5 }} />}
                  placeholder="Password"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  justifyContent: "right",
                  justifyItems: "right",
                  width: "100%",
                }}
                className="login-options"
              >
                <div>
                  <Link
                    to="/forgotPassword"
                    style={{ fontSize: 14, fontFamily: "Outfit" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button type="submit" className="login-button">
                {loading ? <Spin /> : "Login"}
              </button>
            </form>
            <Link to={"/signup"}>
              <p className="create-account">
                Need an account? <a href="#">Create one</a>
              </p>
            </Link>
          </div>
        </div>
        <div className="login-right">
          <img src={Car} alt="Car" />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
