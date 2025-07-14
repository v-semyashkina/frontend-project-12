import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  userId: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      (state.loggedIn = true), (state.userId = action.payload), (state.initialized = true);
    },
    logOut: (state) => {
      (state.loggedIn = false), (state.userId = null), (state.initialized = true);
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const { logIn, logOut, setInitialized } = authSlice.actions;

export default authSlice.reducer;
