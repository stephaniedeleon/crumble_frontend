import "./DeleteSubtab.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function DeleteSubtab(props) {

    const { subtabs, setSubtabs, setErrors, setIsLoading} = useContext(AuthContext);

    const subtab = props.subtab;
    const subtab_id = parseInt(subtab.id);


    //deletes a task from list of tasks
    const deleteSubtab = (deletedId) => {
        setSubtabs(subtabs.filter(filteredSubtab => filteredSubtab.id !== deletedId));
    }
    

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteSubtab(subtab_id);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteSubtab(subtab_id);
        }

        setIsLoading(false);
    }


    return (
        <Modal
            {...props}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the subtab: {subtab.name}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button type="submit" onClick={handleOnDelete}>
                    Delete {subtab.name}
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

