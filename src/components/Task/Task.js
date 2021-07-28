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
            <div class="custom-control custom-checkbox" id="task">
                <input type="checkbox" class="custom-control-input" id={`task` + task.id} checked={completed} onChange={handleChange} />
                <label class="custom-control-label" for={`task` + task.id} id="taskName">
                    <div className="details">
                        {task.details}
                    </div>
                </label>
                <div className="delete">
                    {/* <i class="bi-pencil" onClick={() => setEditModalShow(true)}></i> */}
                    <i class="bi-x" onClick={() => setDeleteModalShow(true)}></i>

                    {/* <i class="bi-pencil-square" onClick={() => setEditModalShow(true)}></i>
                    <i class="bi-x-square" onClick={() => setDeleteModalShow(true)}></i> */}
                </div>

                {/* <Dropdown id="dropdown">
                    <Dropdown.Toggle id="dropdown-options">
                        <i class= "bi-three-dots"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="options">
                        <Dropdown.Item id="option" onClick={() => setEditModalShow(true)}>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item id="option" onClick={() => setDeleteModalShow(true)}>                    
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </div>

            {/* onClick={() => setEditModalShow(true)} */}

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