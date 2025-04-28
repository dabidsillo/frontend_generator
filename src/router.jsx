import { createBrowserRouter } from "react-router-dom";
import Login from "./views/auth/Login";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";
import Register from "./views/auth/Register";
import Design from "./views/designs/Design";
import Home from "./views/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/test",
    element: <Design />,
  },
]);

export default router;
