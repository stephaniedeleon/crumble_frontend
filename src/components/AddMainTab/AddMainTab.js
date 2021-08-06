import "./AddMainTab.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function AddMaintab(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { setMaintabs } = useContext(GlobalContext);

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
            setForm({name: ""});
        } 

        setIsLoading(false);
    }

    /** autofocus */
    const innerRef = React.useRef();
    useEffect(() => {innerRef.current && innerRef.current.focus()}, [props.show]);

    return (
      <Modal
            {...props}
            size="lg"
            className="modal"
            aria-labelledby="Add-maintab-modal"
            centered
      >
        <Form onSubmit={handleOnSubmit} className="modal-area">
            <Modal.Header closeButton>
                <Modal.Title id="Add-maintab-modal">
                    Create a new main tab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Name of new main tab</FormLabel>
                    <Form.Control
                        type="text"
                        ref={innerRef}
                        name="name"
                        maxLength={30}
                        className="input-field"
                        placeholder="Untitled"
                        onChange={handleOnInputChange}
                        value={form.name}
                        required
                    />
                </FormGroup>
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide} className="button" disabled={!(form.name.trim())}>Add MainTab</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}