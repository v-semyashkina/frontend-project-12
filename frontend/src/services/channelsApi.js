import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/channels' }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (header) => ({
        url: '',
        headers: header,
      }),
    }),
  }),
});

const { useGetChannelsQuery } = channelsApi;

export { useGetChannelsQuery as getChannels };
