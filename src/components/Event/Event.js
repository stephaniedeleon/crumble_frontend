import "./Event.css"

import { ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { DeleteEvent, UpdateEvent } from "components";
import { formatDate } from "utils/format";


export default function Event({ key, event }) {

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <div className="Event">
            <ListGroup.Item className="eventItem">
                <div className="details" id="option" onClick={() => setEditModalShow(true)}>
                    <p className="eventName">{event.event_name}</p>
                    <p className="eventDate">{formatDate(event.date)}</p>  
                </div>

                <div className="delete">
                    <i class="bi-x" onClick={() => setDeleteModalShow(true)}></i>
                </div>
            </ListGroup.Item>

            <DeleteEvent
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                event={event}
            />

            <UpdateEvent
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                event={event}
            />          
        </div>
    );
}