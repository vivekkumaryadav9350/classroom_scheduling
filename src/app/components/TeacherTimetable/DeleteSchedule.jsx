"use client";

import "../../styles/DeleteSchedule.css";

export default function DeleteSchedule({
  isOpen,
  onClose,
  onConfirm,
}) {

  if (!isOpen) {
    return null;
  }


  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">


        

        <div className="delete-modal-icon">
          !
        </div>


      

        <h2>
          Delete Schedule?
        </h2>


   

        <p>
          Are you sure you want to delete this
          schedule? This action cannot be undone.
        </p>


    

        <div className="delete-modal-buttons">


          <button
            type="button"
            className="cancel-delete-btn"
            onClick={onClose}
          >
            Cancel
          </button>


          <button
            type="button"
            className="confirm-delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>


        </div>

      </div>

    </div>
  );
}