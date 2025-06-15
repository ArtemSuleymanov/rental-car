import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CarDetails.module.css";
import BookingForm from "../../features/BookingForm/BookingForm";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`https://car-rental-api.goit.global/cars/${id}`);
        setCar(response.data);
      } catch {
        setError("Car not found");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const {
    img,
    brand,
    model,
    year,
    type,
    mileage,
    rentalPrice,
    fuelConsumption,
    engineSize,
    description,
    rentalConditions,
    accessories,
    functionalities,
  } = car;

  const formatMileage = mileage
    ? mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : "N/A";

  return (
    <div className={styles.carDetails}>
      <div className={styles.imageSection}>
        <img src={img} alt={`${brand} ${model}`} />
      </div>

      <div className={styles.detailsSection}>
        <h2>
          {brand} {model}, {year}
        </h2>
        <p className={styles.location}>Mileage: {formatMileage} km</p>
        <p className={styles.price}>${rentalPrice}</p>
        <p>{description}</p>

        <h3>Rental Conditions:</h3>
        <ul>
          {Array.isArray(rentalConditions) ? (
            rentalConditions.map((condition, index) => (
              <li key={index}>✔ {condition}</li>
            ))
          ) : (
            <li>Rental conditions not available</li>
          )}
        </ul>

        <h3>Car Specifications:</h3>
        <ul>
          <li>Year: {year}</li>
          <li>Type: {type}</li>
          <li>Fuel Consumption: {fuelConsumption}</li>
          <li>Engine Size: {engineSize}</li>
        </ul>

        <h3>Accessories and functionalities:</h3>
        <ul>
          {Array.isArray(accessories) && Array.isArray(functionalities) ? (
            [...accessories, ...functionalities].map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))
          ) : (
            <li>No accessories or functionalities listed</li>
          )}
        </ul>
      </div>

      <BookingForm />
    </div>
  );
};

export default CarDetails;
