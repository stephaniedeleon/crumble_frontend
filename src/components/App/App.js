import "./App.css";

import React, { useState } from "react";
import AuthContext from "context/auth";
import { Navbar, Login, Register, Home } from "components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useApp } from "hooks/useApp";

function App() {

  const [maintabs, setMaintabs] = useState([]);

  const { user, error, setUser, clearAppState } = useApp();

  return (
    <AuthContext.Provider value={{ user, setUser, maintabs }}>
      <div className="App">
        <BrowserRouter>
          <Navbar clearAppState={clearAppState} />

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
