import React, { useState } from 'react';

const Star = ({ selected, onClick }) => (
  <span onClick={onClick}>{selected ? '★' : '☆'}</span>
);

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    // Increment the rating when a star is clicked
    setRating(index + 1);
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          selected={index < rating}
          onClick={() => handleStarClick(index)}
        />
      ))}
      <p>Current Rating: {rating}</p>
    </div>
  );
};

export default StarRating;
