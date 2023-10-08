import React,{useState} from 'react';
import '../Admincss/AddProduct.css'
import AdminNavbar from './AdminNavbar';



function AddInventory() {

    //to store varients of product
    const [formData, setFormData] = useState({
      Inventorytitle: '',
      producttitle: '',
      productprice: 0,
      GrandTotal: 0,
      brandname: '',
      totalitems:0,
      Otherinfo: '',
      shipmentcharges: 0,
    });

   
 
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

const [inputCount, setinputCount] = useState(1);
const [myVarients, setMyVarients] = useState(Array(inputCount).fill(''));

  const handlechangevarient=(event)=>{
    const{value}=event.target;
    setinputCount(Number(value));
  }
  const varientHandle = (index, value) => {
    const updatedVarients = [...myVarients];
    updatedVarients[index] = value;
    setMyVarients(updatedVarients);
  };

  const [inputCountsizes, setinputCountsizes] = useState(1);
  const [productsizes, setproductsizes] = useState(Array(inputCount).fill(''));
  const handlesizeChange=(event)=>{
    const{value}=event.target;
    setinputCountsizes(Number(value));
  }
  const sizesHandle = (index, value) => {
    const updatedVarients = [...productsizes];
    updatedVarients[index] = value;
    setproductsizes(updatedVarients);
   
  };


 
// ********************************************************

// handleUpload
// videoURLAPI

//***************************************************** */
  const inputTags = Array(inputCount).fill(null).map((_, index) => (
    <input className="dynamic-inputs"type="text"placeholder="varients" key={index}  onChange={(e) => varientHandle(index, e.target.value)} value={myVarients[index]} required/>
  ));
  const sizeinputTag = Array(inputCountsizes).fill(null).map((_, index) => (
    <input   className="dynamic-inputs" type="text"  placeholder="Sizes"  key={index}  value={productsizes[index]}  onChange={(e) => sizesHandle(index, e.target.value)} required/>
  ));

    // ***********************************************************************************************************************************
    const [alertmessage, setalertmessage] = useState('')
const [alertcolour, setalertcolour] = useState("success");
    const handleSubmission= async(e)=>{
      e.preventDefault();
     try{
      const currentDate= new Date();
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Asia/Karachi',
      };
      const formattedDateTime= new Date(currentDate).toLocaleString('en-US', options);
            const ProductForm=new FormData();
             ProductForm.append("inventorytitle",formData.Inventorytitle);
             ProductForm.append("producttitle",formData.producttitle);
             ProductForm.append("productprice",formData.productprice);
             ProductForm.append("grandtotal",formData.GrandTotal);
             ProductForm.append("shipmentcost",formData.shipmentcharges);
             ProductForm.append("brandname",formData.brandname);
             ProductForm.append("totalitems",formData.totalitems);
             ProductForm.append("lastupdate",formattedDateTime);
             ProductForm.append("otherinfo",formData.Otherinfo);
             ProductForm.append("varient", myVarients);
             ProductForm.append("sizes",productsizes);
             for (let i = 0; i < selectedFiles.length; i++) {
              ProductForm.append('images', selectedFiles[i]);
            }

    const addproduct= await fetch("https://backendapi.modernmorven.com/Addinventory",{
        method:"POST",
        body: ProductForm,
       
     }) 
  
      if (addproduct.ok) {
        const productdata = await addproduct.json();
        if (productdata.success) {
          alert("upload Successfully 😍😍😍😍😍😍")
          setalertmessage("upload Successfully 😍😍😍😍😍😍")
          setalertcolour("success");
        } else {
          console.log(productdata.message);
          setalertmessage(`Error Occurred: ${productdata.message}`);
          setalertcolour("danger");
        }
      } else {
        // Handle non-200 status codes (e.g., server errors)
        console.log(`HTTP error: ${addproduct.status}`);
        setalertmessage(`HTTP error: ${addproduct.status}`);
        setalertcolour("danger");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      setalertmessage(`Error: ${error}`);
      setalertcolour("danger");
    }

  }


  return (
    <>
    <AdminNavbar/>
      <div className="addproduct-maincontainer" >
        {alertmessage&&
      <div className={`alert alert-${alertcolour}`} role="alert">
             {alertmessage}
</div>
}
        <h1>Add Inventory</h1>
          <form className="add_product_form"  >
            <p>Minimum 3 Pictures upload</p>
         <div className="imageuplaording-section">
                <div className="admin-sidemainimages "  >
                <div className="display_uploard_image1" style={imagechanger1(0)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 0)} required/>
              
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
                <div className="display_uploard_image1" style={imagechanger2(1)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 1)} required/>
              
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
                <div className="display_uploard_image1" style={imagechanger3(2)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 2)} required/>
              
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
                <div className="display_uploard_image1" style={imagechanger4(3)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 3)} />
              
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
                <div className="display_uploard_image1" style={imagechanger5(4)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 4)} />
              
              
              
                 {/* admin-sidemainimages */}
                </div>
       
          
                <div className="admin-sidemainimages "  >
                <div className="display_uploard_image1" style={imagechanger6(5)} ></div>
                <input type="file" accept="image/png , image/jpeg"src=" uploard image "   placeholder='Uploard image'  onChange={(event) => handleFileChange(event, 5)} />
              
              
              
                 {/* admin-sidemainimages */}
                </div>
              
       
          



         </div>
         <div className="video-section">
            <h5 className="adjusth4">Upload Video</h5>
            <input type="file" accept="video/*"  onChange={(event) => handleFileChange(event, 6)} ></input>
            {selectedFiles[6] &&(
                <video className='container w-100 h-100' src={URL.createObjectURL(selectedFiles[6])}  controls /> 
                
            )}
         </div>
         <div className="written_container " >
            <h4 className="adjusth4">Inventory Title</h4>
             <input type="text" placeholder="Write a Product Title here" className="adjustinput" onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,Inventorytitle:e.target.value}))}} required />
          </div>
          
          
         <div className="written_container " >
            <h4 className="adjusth4">Product Names</h4>
             <input type="text" placeholder="Write a Product Title here" className="adjustinput" onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,producttitle:e.target.value}))}} required />
          </div>

          
          <div className="add-product-price_container">
                <div className="addproduct-major-price">
                    <h5 className='adjusth4'>Product Price</h5>
                    <input className="adjustinput"type="number" name="" id="" placeholder='Enter price of product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,productprice:e.target.value}))}} required/>
                </div>
                        <div className="addproduct-discount-price">
                        <h5 className='adjusth4'>Grand Total</h5>
                        <input  className="adjustinput" type="number" name="" id="" placeholder='Enter discount price of product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,GrandTotal:e.target.value}))}} required/>
                        </div>
                        <div className="addproduct-discount-price">
                        <h5 className='adjusth4'>Shipment Charges</h5>
                        <input  className="adjustinput" type="number" name="" id="" placeholder='Enter delivery charges' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,shipmentcharges:e.target.value}))}} required/>
                        </div>
                        
          </div>

          <div className="brand-varients_main_container">
                <div className="brand-container">
                    <h5 className='adjusth4'>Brand Name:</h5>
                    <input className='adjustinput' type="text" placeholder='Write Brand Name' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,brandname:e.target.value}))}} required />
                </div>
                <div className="brand-container">
                    <h5 className='adjusth4'>No of pieces:</h5>
                    <input className='adjustinput' type="text" placeholder='Write Brand Name' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,totalitems:e.target.value}))}} required />
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
         <div className="warrenty_policy_container">
                    <h3  htmlFor="">Add More Information</h3>
                    <textarea rows="12" placeholder='optional' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,Otherinfo:e.target.value}))}} ></textarea>
                </div>
          <div className="submitoptions">
       
       
            <button type='submit' onClick={handleSubmission}>Save</button>
          </div>


          </form>
           
             
              
          </div>
    </>
  );
}

export default AddInventory;
