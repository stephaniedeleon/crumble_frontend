import "./Navbar.css";

import { Nav, Navbar as NavBar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "context/auth";
import { useContext } from "react";
import apiClient from "services/apiClient";

export default function Navbar() {
  const { setUser, authenticated, setAuthenticated, setMaintabs } = useContext(AuthContext);

  const navigate = useNavigate()

  //handles logout
  const handleOnLogout = async () => {
      setUser({});
      setAuthenticated(false);
      setMaintabs([]); //clears maintabs
      await apiClient.logout();
      navigate("/")
  };

  return (
      <div className="NavBar">
          <NavBar clasName="navbar" expand="md">
              <Container>
                  <NavBar.Brand as={Link} to="/">
                    <h5>
                      PlannerLogo
                    </h5>
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
                                  Register
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
