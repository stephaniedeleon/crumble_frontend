import "./SubTab.css"

import { useState } from 'react';
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
            
            <div class="custom-control custom-checkbox" id="subtab">
                <input type="checkbox" class="custom-control-input" id={subtab.id} checked={completed} onChange={handleChange} />
                <label class="custom-control-label" for={subtab.id} id="subtabName" >
                    <Link to={`/home/${props.mainId}/${subtab.id}`} onClick={() => digIntoTab(subtab.id)} className="details" >
                        <i class="bi-folder"></i> {subtab.name}
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
                updateDirectory={props.updateDirectory}
            />
        </div>
    );
} 