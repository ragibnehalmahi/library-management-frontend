import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./bookApi";
import { borrowApi } from "./borrowApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (gDM) => gDM().concat(bookApi.middleware, borrowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
