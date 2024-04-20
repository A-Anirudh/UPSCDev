// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const ROOM_URL = "/api/room";

export const roomSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createRoom: builder.mutation({ 
			query: (data) => ({
				url: `${ROOM_URL}/create-room`,
				method: "POST",
				body: data,
			}),
		}),
		joinRoom: builder.mutation({ 
			query: (data) => ({
				url: `${ROOM_URL}/join-room`,
				method: "PUT",
				body: data,
			}),
		}),
        leaveRoom: builder.mutation({ 
			query: (data) => ({
				url: `${ROOM_URL}/leave-room`,
				method: "PUT",
				body: data,
			}),
		}),
        endRoom: builder.mutation({ 
			query: (data) => ({
				url: `${ROOM_URL}/end-room`,
				method: "PUT",
				body: data,
			}),
		}),
        allUsersOfRoom: builder.query({
            query: (roomId) => ({
              url: `${ROOM_URL}/get-all-users?roomId=${roomId}`,
              method: "GET",
            }),
          }),
		  validRoom: builder.query({
            query: (roomId) => ({
              url: `${ROOM_URL}/valid-room?roomId=${roomId}`,
              method: "GET",
            }),
          }),
		  allMyRooms: builder.query({
            query: (roomId) => ({
              url: `${ROOM_URL}/get-all-my-meetings`,
              method: "GET",
            }),
          }),

	}),
});

export const {
useCreateRoomMutation,
useJoinRoomMutation,
useLeaveRoomMutation,
useEndRoomMutation,
useLazyValidRoomQuery,
useValidRoomQuery,
useAllUsersOfRoomQuery,
useLazyAllUsersOfRoomQuery,
useAllMyRoomsQuery

} = roomSlice;
