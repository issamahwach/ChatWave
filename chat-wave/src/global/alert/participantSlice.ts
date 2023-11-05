import { createSlice } from "@reduxjs/toolkit";

const initialState: ParticipantsProps = {
  participants: [],
};

export const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    updateParticipants: (state, action) => {
      state.participants = action.payload;
    },
  },
});

export const { updateParticipants } = participantSlice.actions;

export default participantSlice.reducer;
