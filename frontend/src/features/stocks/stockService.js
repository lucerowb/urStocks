import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

// add stock
const addStock = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/api/stocks/", formData, config);
  return response.data.data;
};

// get all stocks
const getStocks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/api/stocks/", config);
  return response.data.data;
};

const stockService = {
  addStock,
  getStocks,
};

export default stockService;
