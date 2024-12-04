import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const API_KEY = "AIzaSyA9x3jKOiFr9XoAi17h5_LU-T94tKtsgSs";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState("Your Name");
  const [isEditingName, setIsEditingName] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [newBookQuery, setNewBookQuery] = useState("");

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  // Fetch book details from Google Books API
  const fetchBookDetails = (query) => {
    return fetch(`${BASE_URL}${query}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const book = data.items[0].volumeInfo;
          return {
            title: book.title,
            image: book.imageLinks?.thumbnail || "https://via.placeholder.com/100",
          };
        }
        throw new Error("No books found");
      });
  };

  // Handle adding a new favorite book
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (newBookQuery.trim() === "") return;

    try {
      const bookDetails = await fetchBookDetails(newBookQuery);
      setFavoriteBooks([...favoriteBooks, bookDetails]);
      setNewBookQuery("");
    } catch (error) {
      alert("Could not find the book. Please try again!");
    }
  };

  // Handle removing a favorite book
  const handleRemoveBook = (index) => {
    setFavoriteBooks(favoriteBooks.filter((_, i) => i !== index));
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
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundColor: "#9fb4e0" }} // Light blue background
      >
        <div className="bg-pLightPurple text-white p-5 rounded-lg shadow-lg w-full max-w-md">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32">
              <label htmlFor="profilePic" className="cursor-pointer">
                <img
                  src={profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="profilePic"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>

            {/* User Name Section */}
            {isEditingName ? (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                className="text-lg font-bold text-center bg-pgray/50 focus:outline-none border rounded p-2 mt-3"
              />
            ) : (
              <h1
                className="text-xl font-bold mt-4 cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                {userName}
              </h1>
            )}
          </div>

          {/* Favorite Books Section */}
          <div>
            <h2 className="text-lg font-bold mb-3">Your Favorite Books</h2>
            <form onSubmit={handleAddBook} className="flex mb-4">
              <input
                type="text"
                placeholder="Search for a favorite book"
                value={newBookQuery}
                onChange={(e) => setNewBookQuery(e.target.value)}
                className="bg-pgray/50 focus:outline-none focus:border focus:border-pgreen font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border"
              />
              <button
                type="submit"
                className="ml-2 bg-pgreen text-white px-4 py-2 rounded hover:bg-pgreen/90"
              >
                Add
              </button>
            </form>
            <ul>
              {favoriteBooks.map((book, index) => (
                <li
                  key={index}
                  className="bg-white p-3 rounded mb-2 shadow flex items-center"
                  style={{ backgroundColor: "#dce6f0" }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <span className="text-black font-bold">{book.title}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(index)}
                    className="text-pred hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
