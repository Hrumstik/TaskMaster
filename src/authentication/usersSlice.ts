import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string | null;
  token: string | null;
  id: string | null;
}

interface authentication {
  user: Partial<User>;
  auth: boolean;
}

const initialState: authentication = {
  user: { email: null, token: null, id: null },
  auth: false,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { email, token, id } = action.payload;
      state.user.email = email;
      state.user.token = token;
      state.user.id = id;
      state.auth = true;
    },
    removeUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
