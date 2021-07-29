import "./DeleteMaintab.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";


export default function DeleteMaintab(props) {

    const { maintabs, setMaintabs, setErrors, setIsLoading} = useContext(AuthContext);

    const maintab = props.maintab;


    //deletes a maintab from list of maintabs
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
            className="delete-modal"
        >
            <div className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the main tab: {maintab.name}?

                    <div className="modal-button">
                        <Button onClick={props.onHide} className="del-button">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleOnDelete} className="button">
                            Delete {maintab.name}
                        </Button>
                    </div>
                </Modal.Body>
            </div>
            
        </Modal>
    );
}