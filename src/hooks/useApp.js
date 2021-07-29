import { useEffect, useState } from "react";
import apiClient from "services/apiClient";


export const useApp = () => {
    const [user, setUser] = useState();
    const [errors, setErrors] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    
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


    return {
        user,
        errors,
        authenticated,
        setAuthenticated,
        setErrors,
        setUser,
    }
}