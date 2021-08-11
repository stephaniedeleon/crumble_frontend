import "./ToDo.css";

import { AddSubTab, SubTab, AddTask, Task } from "components";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "context/auth";
import GlobalContext from "context/global";
import apiClient from "services/apiClient";

// Has the list of subtabs and tasks

export default function ToDo({ directory, setDirectory, mainId, subId }) {
  const { user, authenticated } = useContext(AuthContext);
  const { subtabs, tasks, setSubtabs, setTasks, tabNavigationStack, digIntoTab } = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [completedSubtabs, setCompletedSubtabs] = useState([]);
  const [uncompletedSubtabs, setUncompletedSubtabs] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);


  // fetches subtabs and tasks
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

      if (data) {
        setTasks(data.tasks);
      }
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


    /** Updates subtabs in front end directory (action: "add", "delete", "update") */
    const updateDirectory = (action, newSubtab) => {

      action = action.toLowerCase()
      const configuredNewSubtab = directoryConfiguration(newSubtab)

      const index = tabNavigationStack.currentPosition;
      let currentSubtabId = tabNavigationStack.stack[index];

      let targetObject;
      if (currentSubtabId !== 'root')
        targetObject = findTargetSubtab(directory, currentSubtabId);
      else 
        targetObject = directory;

      switch (action) {
        case "add": 
          targetObject?.children.unshift(configuredNewSubtab);
          break;

        case "delete": 

          for (let index = 0; index < targetObject?.children.length; index++) {
              if (targetObject?.children[index].id === configuredNewSubtab.id) {
                targetObject.children.splice(index, 1);
                break;
              }
          }

          break;

        case "update": 

          for (let index = 0; index < targetObject?.children.length; index++) {
              if (targetObject?.children[index].id === configuredNewSubtab.id) {
                targetObject.children[index].name = configuredNewSubtab.name;
                break;
              }
          }  

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


  useEffect(() => {
      const separatingTasks = () => {
          setCompletedTasks(tasks.filter(filteredTasks => filteredTasks.completed === true));
          setUncompletedTasks(tasks.filter(filteredTasks => filteredTasks.completed === false));
      } 

      const separatingSubtabs = () => {
          setCompletedSubtabs(subtabs.filter(filteredSubtabs => filteredSubtabs.completed === true));
          setUncompletedSubtabs(subtabs.filter(filteredSubtabs => filteredSubtabs.completed === false));
      }       

      separatingTasks();
      separatingSubtabs();

  }, [setTasks, tasks, setSubtabs, subtabs]);


  return (
    <div className="ToDo">
      <div className="title">
        <div className="compName">
          <h6>ToDo</h6>
        </div>

        <div className="addBtns">
          <div className="addSubBtn" onClick={() => setModalShow(true)}>
            <i className="bi-folder-plus"></i>
          </div>
          <div className="addTaskBtn" onClick={() => setTaskModalShow(true)}>
            {/* <i className="bi-card-checklist"></i> */}
            <i className="bi-check2-square"></i>
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
        {uncompletedSubtabs.map((subtab) => (
          <SubTab key={subtab.id} subtab={subtab} mainId={mainId} onClick={() => digIntoTab(subtab.id)} updateDirectory={updateDirectory} />
        ))}
        {completedSubtabs.map((subtab) => (
          <SubTab key={subtab.id} subtab={subtab} mainId={mainId} onClick={() => digIntoTab(subtab.id)} updateDirectory={updateDirectory} />
        ))}
        {uncompletedTasks.map((task) => (
          <Task key={task.id} task={task} mainId={mainId} subId={subId}/>
        ))}
        {completedTasks.map((task) => (
          <Task key={task.id} task={task} mainId={mainId} subId={subId}/>
        ))}
      </div>
    </div>
  );
}
