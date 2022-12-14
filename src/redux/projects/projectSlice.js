import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	status: 'not-planes',
	projects: [],
	typeProjects: []
}

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjects: (state, { payload }) => { 
			// state.status = "get-planes",
			state.projects = payload.projects;
		},
		setTypeProjects: (state, { payload }) => {
			state.typeProjects = payload.typeProjects
		}
	}
});

export const { setProjects, setTypeProjects } = projectSlice.actions;
