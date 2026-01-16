import { useNavigate } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={s.hero}>
      <video className={s.hero_video}
    autoPlay
    muted
    loop
    playsInline
>
  <source src="/public/video/car_video.mp4" type="video/mp4"/>
</video>
<div className={s.hero_overlay}></div>
      <div className={s.hero_content}>
        <h1 className={s.hero_title}>Find your perfect rental car</h1>
        <p className={s.hero_txt}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button type="button" className={s.btn} onClick={handleClick}>
          <p className={s.hero_btn_txt}>View Catalog</p>
        </button>
      </div>
    </section>
  );
};

export default Home;
