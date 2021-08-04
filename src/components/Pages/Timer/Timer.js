import React, { useContext, useState } from "react";
import "./Timer.css";
import TimerContext from "context/timer";

export default function Timer() {
  const { timerVariables, formatTimeLeft, startTimer, pauseTimer, stopTimer } =
    useContext(TimerContext);

  const { timeLeft, timerStatus, circleDasharray, remainingPathColor, RADIUS } =
    timerVariables;

  const [paginationButtonsStatus, setPaginationButtonsStatus] = useState([ ["promodoro", false], ["shortBreak", false], ["longBreak", false] ]);



  const toggleButton = (event) => {
    if (timerStatus === "stopped" || timerStatus === "paused") {
      startTimer();
    } else if (timerStatus === "started") {
      pauseTimer();
    }
  };

  const togglePaginationBtn = (event) => {
    const btnName = event.target.getAttribute('name')

    stopTimer()
    setTimerMode(btnName)
    const newArray = paginationButtonsStatus.map((element) => {
      if (element[0] === btnName) {
          element[1] = true
      }
      else {
        element[1] = false
      }
      
      return element;
    })

    setPaginationButtonsStatus(newArray)
    
  };

  /** Setting: "promodoro", "shortBreak", "longBreak" */
  const setTimerMode = (setting) => {
    switch (setting) {
      case "promodoro":
        timerVariables.setTimeLimit(1500)
        break;

      case "shortBreak":
        timerVariables.setTimeLimit(300)
        break;

      case "longBreak":
        timerVariables.setTimeLimit(900)
        break;

      default:
        break;
    }
  }

  return (
    <div className="Timer">
      <div className="timer-grid">
        <div className="options-pagination" style={{ userSelect: "none" }}>

          <div
            name="promodoro"
            className={`pagination-button ${
              paginationButtonsStatus[0][1] ? "clicked" : ""
            }`}
            onClick={togglePaginationBtn}
          >
            Promodoro
          </div>

          <div
            name="shortBreak"
            className={`pagination-button ${
              paginationButtonsStatus[1][1] ? "clicked" : ""
            }`}
            onClick={togglePaginationBtn}
          >
            Short Break
          </div>

          <div
            name="longBreak"
            className={`pagination-button ${
              paginationButtonsStatus[2][1] ? "clicked" : ""
            }`}
            onClick={togglePaginationBtn}
          >
            Long Break
          </div>
        </div>

        <div className="base-timer grid-item">
          <svg
            className="base-timer-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="base-timer-circle">
              <circle
                className="base-timer-path-elapsed"
                cx="50%"
                cy="50%"
                r={RADIUS.toString()}
                style={timeLeft === 0 ? { color: "red" } : { color: "grey" }}
              />

              <path
                strokeDasharray="283"
                className={`base-timer-path-remaining ${remainingPathColor}`}
                d="
                      M 50, 50
                      m -45, 0
                      a 45,45 0 1,0 90,0
                      a 45,45 0 1,0 -90,0
                  "
                style={{
                  strokeDasharray: circleDasharray,
                  strokeLinecap: "none",
                }}
              ></path>
            </g>
          </svg>

          <span className="base-timer-label" style={{ userSelect: "none" }}>
            {formatTimeLeft(timeLeft)}
          </span>
        </div>

        <div className="controlBtns grid-item">
          <h6
            className={`clockBtn ${timerStatus}`}
            onClick={toggleButton}
            style={{ userSelect: "none" }}
          >
            <div className="btnTextContainer">
              {timerStatus === "started" ? "Pause" : "Start"}
            </div>
          </h6>

          <div className={`resetButton ${timerStatus}`} onClick={stopTimer}>
            <i className="bi-skip-end-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
