import React,{useState} from "react";
import '../Filescss/ProductRating.css'

const ProductRating = () => {
  const [rating, setRating] = useState(1);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
     <div className="productrating_main_container">
      <i className="star "></i>
    
     </div>



    </>
  );
};

export default ProductRating;