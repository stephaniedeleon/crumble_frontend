import "./Login.css"

import { Form, FormGroup, FormLabel, Button, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"


export default function Login ({ user, setUser }) {

    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        //if user logged in, take to homepage
        if (user?.email) {
            navigate("/home")
        }
    }, [user, navigate])

    const handleOnTextChange = (evt) => {
        if (evt.target.name === "email") {
            if (evt.target.value.indexOf("@") <= 0)
                setErrors((err) => ({ ...err, email: "Please enter a valid email."}))
            else 
                setErrors((err) => ({ ...err, email: null}))
        }

        setForm((oldForm) => ({ ...oldForm, [evt.target.name]: evt.target.value }))
    }



    return (
        <div className="Login">
            <Container className="px-5">
                <Form onSubmit={handleOnClickSubmit}>
                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter Email" onChange={handleOnTextChange} value={form.email} required />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <Form.Control type="password" name="password" placeholder="Enter Password" onChange={handleOnTextChange} value={form.password} required />
                    </FormGroup>

                    <Button type="submit">
                        Register
                    </Button>
                    
                </Form>
            </Container>
        </div>
    )
}