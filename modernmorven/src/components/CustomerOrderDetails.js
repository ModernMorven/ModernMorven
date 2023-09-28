import React, { useState, useEffect } from 'react';
import '../Admincss/OrderDetails.css';

import Navbar from './Navbar';




function copyToClipboard(text) {
   
    navigator.clipboard.writeText(text);
    alert("Tracking Id Copied")
  
  }


function CustomerOrderDetails() {

    // for Show Or Hide Button 
  
  
   const [product, setproduct] = useState([]);
   const [message, setmessage] = useState('');
    const [OrderCancleReason, setOrderCancleReason] = useState('');
    const [OrderCancleMessage, setOrderCancleMessage] = useState('');
    const [colour, setcolour] = useState('');

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
     }, []);





    useEffect(() => {
      detailhistory();
      
    }, []);
        

    const [cancleOrder, setcancleOrder] = useState(false);
    const cancleOrderreason=()=>{
        setcancleOrder(true);
    }
   
    const currentDate = new Date();
 
    const myvarible=`return valid ${currentDate.toLocaleDateString()}`;
   
const detailhistory=async()=>{
  try{
    const storedKey= localStorage.getItem('oorder');
const response= await fetch("http://backendapi.modernmorven.com/detailorderhistory",{
  method:"POST",
  body: JSON.stringify({"key": storedKey}),
  headers:{
    "Content-Type":"application/json"
  }
})
if(response.ok){
  const result= await response.json();
  setproduct(result);
  
}
  }
  catch(error){
    setmessage("Error occur try again");
  }
}
const handleOrderCancle=async()=>{
  try{
 const response= await fetch("http://backendapi.modernmorven.com/orderCancelReason",{
  method:"POST",
  body: JSON.stringify({
    "key": product._id,
    "orderstatus": "canceled",
     "ordercancleby":"Customer",
     "orderCancelReason": OrderCancleReason
  }),
  headers:{
    "Content-Type":"application/json"
  }
 })
 const data = await response.json();
 if(response.ok &&!data.result){
  console.log(data)
  setOrderCancleMessage("Order has been Cancle Successfully");
  setcolour('success');
 }
 else{
  console.log(data)
  setOrderCancleMessage("ERROR FOUND");
  setcolour('danger');
 }
  }
  catch(error){
    setOrderCancleMessage("ERROR While Uploarding");
    setcolour('danger');
  }
}
setTimeout(() => {
  setOrderCancleMessage("")
}, 3000);
let totalQuantity=0
  return (
    <>
    <Navbar/>
   
    
    <div className="order_details-main_container">
    {OrderCancleMessage&&(<>
  <div className={`alert alert-${colour}`} role="alert">
              {OrderCancleMessage}
            </div>
</>)}
    {message?(<>
    </>):(<>
 

  
  <div className="right_side_container">
             <div className="order_details_picture_container">  <img src={product.productpicture} alt="" /></div>
              {windowWidth>=700&&(<>
              
                {cancleOrder&&(
              <div className="cancleorder_box">
                <form action="" onSubmit={handleOrderCancle}>
              <span className='text-danger'>Please write a reason to cancle Order</span>
              <textarea className="" placeholder="Write a reason "   cols="50" rows="14" id="floatingTextarea" onChange={(e)=>{setOrderCancleReason(e.target.value)}}></textarea>
              <button type='submit'>SUBMIT</button>
              </form>
             </div>

             )} 
              </>)}
           
         </div>

         <div className="left_side_container">
           <div className="inner_data_container_product_title">
            <strong>Product Name :</strong>
            <span > {product.productname}</span>
    
           </div>
           
                    
           
           <div className="inner_data_table_container">
           
     <table className="table bg-light">
  <thead>
    <tr>
      
      <th scope="col">Varients</th>
      <th scope="col">Size</th>
      <th scope="col">Quantity</th>
     
    </tr>
  </thead>
  <tbody>
                                            {/* Map through the quantity array */}
                                            {product.quantity&&(<>
                                              {product.quantity.map((quantityItem, quantityIndex) => {
                                                totalQuantity += quantityItem.quantity;
                                                return(<>
                                                <tr key={quantityIndex}>
                                                    <td key="mm">{quantityItem.variant}</td>
                                                    <td key="wmm">{quantityItem.size}</td>
                                                    <td key="mmk">{quantityItem.quantity}</td>
                                                </tr>
                                               </>)}
                  
                                            )}

                                           </>)}
                                         {/* closing {product.quantity&&(<> */}
                                            <tr>
                                                <td><strong>Total Quantity</strong></td>
                                              <td> <strong>{totalQuantity} </strong> </td> 
                                            </tr>
                                        </tbody>
</table>

             
    
           </div>
        
           
           <div className="inner_data_container">
            <strong>Reciver Name :</strong>
            <span> {product.recivername}</span>
    
           </div>
           
           
           <div className="inner_data_container">
            <strong>Reciver Conatact Number:</strong>
            <span> {product.recivercontact}</span>
    
           </div>
           <div className="inner_data_container">
            <strong>City:</strong>
            <span> {product.recivercity}</span>
    
           </div>
           
           <div className="inner_data_container">
            <strong>Address :</strong>
            <span> {product.address}</span>
    
           </div>

           <div className="inner_data_container">
            <strong>Order ID :</strong>
            <span> {product._id}</span>
    
           </div>
           
           
           <div className="inner_data_container">
            <strong>Order Date :</strong>
            <span> {product.orderdate}</span>
    
           </div>
          
           <div className="inner_data_container ">
            <strong>Payment status :</strong>
            {/* Online Pay */}
            <span className='text-success'> {product.paymentmethod}</span>
    
           </div>
           
           
           <div className="inner_data_container">
            <strong>Total Charges :</strong>
            <span> Rs  {product.totalcharges} -/ </span>
    
           </div>
           
         
           <div className="inner_data_container" id='trackingid'>
           {product.trackingid&&(<><strong>Tracking Id #:</strong>
            <span>{product.trackingid}</span>
         
          <button onClick={() => copyToClipboard(product.trackingId)} aria-label="Copy to Clipboard" data-balloon-pos="up" className=" btn-clipboard bg-light border-0 m-2">
          <i className="fa  fa-copy " aria-hidden="true" title='Copy tracking Id'></i>
          </button>
          </>)}
            
    
           </div>
           {product.ordercancleby&&(<>
           <span className='text-danger m-3 '>Order Cancel by {product.ordercancleby} </span>
           <strong >Reason :</strong>
            <textarea  cols="50" rows="5" className='border-danger' style={{ resize: "none"}}  disabled>{product.Ordercanclereason}</textarea>

           
           </>)}
          {product.orderstatus==="Processing" &&(<div className="actionButtons">
           <button type='reset' className="btn btn-danger " onClick={cancleOrderreason}> Cancle Order </button>
          
            </div>)} 


         </div>

   
      </>)}
        {/*closing message   */}
        
        {windowWidth<700&&(<>
              
              {cancleOrder&&(
            <div className="cancleorder_box">
              <form action="" onSubmit={handleOrderCancle}>
            <span className='text-danger'>Please write a reason to cancle Order</span>
            <textarea className="" placeholder="Write a reason "   cols="50" rows="14" id="floatingTextarea" onChange={(e)=>{setOrderCancleReason(e.target.value)}}></textarea>
            <button type='submit'>SUBMIT</button>
            </form>
           </div>

           )} 
            </>)}

      </div>


    </>
  );
}

export default CustomerOrderDetails;






 




