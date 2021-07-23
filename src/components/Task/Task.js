import "./Task.css"

import { useState } from 'react';
import apiClient from "services/apiClient";
import { DeleteTask } from "components";

export default function Task(props) {

    const [completed, setCompleted] = useState(props.task.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkTask(props.task.id);
        else await apiClient.markTask(props.task.id);
        setCompleted(!completed);

    }

    //method to show modal for deleting confirmation...
    const [modalShow, setModalShow] = useState(false);
    const task = props.task;

    return (
        <div className="Task">
            {/* <InputGroup className="mb-3">
                <div className="details">
                    <InputGroup.Checkbox id="checkbox" checked={completed} onChange={handleChange} />
                    <Alert id="taskName">
                        {task.details}
                    </Alert>
                </div>

                <div className="delete">
                    <i class="bi-x" onClick={() => setModalShow(true)}></i>
                </div>
            </InputGroup> */}

            <div class="custom-control custom-checkbox" id="task">
                <input type="checkbox" class="custom-control-input" id={task.id} checked={completed} onChange={handleChange} />
                <label class="custom-control-label" for={task.id} id="taskName">
                    <span className="details">
                        {task.details}
                    </span>
                </label>
                <div className="delete">
                    <i class="bi-x" onClick={() => setModalShow(true)}></i>
                </div>
            </div>

            <DeleteTask
                show={modalShow}
                onHide={() => setModalShow(false)}
                task={task}
            />
        </div>
    ); 
}