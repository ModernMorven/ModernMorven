
import React,{useEffect, useState}from "react";
import '../Filescss/CustomerRegistration.css'
import mmlog from '../Images/mmlog.png';
import { Link ,useNavigate} from "react-router-dom";
// import Customerlogin from './Customerlogin'

 function CustomerRegistration(props) {
  document.title=" Customer Registration Page-ModernMorven";

const[passwordhash,setpasswordhash]=useState("");
const[message,setmessage]=useState("Password Match");
const[errormessage,seterrormessage]=useState("");
const[passwordhashRetpe,setpasswordhashRetpe]=useState("");
const[passwordhashMatch,setpasswordMatch]=useState(true);
const [name, setname] = useState("");
const [email, setemail] = useState("");
const[loader,setloader] = useState("off");
 const nevigate=useNavigate();

    
const handleSubmit=async(event)=>{
    event.preventDefault();
    if(passwordhash===passwordhashRetpe)
    {    
        setpasswordMatch(true);
         
          try{
            setloader("on")
            const response= await fetch("https://backendapi.modernmorven.com/customersignup",{
              method:"post",
              body: JSON.stringify({ "mail":email,"name":name,"passhash":passwordhash}),
              headers:{
                'Content-Type':'application/json',
              }
    
            })
            const data=await response.json();
            if(response.ok && !data.message)
            {
            localStorage.setItem("user",data);
              alert('Registration Successfull');
              nevigate("/MainArtical")
            }
            else{
              seterrormessage(data.message);
              setloader("off")
            }
           

          }catch(error){
            console.log('Error', error);
            setmessage("ERROR WHILE LOGIN");
            setloader("off")
          }
        
   
    }
    else{
      setmessage("Password doesnot match 😒");
        setpasswordMatch(false);
    }
   

}


setTimeout(() => {
  setmessage(null);
}, 4000);
setTimeout(() => {
  seterrormessage(null);
}, 4000);


  return (
  <>
    
    
          <div className="mychecker_upper_border">
                       <div className="register-mouterbox-m">     
                        <img src={mmlog} id="m-icon-logo"alt="ModernMorven" />
                        {/* close register-mouterbox-m */}      
                         </div>
                <div className="containermycontainer22"> 
                                <form className="registerform" onSubmit={handleSubmit}action="">
                                      <label htmlFor="Full Name">Your Name</label>
                                        <input type="text"  value={name}id="Full Name" onChange={(event)=>{setname(event.target.value)}} required/>
                                        <label htmlFor="Email/Phone no">Email</label>
                                        
                                        <input type="email" value={email} id="Email/Phone no"  onChange={(event)=>{setemail(event.target.value)}}required/>
                                        <label htmlFor="getpasswordhash">Password</label>
                                        <input type="password" id=" getpasswordhash"value={passwordhash} onChange={(event)=>setpasswordhash(event.target.value)} placeholder='At Least 6-8 characters ' required/>

                                        <label htmlFor="getpasswordhash-retype"  >Re-type Password</label>
                                        <input type="password"  id="getpasswordhash-retype" value={passwordhashRetpe} onChange={(event)=>setpasswordhashRetpe(event.target.value)}  required/>
                                            <br/>
                                            {!passwordhashMatch && <p className="text-danger">{message}</p>}
                                            {errormessage&&(<><p className="error-message text-danger">{errormessage}</p></>)}
                                        
                                          <div className="termscheck">
                                                <input  className="i-con-check-box"type="checkbox" id="agree" required />
                                                <span htmlFor="agree" id="i-con-check-box">By creating an account, you agree to ModernMorven  
                                                  <a href="/"> Conditions of Use</a> and  
                                                  <a href="/"> Privacy Notice.</a></span>
                                                  {/* close termscheck */}
                                        </div>
                                                        
                            
                                            <button type="submit">{loader==='off'?(<>Continue</>):(<>  
                                             <span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                                            <span role="status" className='text-light'>Processing...</span>
                                            </>)}</button>
                                </form>
                                
                                      <div className=" checkbox-checker" id="checkbox-checker">
                                            <span>Already have an account?</span>       
                                            <Link to="/Customerlogin"> Sign in</Link>
                                            {/* <Customerlogin/> */}
                                            <div className="bg-border-small-vertical-line">{props.companyCopyRight}</div> 
                                      </div>
                                                  
                </div>
          </div>
     
       
  </>
  );
}


export default CustomerRegistration;
