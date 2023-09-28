import React, { useState } from 'react';
import '../Filescss/Customerlogin.css';
import mmlog from '../Images/mmlog.png';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigateforget = useNavigate();
  const navigatelogin = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  document.title = "Admin Use Only ModernMorven";

  const handleLOGIN = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/AdminLogin", {
        method: "POST",
        body: JSON.stringify({ _id: email, password :password }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.text();
  
        if (data && data !== "invalid credentials") {
          localStorage.setItem('Admin', data);
          navigatelogin("/AdminDashboard");
          
        } else {
          setErrorMessage("Invalid credentials");
        }
      } else {
        setErrorMessage("Request failed with status:", response.status);
      }
   
      
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  const handleForgetPasswordClick = () => {
    navigateforget("/AdminForgetPassword");
  }

  setTimeout(() => {
    setErrorMessage(null);
  }, 3000);
  return (
    <div className="upper_main_div_width_height">
      <div className="login-main-container">
        <div className="logohandler">
          <img src={mmlog} alt="ModernMorven" />
        </div>
        <div className="back-container-mouterbox">
          <div className="mouterbox">
            <form className="loginform" onSubmit={handleLOGIN} >
              <input
                type="email"
                value={email}
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
              required/>
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(event) => setPassword(event.target.value)}
              required/>
               {errorMessage && <p className="error-message text-danger mx-3 ">{errorMessage}</p>}
              <button type="submit"  >Sign in</button>
             
            </form>
            <button type="reset" onClick={handleForgetPasswordClick}>Forget Password?</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

