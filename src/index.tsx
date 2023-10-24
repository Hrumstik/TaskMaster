import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App";
import Error from "./components/pages/Error";
import Important from "./components/pages/Important";
import Login from "./components/pages/Login";
import Main from "./components/pages/Main";
import MyDay from "./components/pages/MyDay";
import Planned from "./components/pages/Planned";
import Register from "./components/pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import store from "./components/store/store";
import "./firebase";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Main />,
      },
    ],
  },
  {
    path: "/my-day",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <MyDay />,
      },
    ],
  },
  {
    path: "/important",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Important />,
      },
    ],
  },
  {
    path: "/planned",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Planned />,
      },
    ],
  },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </React.StrictMode>
);
