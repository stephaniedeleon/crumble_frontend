import './AddSubTab.css';

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddSubTab(props) {

    const { setSubtabs, setErrors, setIsLoading } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: '',
    });

    // adds a new a sutab to list of subtabs
    const addSubtab = (newSubtab) => {
        setSubtabs((oldSubtabs) => [newSubtab, ...oldSubtabs]);
    }

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {
        
        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.createSubtabFromMain({
            main_id: props.mainId,
            subtab: {
                name: form.name,
            }
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error })); 
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addSubtab(data.subtab);
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
                    Create a new sub tab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Name of new sub tab</FormLabel>
                    <Form.Control
                        type="text"
                        name="name"
                        className="input-field"
                        placeholder="Sub Tab Name"
                        onChange={handleOnInputChange}
                        value={form.name}
                        required
                    />
                </FormGroup>
            </Modal.Body>

            <Modal.Footer> 
                <Button type="submit" onClick={props.onHide}>Add SubTab</Button>
            </Modal.Footer>
        </Form>

      </Modal>
    )

}