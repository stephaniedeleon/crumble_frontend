import './AddSubTab.css';

import { Modal, Form, FormGroup, FormLabel, Button, FormControl } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddSubTab(props) {

    const { setSubtabs, setErrors, setIsLoading, tabNavigationStack,  } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: '',
    });

    // adds a new a sutab to list of subtabs
    const addSubtab = (newSubtab) => {
        setSubtabs((oldSubtabs) => [newSubtab, ...oldSubtabs]);
        updateDirectory(newSubtab);
    }

    /** Adds subtab to front end directory */
    const updateDirectory = (newSubtab) => {

        const configuredNewSubtab = directoryConfiguration(newSubtab)
        const index = tabNavigationStack.length - 1
        let currentSubtabId = tabNavigationStack[index]

        if (currentSubtabId !== 'root') {
            const targetObject = findTargetSubtab(props.directory, currentSubtabId)
            targetObject?.children.unshift(configuredNewSubtab)
        } else { 
            props.directory.children.unshift(configuredNewSubtab)
        }
    }

    /** Finds and returns the object whose child must be added to */
    const findTargetSubtab = (searchObject, targetId) => {

        const targetObject = searchObject.children.find(element => element.id === targetId)

        if (targetObject !== undefined)
            return targetObject;

        let result;
        let currentElement;
        for (let index = 0; index < searchObject.children.length; index++) {
            currentElement = searchObject.children[index]
            result = findTargetSubtab(currentElement, targetId)

            if (result !== null && result !== undefined)
                return result;
        }

        return null;
    }

    /** Configures subtab returned from api call to match directory data structure */
    const directoryConfiguration = (newSubtab) => {
        return {
            id: newSubtab.id,
            name: newSubtab.name,
            children: []
        }
    }

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }

    const handleOnSubmit = async (event) => {
        
        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        let result;

        if (parseInt(props.subId) === 0) {
            result = await apiClient.createSubtabFromMain({
                main_id: parseInt(props.mainId),
                subtab: {
                    name: form.name,
                }
            });
        } else {
            result = await apiClient.createSubtabFromSub({
                sub_id: parseInt(props.subId),
                subtab: {
                    name: form.name,
                }
            })
        }

        const { data, error } = result;

        if (error) {
            setErrors((e) => ({ ...e, form: error })); 
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addSubtab(data.subtab);
            setForm({name: ""});
        }

        setIsLoading(false);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Form onSubmit={handleOnSubmit}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a new sub tab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Name of new sub tab</FormLabel>
                    <Form.Control
                        type="text"
                        name="name"
                        className="input-field"
                        placeholder="Sub Tab Name"
                        onChange={handleOnInputChange}
                        value={form.name}
                        required
                    />
                </FormGroup>
            </Modal.Body>

            <Modal.Footer> 
                <Button type="submit" onClick={props.onHide}>Add SubTab</Button>
            </Modal.Footer>
        </Form>

      </Modal>
    )

}