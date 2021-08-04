import "./MainTab.css"

import { Card, Dropdown } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { DeleteMaintab, UpdateMaintab } from "components";
import { Link } from 'react-router-dom';
import GlobalContext from "context/global";


export default function MainTab({ key, maintab }) {

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const { resetTabNavigationStack } = useContext(GlobalContext)


    return (
        <div className="MainTab">
            <div className="card">
            
                <div className="card-wrapper">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-options">
                            <i className= "bi-three-dots-vertical"></i>
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

                    <Link to={`/home/${maintab.id}/0`} >
                        <Card className="maintab" onClick={resetTabNavigationStack}>
                                <Card.Body className="maintabName">
                                    <Card.Title> <i className="bi-folder"/>  {maintab.name}</Card.Title>
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