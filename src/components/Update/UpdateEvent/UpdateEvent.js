import "./UpdateEvent.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function UpdateEvent(props) {

    const { events, setErrors, setIsLoading } = useContext(AuthContext);

    const calEvent = props.event;
    const event_id = parseInt(calEvent.id);


    //update event in list of events
    const updateEvent = (updatedId) => {
        let found = events.find(foundEvent => foundEvent.id === updatedId);
        found.event_name = form.event_name;
        found.date = form.date;
    }


    const [form, setForm] = useState({
        event_name: "",
        date: "",
    });

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }


    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.updateEvent(event_id, {
            event_name: form.event_name,
            date: form.date
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            updateEvent(event_id);
            setForm({ event_name: "",
                        date: "",});
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
                    Edit Event
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">New name of event</FormLabel>
                    <Form.Control
                        type="text"
                        name="event_name"
                        className="input-field"
                        placeholder={calEvent.event_name}
                        onChange={handleOnInputChange}
                        value={form.event_name}
                        required
                    />

                    <div className="input-field">
                        <label htmlFor="date">Due Date</label>
                        <input type="datetime-local"
                            name="date"
                            // placeholder={calEvent.date}
                            value={form.date} 
                            onChange={handleOnInputChange} />
                    </div>
                </FormGroup>
            </Modal.Body>

            <Modal.Footer> 
                <Button type="submit" onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Form>

      </Modal>
    );
}