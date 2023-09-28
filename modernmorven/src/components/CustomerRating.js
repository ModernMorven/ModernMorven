import React,{useEffect, useState}from 'react';
import '../Filescss/CustomerRating.css'

import { useNavigate } from 'react-router-dom';

const Star = ({ selected, onClick }) => (
    <i className={selected ? 'fas fa-star checked' : 'far fa-star checked'} onClick={onClick}></i>
  );


function CustomerRating() {
    const [rating, setRating] = useState(1);
    const [loader, setloader] = useState('off');
    const handleStarClick = (index) => {
      // Increment the rating when a star is clicked
      setRating(index + 1);
    };
    const customerid= JSON.parse(localStorage.getItem('user'))._id;
    const customername= JSON.parse(localStorage.getItem('user')).name;
    const orderid=localStorage.getItem('oorder');
    const productid=localStorage.getItem('token');
 const [majorlist, setmajorlist] = useState([]);
 const [feedback, setfeedback] = useState('');
 const [message, setmessage] = useState('');
 const [colour, setcolour] = useState('');
 const nevigate=useNavigate();

 useEffect(() => {
  majorDataCollect();
 });

    const majorDataCollect = async() => {
  try{

      const response = await fetch("http://127.0.0.1:8000/majorproduct",{
       method:"POST",
       body: JSON.stringify({"mykey":productid}),
       headers:{
         "Content-Type":"application/json"
       }
      })
   
     //  const data = await response.json();
     const data= await response.json();
       if (response.ok ) {
       
     setmajorlist(data);
   
     
       } else {
      
        console.log(response.status);
       }
      }
      catch(error){
        console.log(error);
      }
    
   };
   function formatDateTime(dateTime) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Karachi',
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  }

  const  navigateToSuccessPage=()=>{
    nevigate("/");
  }

   const submitFeedBack=async(e)=>{
    setloader('on')
     e.preventDefault();
    if(feedback===''){
      setloader('off')
    setmessage("Invalid credentials");
    setcolour("danger");
    
    }else{
    try{
      const currentDate= new Date();
      const formattedDateTime = formatDateTime(currentDate);

      const response = await fetch("http://backendapi.modernmorven.com/customerrating",{
        method:"POST",
        body: JSON.stringify({"orderid":orderid,
        "productid":productid,
        "userid":customerid,
        "username":customername,
        "date":formattedDateTime,
        "rating":rating,
        "message":feedback}),
        headers:{
          "Content-Type":"application/json"
        }
       })
     
      
      if(response.ok){
        setloader('off')
        setmessage("Thanks for submitting your feedback 😍😍");
        setcolour("success")
        setTimeout(() => {
          navigateToSuccessPage();
        }, 3000);
      }
    
    }
    catch(error){
      setloader('off')
      console.log(` Error ${error}`);
      setmessage("API RESPONDING ISSUE");
      setcolour("danger")
    }
  }
  // else bracket close
   }

   setTimeout(() => {
   setmessage('');
  }, 3000);

  return (
    <>

       <div className="Customer_rating_main_container">
       {message&& <div className={`alert alert-${colour}`} role="alert">
               {message}
</div>}
           <div className="CustomerRating_right_side_container">
            <div className="CustomerRating_picture_main_container">
             
                <div className="image_customer_rating">
                 {majorlist.images&&(<>
                  <img src={majorlist.images[0]} alt="Product" />
                 </>)}
                
                   </div>
                <div className="title_customer_rating">
                <span> {majorlist.title}</span>
                </div>
                
                
            </div>

            <div className="Customer_rating_container">
                <h3>Give Rating</h3>
                <div className="number_display_stars_main">
                    <h2>{rating}</h2>
                    <h3>/5</h3>
                    <div className="GiveStars">
                   


                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                        key={index}
                        selected={index < rating}
                        onClick={() => handleStarClick(index)}
                        />
                    ))}
                 
                  
                    </div>
                </div>
            </div>
           </div>



           <div className="CustomerRating_left_side_container">
                <div className="writeArea">
                    <label htmlFor="textarea">Share Your Experience</label>
                    <textarea  id="textarea"  cols="30" rows="10" value={feedback} onChange={(e)=>{setfeedback(e.target.value)}}></textarea>
                    {message&&(<><p className="error-message text-danger mx-3 "> {message}</p></>)}
                </div>
                <div className="CustomerratingButton">
                    <button type="submit" onClick={submitFeedBack}>{loader==='off'?(<>Submit</>):(<>
                      <span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                       <span role="status" className='text-light'>Processing...</span>
                    </>)}</button>
                </div>

           </div>
       </div>
    </>
  );
}

export default CustomerRating;
