import "./Task.css"

import { useState, useContext } from 'react';
import apiClient from "services/apiClient";
import { UpdateTask } from "components";
import GlobalContext from "context/global";

export default function Task(props) {

    const { setTasks } = useContext(GlobalContext);

    const task = props.task;
    const subId = parseInt(props.subId);
    const mainId = props.mainId;

    const [completed, setCompleted] = useState(task.completed);

    const handleChange = async (event) => {

        let dbData;

        if (completed) dbData = await apiClient.unmarkTask(task.id);
        else dbData = await apiClient.markTask(task.id);
        setCompleted(!completed);

        const updatedTask = dbData.data.task;

        setTasks(oldTasks => oldTasks.map(oldTask => oldTask.id === updatedTask.id ? updatedTask : oldTask))
    }

    //method to show modal for viewing or editing...
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

                <div className="actions" onClick={() => setEditModalShow(true)}>
                    <i className= "bi-three-dots"></i>
                </div>
            </div>

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