import "./App.css";

import React, { useState } from "react";
import AuthContext from "context/auth";
import { Navbar, Login, Register, Home, LandingPage, About, Footer, Timer } from "components";
import { TabPage } from "components/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useApp } from "hooks/useApp";

function App() {

  const { user, setUser, authenticated, setAuthenticated } = useApp();

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [maintabs, setMaintabs] = useState([]);
  const [subtabs, setSubtabs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const [tabNavigationStack, setTabNavigationStack] = useState([])

  // adds id of subtab you are navigating into to stack
  const digIntoTab = (newId) => {
    setTabNavigationStack((oldStack) => [...oldStack, newId])
  }

  // removes id of subtab you are navigating out of from stack
  const moveOutTab = (removeId) => {
    const newStack = tabNavigationStack.filter(id => id !== removeId)
    setTabNavigationStack(newStack)
  }


  return (
    <AuthContext.Provider value={{ user, setUser, authenticated, setAuthenticated, maintabs, setMaintabs, subtabs, setSubtabs, tasks, setTasks, events, setEvents, tabNavigationStack, setTabNavigationStack, digIntoTab, moveOutTab, errors, setErrors, isLoading, setIsLoading }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/home/:mainId/:subId" element={<TabPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
