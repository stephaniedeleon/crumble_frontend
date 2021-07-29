import React, { useContext } from "react";
import "./Timer.css";
import TimerContext from "context/timer";

export default function Timer() {
  const { timerVariables, formatTimeLeft, startTimer, pauseTimer, stopTimer } = useContext(TimerContext);

  const {
    timeLeft,
    timerStatus,
    circleDasharray,
    remainingPathColor,
    RADIUS,
  } = timerVariables;

  const toggleButton = (event) => {
    if (timerStatus === 'stopped' || timerStatus === 'paused') {
      startTimer()
    }
    else if (timerStatus === 'started') {
      pauseTimer()
    }
  }


  return (
    <div className="Timer">
      <div className="base-timer">
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

        <span class="base-timer-label" style={{ userSelect: 'none' }}>{formatTimeLeft(timeLeft)}</span>

        <div className="controlBtns">
          <h6
            className={`clockBtn ${timerStatus}`}
            onClick={toggleButton}
            style={{ userSelect: 'none' }}
          >
            <div className="btnTextContainer">
              {timerStatus === 'started' ?
                "Pause"
                :
                "Start"
              }
            </div>
          </h6>

          <div className={`resetButton ${timerStatus}`}>
            <i class="bi-skip-end-fill"></i>
          </div>

        </div>
      </div>
      
    </div>
  );
}
