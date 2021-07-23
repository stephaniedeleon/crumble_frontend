import "./Task.css"

import { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
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
            <InputGroup className="mb-3">
                <div className="details">
                    <InputGroup.Checkbox id="checkbox" checked={completed} onChange={handleChange} />
                    <FormControl id="taskName" value={task.details} disabled/>
                </div>
                <div className="delete">
                    <i class="bi-x" onClick={() => setModalShow(true)}></i>
                </div>
            </InputGroup>

            <DeleteTask
                show={modalShow}
                onHide={() => setModalShow(false)}
                task={task}
            />
        </div>
    ); 
}