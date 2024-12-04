import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import sampleImage from './Assets/fox.png'; // Fallback image

const Card = ({ info, title, authors, image, description }) => {
  const navigate = useNavigate();

  const bookImage = image || sampleImage; // Use the book's image if available, otherwise fallback to sampleImage

  // Handle click to navigate to the Review page
  const handleCardClick = () => {
    navigate('/review', { 
      state: { 
        title, 
        author: authors ? authors[0] : "Unknown", // Pass the first author if available
        image // Pass the image URL
      } 
    });
  };
  return (
    <div className="book" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img src={bookImage} alt={title} className="poster" />
      <div className="book-details">
        <div className="box">
          <h4 className="title">{title || "No Title Available"}</h4>
          <p className="authors">
            {authors ? authors.join(", ") : "Unknown Author"}
          </p>
        </div>
        <div className="overview">
          <h1>Overview</h1>
          <p>{description || "No description available"}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
