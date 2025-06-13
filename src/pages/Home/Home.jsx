import { useNavigate } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={s.hero}>
      <div className={s.hero_content}>
        <h1>Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
      </div>
      <button type="button" className={s.btn} onClick={handleClick}>
        <p>View Catalog</p>
      </button>
    </section>
  );
};

export default Home;
