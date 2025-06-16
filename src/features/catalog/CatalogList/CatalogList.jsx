import { useSelector, useDispatch } from 'react-redux';
import styles from './CatalogList.module.css';
import CarCard from '../../../components/CarCard/CarCard';
import { fetchCars } from '../catalogSlice';

const CatalogList = () => {
  const dispatch = useDispatch();
  const { cars, page, totalPages, filters, loading } = useSelector((state) => state.catalog);

  const handleLoadMore = () => {
    dispatch(fetchCars({ filters, page: page + 1 }));
  };

  return (
    <>
      <ul className={styles.list}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {page < totalPages && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </>
  );
};

export default CatalogList;
