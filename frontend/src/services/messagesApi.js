import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/messages' }),
  endpoints: (builder) => ({
    getMessases: builder.query({
      query: () => '',
    }),
  }),
});

const { useGetMessasesQuery } = messagesApi;

export { useGetMessasesQuery as getMessages };
