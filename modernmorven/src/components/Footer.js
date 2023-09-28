import React, { useEffect, useState } from 'react';
import '../Filescss/Footer.css'
import { Link } from 'react-router-dom';
function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
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
      <div className="footer-main-body">
              <div className="link-main-container">
                {windowWidth>=500?(<>
                
                
                  <div className="section-container">
                                <div className="section-link-container">
                                    <h4>HELP</h4>
                                    <Link to="/AboutUs"><div className="fa fa-info" arial-hidden="true"> AboutUs</div>  </Link><br/>
                                    <Link to="/PaymentPolicies"><div className="fa fa-money" arial-hidden="true"> Payment Information</div>  </Link><br/>
                                    <Link to="/ModernMorvenShipment"><div className="fa fa-truck"> Shipping Information</div></Link><br/>
                                    <Link to="/FAQSModernMorven"><div className="fa fa-question-circle"> FAQs</div></Link><br/>
                                    <Link to="/ReturnPolicies"><div className="fa fa-exchange"> Return Policies</div></Link><br/>
                                    <Link to="/ModernMorvenContact"><div className="fa fa-phone"> Contact Us</div></Link>
                           

                                </div>
                      </div>
                          <div className="section-container">
                                    <div className="section-link-container">
                                        <h4>Social Media</h4>
                                        <a href="http://"><div className="fa fa-facebook"> Facebook</div> </a><br/>
                                        <a href="http://"><div className="fa fa-twitter"> Twitter</div> </a><br/>
                                        <a href="http://"><div className="fa fa-instagram"> Instagram</div></a><br/>
                                        <a href="http://"><div className="fa fa-snapchat"> Snapchat</div></a><br/>
                                        <a href="http://"><div className="fa fa-youtube"> Youtube</div></a><br/>
                                        <a href="http://"><div className="fa fa-linkedin"> Linkdin</div></a><br/>
                                        <a href="http://"><div className="fa fa-tiktok fa-2xl"> TikTok</div></a><br/>
                                      
                                        {/* <a href="http://">Threads</a><br/> */}
                                        </div>

                            </div>
                                        <div className="section-container">
                                            <div className="section-link-container">
                                                <h4>Registered Address</h4>
                                                <a href="http://" target="_blank" rel="noopener noreferrer"><div className="fa fa-building"> ModernMorven Pvt Limited Khauta Road Zone V Capital Territory Islamabad, Pakistan</div></a>
                                            </div>
                                      </div>
                
                
                
                </>):(<>
                  <div className="section-container">
                                <div className="section-link-container">
                                    <h4>HELP</h4>
                                    <Link to="/AboutUs"><div className="fa fa-info" arial-hidden="true"> AboutUs</div>  </Link><br/>
                                    <Link to="/PaymentPolicies"><div className="fa fa-money" arial-hidden="true"> Payment Information</div>  </Link><br/>
                                    <Link to="/ModernMorvenShipment"><div className="fa fa-truck"> Shipping Information</div></Link><br/>
                                    <Link to="/FAQSModernMorven"><div className="fa fa-question-circle"> FAQs</div></Link><br/>
                                    <Link to="/ReturnPolicies"><div className="fa fa-exchange"> Return Policies</div></Link><br/>
                                    <Link to="/ModernMorvenContact"><div className="fa fa-phone"> Contact Us</div></Link>
                           

                                </div>
                             
                      </div>
                      <div className="section-container ">
                                    <div className="section-link-container">
                                        <h4>Social Media</h4>
                                        <a href="http://"><div className="fa fa-facebook"> Facebook</div> </a><br/>
                                        <a href="http://"><div className="fa fa-twitter"> Twitter</div> </a><br/>
                                        <a href="http://"><div className="fa fa-instagram"> Instagram</div></a><br/>
                                        <a href="http://"><div className="fa fa-snapchat"> Snapchat</div></a><br/>
                                        <a href="http://"><div className="fa fa-youtube"> Youtube</div></a><br/>
                                        <a href="http://"><div className="fa fa-linkedin"> Linkdin</div></a><br/>
                                        <a href="http://"><div className="fa fa-tiktok fa-2xl"> TikTok</div></a><br/>
                                      
                                        {/* <a href="http://">Threads</a><br/> */}
                                        </div>

                            </div>
                      
                      
                      
                      </>)}

             

                </div>
                
                <div className="copyright-container">
                      <h5>© 2022-2023 All Rights Reserved by ModernMorven.com</h5>
                      </div>
      </div>
    </>
  );
}

export default Footer;
