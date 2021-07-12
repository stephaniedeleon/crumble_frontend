import "./Login.css"

import { Form, FormControl, FormGroup, FormLabel, Button, Container, Col, Row } from "react-bootstrap"


export default function Login () {

    return (
        <div className="Login">
            <Container className="px-5">
                <Form>
                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <Form.Control type="password" placeholder="Enter Password" />
                    </FormGroup>

                    <FormGroup>
                        <Form.Check type="checkbox" label="Agree To Terms and Services"  />
                    </FormGroup>

                    <Button>
                        Submit
                    </Button>
                    
                </Form>
            </Container>
        </div>
    )
}