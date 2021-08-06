import "./UpdateTask.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { formatDateForInputDisplay } from "utils/format";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function UpdateTask(props) {

    const subId = parseInt(props.subId);
    const mainId = props.mainId;

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { setTasks, setEvents, events } = useContext(GlobalContext);

    const task = props.task;

    const [form, setForm] = useState({});

    useEffect(() => {
        
        setForm ({
            details: task.details,
            priority: task.priority,
            date: task.date === null ? null : formatDateForInputDisplay(task.date),
        });

    }, [task]);


    // update task in list of tasks
    const updateTask = (updatedTask) => {
        setTasks(oldTasks => oldTasks.map(oldTask => oldTask.id === updatedTask.id ? updatedTask : oldTask))
    }


    // adds a new event to list of events
    const addEvent = (newEvent) => {
        setEvents((oldEvents) => [newEvent, ...oldEvents]);
    }

    // update event in list of events
    const updateEvent = (updatedEvent) => {    
        setEvents(oldEvents => oldEvents.map(oldEvent => oldEvent.id === updatedEvent.id ? updatedEvent : oldEvent))
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
        let updatedEvent;

        if (form.details !== "") { //if details is not empty, it will change the details
            resultTask = await apiClient.updateTask(task.id, {
                task: {
                    details: form.details,
                    priority: form.priority,
                    date: form.date,
                }
            });

            // if a date was added, then sync with calendar
            if (form.date !== null) {

                if (task.date !== null) { //If there was a previous date before, just update event...

                    const event = events.filter(filteredEvent => filteredEvent.task_id === task.id);

                    updatedEvent = await apiClient.updateEvent(event[0].id, {
                        event_name: form.details,
                        date: form.date
                    });

                } else { //If there was no previous date before, create a new event...

                    if (subId === 0) {

                        resultEvent = await apiClient.createEventForMain({ 
                            main_id: mainId,
                            event: {
                                task_id: task.id,
                                event_name: form.details,
                                date: form.date
                            }
                        });
    
                    } else {
    
                        resultEvent = await apiClient.createEventForSub({ 
                            sub_id: subId,
                            event: {
                                task_id: task.id,
                                event_name: form.details,
                                date: form.date
                            }
                        });
                    }
                }
                
            }

        } else { //if details is empty, it will not change the details
            resultTask = await apiClient.updateTask(task.id, {
                task: {
                    priority: form.priority,
                    date: form.date,
                }
            });

            // if a date was added, then sync with calendar
            if (form.date !== null) {

                if (task.date !== null) { //If there was a previous date before, just update event...

                    const event = events.filter(filteredEvent => filteredEvent.event_name === task.details);

                    updatedEvent = await apiClient.updateEvent(event[0].id, {
                        date: form.date
                    });

                } else { //If there was no previous date before, create a new event...

                    if (subId === 0) {

                        resultEvent = await apiClient.createEventForMain({ 
                            main_id: mainId,
                            event: {
                                event_name: task.details,
                                date: form.date
                            }
                        });
    
                    } else {
    
                        resultEvent = await apiClient.createEventForSub({ 
                            sub_id: subId,
                            event: {
                                event_name: task.details,
                                date: form.date
                            }
                        });
                    }
                }
                
            }
        }

        // checks if a task was updated
        if (resultTask) {
            const { data, error } = resultTask;

            const dbTask = data.task;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm({ details: dbTask.details,
                          priority: dbTask.priority,
                          date: formatDateForInputDisplay(dbTask.date) });
                updateTask(dbTask);

                // checks if a new event was created (a due date was added to a task)
                if (resultEvent) {
                    const { data, error } = resultEvent;
        
                    if (error) {
                        setErrors((e) => ({ ...e, form: error }));
                    } else {
                        setErrors((e) => ({ ...e, form: null }));
                        addEvent(data?.event);
                    }
        
                }

                // checks if an event was updated (name or due date was changed in task)
                if (updatedEvent) {
                    const { data, error } = updatedEvent;
                
                    const dbEvent = data?.event;
        
                    if (error) {
                        setErrors((e) => ({ ...e, form: error }));
                    } else {
                        setErrors((e) => ({ ...e, form: null }));
                        updateEvent(dbEvent);
                    }
        
                } 
            }

        } else { //if details is empty, it will set the details in form to current task details
            setForm ({  details: task.details, });
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
                        ref={innerRef}
                        name="details"
                        maxLength={40}
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
                    <Button type="submit" onClick={props.onHide} className="button" disabled={!form.details?.trim()}>Save</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}