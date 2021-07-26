import "./UpdateMaintab.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function UpdateMaintab(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);

    const maintab = props.maintab;

    const [form, setForm] = useState({
        name: "",
    });


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }


    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.updateMaintab(maintab.id, { 
            name: form.name,
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            setForm({name: ""});
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
                    Edit MainTab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">New name of main tab</FormLabel>
                    <Form.Control
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder={maintab.name}
                    onChange={handleOnInputChange}
                    value={form.name}
                    required
                    />
                </FormGroup>
            </Modal.Body>

            <Modal.Footer> 
                <Button type="submit" onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Form>

      </Modal>
    );
}