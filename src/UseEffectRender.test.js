import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    // 最初はasyncでのAPI通信前なので何も表示されない
    expect(screen.queryByText(/I am/)).toBeNull();
    // API通信を待ちその後に指定文字を検索
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
