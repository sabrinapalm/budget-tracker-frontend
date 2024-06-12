import React, { useEffect } from 'react';

const Snackbar = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return <div className={`snackbar ${message ? 'show' : ''}`}>{message}</div>;
};

export default Snackbar;
