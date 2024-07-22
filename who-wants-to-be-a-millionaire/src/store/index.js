import { configureStore } from "@reduxjs/toolkit";

import questionsReducer from "./slices/questions";

const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

export default store;
