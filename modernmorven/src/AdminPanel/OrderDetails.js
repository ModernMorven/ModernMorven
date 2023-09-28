import React, { useState, useEffect } from 'react';
import '../Admincss/OrderDetails.css'

import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

function OrderDetails() {
  const orderId=localStorage.getItem("AdminPas");
  const [trackingId, settrackingId] = useState('');
  const [trackingcheck, settrackingcheck] = useState(false);
  const invoice=useNavigate();
    const [cancleOrder, setcancleOrder] = useState(false);
    const [product, setproduct] = useState([]);
    const [message, setmessage] = useState('');
     const [OrderCancleReason, setOrderCancleReason] = useState('');
     const [OrderCancleMessage, setOrderCancleMessage] = useState('');
     const [colour, setcolour] = useState('danger');
     useEffect(() => {
       detailhistory();
       
     }, []);
     const cancleOrderreason=()=>{
      setcancleOrder(true);
  }
    const printpagehandle=()=>{
     
     invoice("/OrderInvoice")

    }

    
  
        
    const currentDate = new Date();
 
    const myvarible=`return valid ${currentDate.toLocaleDateString()}`;
   
const detailhistory=async()=>{
  try{
   
const response= await fetch("http://localhost:8000/detailorderhistory",{
  method:"POST",
  body: JSON.stringify({"key": orderId}),
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
 const response= await fetch("http://localhost:8000/orderCancelReason",{
  method:"POST",
  body: JSON.stringify({
    "key": product._id,
    "orderstatus": "canceled",
     "ordercancleby":"Admin",
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
const handleaddtracking=async()=>{
  try{
 const response= await fetch("http://localhost:8000/orderTracking",{
  method:"POST",
  body: JSON.stringify({
    "key": product._id,
    "orderstatus": "on the way",
    "ordertracking": trackingId,
  }),
  headers:{
    "Content-Type":"application/json"
  }
 })
 const data = await response.json();
 if(response.ok &&!data.result){
  console.log(data)
  setOrderCancleMessage("Tracking ID has been Cancle Successfully");
  setcolour('success');
 }
 else{
  console.log(data)
  setOrderCancleMessage("ERROR FOUND");
  setcolour('danger');
 }
  }
  catch(error){
    setOrderCancleMessage("ERROR While Uploarding Tracking Id");
    setcolour('danger');
  }
}

const markasdelivered=async()=>{
  try{
    const response= await fetch("http://localhost:8000/orderdelivered",{
     method:"POST",
     body: JSON.stringify({
       "key": product._id,
       "orderstatus": "delivered",
    
     }),
     headers:{
       "Content-Type":"application/json"
     }
    })
    const data = await response.json();
    if(response.ok &&!data.result){
     console.log(data)
     setOrderCancleMessage("Order Status Update to delivered  Successfully");
     setcolour('success');
    }
    else{
     console.log(data)
     setOrderCancleMessage(" Order Status Update to delivered   ERROR FOUND");
     setcolour('danger');
    }
     }
     catch(error){
       setOrderCancleMessage("ERROR While Uploarding Order Status ");
       setcolour('danger');
     }

}
setTimeout(() => {
  setOrderCancleMessage("")
}, 3000);
let totalQuantity=0


   
 
    return (
    <>
      <AdminNavbar/>
      {OrderCancleMessage&&(<>
  <div className={`alert alert-${colour}`} role="alert">
              {OrderCancleMessage}
            </div>
</>)}
      <div className="order_details-main_container">
      {message?(<>
      <p className='errormessage text-secondary'>{message}</p>
      </>):(<>
      
      
        <div className="right_side_container">
             <div className="order_details_picture_container">  <img src={product.productpicture} alt="" /></div>
              
             {cancleOrder&&(
              <div className="cancleorder_box">
                <form action="" onSubmit={handleOrderCancle}>
              <span className='text-danger'>Please write a reason to cancle Order</span>
              <textarea className="" placeholder="Write a reason "   cols="50" rows="14" id="floatingTextarea" onChange={(e)=>{setOrderCancleReason(e.target.value)}}></textarea>
              <button type='submit'>SUBMIT</button>
              </form>
             </div>

             )} 
         </div>



         <div className="left_side_container">
          {/* to update the status of order on the way===> delivered */}
  { product.orderstatus==="on the way"&&(<>
         <div class="form-check form-switch my-1">
  <input class="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={markasdelivered}/>
  <label class="form-check-label text-success text-bold " for="flexSwitchCheckDefault">Mark as delivered</label>
</div>
   </> )
  }
         
           <div className="inner_data_container">
            <strong>Product Name :</strong>
            <span> {product.productname}</span>
    
           </div>
           
           
           <div className="inner_data_container">
            <strong>SKU Number  :</strong>
            <span> {product.productid}</span>
    
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
                                               <strong>{totalQuantity}</strong>
                                            </tr>
                                        </tbody>
</table>

             
    
           </div>
        
           
           <div className="inner_data_container">
            <strong>Customer Name :</strong>
            <span> {product.recivername}</span>
    
           </div>
           
           
           <div className="inner_data_container">
            <strong>Customer Conatact Number:</strong>
            <span>{product.recivercontact}</span>
    
           </div>
           <div className="inner_data_container">
            <strong>City:</strong>
            <span> {product.recivercity}</span>
    
           </div>
           <div className="inner_data_container">
            <strong>Address :</strong>
            <span>{product.address}</span>
    
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
            <span className='text-success'> {product.paymentmethod}</span>
    
           </div>
           
           
           <div className="inner_data_container">
            <strong>Total Charges :</strong>
            <h5> Rs  {product.totalcharges} -/ </h5>
    
           </div>
           {product.ordercancleby?(<>
            <span className='text-danger'>Order Cancel by {product.ordercancleby} </span>
           <strong >Reason :</strong>
            <textarea  cols="50" rows="5" className='border-danger' style={{ resize: "none"}}  disabled>{product.Ordercanclereason}</textarea>
           
           </>):(<>
           
           
            {product.trackingid&&trackingcheck===false?(<div  style={{ width:"100%",display: "flex", flexDirection: "row" ,justifyContent:"space-around",alignItems:"center"  }}> <div className="inner_data_container"><strong>Tracking Id #:</strong><span>{product.trackingid}</span><button style={{backgroundColor:"transparent" ,border:"hidden",marginLeft:"10px"}}><div className="fa fa-edit text-primary " onClick={()=>{settrackingcheck(true)}}>Edit</div></button></div> </div>):(<>
           
           <form className="trackingform" onSubmit={handleaddtracking}>
          <div className="inner_data_container">
           <strong>Tracking Id #:</strong>
           <input type="text"className="form-control" placeholder='Please Enter Tracking Id of Current Order ' onChange={(e)=>{settrackingId(e.target.value)}} required />
   
          </div>
          
          <div className="actionButtons">
          
          
           <button type="submit" className="btn btn-warning ">Proceed</button>
          </div>
          </form>
          
          </>)}
         
          <div className="actionButtons">
           {product.orderstatus!="delivered" &&(<>
            <button className="btn btn-danger " onClick={cancleOrderreason}> Cancel Order </button>
           <button className="btn btn-primary  " onClick={printpagehandle}> Generate Invoice </button>
           </>)}
          
           
           </div>

           
           </>)}


         </div>
      
      </>)}
        

      </div>



      

    </>
  );
}

export default OrderDetails;





