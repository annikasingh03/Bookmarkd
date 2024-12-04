import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";

const Review = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    author: "",
    description: "",
    rating: 1, // Default rating is 1
  });

  const [savedBooks, setSavedBooks] = useState([]);

  // Pre-fill title, author, and image if passed via navigation
  useEffect(() => {
    if (location.state) {
      setFormData((prevData) => ({
        ...prevData,
        title: location.state.title || "",
        author: location.state.author || "",
        image: location.state.image || null, // Auto-populate the image
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedBooks([...savedBooks, formData]);
    setFormData({ title: "", image: null, author: "", description: "", rating: 1 });
    alert("Book saved!");
  };

  const handleReset = () => {
    setFormData({ title: "", image: null, author: "", description: "", rating: 1 });
    alert("Form reset!");
  };

  return (
    <div>
      {/* Blue strip */}
      <div className="blue-strip"></div>

      {/* Header with navigation */}
      <div className="header_home">
        <nav>
          <ul>
            <li>
              <Link to="/home">POPULAR</Link>
            </li>
            <li>
              <Link to="/review">REVIEW</Link>
            </li>
            <li>
              <Link to="/profile">PROFILE</Link>
            </li>
          </ul>
        </nav>

        {/* Search bar */}
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Book Name"
              className="inputText"
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

      {/* Main Content */}
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#9fb4e0" }} // Light blue background
      >
        <main className="p-2 w-full max-w-3xl">
          <h1 className="text-pgreen text-xl font-bold mb-4 text-center">
            Add a Book
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mx-auto w-full max-w-md bg-pLightPurple text-white p-5 rounded-lg shadow-lg"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="text-gray-200 text-sm font-bold leading-tight tracking-normal"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mb-5 mt-2 bg-pgray/50 focus:outline-none focus:border focus:border-pgreen font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border"
              />
            </div>

            {/* Image */}
            {formData.image && (
              <div>
                <label
                  htmlFor="image"
                  className="text-gray-200 text-sm font-bold leading-tight tracking-normal"
                >
                  Book Cover
                </label>
                <img
                  src={formData.image}
                  alt="Book Cover"
                  className="w-full h-48 object-cover rounded mb-5"
                />
              </div>
            )}

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="text-gray-200 text-sm font-bold leading-tight tracking-normal"
              >
                Author
              </label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                id="author"
                value={formData.author}
                onChange={handleInputChange}
                className="mb-5 mt-2 bg-pgray/50 focus:outline-none focus:border focus:border-pgreen font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="text-gray-200 text-sm font-bold leading-tight tracking-normal"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Your description"
                value={formData.description}
                onChange={handleInputChange}
                className="mb-5 mt-2 p-2 bg-pgray/50 focus:outline-none focus:border focus:border-pgreen font-normal w-full h-20 text-sm border-gray-300 rounded border"
              ></textarea>
            </div>

            {/* Rating */}
            <div>
              <label
                htmlFor="rating"
                className="text-gray-200 text-sm font-bold leading-tight tracking-normal"
              >
                Rating
              </label>
              <select
                name="rating"
                id="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="mb-5 mt-2 bg-pgray/50 focus:outline-none focus:border focus:border-pgreen font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border"
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="focus:outline-none hover:bg-pgreen bg-pgreen/90 rounded text-white px-8 py-2 text-sm"
              >
                Save
              </button>
              <button
                type="reset"
                onClick={handleReset}
                className="ml-3 focus:outline-none hover:bg-gray-200 bg-pred/90 rounded text-white px-8 py-2 text-sm"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Display Saved Books */}
          <div className="mt-8">
            <h2 className="text-white text-lg font-bold">Saved Books</h2>
            <ul>
              {savedBooks.map((book, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded mb-4 shadow"
                  style={{ backgroundColor: "#dce6f0" }}
                >
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  )}
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>
                  <p>
                    <strong>Rating:</strong> {"⭐".repeat(book.rating)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Review;
