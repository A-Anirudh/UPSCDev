import { apiSlice } from "./apiSlice";

const DAILY_QUIZ_URL = "/api/dailyQuiz";

export const dailyQuizSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailyQuiz: builder.query({
      query: () => ({
        url: `${DAILY_QUIZ_URL}/getQuestion`,
        method: "GET",
      }),
    }),

    getDailyQuizSolution: builder.query({
      query: (id) => ({
        url: `${DAILY_QUIZ_URL}/getSolution`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
useGetDailyQuizQuery,
useGetDailyQuizSolutionQuery,
useLazyGetDailyQuizQuery,
useLazyGetDailyQuizSolutionQuery
} = dailyQuizSlice;
