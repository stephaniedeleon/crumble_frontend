import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "services/apiClient";
import AuthContext from "context/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    //if user logged in, take to homepage
    if (user?.email) {
      navigate("/home");
    }
  }, [user, navigate]);

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
