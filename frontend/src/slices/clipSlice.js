import { apiSlice } from "./apiSlice";

const CLIP_URL = "api/clip";

export const clipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClips: builder.query({
      query: () => ({
        url: `/${CLIP_URL}/getAll`,
        method: "GET",
      }),
    }),

    addClip: builder.mutation({
      query: (body) => ({
        url: `/${CLIP_URL}/addClip`,
        method: "POST",
        body:body //affairId:_id,clip:<text>
      }),
    }), 


    deleteClip: builder.mutation({
        query: (body) => ({
          url: `/${CLIP_URL}/deleteClip`,
          method: "DELETE",
          body:body //clipId:_id
        }),
      }), 


  }),
});

export const {
useGetClipsQuery,
useLazyGetClipsQuery,
useAddClipMutation,
useDeleteClipMutation
} = clipSlice;