import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import Redux from "./Redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "./features/customCounter/customeCounterSlice";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

describe("Redux Integration Test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("Should display value with increment by 1 per click", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });

  it("Should display value with decrement by 1 per click", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText("-"));
    await userEvent.click(screen.getByText("-"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("-2");
  });

  it("Should display value with incrementByAmount", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText("Enter"), "30");
    await userEvent.click(screen.getByText("IncrementByAmount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("30");
  });
});
