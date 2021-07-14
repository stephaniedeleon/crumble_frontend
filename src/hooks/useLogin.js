import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "services/apiClient";
import AuthContext from "context/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { user, setUser, setAuthenticated, authenticated } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnTextChange = (evt) => {
    if (evt.target.name === "email") {
      if (evt.target.value.indexOf("@") <= 0)
        setErrors((err) => ({ ...err, email: "Please enter a valid email." }));
      else setErrors((err) => ({ ...err, email: null }));
    }

    setForm((oldForm) => ({ ...oldForm, [evt.target.name]: evt.target.value }));
  };

  const handleOnClickSubmit = async (evt) => {
    evt.preventDefault();
    setIsProcessing(true);
    setErrors((err) => ({ ...err, form: null }));

    const { data, error } = await apiClient.login({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErrors((err) => ({ ...err, form: error }));
    }

    if (data?.user) {
      setUser(data.user);
      setAuthenticated(true);
      apiClient.setToken(data.token);
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
