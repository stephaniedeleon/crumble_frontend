import "./SubTab.css"

import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from "context/global";
import { useContext } from "react";
import { DeleteSubtab, UpdateSubtab } from "components";
import { Dropdown } from "react-bootstrap";
import apiClient from "services/apiClient";
 
export default function SubTab(props) {

    const [completed, setCompleted] = useState(props.subtab.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkSubtab(props.subtab.id);
        else await apiClient.markSubtab(props.subtab.id);
        setCompleted(!completed);

    }

    const { digIntoTab } = useContext(GlobalContext);

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const subtab = props.subtab;

    return (
        <div className="SubTab">

            <div className="subtab">
                <label className="container">
                    <input type="checkbox" checked={completed} onChange={handleChange} />
                    <span className="checkmark"></span>
                    <h6>
                        <i className="bi-folder"/>
                        <Link to={`/home/${props.mainId}/${subtab.id}`} onClick={() => digIntoTab(subtab.id)} className="details" >
                            {subtab.name}
                        </Link>
                    </h6>
                </label>

                <div className="actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-options">
                            <i className= "bi-three-dots"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="options">
                            <Dropdown.Item id="option" onClick={() => setEditModalShow(true)}>
                                <i className="bi-pencil-square"/> Rename
                            </Dropdown.Item>
                            <Dropdown.Item id="option" onClick={() => setDeleteModalShow(true)}>                    
                                <i className="bi-trash"/> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>


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