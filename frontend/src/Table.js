import React, { useState, useEffect } from "react";
import "./Table.css";
import axios from "axios";

const pageSize = 10;
const maxPages = 4; // Maximum number of pages to display

const ExchangeTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearchTerm] = useState("");
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = () => {
        axios
          .get(
            `http://localhost:8000/api/exchangeList?search=${search}&page=${page}&perPage=${pageSize}`
          )
          .then((response) => {
            setData(response.data.data);
            setTotalPages(response.data.total_pages);
            setCurrentPage(response.data.current_page);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }; 
      fetchData();
     }, [page, search]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${page === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          <a href="#!">{i}</a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Exchange Data"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>24 Hr Trade Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                {item.icon && (
                  <div className="icon-container">
                    <img
                      src={item.icon[0]?.url}
                      alt="Icon"
                      className="icon"
                    />
                  </div>
                )}{" "}
                <span className="name">{item.name}</span>
              </td>
              <td>{item.volume_1day_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <ul className="pagination">
          {page > 1 && (
            <li
              className="page-item"
              onClick={() => handlePageChange(page - 1)}
            >
              <a href="#!">Previous</a>
            </li>
          )}
          {renderPageNumbers()}
          {page < totalPages && (
            <li
              className="page-item"
              onClick={() => handlePageChange(page + 1)}
            >
              <a href="#!">Next</a>
            </li>
          )}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default ExchangeTable;
