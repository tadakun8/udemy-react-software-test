import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

afterEach(() => cleanup());

describe("Rendering the list with props", () => {
  it("Should render No data ! when no data propped", () => {
    render(<FrameworkList />);
    expect(screen.getByText("No data !")).toBeInTheDocument();
  });

  it("Should render list item correctly", () => {
    const dummyData = [
      { id: 1, item: "React dummy" },
      { id: 2, item: "Angular dummy" },
      { id: 3, item: "Vue dummy" },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    const frameworksItem = screen.getAllByRole("listitem").map((element) => element.textContent);
    const dummyItems = dummyData.map((element) => element.item);
    expect(frameworksItem).toEqual(dummyItems);
    expect(screen.queryByText("No data !")).toBeNull();
  });
});
