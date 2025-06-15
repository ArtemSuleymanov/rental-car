import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from '../features/catalog/catalogSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
});