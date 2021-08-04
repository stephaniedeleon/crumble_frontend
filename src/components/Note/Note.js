import './Note.css';

import { useState, useEffect, useContext } from 'react';
import AuthContext from "context/auth";
import { Accordion, Card, Dropdown } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from 'draft-js';
import { DeleteNote, UpdateNote } from 'components';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Note(props) {

    const note = props.note;

    const { notes, setNotes } = useContext(AuthContext);

    const [editorState, setEditorState] = useState();

    useEffect(() => {

        const fetchNewNote = async () => {

            const details = convertFromRaw(note.details);
            setEditorState(EditorState.createWithContent(details));
        }
    
        fetchNewNote();

    }, [setNotes, note.details]);

    // method to show modal for deleting confirmation and editing
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={note.id}>
                    <div className="details">
                        {note.title}
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={note.id}>
                    <Card.Body>

                        <Editor toolbarHidden editorState={editorState} readOnly/>

                        <div className="actions">
                            <div id="options">
                                <div id="option" onClick={() => setDeleteModalShow(true)}>                    
                                    <i className="bi-trash"/>
                                </div>
                                <div id="option" onClick={() => setEditModalShow(true)}>
                                    <i className="bi-pencil-square"/>
                                </div>
                            </div>

                            {/* <Dropdown>
                                <Dropdown.Toggle id="dropdown-options">
                                    <i className= "bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu id="options">
                                    <Dropdown.Item id="option" onClick={() => setEditModalShow(true)}>
                                        <i className="bi-pencil-square"/> Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item id="option" onClick={() => setDeleteModalShow(true)}>                    
                                        <i className="bi-trash"/> Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>

                    </Card.Body>
                    
                </Accordion.Collapse>
            </Card>

            <DeleteNote
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                note={note}
            />

            <UpdateNote
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                note={note}
            />
        </>
    )
}