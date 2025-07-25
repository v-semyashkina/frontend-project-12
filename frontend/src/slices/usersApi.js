import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

const { useLoginMutation, useSignupMutation } = usersApi;

export { useLoginMutation, useSignupMutation };
