import React,{useEffect, useState}from 'react';
import '../Filescss/MajorProduct.css'
import smalladdtocart from '../Images/smalladdtocart.svg';
import ordernow from '../Images/ordernow.svg';
import star0 from '../Images/star0.svg';
import star1 from '../Images/star1.svg';
import star2 from '../Images/star2.svg';
import star3 from '../Images/star3.svg';
import star4 from '../Images/star4.svg';
import star5 from '../Images/star5.svg';
import Reviews from './Reviews'
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate} from 'react-router-dom';




function MajorProduct() {
//  const { id } = useParams();

const [alertColor, setalertColor] = useState('');
const [alertmsg, setalertmsg] = useState('');
const [order, setorder] = useState(0);
const [Numrating, setNumrating] = useState(0);
const ItemId= localStorage.getItem('token');
const [mystar, setmystar] = useState(star5);

useEffect(() => {
  findtotalorders();
  findtotalrating();
  majorDataCollect();
  
 
});

const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
 const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // Add a resize event listener to update the windowWidth state
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

const [majorlist, setmajorlist] = useState([])


const majorDataCollect = async() => {


   const response = await fetch("https://backendapi.modernmorven.com/majorproduct",{
    method:"POST",
    body: JSON.stringify({"mykey":ItemId}),
    headers:{
      "Content-Type":"application/json"
    }
   })

  //  const data = await response.json();
    
    if (response) {
    
  const data= await response.json();
  setmajorlist(data)
  
    } else {
  
     console.log(response.status);
    }
 
};


const verification= localStorage.getItem('user');

  const nevigate_order=useNavigate();

 const functOrder=()=>{
  let hasMissingFields = false;

  // Check each section for missing fields
  sections.forEach((section) => {
    if (!section.variant || !section.size || !section.quantity) {
      hasMissingFields = true;
    }
  });

  if (hasMissingFields) {
   
    setCheckMessage("Please fill in all fields for each section.");
  } else if (totalQuantity <= 0) {
    setCheckMessage("Please select a valid quantity.");
  } else if (totalQuantity > 5) {
    setCheckMessage("Purchase items must be less than 6.");
  } else {
    setCheckMessage('');
    localStorage.setItem("quanta",JSON.stringify(sections));
    nevigate_order("/OrderNow")
  }
  };
 

  
 




 const [sections, setSections] = useState([
  { variant: '', size: '', quantity: '' },
 ]);
 const [quantity, setQuantity] = useState('');
 const [selectedVariant, setSelectedVariant] = useState('');
 const [selectedSize, setSelectedSize] = useState('');
 const [checkMessage, setCheckMessage] = useState('');
 const maxSections = 3;


 const handleAddSection = () => {
   if (sections.length < maxSections) {
     const newSection = {
       variant: selectedVariant,
       size: selectedSize,
       quantity: quantity,
     };

     setSections([...sections, newSection]);
     setSelectedVariant('');
     setSelectedSize('');
     setQuantity('');
     setCheckMessage('');
   } else {
     setCheckMessage('You can only add up to 3 sections.');
   }
 };

 const handleRemoveSection = (index) => {
   const updatedSections = [...sections];
   updatedSections.splice(index, 1);
   setSections(updatedSections);
 };

//localStorage.removeItem('token');
//console.log(id)

const calculateTotalQuantity = () => {
  let total = 0;
  sections.forEach((section) => {
    if (section.quantity) {
      total += parseInt(section.quantity);
    }
  });
  return total;
};

const totalQuantity = calculateTotalQuantity();

const [indeximage, setindeximage] = useState(0);



const ADDtoCart=async()=>{

  
  if(!verification){
  setalertmsg("Please Login First");
  setalertColor("danger")
  }
  else{
       try{
                const storedUser = JSON.parse(localStorage.getItem('user'))._id;

              if(totalQuantity===0||totalQuantity>6){
                setalertmsg(`Please Select a valid Quantity`);
                setalertColor("danger");
              }else{
                      const resp= await fetch('https://backendapi.modernmorven.com/customercart',{
                        method:"post",
                        body: JSON.stringify({"customerid":storedUser,
                                              "productid":majorlist._id,
                                              "producttitle":majorlist.title,
                                              "productpicture":majorlist.images[0],
                                              "productprice":majorlist.price,
                                              "productquantity":totalQuantity,
                                            }),
                          headers:{
                          "Content-Type":"application/json"
                        }
                      })
                    
                      if(resp.ok){
                        const data= await resp.json();

                        alert(`${data.message}`);
                        setalertColor("success")
                      }
                      else{
                        setalertmsg(`Cannot resolve Error😢😢😢😢😢😢`);
                        setalertColor("danger")
                      }
                
                   }
        }
        catch(error){
       console.log(` errre ${error}`)
       setalertmsg(`Fail to Load Resources`);
        setalertColor("warning")
      }
      

      }

}

const findtotalorders=async()=>{
 

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
      setorder(data);
    }

  }
  catch(error){
    console.log(error);
  }
}
const findtotalrating=async()=>{
 
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
     
      setNumrating(data);

      const rating=String(data);
      setmystar(rating >= 0 &&rating<1 ? star0 : rating >= 1&&rating<2 ? star1 : rating >= 2&&rating<3 ? star2 : rating >= 3&&rating<4 ? star3 : rating >= 4&&rating<5 ? star4 : star5)
      
      
    }

  }
  catch(error){
    console.log(error);
  }
}


