import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./components/store/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/pages/Error";
import MyDay from "./components/pages/MyDay";
import Main from "./components/pages/Main";
import Important from "./components/pages/Important";
import Planned from "./components/pages/Planned";
import App from "./components/App";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "./firebase";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "/my-day",
    element: <MyDay />,
  },
  {
    path: "/important",
    element: <Important />,
  },
  {
    path: "/planned",
    element: <Planned />,
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
