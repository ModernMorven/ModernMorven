
import React,{useState ,useEffect} from 'react';
import '../Admincss/ManageProduct.css'
import Admin from '../Images/dark Profile.svg'
import AdminNavbar from './AdminNavbar'
function ManageProduct() {
     const [message, setmessage] = useState('');
     const [checkmessage, setcheckmessage] = useState('');
     const [colour, setcolour] = useState('');
     const [products,setProducts]= useState([]);
     const [deleteid, setdeleteid] = useState();
     useEffect(() => {
       getproducts();
     },[]);
 const getproducts=async()=>{
     try{
   const response = await fetch("http://localhost:8000/manageproduct");
   const data= await response.json();
   if(response.ok &&!data.result ){
      setProducts(data);
       console.log( data)
   }
   else{
     
     setmessage(" 😢😢 OOPS!!!! NO DATA FOUND");
   }
     }catch(error){
          setmessage(`ERROR ${error}`);
     }
   
 }
 const handlecheckavailability=async(status,ProductID)=>{
try{
  const response=await fetch("http://localhost:8000/updateavailability",{
    method:"POST",
    body:JSON.stringify({"key":ProductID,"status":status}),
    headers:{
      "Content-Type":"application/json"
    }
  })
  const data= await response.json();
if(response.ok&& !data.result){
  setcheckmessage("Update Successfully");
setcolour("success");
console.log(data)
}
else
{
  setcheckmessage("ERROR while Updating");
setcolour("danger");
console.log(data.result);

}
}catch(error){
  console.log(error);
setcheckmessage("UNKNOWN ERROR");
setcolour("danger");
}
 }
 const handlecheckStatus=async(status,ProductID)=>{
try{
  const response=await fetch("http://localhost:8000/updateStatus",{
    method:"POST",
    body:JSON.stringify({"key":ProductID,"status":status}),
    headers:{
      "Content-Type":"application/json"
    }
  })
  const data= await response.json();
if(response.ok&& !data.result){
  setcheckmessage("Update Successfully");
setcolour("success");
console.log(data)
}
else
{
  setcheckmessage("ERROR while Updating");
setcolour("danger");
console.log(data.result);

}
}catch(error){
  console.log(error);
setcheckmessage("UNKNOWN ERROR");
setcolour("danger");
}
 }
 const handleProductDelete=async()=>{
  console.log(deleteid)
try{
  if(!deleteid){
    setcheckmessage("Cannot Resolve ERROR ");
    setcolour("danger");
  }
  else{
    const response=await fetch("http://localhost:8000/deleteProduct",{
      method:"POST",
      body:JSON.stringify({"key":deleteid}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data= await response.json();
  if(response.ok&& !data.result){
    setcheckmessage("Delete Successfully");
  setcolour("success");
  
  }
  else
  {
    setcheckmessage("ERROR while Deleting");
  setcolour("danger");
  console.log(data.result);
  
  }
  }
  // deleteid else close
  
}catch(error){
  console.log(error);
setcheckmessage("UNKNOWN ERROR");
setcolour("danger");
}
 }



 setTimeout(() => {
  setcheckmessage("");
 }, 3000);
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
        <span>Status</span>
        <span>Availability</span>
        <span>Actions</span>
       </div>
      {message ?( <p className="error-message text-secondary mx-3 ">{message}</p>):(<>
        {checkmessage&& <div className={`alert alert-${colour}`} role="alert">
               {checkmessage}
</div>}

        {
          products.map((item,index)=>{
       
          const mycolor = item.status === "LIVE" ? "success" : "danger";
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
               {/* <span>{item.images[0]}</span> */}
             
              <img src={item.images[0]} alt="" />
              {/* <img src="/ProductData/image-1691983499600-131023356.jpg" alt="" /> */}

             
             
          </div>
           <div className="skunumber-container">
              <h4>{item._id}</h4> 
              <p>{displayString}</p>
             <h6>Rs {item.price}</h6>
           </div>
           <div className="product-status ">
              <button className={`btn btn-${mycolor} active statusBtn w-100`} >{item.status}</button>
           </div>
           <div className="ManageProduct_availibility">
                 <button className="btn btn-light border-secondary dropdown-toggle my-3 w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 {item.availability===true?(<>In Stock</>):(<>Not Availible</>)}
                              </button>
                              <ul className="dropdown-menu ">
                              {item.availability!==true?(<><li><button className="dropdown-item text-success" onClick={() => handlecheckavailability(true, item._id)} >In Stock</button></li></>):
                              (<>  <li><button className="dropdown-item text-danger" onClick={() => handlecheckavailability(false, item._id)}>Not Availible</button></li></>)}
                                </ul>
            </div>
            <div className="action_container">
            <button className="btn btn-light border-secondary dropdown-toggle my-3 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   More Action
                              </button>
                              <ul className="dropdown-menu ">
                                {item.status==="LIVE"?(<>
                                  <li><button className="dropdown-item btn btn-outline-warning text-primary" onClick={() => handlecheckStatus("inactive", item._id)} >Disable</button></li>
                                </>):(<>
                                  <li><button className="dropdown-item btn btn-outline-success text-primary" onClick={() => handlecheckStatus("live", item._id)}>Enable</button></li>
                                </>)}
                                  <li><button className="dropdown-item btn btn-outline-danger text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setdeleteid(item._id)}} >Delete</button></li>


                                




                              </ul>
            </div>

     </div>
                    </>
                    )
          })
        }
 {/* closing bracketof message  */}
</> )}











         {/* manage-product-main-container */}
      </div>
{/* Modal for delete Product  */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Warning</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div class="modal-body">
                                            Are you sure want to delete product 
                                          </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancle</button>
                                            <button type="button" class="btn btn-success"  data-bs-dismiss="modal" onClick={handleProductDelete}>Yes Sure</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>



    </>
  );
}

export default ManageProduct;
