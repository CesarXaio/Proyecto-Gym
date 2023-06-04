import React, {useState} from "react";
import './TarjetaUser.css'
const checkEstadoMembresia = (estado) => {
  if (estado === 0) {
    return <button className="botonPagado">pagado</button>;
  } else if (estado === 1) {
    return <button className="botonPendiente">pronto a vencer</button>;
  } else if (estado === 2){
    return <button className="botonVencido">vencido</button>;
  } else {
    return "invalida"}
};
const Usuarios = ({usuario, key})  => {
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
