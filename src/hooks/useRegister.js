import apiClient from "services/apiClient";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    //if logged in, send to home
    if (user?.email) navigate("/home");
  }, [user, navigate]);

  const handleOnTextChange = (evt) => {
    if (evt.target.name === "email") {
      if (evt.target.value.indexOf("@") <= 0)
        setErrors((err) => ({ ...err, email: "Please enter a valid email." }));
      else setErrors((err) => ({ ...err, email: null }));
    }

    if (evt.target.name === "confirmPassword") {
      if (evt.target.value !== form.password)
        setErrors((err) => ({
          ...err,
          confirmPassword: "Passwords do not match.",
        }));
      else setErrors((err) => ({ ...err, confirmPassword: null }));
    }

    setForm((oldForm) => ({ ...oldForm, [evt.target.name]: evt.target.value }));
  };

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

    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
      localStorage.setItem("token", data.token);
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
