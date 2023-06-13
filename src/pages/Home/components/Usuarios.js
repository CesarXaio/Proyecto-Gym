import React, { useState, useEffect} from "react";
import './TarjetaUser.css'
import DetallesUser from "./modalUsers/DetallesUser"

const Usuarios = ({ usuario, key }) => {

  const enviarCaja = () => {
    console.log("Enviando a Caja"); // EN PROCESO
    console.log(usuario);
    let membresiaCaja = {
      descripcion: `Membresia ${usuario.modalidad}`,
      modalidad: usuario.modalidad,
      precio: usuario.modalidadPrecio,
      cantidad: 1,
      iva_10: usuario.modalidadPrecio / 11,
      iva_5: null,
      imagen: "./images/ilustracion.png"
    }

    let clienteCaja = {
      nombre: usuario.name,
      ci: usuario.cedula,
      telefono: usuario.telefono,
      ruc: usuario.ruc,
    }

    localStorage.setItem("membresiaCaja", JSON.stringify(membresiaCaja));
    localStorage.setItem("clienteCaja", JSON.stringify(clienteCaja));
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
  const [contadorModalDetalle, setContadorModalDetalle] = useState(0);
  const actualizadorDetalles = (b) => {
    setContadorModalDetalle(contadorModalDetalle + b);
  };
  return (
    <div>
      <div className="tarjetas">
        <div className="nombreApellido">
          <button className="elementoTarjeta botonTarjeta" onClick={() => { actualizadorDetalles(1); }}>
            <div className="elementoTarjeta">{usuario.name}</div>
            <div className="elementoTarjeta">{usuario.lastname}</div>
          </button>
        </div>
        <div className="elementoTarjeta separacion">{usuario.cedula}</div>
        <div className="elementoTarjeta separacion">{usuario.especialidad}</div>
        <div className="elementoTarjeta separacion">{usuario.modalidad}</div>
        <div className="elementoTarjeta separacion">{checkEstadoMembresia(usuario.estadoMembresia)}</div>
      </div>
      {contadorModalDetalle === 1 && (
      <DetallesUser usuario={usuario} onClickAvance={actualizadorDetalles}/>
    )}
    </div>
  )
}
export default Usuarios;
