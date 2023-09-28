import React,{useEffect, useState} from 'react';
import '../Admincss/AddProduct.css'
import AdminNavbar from './AdminNavbar';



function ProductEdit() {
const storedid= localStorage.getItem("producttoken");
    //to store varients of product
    const [inputCount, setinputCount] = useState(1);
 const [inputCountsizes, setinputCountsizes] = useState(1);
    const [myVarients, setMyVarients] = useState(Array(inputCount).fill(''));
const [productsizes, setproductsizes] = useState(Array(inputCountsizes).fill(''));

    const [formData, setFormData] = useState({
      _id: '',
      title: '',
      price: 0,
      discountprice: 0,
      brandname: '',
      availability: true,
      lastupdate: new Date(),
      discription: '',
      warrenty: '',
      insidebox: '',
      deliverycharges: 0,
    });
    useEffect(() => {
      //fetching data from database
      fetchdata();
    },[]);
const [displayimages,setdisplayimages]=useState([]);
const [displayvideo, setdisplayvideo] = useState('');
    const fetchdata=async()=>{
      try {
        const response=await fetch("http://localhost:8000/api/draft/search",{
          method:"post",
          body:JSON.stringify({"key":storedid}),
          headers:{
            "Content-Type":"application/json"}
        })
        const data= await response.json();
        if(response.ok &&!data.message){
          console.log(data)
          if (data._id) {
            setFormData({
              _id: data._id,
              title: data.title || '',
              price:  data.price || 0,
              discountprice: data.discountprice || 0,
              brandname: data.brandname || '',
              discription: data.discription||'',
              warrenty:data.warrenty|| '',
              insidebox: data.insidebox||'',
              deliverycharges: data.deliverycharges||'',
            });
            if (Array.isArray(data.varient)) {
              setinputCount(data.varient.length);
              setMyVarients(data.varient);
            }
          
            if (Array.isArray(data.sizes)) {
              setinputCountsizes(data.sizes.length)
              setproductsizes(data.sizes);
            }
            setdisplayimages(data.images)
            setdisplayvideo(data.videourl)
      
          }
        }
        else{
          setalertmessage(data.message);
          setalertcolour("danger");
        }
      } catch (error) {
        setalertmessage(error);
        setalertcolour("danger");
      }
    }
    


    

   
     





   
 
// block 1 image 1 
const [selectedUrls, setSelectedUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([
    "", "", "", "", "", "",""
]);

  
  const handleFileChange = (event, index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = event.target.files[0];
 
    setSelectedFiles(newSelectedFiles);

    const reader = new FileReader();
     reader.onload = (e) => {
    const newSelectedUrls = [...selectedUrls];
    newSelectedUrls[index] = e.target.result;
    setSelectedUrls(newSelectedUrls);
    let findempty = selectedFiles.indexOf("");
    while (findempty !== -1) {
      selectedFiles.splice(findempty, 1);
      findempty = selectedFiles.indexOf("");
    }
    
 
  };

  reader.readAsDataURL(event.target.files[0]);
  };
 

  // console.log(selectedFiles)

  const imagechanger1 = (index) => {
    return {
      backgroundImage: selectedUrls[index] ? `url(${selectedUrls[index]})` : 'none',
     
    };
  };
  const imagechanger2 = (index) => {
    return {
      backgroundImage: selectedUrls[index] ? `url(${selectedUrls[index]})` : 'none',
     
    };
  };
  const imagechanger3 = (index) => {
    return {
      backgroundImage: selectedUrls[index] ? `url(${selectedUrls[index]})` : 'none',
     
    };
  };
  const imagechanger4 = (index) => {
    return {
      backgroundImage: selectedUrls[index] ? `url(${selectedUrls[index]})` : 'none',
     
    };
  };
  const imagechanger5 = (index) => {
    return {
      backgroundImage: selectedUrls[index] ? `url(${selectedUrls[index]})` : 'none',
     
    };
  };
  const imagechanger6 = (index) => {
    return {
      backgroundImage: selectedUrls[index] ? `url(${selectedUrls[index]})` : 'none',
     
    };
  };




  const handlechangevarient=(event)=>{
    const{value}=event.target;
    setinputCount(Number(value));
  }
  const varientHandle = (index, value) => {
    const updatedVarients = [...myVarients];
    updatedVarients[index] = value;
    setMyVarients(updatedVarients);
  };

 

  const handlesizeChange=(event)=>{
    const{value}=event.target;
    setinputCountsizes(Number(value));
  }
  const sizesHandle = (index, value) => {
    const updatedVarients = [...productsizes];
    updatedVarients[index] = value;
    setproductsizes(updatedVarients);
   
  };

  function formatDateTime(dateTime) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Karachi',
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  }
 
// ********************************************************

// handleUpload
// videoURLAPI

//***************************************************** */
  const inputTags = Array(inputCount).fill(null).map((_, index) => (
    <input className="dynamic-inputs"type="text" placeholder="varients" key={index}  onChange={(e) => varientHandle(index, e.target.value)} value={myVarients[index]} required/>
  ));
  const sizeinputTag = Array(inputCountsizes).fill(null).map((_, index) => (
    <input   className="dynamic-inputs" type="text"  placeholder="Sizes"  key={index}  value={productsizes[index]}  onChange={(e) => sizesHandle(index, e.target.value)} required/>
  ));
  const [status, setstatus] = useState("LIVE");
  //  Save the But But not Show on  Main Article 
  const saveDraft=()=>{
    setstatus("DRAFT")
if(status==="DRAFT"){
  handleSubmission();
}
else{
  alert("Status ERROR")
}

  
  }

    // ***********************************************************************************************************************************
    const [alertmessage, setalertmessage] = useState('')
const [alertcolour, setalertcolour] = useState("success");
const handleSubmission = async (e) => {
  e.preventDefault();
  try {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    const ProductForm = new FormData();
    ProductForm.append("_id", formData._id);
    ProductForm.append("title", formData.title);
    ProductForm.append("price", formData.price);
    ProductForm.append("discountprice", formData.discountprice);
    ProductForm.append("brandname", formData.brandname);
    ProductForm.append("status", status);
    ProductForm.append("availability", true);
    ProductForm.append("lastupdate", formattedDateTime);
    ProductForm.append("discription", formData.discription);
    ProductForm.append("warrenty", formData.warrenty);
    ProductForm.append("insidebox", formData.insidebox);
    ProductForm.append("varient", myVarients);
    ProductForm.append("sizes", productsizes);

    for (let i = 0; i < selectedFiles.length; i++) {
      ProductForm.append("images", selectedFiles[i]);
    }
    ProductForm.append("deliverycharges", formData.deliverycharges);
    console.log(ProductForm)
    const addproduct = await fetch("http://localhost:8000/api/draft/Edit", {
      method: "POST",
      body: ProductForm,
    });
    const productdata = await addproduct.json();
    if (addproduct.ok &&productdata.success) {
     
        setalertmessage("Upload Successfully 😍😍😍😍😍😍");
        setalertcolour("success");
      }
     else {
      setalertmessage(productdata.message);
      setalertcolour("danger");
    }
  } catch (error) {
    setalertmessage(error.message || "An error occurred. Please try again.");
    setalertcolour("danger");
  }
};

  const handleimagesdelete=async(index)=>{
   console.log("hello")
    try {
      const response=await fetch("http://localhost:8000/api/edit/product/delete/images",{
        method:"post",
        body:JSON.stringify({"key":formData._id,"index":index}),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data=await response.json();
      if(response&&!data.message){
        setalertmessage("delete image successfully");
        setalertcolour("success")
      }
      else{
        setalertmessage(data.message);
        setalertcolour("danger")
      }
    } catch (error) {
      setalertmessage(error);
      setalertcolour("danger")
    }

  }
  const handlevideodelete=async(index)=>{
   console.log("hello")
    try {
      const response=await fetch("http://localhost:8000/api/edit/product/delete/videourl",{
        method:"post",
        body:JSON.stringify({"key":formData._id}),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data=await response.json();
      if(response&&!data.message){
        setalertmessage("Delete video successfully");
        setalertcolour("success")
      }
      else{
        setalertmessage(data.message);
        setalertcolour("danger")
      }
    } catch (error) {
      setalertmessage(error);
      setalertcolour("danger")
    }

  }


  return (
    <>
    <AdminNavbar/>
      <div className="addproduct-maincontainer" >
        {alertmessage&&
      <div className={`alert alert-${alertcolour}`}  style={{display:"flex",justifyContent:"space-between"}}role="alert">
            <strong> {alertmessage} </strong>
     
             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

       </div>
        }
        <h1>Edit Your Product</h1>
          <form className="add_product_form" onSubmit={handleSubmission} >
            <p>Minimum 3 Pictures upload</p>
         <div className="imageuplaording-section">
                <div className="admin-sidemainimages "  >
                {displayimages[0]?(<>
                <img className='display_uploard_image1' src={displayimages[0]} style={{maxHeight:"90%"}}  alt="" />
                <label htmlFor="display_uploard_image1" className='text-danger mx-3' onClick={()=>{handleimagesdelete(0)}}>delete</label>
                </>):(<>
                  <div className="display_uploard_image1" style={imagechanger1(0)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 0)} />
                 
                
                </>)}
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
                {displayimages[1]?(<>
                <img className='display_uploard_image1' src={displayimages[1]} style={{maxHeight:"90%"}} alt="" />
                <label htmlFor="display_uploard_image1" className='text-danger mx-3' onClick={()=>{handleimagesdelete(1)}}>delete</label>
                </>):(<>
                  <div className="display_uploard_image1" style={imagechanger2(1)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 1)} />
              
                </>)}


             
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
             

                {displayimages[2]?(<>
                <img className='display_uploard_image1' src={displayimages[2]} style={{maxHeight:"90%"}} alt="" />
                <label htmlFor="display_uploard_image1" className='text-danger mx-3' onClick={()=>{handleimagesdelete(2)}}>delete</label>
                </>):(<>
                  <div className="display_uploard_image1" style={imagechanger3(2)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 2)} />
              
                </>)}
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
              
                {displayimages[3]?(<>
                <img className='display_uploard_image1' src={displayimages[3]} style={{maxHeight:"90%"}} alt="" />
                <label htmlFor="display_uploard_image1" className='text-danger mx-3'onClick={()=>{handleimagesdelete(2)}}>delete</label>
                </>):(<>
                  <div className="display_uploard_image1" style={imagechanger4(3)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 3)} />
              
                </>)}
              
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
               
                {displayimages[4]?(<>
                <img className='display_uploard_image1'  src={displayimages[4]} style={{maxHeight:"90%"}} alt="" />
                <label htmlFor="display_uploard_image1" className='text-danger mx-3' onClick={()=>{handleimagesdelete(4)}}>delete</label>
                </>):(<>
                  <div className="display_uploard_image1" style={imagechanger5(4)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 4)} />
              
                </>)}
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
               
                {displayimages[5]?(<>
                <img className='display_uploard_image1' src={displayimages[5]} alt="" />
                <label htmlFor="display_uploard_image1" className='text-danger mx-3' onClick={()=>{handleimagesdelete(5)}}>delete</label>
                </>):(<>
                  <div className="display_uploard_image1" style={imagechanger6(5)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 5)} />
              
                </>)}
              
              
              
                 {/* admin-sidemainimages */}
                </div>
              
       
          



         </div>
         <div className="video-section">
          {displayvideo?(<>
          <video src={displayvideo}  className='container w-100 h-100' controls ></video>
          <label htmlFor="display_uploard_image1" className='text-danger mx-3' onClick={handlevideodelete}>delete</label>
          </>):(<>
            <h5 className="adjusth4">Upload Video</h5>
            <input type="file" accept="video/*"  onChange={(event) => handleFileChange(event, 6)} ></input>
            {selectedFiles[6] &&(
                <video className='container w-100 h-100' src={URL.createObjectURL(selectedFiles[6])}  controls /> 
                
            )}
          
          </>)}
          
         </div>
         <div className="written_container " >
            <h4 className="adjusth4">Product Title</h4>
             <input type="text" placeholder="Write a Product Title here" value={formData.title} className="adjustinput" onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,title:e.target.value}))}} required />
          </div>
          <div className="skucontainer">
            <h4 className="adjusth4"htmlFor="">SKU Number(Stock Keeping Unit)</h4>
            <label htmlFor="adjustinput " className='text-danger'>Cannot Edit Product SKU </label>
            <input className="adjustinput"  type="text" value={formData._id} placeholder='SKU must be unique' disabled/>
          </div>
          <div className="add-product-price_container">
                <div className="addproduct-major-price">
                    <h5 className='adjusth4'>Product Price</h5>
                    <input className="adjustinput"type="number" value={formData.price} placeholder='Enter price of product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,price:e.target.value}))}} required/>
                </div>
                        <div className="addproduct-discount-price">
                        <h5 className='adjusth4'>Discount Price</h5>
                        <input  className="adjustinput" type="number"value={formData.discountprice} placeholder='Enter discount price of product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,discountprice:e.target.value}))}}/>
                        </div>
                        <div className="addproduct-discount-price">
                        <h5 className='adjusth4'>Delivery Charges</h5>
                        <input  className="adjustinput" type="number" value={formData.deliverycharges} placeholder='Enter delivery charges' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,deliverycharges:e.target.value}))}} required/>
                        </div>
                        
          </div>

          <div className="brand-varients_main_container">
                <div className="brand-container">
                    <h5 className='adjusth4'>Brand Name:</h5>
                    <input className='adjustinput'  value={formData.brandname} placeholder='Write Brand Name' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,brandname:e.target.value}))}} required />
                </div>
                <div className="varients-container">
                    <h5>Varients:</h5>
                    <input type="number" min={1} max={6} placeholder="No of varients" onChange={handlechangevarient}/>
                    
                    {inputTags}
                  
                    {/* <button onClick={AddMoreInputs}>Add More</button>
                    <button onClick={RemoveInputs}>Add More</button> */}
                </div>
                

          </div>

          <div className="sizes_container_add_product" >
          <div className="sizes-container">
                    <h5> Product Sizes:</h5>
                    <input type="number" min={1} max={6} placeholder="No of Sizes" onChange={handlesizeChange}/>
                    
                    {sizeinputTag}
                   
                </div> 
         </div>
          <div className="upper-container-product_description_warrenty">
                <div className="add_product_detail_description">
                    <h3 >Product Description</h3>
                    <textarea rows="25" cols="38" value={formData.discription} placeholder="please provide complete detail about product"  onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,discription:e.target.value}))}} required/>
                </div>
                <div className="warrenty_policy_container">
                    <h3  htmlFor="">Warrenty Policy:</h3>
                    <textarea rows="12" placeholder='Write warrenty policy of the product' value={formData.warrenty} onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,warrenty:e.target.value}))}} required >hello</textarea>
                </div>
          {/* close upper-container-product_description_warrenty */}
          </div>
          <div className="what-inside-box">
            <h3>What inside box?</h3>
            <input className="adjustinput"type="text" value={formData.insidebox} placeholder='1 x item 2 x item ' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,insidebox:e.target.value}))}} required  />
          </div>
          <div className="submitoptions">
          <button type='reset'onClick={saveDraft}>Save</button>
       
            <button type='submit' >Save and Live</button>
          </div>


          </form>
           
             
              
          </div>
    </>
  );
}

export default ProductEdit;
