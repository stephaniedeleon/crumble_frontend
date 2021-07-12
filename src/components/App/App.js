import "./App.css";

import React from "react";
import AuthContext from "context/auth";
import { Navbar, Login, Register } from "components"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthContext.Provider value={{ /*  all the values you want to share throughout the app */ }}>
      <div className="App">
        <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" />
          <Route path="/login" element={ <Login /> }/>
          <Route path="/register" element={ <Register />} />
          <Route path="/home" />
        </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
