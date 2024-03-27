import { apiSlice } from "./apiSlice";

const EVENT_URL = "api/events";

export const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (id) => ({
        url: `/${EVENT_URL}/all/${id}`,
        method: "GET",
      }),
    }),

    getOneEvent: builder.query({
      query: (id) => ({
        url: `/${EVENT_URL}/${id}`,
        method: "GET",
      }),
    }),




  }),
});

export const {
useGetEventsQuery,
useGetOneEventQuery
} = eventSlice;