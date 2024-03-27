import { apiSlice } from "./apiSlice";

const SUPPORT_URL = "api/support";

export const customerSupportSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addSupport: builder.mutation({
      query: (body) => ({
        url: `/${SUPPORT_URL}/add`,
        method: "POST",
        body:body
      }),
    }),
  }),
});

export const {
  useAddSupportMutation
} = customerSupportSlice;