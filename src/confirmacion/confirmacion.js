import React, { useEffect, useState } from "react";
import "./confirmacion.css";

const ConfirmationMessage = ({ onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(true);


 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    
    <div className={`confirmation-message ${showConfirmation ? 'show' : ''}`}>
      <div className="checkmark">
        <div className="checkmark_stem"></div>
        <div className="checkmark_kick"></div>
      </div>
      <div className="confirmation-text">¡Entrenador agregado con éxito!</div>
      
    </div>
  );
};

export default ConfirmationMessage;
