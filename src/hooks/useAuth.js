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
      await AxiosClient.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          },
        }
      ).catch(() => {}); // Ignoramos errores aquí

      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined);

      // Aseguramos que después de logout vaya a login
      navigate("/auth/login");
    } catch (error) {
      console.error("Error durante logout:", error);
    }
  };

  useEffect(() => {
    // Prevenir redirecciones si todavía estamos cargando
    if (!user && !error) return;

    if (middleware === "guest" && url && user) {
      navigate(url);
    }

    if (middleware === "auth" && error) {
      // Solo redirigir si existe un token pero es inválido
      // o si no estamos ya en la página de login
      if (
        localStorage.getItem("AUTH_TOKEN") ||
        !window.location.pathname.includes("/auth/login")
      ) {
        navigate("/auth/login");
      }
    }
  }, [user, error, navigate, middleware, url]);

  return {
    register,
    login,
    logout,
    user,
    error,
  };
};
