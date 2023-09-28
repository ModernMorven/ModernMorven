
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
function ManageAccessA() {
 
  const [stored, setstored] = useState([]);
  const [disability, setdisability] = useState(false);
  const [name, setname] = useState();
  const [role, setrole] = useState();
  const [alertmessage, setalertmessage] = useState('');
  const [colour, setcolour] = useState('');
  const nevigate=useNavigate();
  
  const Admincheck= JSON.parse(localStorage.getItem('Admin')).Role;
  useEffect(() => {
    fetchadmin();
   
  });
  const fetchadmin=async()=>{
    const AdminId= localStorage.getItem('Addtoken');
    try {
      const response= await fetch("http://backendapi.modernmorven.com/apisingle/admins",{
        method:"POST",
        body:JSON.stringify({"key":AdminId }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      if(response&&!data.message){
        setstored(data);
      }
      else{
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  }
  const handleSubmissionadmin=async(e)=>{
    e.preventDefault();
    try {
      const response= await fetch("http://backendapi.modernmorven.com/Admin/SEND/Edit/profile",{
        method:"POST",
        body:JSON.stringify({
          "key":stored._id,
          "name":name||stored.name,"role":role || stored.Role,"enable":true,
      }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      if(response&&!data.message){
        setalertmessage("update successFully");
        setcolour("success")
      }
      else{
        setalertmessage(data.message);
        setcolour("danger")
        console.log(data.message);
      }
    } catch (error) {
      setalertmessage("ERROR IN API CALLING");
      setcolour("danger")
      console.log(error);
    }

  }
  const handleDelete=async()=>{
    try {
      const response= await fetch("http://backendapi.modernmorven.com/Admin/Access/delete ",{
        method:"POST",
        body:JSON.stringify({
          "key":stored._id,
      }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      if(response&&!data.message){
        setalertmessage("Delete successFully");
        setcolour("success");
        localStorage.removeItem("Addtoken");
        nevigate("/AdminMange")
      }
      else{
        setalertmessage(data.message);
        setcolour("danger")
        console.log(data.message);
      }
    } catch (error) {
      setalertmessage("ERROR IN API CALLING");
      setcolour("danger")
      console.log(error);
    }

  }
  const handleEnable=async(check)=>{
    try {
      const response= await fetch("http://backendapi.modernmorven.com/Admin/Access/Add/remove ",{
        method:"POST",
        body:JSON.stringify({
          "key":stored._id,
          "enable": check
      }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      if(response&&!data.message){
        setalertmessage("Change Status successFully");
        setcolour("success");
      }
      else{
        setalertmessage(data.message);
        setcolour("danger")
        console.log(data.message);
      }
    } catch (error) {
      setalertmessage("ERROR IN API CALLING");
      setcolour("danger")
      console.log(error);
    }

  }
  setTimeout(() => {
    setalertmessage(null)
  }, 8000);

  return (
    <>
    {Admincheck==='founder'?(<>
      <AdminNavbar/>
      {alertmessage&&(<>
      <div className={`alert alert-${colour}`}>{alertmessage}</div>
    </>)}
   
    <div className="container-fluid">
      {stored.enable===false?(<>   <button className=' text-light btn btn-success m-3 'style={{width:"15%"}} onClick={()=>{handleEnable(true)}}>Enable</button></>):(<>
        <button className=' text-light btn btn-warning m-3'style={{width:"15%"}} onClick={()=>{handleEnable(false)}}>Disable</button>
      </>)}
 

      <button className=' text-light btn btn-danger m-3'style={{width:"15%"}} onClick={handleDelete}>delete</button>
      <button className=' text-light btn btn-primary m-3 'style={{width:"15%"}} onClick={()=>{setdisability(true)}}>Edit</button>
    </div>
{disability?(<>
  <form className="container-fluid mx-3 mt-3" style={{width:"70%"}} onSubmit={handleSubmissionadmin}>
      <label htmlFor="form-control"> Name</label>
      <input type="text" className='form-control' placeholder={stored.name} onChange={(e)=>{setname(e.target.value)}}/>
      <label htmlFor="form-control mt-2"> Cannot change the email </label>
      <input type="text" className='form-control' placeholder={stored._id} disabled/>
      <label htmlFor="form-control"> Role</label>
      <input type="text" className='form-control' placeholder={stored.Role} onChange={(e)=>{setrole(e.target.value)}} />
      <button type='submit' className='btn btn-primary mt-3' style={{width:"15%",float:"right"}}>Save</button>
      </form>
</>):(<>
  <div className="container-fluid mx-3 mt-3" style={{width:"70%"}}>
      <label htmlFor="form-control"> Name</label>
      <input type="text" className='form-control' placeholder={stored.name} disabled/>
      <label htmlFor="form-control"> Email</label>
      <input type="text" className='form-control' placeholder={stored._id} disabled/>
      <label htmlFor="form-control"> Role</label>
      <input type="text" className='form-control' placeholder={stored.Role} disabled />
      </div>
</>)}
   
    </>):(<>
   <h3>ERROR 404
   </h3><strong> modern morven</strong>
    </>)}
    
     
    </>
  );
}

export default ManageAccessA;











