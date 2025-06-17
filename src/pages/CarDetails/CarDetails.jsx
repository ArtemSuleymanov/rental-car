import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import s from "./CarDetails.module.css";
import BookingForm from "../../features/BookingForm/BookingForm";
import sprite from "../../assets/sprite.svg";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCityCountry = (address) => {
    if (!address) return null;
    const parts = address.split(",").map((part) => part.trim());
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
    <div className={s.carDetails}>
      <div className={s.imageSection}>
        <img src={img} alt={`${brand} ${model}`} className={s.carImage} />
        <BookingForm />
      </div>

      <div className={s.detailsSection}>
        <h2 className={s.detailsTxt}>
          {brand} {model}, {year}
        </h2>
        <div className={s.location}>
          {address ? (
            <p className={s.location}>
              <svg width="16" height="16" className={s.locationIcon}>
                <use href={`${sprite}#icon-Location`} />
              </svg>{" "}
              {getCityCountry(address)}
            </p>
          ) : (
            <p className={s.location}>Location not available</p>
          )}

          <p className={s.mileage}>Mileage: {formatMileage} km</p>
        </div>
        <p className={s.price}>${rentalPrice}</p>

        <p className={s.desc}>{description}</p>

        <div className={s.infoContainer}>
          <h3 className={s.carTitle}>Rental Conditions:</h3>
          <ul className={s.rentalList}>
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
        </div>

        <div className={s.infoContainer}>
          <h3 className={s.carTitle}>Car Specifications:</h3>
          <ul className={s.rentalList}>
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
        </div>

        <h3 className={s.carTitle}>Accessories and functionalities:</h3>
        <ul className={s.rentalList}>
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
    </div>
  );
};

export default CarDetails;
