import './AddNote.css';

import { Modal, Form, FormGroup, FormLabel, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState, useContext } from 'react';
import AuthContext from 'context/auth';
import apiClient from 'services/apiClient';

export default function AddNote(props) {
    
    const { setNotes, setErrors, setIsLoading } = useContext(AuthContext);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [form, setForm] = useState({
        title: "",
        details: "",
    });

    // adds a new note to list of notes
    const addNote = (newNote) => {
        setNotes((oldNotes) => [...oldNotes, newNote]);
    }

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        console.log(editorState);

        // let result;

        // if (parseInt(props.subId) === 0) {
        //     result = await apiClient.createNoteFromMain({
        //         main_id: parseInt(props.mainId),
        //         note: {
        //             title: form.title,
        //             details: form.details,
        //         }
        //     });
        // } else {
        //     result = await apiClient.createNoteFromSub({
        //         sub_id: parseInt(props.subId),
        //         note: {
        //             title: form.title,
        //             details: form.details,
        //         }
        //     })
        // }

        // const { data, error } = result;

        // if (error) {
        //     setErrors((e) => ({ ...e, form: error }));
        // } else {
        //     setErrors((e) => ({ ...e, form: null }));
        //     addNote(data?.note);
        //     setForm({ title: "", details: "" });
        // }

        setIsLoading(false);
    }

    return (
        <Modal 
            {...props}
            size="lg"
            centered
        >
            <Form onSubmit={handleOnSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a new note
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <FormLabel className="form-label">Title of new note</FormLabel>
                        <Form.Control
                            type="text"
                            name="title"
                            className="input-field"
                            placeholder="Note Title"
                            onChange={handleOnInputChange}
                            value={form.title}
                            required
                        />
                    </FormGroup>
                    <br />
                    <div style={{ border: "1px solid black", padding: "10px", minHeight: "400px" }}>
                        <Editor editorState={editorState} onEditorStateChange={setEditorState} />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" onClick={props.onHide}> Add Note </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}