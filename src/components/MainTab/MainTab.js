import "./MainTab.css"

import { Card, Dropdown } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { DeleteMaintab, UpdateMaintab } from "components";
import { Link } from 'react-router-dom';
import AuthContext from "context/auth";


export default function MainTab({ key, maintab }) {

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const { setTabNavigationStack } = useContext(AuthContext)

    //prepares the navigation stack for use
    const prepareStack = () => {
        setTabNavigationStack(['root'])
    }

    return (
        <div className="MainTab">
            <div className="card">

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-options">
                        <i class= "bi-three-dots-vertical"></i>
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

                <Link to={`/home/${maintab.id}/0`} onClick={prepareStack} className="maintab" >
                    <Card>
                            <Card.Body className="maintabName">
                                <Card.Title> <i class="bi-folder"/>  {maintab.name}</Card.Title>
                            </Card.Body>     
                    </Card>
                </Link>

                <DeleteMaintab
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    maintab={maintab}
                />

                <UpdateMaintab
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                    maintab={maintab}
                /> 

            </div>
        </div>
    );
}