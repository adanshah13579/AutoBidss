import axios from "axios";
import { baseuri } from "../../BaseUri/baseuri";

export const LoginRoute = async (loginCredentials, navigate) => {
  try {
    const response = await axios.post(
      `${baseuri}/auth/login`,
      loginCredentials
    );

    // Check if the response is successful
    if (response.status === 200) {
      return { success: true,data:response?.data };
    } else {
      return {
        error: "Login failed. Please check your credentials.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error.response?.data?.message || error.message,
      success: false,
    };
  }
};

export const SendOtpRoute = async (email, navigate) => {
  try {
    const response = await axios.post(`${baseuri}/otp/send-otp`, { email });

    // Check if the response is successful
    if (response.status === 200) {

      // Navigate to the OTP page for entering the OTP
      if (navigate) {
        navigate("/otp"); // Redirect to OTP page
      }

      return { success: true };
    } else {
      return {
        error: "Failed to send OTP. Please check the email.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      error: error.response?.data?.message || error.message,
      success: false,
    };
  }
};

export const VerifyOtpRoute = async (otp, email, navigate) => {
  try {
    const response = await axios.post(`${baseuri}/otp/verify-otp`, {
      otp,
      email,
    });

    if (response.status === 200) {
      console.log("OTP verified successfully:", response.data);

      if (navigate) {
        navigate("/home"); 
      }

      return { success: true };
    } else {
      return {
        error: "OTP verification failed. Please check your OTP.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      error: error.response?.data?.message || error.message,
      success: false,
    };
  }
};

export const ResetPasswordRoute = async (email, newPassword) => {
  try {
    const response = await axios.post(`${baseuri}/auth/reset-password`, {
      email,
      newPassword,
    });

    if (response.status === 200) {
      console.log("Password reset successful:", response?.data);
      return { success: true };
    } else {
      return {
        error: "Failed to reset password. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    console.log("Error during password reset:", error);
    return {
      error: error.response?.data?.message || error.message,
      success: false,
    };
  }
};
