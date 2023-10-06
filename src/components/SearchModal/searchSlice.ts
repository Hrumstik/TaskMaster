import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "searchOpenSlice",
  initialState: false,
  reducers: {
    toggleStateOfInput: (state) => !state,
  },
});

export const { toggleStateOfInput } = SearchSlice.actions;
export default SearchSlice.reducer;
