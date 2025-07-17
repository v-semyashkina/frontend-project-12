import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addMessage(state, { payload }) {
      const id = payload.id;
      state.entities = { ...state.entities, [id]: payload };
      state.ids = [...state.ids, id];
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
