import React, { useEffect, useState } from 'react';
import '../Filescss/ProfileUser.css'
function ProfileUser() {
const [addbuttonph, setaddbuttonph] = useState(false);
const [addbuttonaddress, setaddbuttonaddress] = useState(false);
const [EditButton, setEditButton] = useState(false);
const [showbtn, setshowbtn] = useState(false);
const [message, setmessage] = useState("");
const [colour, setcolour] = useState("");
const [errormessage, seterrormessage] = useState('');
const [phoneerror, setphoneerror] = useState('');

const [name, setname] = useState('');
const [phoneno, setphoneno] = useState(''); 
const [billingaddress, setbillingaddress] = useState(''); 


const [storeduser, setstoreduser] = useState([]);
const key= JSON.parse(localStorage.getItem('user'));
useEffect(() => {
  showdata();
});
  useEffect(() => {
    // Update showbtn based on conditions
  
    setshowbtn(addbuttonaddress || addbuttonph || EditButton);
  }, [addbuttonaddress, addbuttonph, EditButton]);


  useEffect(() => {
    if(!name){
      setname(storeduser.name || '');
    }
   if(!phoneno){
    setphoneno(storeduser.phoneno || '');
   }
   if(!billingaddress){
    setbillingaddress(storeduser.billingaddress || '');
   }
    
    
  }, [phoneno,billingaddress,name]);


  const showdata=async()=>{
    try{
      const response= await fetch("http://backendapi.modernmorven.com/CustomerShowProfile",{
        method:"POST",
        body:JSON.stringify({
          "key":key,
        }),
        headers:{
          "Content-Type": "application/JSON"
        }
      });
      const data= await response.json();
      if(response &&!data.message){
        setstoreduser(data);
        }
        else{
          seterrormessage("Connection error try again");
         
        }
      }
  catch(error){
    seterrormessage("UNKNOWN ERROR");
   
  }
  }
const handlechange=async()=>{
  try{

    if (phoneno) {
      const pattern = /^03\d{9}$/;
      if (!pattern.test(phoneno)) {
        setphoneerror(
          "Invalid phone number. It should start with 03 and have a total length of 11 characters."
        );
        return;
      }
    }
      const response= await fetch("http://backendapi.modernmorven.com/CustomerEditProfile",{
        method:"POST",
        body:JSON.stringify({
          "key":storeduser._id,
          "name":name,
          "phoneno":phoneno,
          "billingaddress":billingaddress,
        }),
        headers:{
          "Content-Type": "application/JSON"
        }
      });
      const data= await response.json();
      if(response &&!data.message){
        setmessage("Data Updated Successfully");
        setcolour("success");
  
       
        }
        else{
          setmessage("ERROR WHILE UPLOADING DATA");
          setcolour("danger")
        }
  
   
    }

catch(error){
   setmessage("UNKNOWN ERROR");
   setcolour("danger")
}
}
setTimeout(() => {
  setmessage(null);
  setcolour(null);
}, 5000);
setTimeout(() => {
  setphoneerror(null);
}, 5000);




  return (
    <>
    {errormessage?(<><p className='error-message text-danger'>{errormessage}</p></>):(<>
      <div className="profilebtncontainer ">

        {/* check whether edit button enable or not  */}
      {EditButton?(<>
        <button className='btn btn-danger ' onClick={()=>{setEditButton(false)}}>Cancle</button>
      </>):(<>
      
        <button className='btn btn-primary text-light ' onClick={()=>{setEditButton(true)}}>Edit</button>
      </>)}
      </div>
      {/* display a message */}
      { message&&(<>
        <div className={`alert alert-${colour}`}>{message}</div>
        </>) }
    <div className="userprofilemaindiv">
     
      {/* upper main container */}
    <div className=' bg-none containerProfile'style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>

{!EditButton?(<>
{/* when eidit will not false */}

  <div className="input-group mb-3 w-100">
  <span className="input-group" >Username</span>
  <input type="text" className="form-control" placeholder={storeduser.name} disabled />


</div>

<div className="input-group mb-3 w-100">
  <span className="input-group" >Email</span>
  <input type="text" className="form-control" placeholder={storeduser._id} disabled />
</div>


{/* phoneno */}
{/* ******************************************************************************* */}
{/* ******************************************************************************* */}

{storeduser.phoneno?(<>
  <div className="input-group mb-3 w-100">
    <span className="input-group">Phone Number</span>
    <input type="text" className="form-control" placeholder={storeduser.phoneno} disabled/>
  </div>
  </>):(<>
    {!addbuttonph?(<>
      <span onClick={()=>{setaddbuttonph(true)}}> <div className="fa fa-plus"></div> Add Phone Number</span>
    </>):(<>
      <div className="input-group mb-3 w-100">
    <span className="input-group">Phone Number</span>
    <input type="text" className="form-control" value={phoneno} placeholder='03XXXXXXXXX' onChange={(e)=>{setphoneno(e.target.value)}}/>
    {phoneerror?(<>
      <span className='text-danger'>{phoneerror}</span>
    </>):(<>
      <span className='text-danger' onClick={()=>{setaddbuttonph(false)}}>Remove</span>
    </>)}
    
  </div>
    </>)}
  </>)}


{/* ******************************************************************************* */}
{/* ******************************************************************************* */}



{/* billingaddress */}
{/* ******************************************************************************* */}
{/* ******************************************************************************* */}



{storeduser.billingaddress?(<>
<div className="input-group w-100">
<span className='input-group'>Shipping Address</span>
  <textarea className="form-control w-100" placeholder={storeduser.billingaddress} disabled />
 
</div>
</>):(<>
      {
        !addbuttonaddress?(<>
        <span onClick={()=>{setaddbuttonaddress(true)}}><div className="fa fa-plus"></div> Add Shipping Address</span>
        </>):(<>
        
          <div className="input-group w-100">
          <span className='input-group'>Shipping Address</span>
           <textarea className="form-control w-100" value={billingaddress} onChange={(e)=>{setbillingaddress(e.target.value)}}></textarea>
           <span className='text-danger' onClick={()=>{setaddbuttonaddress(false)}}>Remove</span>
         </div>
        </>)
      }
      {/* close phone and billing */}
</>)}




{/* ******************************************************************************* */}
{/* ******************************************************************************* */}




</>):
(<>
{/* when edit button will click */}
  <div className="input-group mb-3 w-100">
  
  <span className="input-group" >Username</span>
  <input type="text" className="form-control" value={name} placeholder={storeduser.name} onChange={(e)=>{setname(e.target.value)}}/>
  
</div>



<div className="input-group mb-3 w-100  " >
<span className="input-group text-danger" >Do not edit Email contact the admin if changes are needed.</span>
  <input type="text" className="form-control" placeholder={storeduser._id} disabled />
 
</div>

{/* phone and billing section pending */}
{storeduser.phoneno?(<>
<div className="input-group mb-3 w-100">
  <span className="input-group">Phone Number</span>
  <input type="text" className="form-control"  value={phoneno}placeholder={storeduser.phoneno} onChange={(e)=>{setphoneno(e.target.value)}}/>
  {phoneerror&&(<>
    <span className='text-danger'>{phoneerror}</span>
  </>)}
</div>
</>):(<>
  {!addbuttonph?(<>
    <span onClick={()=>{setaddbuttonph(true)}}> <div className="fa fa-plus"></div> Add Phone Number</span>
  </>):(<>
    <div className="input-group mb-3 w-100">
  <span className="input-group">Phone Number</span>
  <input type="text" className="form-control" value={phoneno} onChange={(e)=>{setphoneno(e.target.value)}}/>
  {phoneerror?(<>
    <span className='text-danger'>{phoneerror}</span>
  </>):(<>
    <span className='text-danger' onClick={()=>{setaddbuttonph(false)}}>Remove</span>
  </>)}
</div>
  </>)
  
  }
</>)}




{storeduser.billingaddress?(<>
<div className="input-group w-100">
<span className='input-group'>Shipping Address</span>
  <textarea className="form-control w-100" placeholder={storeduser.billingaddress} value={billingaddress} onChange={(e)=>{setbillingaddress(e.target.value)}} />
 
</div>
</>):(<>
      {
        !addbuttonaddress?(<>
        <span onClick={()=>{setaddbuttonaddress(true)}}><div className="fa fa-plus"></div> Add Shipping Address</span>
        </>):(<>
        
          <div className="input-group w-100">
          <span className='input-group'>Shipping Address</span>
           <textarea className="form-control w-100" value={billingaddress} onChange={(e)=>{setbillingaddress(e.target.value)}}></textarea>
           <span className='text-danger' onClick={()=>{setaddbuttonaddress(false)}}>Remove</span>
         </div>
        </>)
      }
      {/* close phone and billing */}
</>)}







</>)}

{showbtn&&(<button id='mysubmitcontainer' className='btn btn-primary  mb-3 my-5' onClick={handlechange}>Save</button> )}



     {/* upper main container */}
    </div>
  

   {/* close main container */}
    </div>

    </>)}

</>
  );
}

export default ProfileUser;
