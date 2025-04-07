import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Book", "User", "Order"],
  endpoints: (builder) => ({
    // Dummy endpoints will be extended by feature slices
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/auth/update-password",
        method: "PUT",
        body: passwords,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
} = apiSlice;
