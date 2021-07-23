import "./ToDo.css";

import { } from 'react-bootstrap';
import { AddSubTab, SubTab, AddTask, Task } from 'components';
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";
import { useParams } from 'react-router-dom';

// Has the list of subtabs and tasks

export default function ToDo({ directory, setDirectory, mainId, subId }) {

    const { subtabs, tasks, user, authenticated, setSubtabs, setTasks } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    
    // fetches subtabs
    useEffect(() => {
        const fetchSubtabs = async () => {
            setSubtabs([]); //clears
            setIsFetching(true);

            let result;
            
            if (parseInt(subId) === 0) {
                result = await apiClient.listSubtabsByMain(parseInt(mainId));
            } else {
                result = await apiClient.listSubtabsBySubtab(parseInt(subId));
            }
            
            const { data, error } = result;

            if(data) setSubtabs(data.subtabs);
            if(error) setError(error);
      
            setIsFetching(false);
        }

        const fetchTasks = async () => {
            setTasks([]); //clears
            setIsFetching(true);

            let result;

            if (parseInt(subId) === 0) {
                result = await apiClient.listTasksByMain(parseInt(mainId));
            } else {
                result = await apiClient.listTasksBySubtab(parseInt(subId));
            }

            const { data, error } = result;

            if (data) setTasks(data.tasks);
            if (error) setError(error);

            setIsFetching(false);
        }
    
        if(authenticated) {
            fetchSubtabs();
            fetchTasks();
        }

    }, [setSubtabs, setTasks, user, authenticated, mainId, subId]);

    const [modalShow, setModalShow] = useState(false);
    const [taskModalShow, setTaskModalShow] = useState(false);

    return (
        <div className="ToDo">
            <div className="title">

                <div className="compName">
                    <h6>ToDo</h6>
                </div>

                <div className="addBtns">
                    <div className="addSubBtn" onClick={() => setModalShow(true)}>
                        <i class="bi-folder-plus"></i>
                    </div>
                    <div className="addTaskBtn" onClick={() => setTaskModalShow(true)}>
                        {/* <i class="bi-card-checklist"></i> */}
                        <i class="bi-check2-square"></i>
                    </div>
                </div>

                <AddSubTab
                    mainId={mainId}
                    subId={subId}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    directory={directory} setDirectory={setDirectory}
                />

                <AddTask
                    mainId={mainId}
                    subId={subId}
                    show={taskModalShow}
                    onHide={() => setTaskModalShow(false)}
                />
            </div>

            <br />
            
            <div className="task-area">
                {subtabs.map((subtab) => (
                    <SubTab key={subtab.id} subtab={subtab} mainId={mainId} />
                ))}
                {tasks.map((task) => (
                    <Task key={task.id} task={task} mainId={mainId} />
                ))}
            </div>
        </div>
    );
}