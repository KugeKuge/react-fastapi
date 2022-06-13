import { configureStore } from '@reduxjs/toolkit';
import pageNameReducer from './pageNameSlice';

export const store = configureStore({
  reducer: {
    pageName: pageNameReducer,
  },
});