import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { decodeAccessToken, refreshAccessToken } from './utiles';

const apiURL = import.meta.env.VITE_APP_API_URL;

export const serviceApi = createApi({
  reducerPath: 'services',
  tagTypes: ['service', 'userService'],
  baseQuery: fetchBaseQuery({ 
  baseUrl: `${apiURL}`,
    prepareHeaders: async (headers) => {
      const accessToken = Cookies.get("accessToken");
      
      if (!accessToken) {
        return headers;
      }

      headers.set('Authorization', `Bearer ${accessToken}`);

      const decodedToken = decodeAccessToken(accessToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return headers;
      }

      try {
        const refreshedToken = await refreshAccessToken(apiURL);
        headers.set('Authorization', `Bearer ${refreshedToken}`);
        Cookies.set('accessToken', refreshedToken);
      } catch (error) {
        throw error
      }
      
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getServices: builder.query({
      providesTags:  ['service'],
      query: (params) => ({ 
        url: `/service?page=${params.page}&type=${params.type}`,
        method: 'GET',
      })
    }),
    getService: builder.query({
      providesTags: ['service'],
      query: (params) => ({
        url: `/service/get_service?serviceId=${params.serviceId}`,
        method: 'GET',
      }),
    }),
    createService: builder.mutation({
      invalidatesTags:  ['service'],
      query: (request) => ({
        url: '/service',
        body: request,
        method: 'POST'
      })
    }),
    updateService: builder.mutation({
      invalidatesTags: ['service'],
      query: (request) => ({
        url: '/service',
        body: request,
        method: 'PUT'
      })
    }),
    deleteService: builder.mutation({
      invalidatesTags: ['service'],
      query: (request) => ({
        url: '/service',
        body: request,
        method: 'DELETE'
      })
    }),
    getAllUserServices: builder.query({
      query: (params) => ({
        url: `/service/userservices?userId=${params.userId}&type=${params.type}`,
        method: 'GET',
        providesTags:  ['service', 'userService']
      })
    }),
    
  })
})

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAllUserServicesQuery,
} = serviceApi;