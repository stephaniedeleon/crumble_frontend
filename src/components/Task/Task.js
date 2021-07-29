import "./Task.css"

import { useState } from 'react';
import apiClient from "services/apiClient";
import { DeleteTask, UpdateTask } from "components";
import { Dropdown } from "react-bootstrap";

export default function Task(props) {

    const [completed, setCompleted] = useState(props.task.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkTask(props.task.id);
        else await apiClient.markTask(props.task.id);
        setCompleted(!completed);

    }

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const task = props.task;

    return (
        <div className="Task">

            <div class="task">
                <label class="container">
                    <input type="checkbox" checked={completed} onChange={handleChange} />
                    <span class="checkmark"></span>
                    <h6>{task.details}</h6>
                </label>

                <div class="actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-options">
                            <i class= "bi-three-dots"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="options">
                            <Dropdown.Item id="option" onClick={() => setEditModalShow(true)}>
                                <i class="bi-pencil-square"/> Edit
                            </Dropdown.Item>
                            <Dropdown.Item id="option" onClick={() => setDeleteModalShow(true)}>                    
                                <i class="bi-trash"/> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <DeleteTask
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                task={task}
            />

            <UpdateTask
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                task={task}
            />
        </div>
    ); 
}