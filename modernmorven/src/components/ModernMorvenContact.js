import React from 'react';
import '../Filescss/ModernMorvenContact.css';

function ModernMorvenContact () {
  return (
  <>
 

    <div className="modern_morven_contact">
      <h1 className="heading">Contact Us - Modern Morven</h1>
      <p className="contact-description">
        We welcome your inquiries, feedback, and suggestions. If you have any questions or need
        assistance, please don't hesitate to get in touch with us. Our dedicated support team is here
        to help you.
      </p>

      <div className="contact-info">
        <h2>Contact Information:</h2>
        <p>
          <strong className='text-primary'>Customer Support Email:</strong> support@modernmorven.com
          <br />
          <strong className='text-primary'>Customer Support Phone  :  <div className="fa fa-whatsapp text-success"></div></strong> +923155895316
          <br />
          <strong className='text-primary'>Business Inquiries Phone:  <div className="fa fa-whatsapp text-success"></div></strong> +923185601133
        </p>
      </div>

      <div className="office-address">
        <h2>Office Address:</h2>
        <p>
          Modern Morven Inc.
          <br />
          Zone V Capital Territory
          <br />
           Islamabad,
          <br />
          Pakistan
        </p>
      </div>

      <div className="working-hours">
        <h2>Working Hours:</h2>
        <p className='text-success'>
           Monday to Sunday : 9:00 AM to 5:00 PM GMT+5
          <br />
          
        </p>
      </div>

      {/* <div className="support-ticket">
        <h2>Support Ticket:</h2>
        <p>
          For specific inquiries or technical support, you can also submit a support ticket through
          your account. Our support team will respond to your ticket as soon as possible.
        </p>
      </div> */}

      <div className="social-media">
        <h2>Social Media:</h2>
        <p>
          Stay updated on the latest news, promotions, and product launches by following us on social
          media:
          <br />
          <strong className='text-primary'>Facebook:</strong> facebook.com/modernmorven
          <br />
          <strongv className='text-primary'>Twitter:</strongv> twitter.com/modernmorven
          <br />
          <strong className='text-primary'>Instagram:</strong> instagram.com/modernmorven
        </p>
      </div>

      <div className="feedback-suggestions">
        <h2>Feedback and Suggestions:</h2>
        <p>
          We value your feedback and suggestions to enhance your shopping experience. Feel free to
          share your thoughts through our feedback form on the website or by sending an email to
          feedback@modernmorven.com.
        </p>
      </div>

      <div className="wholesale-inquiries">
        <h2>Wholesale and Business Inquiries:</h2>
        <p>
          For wholesale inquiries or collaboration opportunities, please contact our business team
          through the provided email or phone number.
        </p>
      </div>

      <p className="contact-conclusion">
        We appreciate your interest in Modern Morven and look forward to serving you with the best
        possible assistance.
      </p>
    </div>

    </>
  );
};

export default ModernMorvenContact;
