import "./Navbar.css";

import { Nav, Navbar as NavBar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "context/auth";
import { useContext } from "react";
import apiClient from "services/apiClient";

export default function Navbar() {
  const { setUser, authenticated, setAuthenticated, setMaintabs, setSubtabs, setTasks, setEvents } = useContext(AuthContext);

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

  return (
      <div className="NavBar">
          <NavBar className="navbar" expand="md">
              <Container>
                  <NavBar.Brand as={Link} to="/" className="logo">
                    <img src="https://img.icons8.com/bubbles/70/000000/edit.png" alt="planner logo" className="d-inline-block align-top" />
                    Planner
                  </NavBar.Brand>

                  <NavBar.Toggle className="my-4" />

                  <NavBar.Collapse className="links">
                      <Nav className="ml-auto py-4">
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
