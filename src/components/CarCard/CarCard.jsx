import { useNavigate } from "react-router-dom";
import s from "./CarCard.module.css";
import sprite from "../../assets/sprite.svg";
import { useState } from "react";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id,
    brand,
    model,
    year,
    img,
    rentalPrice,
    address,
    type,
    mileage,
    rentalCompany,
  } = car;

  const city = address.split(",")[1]?.trim();
  const country = address.split(",")[2]?.trim();

  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  const handleFavoriteClick = () =>{
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={s.card}>
      <div className={s.imgWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={s.img} />
        <button 
          className={`${s.heartButton} ${isFavorite ? s.active : ''}`} 
          onClick={handleFavoriteClick}
          type="button" 
        >
          <svg className={s.icon} width="20" height="20">
            <use href={`${sprite}#icon-like`} />
          </svg>
        </button>
      </div>
      <div className={s.content}>
        <div className={s.info}>
          <h3>
            {brand}{" "}
            <span>
              {model}, {year}
            </span>
          </h3>
          <p className={s.price}>${rentalPrice}</p>
        </div>

        <ul className={s.meta}>
            <li>{city}</li>
            <li>{country}</li>
            <li>{rentalCompany}</li>
            <li>{type}</li>
            <li>{mileage.toLocaleString()} km</li>
        </ul>

        <button className={s.button} onClick={handleReadMore}>
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarCard;
