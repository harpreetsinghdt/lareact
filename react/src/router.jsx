import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./views/NotFound";
import ErrorPage from "./views/ErrorPage";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
