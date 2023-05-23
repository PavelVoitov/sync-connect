import {RootState} from "app/store";

export const selectChats = (state: RootState) => state.chats.chats;
export const selectMaxChatsCount = (state: RootState) => state.chats.maxChatsCount;
