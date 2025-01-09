import axios from "axios";
import { baseuri } from "../../BaseUri/baseuri";

export const fetchallcars = async () => {
  try {
    const response = await axios.get(`${baseuri}/cars/getallcars`);  

    console.log("response", response);  // Logs the full response object for debugging

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,  // Returning the fetched data
      };
    } else {
      // In case the status is not 200, return a generic error message
      return {
        error: "Failed to fetch cars. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    // Log and return error details in case of failure
    console.log("Error while fetching cars:", error);

    // Handle cases where error.response might not be defined
    const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
    return {
      error: errorMessage,  // Return the most relevant error message
      success: false,
    };
  }
};



export const fetchearliestcar = async () => {
    try {
      const response = await axios.get(`${baseuri}/cars/getearliestcars`);  
  
      console.log("response", response);  // Logs the full response object for debugging
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,  // Returning the fetched data
        };
      } else {
        // In case the status is not 200, return a generic error message
        return {
          error: "Failed to fetch cars. Please try again.",
          success: false,
        };
      }
    } catch (error) {
      // Log and return error details in case of failure
      console.log("Error while fetching cars:", error);
  
      // Handle cases where error.response might not be defined
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
      return {
        error: errorMessage,  // Return the most relevant error message
        success: false,
      };
    }
  };



export const fetchSimilarCars = async (carId) => {
  try {
    const response = await axios.get(`${baseuri}/cars/getsimilarcars`, {
      params: { carId },
    });

    console.log("response", response); 

    
    if (response.status === 200) {
      return {
        success: true,
        data: response.data, 
      };
    } else {
     
      return {
        error: "Failed to fetch similar cars. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    console.log("Error while fetching similar cars:", error);

    const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
    return {
      error: errorMessage, 
      success: false,
    };
  }
};
  