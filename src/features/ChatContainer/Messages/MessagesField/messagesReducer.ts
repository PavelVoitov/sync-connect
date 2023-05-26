import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError, isAxiosError} from 'axios';
import {messagesAPI} from "features/ChatContainer/Messages/MessagesField/messagesAPI";
import {RootState} from "app/store";


const sendMessage = createAsyncThunk('messages/sendMessage',
	async (arg: { chatId: string, message: string }, thunkAPI) => {
		const state = thunkAPI.getState() as RootState
		const user = state.login.user
		try {
			const requestChatId = `${arg.chatId}@c.us`
			const res = await messagesAPI.sendMessage({chatId: requestChatId, message: arg.message}, user)
			return ({chatId: arg.chatId, message: arg.message, owner: true, messageId: res.data.idMessage})
		} catch (e) {
			const err = e as Error | AxiosError<{ error: string }>;
			if (isAxiosError(err)) {
				const error = err.response ? err.response.data.error : err.message;
				thunkAPI.dispatch(messagesActions.setError({error}));
			}
			thunkAPI.dispatch(messagesActions.setError({error: err.message}))
			return thunkAPI.rejectWithValue(null);
		}
	})

const getMessage = createAsyncThunk(
	'messages/getMessage',
	async (arg: { chatId: string }, thunkAPI) => {
		const state = thunkAPI.getState() as RootState
		const user = state.login.user
		try {
			const res = await messagesAPI.getMessage(user);
			thunkAPI.dispatch(messagesThunks.deleteNotification(res.data.receiptId))
			return ({
				chatId: arg.chatId,
				message: res.data.body.messageData.textMessageData.textMessage,
				owner: false,
				messageId: res.data.idMessage
			})
		} catch (e) {
			const err = e as Error | AxiosError<{ error: string }>;
			if (isAxiosError(err)) {
				const error = err.response ? err.response.data.error : err.message;
				thunkAPI.dispatch(messagesActions.setError({error}));
			}
			return thunkAPI.rejectWithValue(null);
		}

	})

const deleteNotification = createAsyncThunk(
	'messages/deleteNotification',
	async (arg: string, thunkAPI) => {
		const state = thunkAPI.getState() as RootState
		await messagesAPI.deleteNotification(arg, state.login.user);
	}
);

export const messagesSlice = createSlice({
	name: 'messages',
	initialState: {
		messages: {} as MessagesArrayType,
		error: null as string | null,
	},
	reducers: {
		setError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMessage.fulfilled, (state, action) => {
				state.messages[action.payload.chatId].push({
					messageId: action.payload.messageId,
					message: action.payload.message,
					owner: action.payload.owner,
					chatId: action.payload.chatId
				})
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
					if (action.payload) {
						if (!state.messages[action.payload.chatId]) {
							state.messages[action.payload.chatId] = []
						}
						state.messages[action.payload.chatId].push({
							messageId: action.payload.messageId,
							message: action.payload.message,
							owner: action.payload.owner,
							chatId: action.payload.chatId
						})
					}
				}
			)
	},
});

export const messagesThunks = {sendMessage, getMessage, deleteNotification};
export const messagesActions = messagesSlice.actions
export const messagesReducer = messagesSlice.reducer;

//types
export type MessageType = {
	messageId: string
	chatId: string
	message: string
	owner: boolean
}
export type MessagesArrayType = { [phoneNumber: string]: MessageType[] }
export type ErrorType = string | null



