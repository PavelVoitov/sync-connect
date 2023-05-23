import {createSlice, PayloadAction} from '@reduxjs/toolkit';

//types
export type UserType = {
	idInstance:  string
	apiTokenInstance:  string
}

export const loginSlice = createSlice({
	name: 'userSlice',
	initialState: {
		user: {idInstance: '', apiTokenInstance: ''},
		isLoggedIn: false,
	},
	reducers: {
		setUser: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
		},
		isAuth: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		logout: (state) => {
			state.user = {idInstance: '', apiTokenInstance: ''};
			state.isLoggedIn = false;
		},
}});

export const userSliceActions = loginSlice.actions
export const loginReducer = loginSlice.reducer;

