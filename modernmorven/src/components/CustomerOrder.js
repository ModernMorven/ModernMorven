import React, { useEffect, useState } from 'react';
import '../Filescss/MainArtical.css'
import watch1 from '../Images/watch1.jpg';
import star0 from '../Images/star0.svg';
import star1 from '../Images/star1.svg';
import star2 from '../Images/star2.svg';
import star3 from '../Images/star3.svg';
import star4 from '../Images/star4.svg';
import star5 from '../Images/star5.svg';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function CustomerOrder(){
  const [message, setmessage] = useState("");
  const [DisplayCount, setDisplayCount] = useState(9);
  const [mainproduct, setmainproduct] = useState([]);
  useEffect(() => {
   
    getmainproducts();
   
  });
const getmainproducts=async()=>{
  showAds();
  try{
  const response= await fetch("http://backendapi.modernmorven.com/mainarticle");
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
    const respond= await fetch("http://backendapi.modernmorven.com/ordercount",{
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
    const respond= await fetch("http://backendapi.modernmorven.com/averagerating",{
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
const [adsimage, setadsimage] = useState([]);
const [adsmessage, setadsmessage] = useState('');
const showAds=async()=>{
  try{
    const response= await fetch("http://backendapi.modernmorven.com/api/runningads");
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





  return (
    <>
   
<Navbar/>
    <div className="body-color-container">
    <div  id="carouselExampleIndicators" className="ads-container carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    {adsimage.map((item,index)=>{
      return(<>
       <div className="carousel-item active">
      <img src={item.adsimageUrl} className="d-block w-100" alt="..."/>
    </div>
      
      </>)
    })}
   
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
{/* </div> */}


        </div>
  <div className="display-product-main-div">
 

        {/* block1 */}
  {message?(<p className="error-message text-secondary mx-3 "> {message}</p>):(<>
  
  {
    mainproduct.slice(0,DisplayCount).map((item, index)=>{
      const inputString=item.title;
      const maxWords = 20;
  const words = inputString.split(/\s+/);

  let displayString = inputString;
  if (words.length > maxWords) {
    displayString = words.slice(0, maxWords).join(' ');
  }

  const rating=item.rating;
  const mystar=rating >= 0 &&rating<1 ? star0 : rating >= 1&&rating<2 ? star1 : rating >= 2&&rating<3 ? star2 : rating >= 3&&rating<4 ? star3 : rating >= 4&&rating<5 ? star4 : star5
  
       return(
        <>
        <div className="myproduct-main-div">
          
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
                  
                  <div className="price-container">
                    {item.discountprice!==0?
                  <div className="discount-price">
                    Rs {item.discountprice}
                  </div>
                  :
                  <div className="discount-price">
                    RS {item.price}
                  </div>
                    }
                  

                  
                {item.discountprice!==0&&
                  <div className="Actual-price">
                  <p>Listed Price:</p> 
                  <div className="Actual">  
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
    </>
    
    
  );
   
}

export default CustomerOrder;

