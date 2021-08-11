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
                                    <div className="tile" onClick={() => fullpageApi.moveTo(3, 0)} >
                                        <img src="https://img.icons8.com/bubbles/100/000000/checklist.png" alt="todo list icon"/>
                                        <p>ToDo List</p>
                                    </div>
                                    <div className="tile" onClick={() => fullpageApi.moveTo(4, 0)}>
                                        <img src="https://img.icons8.com/bubbles/100/000000/timeline-week.png" alt="calendar icon"/>
                                        <p>Calendar</p>
                                    </div>
                                </div>

                                <div className="hero">
                                    <h2>Crumble</h2>
                                    <h3>Helping you make planning bearable!</h3>
                                    <br />
                                    {/* as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} */}
                                    <Button onClick={() => fullpageApi.moveSectionDown()} className="startBtn"> Get Started! </Button>
                                </div>

                                <div className="tiles">
                                    <div className="tile" onClick={() => fullpageApi.moveTo(6, 0)}>
                                        <img src="https://img.icons8.com/bubbles/100/000000/notes-app.png" alt="notes icon"/>                    
                                        <p>Notes</p>
                                    </div>
                                    <div className="tile" onClick={() => fullpageApi.moveTo(5, 0)}>
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
                                        <h1> About Crumble </h1>
                                        <br />
                                        <p>
                                            Managing large-scale projects or assignments is difficult due to complex scope and competing priorities. 
                                            Our purpose is to provide users a platform that helps them be more productive, motivated, and less overwhelmed.
                                        </p>
                                        <br />
                                        <Button as={Link} to="/about" className="startBtn"> Learn More </Button>
                                    </Col>
                                    <Col>
                                        <img src="https://img.icons8.com/bubbles/350/000000/edit.png" alt="crumble logo"/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="section todo-section">
                            <Container>
                                <Row>
                                    <Col>
                                        <img src="https://img.icons8.com/bubbles/350/000000/checklist.png" alt="todo list icon"/>                                    </Col>
                                    <Col>
                                        <h1> ToDo List </h1>
                                        <br />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada nisl sed massa venenatis, 
                                            sit amet efficitur felis dapibus. Aliquam bibendum, risus a bibendum porta, libero nulla mollis 
                                            nibh, eget hendrerit orci lorem vitae augue. Mauris in interdum augue. Vivamus vel metus facilisis, 
                                            congue nisl id, blandit lacus. 
                                        </p>
                                        <br />
                                        <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} className="startBtn"> <em>Check</em> It Out! </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="section calendar-section">
                            <Container>
                                <Row>
                                    <Col>
                                        <h1> Calendar </h1>
                                        <br />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada nisl sed massa venenatis, 
                                            sit amet efficitur felis dapibus. Aliquam bibendum, risus a bibendum porta, libero nulla mollis 
                                            nibh, eget hendrerit orci lorem vitae augue. Mauris in interdum augue. Vivamus vel metus facilisis, 
                                            congue nisl id, blandit lacus. 
                                        </p>
                                        <br />
                                        <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} className="startBtn"> <em>Plan</em> It Out! </Button>
                                    </Col>
                                    <Col>
                                        <img src="https://img.icons8.com/bubbles/350/000000/timeline-week.png" alt="calendar icon"/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="section timer-section">
                            <Container>
                                <Row>
                                    <Col>
                                        <img src="https://img.icons8.com/bubbles/350/000000/watches-front-view--v1.png" alt="pomodoro timer icon"/>
                                    </Col>
                                    <Col>
                                        <h1> Pomodoro Timer </h1>
                                        <br />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada nisl sed massa venenatis, 
                                            sit amet efficitur felis dapibus. Aliquam bibendum, risus a bibendum porta, libero nulla mollis 
                                            nibh, eget hendrerit orci lorem vitae augue. Mauris in interdum augue. Vivamus vel metus facilisis, 
                                            congue nisl id, blandit lacus. 
                                        </p>
                                        <br />
                                        <Button as={Link} to={localStorage.getItem('token') ? "/timer" : "/login"} className="startBtn"> <em>Time</em> It Out! </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="section notes-section">
                            <Container>
                                <Row>
                                    <Col>
                                        <h1> Notes </h1>
                                        <br />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada nisl sed massa venenatis, 
                                            sit amet efficitur felis dapibus. Aliquam bibendum, risus a bibendum porta, libero nulla mollis 
                                            nibh, eget hendrerit orci lorem vitae augue. Mauris in interdum augue. Vivamus vel metus facilisis, 
                                            congue nisl id, blandit lacus. 
                                        </p>
                                        <br />
                                        <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} className="startBtn"> <em>Write</em> It Out! </Button>
                                    </Col>
                                    <Col>
                                        <img src="https://img.icons8.com/bubbles/350/000000/notes-app.png" alt="notes icon"/>                    
                                    </Col>
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