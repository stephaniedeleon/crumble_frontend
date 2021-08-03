import './AddTask.css';

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from 'context/global';
import apiClient from "services/apiClient";

export default function AddTask(props) {

    const subId = parseInt(props.subId);
    const mainId = props.mainId;

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { setTasks, setEvents } = useContext(GlobalContext);

    const [form, setForm] = useState({
        details: "",
        priority: "",
        date: null,
    });

    // adds a new task to list of tasks
    const addTask = (newTask) => {
        setTasks((oldTasks) => [...oldTasks, newTask]);
    }

    // adds a new event to list of events
    const addEvent = (newEvent) => {
        setEvents((oldEvents) => [newEvent, ...oldEvents]);
    }

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        let resultTask;
        let resultEvent;

        if (parseInt(props.subId) === 0) {

            resultTask = await apiClient.createTaskFromMain({
                main_id: parseInt(props.mainId),
                task: {
                    details: form.details,
                    priority: form.priority,
                    date: form.date,
                }
            });

        } else {

            resultTask = await apiClient.createTaskFromSub({
                sub_id: parseInt(props.subId),
                task: {
                    details: form.details,
                    priority: form.priority,
                    date: form.date,
                }
            })
        }


        // adding a task
        const { data, error } = resultTask;

        const dbTask = data?.task;

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addTask(dbTask);


            if (form.date !== null) {
    
                // if a date was added, then sync with calendar
                if (parseInt(props.subId) === 0) {

                    resultEvent = await apiClient.createEventForMain({ 
                        main_id: mainId,
                        event: {
                            task_id: dbTask.id,
                            event_name: form.details,
                            date: form.date
                        }
                    });

                } else {

                    resultEvent = await apiClient.createEventForSub({ 
                        sub_id: subId,
                        event: {
                            task_id: dbTask.id,
                            event_name: form.details,
                            date: form.date
                        }
                    });
                }

                // syncing with calendar, adding an event based on task
                const { data, error } = resultEvent;

                const dbEvent = data?.event;

                if (error) {
                    setErrors((e) => ({ ...e, form: error }));
                } else {
                    setErrors((e) => ({ ...e, form: null }));
                    addEvent(dbEvent);
                    setForm({   details: "",
                                priority: "",
                                date: null,  });
                }


            } else {

                setForm({   details: "",
                            priority: "",
                            date: null,  });
            }

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