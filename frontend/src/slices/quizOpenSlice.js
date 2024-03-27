import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyQuiz:false,
    weeklyQuiz:false,
  };

const quizOpenSlice = createSlice({
    name: "quizOpen",
    initialState,
    reducers: {
      setdailyquizopen: (state, action) => {
        state.dailyQuiz = action.payload;
      },
      setweeklyquizopen: (state, action) => {
        state.weeklyQuiz = action.payload;
      },
    },
  });

  export const { setdailyquizopen,setweeklyquizopen } = quizOpenSlice.actions;
export default quizOpenSlice.reducer;