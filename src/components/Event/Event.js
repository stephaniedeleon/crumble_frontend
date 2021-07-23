import "./Event.css"

import { ListGroup, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { DeleteEvent } from "components";
import { formatDate } from "utils/format";


export default function Event({ key, event }) {

    //method to show modal for deleting confirmation...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="Event">
            <ListGroup.Item className="eventItem">
                <div className="details">
                    <p className="eventName">{event.event_name}</p>
                    <p className="eventDate">{formatDate(event.date)}</p>  
                </div>

                <div className="delete">
                    <i class="bi-x" onClick={() => setModalShow(true)}></i>
                </div>
            </ListGroup.Item>

            <DeleteEvent
                show={modalShow}
                onHide={() => setModalShow(false)}
                event={event}
            />
        </div>
    );
}