
import React,{useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import ProfileButton from'./ProfileButton'
import '../Filescss/Navbar.css'
import searchlogo from '../Images/searchlogo.svg';
import PROFILE from '../Images/PROFILE.svg';
import NavLogo from '../Images/NavLogo.svg';
import ADDTOCART from '../Images/ADDTOCART.svg';

function Navbar() {
  // count state usse to count cart item of user
  const [Count, setCount] = useState("0");
  const [isExpanded, toggleExpansion] = useState(false);
  let verification= localStorage.getItem('user');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
  let Storedname="Modern Morven";
 

 useEffect(() => {
   if(verification){
    toggleExpansion(true);
    findCartTotalItems();
   

   }
 }, [verification]);
  const nevigate=useNavigate();
  const togocart=()=>{
   nevigate("/AddToCart");
  }

  const findCartTotalItems=async()=>{
    const StoredUser= JSON.parse(localStorage.getItem('user'))._id;
     
    try{
      const respond= await fetch("http://backendapi.modernmorven.com/api/searchcart",{
        method:"post",
        body: JSON.stringify({"key":StoredUser}),
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(respond.ok){
        const data= await respond.text();

        setCount(data);
      }

    }
    catch(error){
      console.log(error);
    }
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // Add a resize event listener to update the windowWidth state
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  return (
    <>
     <div className="navbar-main-container">
          <div className="logo-container">
              <div className="logo-div">
              <Link to="/">  <img src={NavLogo} alt="Modern Morven Logo" /></Link>
              </div>
          </div>


            <div className="input-tag-main-container">
                  
                   <form className=" form-container" role="search">
                        <input className="inputform" type="search" placeholder="search here" aria-label="Search"/>
                        <button className="button-icon" type="submit"><div className="imagehandle"><img src={searchlogo} alt="" /></div></button>
                  </form>
           </div>



            <div className="profile-addtocart-main-div">
              {/* display add-to-cart  and profile we create same className="main-container-icons-handle"  */}
                    <div className="main-container-icons-handle">
                      
                    
                    <button  onClick={togocart}>
                         
                         
                             
                            {/* <Link to="/AddToCart"></Link>  */}
                                 <div className="icons-imagehandler"><img src={ADDTOCART} alt="" /></div> 
                                <div className="add-to-cart-count">{Count}</div>
                                
                          </button>
                         
                         
                          
                    </div>
                    



             {windowWidth>=1100?(<>
              <div className="main-container-icons-handle ">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false"><div className="icons-imagehandler"><img src={PROFILE} alt=" profile icon" /></div></button>
                        <div className="dropdown">
                            <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/ProfileUser">My Profile</Link></li>
                            <li><Link className="dropdown-item" to="/OrderHistory"> Orders History </Link></li>
                             {isExpanded ?
                            <li><Link className="dropdown-item" ><button onClick={()=>{localStorage.removeItem('user') ; nevigate("/MainArtical")}}> Sign out</button></Link></li>:
                            <li><Link className="dropdown-item" to="/Customerlogin"><button> Sign in</button></Link></li> 
                           
                          
                             }  </ul>
                        </div>



                   
                    </div>
             
             </>):(<>
              <div className="main-container-icons-handle ">
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><div className="icons-imagehandler"><img src={PROFILE} alt=" profile icon" /></div></button>
                          {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button> */}

                        <div className="offcanvas offcanvas-end w-50 h-100 "  tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                          <div className="offcanvas-header mx-3">
                            <h5 className="offcanvas-title mx-3" id="offcanvasRightLabel">{Storedname}</h5>
                            <button type="button " className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                          <div className="offcanvas-body">
                            

                           
                          <Link className="dropdown-item" to="/ProfileUser">My Profile</Link>
                                <Link className="btn" to="/OrderHistory"> Orders History </Link><br/>
                             {isExpanded ?
                          (  <Link className="btn dropdown" ><button onClick={()=>{localStorage.removeItem('user') ; nevigate("/MainArtical")}}> Sign out</button><br/></Link>):
                            (<Link className="btn dropdown" to="/Customerlogin"><button> Sign in</button><br/></Link>)
                           
                          
                             }  
                      


                          </div>
                        </div>
              </div>
             </>)}
                   
            </div>

     </div>

  

     
    </>
  );
}

export default Navbar;

