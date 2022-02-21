import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

// add company
const addCompany = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "/api/companies/",
    formData,
    config
  );
  return response.data.data;
};

// get all companies
const getCompanies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/api/companies/", config);
  return response.data.data;
};

const companyService = {
  addCompany,
  getCompanies,
};

export default companyService;
