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
                    PlannerLogo
                  </NavBar.Brand>

                  <NavBar.Toggle aria-controls="NavBarScroll" />

                  <NavBar.Collapse className="links" id="NavBarScroll">
                      <Nav className="ml-auto" NavBarScroll>
                          <Nav.Link className="reg-link" as={Link} to="/about">
                            About
                          </Nav.Link>
                          {authenticated ? (
                            <>
                              <Nav.Link className="reg-link" as={Link} to="/home">
                                Home
                              </Nav.Link>
                              <Nav.Link className="logout" onClick={handleOnLogout}>
                                Log Out
                              </Nav.Link>
                            </>
                          ) : ( 
                            <>
                              <Nav.Link className="login-link" as={Link} to="/login">
                                  Login
                              </Nav.Link>
                              <Nav.Link className="register-link" as={Link} to="/register">
                                  Register
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
