import React, { useState, useEffect } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./TarjetasAnhadir.css";
import ModalCompra from "./ModalCompra";
import axios from "axios";

const TarjetaCompra = (props) => {
  const { descripcion, precio, cantidadDB,
    codigo_barra, iva_10, iva_5, imagen } = props;
  const [producto, setProductos] = useState([]);
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const mostrarBotonesHandler = () => {
    setMostrarBotones(true);
  };

  const ocultarBotonesHandler = () => {
    setMostrarBotones(false);
  };
  const mostrarBotonAgregar = () => {
    setMostrarBotones(false);
  };
  const handleAgregarClick = () => {
    setShowModalProducto(true);
  };
  const handleAddProducto = (prod) => {
    setProductos([...producto, prod]);
  };

  return (
    <div className="tarjetas" onMouseEnter={mostrarBotonesHandler} onMouseLeave={ocultarBotonesHandler} style={{ position: "relative" }}>
      {mostrarBotonAgregar && (
        <button className="Boton-Agregar" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleAgregarClick}>
          <img className="tarjetas__imagen" src="./iconos/anadir.png" alt="Producto" style={{ width: "100%", height: "100%", transition: "transform 0.3s" }} />
        </button>
      )}
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
      {showModalProducto && (
        <ModalCompra onClose={() => setShowModalProducto(false)} onAddProducto={handleAddProducto} />
      )}
    </div>
  );
};

export default TarjetaCompra;