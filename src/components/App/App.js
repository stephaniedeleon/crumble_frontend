import "./App.css";

import React, { useState } from "react";
import AuthContext from "context/auth";
import { Navbar, Login, Register, Home } from "components";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useApp } from "hooks/useApp";
import apiClient from "services/apiClient";

function App() {

  const [maintabs, setMaintabs] = useState([]);
  const { user, setUser, setErrors, authenticated, setAuthenticated } = useApp();

  //adds a new maintab to list of maintabs
  const addMaintab = (newMaintab) => {
    setMaintabs((oldMaintabs) => [newMaintab, ...oldMaintabs])
  }



  return (
    <AuthContext.Provider value={{ user, setUser, authenticated, setAuthenticated, maintabs }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home setMaintabs={setMaintabs} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
