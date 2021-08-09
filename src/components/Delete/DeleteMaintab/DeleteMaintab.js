import "./DeleteMaintab.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";


export default function DeleteMaintab(props) {

    const { setErrors, setIsLoading} = useContext(AuthContext);
    const { maintabs, setMaintabs } = useContext(GlobalContext);

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
            centered
            backdrop="static"
            keyboard={false}
            className="delete-modal"
        >
            <div className="modal-area">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure you want to delete the main tab: 
                    </div>
                    <br/> 
                    <div className="deleteItem">
                        {maintab.name}
                    </div>

                    <div className="modal-button">
                        <Button onClick={props.onHide} className="cancel-button">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleOnDelete} className="button">
                            Delete MainTab: {maintab.name}
                        </Button>
                    </div>
                </Modal.Body>
            </div>
            
        </Modal>
    );
}