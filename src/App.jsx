import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";
import SingleProductDetail from "./component/signleProductDetail/SingleProductDetail";
import AddProduct from "./component/addProduct/addProduct";
import UpdateProduct from "./component/updateProduct/UpdateProduct";
import Cart from "./component/cart/cart";
import { useState } from "react";
import SingleProductCart from "./component/singleProductCart/SingleProductCart";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  return (
    <>
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home setCartCount={setCartCount} />} />
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/singleCart/:cartId/:productId" element={<SingleProductCart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
