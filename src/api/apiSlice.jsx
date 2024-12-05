import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => "cards",
    }),
    changeCard: builder.mutation({
      query: (data) => ({
        url: `cards/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addCard: builder.mutation({
      query: (data) => ({
        url: "cards",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetCardsQuery, useChangeCardMutation, useAddCardMutation } = apiSlice;
