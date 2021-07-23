import "./SubTab.css"

import { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from "context/auth";
import { useContext } from "react";
import { DeleteSubtab } from "components";
import apiClient from "services/apiClient";
 
export default function SubTab(props) {

    const [completed, setCompleted] = useState(props.subtab.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkSubtab(props.subtab.id);
        else await apiClient.markSubtab(props.subtab.id);
        setCompleted(!completed);

    }

    const { digIntoTab } = useContext(AuthContext);

    //method to show modal for deleting confirmation...
    const [modalShow, setModalShow] = useState(false);
    const subtab = props.subtab;

    return (
        <div className="SubTab">
            {/* <InputGroup className="mb-3">
                <div className="details">
                    <InputGroup.Checkbox id="checkbox" checked={completed} onChange={handleChange} />
                    <FormControl id="subtabName" as={Link} to={`/home/${props.mainId}/${subtab.id}`} onClick={() => digIntoTab(subtab.id)} > {subtab.name} </FormControl>
                </div>

                <div className="delete">
                    <i class="bi-x" onClick={() => setModalShow(true)}></i>
                </div>
            </InputGroup> */}

            <div class="custom-control custom-checkbox" id="subtab">
                <input type="checkbox" class="custom-control-input" id={subtab.id} checked={completed} onChange={handleChange} />
                <label class="custom-control-label" for={subtab.id} id="subtabName" >
                    <Link to={`/home/${props.mainId}/${subtab.id}`} onClick={() => digIntoTab(subtab.id)} className="details" >
                        {subtab.name}
                    </Link> 
                </label>
                <div className="delete">
                    <i class="bi-x" onClick={() => setModalShow(true)}></i>
                </div>
            </div>

            <DeleteSubtab
                show={modalShow}
                onHide={() => setModalShow(false)}
                subtab={subtab}
            />
        </div>
    );
} 