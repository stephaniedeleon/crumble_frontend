import "./UpdateEvent.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { formatDateForInputDisplay } from "utils/format";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function UpdateEvent(props) {

    const { events, setErrors, setIsLoading } = useContext(AuthContext);

    const calEvent = props.event;
    const event_id = parseInt(calEvent.id);

    const [form, setForm] = useState({
        event_name: calEvent.event_name,
        date: formatDateForInputDisplay(calEvent.date),
    });


    //update event in list of events
    const updateEvent = (updatedId) => {

        let found = events.find(foundEvent => foundEvent.id === updatedId);

        if (form.event_name !== "" && form.date !== "") {

            found.event_name = form.event_name;
            found.date = form.date;

        } else if (form.event_name === "") { //if name is empty, it will not change the name

            found.date = form.date;

        } else if (form.date === "") { //if date is empty, it will not change the date
            
            found.event_name = form.event_name;

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

        if (form.event_name !== "" && form.date !== "") {

            result = await apiClient.updateEvent(event_id, {
                event_name: form.event_name,
                date: form.date
            });

        } else if (form.event_name === "") { //if name is empty, it will not change the name

            result = await apiClient.updateEvent(event_id, {
                date: form.date
            });

        } else if (form.date === "") { //if date is empty, it will not change the date

            result = await apiClient.updateEvent(event_id, {
                event_name: form.event_name
            });

        }

        // runs if result is not null
        if (result) {

            const { data, error } = result;

            const dbEvent = data.event;

            if (error) {
                setErrors((e) => ({ ...e, form: error }));
            } else {
                setErrors((e) => ({ ...e, form: null }));
                setForm ({  event_name: dbEvent.event_name,
                            date: formatDateForInputDisplay(calEvent.date)
                        });
                updateEvent(event_id);
            } 
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
                        Event
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <FormLabel className="form-label">Name of event</FormLabel>
                        <Form.Control
                            type="text"
                            name="event_name"
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
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer> 
                    <Button type="submit" onClick={props.onHide}>Save</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    );
}