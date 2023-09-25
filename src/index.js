import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import store from "./components/store/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/pages/Error";
import MyDay from "./components/pages/MyDay";
import Main from "./components/pages/Main";
import Important from "./components/pages/Important";
import Planned from "./components/pages/Planned";
import CustomThemeProvider from "./components/CustomThemeProvider/CustomThemeProvider";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <RouterProvider router={router} />
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);
