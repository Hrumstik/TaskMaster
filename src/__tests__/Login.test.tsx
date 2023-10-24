import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "redux-mock-store";

import Login from "../components/pages/Login";

const mockStore = configureStore();

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

const renderComponent = (store: any) => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

beforeEach(() => {
  const store = mockStore();
  renderComponent(store);
});

describe("Login page", () => {
  it("renders login and password forms correctly", () => {
    const emailInput = screen.getByLabelText(/Email adress/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("Handles texts inputs correctly", () => {
    const emailInput = screen.getByLabelText(
      /Email adress/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;
    fireEvent.change(emailInput, {
      target: { value: "Hrumstik.warsaw@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "sasha123" } });
    expect(emailInput.value).toBe("Hrumstik.warsaw@gmail.com");
    expect(passwordInput.value).toBe("sasha123");
  });

  it("displays error message on failed login", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("Login failed")
    );
    const emailInput = screen.getByLabelText(/Email adress/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByText(/sign in/i);
    fireEvent.change(emailInput, {
      target: { value: "Hrumstik.warsaw@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "sasha1234" } });
    fireEvent.click(signInButton);

    const alertMessage = await screen.findByText(/something went wrong/i);
    expect(alertMessage).toBeInTheDocument();
  });
});
