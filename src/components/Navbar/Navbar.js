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
      <NavBar clasName="navbar" expand="lg">
        <Container>
          <NavBar.Brand as={Link} to="/">
            LOGO
          </NavBar.Brand>
          <NavBar.Toggle aria-controls="NavBarScroll" />
          <NavBar.Collapse>
            <Nav className="ml-auto my-2 mr-5" NavBarScroll>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              {authenticated ? (
                <Nav.Link as={Link} to="/home">
                Home
                </Nav.Link>
              ) : ( 
                <>
                </>
              )}
              
            </Nav>
            <div className="d-flex">
              {authenticated ? (
                <Button className="mr-2" onClick={handleOnLogout}>
                  Log Out
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="mr-2">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </NavBar.Collapse>
        </Container>
      </NavBar>
    </div>
  );
}
