import "./MainTab.css"

import { Card } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { DeleteConfirmation } from "components";
import { Link } from 'react-router-dom';
import AuthContext from "context/auth";


export default function MainTab({ key, maintab }) {

    //method to show modal for deleting confirmation...
    const [modalShow, setModalShow] = useState(false);

    const { setTabNavigationStack } = useContext(AuthContext)

    //prepares the navigation stack for use
    const prepareStack = () => {
        setTabNavigationStack(['root'])
    }

    return (
        <div className="MainTab">
            <div className="card">
                <Card className="maintab">
                        <div className="closeBtn"> 
                            <i class="bi-x" onClick={() => setModalShow(true)}></i>
                        </div>
                        <Link to={`/home/${maintab.id}/0`} onClick={prepareStack} >
                            <Card.Body className="maintabName">
                                <Card.Title>{maintab.name}</Card.Title>
                            </Card.Body>
                        </Link>
                        <DeleteConfirmation
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            maintab={maintab}
                        />
                </Card>
            </div>
        </div>
    );
}