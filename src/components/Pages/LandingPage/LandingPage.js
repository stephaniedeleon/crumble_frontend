import "./LandingPage.css"

import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';

export default function LandingPage() {

    return (
        <div className="LandingPage">
            <ReactFullpage 
                licenseKey={'CB1EBC8D-DD294A3F-9B019946-25267741'}
                scrollingSpeed = {1000}
                render={({ state, fullpageApi }) => {
                    return (
                    <ReactFullpage.Wrapper>
                        <div className="section hero-section">
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
                                    <h1>Planner</h1>
                                    <p>Helping you make planning bearable!</p>
                                    <br />
                                    {/* as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} */}
                                    <Button onClick={() => fullpageApi.moveSectionDown()} className="startBtn"> Get Started! </Button>
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
                        {/*<button onClick={() => fullpageApi.moveSectionDown()}>
                            Click me to move down
                        </button>*/}
                        </div>
                        <div className="section summary-section">
                            <Container>
                                <Row>
                                    <Col>
                                        <h1> Summary </h1>
                                        <br />
                                        <p>
                                            
                                        </p>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                        </div>
                    </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>
    );
}