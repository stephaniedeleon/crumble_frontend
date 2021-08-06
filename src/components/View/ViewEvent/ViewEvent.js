import "./ViewEvent.css"

import { Modal, Form, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { formatDateForInputDisplay } from "utils/format";

export default function ViewEvent(props) {

    const calEvent = props.event;

    const [form, setForm] = useState({});

    useEffect(() => {
        
        setForm ({
            event_name: calEvent.event_name,
            date: formatDateForInputDisplay(calEvent.date),
            notes: calEvent.notes,
        });

    }, [calEvent]);


    return (
        <Modal
            {...props}
            size="lg"
            className="UpdateEvent"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {form.event_name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        {/* <FormLabel className="form-label">Name of event</FormLabel>
                        <Form.Control
                            readOnly
                            type="text"
                            name="event_name"
                            maxLength={20}
                            className="input-field"
                            onChange={handleOnInputChange}
                            value={form.event_name}
                        /> */}

                        <FormLabel className="form-label">Date of event</FormLabel>
                        <Form.Control
                            disabled
                            type="datetime-local"
                            name="date"
                            className="input-field"
                            value={form.date}
                        />

                        <FormLabel className="form-label">Additional notes</FormLabel>
                        <Form.Control
                            disabled
                            type="text"
                            name="notes"
                            className="input-field"
                            value={form.notes}
                        />
                    </FormGroup>
                </Modal.Body>
            </Form>

        </Modal>
    );
}