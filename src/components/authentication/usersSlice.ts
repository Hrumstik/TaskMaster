import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string | null;
  token: string | null;
  id: string | null;
}

interface authentication {
  user: User;
  auth: boolean;
}

const initialState: authentication = {
  user: { email: "", token: "", id: "" },
  auth: false,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user.email = action.payload.email;
      state.user.token = action.payload.token;
      state.user.id = action.payload.id;
      state.auth = true;
    },
    removeUser: (state) => {
      state.user.email = null;
      state.user.token = null;
      state.user.id = null;
      state.auth = false;
    },
  },
});

export const { setUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
