import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
    name: 'featuresSlice',
    initialState: {
        sortTasksAlphabetically: false,
        showImportantTasks: false,
        deleteAllTask: false,
        showLightTheme: true,
    },
    reducers: {
        sortTasksAlphabetically: (state) => {
            state.sortTasksAlphabetically = !state.sortTasksAlphabetically
        },
        showImportantTasks: (state) => {
            state.showImportantTasks = !state.showImportantTasks
        },
        deleteAllTask: (state) => {
            state.deleteAllTask = !state.deleteAllTask
        },
        toggleTheme: (state) => {
            state.showLightTheme = !state.showLightTheme
        }
    }
})

export const { sortTasksAlphabetically, showImportantTasks, toggleTheme } = featuresSlice.actions;
export default featuresSlice.reducer;