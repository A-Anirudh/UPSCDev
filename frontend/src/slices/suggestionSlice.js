  import { apiSlice } from "./apiSlice";

const SUGGESTION_URL = "/api/suggestions";

export const suggestionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (articleId) => ({
        url: `${SUGGESTION_URL}/get-suggestions/?articleId=${articleId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetSuggestionsQuery
} = suggestionSlice;