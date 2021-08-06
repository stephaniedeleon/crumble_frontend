import "./ViewTask.css"

import { Modal, Form, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { DeleteTask, UpdateTask } from "components";
import { formatDateForInputDisplay } from "utils/format";

export default function ViewTask(props) {

    const task = props.task;

    const [form, setForm] = useState({});

    useEffect(() => {
        
        setForm ({
            details: task.details,
            priority: task.priority,
            date: task.date === null ? null : formatDateForInputDisplay(task.date),
        });

    }, [task]);


    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);


    return (
      <Modal
            {...props}
            size="lg"
            className="ViewTask"
            aria-labelledby="Update task modal"
            centered
      >
        <Form className="modal-area">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {form.details}
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

                    <FormLabel className="form-label">Due date</FormLabel>
                    <Form.Control
                        disabled
                        type="datetime-local"
                        name="date"
                        className="input-field"
                        value={form.date}
                    />
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

        <DeleteTask
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            task={task}
        />

        <UpdateTask
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            task={task}
            mainId={props.mainId} 
            subId={props.subId}
        />

      </Modal>
    );
}