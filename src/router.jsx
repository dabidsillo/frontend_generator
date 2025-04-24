import { createBrowserRouter } from "react-router-dom"
import Login from "./views/auth/Login"
import GuestLayout from "./layouts/GuestLayout"
import AppLayout from "./layouts/AppLayout"
import Register from "./views/auth/Register"

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
    },
    {
        path: '/auth',
        element: <GuestLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register",
                element: <Register />
            }
        ]
    }

])

export default router