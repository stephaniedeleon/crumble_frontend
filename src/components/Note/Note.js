import './Note.css';

import { useState } from 'react';
import { Accordion, Card, Dropdown } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from 'draft-js';
import { DeleteNote, UpdateNote } from 'components';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Note(props) {
    const note = props.note;

    const details = convertFromRaw(note.details);

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(details));

    // method to show modal for deleting confirmation and editing
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={note.id}>
                    {note.title}
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
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={note.id}>
                    <Card.Body>
                        <Editor toolbarHidden editorState={editorState} readOnly/>
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