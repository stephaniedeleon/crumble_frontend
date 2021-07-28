import "./UpdateTask.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function UpdateTask(props) {

    const { tasks, setErrors, setIsLoading } = useContext(AuthContext);

    const task = props.task;

    const [form, setForm] = useState({
        details: task.details,
    });


    //update task in list of tasks
    const updateTask = (updatedId) => {

        let found = tasks.find(foundTask => foundTask.id === updatedId);

        if (form.details !== "") { //if details is empty, it will not change the details
            found.details = form.details;
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

        if (form.details !== "") { //if details is empty, it will not change the details
            result = await apiClient.updateTask(task.id, { 
                details: form.details,
            });
        }

        if (result) {
            const { data, error } = result;

            const dbTask = data.task;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm({ details: dbTask.details });
                updateTask(task.id);
            } 

        } else { //if details is empty, it will set the details in form to current task details
            setForm ({  details: task.details });
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
                    Edit Task
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">New details of task</FormLabel>
                    <Form.Control
                        type="text"
                        name="details"
                        className="input-field"
                        onChange={handleOnInputChange}
                        value={form.details}
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