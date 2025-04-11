import React, { useState } from "react";
import "./addProduct.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "https://dummyjson.com";

const AddProduct = () => {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [policy, setPolicy] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", Date.now());
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("returnPolicy", policy);
    formData.append("image", image);
    console.log("Sending product data:", formData);

    try {
      const res = await axios.post(`${baseURL}/products/add`, formData);
      console.log(res.data, "newdata....");
      alert("added sucessfully...");
      setBrand("");
      setPrice("");
      setTitle("");
      setRating("");
      setPolicy("");
      // this will navigate to homePage
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <>
      <h2 className="addProduct-title">Add Product...</h2>
      <form className="newData" onSubmit={handleSubmit}>
        <div className="newData__box">
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            type="text"
            placeholder="Enter brand..."
          />
        </div>
        <div className="newData__box">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="Enter price..."
          />
        </div>
        <div className="newData__box">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title..."
          />
        </div>
        <div className="newData__box">
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            type="text"
            placeholder="Enter rating..."
          />
        </div>
        <div className="newData__box">
          <input
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            type="text"
            placeholder="Enter returnPolicy..."
          />
        </div>
        <div className="newData__box">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn submit">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
