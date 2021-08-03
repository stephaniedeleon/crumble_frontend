import { useEffect, useState } from "react";
import apiClient from "services/apiClient";

export const useApp = () => {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  /** TAB NAVIGATION */

  const [tabNavigationStack, setTabNavigationStack] = useState({
    currentPosition: 0,
    stack: ["root"],
  });

  const resetTabNavigationStack = () => {
    setTabNavigationStack({
      currentPosition: 0,
      stack: ["root"],
    })
  }

  //persists logged in user
  useEffect(() => {
    const fetchAuthedUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (error) setErrors(error);
      if (data?.user) setUser(data.user);
      setAuthenticated(true);
    };

    const token = localStorage.getItem("token");
    if (token) {
      apiClient.setToken(token);
      fetchAuthedUser();
    } else {
      setAuthenticated(false);
    }
  }, []);

  // adds id of subtab you are navigating into to stack
  const digIntoTab = (newId) => {
    if (parseInt(newId) === 0) newId = "root";

    // proceed if the user is in different subtab and is at the front of the breadcrumb
    if (
      newId !== tabNavigationStack.stack[tabNavigationStack.stack.length - 1] &&
      tabNavigationStack.currentPosition === tabNavigationStack.stack.length - 1
    ) {
      setTabNavigationStack((object) => ({
        currentPosition: object.currentPosition + 1,
        stack: [...object.stack, newId],
      }));
    }
    // if not at the front of breadcrumb, delete everything after current position in stack in order to start a new history
    else if (
      tabNavigationStack.currentPosition !==
      tabNavigationStack.stack.length - 1
    ) {
      // Makes sure to handle if the new id is the same as the current position subtab
      if (
        newId === tabNavigationStack.stack[tabNavigationStack.currentPosition]
      )
        return;
      else
        setTabNavigationStack((object) => ({
          currentPosition: object.currentPosition + 1,
          stack: [...object.stack.slice(0, object.currentPosition + 1), newId],
        }));
    }
  };

  // removes id of subtab you are navigating out of from stack
  const moveOutTab = (removeId) => {
    const newStack = tabNavigationStack.filter((id) => id !== removeId);
    setTabNavigationStack(newStack);
  };

  return {
    user,
    errors,
    authenticated,
    tabNavigationStack,
    resetTabNavigationStack,
    digIntoTab,
    moveOutTab,
    setAuthenticated,
    setErrors,
    setUser,
    setTabNavigationStack,
  };
};
