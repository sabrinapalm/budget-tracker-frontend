import React, { useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const FormDialog = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef(null);

  const handleClickOutside = (event) => {
    if (event?.target && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  useOutsideClick(dialogRef, handleClickOutside);

  return (
    <div className={`dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog-overlay" onClick={handleClickOutside}></div>
      <div className="dialog-content" ref={dialogRef}>
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );
};

export default FormDialog;
