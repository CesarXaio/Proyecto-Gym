import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Buy.css";
import ModalCompra from "./components/ModalCompra";
import moment from "moment/moment";

const TarjetasProducto = (props) => {
  const { descripcion, precio, cantidadDB,
    codigo_barra } = props;
  const [producto, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [seleccionarProveedor, setSeleccionarProveedor] = useState("");
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [mostrarProveedores, setMostrarProveedores] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await axios.get('https://localhost:7072/api/Proveedor');
        setProveedores(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerProveedores();
  }, []);

  const handleAgregarClick = () => {
    setShowModalProducto(true);
  };

  const handleAddProducto = (prod) => {
    setProductos([...producto, prod]);
  };

  const mostrarListaProveedores = () => {
    setMostrarProveedores(true);
  };
  const cerrarListaProveedores = () => {
    setMostrarProveedores(false);
  };
  const handlerSeleccionarProveedor = (event) => {
    setSeleccionarProveedor(event.target.value);
  };

  const handlePagar = (event) => {
    let data = JSON.stringify({

      codigo_proveedor: seleccionarProveedor,
      total: producto.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0),
      fecha: moment().format("YYYY-MM-DD[T]hh:mm:[00]"),
      productos: producto

    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7072/api/compra',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="proveedor">

      <button className="Boton-Comprar-Producto" onClick={handleAgregarClick}>Comprar Producto</button>
      <button className="Boton-Pagar-Producto" onClick={handlePagar}>Pagar</button>
      {showModalProducto && (
        <ModalCompra onClose={() => setShowModalProducto(false)} onAddProducto={handleAddProducto} />
      )}
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Código de barra</th>
            <th>Cantidad Total</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {producto.map((dato, index) => (
            <tr key={index}>
              <td>{dato.descripcion}</td>
              <td>{dato.codigo_barra}</td>
              <td>{dato.cantidad}</td>
              <td>{dato.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarProveedores ? (
        <div className="lista-proveedores">
          <h5>Proveedores:</h5>
          {proveedores.length > 0 ? (
            <select value={seleccionarProveedor} onChange={handlerSeleccionarProveedor}>
              <option value="">Seleccionar proveedor</option>
              {proveedores.map((proveedor) => (
                <option value={proveedor.codigo}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          ) : (
            <p>No hay proveedores disponibles.</p>
          )}
          <button onClick={cerrarListaProveedores}>Cerrar</button>
        </div>
      ) : (
        <div className="mostrar-proveedores">
          <button onClick={mostrarListaProveedores}>Mostrar Proveedores</button>
        </div>
      )}
    </div>
  );
};

export default TarjetasProducto;
