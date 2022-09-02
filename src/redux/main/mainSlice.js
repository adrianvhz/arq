import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  view: "home",
  projects: []
}

export const mainSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		setView: (state, { payload }) => {
			state.view = payload.view;
		},
		setProjects: (state, { payload }) => {
			state.projects = payload.projects;
		}
	}
})

export const { setView, setProjects } = mainSlice.actions;
