import "./Calendar.css"

import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";
import { AddEvent, Event } from "components";
import { Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Calendar() {

    const { events, setEvents, user, authenticated } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const { mainId, subId } = useParams();


    useEffect(() => {

        const fetchEvents = async () => {
            setIsFetching(true);

            let result;

            if (parseInt(subId) === 0) {
                result = await apiClient.listEventsByMaintab(parseInt(mainId));
            } else {
                result = await apiClient.listEventsBySubtab(parseInt(subId));
            }

            const { data, error } = result;

            if (data) setEvents(data?.events);
            if (error) setError(error);

            setIsFetching(false);
        }
    
        if(authenticated) {
            fetchEvents();
        }

    }, [authenticated, user, mainId, setEvents, subId]);


    //method to show modal for adding event...
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="Calendar">

            <Button variant="outline-success" onClick={() => setModalShow(true)}>
                Add event
            </Button>

            <AddEvent
                mainId={mainId}
                subId={subId}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <br />
            <div className="calendar-area">
                <ListGroup variant="flush">
                    {events.map((event) => (
                        <Event key={event.id} event={event} />
                    ))}
                </ListGroup>
            </div>
        </div>
    );
}