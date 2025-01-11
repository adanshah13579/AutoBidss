import axios from "axios";
import { baseuri } from "../../BaseUri/baseuri";

export const fetchallcars = async () => {
  try {
    const response = await axios.get(`${baseuri}/cars/getallcars`);  

    console.log("response", response); 

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,  
      };
    } else {
      
      return {
        error: "Failed to fetch cars. Please try again.",
        success: false,
      };
    }
  } catch (error) {
    
    console.log("Error while fetching cars:", error);

    
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
  

export const filteredCars = async (filters, page = 1, limit = 10) => {
  try {
    // Construct query parameters
    const params = {
      minPrice: filters.priceRange.min || undefined,
      maxPrice: filters.priceRange.max || undefined,
      minYear: filters.year.from || undefined,
      maxYear: filters.year.to || undefined,
      minMileage: filters.mileage.min || undefined,
      maxMileage: filters.mileage.max || undefined,
      locations: filters.city.length ? filters.city.join(",") : undefined, // Ensure non-empty value
      makes: filters.make.length ? filters.make.join(",") : undefined, // Ensure non-empty value
      registeredIn: filters.registeredIn.length ? filters.registeredIn.join(",") : undefined, // Ensure non-empty value
      transmissions: filters.transmission.length ? filters.transmission.join(",") : undefined, // Ensure non-empty value
      page,
      limit,
    };

    
    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

  
    const queryString = new URLSearchParams(params).toString();

  
    const response = await axios.get(`${baseuri}/search/searchFilter?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered cars:", error);
    return { success: false, error: error.message };
  }
};

export const searchCar = async (searchValue, page = 1, limit = 10) => {
  try {

    const params = {
      makes: searchValue || undefined,  
      page,
      limit,
    };
    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${baseuri}/search/searchFilter?${queryString}`);
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error searching for cars:", error);
    return { success: false, error: error.message };
  }
};

export const locationCar = async (searchValue, page = 1, limit = 10) => {
  try {

    const params = {
      locations: searchValue || undefined,  
      page,
      limit,
    };
    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${baseuri}/search/searchFilter?${queryString}`);
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error searching for cars:", error);
    return { success: false, error: error.message };
  }
};


export const logoCar = async (makes, page = 1, limit = 10) => {
  try {

    const params = {
      makes: makes || undefined,  
      page,
      limit,
    };
    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${baseuri}/search/searchFilter?${queryString}`);
    console.log("api ",response.data);
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error searching for cars:", error);
    return { success: false, error: error.message };
  }
};