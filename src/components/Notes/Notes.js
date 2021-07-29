import "./Notes.css";

import { Accordion } from 'react-bootstrap';
import { AddNote, Note } from 'components';
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from 'context/auth';
import apiClient from 'services/apiClient';

// Has the list of notes

export default function Notes({ mainId, subId }) {
  const { notes, user, authenticated, setNotes } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // fetches notes
  useEffect(() => {
    const fetchNotes = async () => {
      setNotes([]); // clears
      setIsFetching(true);

      let result;

      if (parseInt(subId) === 0) {
        result = await apiClient.listNotesByMaintab(parseInt(mainId));
      } else {
        result = await apiClient.listNotesBySubtab(parseInt(subId));
      }

      const { data, error } = result;

      if (data) setNotes(data.notes);
      if (error) setError(error);
      
      setIsFetching(false);
    };

    if (authenticated) fetchNotes();
  }, [setNotes, user, authenticated, mainId, subId]);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="Notes">
      <div className="title">
        <div className="compName">
          <h6>Notes</h6>
        </div>

        <div className="addBtn" onClick={() => setModalShow(true)}>
          <i class="bi-journal-plus"></i>
        </div>

        <AddNote
            mainId={mainId}
            subId={subId}
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
      </div>

      <Accordion>
        {notes.map((note) => (
          <Note key={note.id} note={note} mainId={mainId} />
        ))}
      </Accordion>
    </div>
  );
}
