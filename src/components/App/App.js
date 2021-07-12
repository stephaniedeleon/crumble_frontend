import "./App.css";

import React from "react";
import { Navbar } from "components"
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
