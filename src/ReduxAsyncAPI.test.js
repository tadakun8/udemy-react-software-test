import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import ReduxAsync from "./ReduxAsync";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "./features/customCounter/customeCounterSlice";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

// テスト開始時にMockサーバーを起動する
beforeAll(() => server.listen());

// テストケースごとにMockサーバをリセット
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// テスト終了時にMockサーバを終了する
afterAll(() => server.close());

describe("ReduxAsync API Mocking", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("[Fetch success] Should display username h1 tag", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    await userEvent.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
  });
  it("[Fetch failed] Should display anonymous h1 tag", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    await userEvent.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
  });
});
