import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import Main from "../components/pages/Main";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore();

const renderComponent = (store: any) => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

beforeEach(() => {
  const store = mockStore();
  renderComponent(store);
});

describe("adding task", () => {
  it("it should add a new task", () => {
    const addTaskButton = screen.getByPlaceholderText("Add a new task");
    expect(addTaskButton).toBeInTheDocument();
  });
});
