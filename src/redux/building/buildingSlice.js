import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSettings: false,
  view: "3D",
  isPlayCamera: "non-play",
  roof: true,
  colorWall: "#f5f5f5",
  view2DModule: undefined,
  view3DModule: undefined
}

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setShowSettings: (state, { payload, type }) => {
      state.showSettings = payload.showSettings;
    },
    setView: (state, { payload }) => {
      state.view = payload.view;
    },
    setPlayCamera: (state, { payload }) => {
      if (state.view === "3D") {
        state.isPlayCamera = payload.isPlayCamera;
      }
    },
    setRoof: (state) => {
      if (state.view === "3D") {
        state.roof = !state.roof;
      }
    },
    setColorWall: (state, { payload }) => {
      if (state.view === "3D") {
        state.colorWall = payload.color;
      }
    },
    setView2DModule: (state, { payload }) => {
      state.view = "2D";
      state.view2DModule = payload.view2DModule;
    },
    setView3DModule: (state, { payload }) => {
      state.view = "3D";
      state.view3DModule = payload.view3DModule;
    }
  }
})

export const {
  setShowSettings,
  setView,
  setPlayCamera,
  setRoof,
  setColorWall,
  setView2DModule,
  setView3DModule } =  buildingSlice.actions;
