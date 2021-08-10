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

    //finds an event associated to the to be deleted task
    let toDeleteEvent = events.filter(filteredEvent => filteredEvent.task_id === task_id);

    //deletes a task from list of tasks
    const deleteTask = (deletedId) => {

        setTasks(tasks.filter(filteredTask => filteredTask.id !== deletedId));
        
        //if an event is found, it will also delete the event associated with it
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

                    { toDeleteEvent.length !== 0 ? (
                        <>
                            <div>
                                Are you sure you want to delete the task:
                            </div>
                            <br/>
                            <div className="deleteItem">
                                {task.details}
                            </div>
                            <br/>
                            <div className="deleteNote">
                                Note: This will also delete the event associated with this task. 
                            </div>
                
                            <div className="modal-button">
                                <Button onClick={props.onHide} className="cancel-button">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleOnDelete} className="button">
                                    Delete Task and Event: {task.details}
                                </Button>
                            </div>
                        </>
                    ) : ( 
                        <>
                            <div>
                                Are you sure you want to delete the event:
                            </div>
                            <br/>
                            <div className="deleteItem">
                                {task.details}
                            </div>

                            <div className="modal-button">
                                <Button onClick={props.onHide} className="cancel-button">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleOnDelete} className="button">
                                    Delete Task: {task.details}
                                </Button>
                            </div>
                        </>
                    )}
 
                </Modal.Body>
            </div>
        </Modal>
    );

}

