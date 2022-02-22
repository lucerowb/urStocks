import axios from "axios";
import { API_URL, LOGGED_IN_USER, JWT_TOKEN } from "./constants";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "./storageUtil";

export const httpBase = () => {
  const api = axios.create({
    // baseURL: `${API_URL}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage(JWT_TOKEN)}`,
    },
    responseType: "json",
  });

  api.interceptors.response.use(
    (response) => {
      if (response.headers && response.headers["Authorization"]) {
        setLocalStorage(
          JWT_TOKEN,
          response.headers["Authorization"]?.split(" ")[1]
        );
      }
      return response;
    },
    (error) => {
      // if (401 === error.response.status) {
      //   clearLocalStorage(JWT_TOKEN);
      //   clearLocalStorage(USER_FULL_NAME);
      //   clearLocalStorage(LOGGED_IN_USER);
      //   clearLocalStorage(PERMISSION_KEY);
      //   history.push("/");
      // }
      // if (404 === error.response.status) {
      //   history.push("/404");
      // }
      // if (500 === error.response.status) {
      //   history.push("/500");
      // }
      return Promise.reject(error);
    }
  );

  return api;
};
