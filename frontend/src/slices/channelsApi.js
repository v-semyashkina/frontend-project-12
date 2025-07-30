import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getAuthHeader from '../utilities/getAuthHeader.js'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: headers => {
      const header = getAuthHeader()
      headers.set('authorization', header)
      return headers
    },
  }),
  endpoints: builder => ({
    sendChannel: builder.mutation({
      query: channel => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
    }),
    getChannels: builder.query({
      query: () => '',
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: id,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
})

const {
  useGetChannelsQuery,
  useSendChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi

export {
  useGetChannelsQuery as getChannels,
  useSendChannelMutation as sendChannel,
  useRemoveChannelMutation as removeChannel,
  useRenameChannelMutation as renameChannel,
}
