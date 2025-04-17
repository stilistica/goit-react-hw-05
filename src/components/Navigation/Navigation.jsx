import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function Navigation() {
  const setActiveLink = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink to="/" className={setActiveLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={setActiveLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
