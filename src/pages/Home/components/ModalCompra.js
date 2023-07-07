import React, { useEffect, useState } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Modal.css";
import axios from "axios";

const ModalCompra = ({ onClose, onAddProducto }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productos, setProductos] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [busquedaProducto, setBusquedaProducto] = useState("");
  

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await axios.get("https://localhost:7072/api/Proveedor");
        setProveedores(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const obtenerProductos = async () => {
      try {
        const response = await fetch("https://localhost:7072/api/producto");
        const data = await response.json();
        const productosData = data.map((p) => ({
          descripcion: p.descripcion,
          precio: p.precio,
          cantidadDB: p.cantidad,
          codigo_barra: p.codigo_barra,
          iva_10: p.iva_10,
          iva_5: p.iva_5,
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };
    obtenerProductos();
    obtenerProveedores();
  }, []);

  const handlesetProductoSeleccionadoChange = (event) => {
    setProductoSeleccionado(event.target.value);
  };

  
  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const aceptarHandle = () => {
    const productoSeleccionadoData = productos.find(
      (producto) => producto.codigo_barra === productoSeleccionado
    );
    const productoNuevo = {
      descripcion: productoSeleccionadoData.descripcion,
      precio: precio,
      cantidad: cantidad,
      codigo_barra: productoSeleccionadoData.codigo_barra,
    };
    onAddProducto(productoNuevo);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modalUser">
          <div className="modal-body-fiscal">
            <h2 className="modal-producto-titulo">Comprar Producto</h2>
            <input
              type="text"
              placeholder="Buscar producto"
              value={busquedaProducto}
              onChange={(e) => setBusquedaProducto(e.target.value)}
            />

            <div className="form-group">
              {productos
                .filter((producto) =>
                  producto.descripcion.toLowerCase().includes(busquedaProducto.toLowerCase())
                )
                .map((producto) => (
                  <div key={producto.codigo_barra}>
                    <input
                      type="radio"
                      id={producto.codigo_barra}
                      value={producto.codigo_barra}
                      checked={productoSeleccionado === producto.codigo_barra}
                      onChange={handlesetProductoSeleccionadoChange}
                    />
                    <label htmlFor={producto.codigo_barra}>{producto.descripcion}</label>
                  </div>
                ))}
              <input
                className="Input-container-fiscal"
                name="name"
                type="text"
                placeholder="Cantidad"
                value={cantidad}
                onChange={handleCantidadChange}
              />
              <input
                className="Input-container-fiscal"
                type="text"
                placeholder="Precio"
                value={precio}
                onChange={handlePrecioChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={onClose}>
                Cancelar
              </a>
              <button id="boton-ok" onClick={aceptarHandle}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default ModalCompra;
