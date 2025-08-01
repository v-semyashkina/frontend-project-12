import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import modalReducer from './modalsSlice.js'
import { channelsApi } from './channelsApi.js'
import { messagesApi } from './messagesApi.js'
import { usersApi } from './usersApi.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      channelsApi.middleware,
      messagesApi.middleware,
      usersApi.middleware,
    ]),
})
