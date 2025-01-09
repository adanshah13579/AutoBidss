import axios from "axios";
import { baseuri } from "../../BaseUri/baseuri";
import Cookies from "js-cookie";  // Make sure this points to your actual base URI

export const fetchUserAds = async (userId, page = 1, limit = 10) => {
  try {
    // Making the GET request to fetch user's ads
    const response = await axios.get(`${baseuri}/cars/myadds/${userId}?page=${page}&limit=${limit}`);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,  // Returning the fetched data
      };
    } else {
      // In case the status is not 200, return an error message
      return {
        error: "Failed to fetch ads. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    // Log and return error details in case of failure
    return {
      error: error.response?.data?.message || error.message,  // Return a more detailed error if available
      success: false,
    };
  }
};

export const fetchUserWatchlist = async (userId, page = 1, limit = 10) => {
  try {
    // Making the GET request to fetch user's watchlist
    const response = await axios.get(`${baseuri}/cars/watchlist/${userId}?page=${page}&limit=${limit}`);
    

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,  // Returning the fetched data (the cars in the watchlist)
      };
    } else {
      // In case the status is not 200, return an error message
      return {
        error: "Failed to fetch watchlist. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    // Log and return error details in case of failure
    return {
      error: error.response?.data?.message || error.message,  // Return a more detailed error if available
      success: false,
    };
  }
};




export const changeUserPassword = async (newPassword, confirmPassword) => {
  try {
    const token = Cookies.get("token"); // Retrieve the token from cookies

    if (!token) {
      return { error: "You are not authenticated. Please log in.", success: false };
    }

 
    const response = await axios.put(
      `${baseuri}/profiles/change-password`,
      { newPassword, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token  // Correct format
        },
      }
    );
    

    console.log("response", response);  // Logs the full response object for debugging

    if (response.status === 200) {
      console.log("Password changed successfully:", response?.data);
      return {
        success: true,
        message: response.data.msg,
      };
    } else {
      return {
        error: "Failed to change password. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    console.log("Error while changing password:", error);
    return {
      error: error?.response?.data?.msg || error.message,
      success: false,
    };
  }
};


export const fetchProfileData = async (setLoading, setError, setProfileData, setInitialProfileData) => {
  setLoading(true);
  setError(null);

  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${baseuri}/profiles/profile`, {
      headers: {
        "x-auth-token": token,
      },
    });
    setProfileData(response.data);
    setInitialProfileData(response.data);
  } catch (err) {
    setError("Failed to fetch profile data");
  } finally {
    setLoading(false);
  }
};

export const fetchCarDetails = async (carId, setLoading, setError, setCarDetails) => {
  setLoading(true); // Start loading
  setError(null); 

  try {
    const response = await axios.get(`${baseuri}/cars/getspecificcar/${carId}`); 
    console.log("response ", response.data)
    if (response.status === 200) {
      setCarDetails(response.data); 
      
    } else {
      setError("Failed to fetch car details"); 
    }
  } catch (err) {
    setError("Error fetching car details");
  } finally {
    setLoading(false); 
  }
};
