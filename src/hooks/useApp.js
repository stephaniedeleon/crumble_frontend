import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import apiClient from "services/apiClient";
import AuthContext from "context/auth";


export const useApp = () => {
  const [user, setUser] = useState();
    const [errors, setErrors] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
  
    // const navigate = useNavigate();
  
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
  
    //handles logout
    const handleOnLogout = async () => {
      setUser({});
      setErrors(null);
      setAuthenticated(false);
      await apiClient.logout();
      // navigate("/");
    };

    return {
        user,
        errors,
        authenticated,
        setAuthenticated,
        setUser,
        handleOnLogout,
    }
}