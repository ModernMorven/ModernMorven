import React,{useState,useEffect} from 'react';
import '../Filescss/Reviews.css'
import PROFILE from '../Images/dark Profile.svg';
import star0 from '../Images/star0.svg';
import star1 from '../Images/star1.svg';
import star2 from '../Images/star2.svg';
import star3 from '../Images/star3.svg';
import star4 from '../Images/star4.svg';
import star5 from '../Images/star5.svg';
function Reviews() {
  // considred that rating is feth from database and store into state

 
 useEffect(() => {
  resultreviews();
},[]);


const [message, setmessage] = useState('');
const [Review, setReview] = useState([]);
const resultreviews=async()=>{
try{
  const storedID= localStorage.getItem('token')
  const response =await fetch("http://localhost:8000/customerreviews",{
    method:"POST",
    body: JSON.stringify({"key":storedID}),
    headers:{
      "Content-Type":"application/JSON"
    }
  })
  const data=await response.json();
  if(response.ok&&!data.result){
    setReview(data)
  }
  else{
 
    setmessage("😢😢😢 No Review Yet")
  }

}catch(error){
  console.log("Error", error);
  setmessage("😢😢😢 No Review Yet")
}
}



// username
// date
// rating
// message




  return (
    <>
    {/* upper main container of reviews section  */}
    <div className="reviews-heading"><h2>Product Reviews</h2></div>
    <div className="reviews-main-container">
{message?(<><p className='errormessage text-danger my-2 mx-3 '>{message} </p></>):(<>

{Review.map((item,index)=>{
  const rating=item.rating;
  const mystar=rating >= 0 &&rating<1 ? star0 : rating >= 1&&rating<2 ? star1 : rating >= 2&&rating<3 ? star2 : rating >= 3&&rating<4 ? star3 : rating >= 4&&rating<5 ? star4 : star5
  return(<>
  
 
        {/* block 1 */}
          
          
          
            <div className="reviews-section">
                    <div className="image-name-main-div">
                                <div className="img-container">
                                  <img src={PROFILE} alt=" Reviews Profile " />
                                </div>
                                <div className="name-main-div">  <h3>{item.username}</h3></div>
                  </div>

                    <div className="date-section"> {item.date}</div>
                    <div className="rating-section">{rating} <img src={mystar} alt="rating section" /></div>
                    <div className="rating-description"><p>{item.message}</p></div>
            </div>


         

    
  
  
  </>)
})}


  </>)}



  </div>
    </>
  );
}

export default Reviews;
