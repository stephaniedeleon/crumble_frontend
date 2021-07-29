import "./AddEvent.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddEvent(props) {

    const subId = parseInt(props.subId);
    const mainId = props.mainId;


    const { setEvents, setErrors, setIsLoading } = useContext(AuthContext);

    const [form, setForm] = useState({
        event_name: "",
        date: "",
    });


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

        let result;

        //for maintabs
        if (subId === 0) {

            result = await apiClient.createEventForMain({ 
                main_id: mainId,
                event: {
                    event_name: form.event_name,
                    date: form.date
                }
            }); 

        //for subtabs
        } else {

            result = await apiClient.createEventForSub({ 
                sub_id: subId,
                event: {
                    event_name: form.event_name,
                    date: form.date
                }
            });
        }

        
        const { data, error } = result;

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addEvent(data?.event);
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
        <Form onSubmit={handleOnSubmit} className="modal-area">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a new event
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Name of new event</FormLabel>
                    <Form.Control
                        type="text"
                        name="event_name"
                        className="input-field"
                        placeholder="Event Name"
                        onChange={handleOnInputChange}
                        value={form.event_name}
                        required
                    />
                    <FormLabel className="form-label">Date of event</FormLabel>
                    <Form.Control
                        type="datetime-local"
                        name="date"
                        className="input-field"
                        onChange={handleOnInputChange}
                        value={form.date}
                        required
                    />
                </FormGroup>
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide}>Add Event</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}