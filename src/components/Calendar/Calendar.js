import "./Calendar.css";

import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";
import { AddEvent, Event } from "components";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Calendar() {
  const { user, authenticated } = useContext(AuthContext);
  const { events, setEvents} = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const { mainId, subId } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents([]); //clears
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
    };

    if (authenticated) {
      fetchEvents();
    }
  }, [authenticated, user, mainId, setEvents, subId]);

  //method to show modal for adding event...
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="Calendar">
      <div className="title">
        <div className="compName">
          <h6>Calendar</h6>
        </div>

        <div className="addBtn">
          <i class="bi-calendar-plus" onClick={() => setModalShow(true)}></i>
        </div>

        <AddEvent
          mainId={mainId}
          subId={subId}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>

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
