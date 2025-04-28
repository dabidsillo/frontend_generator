import { createRef, useState } from "react";
import { Link } from "react-router-dom";

import ValidationError from "../../components/ValidationError";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errors, setErrors] = useState([]);
  const { login, user, error } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(formData, setErrors);
  };

  return (
    <>
      <h2 className="text-xl font-bold">Inicia sesión</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col mt-2">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-blue-800 rounded-md p-2"
            ref={emailRef}
          />
          {errors &&
            Object.entries(errors)
              .filter(([key]) => key === "email") // Filtra solo errores de "email"
              .map(([key, msg], index) => (
                <ValidationError key={index}>{msg}</ValidationError>
              ))}
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-blue-800 rounded-md p-2"
            ref={passwordRef}
          />
          {errors &&
            Object.entries(errors)
              .filter(([key]) => key === "password") // Filtra solo errores de "email"
              .map(([key, msg], index) => (
                <ValidationError key={index}>{msg}</ValidationError>
              ))}
        </div>
        <div className="flex flex-col mt-2">
          <input
            type="submit"
            value="Iniciar sesión"
            className="border bg-blue-800 rounded-md text-white py-2"
          />
        </div>
      </form>
      <nav className="mt-5">
        <Link to="/auth/register">¿No tienes cuenta? Registrate.</Link>
      </nav>
    </>
  );
}
