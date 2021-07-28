import "./UpdateSubtab.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function UpdateSubtab(props) {

    const { subtabs, setErrors, setIsLoading } = useContext(AuthContext);

    const subtab = props.subtab;

    const [form, setForm] = useState({
        name: subtab.name,
    });


    //update subtab in list of subtabs
    const updateSubtab = (updatedId) => {

        let found = subtabs.find(foundSubtab => foundSubtab.id === updatedId);

        if (form.name !== "") { //if name is empty, it will not change the name
            found.name = form.name;
        }
    }


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }


    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        let result;

        if (form.name !== "") { //if name is empty, it will not change the name
            result = await apiClient.updateSubtab(subtab.id, { 
                name: form.name,
            });
        }

        if (result) {
            const { data, error } = result;

            const dbSubtab = data.subtab;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm({ name: dbSubtab.name });
                updateSubtab(subtab.id);
            } 

        } else { //if name is empty, it will set the name in form to current maintab name
            setForm ({  name: subtab.name });
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
                    Edit Subtab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">New name of sub tab</FormLabel>
                    <Form.Control
                        type="text"
                        name="name"
                        className="input-field"
                        onChange={handleOnInputChange}
                        value={form.name}
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