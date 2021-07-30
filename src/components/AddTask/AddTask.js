import './AddTask.css';

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddTask(props) {

    const { setTasks, setErrors, setIsLoading } = useContext(AuthContext);

    const [form, setForm] = useState({
        details: "",
        priority: "",
        date: null,
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
                    priority: form.priority,
                    date: form.date,
                }
            });
        } else {
            result = await apiClient.createTaskFromSub({
                sub_id: parseInt(props.subId),
                task: {
                    details: form.details,
                    priority: form.priority,
                    date: form.date,
                }
            })
        }

        const { data, error } = result;

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addTask(data?.task);
            setForm({   details: "",
                        priority: "",
                        date: null, });
        }

        setIsLoading(false);
    }

    return (
        <Modal
            {...props}
            size="lg"
            className="AddTask"
            aria-labelledby="Add task modal"
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
                            placeholder="Untitled"
                            aria-label="Input name of new task"
                            onChange={handleOnInputChange}
                            value={form.details}
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

                        <FormLabel className="form-label"><div>Due date</div> &nbsp; <p>(optional)</p></FormLabel>
                        <Form.Control
                            type="datetime-local"
                            name="date"
                            className="input-field"
                            onChange={handleOnInputChange}
                            value={form.date}
                        />
                    </FormGroup>

                    <div className="modal-button">
                        <Button type="submit" onClick={props.onHide} className="button">Add Task</Button>
                    </div>
                </Modal.Body>
            </Form> 
        </Modal>
    )
}