import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../TaskListItem/tasksSlice";
import inputOpenSlice from "../inputField/inputOpenSlice";
import featuresSlice from "../../reducers/featuresSlice";
import searchOpenSlice from "../SearchModal/searchSlice";
import usersSlice from "../authentication/usersSlice";

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
