import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./global/alert/alertSlice";
import messageReducer from "./global/alert/messageSlice";
import participantReducer from "./global/alert/participantSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    message: messageReducer,
    participant: participantReducer,
  },
});
