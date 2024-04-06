import { apiSlice } from "./apiSlice";

const AFFAIR_URL = "api/affairs";

export const affairSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAffairs: builder.query({
      query: () => ({
        url: `${AFFAIR_URL}/all`,
        method: "GET",
      }),
    }),

    getOneAffair: builder.query({
      query: (id) => ({
        url: `/${AFFAIR_URL}/${id}`,
        method: "GET",
      }),
    }),

    getLatestCA: builder.query({
      query: (n) => ({
        url: `/${AFFAIR_URL}/CA/latest?number=${n}`,
        method: "GET",
      }),
    }),

    getSubjectWiseData: builder.query({
      query: () => ({
        url: `/${AFFAIR_URL}/sub`,
        method: "GET",
      }),
    }),
    getNonCA: builder.query({
      query: () => ({
        url: `/${AFFAIR_URL}/nonCA/subwise`,
        method: "GET",
      }),
    }),

    getCASubjectWise: builder.query({
      query: () => ({
        url: `/${AFFAIR_URL}/CA/subwise`,
        method: "GET",
      }),
    }),
    getAllSubjectWise: builder.query({
      query: (params) => ({
        url: `/${AFFAIR_URL}/allPerSubject?subject=${params.subject
          .trim()
          .split(" ")
          .join("%20")}&currentAffair=${params.isCurrentAffair}`,
        method: "GET",
      }),
    }),

    search: builder.query({
      query: (searchItem) => ({
        url: `/${AFFAIR_URL}/search?subject=${searchItem}`,
        method: "GET",
      }),
    }),
    searchResults: builder.query({
      query: (searchItem) => ({
        url: `/${AFFAIR_URL}/search/all?subject=${searchItem}`,
        method: "GET",
      }),
    }),

    
  }),
});

export const {
  useGetAffairsQuery,
  useLazyGetOneAffairQuery,
  useGetOneAffairQuery,
  useGetSubjectWiseDataQuery,
  useGetLatestCAQuery,
  useGetNonCAQuery,
  useGetAllSubjectWiseQuery,
  useLazyGetAllSubjectWiseQuery,
  useGetCASubjectWiseQuery,
  useLazySearchResultsQuery,
  useLazySearchQuery,
  useSearchResultsQuery
} = affairSlice;
