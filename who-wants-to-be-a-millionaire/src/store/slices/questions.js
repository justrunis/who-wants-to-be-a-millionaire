import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../../data/questions";

const initialState = {
  questions: questions,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});

export const questionsAction = questionsSlice.actions;

export default questionsSlice.reducer;
