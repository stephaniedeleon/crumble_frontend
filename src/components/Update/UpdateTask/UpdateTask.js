import "./UpdateTask.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { formatDateForInputDisplay } from "utils/format";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function UpdateTask(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { tasks, setTasks } = useContext(GlobalContext);

    const task = props.task;

    const [form, setForm] = useState({
        details: task.details,
        priority: task.priority,
        date: formatDateForInputDisplay(task.date),
    });


    //update task in list of tasks
    const updateTask = (task) => {
        setTasks(oldTasks => oldTasks.map(oldTask => oldTask.id === task.id ? task : oldTask))
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
                task: {
                    details: form.details,
                    priority: form.priority,
                    date: form.date,
                }
            });
        } else {
            result = await apiClient.updateTask(task.id, {
                task: {
                    priority: form.priority,
                    date: form.date,
                }
            });
        }

        if (result) {
            const { data, error } = result;

            const dbTask = data.task;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm({ details: dbTask.details,
                          priority: dbTask.priority,
                          date: formatDateForInputDisplay(dbTask.date) });
                updateTask(dbTask);
            } 

        } else { //if details is empty, it will set the details in form to current task details
            setForm ({  details: task.details, });
        }

        setIsLoading(false);
    }


    return (
      <Modal
            {...props}
            size="lg"
            className="AddTask"
            aria-labelledby="Update task modal"
            centered
      >
        <Form onSubmit={handleOnSubmit} className="modal-area">
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
                        aria-label="Input name of new task"
                        onChange={handleOnInputChange}
                        value={form.details}
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
                    <Button type="submit" onClick={props.onHide} className="button">Save</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}