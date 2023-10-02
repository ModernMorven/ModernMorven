import React,{useEffect, useState} from 'react';
import '../Admincss/AdsManagement.css'
import AdminNavbar from './AdminNavbar';

function AdsManagement() {
    const [myimage, setImage] = useState(null);
    const [message, setmessage] = useState('');
    const [colour, setcolour] = useState('');
    const [image, setimage] = useState([]);
    const[adname ,setAdName]=useState('')
    

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setAdName(file)
      const myimage = new Image();
      myimage.onload = () => {
        const width = myimage.width;
        const height = myimage.height;
        if (width !== 1400 || height !== 450) {
          alert("Please upload a picture that is 1400x450px");
          setImage(null);
        }
        else{
            const reader = new FileReader();
            reader.onload = () => {
            setImage(reader.result);
       };
       reader.readAsDataURL(file);
            
           
        }
      };
      myimage.src=(URL.createObjectURL(file)) ;
    };
    useEffect(() => {
      showAds();
    }, );
    const showAds=async()=>{
      try{
        const response= await fetch("https://backendapi.modernmorven.com/api/runningads");
        const data= await response.json();
        if(response.ok &&!data.result)
        {
          setimage(data);
        }
        else{
          setmessage("ERROR WHILE FETCHING");
          setcolour("danger")
        }

      }
      catch(error){
        console.log(error);
        setmessage(`ERROR ${error}`);
        setcolour("danger");
      }
    }
    const submitAdshandler=async()=>{
    try{
      if(!adname){
        setmessage("ERROR while Uplording");
        setcolour("danger")
      }
      else{
        const formdata= new FormData();
        formdata.append("image",adname)
      const response= await fetch("https://backendapi.modernmorven.com/AdsManage",{
        method:"POST" ,
        body : formdata,
        headers:{
          "Accept": "application/json",
       "Content-Type": "multipart/form-data",
        }
      });
      const data= await response.json();
      if(response.ok &&!data.result)
      {
        console.log(data);
        setmessage("Uploard Successfully");
        setcolour("success")
      }
      else{
        setmessage("ERROR WHILE FETCHING");
        setcolour("danger")
      }
    }
    }
    catch(error){
      console.log(error);
      setmessage(`ERROR ${error}`);
      setcolour("danger")
    }
     
    }

    const removeAds=async(ImageID)=>{
      try{
        const response= await fetch("https://backendapi.modernmorven.com/api/delete/ads",{
          method:"POST",
          body:JSON.stringify({"key":ImageID}),
          headers:{
            "Content-Type":"application/json"
          }
        });
        const data= await response.json();
        if(response.ok &&!data.result)
        {
          setmessage("Delete Successfully");
          setcolour("success")
        }
        else{
          setmessage("ERROR WHILE FETCHING");
          setcolour("danger")
        }

      }
      catch(error){
        console.log(error);
        setmessage(`ERROR ${error}`);
        setcolour("danger");
      }

    }
    setTimeout(() => {
      setmessage('');
    }, 4000);
    const imageReplace={
        Width:"100%",
        height:"100%",
      
         }

  return (
    <>
    <AdminNavbar/>
    {message&&(<>
      <div className={`alert alert-${colour}`} role="alert">
 {message}
</div>
    </>)}
    
      <div className="AdsManagement_upper_main_container">
     
                 {image.map((item,index)=>{
                return(<>
                   <div className="Adsimage_container "  >
                 <img  src={item.adsimageUrl} style={imageReplace}alt="Image" /> 
                 <div className="ads_delete_button"><button type="submit" onClick={()=>{removeAds(item._id)}}>Delete</button></div> 
                 {/* Adsimage_container */}
                </div>

                </>)
                 })}
             
               
        
               
               
                <div className="Adsimage_container "  >
                {myimage && <img src={myimage} style={imageReplace}alt="Image" />}
               <form className="adsform"action="" onSubmit={submitAdshandler} >
                <input type="file" accept="image/jpeg,image/png,image/svg+xml,image/gif"   placeholder='Uploard image' onChange={handleImageChange} required/>
               <div className="ads_button">
                <button type="submit">Submit</button>
                </div>
                </form>
                
                 {/* Adsimage_container */}
                </div>
            
                
                
                
       </div>
    </>
  );
}

export default AdsManagement;
