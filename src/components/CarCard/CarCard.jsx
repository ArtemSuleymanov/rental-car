import { useNavigate } from 'react-router-dom';
import styles from './CarCard.module.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const {
    id, brand, model, year, img, rentalPrice, address, type, mileage, rentalCompany,
  } = car;

  const city = address.split(',')[1]?.trim();
  const country = address.split(',')[2]?.trim();

  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className={styles.card}>
      <img src={img} alt={`${brand} ${model}`} className={styles.img} />
      <div className={styles.content}>
        <h3>{brand} <span>{model}, {year}</span></h3>
        <p className={styles.price}>${rentalPrice}</p>
        <ul className={styles.meta}>
          <li>{city}</li>
          <li>{country}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{mileage.toLocaleString()} km</li>
        </ul>
        <button className={styles.button} onClick={handleReadMore}>
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarCard;
