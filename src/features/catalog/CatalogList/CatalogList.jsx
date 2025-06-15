import { useSelector } from 'react-redux';
import styles from './CatalogList.module.css';
import CarCard from '../../../components/CarCard/CarCard';

const CatalogList = () => {
  const cars = useSelector((state) => state.catalog.cars);

  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CatalogList;