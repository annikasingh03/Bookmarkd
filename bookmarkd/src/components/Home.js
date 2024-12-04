import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import Card from './Card';

const API_KEY = "AIzaSyA9x3jKOiFr9XoAi17h5_LU-T94tKtsgSs";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch popular books when the component loads
  useEffect(() => {
    fetchBooks("subject:fiction&orderBy=relevance"); // Default query for popular books
  }, []);

  const fetchBooks = (query) => {
    setLoading(true);
    fetch(`${BASE_URL}${query}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items); // Set the books fetched from API
        } else {
          setBooks([]); // Clear books if no results
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchQuery.trim()) {
      fetchBooks(searchQuery); // Fetch books based on search query
    }
  };

  return (
    <>
      {/* Blue strip below bookmark */}
      <div className="blue-strip"></div>

      {/* Header with navigation and search bar */}
      <div className="header_home">
        <nav>
          <ul>
            <li><Link to="/home">POPULAR</Link></li>
            <li><Link to="/review">REVIEW</Link></li>
            <li><Link to="/profile">PROFILE</Link></li>
          </ul>
        </nav>
        <form onSubmit={handleSearch}>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Book Name"
              className="inputText"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
            <button type="submit">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#243558" }}
              ></i>
            </button>
          </div>
        </form>
      </div>

      {/* Render Cards with fetched books */}
      <div className="container_home">
        {loading ? (
          <p>Loading books...</p>
        ) : books.length > 0 ? (
          books.map((book, index) => (
            <Card
              key={index}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors}
              image={book.volumeInfo.imageLinks?.thumbnail}
              description={book.volumeInfo.description}
            />
          ))
        ) : (
          <p>No books found. Try searching for something else!</p>
        )}
      </div>
    </>
  );
};

export default Home;
