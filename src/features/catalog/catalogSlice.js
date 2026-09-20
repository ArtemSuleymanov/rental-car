import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

const initialFilters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

export const fetchCars = createAsyncThunk(
  'catalog/fetchCars',
  async ({ filters = initialFilters, page = 1 }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        limit: 12,
      };

      if (filters.brand) {
        params.brand = filters.brand;
      }

      if (filters.rentalPrice) {
        params.rentalPrice = filters.rentalPrice;
      }

      if (filters.minMileage) {
        params.minMileage = filters.minMileage;
      }

      if (filters.maxMileage) {
        params.maxMileage = filters.maxMileage;
      }

      const { data } = await axiosInstance.get('/cars', {
        params,
      });

      console.log('API DATA:', data);
      console.log('REQUEST PARAMS:', params);

      const rawCars = Array.isArray(data.cars) ? data.cars : (Array.isArray(data) ? data : []);

      const isBeckendPaginating = data.page != undefined;
      const carsPerPage = 12;

      let finalCars = rawCars;
      let calculatedTotalPages = 1;

      if (!isBeckendPaginating) {
        const startIndex = (page - 1) * carsPerPage;
        const endIndex = startIndex + carsPerPage;
        finalCars = rawCars.slice(startIndex, endIndex);
        calculatedTotalPages = Math.ceil(rawCars.length / carsPerPage);
      } else {
        calculatedTotalPages = data.totalPages || 1;
      }


      return {
        cars: finalCars,
        page: isBeckendPaginating ? Number(data.page) : page,
        totalPages: calculatedTotalPages,
        filters,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchBrands = createAsyncThunk(
  'catalog/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/brands');

      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',

  initialState: {
    cars: [],
    brands: [],
    filters: initialFilters,

    page: 1,
    totalPages: 1,

    status: 'idle',
    error: null,
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },

    resetCars: (state) => {
      state.cars = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      // CARS
      .addCase(fetchCars.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;

        // При новом поиске очищаем старые машины
        if (action.meta.arg.page === 1) {
          state.cars = [];
          state.page = 1;
          state.totalPages = 1;
        }
      })

      .addCase(fetchCars.fulfilled, (state, action) => {
        const {
          cars,
          page,
          totalPages,
          filters,
        } = action.payload;

        state.status = 'succeeded';

        state.page = page;
        state.totalPages = totalPages;
        state.filters = filters;

        console.log('FULFILLED:', {
          page,
          carsFromServer: cars.length,
          carsInStateBefore: state.cars.length,
        });


        const existingIds = new Set(state.cars.map((car) => car.id));

        const newCars = cars.filter((car) => !existingIds.has(car.id));

        state.cars = [...state.cars, ...newCars];

      })

      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // BRANDS
      .addCase(fetchBrands.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })

      .addCase(fetchBrands.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  resetCars,
} = catalogSlice.actions;

export default catalogSlice.reducer;