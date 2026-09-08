import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchCars,
  fetchBrands,
} from '../../features/catalog/catalogSlice';

import CatalogList from '../../features/catalog/CatalogList/CatalogList';
import FilterPanel from '../../features/filters/FilterPanel/FilterPanel';

const Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchCars({
        filters: {
          brand: '',
          rentalPrice: '',
          minMileage: '',
          maxMileage: '',
        },
        page: 1,
      })
    );

    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSearch = (filters) => {
    dispatch(
      fetchCars({
        filters,
        page: 1,
      })
    );
  };

  return (
    <div>
      <FilterPanel onSearch={handleSearch} />

      <CatalogList />
    </div>
  );
};

export default Catalog;