import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSettings: false,
  view: "3D",
  cameraControls: "non-play",
  roof: true,
  colorWall: "#0xf5f5f5",
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
    setCameraControls: (state, { payload }) => {
      if (state.view === "3D") {
        state.cameraControls = payload.cameraControls;
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
  setCameraControls,
  setRoof,
  setColorWall,
  setView2DModule,
  setView3DModule } =  buildingSlice.actions;
