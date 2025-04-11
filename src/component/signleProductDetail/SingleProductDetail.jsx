import axios from "axios";
import React, { useEffect, useState } from "react";
const baseURL = "https://dummyjson.com";
import { useParams } from "react-router-dom";
import "./singleProduct.scss";

const SingleProductDetail = ({ cartCount, setCartCount }) => {
  const { id } = useParams();
  const [data, setdata] = useState(null);

  const fetchSingleData = async () => {
    try {
      const resp = await axios.get(`${baseURL}/products/${id}`);
      console.log(resp.data, "singledata");
      setdata(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSingleData();
  }, [id]);

  if (!data) return <p>Loading Product....</p>;
  return (
    <>
      <h2 className="title">Here is the detail of the product.....</h2>
      <div className="single_product">
        <div>
          <div className="single_img">
            <img src={data.thumbnail} alt={data.title} />
          </div>
          <div>
            <h2 className="single_productTitle">{data.title}</h2>
          </div>
        </div>
        <div className="singleProduct">
          <h2 className="single_category">
            <span>Category:</span> {data.category}
          </h2>
          <p className="single_category">
            <span>Status:</span> {data.availabilityStatus}
          </p>
          <p className="single_category">
            <span>Brand:</span> {data.brand}
          </p>
          <p className="single_category des">
            <span>Description:</span> {data.description}
          </p>
          <p className="single_category des">
            <span>Price:</span> {data.price}
          </p>

          <p className="single_category des">
            <span>ReturnPolicy:</span> {data.returnPolicy}
          </p>

          <div className="actionBtnsMain">
            <div className="actionBtn">
              <button
                className="btn"
                onClick={() => setCartCount((pre) => pre + 1)}
              >
                +
              </button>
              <span>{cartCount}</span>
              <button
                className="btn"
                onClick={() => setCartCount((pre) => pre - 1)}
              >
                -
              </button>
            </div>
            <div className="cart">
              <button className="btn btncart">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleProductDetail;
