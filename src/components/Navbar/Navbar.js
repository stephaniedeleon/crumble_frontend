import "./Navbar.css";

import {
  Nav,
  Navbar as NavBar,
  Container,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="NavBar">
      <NavBar expand="lg" bg="light">
        <Container>
          <NavBar.Brand as={ Link } to="/home">LOGO</NavBar.Brand>
          <NavBar.Toggle aria-controls="NavBarScroll" />
          <NavBar.Collapse>
            <Nav className="ml-auto my-2 mr-5" NavBarScroll>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/home">
                Main
              </Nav.Link>
            </Nav>
            <div className="d-flex ">
              <Link to="/login">
                <Button className="mr-2">Login</Button>
              </Link>
              <Link to="register">
                <Button>Register</Button>
              </Link>
            </div>
          </NavBar.Collapse>
        </Container>
      </NavBar>
    </div>
  );
}
