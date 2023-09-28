import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

function AdminMange() {
    const Admincheck= JSON.parse(localStorage.getItem('Admin')).Role;
    const [action, setaction] = useState(true);
 

    const [myadminkey, setmyadminkey] = useState('');
    const [myadminname, setmyadminname] = useState('');
    const [myadminpass, setmyadminpass] = useState('');
    const [myadminrole, setmyadminrole] = useState('');
    const [responsemessage, setresponsemessage] = useState('');
   
    const [colour, setcolour] = useState('');
    const [list, setlist] = useState([]);

  useEffect(() => {
    fetchAdmin();
  });
  const fetchAdmin=async()=>{
    try {
        const response = await fetch("https://backendapi.modernmorven.com/api/fetch/admins");
        const data =await  response.json();
    if(response.ok &&!data.message){
        setlist(data);
    }
    else{
        console.log(`Error ${data.message}`);
        setresponsemessage("Error While getting data")
    }
        
    } catch (error) {
        console.log(error);
        setresponsemessage("Error in API ");
    }
    
  }
    const handleAddAdmin=async(e)=>{
        e.preventDefault();
        try {
            if(!myadminkey||!myadminname||!myadminpass||!myadminrole){
                setresponsemessage("Invalid Fields");
                return;
            }
            const response= await fetch("https://backendapi.modernmorven.com/Admin/SUBMIT/ADD/ADMIN",{
                method:"POST",
                body:JSON.stringify({
                    "key": myadminkey,
                    "name":myadminname,
                   "pass":myadminpass,
                  "role" :myadminrole,
                  "enable":true
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = await response.json();
            if (response &&!data.message) {
                setresponsemessage("Added Successfully");
                setcolour("success")
            }else{
                setresponsemessage(data.message);
                setcolour("danger");
            }
            
        } catch (error) {
            console.log( error);
            setresponsemessage(error);
                setcolour("danger");
            
        }
    }

    setTimeout(() => {
        setresponsemessage(null);
        setcolour(null);
    }, 5000);

  return (
    <>
    {Admincheck&& Admincheck==='founder'?(<>
        <AdminNavbar/>
       {responsemessage&& <div className={`alert alert-${colour}`}>{responsemessage}</div>}
      <div className="container-fluid mb-3 my-2">
        <button className='btn btn-success text-light float-left mx-4 ' style={{width:"15%"}} onClick={()=>{setaction(true)}}>ADD</button>
        <button className='btn btn-warning text-light float-left mx-3 ' style={{width:"15%"}} onClick={()=>{setaction(false)}}>Manage</button>

      </div>



      {action?(<>
      <form className="my-2 form-control mx-3 " style={{width:"70%"}} onSubmit={handleAddAdmin}>
        <label htmlFor="form-control ">Admin Name</label>
        <input type="text" className='form-control'  onChange={(e)=>{setmyadminname(e.target.value)}} required/>
        <label htmlFor="form-control ">Email Address</label>
        <input type="email" className='form-control' placeholder='example@gmail.com' onChange={(e)=>{setmyadminkey(e.target.value)}} required/>
        <label htmlFor="form-control ">Password</label>
        <input type="password" className='form-control' onChange={(e)=>{setmyadminpass(e.target.value)}} required/>
        <label htmlFor="form-control ">Role</label>
        <input type="text" className='form-control'  onChange={(e)=>{setmyadminrole(e.target.value)}} required/>
        <button type='submit' className=' btn btn-primary mt-3' style={{width:"17%",float:"right"}}>submit</button>
      </form>




        </>):(<>
       <div className="table">
       
      <table className="table table-striped text-center mt-5">
      <thead>
    <tr>
      
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
     
    </tr>
  </thead>
                <tbody>
                  {list.map((item,index)=>{
                    let status=item.enable===true?"Enable":"Disabled"
                    let colour=item.enable===true?"success":"danger"
                    return(<>
                      <tr><td>{index+1}</td><td>{item.name}</td><td>{item._id}</td><td>{item.Role}</td><td className={`text-${colour}`}>{status}</td> <Link to='/ManageAccessA'> <td onClick={()=>{localStorage.setItem("Addtoken",item._id)}} className='text-primary'>Edit</td></Link>    </tr>

                       </>);

                  })}
                  
                
                   
                </tbody>
                        </table>

       </div>
       {/* close action  */}
        </>)}

    </>):(<><h1>ERROR 404 <h4>ModernMorven</h4></h1> </>)}
      
    </>
  );
}

export default AdminMange;
