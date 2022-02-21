import { fetch, store, update } from "../../utility/httpUtil";

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
// get company by id
const getCompanyById = async (id) => {
  const response = await fetch(`api/companies/${id}`);
  return response.data.data;
};
// update company by id
const updateCompany = async (id, formData) => {
  const response = await update(`api/companies/${id}`, formData);
  return response.data.data;
};

const companyService = {
  addCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
};

export default companyService;
