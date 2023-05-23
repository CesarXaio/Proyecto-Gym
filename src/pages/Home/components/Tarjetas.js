import React, { useState, useEffect } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Tarjetas.css";
import axios from "axios";

const Tarjetas = (props) => {
  const { bebida, precio, imagen } = props;
  const [cantidad, setCantidad] = useState(0);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("https://localhost:7072/api/Producto");
        setProductos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const obtenerProductoPorId = (id) => {
    return productos.find((producto) => producto.id === id);
  };

  const agregarAlCarrito = async () => {
    try {
      const producto = obtenerProductoPorId(props.id);

      if (producto) {
        const nuevaCantidad = producto.cantidad - cantidad;

        if (nuevaCantidad >= 0) {
          const nuevoProducto = { ...producto, cantidad: nuevaCantidad };

          const response = await axios.put(
            `https://localhost:7072/api/Producto/${props.id}`,
            nuevoProducto
          );
          console.log(response.data);

          setMostrarMensaje(true);
          setMensaje("Producto agregado con éxito");

          setTimeout(() => {
            setMostrarMensaje(false);
            setCantidad(0);
          }, 1000);
        } else {
          console.error("La cantidad seleccionada es mayor que la disponible");
        }
      } else {
        console.error("No se encontró el producto en la API");
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error.response);
      // Manejo de errores
    }
  };

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
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
