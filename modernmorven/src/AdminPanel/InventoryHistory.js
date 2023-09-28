
import React, { useEffect, useState } from 'react';
import '../Admincss/OrderDetails.css'
import '../Admincss/InventoryHistory.css'
import AdminNavbar from './AdminNavbar';


function InventoryHistory() {
  const [message, setmessage] = useState('');
  const [Inventory, setInventory] = useState([]);
  useEffect(() => {
    showInventory();
    
  },[]);
  const showInventory=async()=>{
    try{
  const response= await fetch("https://backendapi.modernmorven.com/showInventory");
  const data= await response.json();
  if(response.ok&&!data.result){
    setInventory(data);
  }
  else{
    setmessage("NO DATA FOUND")
  }
    }
    catch(error){
      console.log(error);
      setmessage("ERROR WHILE FETCHING");
    }
  }

  return (
    <>
      <AdminNavbar/>
    <div className="InventoryHistory-main_container">
      <h1>Inventory History</h1>


        {/* Block   ***************************************************** */}
{message?(<><p className='error-message text-secondary'>{message}</p></>):(<>

  {

Inventory.map((item,index)=>{
  return(<>
  
  <div className="main_upper_container_repeater">
        <div className="left_side_container">
              {/* images container right side */}
            <div className="InventoryHistory_pic_container">
            {item.images&&(<>
            {item.images.map((listedimages,listedindex)=>{
              return(<>
<div className="InventoryHistory_picture_container">  <img key={listedindex} src={listedimages} alt="" /></div>
              </>)
            })}
            
            </>)}
               
    
            
              {/* InventoryHistory_pic_container */}
            </div>

            <div className="inner_data_container">
                <strong>Inventory title :</strong>
                <span> {item.inventorytitle}</span>
        
              </div>
              
              
              <div className="inner_data_container">
                <strong>Product title :</strong>
                <span> Rs {item.producttitle}</span>
              </div>
              
              <div className="inner_data_container">
                <strong>Product Price :</strong>
                <span> Rs {item.productprice}</span>
              </div>
              
              <div className="inner_data_container">
                <strong>Total Items :</strong>
                <span> Rs {item.totalitems}</span>
              </div>
              
              
              <div className="inner_data_container">
                  
                     {/* Map through the quantity array */}
                                      <strong>Varients :</strong>
                                         {item.varient&&(<>
                                            {item.varient.map((quantityItem, quantityIndex) => {
                                              return(<>
                                                  <span key={quantityIndex}>{quantityItem},</span>
                                             </>)}
                
                                          )}

                                         </>)}
                                       {/* closing {product.quantity&&(<> */}
                      
                  </div>
              <div className="inner_data_container">
                  
                     {/* Map through the quantity array */}
                                      <strong>sizes :</strong>
                                         {item.sizes&&(<>
                                            {item.sizes.map((quantityItem, quantityIndex) => {
                                              return(<>
                                                  <span key={quantityIndex}>{quantityItem}</span>
                                             </>)}
                
                                          )}

                                         </>)}
                                       {/* closing {product.quantity&&(<> */}
                      
                  </div>
                  
                        <div className="inner_data_container">
                          <strong>uploading Date :</strong>
                          <span>{item.lastupdate}</span>
                  
                        </div>
                        
                        <div className="inner_data_container">
                          <strong>Total Cost:</strong>
                          <h5> Rs {item.grandtotal} -/ </h5>
                  
                        </div>
                        <div className="inner_data_container">
                          <strong>Shipment Cost:</strong>
                          <h5> Rs {item.shipmentcost} -/ </h5>
                  
                        </div>
                        <div className="inner_data_container">
                          <strong>Others:</strong>
                          <h5>  {item.otherinfo}  </h5>
                  
                        </div>
               {/* inner_data_table_container */}
             </div>
    
      {/*close main_upper_container_repeater */}
      </div>
  
  
  </>)
})
}

</>)}



     {/* close order_details-main_container */}
    </div>


    </>
  );
}

export default InventoryHistory;








 
 


  

      

  





