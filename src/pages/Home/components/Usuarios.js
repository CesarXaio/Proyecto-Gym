import React, { useState } from "react";
import './TarjetaUser.css'
const Usuarios = ({ usuario, key }) => {

  const enviarCaja = () => {
    console.log("Enviando a Caja"); // EN PROCESO
    console.log(usuario);
    let a = 11000;
    let b = a / 11;
    console.log(b);
    //setContadorModal(contadorModal + i);
  };
  const checkEstadoMembresia = (estado) => {
    if (estado === 0) {
      return <button className="botonPagado">pagado</button>;
    } else if (estado === 1) {
      return <button className="botonPendiente" onClick={enviarCaja}>pendiente</button>;
    } else if (estado === 2) {
      return <button className="botonVencido" onClick={enviarCaja}>vencido</button>;
    } else {
      return "invalida"
    }
  };

  return (
    <div>
      <div className="tarjetas">
        <div className="nombreApellido">
          <div className="elementoTarjeta">{usuario.name}</div>
          <div className="elementoTarjeta">{usuario.lastname}</div>
        </div>
        <div className="elementoTarjeta separacion">{usuario.cedula}</div>
        <div className="elementoTarjeta separacion">{usuario.especialidad}</div>
        <div className="elementoTarjeta separacion">{usuario.modalidad}</div>
        <div className="elementoTarjeta separacion">{checkEstadoMembresia(usuario.estadoMembresia)}</div>
      </div>
    </div>
  )
}
export default Usuarios;
