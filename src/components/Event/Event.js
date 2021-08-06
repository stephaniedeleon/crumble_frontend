import "./Event.css"

import { ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { ViewEvent } from "components";
import { formatDate } from "utils/format";


export default function Event({ event }) {

    //method to show modal for viewing...
    const [viewModalShow, setViewModalShow] = useState(false);

    return (
        <div className="Event">
            <ListGroup.Item className="eventItem">
                <div className="details">
                    <p className="eventName">{event.event_name}</p>
                    <p className="eventDate">{formatDate(event.date)}</p>  
                </div>

                <div className="actions" onClick={() => setViewModalShow(true)}>
                    <i className= "bi-three-dots"></i>
                </div>
            </ListGroup.Item> 

            <ViewEvent
                show={viewModalShow}
                onHide={() => setViewModalShow(false)}
                setViewModalShow={setViewModalShow}
                event={event}
            />

        </div>
    );
}