import { apiSlice } from "./apiSlice";
const BUG_URL = "api/bug";

export const reportBugSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      addBug: builder.mutation({
        query: (body) => ({
          url: `/${BUG_URL}/add`,
          method: "POST",
          body:body
        }),
      }),

      uploadImage: builder.mutation({
        query: (body) => ({
          url: `https://api.cloudinary.com/v1_1/duuwrm4bh/image/upload/`,
          method: "POST",
          body:body
        }),
      }),
  

    }),
  });

  export const {
useAddBugMutation,
useUploadImageMutation
    } = reportBugSlice;
