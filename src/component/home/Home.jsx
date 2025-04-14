import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.scss";
const baseURL = "https://dummyjson.com";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loadericon from "../../assets/Loader.gif";
import { useLocation } from "react-router-dom";

const Home = ({ setCartCount, setCartItems, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, SetItemPerPage] = useState(8);
  const [searchItem, setSearchItem] = useState("");
  const [categories, setCategories] = useState([]);
  const [titleSort, setTitleSort] = useState("title");
  const [orderSort, setorderSort] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [cartCount, setCartCount] = useState(0);
  // const [page, setPage] = useState(1);
  let navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const skip = (currentPage - 1) * itemPerPage;
      const resp = await axios.get(
        `${baseURL}/products?limit=${itemPerPage}&skip=${skip}&sortBy=${titleSort}&order=${orderSort}`
      );
      setProducts(resp.data.products);
      console.log(resp.data.products, "yyy");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData();
    }, 800);
  }, [currentPage, itemPerPage, titleSort, orderSort, location]);

  useEffect(() => {
    const handleSearchData = async () => {
      try {
        const resp = await axios.get(
          `${baseURL}/products/search?q=${searchItem}`
        );
        setProducts(resp.data.products);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if (searchItem != "") {
      handleSearchData();
    }
  }, [searchItem]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const resp = await axios.get(`${baseURL}/products/categories`);
        console.log(resp.data);
        setCategories(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const FilterProductByCategory = async () => {
      try {
        const resp = await axios.get(
          `${baseURL}/products/category/${selectedCategory}`
        );
        setProducts(resp.data.products);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if (selectedCategory != "") {
      FilterProductByCategory();
    }
  }, [selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOnChanage = (e) => {
    const searchItem = e.target.value;
    setSearchItem(searchItem);
  };
  const handleCategoryChange = (e) => {
    setLoading(true);
    const selectCategory = e.target.value;
    if (selectCategory != "") {
      setSelectedCategory(selectCategory);
    } else {
      fetchData();
    }
  };

  const preThreeNoArr = Array.from(
    { length: 3 },
    (_, index) => currentPage - 1 - index
  )
    .filter((value) => value > 2)
    .reverse();

  const nextThreeNoArr = Array.from(
    { length: 3 },
    (_, index) => currentPage + index
  );

  const handleOnDelete = (e, id) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const paginationArray = [...preThreeNoArr, ...nextThreeNoArr];

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    setCartCount((preCount) => preCount + 1);
    const isAlreadyInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (!isAlreadyInCart) {
      setCartItems([...cartItems, item]);
    } else {
      alert("Item is already in cart");
    }
  };

  return (
    <>
      <div className="homeProducts">
        <div className="container">
          <div className="tophead">
            <div className="tophead-sort">
              {/* search input.... */}
              <div className="seachInput">
                <input
                  type="text"
                  value={searchItem}
                  placeholder="Type to search"
                  onChange={handleOnChanage}
                />
              </div>
              <div className="tophead__right">
                {/* categories..... */}
                <div>
                  <label for="cars" className="tophead_leftLabel">
                    Categories
                  </label>

                  <select
                    className="categories"
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {categories?.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* sort by..... */}
                <div>
                  <label className="tophead_leftLabel">Sort By</label>
                  <select
                    className="categories"
                    value={titleSort}
                    onChange={(e) => setTitleSort(e.target.value)}
                  >
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="brand">Brand</option>
                  </select>
                </div>

                {/* Order Dropdown */}
                <div>
                  <label className="tophead_leftLabel">Order</label>
                  <select
                    className="categories"
                    value={orderSort}
                    onChange={(e) => setorderSort(e.target.value)}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loadingImg">
              {" "}
              <img src={Loadericon} alt="" />
            </div>
          ) : (
            <>
              <div className="homeProducts__cards">
                {products.length > 0 ? (
                  products.map((item) => (
                    <Link
                      to={`/product/${item.id}`}
                      key={item.id}
                      className="homeProducts__singleCard"
                    >
                      <div className="homeProducts__img">
                        <img src={item.thumbnail} alt="image" />
                      </div>
                      <div className="homeProducts__singleCard-menu">
                        <div className="homeProducts__singleCard-info">
                          <h6>
                            <p>
                              <span>Brand:</span> {item.brand}
                            </p>
                            <p>
                              <span>Price:</span> {item.price}
                            </p>
                            <p>
                              <span>Title:</span> {item.title}
                            </p>
                            <p>
                              <span>Rating:</span> {item.rating}
                            </p>
                            <p>
                              <span>ReturnPolicy:</span> {item.returnPolicy}
                            </p>
                          </h6>
                        </div>
                        <button
                          className="btn btncart"
                          onClick={(e) => handleAddToCart(e, item)}>
                          Add To Cart
                        </button>
                        <div className="homeProducts__singleCard-icons">
                          <MdDelete
                            className="delete"
                            onClick={(e) => handleOnDelete(e, item.id)}
                          />
                          <MdEdit
                            className="edit"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/update/${item.id}`);
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No Data Found</p> // The else case should be here, outside .map()
                )}
              </div>

              {/* pagination.... */}
              <div className="pagination">
                {currentPage <= 1 ? (
                  <div></div>
                ) : (
                  <button
                    className="btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {"<"}
                  </button>
                )}
                {paginationArray.map((value, index) => (
                  <button
                    onClick={() => setCurrentPage(value)}
                    key={index}
                    className={value === currentPage ? `btn active` : `btn`}
                  >
                    {value}
                  </button>
                ))}

                <button
                  className="btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {">"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
