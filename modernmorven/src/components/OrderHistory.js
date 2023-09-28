import React,{useState,useEffect} from 'react';
import '../Admincss/ManageOrder.css'

import Navbar from './Navbar'
import { Link} from 'react-router-dom';



function OrderHistory() {
const [loader, setloader] = useState('off');
 const [message, setmessage] = useState('');
 const [history, sethistory] = useState([]);
 const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
 const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    OrderHistory();
    // Add a resize event listener to update the windowWidth state
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 //const [colour, setcolour] = useState("dark");
   



const OrderHistory=async()=>{
  setloader('on')
  const storedUser = JSON.parse(localStorage.getItem('user'))._id;
  try{
    
    const response= await fetch("https://backendapi.modernmorven.com/orderhistory",{
      method:"POST",
      body:JSON.stringify({"key":storedUser}),
      headers:{
        "Content-Type":"application/JSON"
      }
    })

    const data= await response.json();

    if (response.ok && !data.result) {
      // Map over the data array and fetch total orders and rating for each item
      const productsWithOrdersAndRatings = await Promise.all(
        data.map(async(item,index) => {
        const rating = await findFeedBack(item._id);
          
          return {
            ...item,
            rating: rating,
          };
        })
      );
      setloader("off");
      sethistory(productsWithOrdersAndRatings);
      
    
    }
    else{
      setloader("off");
      setmessage("No Data Found😢😢😢");
    }

  }
  catch(error){
    setloader("off");
    setmessage("No Data Found😢😢😢");
  }
}
const findFeedBack=async(orderID)=>{
  
  try{
  
    const response= await fetch("https://backendapi.modernmorven.com/customerCheckFeedback",{
      method:"POST",
      body: JSON.stringify({"key":orderID}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data= await response.text();
    if(response.ok&&!data.result){
     
      return String(data);
    }
  
    return String(true);

  }catch(error){
    console.log('Error in finding Feedback', error);
  }
  }




  return (
    <>
     <Navbar/>
    {loader==='off'?(<>
      
    {
      windowWidth>=700?(<>
       <div className="manage_order_main_container">
      <h3 className=' my-3 mx-3 text-secondary '>Order's Details</h3>
    <div className="manage_order_table_container">
      <div className="heading_order_manage_container">
          <div className="seq">   <strong>#</strong> </div>
          <div className="manage_order_picture_container"><strong>Image</strong></div>
         
          <div className="manage_order_ProductTitle"><strong>Product Title</strong></div>
          <div className="manage_order_sku_container"><strong>Order ID</strong></div>
          {windowWidth>=850&&(<>
            <div className="manage_order_sku_container"><strong>Order Date</strong></div>
          </>)}
         
          <div className="manage_order_sku_container"><strong> Order Status</strong></div>
          <div className="manage_order_sku_container"><strong>Details</strong></div>
      </div>
      {message?(<>
        <p className="error-message text-secondary mx-3 "> {message}</p>
      
      </>):(<>
      {history.map((item,index)=>{
       const colour= item.orderstatus==='Processing'?"warning" :item.orderstatus==='on the way'?"secondary":item.orderstatus==='delivered'?"success":"danger"
       
       return(<>
       
       <div className="data_order_manage_container">
          <div className="seq">   <span>{index+1}</span> </div>
          <div className="manage_order_picture_container"><img src={item.productpicture} alt="" /></div>
         
          <div className="manage_order_ProductTitle"><span>{item.productname}</span></div>
          <div className="manage_order_sku_container"><span>{item._id}</span></div>
          {windowWidth>=850&&(<>
            <div className="manage_order_sku_container"><span>{item.orderdate}</span></div>
          </>)}
         
         
          <div className="manage_order_sku_container"><span className={`text-${colour}`}>{item.orderstatus}</span></div>
          
    { 
      item.orderstatus==="delivered"&& item.rating!=="true" ?(<>
                <div className="manage_order_sku_container"><Link to="/CustomerRating" onClick={()=>{localStorage.setItem("token",item.productid);localStorage.setItem("oorder",item._id) }}><button className='btn btn-success'>Give Feedback</button></Link></div>
      </>):(<>
        <div className="manage_order_sku_container"><Link to="/CustomerOrderDetails" onClick={()=>{localStorage.setItem("oorder",item._id) }}><span className='text-primary'>More Details</span></Link></div>
      </>)
    }




     
      </div>
      
       
       </>)
      })}
       
      </>)}
     
     
     

    </div>
    </div>
      
      </>):(<>
      


        <div className="manage_order_main_container">
      <h3 className=' my-3 mx-3 text-secondary '>Order's Details</h3>
    <div className="manage_order_table_container">
      <div className="heading_order_manage_container">
          <div className="seq">   <strong>#</strong> </div>
          <div className="manage_order_picture_container"><strong>Image</strong></div>
         
          <div className="manage_order_ProductTitle"><strong>Product Title</strong></div>
          <div className="manage_order_sku_container"><strong> Order Status</strong></div>
          <div className="manage_order_sku_container"><strong>Details</strong></div>
      </div>
      {message?(<>
        <p className="error-message text-secondary mx-3 "> {message}</p>
      
      </>):(<>
      {history.map((item,index)=>{
       const colour= item.orderstatus==='Processing'?"warning" :item.orderstatus==='on the way'?"secondary":item.orderstatus==='delivered'?"success":"danger"
       
       return(<>
       
       <div className="data_order_manage_container">
          <div className="seq">   <span>{index+1}</span> </div>
          <div className="manage_order_picture_container"><img src={item.productpicture} alt="" /></div>
         
          <div className="manage_order_ProductTitle "><span>{item.productname}</span></div>
         
          <div className="manage_order_sku_container"><span className={`text-${colour}`}>{item.orderstatus}</span></div>
          
    { 
      item.orderstatus==="delivered"&& item.rating!=="true" ?(<>
                <div className="manage_order_sku_container"><Link to="/CustomerRating" onClick={()=>{localStorage.setItem("token",item.productid);localStorage.setItem("oorder",item._id) }}><span className='bg-success w-50 h-50 text-light'>Give Feedback</span></Link></div>
      </>):(<>
        <div className="manage_order_sku_container"><Link to="/CustomerOrderDetails" onClick={()=>{localStorage.setItem("oorder",item._id) }}><span className='text-primary'>More Details</span></Link></div>
      </>)
    }




     
      </div>
      
       
       </>)
      })}
       
      </>)}
     
     
     

    </div>
    </div>



      </>)
    }
      </>):(<>
      
        <div className="text-center loaderclass">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
    
  </div>
  <span className="mx-2">Loading...</span>
</div>
      </>)
     } 
   
   
  </>
  );
}

export default OrderHistory;





