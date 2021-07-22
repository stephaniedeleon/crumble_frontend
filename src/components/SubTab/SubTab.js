import "./SubTab.css"

import { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from "services/apiClient";
 
export default function SubTab(props) {

    const [completed, setCompleted] = useState(props.subtab.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkSubtab(props.subtab.id);
        else await apiClient.markSubtab(props.subtab.id);
        setCompleted(!completed);

    }

    return (
        <div className="SubTab">
            <InputGroup className="mb-3">
                <InputGroup.Checkbox checked={completed} onChange={handleChange} />
                <FormControl style={{ textAlign: "left" }} as={Link} to={`/home/${props.mainId}/${props.subtab.id}`}> {props.subtab.name} </FormControl>
            </InputGroup>
        </div>
    );
} 