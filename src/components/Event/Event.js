import "./Event.css"

import { ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { UpdateEvent } from "components";
import { formatDate } from "utils/format";


export default function Event({ event }) {

    //method to show modal for viewing or editing...
    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <div className="Event">
            <ListGroup.Item className="eventItem">
                <div className="details">
                    <p className="eventName">{event.event_name}</p>
                    <p className="eventDate">{formatDate(event.date)}</p>  
                </div>

                <div className="actions" onClick={() => setEditModalShow(true)}>
                    <i className= "bi-three-dots"></i>
                </div>
            </ListGroup.Item> 

            <UpdateEvent
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                event={event}
            />  

        </div>
    );
}