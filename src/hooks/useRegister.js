import apiClient from "services/apiClient";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const { user, setUser, setAuthenticated, authenticated } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleOnTextChange = (evt) => {

    switch(evt.target.name) {
      case "email":
        if (evt.target.value.indexOf("@") <= 0)
          setErrors((err) => ({ ...err, email: "Please enter a valid email." }));
        else 
          setErrors((err) => ({ ...err, email: null }));
        break;

      case "firstName": 
      case "lastName":
        console.log(evt.target.name)
        if (evt.target.value.trim() === "")
          setErrors((err) => ({ ...err, [evt.target.name]: "Please enter a name."}))
        else 
          setErrors((err) => ({ ...err, [evt.target.name]: null }))
        break;

      case "password":
        if (form.confirmPassword !== "") {
          if (evt.target.value !== form.confirmPassword || evt.target.value.trim() === "")
            setErrors((err) => ({
              ...err,
              confirmPassword: "Passwords do not match.",
            }));
          else 
            setErrors((err) => ({ ...err, confirmPassword: null }));
        }
        break;

      case "confirmPassword": 
      if (evt.target.value !== form.password || evt.target.value.trim() === "")
        setErrors((err) => ({
          ...err,
          confirmPassword: "Passwords do not match.",
        }));
      else
        setErrors((err) => ({ ...err, confirmPassword: null }));
        break;

      default:
        break;
    }

    setForm((oldForm) => ({ ...oldForm, [evt.target.name]: evt.target.value }));
    
  }

  const handleOnClickSubmit = async (evt) => {
    evt.preventDefault();
    setIsProcessing(true);
    setErrors((err) => ({ ...err, form: null }));

    const { data, error } = await apiClient.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });

    if (error) setErrors((err) => ({ ...err, form: error }));

    if (data?.user) {
      setUser(data.user);
      setAuthenticated(true);
      await apiClient.setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setIsProcessing(false);
  };

  return {
    isProcessing,
    errors,
    form,
    handleOnTextChange,
    handleOnClickSubmit,
  };
};
