// import axios from "axios";
// import React, { useEffect, useState } from "react";
// const baseURL = "https://dummyjson.com";
// import "./cart.scss";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const [cartData, setCartData] = useState([]);

//   const fetchCartData = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/carts`);
//       // console.log(res.data.carts[0].products[0], "cartResponse");
//       setCartData(res.data.carts);
//       console.log(res.data.carts, "hhhh");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   return (
//     <div className="container">
//       <h2>This is the cart Data...</h2>

//       {cartData.map((cart) => (
//         <div key={cart.id} className="cartMain">
//           {cart.products.map((item) => (
//             <Link to={`/singleCart/${cart.id}/${item.id}`} key={item.id}>
//               <div className="homeProducts__singleCard">
//                 <div className="homeProducts__img">
//                 <img src={item.thumbnail} alt={item.title} width="100" />
//                 </div>
//               <div className="homeProducts__singleCard-menu">
//               <p className="homeProducts__singleCard-text">Title: <span>{item.title}</span></p>
//               <p className="homeProducts__singleCard-text">DiscountedTotal:<span>{item.discountedTotal}</span> </p>
//               </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useState } from "react";

const Cart = ({ cartItems, setCartItems }) => {
  const [count, setCartCount] = useState(0);
  const handleOnDeleteitem = (e, id) => {
    e.preventDefault();
    const delItem = cartItems.filter((item) => item.id !== id);
    setCartItems(delItem);
  };

  const handleOnDecrease = () => {};
  const handleOnIncrease = (index) => {
    const updateCart = [...cartItems];
  };

  return (
    <>
      <div className="cartPage">
        <h2>Your cart Page...</h2>
        {cartItems.length === 0 ? (
          <p>No item in the cart...</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.thumbnail} alt={item.title} width="80" />
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <button onClick={(e) => handleOnDeleteitem(e, item.id)}>
                    Remove Item from cart
                  </button>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <button
                        className="handleOnDecrease"
                        onClick={() => setCartCount((pre) => pre - 1)}
                      >
                        -
                      </button>
                      <span style={{ marginLeft: "10px" }}>{count}</span>
                    </div>
                    <div>
                      <button
                        className="handleOnDecrease"
                        onClick={() => setCartCount((pre) => pre + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
