import {RootState} from 'app/store';

export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectUser = (state: RootState) => state.login.user;