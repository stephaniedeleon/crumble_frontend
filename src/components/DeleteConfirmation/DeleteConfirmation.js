import "./DeleteConfirmation.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";


export default function MainTab(props) {

    const { maintabs, setMaintabs, setErrors, setIsLoading} = useContext(AuthContext);

    const maintab = props.maintab;


    //deletes a maintab to list of maintabs
    const deleteMaintab = (deletedId) => {
        setMaintabs(maintabs.filter(filteredMaintab => filteredMaintab.id !== deletedId))
    }
    

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteMaintab(maintab.id);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteMaintab(maintab.id);
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
                Are you sure you want to delete the main tab: {maintab.name}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button type="submit" onClick={handleOnDelete}>Delete {maintab.name}</Button>
            </Modal.Footer>
        </Modal>
    );
}