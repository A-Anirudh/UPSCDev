import { apiSlice } from "./apiSlice";

const WEEKLY_QUIZ = "/api/gamify";

export const weeklyQuizSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    checkAttempted: builder.query({
      query: () => ({
        url: `${WEEKLY_QUIZ}/questions/checkAttempted`,
        method: "GET",
      }),
    }),
    getWeeklyQuestions: builder.query({
      query: () => ({
        url: `${WEEKLY_QUIZ}/questions/all`,
        method: "GET",
      }),
    }),

    getSolution: builder.query({
        query: () => ({
          url: `${WEEKLY_QUIZ}/questions/solutions`,
          method: "GET",
        }),
      }),

      getLeaderBoard: builder.query({
        query: () => ({
          url: `${WEEKLY_QUIZ}/questions/leaderboard`,
          method: "GET",
        }),
      }),

      
      submitAnswers: builder.mutation({
        query: (body) => ({
          url: `${WEEKLY_QUIZ}/solutions/new`,
          method: "POST",
          body:body
        }),
      }),
  }),
});

export const { 
useCheckAttemptedQuery,
useGetWeeklyQuestionsQuery,
useGetSolutionQuery,
useLazyGetSolutionQuery,
useGetLeaderBoardQuery,
useLazyGetLeaderBoardQuery,
useSubmitAnswersMutation

} = weeklyQuizSlice;
