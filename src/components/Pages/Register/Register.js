import "./Register.css"

import { Form, FormControl, Container, Col, Row } from "react-bootstrap"

export default function Register () {
    
    return (
        <div className="Register">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <FormControl />
                            <FormControl />
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
        /* <NavBar bg="light" expand="lg">
        <NavBar.Brand href="#">NavBar scroll</NavBar.Brand>
        <NavBar.Toggle aria-controls="NavBarScroll" />
        <NavBar.Collapse id="NavBarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            NavBarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="NavBarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </NavBar.Collapse>
      </NavBar> */
    )
}