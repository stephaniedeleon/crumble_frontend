import "./AddEvent.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function AddEvent(props) {

    const subId = parseInt(props.subId);
    const mainId = props.mainId;


    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { setEvents } = useContext(GlobalContext);

    const [form, setForm] = useState({
        event_name: "",
        date: "",
        notes: "",
    });


    // adds a new event to list of events
    const addEvent = (newEvent) => {
        setEvents((oldEvents) => [newEvent, ...oldEvents]);
    }


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
        console.log({[event.target.name]: event.target.value})
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
                    date: form.date,
                    notes: form.notes,
                }
            }); 

        //for subtabs
        } else {

            result = await apiClient.createEventForSub({ 
                sub_id: subId,
                event: {
                    event_name: form.event_name,
                    date: form.date,
                    notes: form.notes,
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
                        date: "",
                        notes: "",});
        } 

        setIsLoading(false);
    }


    return (
      <Modal
            {...props}
            size="lg"
            className="AddEvent"
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
                    <FormLabel className="form-label"><div>Additional notes</div> &nbsp; <p>(optional)</p></FormLabel>
                    <Form.Control
                        type="text"
                        name="notes"
                        className="input-field"
                        placeholder="..."
                        onChange={handleOnInputChange}
                        value={form.notes}
                    />
                </FormGroup>
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide} className="button">Add Event</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}