import { createSlice } from "@reduxjs/toolkit";

// Helper function to determine if the device is a mobile device
const isMobileDevice = () => window.innerWidth <= 767; // Adjust the threshold as needed

const initialState = {
  isOpen: !isMobileDevice(),
};

const openSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    setopen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setopen } = openSlice.actions;
export default openSlice.reducer;

// Function to handle window resize events
const handleResize = (store) => {
  const updateOpenState = () => {
    const isMobile = isMobileDevice();
    const currentState = store.getState().open.isOpen;

    // Dispatch action only if the state needs to be updated
    if (isMobile !== currentState) {
      store.dispatch(setopen(!isMobile));
    }
  };

  // Add event listener for window resize
  window.addEventListener("resize", updateOpenState);

  // Unsubscribe the event listener when the Redux store is unsubscribed
  return () => {
    window.removeEventListener("resize", updateOpenState);
  };
};

// Export function to subscribe to window resize events
export const subscribeToWindowResize = (store) => {
  // Call the handleResize function and store the unsubscribe function
  const unsubscribe = handleResize(store);

  // Return the unsubscribe function
  return unsubscribe;
};
