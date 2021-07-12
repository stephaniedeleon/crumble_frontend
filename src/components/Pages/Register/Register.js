import "./Register.css"

import { Form, FormGroup, FormLabel, Button, Container } from "react-bootstrap"
import { useState } from "react"

export default function Register () {
    
    return (
        <div className="Register">
            <Container>
                <Form>
                    <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <Form.Control type="text" placeholder="First Name" />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <Form.Control type="text" placeholder="Last Name" />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <Form.Control type="email" placeholder="Email" />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <Form.Control type="password" placeholder="Password" />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Confirm Password</FormLabel>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </FormGroup>

                    <FormGroup>
                        <Form.Check type="checkbox" label="Agree To Terms and Services" />
                    </FormGroup>

                    <Button>
                        Login
                    </Button>
                    
                </Form>
            </Container>
        </div>
    )
}