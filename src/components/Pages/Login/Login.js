import "./Login.css"

import { Form, FormGroup, FormLabel, Button, Container } from "react-bootstrap"
import { useState } from "react"


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

                    <Button>
                        Register
                    </Button>
                    
                </Form>
            </Container>
        </div>
    )
}