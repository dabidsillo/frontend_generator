import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AxiosClient from "../config/axios";

export const useAuth = ({ middleware, url }) => {
  const navigate = useNavigate();
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/auth/me", () =>
    AxiosClient("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error.response.data.detail);
      })
  );

  const register = async (formData, setErrors) => {
    try {
      const { data } = await AxiosClient.post("/auth/register", formData);
      localStorage.setItem("AUTH_TOKEN", data.access_token);
      setErrors([]);
      await mutate();
    } catch (error) {
      if (error.response && error.response.data.detail) {
        setErrors(
          Object.fromEntries(
            error.response.data.detail.map((item) => [item.loc[1], item.msg])
          )
        );
      }
    }
  };

  const login = async (formData, setErrors) => {
    try {
      const { data } = await AxiosClient.post("/auth/login", formData);
      localStorage.setItem("AUTH_TOKEN", data.access_token);
      setErrors([]);
      await mutate();
    } catch (error) {
      if (error.response && error.response.data.detail) {
        setErrors(
          Object.fromEntries(
            error.response.data.detail.map((item) => [item.loc[1], item.msg])
          )
        );
      }
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "auth" && error) {
      navigate("/auth/login");
    }
    console.log(user);
  }, [user, error]);

  return {
    register,
    login,
    logout,
    user,
    error,
  };
};
