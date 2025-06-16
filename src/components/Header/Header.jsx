// Header.jsx
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import sprite from "../../assets/sprite.svg";

const Header = () => (
  <header className={s.header}>
    <div className={s.logo}>
      <svg className={s.icon} width="102" height="16">
        <use href={`${sprite}#icon-Logo`} />
      </svg>
    </div>
    <nav>
      <NavLink to="/" className={s.link}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={s.link}>
        Catalog
      </NavLink>
    </nav>
  </header>
);

export default Header;
