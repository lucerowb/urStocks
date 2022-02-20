import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "/api/users/", userData);
  if ((response.data.code = 0)) {
    localStorage.setItem("urstocks-user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "/api/users/login", userData);
  if ((response.data.code = 0)) {
    localStorage.setItem("urstocks-user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};

//Logout user
const logout = async () => {
  localStorage.removeItem("urstocks-user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
