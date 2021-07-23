import "./Event.css"

import { ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { DeleteEvent } from "components";
import { formatDate } from "utils/format";


export default function Event({ key, event }) {

    //method to show modal for deleting confirmation...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="MainTab">
            <ListGroup.Item>
                {event.event_name} - {formatDate(event.date)}  
                ----
                <i class="bi-x" onClick={() => setModalShow(true)}></i> 
            </ListGroup.Item>

            <DeleteEvent
                show={modalShow}
                onHide={() => setModalShow(false)}
                event={event}
            />
        </div>
    );
}