import React, { useState } from "react";
import "./App.css";
import LoginRegisterUser from "./data-service/LoginRegisterUser";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashBoard from "./dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import { loginStatus } from "./data-service/LoginDataService";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogged, setIsLogged] = useState(loginStatus());

  const logged = () => {
    setIsLogged(loginStatus());
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Route exact path="/">
          {isLogged ? (
            <DashBoard logged={logged} />
          ) : (
            <LoginRegisterUser logged={logged} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
