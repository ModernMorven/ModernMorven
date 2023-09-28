import React, { useEffect, useState } from 'react';
import '../Admincss/Dashboard.css'
import { Link ,useNavigate} from 'react-router-dom';
import AdminNavbar from './AdminNavbar'
function AdminDashboard() {
   
const managepath=useNavigate();

   const pathchanger=()=>{
    managepath("/AdsManagement");
   }
    const [orders, setorders] = useState('0');
    const [reviews, setreviews] = useState('0');
    const [customers, setcustomers] = useState('0');
    const [revenue, setrevenue] = useState('0');

useEffect(() => {
    fetchcustomers();
    fetchRevenue();
    fetchOrders();
    fetchreviews();
});

    const fetchOrders=async()=>{
        try {
            const response= await fetch("http://backendapi.modernmorven.com/admin/main/showOrders");
            const data= await response.json();
            if(response.ok&&!data.message){
                setorders(data);
            }else{
                console.log('data.message', data.message)
            }
            
        } catch (error) {
            console.log('error', error);
        }
    }
    const fetchreviews=async()=>{
        try {
            const response= await fetch("http://backendapi.modernmorven.com/admin/main/showReviews");
            const data= await response.json();
            if(response.ok&&!data.message){
                setreviews(data);
            }else{
                console.log('data.message', data.message)
            }
            
        } catch (error) {
            console.log('error', error);
        }
    }
    const fetchRevenue=async()=>{
        try {
            const response= await fetch("http://backendapi.modernmorven.com/admin/main/showRevenue");
            const data= await response.json();
            if(response.ok&&!data.message){
                setrevenue(data);
            }else{
                console.log('data.message', data.message)
            }
            
        } catch (error) {
            console.log('error', error);
        }
    }
    const fetchcustomers=async()=>{
        try {
            const response= await fetch("http://backendapi.modernmorven.com/admin/main/showcustomers");
            const data= await response.json();
            if(response.ok&&!data.message){
                setcustomers(data);
            }else{
                console.log('data.message', data.message)
            }
            
        } catch (error) {
            console.log('error', error);
        }
    }

  return (
    <>
  <div className="  dashboard-main_container">
    <AdminNavbar/>


{/* slide nav bar start */}
            <div className="back-div-main-body">
                    <div className="admin-slide-bar">
                            <div className="dropdown">
                                <button className="btn btn-dark border-white dropdown-toggle my-3 w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Product Management
                                </button>
                                <ul className="dropdown-menu w-100">
                                    <li><Link className="dropdown-item " to="/AddProduct">Add Product</Link></li>
                                    <li><Link className="dropdown-item" to="/ManageProduct">Manage Product</Link></li>
                                    <li><Link className="dropdown-item" to="/DraftProduct">Draft Products</Link></li>
                                    <li><Link className="dropdown-item" to="/ViewProduct">View Products</Link></li>
                                </ul>
                            </div>

                           
                           
                            <div className="dropdown">
                                <button className="btn btn-dark border-white dropdown-toggle my-3 w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Order Management
                                </button>
                                <ul className="dropdown-menu w-100">
                                    <li><Link className="dropdown-item" to="/ManageOrder">Manage orders</Link></li>
                                    <li><Link className="dropdown-item" to="/ViewOrder">View Orders</Link></li>
                                    {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                </ul>
                            </div>

                           
                           
                            <div className="dropdown">
                                <button className="btn btn-dark border-white dropdown-toggle my-3 w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Inventory Management
                                </button>
                                <ul className="dropdown-menu w-100">
                                    <li><Link className="dropdown-item" to="/AddInventory">Add New Inventory</Link></li>
                                    <li><Link className="dropdown-item" to="/InventoryHistory">Inventory History</Link></li>
                                    {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                </ul>
                            </div>

                           
                           
                            <div className="dropdown">
                                <button className="btn btn-dark border-white my-3 w-100 " type="button" onClick={pathchanger}>
                                    Ads Management
                                </button>
                                {/* <ul className="dropdown-menu w-100">
                                    <li><a className="dropdown-item" href="#"></a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul> */}
                            </div>

                           
                           


                  {/* admin-slide-bar */}
                    </div>


                            <div className="main-article">
                                    <div className="major-display-items">
                                            <div className="total-revinue">  <h6> Total Customers</h6><p>{customers}</p></div>                                                                                                  
                                            <div className="total-revinue"><h6>Total Revenue</h6> <p>Rs {revenue}</p></div>
                                            <div className="total-revinue"> <h6>Total Orders</h6> <p>{orders}</p></div>                         
                                            <div className="total-revinue"><h6>Total Reviews</h6> <p>{reviews}</p></div>
                                                    
                                  {/* major-display-items */}
                                    </div>
                                    <div className="notification-pannel">
                                        hii
                                    </div>
                            {/* main-article */}
                            </div>
            {/* back-div-main-body */}
            </div>
   </div>
   
    </>
  );
}

export default AdminDashboard;
