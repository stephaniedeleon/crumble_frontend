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
                                            <Button as={Link} to="/about" onClick={() => fullpageApi.moveTo(1)} className="startBtn"> Learn More </Button>
                                        </Col>
                                        <Col>
                                            <img src="https://previews.123rf.com/images/njnightsky/njnightsky0709/njnightsky070900032/1599802-a-yellow-pencil-on-a-day-planner.jpg" alt="study" height="350" width="350" className="stock-image" />
                                        </Col>
                                    </Row>
                                </Container>
                                <button onClick={() => fullpageApi.moveTo(1)}> Move To Top </button>
                            </div>
                            <div className="section todo-section">
                                <Container>
                                    <Row>
                                        <Col>
                                            <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2704&q=80" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
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
                                            <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Check</em> It Out! </Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <button onClick={() => fullpageApi.moveTo(1)}> Move To Top </button>
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
                                            <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Plan</em> It Out! </Button>
                                        </Col>
                                        <Col>
                                            <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2704&q=80" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
                                    </Row>
                                </Container>
                                <button onClick={() => fullpageApi.moveTo(1)}> Move To Top </button>
                            </div>
                            <div className="section timer-section">
                                <Container>
                                    <Row>
                                        <Col>
                                            <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2704&q=80" alt="todo" height="350" width="350" className="stock-image" />
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
                                            <Button as={Link} to={localStorage.getItem('token') ? "/timer" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Time</em> It Out! </Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <button onClick={() => fullpageApi.moveTo(1)}> Move To Top </button>
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
                                            <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Write</em> It Out! </Button>
                                        </Col>
                                        <Col>
                                            <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2704&q=80" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
                                    </Row>
                                </Container>
                                <button onClick={() => fullpageApi.moveTo(1)}> Move To Top </button>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>
    );
}