// UpdateProduct.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./updateProduct.scss";

const UpdateProduct = () => {
  const { id } = useParams();
  console.log("ID from useParams:", id);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    brand: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        const { title, price, brand, rating, description } = res.data;
        setProduct({ title, price, brand, rating, description });
        console.log({ title, price, brand, rating, description }, "test11xx");
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Sending update for product ID:", id);
    console.log("Payload:", product);
    const payload = {
      title: product.title,
      brand: product.brand,
      price: Number(product.price),
      rating: Number(product.rating),
      description: product.description,
    };

    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product updated:", response.data);
      alert("Product updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update the product. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="updateForm">
        <h2 className="updateForm-title">Edit Product</h2>
        <form onSubmit={handleSubmit} className="updateForm__form">
          <input
            name="title"
            value={product.title || ""}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand"
          />
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            name="rating"
            type="number"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <button type="submit" className="btn submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
