// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";
// const VERIFY_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    userProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    userUpdateProfile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: body,
      }),
    }),

    userLogout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    userRegister: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body:body,
      }),
    }),

    userVerifyEmail: builder.query({
      query: (body) => ({
        url: `${import.meta.env.VITE_VERIFY_EMAIL_URL}/${body.id}/verify/${
          body.token
        }/`,
        method: "GET",
      }),
    }),
    isSub: builder.query({
      query: () => ({
        url: `${USERS_URL}/checkSubscription`,
        method: "GET",
      }),
    }),
    verifyRecaptcha: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_RECAPTCHA_URL}secret=${
          import.meta.env.VITE_SECRET_KEY
        }&response=${data}`,
        method: "POST",
      }),
    }),

    addContinueReading: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/continueReading`,
        method: "POST",
        body: data,
      }),
    }),
    getContinueReading: builder.query({
      query: () => ({
        url: `${USERS_URL}/continueReading`,
        method: "GET",
      }),
    }),
	forgotPassword: builder.mutation({
		query: (data) => ({
		  url: `${USERS_URL}/forgotPassword`,
		  method: "POST",
		  body:data
		}),
	  }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}/reset/${data.token}`,
        method: "POST",
        body:data.data
      }),
      }),
      updatePreference: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/updatePreference`,
          method: "PUT",
          body:data
        }),
        }),

        disableAccount: builder.query({
          query: () => ({
            url: `${USERS_URL}/deleteAccount`,
            method: "GET",
          }),
          }),
  }),
});

export const {
  useUserLoginMutation,
  useLazyUserProfileQuery,
  useUserProfileQuery,
  useUserLogoutMutation,
  useUserUpdateProfileMutation,
  useUserRegisterMutation,
  useUserVerifyEmailQuery,
  useLazyIsSubQuery,
  useIsSubQuery,
  useVerifyRecaptchaMutation,
  useAddContinueReadingMutation,
  useGetContinueReadingQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePreferenceMutation,
  useLazyDisableAccountQuery,
} = usersApiSlice;

// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work

// Mutation is a specific type of state update operation that modifies the state in a Redux store
// slice is used for grouping
