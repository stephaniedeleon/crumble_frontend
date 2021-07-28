import "./SubTab.css"

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "context/auth";
import { useContext } from "react";
import { DeleteSubtab, UpdateSubtab } from "components";
import apiClient from "services/apiClient";
 
export default function SubTab(props) {

    const [completed, setCompleted] = useState(props.subtab.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkSubtab(props.subtab.id);
        else await apiClient.markSubtab(props.subtab.id);
        setCompleted(!completed);

    }

    const { digIntoTab } = useContext(AuthContext);

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const subtab = props.subtab;

    return (
        <div className="SubTab">
            
            <div class="custom-control custom-checkbox" id="subtab">
                <input type="checkbox" class="custom-control-input" id={`subtab` + subtab.id} checked={completed} onChange={handleChange} />
                <label class="custom-control-label" for={`subtab` + subtab.id} id="subtabName" >
                    <Link to={`/home/${props.mainId}/${subtab.id}`} onClick={() => digIntoTab(subtab.id)} className="details" >
                        <i class="bi-folder"></i> {subtab.name}
                    </Link> 
                </label>
                <div className="delete">
                    <i class="bi-x" onClick={() => setDeleteModalShow(true)}></i>
                    {/* <i class="bi-pencil" onClick={() => setEditModalShow(true)}></i> */}
                </div>
            </div>

            {/* onClick={() => setEditModalShow(true)} */}

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
        </div>
    );
} 