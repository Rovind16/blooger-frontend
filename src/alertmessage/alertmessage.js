import React, { useEffect } from 'react';
import './alertmessage.css';

const AlertMessage = ({ type, message, onClose }) => {
  useEffect(() => {
    const closeTimer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(closeTimer);
  }, [onClose]);

  const getModalClassName = () => {
    if (type === 'success') {
      return 'modal-success';
    } else if (type === 'error') {
      return 'modal-error';
    } else {
      return 'modal-info';
    }
  };

  return (
    <div className={`modal-overlay ${getModalClassName()}`}>
      <div className="modal-content">
        <p className="modal-message">{message}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
