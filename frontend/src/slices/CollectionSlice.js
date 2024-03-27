// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const COLLECTION_URL = "/api/playlist";

export const CollectionSlice
 = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllCollections: builder.query({ 
			query: () => ({
				url: `${COLLECTION_URL}/getAll`,
				method: "GET",
				
			}),
		}),
        createCollection: builder.mutation({ 
			query: (body) => ({
				url: `${COLLECTION_URL}/addPlaylist`,
				method: "POST",
                body:body //playlistName:<name>
				
			}),
		}),
        updateCollectionName: builder.mutation({ 
			query: (body) => ({
				url: `${COLLECTION_URL}/updatePlaylist`,
				method: "PUT",
                body:body //newName:<name>,playlistId:_id
				
			}),
		}),
        deleteCollection: builder.mutation({ 
			query: (body) => ({
				url: `${COLLECTION_URL}/deletePlaylist`,
				method: "DELETE",
                body:body //playlistId:_id
				
			}),
		}),
        addAffairToCollection: builder.mutation({ 
			query: (body) => ({
				url: `${COLLECTION_URL}/addToPlaylist`,
				method: "POST",
                body:body //    "playlistId": "65e9c890276ce368df556527",
                // "article":{
                //     "articleId":"654e163ce01bb75abbfe0e0c",
                //     "articleName":"Russia - Ukraine War",
                //     "thumbnail":"link"
            
                // }
				
			}),}),
            deleteAffairFromCollection: builder.mutation({ 
                query: (body) => ({
                    url: `${COLLECTION_URL}/deleteFromPlaylist`,
                    method: "DELETE",
                    body:body //playlistId:_id ,articleId:_id
                    
                }),
            }),
		


        
		
		
		
	}),
});

export const {
useGetAllCollectionsQuery,
useCreateCollectionMutation,
useUpdateCollectionNameMutation,
useDeleteCollectionMutation,
useAddAffairToCollectionMutation,
useDeleteAffairFromCollectionMutation,
} = CollectionSlice
;

// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work

// Mutation is a specific type of state update operation that modifies the state in a Redux store
// slice is used for grouping