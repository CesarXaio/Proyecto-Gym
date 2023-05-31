import React, {useState} from "react";
import './TarjetaUser.css'
const Usuarios = (props) => {
    const{nombreUsuario, apellidUsuario, cedula, telefono} = props;
    return (
        <div>
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
        </div>
    )
}
export default Usuarios;