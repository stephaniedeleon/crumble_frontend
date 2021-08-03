import "./DeleteTask.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

export default function DeleteTask(props) {

    const { setErrors, setIsLoading} = useContext(AuthContext);
    const { tasks, setTasks, events, setEvents } = useContext(GlobalContext);

    const task = props.task;
    const task_id = parseInt(task.id);

    let toDeleteEventId;

    //deletes a task from list of tasks
    const deleteTask = (deletedId) => {

        setTasks(tasks.filter(filteredTask => filteredTask.id !== deletedId));

        //finds an event associated to the to be deleted task
        const toDeleteEvent = events.filter(filteredEvent => filteredEvent.task_id === deletedId)
        
        //if it is found, it will also delete the event associated with it
        if(toDeleteEvent.length !== 0) {
            toDeleteEventId = toDeleteEvent[0].id;
            deleteEvent();
        }
    }

    //deletes event associated with the task from list of events
    const deleteEvent = async () => {

        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteEvent(toDeleteEventId);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            setEvents(events.filter(filteredEvent => filteredEvent.id !== toDeleteEventId));
        }

        setIsLoading(false);
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
                        <Button onClick={props.onHide} className="del-button">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleOnDelete} className="button">
                            Delete {task.details}
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );

}

