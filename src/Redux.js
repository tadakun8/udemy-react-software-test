import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, increment, decrement, incrementByAmount } from "./features/customCounter/customeCounterSlice";

function Redux() {
  const [number, setNumber] = React.useState(0);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(number | 0))}>IncremenByAmount</button>
        <input type="text" placeholder="Enter" value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
    </div>
  );
}

export default Redux;
