import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import openReducer ,{ subscribeToWindowResize } from './slices/openSlice'
import bugOpenReducer from './slices/bugSlice'
import quizopenReducer from './slices/quizOpenSlice'
import tempDataReducer from "./slices/tempData";
import { apiSlice } from "./slices/apiSlice";



const store = configureStore({
	reducer:{auth: authReducer,
		open:openReducer,
		bugOpen:bugOpenReducer,
		tempData:tempDataReducer,
		quizOpen:quizopenReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	} ,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			apiSlice.middleware
		),
	devTools: true,
});
// const unsubscribe = subscribeToWindowResize(store);
export default store;

// To use any slice, you need to bring it into the store..