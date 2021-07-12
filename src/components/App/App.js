import "./App.css";

import React from "react";
import AuthContext from "context/auth";
import { Navbar } from "components"
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <AuthContext.Provider value={{ /*  all the values you want to share throughout the app */ }}>
      <div className="App">
        <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/" />
          <Route path="/login" />
          <Route path="/register" />
          <Route path="/home" />
        </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
