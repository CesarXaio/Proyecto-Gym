import React, {useState} from "react";
import './TarjetaUser.css'
const Usuarios = (usuario) => {
    return (
        <div>
          <div className="tarjetas">
            <div>{usuario.name}</div>
            <div>{usuario.lastname}</div>
            <div>{usuario.telefono}</div>
          </div>
        </div>
    )
}
export default Usuarios;
