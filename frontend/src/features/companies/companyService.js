import { fetch, store } from "../../utility/httpUtil";

// add company
const addCompany = async (formData) => {
  const response = await store("api/companies", formData);
  return response.data.data;
};

// get all companies
const getCompanies = async () => {
  const response = await fetch("api/companies");
  return response.data.data;
};

const companyService = {
  addCompany,
  getCompanies,
};

export default companyService;
