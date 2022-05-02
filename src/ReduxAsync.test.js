import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import ReduxAsync from "./ReduxAsync";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "./features/customCounter/customeCounterSlice";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

describe("ReduxAync Test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("Should display value with 100 + payload", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    await userEvent.click(screen.getByText("FetchDummy"));
    expect(await screen.findByTestId("count-value")).toHaveTextContent("105");
  });
});
