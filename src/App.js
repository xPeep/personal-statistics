import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login/Login";

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

function App() {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);
  const [user, setUser] = useState([]);
  const [fetchError] = useState(null);

  const options = {
    url: `${apiUrl}/login`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: "admin",
      password: "admin",
    },
  };

  const getJwt = async () => {
    await axios(options)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.headers.authorization);
        setJwt(res.headers.authorization);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUser = async () => {
    await axios
      .get(`${apiUrl}/api/user/get`)
      .then((res) => {
        console.log(res);
        setJwt(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section style={{ marginBottom: "10px" }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        <button onClick={() => getUser()}>Get User</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
        <Login></Login>
      </section>
      <section>

        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      </section>
    </>
  );
}
export default App;
