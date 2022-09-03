import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'not-authenticated', //'checking','not-authenticated', 'authenticated'
	uid: null,
	name: null,
	lastname: null,
	email: null,
	password: null,
	photoUrl: null,
	errorMessage: null,
	authView: "login",
	authModal: false
}

export const  authSlice = createSlice({
	name: 'auth',
	initialState,

	reducers: {
		login: (state, { payload }) => {
			state.status = "authenticated",
			state.uid = payload.uid,
			state.name = payload.name,
			state.lastname = payload.lastname,
			state.email = payload.email,
			state.password = null
			state.photoUrl = null
			state.errorMessage = null
		},

		logout: (state, { payload }) => {
			state.status = "not-authenticate",
			state.authModal = false,
			state.uid = null,
			state.name = null,
			state.lastname = null,
			state.email = null,
			state.password = null
			state.photoUrl = null
			state.errorMessage = payload?.errorMessage
		},

		checkingCredentials: (state) => {
			state.status = "checking";
		},

		loginFail: (state) => {
			state.status = "not-authenticate",
			state.authModal = false
		},

		setAuthView: (state, { payload }) => {
			state.authView = payload.authView;
		},

		setAuthModal: (state, { payload }) => {
			state.authModal = payload.authModal;
		}
	},
})

export const { login, logout, checkingCredentials, setAuthView, setAuthModal, loginFail  } =  authSlice.actions;
