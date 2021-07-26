import { colors } from "@material-ui/core"
import { useEffect, useState } from "react"
import "./Timer.css"



export default function Timer () {

    // Starting Time
    const [timeLimit, setTimeLimit] = useState(10)
    const [timePassed, setTimePassed] = useState(0)
    // Time Remaining
    const [timeLeft, setTimeLeft] = useState(0)
    // Reference variable for setInterval function
    const [timerInterval, setTimerInterval] = useState(null)

    const [circleDasharray, setCircleDasharray] = useState("hello")
    const RADIUS = 45
    const LENGTH = 2 * Math.PI * RADIUS


    
    const formatTimeLeft = (time) => {
        const minutes = Math.floor(time / 60)
        let seconds = time % 60

        if (seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${minutes}:${seconds}`;
    }

    const startTimer = () => {

        setTimerInterval(
            setInterval(() => {

                setTimePassed((time) => time + 1)
            }, 1000)
        )
    }

    const stopTimer = () => {
        clearInterval(timerInterval)
        // setTimePassed(0)
    }

    /** Update the timer on page */
    useEffect (() => {
        const updateClock = () => {

            setTimeLeft(timeLimit - timePassed)
            setCircleDasharray((array) => {

                let dasharrayValue = (calculateTimeFraction() * LENGTH).toFixed(0);
                array = `${ dasharrayValue >= 0 ?
                    dasharrayValue
                :
                    0   
                }, ${LENGTH.toFixed(0)}`;

                return array;
            })
        }

        updateClock()
        if (timeLeft <= 0) 
            stopTimer()

    }, [timeLimit, timeLeft, timePassed, LENGTH])

    
    const calculateTimeFraction = () => {
        const rawTimeFraction = timeLeft / timeLimit;
        return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    }

    let remainingPathColor = "green";

    return (
        <div className="Timer">
            <div className="base-timer">
                <svg className="base-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer-circle">
                        <circle className="base-timer-path-elapsed" cx="50%" cy="50%" r={RADIUS.toString()} style={timeLeft === 0 ? { color: "red"} : {color: "grey"}} />
                        
                        <path
                            strokeDasharray="283"
                            className={`base-timer-path-remaining`}
                            d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0
                            "
                            style={{ strokeDasharray: circleDasharray, strokeLinecap: "none" }}
                        ></path>
                    </g>                    
                </svg>

                <span class="base-timer-label">
                    {formatTimeLeft(timeLeft)}
                </span>

                <button onClick={startTimer}>start</button>
                <button onClick={stopTimer}>stop</button>

            </div>
        </div>
    )
}