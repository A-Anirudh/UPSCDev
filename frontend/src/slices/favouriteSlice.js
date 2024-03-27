// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const FAV_URL = "/api/favourites";

export const favouriteSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addFav: builder.mutation({ //affair name & affairId
			query: (data) => ({
				url: `${FAV_URL}/add`,
				method: "POST",
				body: data,
			}),
		}),
		getAllFav: builder.query({
			query: () => ({
				url: `${FAV_URL}/all`,
				method: "GET",
			}),
		}),
        deleteFav: builder.mutation({ //pid of affair
			query: (data) => ({
				url: `${FAV_URL}/delete`,
				method: "DELETE",
				body: data,
			}),
		}),

		
		
	}),
});

export const {
useAddFavMutation,
useGetAllFavQuery,
useDeleteFavMutation
	
} = favouriteSlice;

// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work

// Mutation is a specific type of state update operation that modifies the state in a Redux store
// slice is used for grouping