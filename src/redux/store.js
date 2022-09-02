import { configureStore } from '@reduxjs/toolkit';
import { authSlice, registerSlice } from './auth';
import { mainSlice } from './main/mainSlice';


export const store = configureStore({
	reducer: {
		register: registerSlice.reducer,
		auth: authSlice.reducer,
		main: mainSlice.reducer
	}
});
