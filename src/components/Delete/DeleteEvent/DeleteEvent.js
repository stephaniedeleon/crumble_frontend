import "./DeleteEvent.css"

import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";
import { formatDate } from "utils/format";


export default function DeleteEvent(props) {

    const { setErrors, setIsLoading} = useContext(AuthContext);
    const { events, setEvents, tasks, setTasks } = useContext(GlobalContext);

    const event = props.event;
    const task_id = event.task_id;
    const event_id = parseInt(event.id);

    let toDeleteTaskId;

    //deletes an event from list of events
    const deleteEvent = (deletedId) => {

        setEvents(events.filter(filteredEvent => filteredEvent.id !== deletedId));

        //finds an event associated to the to be deleted task
        const toDeleteTask = tasks.filter(filteredTask => filteredTask.id === task_id);
        
        //if it is found, it will also delete the event associated with it
        if(toDeleteTask.length !== 0) {
            toDeleteTaskId = toDeleteTask[0].id;
            deleteTask();
        }
    }

    //deletes event associated with the task from list of events
    const deleteTask = async () => {

        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteTask(toDeleteTaskId);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            setTasks(tasks.filter(filteredTask => filteredTask.id !== toDeleteTaskId));
        }

        setIsLoading(false);
    }
    

    const handleOnDelete = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.deleteEvent(event_id);

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            deleteEvent(event_id);
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
                    {event.task_id ? (
                        <>
                            <div>
                                Are you sure you want to delete the event:
                            </div>
                            <br/>
                            <div className="deleteItem">
                                {event.event_name} on {formatDate(event.date)}
                            </div>
                            <br/>
                            <div className="deleteNote">
                                Note: This will also delete the task associated with this event. 
                            </div>
                
                            <div className="modal-button">
                                <Button onClick={props.onHide} className="del-button">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleOnDelete} className="button">
                                    Delete Event and Task: {event.event_name}
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
                                {event.event_name} on {formatDate(event.date)}
                            </div>

                            <div className="modal-button">
                                <Button onClick={props.onHide} className="del-button">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleOnDelete} className="button">
                                    Delete Event: {event.event_name}
                                </Button>
                            </div>
                        </>
                    )}
                </Modal.Body>
            </div>
        </Modal>
    );
}