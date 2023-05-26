import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatType} from "features/ChatContainer/Chats/chatsTypes";

export const chatsSlice = createSlice({
	name: 'chatListSlice',
	initialState: {
		chats: [] as ChatType[],
		maxChatsCount: 5,
	},
	reducers: {
		createChat: (state, action: PayloadAction<{ phoneNumber: string }>) => {
			state.chats.push(action.payload)

		},
		deleteChat: (state, action: PayloadAction<{phoneNumber: string}>) => {
			 state.chats = state.chats.filter(c => c.phoneNumber !== action.payload.phoneNumber)
		}
	},
});

export const chatsSliceActions = chatsSlice.actions
export const chatsReducer = chatsSlice.reducer;

