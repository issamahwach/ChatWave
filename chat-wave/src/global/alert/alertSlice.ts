import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  open: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
    close: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { openAlert, close } = alertSlice.actions;

export default alertSlice.reducer;
