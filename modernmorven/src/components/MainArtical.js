
import React, {useEffect, useState } from 'react';
import '../Filescss/MainArtical.css'
import star0 from '../Images/star0.svg';
import star1 from '../Images/star1.svg';
import star2 from '../Images/star2.svg';
import star3 from '../Images/star3.svg';
import star4 from '../Images/star4.svg';
import star5 from '../Images/star5.svg';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function MainArtical(){
  const [message, setmessage] = useState("");
  const [DisplayCount, setDisplayCount] = useState(9);
  const [mainproduct, setmainproduct] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [adsimage, setadsimage] = useState([]);
const [adsmessage, setadsmessage] = useState('');
const [loader, setloader] = useState('on');
 
  useEffect(() => {
   
    getmainproducts();
    showAds();
  },[])
  
const getmainproducts=async()=>{

  try{
  const response= await fetch("https://backendapi.modernmorven.com/mainarticle");
  const data= await response.json();
  if (response.ok && !data.result) {
    // Map over the data array and fetch total orders and rating for each item
    const productsWithOrdersAndRatings = await Promise.all(
      data.map(async (item) => {
        const totalOrders = await findtotalorders(item._id);
        const rating = await findtotalrating(item._id);
        return {
          ...item,
          totalorders: totalOrders,
          rating: rating,
        };
      })
    );
    setmainproduct(productsWithOrdersAndRatings);
    setloader("off")
  }
  else{
    setmessage("No Item Found")
  }
}catch(error){
  setmessage(`ERROR Please Reload the page`);
}

}
const loadMore=()=>{
  setDisplayCount(DisplayCount+9)
}
const findtotalorders=async(ItemId)=>{
 
  try{
    const respond= await fetch("https://backendapi.modernmorven.com/ordercount",{
      method:"post",
      body: JSON.stringify({"key":ItemId}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(respond.ok){
      const data= await respond.text();
      return String(data);
    }

  }
  catch(error){
    console.log(error);
  }
}
const findtotalrating=async(ItemId)=>{
 
  try{
    const respond= await fetch("https://backendapi.modernmorven.com/averagerating",{
      method:"post",
      body: JSON.stringify({"key":ItemId}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(respond.ok){
      const data= await respond.text();
      return String(data);
    }

  }
  catch(error){
    console.log(error);
  }
}

// AdsManagement Pannel

const showAds=async()=>{
  try{
    const response= await fetch("https://backendapi.modernmorven.com/api/runningads");
    const data= await response.json();
    if(response.ok &&!data.result)
    {
      setadsimage(data);
    }
    else{
      setadsmessage("Error Reload page please");
    
    }

  }
  catch(error){
    console.log(error);
    setadsmessage("Error Reload Page please");
  
  }
}

setTimeout(() => {
  handleSlideChange();
}, 10000);
   
  




  // Function to update the active slide index
  const handleSlideChange = () => {
    const nextIndex = (activeSlideIndex + 1) % adsimage.length;
    setActiveSlideIndex(nextIndex);
  };

 

  return (
    <>
   

{loader==="off"?(<>
  <Navbar/>
  <div className="body-color-container">
      {adsmessage?(<>
        <div   className="ads-container">{message}</div>
      </>):(<>
      

        <div id="carouselExampleIndicators" className=" ads-container carousel slide carousel-fade">
  <div className="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
  {adsimage.map((item,index)=>{
    return(<>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index+1} aria-label={`Slide ${index+1}`} ></button>
    </>)
    
  })}
   
  
    
   
  </div>
  <div className="carousel-inner">
    {adsimage.map((item,index)=>{
     
     
      return(<>
       <div
      className={`carousel-item ${index === activeSlideIndex ? 'active' : ''}`}
      // key={index}
    >
      <img
        src={item.adsimageUrl}
        className="d-block w-100"
        alt="No image Preview"
      />
    </div>

       
    </>)
    })}

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

</div>










      </>)}
  
  <div className="display-product-main-div">
 

        {/* block1 */}
  {message?(<p className="error-message text-secondary mx-3 "> {message}</p>):(<>
  
  {
    mainproduct.slice(0,DisplayCount).map((item, index)=>{
      const inputString=item.title;
      const maxWords = 12;
  const words = inputString.split(/\s+/);

  let displayString = inputString;
  if (words.length > maxWords) {
    displayString = words.slice(0, maxWords).join(' ');
    displayString= displayString +'....'
  }

  const rating=item.rating;
  const mystar=rating >= 0 &&rating<1 ? star0 : rating >= 1&&rating<2 ? star1 : rating >= 2&&rating<3 ? star2 : rating >= 3&&rating<4 ? star3 : rating >= 4&&rating<5 ? star4 : star5
  
       return(
        <>
        <div key={item._id} className="myproduct-main-div">
          
          <div className="product-image">
            <img src={item.images[0]} alt="product image" />
          </div>
         <div className="productmain-title">
                <div className="producttitle">
                  {/* maximum allow 14 characters must  */}
                  
                <Link  to="/MajorProduct" onClick={()=>{localStorage.setItem('token',item._id)}}>
                    <p>{displayString}</p> 
                    {/* <p>{item.title}</p>  */}
                    </Link>
                 
                </div>
                  
                  <div className="main_articleprice-container">
                    {item.discountprice!==0?
                  <div className="main_discount-price">
                    Rs {item.discountprice}
                  </div>
                  :
                  <div className="main_discount-price">
                    RS {item.price}
                  </div>
                    }
                  

                  
                {item.discountprice!==0&&
                  <div className="main_Actual-price">
                  <p>Listed Price:</p> 
                  <div className="main_Actual">  
                   Rs {item.price}
                   </div>
                 
                  </div>
                   }
              </div>
              <div className="rating-main-container">
                  <div className="number-rating">{item.rating}</div>
                  <div className="pic-rating"><img src={mystar} alt="Rating" /></div>
                  
                  <div className="reviews">  ({item.totalorders})</div>
                  
              </div>
         </div>
         {/* end div myproduct-main-div */}
         </div>
        </>
       )

    })
  }


  </>)}
       

  {/* upper main div closing */}
   </div> 
    {/* button loard more option */}
        <div className="div-more-display">
   {mainproduct.length>DisplayCount &&(
    <button  className="more-display-btn"  onClick={loadMore}> Load More</button>
   )}
    
    </div>
    {/* closing Body-color-container */}
    </div>

    <Footer/>
</>):(<>

    <div className="text-center loaderclass">
   
<div className=" spinner-grow " style={{ backgroundColor:"#110A2E",width: "1rem", height: "1rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  
<div className=" spinner-grow " style={{ backgroundColor:"#FFBD59",width: "1rem", height: "1rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  
<div className=" spinner-grow " style={{ backgroundColor:"#110A2E",width: "1rem", height: "1rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<span className="text-secondary mx-2 ">Loading...</span>
</div>
</>)}

   
    </>
    
    
  );
   
}

export default MainArtical;

