import { useEffect, useState } from "react";
import apiClient from "services/apiClient";



export const useApp = () => {

    const [user, setUser] = useState()
    const [error, setError] = useState(null);
    const [initialized, setInitialized] = useState(false);
  
  
    useEffect(() => {
      const initApp = async () => {
        const { data, error } = await apiClient.fetchUserFromToken();
        if (error) setError(error);
        if (data) setUser(data.user);
  
        setInitialized(true);
      };
  
      const token = localStorage.getItem("token");
      if (token) {
        apiClient.setToken(token);
        initApp();
      } else {
        setInitialized(true);
      }
    }, []);
  
  
    const clearAppState = () => {
      setUser({});
      setError(null);
      apiClient.logout()
    };

    return {
        user,
        initialized,
        error,
        setUser,
        clearAppState,
    }
}