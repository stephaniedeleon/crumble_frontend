import "./App.css";

import React, { useState } from "react";
import AuthContext from "context/auth";
import { Navbar, Login, Register, Home } from "components"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const [user, setUser] = useState()

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" />
          <Route path="/login" element={ <Login /> }/>
          <Route path="/register" element={ <Register />} />
          <Route path="/home" element={ <Home /> }/>
        </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
