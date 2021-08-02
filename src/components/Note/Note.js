import './Note.css';

import { useState, useEffect, useContext } from 'react';
import AuthContext from "context/auth";
import { Accordion, Card, Dropdown } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from 'draft-js';
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