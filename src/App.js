import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login/Login";
import SignInSide from "./components/SignInSide";
import Register from "./Login/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from "./components/Button";
import DashBoard from "./dashboard/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  let storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);
  const [user, setUser] = useState();

  //GET JWT
  const getJwt = async (credentials) => {
    await axios(optionsPost(credentials, "/login"))
      .then((res) => {
        localStorage.setItem("token", res.headers.authorization);
        setJwt(res.headers.authorization);
      })
      .catch((error) => {
        console.error(error);
        toastMe();
      });
  };

  const toastMe = () => {
    toast.error("🦄 User was not found", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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

  //GET USER
  const getUser = () => {
    return new Promise((resolve, reject) => {
      axios(optionsGet("/api/user"))
        .then((res) => {
          setUser(res.data);
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
          toast.error("🦄 User was not found", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    });
  };

  //ADD USER
  const addUser = async (userInfo) => {
    await axios(optionsPost(userInfo, "/api/user"))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
        toast.error("🦄 User was not found", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    if (jwt && !user) {
      getUser();
    }
  }, [jwt]);

  const onLogin = async (credentials) => {
    await getJwt(credentials);
    const localUser = await getUser();
    setUser(localUser);
    console.log(localUser);
  };

  const onRegister = async (userInformation) => {
    console.log(userInformation);
    addUser(userInformation);
  };

  const onLogout = () => {
    setJwt(null);
    localStorage.clear();
    setUser(null);
    storedJwt = null;
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Route exact path="/">
          {user && user.username ? (
            <div className="container-log">
              <DashBoard onLogout={onLogout} />
            </div>
          ) : (
            <SignInSide onLogin={onLogin} onRegister={onRegister} />
          )}
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
