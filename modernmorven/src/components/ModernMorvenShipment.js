import React from 'react';
import '../Filescss/ModernMorvenShipment.css';

const ModernMorvenShipment = () => {
  return (
    <div className="modern-morven-shipment">
      <h1 className="heading">Modern Morven Shipment Policies</h1>
      <div className="shipment-item">
        <h2 className="shipment-question">1. Shipping Areas:</h2>
        <p className="shipment-answer">
          We currently offer shipping services all over Pakistan. Customers residing in Pakistan 
          can place orders and have them delivered to their specified address.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">2. Shipping Methods:</h2>
        <p className="shipment-answer">
          We utilize a combination of reliable shipping carriers and methods to ensure efficient and
          safe delivery of products. The shipping method may vary depending on the size, weight, and
          nature of the items ordered.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">3. Delivery Time:</h2>
        <p className="shipment-answer">
          We aim to dispatch orders as quickly as possible. The estimated delivery time will be
          provided during the checkout process, and it may vary based on the destination and the
          availability of the product. Customers can track their orders using the provided tracking
          number.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">4. Shipping Fees:</h2>
        <p className="shipment-answer">
          Shipping fees are calculated based on the destination, weight, and dimensions of the package.
          During the checkout process, customers will see the applicable shipping charges before
          confirming their order.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">5. Order Processing Time:</h2>
        <p className="shipment-answer">
          Once an order is placed, our team works diligently to process it promptly. Order processing
          times may vary depending on the availability of the product and order volumes. Customers will
          receive an email confirmation with the estimated processing time after placing the order.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">6. Delivery Delays:</h2>
        <p className="shipment-answer">
          While we make every effort to deliver orders on time, certain unforeseen circumstances like
          weather conditions, natural disasters, or transportation delays may cause delivery delays. In
          such cases, we will keep customers informed of any changes to their delivery schedule.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">7. Order Tracking:</h2>
        <p className="shipment-answer">
          Customers can track their orders by logging into their Modern Morven account and visiting the
          "Order History" section. Once the order is dispatched, customers will receive a tracking
          number in OrderHistory section to monitor the delivery status.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">8. International Shipping:</h2>
        <p className="shipment-answer">
          As of now, we do not offer international shipping. Our focus is on serving the local Morven
          region. However, we are continuously evaluating options to expand our services in the future.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">9. Split Shipments:</h2>
        <p className="shipment-answer">
          In some cases, if an order includes multiple items and one or more items are not available
          immediately, we may split the shipment. Customers will receive partial deliveries for the
          available items, and the rest will be shipped as soon as they become available.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">10. Package Handling:</h2>
        <p className="shipment-answer">
          To ensure the safety of products during transit, we take great care in packaging items
          securely. Fragile items are appropriately wrapped and labeled to avoid damage during shipping.
        </p>
      </div>

      <div className="shipment-item">
        <h2 className="shipment-question">11. Returns and Refunds:</h2>
        <p className="shipment-answer">
          If customers encounter any issues with their shipped items, they can refer to our "Return
          Policy" page for instructions on initiating a return. We are committed to resolving any
          shipping-related concerns promptly.
        </p>
      </div>
    </div>
  );
};

export default ModernMorvenShipment;
