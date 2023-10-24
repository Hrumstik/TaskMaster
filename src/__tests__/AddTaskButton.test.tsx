import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import AddTaskButton from "../components/addTaskButton/AddTaskButton";

const mockStore = configureStore();

describe("AddTaskButton", () => {
  it('should display "ADD NEW TASK" button', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <AddTaskButton />
      </Provider>
    );
    const button = screen.getByText("ADD NEW TASK");
    expect(button).toBeInTheDocument();
  });
});
