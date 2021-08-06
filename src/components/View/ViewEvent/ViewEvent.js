import "./ViewEvent.css"

import { Modal, Form, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { DeleteEvent, UpdateEvent } from "components";
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


    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const showDeleteModal = () => {
        setDeleteModalShow(true);
        props.setViewModalShow(false);
    }

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

                <Modal.Footer>
                    <div className="actions">
                        <div id="options">
                            <div id="option" onClick={() => setEditModalShow(true)}>
                                <i className="bi-pencil-square"/> Edit
                            </div>
                            <div id="option" onClick={showDeleteModal}>                    
                                <i className="bi-trash"/> Delete
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Form>

            <DeleteEvent
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                event={calEvent}
            />

            <UpdateEvent
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                event={calEvent}
            />  

        </Modal>
    );
}