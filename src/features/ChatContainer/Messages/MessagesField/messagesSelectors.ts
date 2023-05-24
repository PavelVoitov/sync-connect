import {RootState} from "app/store";

export const selectMessages = (state: RootState) => state.messages.messages
export const selectError = (state: RootState) => state.messages.error