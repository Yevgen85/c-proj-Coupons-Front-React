import React, { useEffect } from 'react';
import './Alert.css';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="alert">
      <div className="message">{message}</div>
      <button className="close" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Alert;