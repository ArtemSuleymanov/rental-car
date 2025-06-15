import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const fetchCars = createAsyncThunk(
  'catalog/fetchCars',
  async (filters) => {
    const params = {};
    if (filters.brand) params.brand = filters.brand;
    if (filters.rentalPrice) params.rentalPrice = filters.rentalPrice;
    if (filters.minMileage) params.minMileage = filters.minMileage;
    if (filters.maxMileage) params.maxMileage = filters.maxMileage;

    const { data } = await axiosInstance.get('/cars', { params });
    return data.cars;
  }
);

export const fetchBrands = createAsyncThunk(
  'catalog/fetchBrands',
  async () => {
    const { data } = await axiosInstance.get('/brands');
    return data;
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    cars: [],
    status: 'idle',
    error: null,
    brands: [],
    filters: {
      brand: '',
      rentalPrice: '',
      minMileage: '',
      maxMileage: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export const { setFilters } = catalogSlice.actions;

export default catalogSlice.reducer;
