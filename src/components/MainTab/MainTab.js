import "./MainTab.css"

import { Card, CloseButton } from "react-bootstrap";
import React, { useState } from "react";
import { DeleteConfirmation } from "components";
import { Link } from 'react-router-dom';


export default function MainTab({ key, maintab }) {

    //method to show modal for deleting confirmation...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="MainTab">
            <div className="card">
                    <Card className="maintab">
                        <CloseButton onClick={() => setModalShow(true)} />
                        <Link to={`/home/${maintab.id}`} >
                            <Card.Body>
                                <Card.Title className="maintabName">{maintab.name}</Card.Title>
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