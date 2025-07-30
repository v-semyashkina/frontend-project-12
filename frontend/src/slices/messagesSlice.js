import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import { messagesApi } from './messagesApi.js'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

export const deleteMessages = createAsyncThunk(
  'messages/removeMessages',
  async (channelId, { getState, dispatch }) => {
    const state = getState()
    const messagesToDelete = Object.values(state.messages.entities)
      .filter(e => e.channelId === channelId)
      .map(e => e.id)
    await Promise.all(
      messagesToDelete.map(messageId =>
        dispatch(messagesApi.endpoints.removeMessage.initiate(messageId)).unwrap(),
      ),
    )
    return messagesToDelete
  },
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.setMany,
  },
  extraReducers: builder => {
    builder.addCase(deleteMessages.fulfilled, messagesAdapter.removeMany)
  },
})

export const { setMessages, addMessage } = messagesSlice.actions
export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)
export default messagesSlice.reducer
