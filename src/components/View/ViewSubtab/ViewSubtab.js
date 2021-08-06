import "./ViewSubtab.css"

import { Modal, Form, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import { DeleteSubtab, UpdateSubtab } from "components";


export default function ViewSubtab(props) {

    const subtab = props.subtab;

    const [form, setForm] = useState({
        name: subtab.name,
        priority: subtab.priority,
    });


    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);


    return (
      <Modal
            {...props}
            size="lg"
            className="UpdateSubtab"
            aria-labelledby="contained-modal-title-vcenter"
            centered
      >
        <Form className="modal-area">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {form.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Priority</FormLabel>
                    <Form.Control
                        disabled
                        as="select"
                        name="priority"
                        className="input-field"
                        aria-label="Select priority"
                        value={form.priority}
                        custom
                    >
                        <option selected></option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Control> 
                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <div className="actions">
                    <div id="options">
                        <div id="option" onClick={() => setEditModalShow(true)}>
                            <i className="bi-pencil-square"/> Edit
                        </div>
                        <div id="option" onClick={() => setDeleteModalShow(true)}>                    
                            <i className="bi-trash"/> Delete
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Form>

        <DeleteSubtab
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            subtab={subtab}
            updateDirectory={props.updateDirectory}
        />

        <UpdateSubtab
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            subtab={subtab}
        />

      </Modal>
    );
}