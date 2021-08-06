import './Profile.css';

import { Form, FormGroup, FormLabel, Button, Container } from 'react-bootstrap';
import { PageHeader } from 'components';
import React, { useState, useContext } from 'react';
import AuthContext from 'context/auth';
import apiClient from 'services/apiClient';

export default function Profile() {

    const { user, setErrors, setIsLoading } = useContext(AuthContext);

    console.log(user);

    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
    })

    const handleOnChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const result = await apiClient.update({
            email: form.email || user.email,
            firstName: form.firstName || user.firstName,
            lastName: form.lastName || user.lastName,
            user: user,
        })

        const { data, error } = result;

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
        }

        setIsLoading(false);
    }

    return (
        <div className="Profile">
            <PageHeader sectionName="My Profile" />
            <Container className="card">
                <h2>Update Profile</h2>
                <br />
            </Container>
            <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                    <FormLabel className="form-label"> Email </FormLabel>
                    <Form.Control
                        type="email"
                        name="email"
                        className="input-field"
                        placeholder="Enter a valid email"
                        onChange={handleOnChange}
                        value={form.email}
                        autoFocus
                    />
                </FormGroup>

                <div className="split-input-field">
                    <FormGroup>
                        <FormLabel className="form-label"> First Name </FormLabel>
                        <Form.Control
                            type="text"
                            name="firstName"
                            className="input-field"
                            placeholder="First"
                            onChange={handleOnChange}
                            value={form.firstName}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel className="form-label"> Last Name </FormLabel>
                        <Form.Control
                            type="text"
                            name="lastName"
                            className="input-field"
                            placeholder="Last"
                            onChange={handleOnChange}
                            value={form.lastName}
                        />
                    </FormGroup>
                </div>

                <Button type="submit" className="update-btn">
                    Update Profile
                </Button>
            </Form>
        </div>
    )
}