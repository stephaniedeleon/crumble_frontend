import "./UpdateEvent.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { formatDateForInputDisplay } from "utils/format";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function UpdateEvent(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { setEvents, setTasks } = useContext(GlobalContext);

    const calEvent = props.event;
    const event_id = parseInt(calEvent.id);

    const [form, setForm] = useState({});

    useEffect(() => {
        
        setForm ({
            event_name: calEvent.event_name,
            date: formatDateForInputDisplay(calEvent.date),
            notes: calEvent.notes,
        });

    }, [calEvent]);


    //update event in list of events
    const updateEvent = (updatedEvent) => {
        setEvents(oldEvents => oldEvents.map(oldEvent => oldEvent.id === updatedEvent.id ? updatedEvent : oldEvent))
    }


    // update task in list of tasks
    const updateTask = (updatedTask) => {
        setTasks(oldTasks => oldTasks.map(oldTask => oldTask.id === updatedTask.id ? updatedTask : oldTask))
    }


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        let resultEvent;
        let resultTask;

        if (form.event_name !== "" && form.date !== "") {

            resultEvent = await apiClient.updateEvent(event_id, {
                event_name: form.event_name,
                date: form.date,
                notes: form.notes,
            });

            if (calEvent.task_id){
                resultTask = await apiClient.updateTask(calEvent.task_id, {
                    task: {
                        details: form.event_name,
                        date: form.date,
                    }
                });
            }

        } else if (form.event_name === "") { //if name is empty, it will not change the name

            resultEvent = await apiClient.updateEvent(event_id, {
                date: form.date,
                notes: form.notes,
            });

            if (calEvent.task_id) {
                resultTask = await apiClient.updateTask(calEvent.task_id, {
                    task: {
                        date: form.date,
                    }
                });
            }

        } else if (form.date === "") { //if date is empty, it will not change the date

            resultEvent = await apiClient.updateEvent(event_id, {
                event_name: form.event_name,
                notes: form.notes,
            });

        }

        // runs if result is not null
        if (resultEvent) {

            const { data, error } = resultEvent;

            const dbEvent = data.event;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm ({  event_name: dbEvent.event_name,
                            date: formatDateForInputDisplay(calEvent.date)
                        });
                updateEvent(dbEvent);


                if (resultTask) {

                    const { data, error } = resultTask;
        
                    const dbTask = data.task;
        
                    if (error) {
                        setErrors((e) => ({ ...e, form: error }));
                    } else {
                        setErrors((e) => ({ ...e, form: null }));
                        updateTask(dbTask);
                    }
                }
            } 
        }

        setIsLoading(false);
    }


    return (
        <Modal
            {...props}
            size="lg"
            className="UpdateEvent"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={handleOnSubmit} className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Event
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <FormLabel className="form-label">Name of event</FormLabel>
                        <Form.Control
                            type="text"
                            name="event_name"
                            maxLength={20}
                            className="input-field"
                            onChange={handleOnInputChange}
                            value={form.event_name}
                        />

                        <FormLabel className="form-label">Date of event</FormLabel>
                        <Form.Control
                            type="datetime-local"
                            name="date"
                            className="input-field"
                            onChange={handleOnInputChange}
                            value={form.date}
                        />

                        <FormLabel className="form-label"><div>Additional notes</div> &nbsp; <p>(optional)</p></FormLabel>
                        <Form.Control
                            type="text"
                            name="notes"
                            className="input-field"
                            onChange={handleOnInputChange}
                            value={form.notes}
                        />
                    </FormGroup>
                    <div className="modal-button">
                        <Button type="submit" onClick={props.onHide} className="button" disabled={!(form.event_name?.trim() && form.date)}>Save</Button>
                    </div>
                </Modal.Body>
            </Form>

        </Modal>
    );
}