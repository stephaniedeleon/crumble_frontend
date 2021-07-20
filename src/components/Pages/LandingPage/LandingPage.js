import "./LandingPage.css"

import {Footer} from "components";

export default function LandingPage() {

    return (
        <div className="LandingPage">

            <div className="main">
                <div className="tiles">
                    <div className="tile" >
                        <img src="https://img.icons8.com/bubbles/100/000000/checklist.png" alt="todo list icon"/>
                        <p>ToDo List</p>
                    </div>
                    <div className="tile">
                        <img src="https://img.icons8.com/bubbles/100/000000/timeline-week.png" alt="calendar icon"/>
                        <p>Calendar</p>
                    </div>
                </div>

                <div className="hero">
                    {/* <img src="https://img.icons8.com/bubbles/400/000000/edit.png" alt="a fitbit" /> */}
                    <h1>Planner</h1>
                    <p>Helping you make planning bearable!</p>
                </div>

                <div className="tiles">
                    <div className="tile">
                        <img src="https://img.icons8.com/bubbles/100/000000/notes-app.png" alt="notes icon"/>                    
                        <p>Notes</p>
                    </div>
                    <div className="tile">
                        <img src="https://img.icons8.com/bubbles/100/000000/watches-front-view--v1.png" alt="pomodoro timer icon"/>
                        <p>Pomodoro Timer</p>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}