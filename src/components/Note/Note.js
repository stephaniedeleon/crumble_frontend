import './Note.css';

import { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Note(props) {
    const note = props.note;

    const details = convertFromRaw(note.details);

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(details));

    return (
        <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={note.id}>
                    {note.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={note.id}>
                    <Card.Body>
                        <Editor toolbarHidden editorState={editorState} readOnly/>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </>
    )
}