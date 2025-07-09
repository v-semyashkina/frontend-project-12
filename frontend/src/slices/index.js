import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';

export default configureStore({
  reducer: {
    // Свойство auth будет внутри объекта общего состояния: state.auth
    auth: authReducer,
  },
});
