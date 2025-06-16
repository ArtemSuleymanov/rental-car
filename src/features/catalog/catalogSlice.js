import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const fetchCars = createAsyncThunk(
  'catalog/fetchCars',
  async ({ filters, page = 1 }, { rejectWithValue }) => {
    try {
      const params = {
        ...filters,
        page,
        limit: 12,
      };

      const { data } = await axiosInstance.get('/cars', { params });

      return {
        cars: data.cars,
        page,
        totalPages: data.totalPages,
        filters,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetCars: (state) => {
      state.cars = [];
      state.page = 1;
      state.totalPages = 1;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, page, totalPages, filters } = action.payload;

        state.status = 'succeeded';
        state.page = page;
        state.totalPages = totalPages;
        state.filters = filters;
        state.cars = page === 1 ? cars : [...state.cars, ...cars];
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export const { setFilters, resetCars } = catalogSlice.actions;

export default catalogSlice.reducer;
