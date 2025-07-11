import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BorrowRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

interface BorrowSummary {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummary[];
}

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://library-new-sigma.vercel.app/api',
  }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, BorrowRequest>({
      query: (payload) => ({
        url: 'borrow',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Borrow'],  
    }),

    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => 'borrow',
      transformResponse: (response: BorrowSummaryResponse) => response.data,
      providesTags: ['Borrow'],  
    
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;
