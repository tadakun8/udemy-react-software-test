import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDummy, selectCount } from "./features/customCounter/customeCounterSlice";

const ReduxAsync = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
    </div>
  );
};

export default ReduxAsync;
