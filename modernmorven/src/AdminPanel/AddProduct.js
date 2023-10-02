import React,{useState} from 'react';
import '../Admincss/AddProduct.css'
import AdminNavbar from './AdminNavbar';



function AddProduct() {

    //to store varients of product
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

const [status, setstatus] = useState("LIVE");
   
 
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
 
  //  Save the But But not Show on  Main Article 
  const saveDraft=()=>{
    try{
      setstatus("DRAFT")

      handleSubmission();
    }
   
catch(error){
  alert(`Status ERROR ${error}` )
}

  
  }

    // ***********************************************************************************************************************************
    const [alertmessage, setalertmessage] = useState('')
const [alertcolour, setalertcolour] = useState("success");





    const handleSubmission= async()=>{
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
             ProductForm.append("_id",formData._id)
             ProductForm.append("title",formData.title);
             ProductForm.append("price",formData.price);
             ProductForm.append("discountprice",formData.discountprice);
             ProductForm.append("brandname",formData.brandname);
             ProductForm.append("status",status);
             ProductForm.append("availability",formData.availability);
             ProductForm.append("lastupdate",formattedDateTime);
             ProductForm.append("discription",formData.discription);
             ProductForm.append("warrenty",formData.warrenty);
             ProductForm.append("insidebox", formData.insidebox);
             ProductForm.append("varient", myVarients);
             ProductForm.append("sizes",productsizes);
           
             for (let i = 0; i < selectedFiles.length; i++) {
              ProductForm.append('images', selectedFiles[i]);
            }
             ProductForm.append("deliverycharges",formData.deliverycharges);
    const addproduct= await fetch("https://backendapi.modernmorven.com/Addproduct",{
        method:"POST",
        body: ProductForm,
        headers:{
          "Accept": "application/json",
       "Content-Type": "multipart/form-data",
        }
     }) 
      const  productdata= await addproduct.json();
      if(addproduct.ok){
              if( productdata.verification )
              {
                setalertmessage("SKU already exists Try again 😢😢😢😢 ");
                setalertcolour("danger");
              }
            else{
              setalertmessage("upload Successfully 😍😍😍😍😍😍")
              setalertcolour("success");
            }
           
      }
      else{
        alert(productdata.message);
        console.log(productdata.message);
      }
    }
      catch(error){
        setalertmessage(`${error}`)
        setalertcolour("dabger");

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
        <h1>Add New Product</h1>
          <form className="add_product_form" onSubmit={handleSubmission} >
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
            <h4 className="adjusth4">Product Title</h4>
             <input type="text" placeholder="Write a Product Title here" className="adjustinput" onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,title:e.target.value}))}} required />
          </div>
          <div className="skucontainer">
            <h4 className="adjusth4"htmlFor="">SKU Number(Stock Keeping Unit)</h4>
            <input className="adjustinput"  type="text" placeholder='SKU must be unique' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,_id:e.target.value}))}} required/>
          </div>
          <div className="add-product-price_container">
                <div className="addproduct-major-price">
                    <h5 className='adjusth4'>Product Price</h5>
                    <input className="adjustinput"type="number" name="" id="" placeholder='Enter price of product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,price:e.target.value}))}} required/>
                </div>
                        <div className="addproduct-discount-price">
                        <h5 className='adjusth4'>Discount Price</h5>
                        <input  className="adjustinput" type="number" name="" id="" placeholder='Enter discount price of product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,discountprice:e.target.value}))}}/>
                        </div>
                        <div className="addproduct-discount-price">
                        <h5 className='adjusth4'>Delivery Charges</h5>
                        <input  className="adjustinput" type="number" name="" id="" placeholder='Enter delivery charges' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,deliverycharges:e.target.value}))}} required/>
                        </div>
                        
          </div>

          <div className="brand-varients_main_container">
                <div className="brand-container">
                    <h5 className='adjusth4'>Brand Name:</h5>
                    <input className='adjustinput' type="text" placeholder='Write Brand Name' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,brandname:e.target.value}))}} required />
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
                    <textarea rows="25" cols="38" name="" id=""  placeholder="please provide complete detail about product"  onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,discription:e.target.value}))}} required/>
                </div>
                <div className="warrenty_policy_container">
                    <h3  htmlFor="">Warrenty Policy:</h3>
                    <textarea rows="12"placeholder='Write warrenty policy of the product' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,warrenty:e.target.value}))}} required></textarea>
                </div>
          {/* close upper-container-product_description_warrenty */}
          </div>
          <div className="what-inside-box">
            <h3>What inside box?</h3>
            <input className="adjustinput"type="text" placeholder='1 x item 2 x item ' onChange={(e)=>{setFormData(prevFormdata=>({...prevFormdata,insidebox:e.target.value}))}} required />
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

export default AddProduct;
