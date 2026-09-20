import { useSelector, useDispatch } from 'react-redux';
import styles from './CatalogList.module.css';
import CarCard from '../../../components/CarCard/CarCard';
import { fetchCars } from '../catalogSlice';

const CatalogList = () => {
  const dispatch = useDispatch();

  const catalog = useSelector((state) => state.catalog);

console.log('CATALOG STATE:', catalog);

const cars = Array.isArray(catalog?.cars) ? catalog.cars : [];
const page = Number(catalog?.page ?? 1);
const totalPages = catalog?.totalPages ?? 1;
const filters = catalog?.filters ?? {};
const status = catalog?.status ?? 'idle';

  const loading = status === 'loading';

  const handleLoadMore = () => {
    if (loading || page >= totalPages) {
      return;
    }

    dispatch(
      fetchCars({
        filters,
        page: page + 1,
      })
    );
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
            type="button"
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