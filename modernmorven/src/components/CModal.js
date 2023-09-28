import React, { useState, useEffect } from 'react';

function CModal() {
  const [showModal, setShowModal] = useState(true); // Initially show the modal

  useEffect(() => {
    // Code to be executed when the component is mounted
    // You can use this space for any additional logic you want
    
    // After your logic, you can close the modal if needed
    // setShowModal(false);
  }, []); // The empty dependency array ensures the effect runs only on mount

  return (
    <div>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Your modal content */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CModal;
