import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

// Mockサーバーの定義
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

describe("Mocking API", () => {
  it("[Fetch success] Should display fetched data correctory and button disable", async () => {
    render(<MockServer />);
    // ボタンをクリックする
    await userEvent.click(screen.getByRole("button"));
    // Bred dummyという文字列が現れること
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    // buttonがdisabledになっていること
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
  it("[Fetch failure] Should display error msg, no render heading and button abled", async () => {
    // エラーレスポンスを返すようMockサーバーを設定
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(<MockServer />);
    // ボタンをクリックする
    await userEvent.click(screen.getByRole("button"));
    // エラーメッセージが表示されること
    expect(await screen.findByTestId("error")).toHaveTextContent("Fetching Failed !");
    // ユーザーネームが表示されないこと
    expect(screen.queryByRole("heading")).toBeNull();
    // ボタンが押せること
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
