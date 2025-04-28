import { createRef, useState } from "react";
import { Link } from "react-router-dom";

import ValidationError from "../../components/ValidationError";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const repeat_passwordRef = createRef();

  const [errors, setErrors] = useState([]);
  const { register, user, error } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      repeat_password: repeat_passwordRef.current.value,
    };

    register(formData, setErrors);
  };

  return (
    <>
      <h2 className="text-xl font-bold">Registrate</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col mt-2">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-blue-800 rounded-md p-2"
            ref={nameRef}
          />
          {errors &&
            Object.entries(errors)
              .filter(([key]) => key === "name") // Filtra solo errores de "email"
              .map(([key, msg], index) => (
                <ValidationError key={index}>{msg}</ValidationError>
              ))}
        </div>

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
          <label htmlFor="repeat_password">Repita Contraseña:</label>
          <input
            type="password"
            id="repeat_password"
            name="repeat_password"
            className="border border-blue-800 rounded-md p-2"
            ref={repeat_passwordRef}
          />
          {errors &&
            Object.entries(errors)
              .filter(([key]) => key === "repeat_password") // Filtra solo errores de "email"
              .map(([key, msg], index) => (
                <ValidationError key={index}>{msg}</ValidationError>
              ))}
        </div>
        <div className="flex flex-col mt-2">
          <input
            type="submit"
            value="Registrarme"
            className="border bg-blue-800 rounded-md text-white py-2"
          />
        </div>
      </form>
      <nav className="mt-5">
        <Link to="/auth/login">¿Ya tienes cuenta? Inicia sesión.</Link>
      </nav>
    </>
  );
}