setTimeout(() => {
  
  setalertmsg('')
 }, 6000);
setTimeout(() => {
  setCheckMessage('');

 }, 6000);

  return (
    <>
    <Navbar/>
    {/* <Navbar/> */}
    <div className="mainbody">

      <div className="product-main-div">
        {/* to handle picture of product */}
        <div className="picture-handle-main-div">
            <div className="picture-container">
                <div className="picture-iconhandler">
                    <div className="main-image">
                      {majorlist.videourl?(<>

                      <div id="carouselExampleDark" className="carousel carousel-dark slide">
                        {windowWidth>=800&&(<>
                          <div className="carousel-indicators">
                          <button type="reset" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                          <button type="reset" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                          
                        </div>
                        </>)}
                      
                        <div className="carousel-inner">
                        <div className="carousel-item active " data-bs-interval="2000">
                          <video src={majorlist.videourl} controls></video>
                            {/* <img src="..." className="d-flex w-100 position-relative" alt="... hello world"/> */}
                          </div>
                          <div className="carousel-item " data-bs-interval="2000">
                          
                            <img src={majorlist.images[indeximage]} alt="" />
                          
                          </div>
                        
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                      </>):(<>
                      
                        {majorlist.images && majorlist.images.length > 0? (<>
                      <img src={majorlist.images[indeximage]} alt="" />
                    </>
                
                      ) : (
                        <><p>No images available</p></>
                      )}
                      
                      </>)}
                    
                        
                    </div>
                </div>
                <div className="small-picture-icon-main-container">
                 {/* images catch from database container */}
                 {/* block 1 */}
                 
                 {majorlist.images && majorlist.images.map((item, index) => (
                  <div className="small-image-container" key={index} onClick={()=>{setindeximage(index)}} >
                      <img  src={item} alt='No preview' />
                  </div>
                ))}
                        {/* <div className="small-image-container" >
                        <img src={smallimage} alt=" image name"  onClick={imagenevigate}/>
                       
                        </div> */}



                </div>
            </div>
        </div>
       
        {/*Text section main div  */}
        <div className="text-section-main-div">
   
            {/* back container of text side  same as picture container that why picture class will use  */}
        <div className="pictureII-container">
               <div className="tiltle-container">
                     <p>{majorlist.title} </p>
               </div>
               {/* MainArtical Product price and rating is use in this section  */}
               <div className="major-product-rating-main-container">
                {Numrating&&(<>
                  <div className="major-product-number-rating">{Numrating}</div>
                </>)}
                
                  <div className="major-product-pic-rating"><img src={mystar} alt="Rating" /></div>
                  <div className="major-product-reviews">({order})</div>
                  
                </div>

               <div className="major-product-price-container">
                  <div className="major-product-discount-price">
                    {majorlist.discountprice !==0 ?(<>Rs {majorlist.discountprice}</>):(<> Rs {majorlist.price}</>)}
                 
                  </div>
                  <div className="major-product-Actual-price-ptag">
                  {majorlist.discountprice!==0&&(<><p>Listed Price:</p> 
                  <div className="major-product-Actual">  
                   Rs {majorlist.price}
                   </div></>)  }
                  
                 
                  </div>

              </div>
              {/* ******END  MainArtical Product price and rating is use in this section */}

              <div className="product-status-main-container">
                        <div className="delivery-time-container"> 
                                {/* for display left side text  */}
                                <div className="product_status_main_container_left_side_container"> 
                                <p>Delivery Time</p>  
                                <p>Availability  </p> 
                                <p>Brand </p>  
                                
                            </div>

                            {/* for display right side text  */}
                                <div className="product_status_main_container_right_side_container">
                                    <p>2 to 3 working Days</p>
                                    <h5 className={majorlist.availability ? "text-success" : "text-danger"}>
                                     {majorlist.availability ? "In Stock" : "Not Available"}
                                      </h5>
                                    <p className='text-secondary my-3'> {majorlist.brandname}</p> 
                                    
                                    
                                </div>
                    {/* close delivery-time-container */}
                        </div>
                        {/* close  product-status-main-container */}
               


                 {/* making a form to store the quantity of the product in ADD to cart Section  */}
                 <div className="major-product-main-button-container">
                  
                    {/* {checkmessage&&(<p className='errormessage text-danger '>{checkmessage}</p>)} */}
                 

                    <div>
      <table className="table">
        <tbody>
          {sections.map((section, index) => (
            <tr key={index}>
              <td className='text-danger'>
                <select
                  name=""
                  id=""
                  value={section.variant}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[index].variant = e.target.value;
                    setSections(updatedSections);
                  }}
                >
                  <option value="" className='tableitem'>Variant</option>
                  {majorlist.varient &&
                    majorlist.varient.map((item, idx) => (
                      <option className='tableitem' key={idx} value={item} required>
                        {item}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                <select
                  name="cars"
                  id="cars"
                  value={section.size}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[index].size = e.target.value;
                    setSections(updatedSections);
                  }}
                >
                  <option value="" className='tableitem'>Size</option>
                  {majorlist.sizes &&
                    majorlist.sizes.map((size, idx) => (
                      <option  className='tableitem' key={idx} value={size} required>
                        {size}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="internal_input_quantity"
                  name=""
                  id=""
                  placeholder="Quantity"
                  value={section.quantity}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[index].quantity = e.target.value;
                    setSections(updatedSections);
                  }}
                  required
                />
                {checkMessage  && (
                  <p className='errormessage text-danger '>{checkMessage}</p>
                )}
              </td>
             

           {sections.length >= 0  && (
            <>
              {index >= 0 && (
                <td className='text-primary pt-4' onClick={handleAddSection}>
                  ADD
                </td>
              )}
            </>
          )}

           {sections.length > 0 && (
            <>
              {index > 0 && (
                <td className='text-danger pt-4' onClick={() => handleRemoveSection(index)}>
                  Remove
                </td>
              )}
            </>
          )}
             

            </tr>
          ))}
        </tbody>
      </table>
    
    </div>


                                        
                   

                     {/*  For Now this container will not use  this container is create for order now button when i was create a form  */}
                     {/* <div className="button_container_order_now"></div> */}
                       
             {windowWidth>=900?(<>
             {/* ORDER NOW BUTTON  */}
             <div className="button_container_submit_addtocart">
                 <button  onClick={ADDtoCart}><div className="btn_image_add_to_cart"><img src={smalladdtocart} alt="" /></div>ADD TO CART </button>
                {majorlist.availability &&  <button onClick={functOrder} >ORDER NOW <div className="btn-image"><img src={ordernow} alt="" /></div></button> }
                   
                    </div>
             
             </>):(<>
            
              {/* ORDER NOW BUTTON  */}
                <div className="button_container_submit_addtocart_min">
                  <button  onClick={ADDtoCart}><div className="btn_image_add_to_cart"><img src={smalladdtocart} alt="" /></div>ADD TO CART </button>
                {majorlist.availability &&  <button className='button_container_order_now_min' onClick={functOrder} >ORDER NOW <div className="btn-image_min"><img src={ordernow} alt="" /></div></button> }
                   
                    </div>

             
             </>)}

                   {alertmsg &&< div className={`alert alert-${alertColor} w-50 my-3`} role="alert">
                   { alertmsg}
                </ div>}

                 
                   </div>
            {/* close button-container */}
                 

             {/* close product-status-main-container */}
             </div>




         {/*  picture-container*/}
        </div>
        </div>

       
      </div>
      
       {/* MainArticle css closing 
 ******************************************************************************************************** 

 ProductDescription Container Start  */}
 
 {/* <div className="description_main_div_min">
      
      <div className="left_description_min">
            <div className="product_description_min">
                    <h4>Product Description</h4>
                    <h5>Technical Details</h5>
                  <p>{majorlist.discription}</p>
                  
            </div>
            <div className="What-inside-box_min">
            <h4>what's inside the box</h4>
            <p>{majorlist.insidebox} </p>
            </div>
      </div>


      <div className="right_description_min">
         <div className="warrenty_policy_min">
         <h4>Warrenty Policy</h4>
         <p>{majorlist.warrenty}</p>
         </div>

      </div>

     </div> */}
     
    

   {windowWidth>=900?(<>
    <div className="product-description-main-div">
      
      <div className="left-side-div-product-description">
            <div className="product-description">
                    <h4>Product Description</h4>
                    <h5>Technical Details</h5>
                  <p>{majorlist.discription}</p>
                  
            </div>
            <div className="What-inside-box">
            <h4>what's inside the box</h4>
            <p>{majorlist.insidebox} </p>
            </div>
      </div>


      <div className="right-side-div-product-description">
         <div className="warrenty-policy-main-container">
         <h4>Warrenty Policy</h4>
         <p>{majorlist.warrenty}</p>
         </div>

      </div>

     </div>
     
   </>):(<>
  
    <div className="description_main_div_min">
      
      <div className="left_description_min">
            <div className="product_description_min">
                    <h4>Product Description</h4>
                    <h5>Technical Details</h5>
                  <p>{majorlist.discription}</p>
                  
            </div>
            <div className="What-inside-box_min">
            <h4>what's inside the box</h4>
            <p>{majorlist.insidebox} </p>
            </div>
      </div>


      <div className="right_description_min">
         <div className="warrenty_policy_min">
         <h4>Warrenty Policy</h4>
         <p>{majorlist.warrenty}</p>
         </div>

      </div>

     </div>

     
     
     </>)}
    
     </div>
     <Reviews/>
     <Footer/>

    </>
  );
}

export default MajorProduct;
