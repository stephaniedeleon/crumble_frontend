import "./Event.css"

import { ListGroup, Dropdown } from "react-bootstrap";
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

                <div class="actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-options">
                            <i class= "bi-three-dots"></i>
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