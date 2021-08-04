import "./UpdateMaintab.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function UpdateMaintab(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { setMaintabs } = useContext(GlobalContext);

    const maintab = props.maintab;

    const [form, setForm] = useState({
        name: maintab.name
    });


    //update maintab in list of maintabs
    const updateMaintab = (updatedMaintab) => {
        setMaintabs(oldMaintabs => oldMaintabs.map(oldMaintab => oldMaintab.id === updatedMaintab.id ? updatedMaintab : oldMaintab));
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
            result = await apiClient.updateMaintab(maintab.id, { 
                name: form.name,
            });
        }

        if (result) {
            const { data, error } = result;

            const dbMaintab = data.maintab;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm ({  name: dbMaintab.name });
                updateMaintab(dbMaintab);
            } 

        } else { //if name is empty, it will set the name in form to current maintab name
            setForm ({  name: maintab.name });
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
                    Edit MainTab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">New name of main tab</FormLabel>
                    <Form.Control
                        type="text"
                        name="name"
                        maxLength={30}
                        className="input-field"
                        onChange={handleOnInputChange}
                        value={form.name}
                    />
                </FormGroup>
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide} className="button">Save</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}