import "./App.css";

import React, { useState } from "react";
import AuthContext from "context/auth";
import TimerContext from "context/timer";
import GlobalContext from "context/global"
import { TabPage } from "components/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useApp } from "hooks/useApp";
import { useTimer } from "hooks/useTimer";
import {
  Navbar,
  Login,
  Register,
  Home,
  LandingPage,
  About,
  Profile,
  Footer,
  Timer,
} from "components";
import TimerAlert from "components/pages/TimerAlert/TimerAlert";




function App() {

  const { user, setUser, authenticated, setAuthenticated, tabNavigationStack, setTabNavigationStack, resetTabNavigationStack, digIntoTab, moveOutTab, } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});


  /** VARIABLES */

  const [maintabs, setMaintabs] = useState([]);
  const [subtabs, setSubtabs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);


  /** TIMER VARIABLES */

  const { timerVariables, formatTimeLeft, startTimer, pauseTimer, stopTimer, calculateTimeFraction, paginationButtonsStatus, setPaginationButtonsStatus, togglePaginationBtn } = useTimer();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
        setErrors,
        setIsLoading,
      }}
    >
      <GlobalContext.Provider value={{
        maintabs,
        setMaintabs,
        subtabs,
        setSubtabs,
        tasks,
        setTasks,
        events,
        setEvents,
        notes,
        setNotes,
        tabNavigationStack,
        setTabNavigationStack,
        resetTabNavigationStack,
        digIntoTab,
        moveOutTab, 
      }}>
        <TimerContext.Provider value={{ timerVariables, formatTimeLeft, startTimer, pauseTimer, stopTimer, calculateTimeFraction, paginationButtonsStatus, setPaginationButtonsStatus, togglePaginationBtn }}>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <TimerAlert show={timerVariables.timerAlertShow} onHide={() => timerVariables.setTimerAlertShow(false)} paginationButtonsStatus={paginationButtonsStatus} togglePaginationBtn={togglePaginationBtn} startTimer={startTimer} />

              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/timer" element={<Timer />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home/:mainId/:subId" element={<TabPage />} />
              </Routes>

              <Footer />
            </BrowserRouter>
          </div>
        </TimerContext.Provider>
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
