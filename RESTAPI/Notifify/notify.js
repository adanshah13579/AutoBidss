import axios from "axios";
import { baseuri } from "../../BaseUri/baseuri";



export const fetchUserNotifications = async (userId, page = 1, limit = 10) => {
  try {
    // Making the GET request to fetch user's notifications
    const response = await axios.get(`${baseuri}/notifications/myNotifications/${userId}?page=${page}&limit=${limit}`);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,  // Returning the fetched data
      };
    } else {
      // In case the status is not 200, return an error message
      return {
        error: "Failed to fetch notifications. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    // Log and return error details in case of failure
    console.log("Error while fetching notifications:", error);
    return {
      error: error.response?.data?.message || error.message,  // Return a more detailed error if available
      success: false,
    };
  }
};

export const checkUnreadNotifications = async (userId) => {
  try {
    const response = await axios.get(`${baseuri}/notifications/hasUnreadNotifications/${userId}`);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,  // Returning the fetched data
      };
    } else {
      // In case the status is not 200, return an error message
      return {
        error: "Failed to check unread notifications. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    // Log and return error details in case of failure
    console.log("Error while checking unread notifications:", error);
    return {
      error: error.response?.data?.message || error.message,  // Return a more detailed error if available
      success: false,
    };
  }
};