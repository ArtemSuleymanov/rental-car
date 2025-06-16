import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CarDetails.module.css";
import BookingForm from "../../features/BookingForm/BookingForm";
import sprite from "../../assets/sprite.svg";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCityCountry = (address) => {
    if (!address) return null;
    const parts = address.split(",").map(part => part.trim());
    if (parts.length >= 2) {
      return parts.slice(-2).join(", ");
    }
    return address;
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://car-rental-api.goit.global/cars/${id}`
        );
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
    address,
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

        {address ? (
          <p className={styles.location}>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-Location`} />
            </svg>{" "}
            {getCityCountry(address)}
          </p>
        ) : (
          <p className={styles.location}>Location not available</p>
        )}

        <p className={styles.mileage}>
          <svg width="16" height="16">
            <use href={`${sprite}#icon-road`} />
          </svg>
          Mileage: {formatMileage} km
        </p>

        <p className={styles.price}>
          <svg width="16" height="16">
            <use href={`${sprite}#icon-currency-dollar`} />
          </svg>
          ${rentalPrice}
        </p>

        <p>{description}</p>

        <h3>Rental Conditions:</h3>
        <ul>
          {Array.isArray(rentalConditions) ? (
            rentalConditions.map((condition, index) => (
              <li key={index}>
                <svg width="16" height="16">
                  <use href={`${sprite}#icon-check-circle`} />
                </svg>{" "}
                {condition}
              </li>
            ))
          ) : (
            <li>
              <svg width="16" height="16">
                <use href={`${sprite}#icon-info`} />
              </svg>{" "}
              Rental conditions not available
            </li>
          )}
        </ul>

        <h3>Car Specifications:</h3>
        <ul>
          <li>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-calendar`} />
            </svg>{" "}
            Year: {year}
          </li>
          <li>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-car`} />
            </svg>{" "}
            Type: {type}
          </li>
          <li>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-fuel-pump`} />
            </svg>{" "}
            Fuel Consumption: {fuelConsumption}
          </li>
          <li>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-gear`} />
            </svg>{" "}
            Engine Size: {engineSize}
          </li>
        </ul>

        <h3>Accessories and functionalities:</h3>
        <ul>
          {Array.isArray(accessories) && Array.isArray(functionalities) ? (
            [...accessories, ...functionalities].map((item, index) => (
              <li key={index}>
                <svg width="16" height="16">
                  <use href={`${sprite}#icon-check-circle`} />
                </svg>{" "}
                {item}
              </li>
            ))
          ) : (
            <li>
              <svg width="16" height="16">
                <use href={`${sprite}#icon-info`} />
              </svg>{" "}
              No accessories or functionalities listed
            </li>
          )}
        </ul>
      </div>

      <BookingForm />
    </div>
  );
};

export default CarDetails;
