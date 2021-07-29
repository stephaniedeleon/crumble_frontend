import './AddSubTab.css';

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddSubTab(props) {

    const { setSubtabs, setErrors, setIsLoading  } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: '',
    });

    // adds a new a sutab to list of subtabs
    const addSubtab = (newSubtab) => {
        setSubtabs((oldSubtabs) => [newSubtab, ...oldSubtabs]);
        props.updateDirectory("add", newSubtab);
    }


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {
        
        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        let result;

        if (parseInt(props.subId) === 0) {
            result = await apiClient.createSubtabFromMain({
                main_id: parseInt(props.mainId),
                subtab: {
                    name: form.name,
                }
            });
        } else {
            result = await apiClient.createSubtabFromSub({
                sub_id: parseInt(props.subId),
                subtab: {
                    name: form.name,
                }
            })
        }

        const { data, error } = result;

        if (error) {
            setErrors((e) => ({ ...e, form: error })); 
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addSubtab(data.subtab);
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
        <Form onSubmit={handleOnSubmit} className="modal-area">
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
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide} className="button">Add SubTab</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    )

}