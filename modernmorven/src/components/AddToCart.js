import React, { useState, useEffect } from 'react';
import '../Filescss/AddToCart.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

function AddToCart() {
  const [products, setproducts] = useState([]);
  const [message, setmessage] = useState('');
  document.title = 'ModernMorven-Add-To-Cart';
  const [deletemessage, setdeletemessage] = useState('');
  const [loader, setloader] = useState('off');

  useEffect(() => {
    findCartTotal();
  }, []);

  const findCartTotal = async () => {
    const StoredUser = JSON.parse(localStorage.getItem('user'))._id;

    try {
      setloader("on")
      const respond = await fetch('https://backendapi.modernmorven.com/api/cartitems', {
        method: 'post',
        body: JSON.stringify({ key: StoredUser }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await respond.json();
      if (respond.ok && !data.result) {
        setloader("off")
        setproducts(data);
        
      } else {
        setloader("off")
        setmessage('No Item Added Yet!! 😢');
      }
    } catch (error) {
      setloader("off")
      console.log(error);
      setmessage('Loading error');
    }
  };

  const removefromcart = async (id) => {
    try {
      setloader('on')
      const response = await fetch('https://backendapi.modernmorven.com/apicartremove', {
        method: 'POST',
        body: JSON.stringify({ "key":id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setdeletemessage('Remove Successfully');
        setloader("off")
      }
    } catch (error) {
      console.log(error);
      setloader("off")
    }
  };
  setTimeout(() => {
    setdeletemessage('');
  }, 3000);

  return (
    <>
    <Navbar/>
    {loader==='off'?(<>
      <div className="add_to_cart_main_container">
        <div className="heading_container">
          <div className="image_heading">
            <h5>Product Image</h5>
          </div>
          <div className="title_heading">
            <h5>Product Title</h5>
          </div>
          <div className="priceheading">
            <h5>Price</h5>
          </div>
          <div className="quantity_heading">
            <h5>Quantity</h5>
          </div>
          <div className="buttonheading">
            <h5>Action</h5>
          </div>
        </div>
        {deletemessage && (
          <>
            <div className="alert alert-danger" role="alert">
              {deletemessage}
            </div>
          </>
        )}

        {/* Main content Starts from here */}
        {message && (
          <>
            <p className="error-message text-secondary mx-3 ">{message}</p>
          </>
        )}
        {products.map((item, index) => {
          return (
            <div className="add_tocart_container" key={item.productid}>
              <div className="productimage_container">
                <img src={item.productpicture} alt="product-image" />
              </div>
              <div className="titlecontainer">
                <Link
                  to="/MajorProduct"
                  onClick={() => {
                    localStorage.setItem('token', item.productid);
                  }}
                >
                  <h6>{item.producttitle}</h6>
                </Link>
              </div>
              <div className="pricecontainer">
                <h6>Rs {item.productprice}</h6>
              </div>
              <div className="quantitycontainer">
                <h6>{item.productquantity}</h6>
              

              </div>
              <div className="remove_button_container">
                <button
                  onClick={() => {
                    removefromcart(item._id); // Call the removefromcart function with the product id as an argument
                  }}
                >
                  Remove <div className="fa fa-remove"></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>):(<>
      <div className="text-center loaderclass">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
    
  </div>
  <span className="mx-2">Loading...</span>
</div>
    </>)}
      
    </>
  );
}

export default AddToCart;
