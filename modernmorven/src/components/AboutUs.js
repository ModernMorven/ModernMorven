import React from 'react';
import '../Filescss/AboutUs.css'
import CEO from '../Images/CEO.svg'
import MMCEO from '../Images/MMCEO.svg'
function AboutUs() {
  return (
    <>
 <div className="aboutus_div">
 <div className="aboutus_main_div">
  <h2>Welcome to <strong className="highlight">ModernMorven</strong> - Your Unique Brand in Pakistan!</h2>

  <div>
  <strong className="highlight">ModernMorven Brand Owner</strong>
    <div className="div">
  <div className="col-12 col-sm-6 col-lg-4 mb-4 text-center"><img className="rounded-circle   img-fluid d-block mx-auto" src={CEO} />
    <h3 className="m-0">M.Mudassar</h3>
    <h5 className="my-1">Founder</h5>
</div>
  <div className="col-12 col-sm-6 col-lg-4 mb-4 text-center"><img className="rounded-circle img-fluid d-block mx-auto" src={MMCEO} />
    <h3 className="m-0">Muhammad Ali</h3>
    <h5 className="my-1">CEO</h5>
  
</div>
</div>
    <h2>About Us:</h2>
    <p>
      <span className="highlight">ModernMorven</span> is a pioneering local e-commerce brand in Pakistan, led by seasoned entrepreneurs, Muhammad Ali and Muhammad Mudassar. With over 10 years of valuable experience in the digital world, our brand is committed to revolutionizing the way you shop online.
    </p>
  </div>

  <div>
    <h2>Our Vision:</h2>
    <p>
      At <span className="highlight">ModernMorven</span>, we strive to make high-quality products accessible to everyone in Pakistan at <span className="highlight">remarkably low rates</span>. We firmly believe that top-notch products shouldn't come at exorbitant prices, and it is our mission to redefine the e-commerce landscape by providing our customers with unparalleled value for their money.
    </p>
  </div>

  <div>
    <h2>Our Unmatched Promise:</h2>
    <p>
      We take immense pride in being the <span className="highlight">only brand in Pakistan</span> that consistently offers products at prices <span className="highlight">lower than the market rates</span>. We believe in transparency and honesty, and we're committed to ensuring that our customers get the best deals possible without compromising on quality.
    </p>
  </div>

  <div>
    <h2 >Partnerships :</h2>
    <p>
      As a testament to our commitment to excellence, we are in close partnership with <span className="highlight text-primary">Creative Times Electronics LLC</span>, a renowned name in the industry. This collaboration allows us to bring you an extensive range of cutting-edge products that cater to your diverse needs.
    </p>
  </div>

  <div>
    <h2>Nationwide Supply Chain:</h2>
    <p>
      <span className="highlight">ModernMorven</span> has established a robust supply chain network, stretching across Pakistan. Our strategic distribution centers enable us to deliver products to your doorstep promptly and efficiently, no matter where you reside in the country.
    </p>
  </div>

  <div>
    <h2>Quality Assurance:</h2>
    <p className='myclass'>
      We understand the importance of quality in your shopping experience, and that's why we go to great lengths to ensure that each product we offer meets the <span className="highlight">highest standards</span>. Every item in our inventory undergoes stringent quality checks to guarantee your satisfaction.
    </p>
  </div>

  <div>
    <h2>Join the ModernMorven Community:</h2>
    <p>
      We welcome you to join our ever-growing community of satisfied customers who have experienced the joy of receiving top-quality products at <span className="highlight">unbeatable prices</span>. Shop with confidence and discover the modern way of online shopping.
    </p>
  </div>

  <div>
    <h2>Contact Us:</h2>
    <p>
      For any queries, feedback, or support, our dedicated customer service team is available to assist you. Feel free to reach out to us through our contact page, and we'll be more than happy to help.
    </p>
  </div>

  <div>
    <h3>At ModernMorven, we're not just an e-commerce brand; we are a movement dedicated to changing the face of online shopping in Pakistan. Come, be a part of the ModernMorven family, and experience shopping like never before!</h3>
  </div>


  </div>
  </div>
    </>
  );
}

export default AboutUs;
