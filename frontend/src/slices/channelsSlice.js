import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState({
  activeChannel: null,
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setMany,
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload
    },
    addChannel: channelsAdapter.addOne,
    deleteChannel(state, { payload }) {
      channelsAdapter.removeOne(state, payload)
    },
    renameChannel: channelsAdapter.updateOne,
  },
})

export const { setChannels, setActiveChannel, addChannel, deleteChannel, renameChannel } =
  channelsSlice.actions
export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export const selectActiveChannel = state => state.channels.activeChannel
export default channelsSlice.reducer
