import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import "./Mensaje.css"

const Mensaje = ({ mensaje, mostrar }) => {
    useEffect(() => {
      if (mostrar) {
        setTimeout(() => {
          mostrar(false);
        }, 1000); // Ocultar el mensaje después de 2 segundos
      }
    }, [Mensaje]);
  
    return (
    <div className="contenedor">
      <div className={`mensaje ${mostrar ? "visible" : ""}`}>
        <div className="circulo">
            <FontAwesomeIcon icon={faCheck} style={{ color: "#42D976" }}size="10x" />
        </div>
        <div className="texto">{mensaje}</div>
      </div>
    </div>
    );
  };
  
  export default Mensaje;
  