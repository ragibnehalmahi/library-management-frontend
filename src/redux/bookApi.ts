 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://library-new-sigma.vercel.app/api',
  }),
  tagTypes: ['Books', 'Borrows'],
  endpoints: (builder) => ({
    
    getAllBooks: builder.query<any[], void>({
      query: () => 'books',
      providesTags: ['Books'],
    }),
    getBookById: builder.query<any, string>({
      query: (id) => `books/${id}`,
      providesTags: ['Books'],
    }),
    createBook: builder.mutation<any, any>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<any, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: 'PUT',  
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    
     
    borrowBook: builder.mutation<any, { book: string; quantity: number; dueDate: string }>({
      query: (borrowData) => ({
        url: 'borrow',
        method: 'POST',
        body: borrowData,
      }),
      
      invalidatesTags: ['Books', 'Borrows'],
    }),
    getBorrowSummary: builder.query<any[], void>({
      query: () => 'borrow',
      providesTags: ['Borrows'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
