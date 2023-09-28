import React, { useEffect, useState } from 'react';
import '../Admincss/ManageOrder.css'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom';

function ManageOrder() {
  const [message, setmessage] = useState('');
  const [Orderlist, setOrderlist] = useState([]);
  const [check, setcheck] = useState('Processing');
  // useEffect(() => {
  //    showorderList();
  // }, []);
  const showorderList=async(token)=>{
    try{
      const response=await fetch('http://backendapi.modernmorven.com/api/v2/orders',{
        method:"post",
        body:JSON.stringify({"key":token}),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data= await response.json();
      if(response.ok&&!data.result){
        setOrderlist(data)
        
      }
      else{
        setmessage("No data found😢😢")
      }
    }
    catch(error){
    console.log(error);
    setmessage("ERROR IN API TRY AGAIN ");
    }


  }
 
console.log( Orderlist)
  return (
    <>
      <AdminNavbar/>
      <div className="manage_order_main_container">
        <h3 className=' my-3 mx-3 text-secondary '>Order's Details</h3>
      <div className="manage_order_table_container">
        <div className="heading_order_manage_container">
            <div className="seq">   <strong>#</strong> </div>
            <div className="manage_order_picture_container"><strong>Image</strong></div>
            <div className="manage_order_sku_container"><strong>SKU Number</strong></div>
            <div className="manage_order_ProductTitle"><strong>Product Title</strong></div>
            <div className="manage_order_sku_container"><strong>Order ID</strong></div>
            <div className="manage_order_sku_container"><strong>Order Date</strong></div>
            <div className="manage_order_sku_container"><strong> Order Status</strong></div>
            <div className="manage_order_sku_container"><strong>Actions</strong></div>
        </div>
        <div className="sortdata my-1">
          <div className="btn btn-outline-warning p-1 " > <button  onClick={()=>{  showorderList("Processing")}}>Pending Orders</button> </div>
          <div className="btn btn-outline-success p-1" ><button onClick={()=>{  showorderList("on the way")}} >On the way</button> </div>
          <div className="btn btn-outline-danger p-1"> <button  onClick={()=>{  showorderList("canceled")}}>Canceled Orders</button></div>
        </div>
       {message?(<> <p className="error-message text-secondary mx-3 ">{message}</p>
       </>):(<>
       {
        // mapping 
        Orderlist.map((item,index)=>{
          const colour= item.orderstatus==='Processing'?"warning" :item.orderstatus==='on the way'?"secondary":item.orderstatus==='delivered'?"success":"danger"
          return(<>
          <div className="data_order_manage_container">

                  <div className="seq">   <span>{index+1}</span> </div>
                  <div className="manage_order_picture_container"><img src={item.productpicture} alt="" /></div>
                  <div className="manage_order_sku_container"><span>{item.productid}</span></div>
                  <div className="manage_order_ProductTitle"><span></span>{item.productname}</div>
                  <div className="manage_order_sku_container"><span>{item._id}</span></div>
                  <div className="manage_order_sku_container"><span>{item.orderdate}</span></div>
                  <div className="manage_order_sku_container"><span className={`text-${colour}`}>{item.orderstatus}</span></div>
                  <div className="manage_order_sku_container"><Link to="/OrderDetails"><span className='text-primary' onClick={()=>{localStorage.setItem("AdminPas",item._id)}}>More Details</span></Link></div>

         </div>

          </>)
        })
       }
       
        
       </>)}
       
       

      </div>
      </div>
    </>
  );
}

export default ManageOrder;
