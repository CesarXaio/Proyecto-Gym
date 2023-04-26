import React from 'react';
import "./Tarjetas.css"
const Tarjetas = (props) => {
  const { bebida, precio, imagen } = props; // Desestructuramos las props recibidas

  return (
    <div className="tarjetas">
      
      <img src={imagen} className="tarjetas__imagen" />
      {/*
      <h3>{bebida}</h3>
      <p>{precio} Gs</p>
      <button>Añadir al carrito</button>
      */}
    </div>
  );
};


export default Tarjetas;
