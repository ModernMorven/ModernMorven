import React, { useEffect, useState } from 'react';
// import './Filescss/APP.css';
import Customerlogin from './components/Customerlogin';
import CustomerRegistration from './components/CustomerRegistration';
import MajorProduct from './components/MajorProduct';
import MainArtical from './components/MainArtical';
// import Reviews from './components/Reviews';
import AddToCart from './components/AddToCart';
import OrderNow from './components/OrderNow';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import ForgetPassword from './components/ForgetPassword';
import CustomerRating from './components/CustomerRating';
import CustomerOrderDetails from './components/CustomerOrderDetails';
import OrderHistory from './components/OrderHistory';
import PaymentPolicies from './components/PaymentPolicies';
import ProfileUser from './components/ProfileUser';



import AdminDashboard from './AdminPanel/AdminDashboard'
import AddProduct from './AdminPanel/AddProduct'
import ManageProduct from './AdminPanel/ManageProduct'
import ViewProduct from './AdminPanel/ViewProduct';
import DraftProduct from './AdminPanel/DraftProduct';
import ManageOrder from './AdminPanel/ManageOrder';
import OrderDetails from './AdminPanel/OrderDetails';
import OrderInvoice from './AdminPanel/OrderInvoice';
import ViewOrder from './AdminPanel/ViewOrder'
import AddInventory from './AdminPanel/AddInventory'
import InventoryHistory from './AdminPanel/InventoryHistory'
import AdsManagement from './AdminPanel/AdsManagement'
import AdminLogin from './AdminPanel/AdminLogin'
import AdminForgetPassword from './AdminPanel/AdminForgetPassword'
import AdminMange from './AdminPanel/AdminMange'
import ManageAccessA from './AdminPanel/ManageAccessA'
import ProductEdit from './AdminPanel/ProductEdit'
import PrivateRoutes from './AdminPanel/PrivateRoutes'


import AboutUs from './components/AboutUs'
import FAQSModernMorven from './components/FAQSModernMorven'
import ModernMorvenShipment from './components/ModernMorvenShipment'
import ReturnPolicies from './components/ReturnPolicies'
import ModernMorvenContact from './components/ModernMorvenContact'
// import UploadImage from './testfile/UploadImage';
import CPRoutes from './components/CPRoutes';




function App() {

  // const [localStorageCleared, setLocalStorageCleared] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (event) => {
  //     if (event.type === "beforeunload") {
  //       setLocalStorageCleared(true);
  //     }
  //   });

  //   setTimeout(() => {
  //     if (!localStorageCleared) {
  //       localStorage.removeItem('Admin');
  //     }
  //   }, 60000);
  // }, []);
  return (
    <>
  

  {/* <AdminDashboard/> */}
  {/* <AddProduct/> */}
  {/* <ProductRating/> */}
  <BrowserRouter>

                       <Routes>
                         
                        {/* <Route path='/' element={<MainArtical/>}> </Route> */}
                      
                      {/* AdminPannel */}

                
                      {/* <Route exact path='/' element={<UploadImage/>}> </Route> */}
                      <Route exact path='/AdminLogin' element={<AdminLogin/>}> </Route>
                      <Route exact path='/AdminForgetPassword' element={<AdminForgetPassword/>}> </Route>
                        <Route  element={<PrivateRoutes/>}> 
                        <Route exact path='/Admin' element={<AdminDashboard/>}> </Route>
                        <Route exact path='/AdminDashboard' element={<AdminDashboard/>}> </Route> 
                        <Route exact path='/AddProduct' element={<AddProduct/>}> </Route>
                        <Route exact path='/ManageProduct' element={<ManageProduct/>}> </Route>
                        <Route exact path='/ViewProduct' element={<ViewProduct/>}> </Route>
                        <Route exact path='/DraftProduct' element={<DraftProduct/>}> </Route>
                        <Route exact path='/ManageOrder' element={<ManageOrder/>}> </Route>
                        <Route exact path='/OrderDetails' element={<OrderDetails/>}> </Route>
                        <Route exact path='/OrderInvoice' element={<OrderInvoice/>}> </Route>
                        <Route exact path='/ViewOrder' element={<ViewOrder/>}> </Route>
                        <Route exact path='/AddInventory' element={<AddInventory/>}> </Route>
                        <Route exact path='/InventoryHistory' element={<InventoryHistory/>}> </Route>
                        <Route exact path='/AdsManagement' element={<AdsManagement/>}> </Route>
                        <Route exact path='/AdminMange' element={<AdminMange/>}> </Route>
                        <Route exact path='/ProductEdit' element={<ProductEdit/>}> </Route>
                        <Route exact path='/ManageAccessA' element={<ManageAccessA/>}> </Route>
                        </Route>

                       
                       {/* Components */}

                        <Route exact path='/' element={<MainArtical/>}> </Route> 
                      
                        
                        <Route exact path='/MajorProduct' element={<MajorProduct/>}> </Route> 
                        <Route exact path='/MainArtical' element={<MainArtical/>}> </Route> 
                        
                        <Route element={<CPRoutes/>}>
                        <Route exact path='/AddToCart' element={<AddToCart/>}> </Route>
                        <Route exact path='/OrderNow' element={<OrderNow/>}> </Route>
                        <Route exact path='/CustomerOrderDetails' element={<CustomerOrderDetails/>}> </Route>
                        <Route exact path='/OrderHistory' element={<OrderHistory/>}> </Route>
                        <Route exact path='/CustomerRating' element={<CustomerRating/>}> </Route>
                        <Route exact path='/ProfileUser' element={<ProfileUser/>}> </Route>
                        </Route>
                        
                       



                        <Route exact path='/AboutUs' element={<AboutUs/>}> </Route>
                        <Route exact path='/PaymentPolicies' element={<PaymentPolicies/>}> </Route>
                        <Route exact path='/FAQSModernMorven' element={<FAQSModernMorven/>}> </Route>
                        <Route exact path='/ModernMorvenShipment' element={<ModernMorvenShipment/>}> </Route>
                        <Route exact path='/ReturnPolicies' element={<ReturnPolicies/>}> </Route>
                        <Route exact path='/ModernMorvenContact' element={<ModernMorvenContact/>}> </Route>
                   
                       
                        


                   
                       
                        <Route exact path='/ForgetPassword' element={<ForgetPassword/>}> </Route>
                        <Route exact path='/CustomerRegistration' element={<CustomerRegistration companyCopyRight="© 2022-2023,ModernMorven.com"/>}> </Route>
                        <Route exact path='/Customerlogin' element={<Customerlogin companyCopyRight="© 2022-2023,ModernMorven.com"/>}> </Route>

                       
                      </Routes>
    </BrowserRouter>

   


  </>
  );
}

export default App;

