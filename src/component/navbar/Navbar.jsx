import React from "react";
import "./navbar.scss";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const handleOnCartClick = () => {
    navigate("/cart");
  };
  return (
    <>
      <div className="navbarMenu">
        <a href="#">Home</a>
        <a href="#">Mobiles</a>
        <a href="#">Fashions</a>
        <a href="#">Electronincs</a>
        <a href="#" className="cartImg__main">
          <CiShoppingCart className="cartImg" onClick={handleOnCartClick} />
          <span className="cartImg__num">{cartCount}</span>
        </a>
      </div>
    </>
  );
};

export default Navbar;
