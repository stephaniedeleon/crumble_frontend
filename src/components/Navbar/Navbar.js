import "./Navbar.css";

import {
  Nav,
  Navbar as NavBar,
  Container,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "context/auth";
import { useContext } from "react";

export default function Navbar({ clearAppState }) {

  const { user, setUser } = useContext(AuthContext)

  return (
    <div className="NavBar">
      <NavBar expand="lg" bg="light">
        <Container>
          <NavBar.Brand as={ Link } to="/">LOGO</NavBar.Brand>
          <NavBar.Toggle aria-controls="NavBarScroll" />
          <NavBar.Collapse>
            <Nav className="ml-auto my-2 mr-5" NavBarScroll>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
            </Nav>
            <div className="d-flex">
              {user?.email ? 
                  <Button className="mr-2" onClick={clearAppState}>Log Out</Button>
              :
                <>
                  <Link to="/login">
                    <Button className="mr-2">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              }
              
            </div>
          </NavBar.Collapse>
        </Container>
      </NavBar>
    </div>
  );
}
