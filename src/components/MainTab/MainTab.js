import "./MainTab.css"

import { Card, Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { DeleteMaintab, UpdateMaintab } from "components";
import { Link } from 'react-router-dom';


export default function MainTab({ key, maintab }) {

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);


    return (
        <div className="MainTab">
            <div className="card">
            
                <div className="card-wrapper">
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

                    <Link to={`/home/${maintab.id}/0`} >
                        <Card className="maintab">
                                <Card.Body className="maintabName">
                                    <Card.Title> <i class="bi-folder"/>  {maintab.name}</Card.Title>
                                </Card.Body>     
                        </Card>
                    </Link>
                </div>

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