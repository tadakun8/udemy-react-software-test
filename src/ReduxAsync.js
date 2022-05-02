import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDummy, selectCount, selectUsername, fetchJSON } from "./features/customCounter/customeCounterSlice";

const ReduxAsync = () => {
  const count = useSelector(selectCount);
  const username = useSelector(selectUsername);

  const dispatch = useDispatch();

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
      {username && <h1>{username}</h1>}
      <button onClick={() => dispatch(fetchJSON())}>FetchJSON</button>
    </div>
  );
};

export default ReduxAsync;
