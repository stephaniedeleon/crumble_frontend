import "./Task.css"

import { useState, useContext } from 'react';
import apiClient from "services/apiClient";
import { DeleteTask, UpdateTask } from "components";
import { Dropdown } from "react-bootstrap";
import GlobalContext from "context/global";

export default function Task(props) {

    const { setTasks } = useContext(GlobalContext);

    const task = props.task;
    const subId = parseInt(props.subId);
    const mainId = props.mainId;

    const [completed, setCompleted] = useState(task.completed);

    const handleChange = async (event) => {

        if (completed) await apiClient.unmarkTask(task.id);
        else await apiClient.markTask(task.id);
        setCompleted(!completed);

        setTasks(oldTasks => oldTasks.map(oldTask => oldTask.id === task.id ? task : oldTask))
    }

    //method to show modal for deleting confirmation and editing...
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <div className="Task">

            <div className="task">
                <label className="container">
                    <input type="checkbox" checked={completed} onChange={handleChange} />
                    <span className="checkmark"></span>
                    <div className="details"> 
                        <div className="name">{task.details}</div>
                    </div>
                    <div className="priority">{task.priority}</div>
                </label>

                <div className="actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-options">
                            <i className= "bi-three-dots"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="options">
                            <Dropdown.Item id="option" onClick={() => setEditModalShow(true)}>
                                <i className="bi-pencil-square"/> Edit
                            </Dropdown.Item>
                            <Dropdown.Item id="option" onClick={() => setDeleteModalShow(true)}>                    
                                <i className="bi-trash"/> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <DeleteTask
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                task={task}
            />

            <UpdateTask
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                task={task}
                mainId={mainId} 
                subId={subId}
            />
        </div>
    ); 
}