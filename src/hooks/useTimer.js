import { useState, useEffect } from "react";

export const useTimer = () => {


    // Starting Time
    const [timeLimit, setTimeLimit] = useState(1500);
    const [timePassed, setTimePassed] = useState(0);
    // Time Remaining
    const [timeLeft, setTimeLeft] = useState(0);
    // Reference variable for setInterval function
    const [timerInterval, setTimerInterval] = useState(null);
    // Stores the timer state (started, paused, stopped)
    const [timerStatus, setTimerStatus] = useState("stopped");
    // Stores state of timer alert
    const [timerAlertShow, setTimerAlertShow] = useState(false)

    const [circleDasharray, setCircleDasharray] = useState("");
    const [remainingPathColor, setRemainingPathColor] = useState(`green`);

    const [paginationButtonsStatus, setPaginationButtonsStatus] = useState([ ["pomodoro", true], ["shortBreak", false], ["longBreak", false] ]);
    
    const RADIUS = 45;
    const LENGTH = Math.round(2 * Math.PI * RADIUS);

    const timerVariables = {
        timeLimit,
        timePassed,
        timeLeft,
        timerInterval,
        timerStatus,
        circleDasharray,
        remainingPathColor,
        RADIUS,
        timerAlertShow,
        setTimeLimit,
        setTimePassed,
        setTimeLeft,
        setTimerInterval,
        setTimerStatus,
        setCircleDasharray,
        setRemainingPathColor,
        setTimerAlertShow,
      };

      /** Update the timer on page */
      useEffect(() => {
        const updateClock = () => {
          setTimeLeft(timeLimit - timePassed);
          setCircleDasharray((array) => {
            let dasharrayValue = (calculateTimeFraction() * LENGTH).toFixed(0);
            array = `${dasharrayValue >= 0 ? dasharrayValue : 0}, ${LENGTH.toFixed(
              0
            )}`;

            return array;
          });
        };

        const setColor = () => {
          if (timeLeft <= Math.max(timeLimit * 0.04)) setRemainingPathColor("red");
          else if (
            timeLeft > Math.max(timeLimit * 0.04) &&
            timeLeft <= Math.max(timeLimit * 0.2)
          )
            setRemainingPathColor("orange");
          else setRemainingPathColor("green");
        };

        updateClock();
        setColor();

        if (timeLeft <= 0 && timerStatus === 'started') {
          setTimerAlertShow(true);
          stopTimer();
        }

      }, [timeLimit, timeLeft, timePassed, LENGTH]);


    const formatTimeLeft = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
    
        return `${minutes}:${seconds}`;
      };
    
      const startTimer = () => {
        setTimerStatus("started");
        setTimerInterval(
          setInterval(() => {
            setTimePassed((time) => time + 1);
          }, 1000)
        );
      };
    
      const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerStatus("paused");
      };
    
      const stopTimer = () => {
        clearInterval(timerInterval);
        setTimePassed(0);
        setTimerStatus("stopped");
      };

      const calculateTimeFraction = () => {
        const rawTimeFraction = timeLeft / timeLimit;
        return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
      };


    return {
        timerVariables,
        paginationButtonsStatus,
        setPaginationButtonsStatus,
        formatTimeLeft,
        startTimer,
        pauseTimer,
        stopTimer,
        calculateTimeFraction,
    }
}