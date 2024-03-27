import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBugOpen: false,
  };

const bugSlice = createSlice({
    name: "bugOpen",
    initialState,
    reducers: {
      setbugopen: (state, action) => {
        state.isBugOpen = action.payload;
      },
    },
  });

  export const { setbugopen } = bugSlice.actions;
export default bugSlice.reducer;