import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit/";

const gamerSlice = createSlice({
  name: "gamer",
  initialState: { score: 0, total: 0, level: "Facile" },
  reducers: {
    setLevel: (state, action) => {
      return { score: 0, total: 0, level: action.payload };
    },
    setScore: (state, action) => {
      return { ...state, score: action.payload.score, total: action.payload.total };
    },
    resetGamer: () => {
      return { score: 0, total: 0, level: "Facile" };
    },
  },
});

export const { setLevel, setScore, resetGamer } = gamerSlice.actions;

export const store = configureStore({
  reducer: {
    gamer: gamerSlice.reducer,
  },
});
