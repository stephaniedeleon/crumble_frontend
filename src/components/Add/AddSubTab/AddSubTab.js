import './AddSubTab.css';

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "context/auth";
import GlobalContext from 'context/global';
import apiClient from "services/apiClient";

export default function AddSubTab(props) {

    const { setErrors, setIsLoading  } = useContext(AuthContext);
    const { setSubtabs, } = useContext(GlobalContext);

    const [form, setForm] = useState({
        name: "",
        priority: "",
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
                    priority: form.priority,
                }
            });
        } else {
            result = await apiClient.createSubtabFromSub({
                sub_id: parseInt(props.subId),
                subtab: {
                    name: form.name,
                    priority: form.priority,
                }
            })
        }

        const { data, error } = result;

        const dbSubtab = data?.subtab;

        if (error) {
            setErrors((e) => ({ ...e, form: error })); 
        } else {
            setErrors((e) => ({ ...e, form: null }));
            setForm({ name: "",
                      priority: "" });
            addSubtab(dbSubtab);
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
            className="AddSubTab"
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
                        ref={innerRef}
                        name="name"
                        className="input-field"
                        placeholder="Sub Tab Name"
                        maxLength={30}
                        onChange={handleOnInputChange}
                        value={form.name}
                        required
                    />

                    <FormLabel className="form-label"><div>Priority</div> &nbsp; <p>(optional)</p></FormLabel>
                    <Form.Control
                        as="select"
                        name="priority"
                        className="input-field"
                        aria-label="Select priority"
                        onChange={handleOnInputChange}
                        value={form.priority}
                        custom
                    >
                        <option selected></option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Control>
                </FormGroup>
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide} className="button" disabled={!(form.name.trim())}>Add SubTab</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    )

}