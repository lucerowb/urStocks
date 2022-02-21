import { LOGGED_IN_USER, JWT_TOKEN } from "../../utility/constants";
import { store } from "../../utility/httpUtil";
import { setLocalStorage, clearLocalStorage } from "../../utility/storageUtil";

// Register user
const register = async (userData) => {
  const response = await store("api/users", userData);
  if (response.data.code == 0) {
    setLocalStorage(LOGGED_IN_USER, response.data.data);
    setLocalStorage(JWT_TOKEN, response?.data?.data?.token);
  }
  return response.data.data;
};

// Login user
const login = async (userData) => {
  const response = await store("api/users/login", userData);
  if (response.data.code == 0) {
    setLocalStorage(LOGGED_IN_USER, response.data.data);
    setLocalStorage(JWT_TOKEN, response?.data?.data?.token);
  }
  return response.data.data;
};

//Logout user
const logout = async () => {
  clearLocalStorage(LOGGED_IN_USER);
  clearLocalStorage(JWT_TOKEN);
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
