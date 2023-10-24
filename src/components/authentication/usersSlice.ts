import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, Authentication } from "../../types/types";

const initialState: Authentication = {
  user: { email: "", token: "", id: "", login: "" },
  auth: false,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user.email = action.payload.email;
      state.user.token = action.payload.token;
      state.user.login = action.payload.login;
      state.user.id = action.payload.id;
      state.auth = true;
    },
    removeUser: (state) => {
      state.user.email = null;
      state.user.token = null;
      state.user.login = "";
      state.user.id = null;
      state.auth = false;
    },
  },
});

export const { setUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
