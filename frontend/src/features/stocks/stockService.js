import { fetch, store } from "../../utility/httpUtil";

// add stock
const addStock = async (formData) => {
  const response = await store("api/stocks", formData);
  return response.data.data;
};

// get all stocks
const getStocks = async () => {
  const response = await fetch("api/stocks");
  return response.data.data;
};

const stockService = {
  addStock,
  getStocks,
};

export default stockService;
