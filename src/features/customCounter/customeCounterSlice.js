import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sleep = (msec) => {
  const start = new Date();
  while (new Date() - start < msec);
};

export const fetchDummy = createAsyncThunk("featch/dummy", async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJSON = createAsyncThunk("fetch/api", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  return response.data.username;
});

export const customCounterSlice = createSlice({
  name: "customCounter",
  initialState: {
    mode: 0,
    value: 0,
    username: "",
  },
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },
  // extraReducers: 非同期関数を扱う場合に使う
  extraReducers: (builder) => {
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - action.payload;
    });
    builder.addCase(fetchJSON.fulfilled, (state, action) => {
      state.username = action.payload;
    });
    builder.addCase(fetchJSON.rejected, (state, action) => {
      state.username = "anonymous";
    });
  },
});

export const { increment, decrement, incrementByAmount } = customCounterSlice.actions;

// state.XXXのXXXはstore.jsで命名したものになる
// この名前でstateを区別している
export const selectCount = (state) => state.customCounter.value;
export const selectUsername = (state) => state.customCounter.username;

export default customCounterSlice.reducer;
