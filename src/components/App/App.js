import "./App.css";

import React, { useState } from "react";
import AuthContext from "context/auth";
import { Navbar, Login, Register, Home, LandingPage } from "components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useApp } from "hooks/useApp";

function App() {

  const [maintabs, setMaintabs] = useState([]);
  const { user, setUser, authenticated, setAuthenticated } = useApp();

  //adds a new maintab to list of maintabs
  const addMaintab = (newMaintab) => {
    setMaintabs((oldMaintabs) => [newMaintab, ...oldMaintabs])
  }



  return (
    <AuthContext.Provider value={{ user, setUser, authenticated, setAuthenticated, maintabs, setMaintabs }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />}/>
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
