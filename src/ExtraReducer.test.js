import reducer, { fetchDummy } from "../src/features/customCounter/customeCounterSlice";

describe("extraReducers", () => {
  let initialState = {
    mode: 0,
    value: 0,
  };
  it("Should output 100 + payload when fulfiled", () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it("Should output 100 - payload when fulfiled", () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(95);
  });
});
