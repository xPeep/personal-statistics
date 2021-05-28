import axios from "axios";

const apiUrl = "http://localhost:8080";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem("token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const optionsPost = (object, api) => {
  return {
    url: `${apiUrl}${api}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: object,
  };
};

const optionsGet = (api) => {
  return {
    url: `${apiUrl}${api}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export {optionsPost, optionsGet}