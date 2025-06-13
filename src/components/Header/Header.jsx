// Header.jsx
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => (
  <header className={s.header}>
    <div className={s.logo}>Rental<span>Car</span></div>
    <nav>
      <NavLink to="/" className={s.link}>Home</NavLink>
      <NavLink to="/catalog" className={s.link}>Catalog</NavLink>
    </nav>
  </header>
);

export default Header;
