import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/home" />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
