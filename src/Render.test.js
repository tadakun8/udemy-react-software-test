import React from "react"
import { render, screen } from "@testing-library/react"
import Render from "./Render"

// describe(): 関連するテストについてまとめるグループ
describe("Rendering", () => {
  // it(): 実際に事項するテスト
  it("Should render all the elements correctly", () => {
    // render: コンポーネントをレンダリング
    render(<Render />);
    
    // レンダリングされているコンポーネントの内容を表示する(引数で特定のもののみを表示できる)
    // screen.debug()
    // screen.debug(screen.getByRole("heading"))

    // toBeTruthy(): 存在確認
    expect(screen.getByRole("heading")).toBeTruthy()
    expect(screen.getByRole("textbox")).toBeTruthy()
    // 複数ある場合はgetAllByRole()
    expect(screen.getAllByRole("button")[0]).toBeTruthy()
    expect(screen.getAllByRole("button")[1]).toBeTruthy()
    expect(screen.getByText("Udemy")).toBeTruthy()
    expect(screen.queryByText("Udeeeeemy")).toBeNull()
    // data-testidという属性を持つものを取得する
    expect(screen.getByTestId("copyright")).toBeTruthy()
  })
})