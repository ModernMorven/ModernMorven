import React from 'react';
import '../Filescss/ReturnPolicies.css';

const ReturnPolicies = () => {
  return (
    <div className="modern-morven-return-policies">
      <h1 className="heading">Modern Morven Return Policies</h1>
      <p className="policy-intro">
        At Modern Morven, we want you to be completely satisfied with your purchase. If, for any
        reason, you are not happy with your product, we offer a 7-day return policy from the date
        of product delivery. Please carefully read and understand the following return policies:
      </p>

      <div className="return-policy-item">
        <h2 className="policy-question">1. Return Timeframe:</h2>
        <p className="policy-answer">
          You have 7 days from the date of product delivery to initiate a return request. Any return
          requests made after this period will not be accepted.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">2. Return Procedure:</h2>
        <p className="policy-answer">
          To initiate a return, please follow these steps:
          <br />
          - Contact our customer support team through our website or helpline and provide your order
          details.
          <br />
          - You will receive a return confirmation along with instructions on how to proceed.
          <br />
          - Package the product securely in its original packaging and attach the invoice received with
          the order.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">3. Refund Eligibility:</h2>
        <p className="policy-answer">
          Refunds will only be issued if the return request is made within the specified 7-day period
          from the date of delivery. The product must be returned to us in its original condition with
          all original accessories and documentation.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">4. Product Condition:</h2>
        <p className="policy-answer">
          The product must remain in its original condition. If the returned product shows any signs of
          damage, wear, alteration, or missing parts, we reserve the right not to issue a refund or to
          deduct an amount from the refund based on the product's condition.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">5. Electronics and Fragile Products:</h2>
        <p className="policy-answer">
          For electronics and fragile products, extra care is essential during the return process.
          Please ensure that these items are packed securely with adequate padding to prevent damage
          during transit.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">6. Refund Process:</h2>
        <p className="policy-answer">
          Once we receive the returned product and verify its condition, we will process your refund.
          The refund will be issued using the same payment method used during the purchase. Please note
          that the refund process may take several business days to reflect in your account.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">7. Non-Refundable Items:</h2>
        <p className="policy-answer">
          Certain products, such as perishable goods, personalized items, or items marked as
          "non-returnable," are not eligible for a refund. Please check the product page for specific
          return eligibility.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">8. Return Shipping Costs:</h2>
        <p className="policy-answer">
          Return shipping costs will be the responsibility of the customer unless the return is due to
          an error on our part, such as sending the wrong item or a defective product.
        </p>
      </div>

      <div className="return-policy-item">
        <h2 className="policy-question">9. Incorrect or Defective Products:</h2>
        <p className="policy-answer">
          If you receive an incorrect or defective product, please contact our customer support
          immediately. We will arrange for the correct item to be sent to you or provide a replacement
          as per the return policy.
        </p>
      </div>

      <p className="policy-conclusion">
        Modern Morven reserves the right to make the final decision on all return requests, refunds, and
        exchanges. We aim to provide exceptional customer service and ensure a smooth return experience
        for our valued customers. If you have any further questions or need assistance, please feel
        free to reach out to our customer support team.
      </p>
    </div>
  );
};

export default ReturnPolicies;
