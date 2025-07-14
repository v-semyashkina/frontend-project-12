import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
  activeId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
      state.activeId = ids[0];
    },
    setActiveChannel(state, { payload }) {
      state.activeId = payload;
    },
  },
});

export const { setChannels, setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
