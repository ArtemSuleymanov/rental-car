import { useDispatch } from 'react-redux';
import { fetchCars } from '../../features/catalog/catalogSlice';
import CatalogList from '../../features/catalog/CatalogList/CatalogList';
import FilterPanel from '../../features/filters/FilterPanel/FilterPanel';

const Catalog = () => {
  const dispatch = useDispatch();

  const handleSearch = (filters) => {
    dispatch(fetchCars(filters));
  };

  return (
    <div>
      <FilterPanel onSearch={handleSearch} />
      <CatalogList />
    </div>
  );
};

export default Catalog;

