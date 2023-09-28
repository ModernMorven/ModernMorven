
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';


function  AdminForgetPassword() {
  const nevigate=useNavigate();
  const [action, setaction] = useState('');
  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [loader, setloader] = useState('off');
 const [OTPerrormessage, setOTPerrormessage] = useState('');
  const [otp, setOtp] = useState('');
const [generatenum, setgeneratenum] = useState('');
const [password, setpassword] = useState('');
const [confirmpassowrd , setconfirmPassword]=useState("");
const [passworderror, setpassworderror] = useState('');
const [passcolour, setpasscolour] = useState('');
 
const checkingOTP=(e)=>{
e.preventDefault();
  if (String(otp) === String(generatenum)){
    setaction("newpass");
  }
  else{
    setOTPerrormessage(`Invalid OTP`);
  }
}

const [inputTime, setInputTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {

      setInputTime((prevCount) => prevCount - 1);
    }, 1000); // Update every 1 second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if(inputTime<0){
      setInputTime(0);
      setaction('')

    }
  }, [inputTime]);



  const sendingverificationmail=async(e)=>{
    e.preventDefault();
    setloader('on')
 if(!email){
  setemailerror("please enter email address");
  setloader('off')
  return
 }
 else{
    try {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
          const randomString = randomNumber.toString();
         setgeneratenum(randomString);
         const response=await fetch("https://backendapi.modernmorven.com/Admin/SEND/TOKEN",{
           method:"POST",
           body:JSON.stringify({"key":email,"value":randomString}),
           headers:{
             "Content-Type":"application/Json"
           }
         })
         let data=await response.json();
         if(response.ok &&!data.message){
          setloader('off')
          setpassworderror("The OTP has been successfully sent.");
          setpasscolour("success");
            setaction('OTP');
            setInputTime(120);
          
         }
         else{
          setpassworderror(data.message);
          setpasscolour("danger")
           setloader('off')
          
         }
      }
    catch (error) {
      setemailerror(`${error}`);
      setloader('off')
    }
  }
    
   }
 
  const changepassword=async(e)=>{
    e.preventDefault();
    setloader('on');
    if (!password || !confirmpassowrd )  {
      setpassworderror("Empty Fields found") ;
      setpasscolour("danger");
      setloader('off')
      return
    }
    else{

    if(password===confirmpassowrd){
      setloader('on');
      try {
        const response= await fetch("https://backendapi.modernmorven.com/Admin/SEND/UPDATE",{
          method:'post',
          body: JSON.stringify({"key":email,"value":password}),
          headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        if(response&&!data.message){
          setloader('off')
            setpassworderror("Updated SuccessFully");
            setpasscolour("success")
            setTimeout(() => {
              nevigate('/AdminLogin')
            }, 3000);
        }
        else{
          setpassworderror("ERROR while Updating");
          setpasscolour("danger");
          setloader('off')
        }
      } catch (error) {
        setloader('off');
        console.log(`error API ${error}`);
        setpassworderror("UNKNOWN ERROR");
        setpasscolour("danger");
      }
    }
    else{
      setloader('off');
      setpassworderror("Passwords do not match");
      setpasscolour("danger");
    }
  }

  }


setTimeout(() => {
  setemailerror('');
}, 7000);
  
setTimeout(() => {
  setpassworderror('');
}, 8000);
  return (
    <>
     {passworderror&&  <div className={`alert alert-${passcolour}`}>{passworderror}</div>}

    {action==='newpass'?(<>
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-flex">
                                <div className="flex-grow-1 bg-password-image">
                                </div>
                            </div>
                               <div className="col-lg-9">
                                  <div className="p-3">
                                     <div className="text-center">
                                          <h4 className="text-dark mb-4">Change Your Password</h4>
                                           <p className="mb-4">Please enter the new password here</p>
                                       </div>
                                    <form className="user d-block" >
                                      <div className="mb-4">
                                         <input className="form-control form-control-user w-100 mb-3" type="password" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="new password" onChange={(e)=>{setpassword(e.target.value)}}/>
                                         <input className="form-control form-control-user w-100" type="password" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="R-type password" onChange={(e)=>{setconfirmPassword(e.target.value)}}/>
                                        
                                      </div>
                                            <button className="btn btn-primary d-block btn-user w-50 mb-3" type="submit" onClick={changepassword}>{loader==='off'?(<>save
                                            </>):(<><span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                                     <span role="status" className='text-light m-1'>Updating...</span>
                                            </>)}</button>
                                    </form>
               
                </div>
       </div>
          </div>
             </div>
               </div>
                  </div>
                    </div>
                      </div>
    
    </>):action==="OTP"?(<>
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-flex">
                                <div className="flex-grow-1 bg-password-image">
                                </div>
                            </div>
                               <div className="col-lg-9">
                                  <div className="p-3">
                              




                                      
                                     <div className="text-center">
                                          <h4 className="text-dark mb-4">Verification</h4>
                                           <p className="mb-4">Please enter four digit OTP send to your email address</p>
                                       </div>
                                    
                                      <form className="user d-block" >
                                      <div className="mb-4 ">
                                      <OtpInput 
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={5}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} 
                                         />}
                                         
                                      />
                                       
                                      <span htmlFor="otpInput" className='text-secondary mb-1 mt-1'>OTP will expire in {inputTime !== null ? `${inputTime} seconds` : 'Not set'}</span><br/>
                                                                    
                                      {OTPerrormessage&&(<><label htmlFor="otpInput" className='text-danger'>{OTPerrormessage}</label></>)}
                                      </div>
                                            <button className="btn btn-success d-block btn-user w-50 mb-3 " onClick={checkingOTP} type="submit">{loader==='off'?(<>Submit
                                            </>):(<><span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                                     <span role="status" className='text-light m-1'>Processing...</span>
                                            </>)}</button>
                                    </form>
                                    
                
                </div>
       </div>
          </div>
             </div>
               </div>
                  </div>
                    </div>
                      </div>







    </>):(<>
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-flex">
                                <div className="flex-grow-1 bg-password-image">
                                </div>
                            </div>
                               <div className="col-lg-9">
                                  <div className="p-3">
                                     <div className="text-center">
                                          <h4 className="text-dark mb-4">Forgot Your Password?</h4>
                                           <p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a OTP to reset your password!</p>
                                       </div>
                                    <form className="user d-block" >
                                      <div className="mb-4">
                                         <input className="form-control form-control-user w-100" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" onChange={(e)=>{setemail(e.target.value)}}/>
                                        {emailerror&&<label htmlFor="form-control " className='text-danger'>{emailerror}</label>}
                                      </div>
                                            <button className="btn btn-warning d-block btn-user w-50 mb-3 text-light" type="submit" onClick={sendingverificationmail}>{loader==='off'?(<>Reset Password
                                            </>):(<><span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                                     <span role="status" className='text-light m-1'>Searching...</span>
                                            </>)}</button>
                                    </form>
            
                            <div className="text-center"><Link className="small" to="/AdminLogin">Already have an account? Login!</Link>
                        </div>
                </div>
       </div>
          </div>
             </div>
               </div>
                  </div>
                    </div>
                      </div>
    </>)}
     
     
    </>
  );
}

export default  AdminForgetPassword;
