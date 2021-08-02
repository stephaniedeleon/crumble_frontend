import "./ToDo.css";

import { AddSubTab, SubTab, AddTask, Task } from "components";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

// Has the list of subtabs and tasks

export default function ToDo({ directory, setDirectory, mainId, subId }) {
  const { user, authenticated } =
    useContext(AuthContext);
  const { subtabs, tasks, setSubtabs, setTasks, tabNavigationStack } = useContext(GlobalContext);

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

      if (data) setSubtabs(data.subtabs);
      if (error) setError(error);

      setIsFetching(false);
    };

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
    };

    if (authenticated) {
      fetchSubtabs();
      fetchTasks();
    }
  }, [setSubtabs, setTasks, user, authenticated, mainId, subId]);

  const [modalShow, setModalShow] = useState(false);
  const [taskModalShow, setTaskModalShow] = useState(false);



    /** Adds subtab to front end directory (action: "add", "delete", "update") */
    const updateDirectory = (action, newSubtab) => {

      action = action.toLowerCase()
      const configuredNewSubtab = directoryConfiguration(newSubtab)

      const index = tabNavigationStack.length - 1;
      let currentSubtabId = tabNavigationStack[index];

      switch (action) {
        case "add": 

          if (currentSubtabId !== 'root') {
              const targetObject = findTargetSubtab(directory, currentSubtabId)
              targetObject?.children.unshift(configuredNewSubtab)
          } else { 
              directory.children.unshift(configuredNewSubtab)
          }
          break;

        case "delete": 
          if (currentSubtabId !== 'root') {
              const targetObject = findTargetSubtab(directory, currentSubtabId)
              targetObject?.children.splice(currentSubtabId, 1)
          } else { 
              directory.children.splice(currentSubtabId, 1)
          }
          break;

        case "update": 
          break;

        default:
          break;
      } 
  }

  /** Finds and returns the object whose child must be added to */
  const findTargetSubtab = (searchObject, targetId) => {

      const targetObject = searchObject.children.find(element => element.id === parseInt(targetId))

      if (targetObject !== undefined)
          return targetObject;

      let result;
      let currentElement;
      for (let index = 0; index < searchObject.children.length; index++) {
          currentElement = searchObject.children[index]
          result = findTargetSubtab(currentElement, targetId)

          if (result !== null && result !== undefined)
              return result;
      }

      return null;
  }

  /** Configures subtab returned from api call to match directory data structure */
  const directoryConfiguration = (newSubtab) => {
      return {
          id: newSubtab.id,
          name: newSubtab.name,
          children: []
      }
  }

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
          directory={directory}
          setDirectory={setDirectory}
          updateDirectory={updateDirectory}
        />

        <AddTask
          mainId={mainId}
          subId={subId}
          show={taskModalShow}
          onHide={() => setTaskModalShow(false)}
        />
      </div>

      <div className="task-area">
        {subtabs.map((subtab) => (
          <SubTab key={subtab.id} subtab={subtab} mainId={mainId} updateDirectory={updateDirectory} />
        ))}
        {tasks.map((task) => (
          <Task key={task.id} task={task} mainId={mainId} />
        ))}
      </div>
    </div>
  );
}
