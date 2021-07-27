import { useState } from "react";

export const useTimer = () => {


    // Starting Time
    const [timeLimit, setTimeLimit] = useState(20);
    const [timePassed, setTimePassed] = useState(0);
    // Time Remaining
    const [timeLeft, setTimeLeft] = useState(0);
    // Reference variable for setInterval function
    const [timerInterval, setTimerInterval] = useState(null);
    // Stores the timer state (started, paused, stopped)
    const [timerStatus, setTimerStatus] = useState("stopped");

    const [circleDasharray, setCircleDasharray] = useState("");
    const [remainingPathColor, setRemainingPathColor] = useState(`green`);

    const timerVariables = {
        timeLimit,
        timePassed,
        timeLeft,
        timerInterval,
        timerStatus,
        circleDasharray,
        remainingPathColor,
        setTimeLimit,
        setTimePassed,
        setTimeLeft,
        setTimerInterval,
        setTimerStatus,
        setCircleDasharray,
        setRemainingPathColor
      };


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
        formatTimeLeft,
        startTimer,
        pauseTimer,
        stopTimer,
        calculateTimeFraction,
    }
}