import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit/";

const gamerSlice = createSlice({
  name: "gamer",
  initialState: { score: 0, total: 0, level: "Facile", generation: 1 },
  reducers: {
    setLevel: (state, action) => {
      return { ...state, score: 0, total: 0, level: action.payload };
    },
    setScore: (state, action) => {
      return {
        ...state,
        score: action.payload.score,
        total: action.payload.total,
      };
    },
    setGen: (state, action) => {
      return { ...state, score: 0, total: 0, generation: action.payload };
    },
    resetGamer: () => {
      return { score: 0, total: 0, level: "Facile", generation: 1 };
    },
  },
});

export const { setLevel, setScore, resetGamer, setGen } = gamerSlice.actions;

export const store = configureStore({
  reducer: {
    gamer: gamerSlice.reducer,
  },
});
