import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
