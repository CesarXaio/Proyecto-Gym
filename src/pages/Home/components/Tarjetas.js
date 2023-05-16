import React, { useState } from 'react';
import Mensaje from '../../../Confirmacion/Mensaje';
import "./Tarjetas.css"

const Tarjetas = (props) => {
  const { bebida, precio, imagen } = props; // Desestructuramos las props recibidas
  const [cantidad, setCantidad] = useState(0); // Agregamos un estado para la cantidad
  const [mostrarBotones, setMostrarBotones] = useState(false); // Estado local para mostrar/ocultar los botones
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado local para mostrar/ocultar el mensaje
  const [mensaje, setMensaje] = useState(''); // Estado local para el mensaje

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    
    setMostrarMensaje(true); // Mostrar el mensaje
    setMensaje('Producto agregado con Exito!'); // Actualizar el mensaje
    setTimeout(() => {
      setMostrarMensaje(false); // Ocultar el mensaje después de 2 segundos
      setCantidad(0); // Restablecer la cantidad a 0
    }, 1000);
  };

  //Se encarga de Mostrar los botones al pasar el mouse
  const mostrarBotonesHandler = () => {
    setMostrarBotones(true);
  };

  const ocultarBotonesHandler = () => {
    setMostrarBotones(false);
  };

  return (
    
    <div className="tarjetas" onMouseEnter={mostrarBotonesHandler} onMouseLeave={ocultarBotonesHandler}>
      <img className='tarjetas__imagen' src={imagen} alt="Producto" />
      {mostrarBotones && (
        <div className="Botones">
          <button className="Boton-Disminuir" onClick={disminuirCantidad}>-</button>
          <div className="Cantidad">{cantidad}</div>
          <button className="Boton-Aumentar" onClick={aumentarCantidad}>+</button>
        </div>
      )}
      {mostrarBotones && (
        <button className="Agregar" onClick={agregarAlCarrito}>Agregar</button>
      )}
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </div>
    
  );
};

export default Tarjetas;
