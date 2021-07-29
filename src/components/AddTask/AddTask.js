import './AddTask.css';

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddTask(props) {

    const { setTasks, setErrors, setIsLoading } = useContext(AuthContext);

    const [form, setForm] = useState({
        details: "",
    });

    // adds a new task to list of tasks
    const addTask = (newTask) => {
        setTasks((oldTasks) => [...oldTasks, newTask]);
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
            result = await apiClient.createTaskFromMain({
                main_id: parseInt(props.mainId),
                task: {
                    details: form.details,
                }
            });
        } else {
            result = await apiClient.createTaskFromSub({
                sub_id: parseInt(props.subId),
                task: {
                    details: form.details,
                }
            })
        }

        const { data, error } = result;

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addTask(data?.task);
            setForm({details: ""});
        }

        setIsLoading(false);
    }

    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Form onSubmit={handleOnSubmit} className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a new task
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <FormLabel className="form-label">Details of new task</FormLabel>
                        <Form.Control
                            type="text"
                            name="details"
                            className="input-field"
                            placeholder="Task Details"
                            onChange={handleOnInputChange}
                            value={form.details}
                            required
                        />
                    </FormGroup>
                    <div className="modal-button">
                        <Button type="submit" onClick={props.onHide}>Add Task</Button>
                    </div>
                </Modal.Body>
            </Form> 
        </Modal>
    )
}