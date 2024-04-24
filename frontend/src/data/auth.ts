import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const apiURL = import.meta.env.VITE_APP_API_URL;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${apiURL}`,
    credentials: "include"
  }),
  reducerPath: 'register',
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      invalidatesTags: ['auth'],
      query: (request) => ({
        url: `/register`,
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json"
        }
      })
    }),
    login: builder.mutation({
      invalidatesTags: ['auth'],
      query: (request) => ({
        url: `/login`,
        method: "POST",
        body: request
      })
    }),
    logout: builder.query({
      providesTags: ['auth'],
      query: () => ({
        url: `/logout`,
      })
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutQuery
} = authApi;