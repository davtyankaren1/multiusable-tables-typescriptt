import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <NavLink
        to='/products'
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Products
      </NavLink>
      <NavLink
        to='/price-plan'
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Price Plans
      </NavLink>
      <NavLink
        to='/pages'
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Pages
      </NavLink>
      <NavLink
        to='/countries'
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Countries
      </NavLink>
    </nav>
  );
};

export default Navbar;
