import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError, isAxiosError} from 'axios';
import {messagesAPI} from "features/ChatContainer/Messages/MessagesField/messagesAPI";
import {UserType} from "features/Login/loginReducer";


export const sendMessage = createAsyncThunk('messages/sendMessage',
	async (arg: { chatId: string, message: string, user: UserType }) => {
	try {
		const requestChatId = `${arg.chatId}@c.us`
		const res = await messagesAPI.sendMessage({chatId: requestChatId, message: arg.message}, arg.user)
		return ({chatId: arg.chatId, message: arg.message, owner: true, messageId: res.data.idMessage})
	} catch (e) {
		console.log(e)
	}
	})

export const getMessage = createAsyncThunk<MessagesArrayType, void>(
	'messages/getMessage',
	async (_, thunkAPI) => {
		const {dispatch, getState} = thunkAPI
		const user = getState().user.user
		try {
			const res = await messagesAPI.getMessage(user);
			dispatch(messagesThunks.deleteNotification(res.data.receiptId))
		} catch (e) {
			const err = e as Error | AxiosError<{ error: string }>;
			if (isAxiosError(err)) {
				const error = err.response ? err.response.data.error : err.message;
				dispatch(messagesActions.setError({ error }));
			}
			return thunkAPI.rejectWithValue(null);
		}
			return {id: '2', message: res.data.body.messageData.textMessageData.textMessage}
		})

// const deleteNotification = createAsyncThunk(
// 	'messages/deleteNotification',
// 	async (arg, thunkAPI) => {
// 		const state = thunkAPI.getState() as RootState
// 		await messagesAPI.deleteNotification(arg, state.login.user);
// 	}
// );

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
		// createChat: (state, action: PayloadAction<{ phoneNumber: string }>) => {
		// 	state.messages[action.payload.phoneNumber] = []
		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMessage.fulfilled, (state, action) => {
				state.messages.push(action.payload)
				state.userMessage = action.payload.message
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				if (action.payload) {
					if (!state.messages[action.payload.chatId]) {
						state.messages[action.payload.chatId] = []
					}
					state.messages[action.payload.chatId].push({messageId: action.payload.messageId, message: action.payload.message, owner: action.payload.owner, chatId: action.payload.chatId})
				}
	}
			)
	},
});

export const messagesThunks = {sendMessage};
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



