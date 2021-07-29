import "./DeleteTask.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function DeleteTask(props) {

    const { tasks, setTasks, setErrors, setIsLoading} = useContext(AuthContext);

    const task = props.task;
    const task_id = parseInt(task.id);


    //deletes a task from list of tasks
    const deleteTask = (deletedId) => {
        setTasks(tasks.filter(filteredTask => filteredTask.id !== deletedId));
    }
    

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteTask(task_id);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteTask(task_id);
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
                    Are you sure you want to delete the task: {task.details}?
                    
                    <div className="modal-button">
                        <Button variant="secondary" onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleOnDelete}>
                            Delete {task.details}
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );

}

