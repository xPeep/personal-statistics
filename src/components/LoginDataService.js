import ToastMe from "./ToastMe";
import axios from "axios";
import { optionsPost } from "./ApiOptions";

const login = (credentials) => {
  return axios(optionsPost(credentials, "/login"))
    .then((res) => {
      localStorage.setItem("token", res.headers.authorization);
    })
    .catch((error) => {
      console.error(error);
      ToastMe("Credentials are not valid");
    });
};

const isLogged = () => {
  return localStorage.getItem("token") != null;
};

const logout = () => {
  localStorage.clear();
};

export { login, logout, isLogged };
