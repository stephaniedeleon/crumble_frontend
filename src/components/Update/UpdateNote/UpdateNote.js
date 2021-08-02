import './UpdateNote.css';

import { Modal, Form, FormGroup, FormLabel, Button } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState, useContext } from 'react';
import AuthContext from 'context/auth';
import GlobalContext from 'context/global';
import apiClient from 'services/apiClient';

export default function UpdateNote(props) {

    const { setErrors, setIsLoading } = useContext(AuthContext);
    const { notes, setNotes } = useContext(GlobalContext);

    const note = props.note;

    const details = convertFromRaw(note.details);

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(details));

    const [form, setForm] = useState({
        title: note.title,
    })

    // update note in list of notes
    const updateNote = (updatedNote) => {

        setNotes(oldNotes => oldNotes.map(oldNote => oldNote.id === updatedNote.id ? updatedNote : oldNote));

    }

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const result = await apiClient.updateNote(note.id, {
            title: form.title,
            details: convertToRaw(editorState.getCurrentContent()),
        });

        const  { data, error } = result;

        const dbNote = data.note;

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            setForm({ title: dbNote.title });
            updateNote(dbNote);
        }

        setIsLoading(false);

    }

    return (
        <Modal
            {...props}
            size="lg"
            className="UpdateNote"
            centered
        >
            <Form onSubmit={handleOnSubmit} className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Note
                    </Modal.Title>s
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <FormLabel className="form-label"> New title of note  </FormLabel>
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
                    <div className="editor">
                        <Editor editorState={editorState} onEditorStateChange={setEditorState} />
                    </div>
                    <div className="modal-button">
                        <Button type="submit" onClick={props.onHide} className="button"> Save </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}