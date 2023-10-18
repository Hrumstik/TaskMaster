import { configureStore } from "@reduxjs/toolkit";

import featuresSlice from "../../reducers/featuresSlice";
import usersSlice from "../authentication/usersSlice";
import inputOpenSlice from "../inputField/inputOpenSlice";
import searchOpenSlice from "../SearchModal/searchSlice";
import tasksReducer from "../TaskListItem/tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    input: inputOpenSlice,
    features: featuresSlice,
    search: searchOpenSlice,
    users: usersSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
