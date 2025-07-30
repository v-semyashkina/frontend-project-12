import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getAuthHeader from '../utilities/getAuthHeader.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      const header = getAuthHeader()
      headers.set('authorization', header)
      return headers
    },
  }),
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: message => ({
        url: '',
        method: 'POST',
        body: message,
      }),
    }),
    getMessages: builder.query({
      query: () => '',
    }),
    removeMessage: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
})

const { useGetMessagesQuery, useSendMessageMutation, useRemoveMessageMutation } = messagesApi

export {
  useGetMessagesQuery as getMessages,
  useSendMessageMutation as sendMessage,
  useRemoveMessageMutation as removeMessage,
}
