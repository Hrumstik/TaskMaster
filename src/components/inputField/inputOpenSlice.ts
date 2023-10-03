import { createSlice } from "@reduxjs/toolkit";

const inputOpenSlice = createSlice({
    name: 'inputOpenSlice',
    initialState: false,
    reducers: {
        toggleStateOfInput: (state) => !state
    }
})

export const { toggleStateOfInput } = inputOpenSlice.actions;
export default inputOpenSlice.reducer;