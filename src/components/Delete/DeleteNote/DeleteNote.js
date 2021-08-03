import "./DeleteNote.css";

import { Button, Modal } from 'react-bootstrap';
import React, { useContext }  from "react";
import AuthContext from 'context/auth';
import GlobalContext from 'context/global';
import apiClient from 'services/apiClient';

export default function DeleteNote(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { notes, setNotes } = useContext(GlobalContext);

    const note = props.note;
    const note_id = parseInt(note.id);

    // delete a note from list of notes
    const deleteNote = (deleteId) => {
        setNotes(notes.filter(filteredNote => filteredNote.id !== deleteId));
    }

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteNote(note_id);

        if  (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteNote(note_id);
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
                    <Modal.Title> Delete Confirmation </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the note: {note.title}?

                    <div className="modal-button">
                        <Button onClick={props.onHide} className="del-button">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleOnDelete} className="button">
                            Delete {note.title}
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )

}