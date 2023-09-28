import React from 'react';
import '../Filescss/PaymentPolicies.css';

const PaymentPolicies = () => {
  return (
    <>
    <div className="payment_upper_div">
    <div className="payment-policies">
      <h2>Payment Policies</h2>
      <h3>Online Payment</h3>
      <p>
        We offer secure and convenient online payment options through <strong style={{ color: "#0f176d" }}>EasyPaisa</strong>, <strong style={{ color: "#0f176d" }}>JazzCash</strong>, and <strong style={{ color: "#0f176d" }}>Visa/Master cards</strong>. 
        Your payment information is encrypted and securely processed to ensure the safety of your transactions.
      </p>

      <h3>How to Pay Online</h3>
      <p>
        To pay online for your order, follow these steps:
      </p>
      <ol>
        <li>Choose the desired product and click on the <strong style={{ color: "#0f176d" }}>"Order Now"</strong> button.</li>
        <li>Enter your basic information for delivery purposes.</li>
        <li>Select your preferred payment option: <strong style={{ color: "#0f176d" }}>EasyPaisa</strong>, <strong style={{ color: "#0f176d" }}>JazzCash</strong>, or <strong style={{ color: "#0f176d" }}>Visa/Master card</strong>.</li>
        <li>If you choose <strong style={{ color: "#0f176d" }}>EasyPaisa</strong> or <strong style={{ color: "#0f176d" }}>JazzCash</strong>, enter your phone number associated with your account.</li>
        <li>If you choose <strong style={{ color: "#0f176d" }}>Visa/Master card</strong>, enter your card details including card number, expiration date, and CVV code.</li>
        <li>Click on the <strong style={{ color: "#0f176d" }}>"Checkout"</strong> button to proceed with the payment.</li>
      </ol>

      <h3>Payment Confirmation</h3>
      <p>
        Once you have completed the payment, you will receive a confirmation email/SMS 
        containing the details of your transaction and order. 
        If you face any issues with your payment or need further assistance, 
        feel free to contact our customer support team.
      </p>

      <h3>Delivery Time</h3>
      <p>
        After successful payment verification, your order will be processed and dispatched within 1-2 business days. 
        The estimated delivery time is 4 to 6 working days from the date of dispatch. 
        Please note that delivery time may vary based on your location and any unforeseen circumstances.
      </p>
    </div>
    </div>


    </>
  );
};

export default PaymentPolicies;
