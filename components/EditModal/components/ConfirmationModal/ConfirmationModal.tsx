import React from 'react';
import './ConfirmationModal.css';

export const ConfirmationModal = ({confirmationData}) => {
  
  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-content">
        <div className="confirmation-message"> 
          {confirmationData.type === 'cancel' ? 
            'Are you sure you want to quit without saving?' 
            : 
            'Do you want to save changes?'
          } 
        </div>
        <div className="edit-modal-footer">
          <div className="edit-modal-button-container">
            <button className="edit-modal-cancel-button" onClick={() => confirmationData.res()}>Yes</button>
          </div>
          <div className="edit-modal-button-container">
            <button className="edit-modal-save-button" onClick={() => confirmationData.rej()}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}