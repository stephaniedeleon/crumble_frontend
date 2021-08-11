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
                                            <h1> About <span className="crumbleHeader">Crumble</span> </h1>
                                            <br />
                                            <p>
                                                Managing large-scale projects or assignments is difficult due to complex scope and competing priorities. 
                                                Our purpose is to provide users a platform that helps them be more productive, motivated, and less overwhelmed.
                                            </p>
                                            <br />
                                            <Button as={Link} to="/about" onClick={() => fullpageApi.moveTo(1)} className="startBtn"> Learn More </Button>
                                        </Col>
                                        <Col>
                                            <img src="https://img.icons8.com/bubbles/350/000000/edit.png" alt="study" height="350" width="350" className="stock-image" />
                                        </Col>
                                    </Row>
                                </Container>
                                <div className="moveToTop" onClick={() => fullpageApi.moveTo(1)}><i class="bi-chevron-double-up"></i></div>
                            </div>
                            <div className="section todo-section">
                                <Container>
                                    <Row>
                                        <Col>
                                            <img src="https://img.icons8.com/bubbles/350/000000/checklist.png" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
                                        <Col>
                                            <h1> ToDo List </h1>
                                            <br />
                                            <p>
                                                <span className="crumble">Crumble's</span> ToDo List is what allows you to <span className="crumbling">"crumble"</span>. 
                                                Here, you can add subtabs and tasks; and check them off as you go. You can assign priority and due dates as well. 
                                            </p>
                                            <br />
                                            <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Check</em> It Out! </Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <div className="moveToTop" onClick={() => fullpageApi.moveTo(1)}><i class="bi-chevron-double-up"></i></div>
                            </div>
                            <div className="section calendar-section">
                                <Container>
                                    <Row>
                                        <Col>
                                            <h1> Calendar </h1>
                                            <br />
                                            <p>
                                                <span className="crumble">Crumble's</span> Calendar allows you to add events/due dates. It is synced with the ToDo list as well. If you assign a due date 
                                                to a task, it will automatically add it as an event to your calendar.
                                            </p>
                                            <br />
                                            <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Plan</em> It Out! </Button>
                                        </Col>
                                        <Col>
                                            <img src="https://img.icons8.com/bubbles/350/000000/timeline-week.png" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
                                    </Row>
                                </Container>
                                <div className="moveToTop" onClick={() => fullpageApi.moveTo(1)}><i class="bi-chevron-double-up"></i></div>
                            </div>
                            <div className="section timer-section">
                                <Container>
                                    <Row>
                                        <Col>
                                            <img src="https://img.icons8.com/bubbles/350/000000/watches-front-view--v1.png" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
                                        <Col>
                                            <h1> Pomodoro Timer </h1>
                                            <br />
                                            <p>
                                                <span className="crumble">Crumble's</span> Pomodoro timer reminds you when to work or when to take a breather. 
                                                With the timer accessible from anywhere you go, you have more flexibility on how you manage your time.
                                            </p>
                                            <br />
                                            <Button as={Link} to={localStorage.getItem('token') ? "/timer" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Time</em> It Out! </Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <div className="moveToTop" onClick={() => fullpageApi.moveTo(1)}><i class="bi-chevron-double-up"></i></div>
                            </div>
                            <div className="section notes-section">
                                <Container>
                                    <Row>
                                        <Col>
                                            <h1> Notes </h1>
                                            <br />
                                            <p>
                                                <span className="crumble">Crumble's</span> Notes gives you a space for note-taking or brain dumping. 
                                                With the ability to have your notes automatically assigned to specific tasks or projects, taking notes has never been easier.
                                            </p>
                                            <br />
                                            <Button as={Link} to={localStorage.getItem('token') ? "/home" : "/login"} onClick={() => fullpageApi.moveTo(1)} className="startBtn"> <em>Write</em> It Out! </Button>
                                        </Col>
                                        <Col>
                                            <img src="https://img.icons8.com/bubbles/350/000000/notes-app.png" alt="todo" height="350" width="350" className="stock-image" />
                                        </Col>
                                    </Row>
                                </Container>
                                <div className="moveToTop" onClick={() => fullpageApi.moveTo(1)}><i class="bi-chevron-double-up"></i></div>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>
    );
}