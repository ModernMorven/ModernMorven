import React,{useState} from 'react';
import '../Filescss/Customerlogin.css'
import mmlog from '../Images/mmlog.png';
import { Link ,useNavigate} from 'react-router-dom';
// import CustomerRegistration from './CustomerRegistration'
 function Customerlogin(props) {
  document.title=" Login Page-ModernMorven"
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [resultmessage, setresultmessage] = useState('');
  const navigate= useNavigate();
   const forget=useNavigate();

const [loader, setloader] = useState('off');

  const gotoforgetpassword=()=>{
     forget("/ForgetPassword")
  }
  const HANDLECLOGIN=async(event)=>{
    event.preventDefault();
  try{
    setloader("on");
    const result= await fetch("http://backendapi.modernmorven.com/customerlogin",{
      method:"POST",
      body: JSON.stringify({ _id: email, password :password }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(result.ok){
      const data= await result.text();

    if(data&& data!=="No Data Found"){

      localStorage.setItem('user',data);
      navigate('/MainArtical');}
    

    else{
      console.log('first', JSON.stringify(result))
      setresultmessage("No Data Found ")
      setloader("off");
    }
  }
  else {
    setresultmessage("Request failed with status:", result.status);
  }
  }
  catch(error){
    setresultmessage(`ERROR While LOGIN ${error}`)
  }

};
setTimeout(() => {
  setresultmessage(null);
}, 4000);
  return (
    <>
    <div className="upper_main_div_width_height">
     <div className="login-main-container">
              <div className="logohandler">
              <img src={mmlog} id=""alt="ModernMorven" />
              </div>
          <div className="back-container-mouterbox">
              <div className="mouterbox">
              
                    
                    <form className="loginform"action="" onSubmit={ HANDLECLOGIN}>
                
                         <input
                type="email"
                value={email}
                placeholder='Email'
                onChange={(event) => setemail(event.target.value)}
              required/>
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(event) => setpassword(event.target.value)}
              required/>
                        {resultmessage&&<label className=" text-danger mx-1 ">{resultmessage}</label>}
                        <button type="submit" > {loader==='off'?(<> Sign in </>):(<>
                          <span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                             <span role="status" className='text-light'>Processing...</span></>)}
                        
                        </button>
                  </form>


                      <button  type="reset" onClick={gotoforgetpassword}>Forget Password?</button>

                      <div className=" logTextUtails" id="logTextUtails">
                        <span>New Customer?  </span>       
                        <Link to="/CustomerRegistration"> Start here</Link> 
                      </div>
                

                      <div className="copyright-login">{props.companyCopyRight}</div>
            
                {/* mouterbox */}
                </div>       
      {/* back-container-mouterbox */}
           </div>
      
      
      
      
      </div>
  </div>
    </>
  );
}


export default Customerlogin;

