import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import store from "./components/store/store";
import Error from "./pages/Error";
import Important from "./pages/Important";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyDay from "./pages/MyDay";
import Planned from "./pages/Planned";
import Register from "./pages/Register";
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
