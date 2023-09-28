import React, { useRef, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';
// import myvarible from './OrderDetails'
import '../Admincss/OrderInvoice.css'

function OrderInvoice() {

    const currentDate = new Date();
    





   // const myvarible=`Invoice generate date ${currentDate.toLocaleDateString()} After  ${currentDate.toLocaleDateString()} Order Will not return. All copyright reserved by modern morven`;
   const myvarible=`return valid ${currentDate.toLocaleDateString()}`;
   const barcodeRef = useRef(null);
      
        useEffect(() => {
          if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, myvarible, {
              format: 'CODE128', // You can choose other formats like 'EAN13', 'CODE39', etc.
              displayValue: true,

            //   format: 'EAN13',
            //   displayValue: true,
              width: 12, // Set the width of the barcode in inches
              height: 1000, // Set the height of the barcode
              fontSize: 100, // Set the font size of the displayed value
            });
          }
        }, [myvarible]);

  const handleprintpdf=()=>{
    window.print();
  }

          
  return (
    <>
 



      
      <div className="invoice_main_contanier"></div>
     <div className="barcodehandle">
     <svg ref={barcodeRef} /> 
      </div>
      <div className="data_main_container">
      <div className="dataupper_container">
      <div className="data_container">
        <strong>Recipitent Name</strong>
        <strong>Muhammad Mudassar</strong>
      </div>
      <div className="data_container">
     
        <strong>Contact No</strong>
        <span>03155895316</span>
        
      </div>
      <div className="data_container">
     
       
        <strong>Order ID</strong>
        <span>765432345678976</span>
        
      </div>
      <div className="data_container">
     
       
        <strong>Address :</strong>
        <span>Muhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad MudassarMuhammad Mudassar</span>
        
      </div>


{/* dataupper_container */}
      </div>
       <div className="second_container">
        <h4 className='text-dark'>COD</h4>
        <h4 className='text-dark'>PKR 10990</h4>
        <span><strong>Return Address :</strong>
        Khauta Road zone v zain Boys Hostel Islamabad Pakistan 
        </span>
       
       </div>
      </div>
     
     




<button onClick={handleprintpdf}>Create PDF</button>

      
    </>
  );
}

export default OrderInvoice;









