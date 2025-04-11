import axios from "axios";
import { useEffect, useState } from "react";
import "./pagination.scss";

const paginationUrl =
  "https://dummyjson.com/products?limit=6&skip=6&select=title,price";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPagination = async () => {
    try {
      const response = await axios.get(paginationUrl);
      console.log(response.data.products, "pagination");
      setData(response.data.products)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPagination();
  }, [currentPage, itemPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return;
  <p>Loading</p>;

  return (
    <>
      {/* <div className="container"> */}
        <div className="pagination">
            {data.map((item)=>(
                <div key={item.id}>
                    {item.title}

                </div>
            ))}
          <button
            className="btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            pre
          </button>
          <button
            className="btn"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            next
          </button>
        </div>
      {/* </div> */}
    </>
  );
};

export default Pagination;
