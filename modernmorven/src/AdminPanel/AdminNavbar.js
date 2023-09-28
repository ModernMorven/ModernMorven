import React from 'react';
import '../Admincss/Dashboard.css'
import Admin from '../Images/dark Profile.svg'
import { Link ,useNavigate } from 'react-router-dom';
function AdminNavbar() {
 const data= localStorage.getItem('Admin');
 const Adminname=JSON.parse(data);

  const  loginnevigate=useNavigate();
  return (
    <>
       <div className="dashboard-navbar-container">
            <div className="name-nabar">
                      <Link to="/AdminDashboard" > <h2>Modern Morven Administration</h2></Link>
                        <div className="access-written"><h6>Admin Use Only</h6></div>
                        
            </div>
                <div className="admin-main-profile">
                            <div className="admin-profilepic">
                                <img src={Admin} alt="" />
                                </div>
                                        <div className="dropdown-container">
                                            <span data-bs-toggle="dropdown" aria-expanded="false" className='text-dark'>{Adminname.name}</span>
                                        
                                            <div className="dropdown">
                                                <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to="">My Profile</Link></li>
                                                {Adminname.Role==='founder'&&(<>
                                                  <li><Link className="dropdown-item" to="/AdminMange"> Admin Management </Link></li>
                                                </>)}
                                               
                                                <li><Link className="dropdown-item" to="/">Change Password</Link></li>
                                                <li><Link className="dropdown-item" ><button onClick={()=>{localStorage.removeItem('Admin')
                                              loginnevigate('/AdminLogin')}}> Logout</button></Link></li>
                                            </ul>
                                            </div>
                                        
                                        </div>
                            
                </div>
     {/*dashboard-navbar-container  */}
      </div>
    </>
  );
}

export default AdminNavbar;
