import "./Navbar.css";

import { Nav, Navbar as NavBar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "context/auth";
import { useContext } from "react";
import apiClient from "services/apiClient";
import TimerContext from "context/timer";
import { useTimer } from "hooks/useTimer";

export default function Navbar() {
  const { setUser, authenticated, setAuthenticated, setMaintabs, setSubtabs, setTasks, setEvents,  } = useContext(AuthContext);
  const { timerVariables, formatTimeLeft } = useContext(TimerContext)

  const navigate = useNavigate()

  //handles logout
  const handleOnLogout = async () => {
      setUser({});
      setAuthenticated(false);
      setMaintabs([]); //clears maintabs
      setSubtabs([]); //clears subtabs
      setTasks([]); //clears tasks
      setEvents([]); //clears calendar
      await apiClient.logout();
      navigate("/")
  };

  const radius = 45

  return (
      <div className="NavBar">
          <NavBar expand="md">
              <Container className="navbar">
                  <NavBar.Brand as={Link} to="/" className="logo">
                    <img src="https://img.icons8.com/bubbles/70/000000/edit.png" alt="planner logo" className="d-inline-block align-top" />
                    Planner
                  </NavBar.Brand>

                  <NavBar.Toggle className="my-4" aria-controls="NavBarScroll" />

                  <NavBar.Collapse className="links" id="NavBarScroll">
                      <Nav className="ml-auto py-4" NavBarScroll>
                          <Nav.Link as={Link} to="/about">
                            <h6 className="linkText">
                              About
                            </h6>
                          </Nav.Link>
                          {authenticated ? (
                            <>
                              <Nav.Link as={Link} to="/home">
                                <h6 className="linkText">
                                  Home
                                </h6>
                              </Nav.Link>
                              <Nav.Link as={Link} to="/timer">
                                {timerVariables.timerStatus === "started" || timerVariables.timerStatus === "paused" ?
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
                                          r={radius.toString()}
                                          style={timerVariables.timeLeft === 0 ? { color: "red" } : { color: "grey" }}
                                        />
                            
                                        <path
                                          strokeDasharray="283"
                                          className={`base-timer-path-remaining ${timerVariables.remainingPathColor}`}
                                          d="
                                                M 50, 50
                                                m -45, 0
                                                a 45,45 0 1,0 90,0
                                                a 45,45 0 1,0 -90,0
                                            "
                                          style={{
                                            strokeDasharray: timerVariables.circleDasharray,
                                            strokeLinecap: "none",
                                          }}
                                        ></path>
                                      </g>
                                    </svg>
                            
                                    <span class="base-timer-label">{formatTimeLeft(timerVariables.timeLeft)}</span>
                            
                                    
                                  </div>
                                :
                                  <h6 className="linkText">
                                    Timer
                                  </h6>
                                }
                              </Nav.Link>
                              <Nav.Link onClick={handleOnLogout}>
                                <h6 className="linkBtn">
                                  Log Out
                                </h6>
                              </Nav.Link>
                            </>
                          ) : ( 
                            <>
                              <Nav.Link as={Link} to="/login">
                                <h6 className="linkBtn">
                                  Login
                                </h6>
                              </Nav.Link>
                              <Nav.Link as={Link} to="/register">
                                <h6 className="linkBtn">
                                  Sign up
                                </h6>
                              </Nav.Link>
                            </>
                          )}

                          
                      </Nav>
                  </NavBar.Collapse>
              </Container>
          </NavBar>
      </div>
  );
}
