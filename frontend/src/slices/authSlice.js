import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      (state.loggedIn = true), (state.token = action.payload);
    },
    logOut: (state) => {
      (state.loggedIn = false), (state.token = null);
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
