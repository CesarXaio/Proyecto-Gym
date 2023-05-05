import React, { useState } from 'react';
import "./Tarjetas.css"

const Tarjetas = (props) => {
  const { bebida, precio, imagen } = props; // Desestructuramos las props recibidas
  const [cantidad, setCantidad] = useState(0); // Agregamos un estado para la cantidad
  const [mostrarBotones, setMostrarBotones] = useState(false); // Estado local para mostrar/ocultar los botones

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="tarjetas">
      <img className='tarjetas__imagen' src={imagen} alt="Producto" />
      <div className="Botones">
        <button className="Boton-Disminuir" onClick={disminuirCantidad}>-</button>
        <div className="Cantidad">{cantidad}</div>
        <button className="Boton-Aumentar" onClick={aumentarCantidad}>+</button>
      </div>
      <button className="Agregar">Agregar</button>
    </div>
  );
};

export default Tarjetas;
