import React, { useEffect, useState } from 'react';
import '../Admincss/ManageProduct.css'
import Admin from '../Images/dark Profile.svg'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom';
function ViewProduct() {
  const [message, setmessage] = useState();
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getallproduct();
  });
  
  const getallproduct=async()=>{
    try{
      const response= await fetch("https://backendapi.modernmorven.com/manageproduct")
      const data= await response.json();
      if(response.ok && !data.result ){
               setproducts(data);
      }
      else{
        setmessage("😢😢 NO DATA FOUND ")
      }
      
    }
    catch(error){
      setmessage(`ERROR FOUND ${error}`);
    }
  }
  return (
    <>
       <AdminNavbar/>
      <div className="manage-product-main-container">
       <div className="heading_setting">
        <span>#</span>
        <span>Picture</span>
        <span>SKU Number</span>
        <span className='productsetting'>Product Title</span>
        <span className='pricesetting'>Price</span>
        <span className='pricesetting'>Status</span>
        <span className='pricesetting'>Last Update</span>
        <span>Actions</span>
       </div>
      
      
       {message?(<p className="error-message text-secondary mx-3 "> {message}</p>):(<>
       
       {
        products.map((item,index)=>{
          const colour= item.status==="LIVE"? "success": "danger"
          const inputString=item.title;
          const maxWords = 12;
      const words = inputString.split(/\s+/);
    
      let displayString = inputString;
      if (words.length > maxWords) {
        displayString = words.slice(0, maxWords).join(' ');
        displayString= displayString +'....'
      }
          return(
            <>
            <div className="manage_product_heading-container">
            <div className="manage_product_sequence_container">
                      <h5>{index+1}</h5>
            </div>
            <div className="manage_product_picture_container">
                <img src={item.images[0]} alt="" />
            </div>
             <div className="skunumber-container">
                <h4>{item._id}</h4> 
                <p>{displayString }</p>
               <h6>Rs {item.price}</h6>
               <div className="productdiscount-available">
               
               <span className={`text-${colour}`}>{item.status}</span>
               </div>
              
               <span>{item.lastupdate}</span>
             </div>
             <div className="product-status " >
             <p><Link to="/ProductEdit" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={()=>{localStorage.setItem("producttoken",item._id)}}>Edit</Link></p>
             </div>
            

       </div>

            </>
          )
           
        })
       }
       
       </>)}

  {/* manage-product-main-container */}
  </div>
    </>
  );
}

export default ViewProduct;
