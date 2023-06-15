import React, { useState, useEffect } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./TarjetasAnhadir.css";
import ModalProductos from "./ModalProductos";
import axios from "axios";

const TarjetasAnhadir = (props) => {
  const { descripcion, precio, cantidadDB,
    codigo_barra, iva_10, iva_5, imagen } = props;
  const [producto, setProductos] = useState([]);
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");


  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los productos
        const response = await fetch("https://localhost:7072/api/Producto");
        const data = await response.json();
        setProductos(data); // Asignar los productos al estado
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

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
    <div className="tarjetasAnhadir" onMouseEnter={mostrarBotonesHandler} onMouseLeave={ocultarBotonesHandler} style={{ position: "relative" }}>
      {mostrarBotonAgregar && (
        <button className="Boton-AgregarA" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleAgregarClick}>
          <img className="tarjetas__imgAnhadir" src="./iconos/anadir.png" alt="Producto" style={{ width: "100%", height: "100%", transition: "transform 0.3s" }} />
        </button>
      )}
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
      {showModalProducto && (
        <ModalProductos onClose={() => setShowModalProducto(false)} onAddProducto={handleAddProducto} />
      )}
    </div>
  );
};

export default TarjetasAnhadir;
