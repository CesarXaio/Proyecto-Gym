import React, { useState, useEffect } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Tarjetas.css";
import axios from "axios";

const Tarjetas = (props) => {
  const { descripcion, precio, cantidadDB,
    codigo_barra, iva_10, iva_5, imagen } = props;
  const [cantidad, setCantidad] = useState(0);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const agregarAlCarrito = async () => {
    const producto = {
      descripcion, precio, cantidadDB, cantidad,
      codigo_barra, iva_10, iva_5, imagen
    };

    let productosCaja = JSON.parse(localStorage.getItem("productosCaja"));

    if (productosCaja === null) {
      productosCaja = [];
      localStorage.setItem("productosCaja", JSON.stringify(productosCaja));
    }

    const prodI = productosCaja.findIndex((p) => {
      return p.codigo_barra === codigo_barra
    })

    console.log(`El indice es ${prodI}`);

    if(prodI === -1){
      productosCaja.push(producto);
    } else {
      const cantidadLS = productosCaja[prodI].cantidad;
      if(cantidadLS + cantidad <= cantidadDB){
        productosCaja[prodI].cantidad += cantidad;
      } else {
        console.error("Error en la cantidad al agregar: Cantidad insuficiente");
      }
    }

    localStorage.setItem("productosCaja", JSON.stringify(productosCaja));

  };

  const aumentarCantidad = () => {
    if (cantidadDB > cantidad) {
      setCantidad(cantidad + 1);
    } else {
      console.error("Error en la cantidad al aumentar: Cantidad insuficiente");
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const mostrarBotonesHandler = () => {
    setMostrarBotones(true);
  };

  const ocultarBotonesHandler = () => {
    setMostrarBotones(false);
  };

  return (
    <div
      className="tarjetas"
      onMouseEnter={mostrarBotonesHandler}
      onMouseLeave={ocultarBotonesHandler}
    >
      <img className="tarjetas__imagen" src={imagen} alt="Producto" />
      {mostrarBotones && (
        <div className="Botones">
          <button className="Boton-Disminuir" onClick={disminuirCantidad}>
            -
          </button>
          <div className="Cantidad">{cantidad}</div>
          <button className="Boton-Aumentar" onClick={aumentarCantidad}>
            +
          </button>
        </div>
      )}
      {mostrarBotones && (
        <button className="Agregar" onClick={agregarAlCarrito}>
          Agregar
        </button>
      )}
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </div>
  );
};

export default Tarjetas;
