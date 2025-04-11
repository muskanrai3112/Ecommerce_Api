import axios from "axios";
import React, { useEffect, useState } from "react";
const baseURL = "https://dummyjson.com";
import "./cart.scss";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const fetchCartData = async () => {
    try {
      const res = await axios.get(`${baseURL}/carts`);
      // console.log(res.data.carts[0].products[0], "cartResponse");
      setCartData(res.data.carts);
      console.log(res.data.carts, "hhhh");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className="container">
      <h2>This is the cart Data...</h2>

      {cartData.map((cart) => (
        <div key={cart.id} className="cartMain">
          {cart.products.map((item) => (
            <Link to={`/singleCart/${cart.id}/${item.id}`} key={item.id}>
              <div className="homeProducts__singleCard">
                <img src={item.thumbnail} alt={item.title} width="100" />
                <p>Title: {item.title}</p>
                <p>DiscountedTotal: {item.discountedTotal}</p>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cart;
