import "./Task.css"

import { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import apiClient from "services/apiClient";

export default function Task(props) {

    const [completed, setCompleted] = useState(props.task.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkTask(props.task.id);
        else await apiClient.markTask(props.task.id);
        setCompleted(!completed);

    }

    return (
        <div className="Task">
            <InputGroup className="mb-3">
                <InputGroup.Checkbox checked={completed} onChange={handleChange} />
                <FormControl value={props.task.details} readOnly/>
            </InputGroup>
        </div>
    ); 
}