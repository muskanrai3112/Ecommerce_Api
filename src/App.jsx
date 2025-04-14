import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import SingleProductDetail from "./component/signleProductDetail/SingleProductDetail";
import AddProduct from "./component/addProduct/addProduct";
import UpdateProduct from "./component/updateProduct/UpdateProduct";
import Cart from "./component/cart/cart";
import { useEffect, useState } from "react";
import SingleProductCart from "./component/singleProductCart/SingleProductCart";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <>
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCartCount={setCartCount}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <SingleProductDetail
                cartCount={cartCount}
                setCartCount={setCartCount}
              />
            }
          />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/singleCart/:cartId/:productId"
            element={<SingleProductCart />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
