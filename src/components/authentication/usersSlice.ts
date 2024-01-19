import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, Authentication } from "../../types/types";

const initialState: Authentication = {
  user: { email: "", id: "", login: "" },
  auth: false,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user.email = action.payload.email;
      state.user.login = action.payload.login;
      state.user.id = action.payload.id;
      state.auth = true;
    },
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
