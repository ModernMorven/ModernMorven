import React, { useEffect, useState } from 'react';
import '../Admincss/ManageOrder.css'

import AdminNavbar from './AdminNavbar'

function ViewOrder() {
  const [message, setmessage] = useState('');
  const [product, setproduct] = useState([]);
  useEffect(() => {
    ordersdisplay();
  }, []);
  const ordersdisplay=async()=>{
    try{
    const response = await fetch('http://backendapi.modernmorven.com/api/viewall/orders');
    const data=await  response.json();
    if(response.ok && !data.result){
      setproduct(data);
    }
    else{
      console.log(data);
      setmessage("No Orders Found Yet!!");
    }
  }
  catch(error){
    console.log(error);
    setmessage("ERROR WHILE FETCHING DATA ");

  }
   

  
  }
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
            
        </div>
        {
          message?(<>
          </>):(<>
            {
        product.map((item,index)=>{
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
            {/* <div className="manage_order_sku_container"><Link to="/OrderDetails"><span className='text-primary'>More Details</span></Link></div> */}
        </div>
       
          
          </>)
        })
       }
          </>)
        }
       
       

      </div>
      </div>
      
    </>
  );
}

export default ViewOrder;
