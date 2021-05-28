import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login/Login";
import SignInSide from "./components/SignInSide";
import Register from "./Login/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashBoard from "./dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import ToastMe from "./components/ToastMe";
import { optionsPost, optionsGet } from "./components/ApiOptions";
import { login, logout, isLogged } from "./components/LoginDataService";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState();

  //GET USER
  const getUser = async () => {
    await axios(optionsGet("/api/user"))
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
        ToastMe("🦄 User was not found");
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
        ToastMe("🦄 Register failed");
      });
  };

  useEffect(() => {
    if (isLogged() && !user) {
      getUser();
    }
  });

  const onLogin = (credentials) => {
    login(credentials).then(() => {
      setUser(getUser());
    });
  };

  const onRegister = async (userInformation) => {
    console.log(userInformation);
    addUser(userInformation);
  };

  const onLogout = () => {
    logout();
    setUser(null);
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
