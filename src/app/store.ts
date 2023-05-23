import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {loginReducer} from "features/Login/loginReducer";
import {chatsReducer} from "features/ChatContainer/Chats/chatsReducer";
import {messagesReducer} from "features/ChatContainer/Messages/MessagesField/messagesReducer";

export const store = configureStore({
	reducer: {
		chats: chatsReducer,
		messages: messagesReducer,
		login: loginReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
	>;