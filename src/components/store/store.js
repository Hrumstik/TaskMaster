import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../TaskListItem/tasksSlice';
import inputOpenSlice from '../inputField/inputOpenSlice';
import featuresSlice from "../../reducers/featuresSlice";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        input: inputOpenSlice,
        features: featuresSlice,
    }
});

export default store;