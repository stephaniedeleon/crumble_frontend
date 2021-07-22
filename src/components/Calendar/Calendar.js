import "./Calendar.css"

import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";
import {} from "components";
import { useParams } from 'react-router-dom';

export default function Calendar() {

    const { events, setEvents, user, authenticated } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    // const [modalShow, setModalShow] = useState(false);

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

    }, [authenticated, mainId, setEvents, subId]);


    return (
        <div className="Calendar">
            Calendar
            <div className="calendar-area">
                {events.map((event) => (
                    <p>{event.event_name}</p>
                ))}
            </div>
        </div>
    );
}