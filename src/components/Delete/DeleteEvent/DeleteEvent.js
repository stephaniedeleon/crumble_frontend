import "./DeleteEvent.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";
import { formatDate } from "utils/format";


export default function DeleteEvent(props) {

    const { events, setEvents, setErrors, setIsLoading} = useContext(AuthContext);

    const event = props.event;
    const event_id = parseInt(event.id);


    //deletes an event from list of events
    const deleteEvent = (deletedId) => {
        setEvents(events.filter(filteredEvent => filteredEvent.id !== deletedId));
    }
    

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteEvent(event_id);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteEvent(event_id);
        }

        setIsLoading(false);
    }


    return (
        <Modal
            {...props}
            backdrop="static"
            keyboard={false}
            className="delete-modal"
        >
            <div className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the event: {event.event_name} on {formatDate(event.date)}?
                    
                    <div className="modal-button">
                        <Button variant="secondary" onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleOnDelete}>
                            Delete {event.event_name}
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}