import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSettings: false,
  view: "3D",
  cameraControls: "non-play",
  roof: true,
  colorWall: "#0xf5f5f5"
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
    }
  }
})

export const { setShowSettings, setView, setCameraControls, setRoof, setColorWall } =  buildingSlice.actions;
