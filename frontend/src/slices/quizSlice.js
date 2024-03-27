  import { apiSlice } from "./apiSlice";

const QUIZ_URL = "/api/quiz";

export const quizSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (id) => ({
        url: `${QUIZ_URL}/getQuestion/${id}`,
        method: "GET",
      }),
    }),

    getSolutions: builder.query({
      query: (id) => ({
        url: `${QUIZ_URL}/getSolution/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetQuestionsQuery,
  useLazyGetSolutionsQuery

} = quizSlice;
