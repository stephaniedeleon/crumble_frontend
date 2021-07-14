import "./AddMainTab.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

import { Link } from 'react-router-dom';

export default function AddMaintab(props) {

    const { setMaintabs } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        name: "",
    });


    // adds a new maintab to list of maintabs
    const addMaintab = (newMaintab) => {
        setMaintabs((oldMaintabs) => [newMaintab, ...oldMaintabs]);
    }


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }


    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.createMaintab({ 
            name: form.name,
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addMaintab(data.maintab);
        } 

        setIsLoading(false);
    }


    return (
      <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
      >
        <Form onSubmit={handleOnSubmit}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a new main tab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Name of new main tab</FormLabel>
                    <Form.Control
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Main Tab Name"
                    onChange={handleOnInputChange}
                    value={form.name}
                    required
                    />
                </FormGroup>
            </Modal.Body>

            <Modal.Footer> 
                <Button type="submit" onClick={props.onHide}>Add MainTab</Button>
            </Modal.Footer>
        </Form>

      </Modal>
    );
}