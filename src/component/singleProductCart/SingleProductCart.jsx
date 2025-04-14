import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const baseURL = "https://dummyjson.com";

const SingleProductCart = () => {
  const { cartId, productId } = useParams();
  const [product, setProduct] = useState(null);

  const fetchSingleDataCart = async () => {
    try {
      let res = await axios.get(`${baseURL}/carts/${cartId}`);
      const foundProduct = res.data.products.find(
        (item) => item.id.toString() === productId
      );
      setProduct(foundProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSingleDataCart();
  }, [cartId, productId]);

  return (
    <>
      <h2 className="cartSingleTitle">singleProduct....page....</h2>
      {product ? (
        <div className="container">
          <div className="homeProducts__singleCard cartSingleBox">
            <img src={product.thumbnail} alt={product.title} />
            <div className="homeProducts__singleCard-menu">
              <p>{product.title}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default SingleProductCart;
