import { apiSlice } from "./apiSlice";

const SUB_URL = "api/payment";

export const subscriptionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buySubscription: builder.query({
      query: () => ({
        url: `${SUB_URL}/subscribe`,
        method: "GET",
      }),
    }),
    getRazorPaykey: builder.query({
        query: () => ({
          url: `${SUB_URL}/razorpaykey`,
          method: "GET",
        }),
      }),
    
      cancelSubscription: builder.mutation({
        query: () => ({
          url: `${SUB_URL}/cancel`,
          method: "DELETE",
        }),
      }),

      getSubscriptionDetails: builder.query({
        query: () => ({
          url: `${SUB_URL}/paymentDetails`,
          method: "GET",
        }),
      }),


  }),
});

export const {

    useBuySubscriptionQuery,
    useGetRazorPaykeyQuery,
    useLazyBuySubscriptionQuery,
    useLazyGetRazorPaykeyQuery,
    useCancelSubscriptionMutation,
    useLazyGetSubscriptionDetailsQuery,

} = subscriptionSlice;
