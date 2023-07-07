import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Buy.css";
import ModalCompra from "./components/ModalCompra";
import moment from "moment/moment";
import Mensaje from "../../Confirmacion/Mensaje";

const TarjetasProducto = (props) => {
  const { descripcion, precio, cantidadDB,
    codigo_barra } = props;
  const [producto, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [seleccionarProveedor, setSeleccionarProveedor] = useState("");
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [mostrarProveedores, setMostrarProveedores] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [busquedaProveedor, setBusquedaProveedor] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);


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
  const handlerSeleccionarProveedor = (event) => {
    setSeleccionarProveedor(event.target.value);
  };

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
  const filtrarProveedores = (proveedor) => {
    return proveedor.nombre.toLowerCase().includes(busquedaProveedor.toLowerCase());
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
    if (seleccionarProveedor === ""){
      alert("No se ha selecionado ningun proveedor");
      return;
    }
    if (producto.length === 0){
      alert("No se ha selecionado ningun producto");
      return;
    }

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setProductos([]);
        setMostrarMensaje(true);
        setTimeout(() => {
          setMostrarMensaje(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="proveedor">

      <button className="Boton-Comprar-Producto" onClick={handleAgregarClick}>Comprar producto</button>
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
            <th>Precio U. compra</th>
            <th>Precio U. Venta</th>
          </tr>
        </thead>
        <tbody>
          {producto.map((dato, index) => (
            <tr key={index}>
              <td>{dato.descripcion}</td>
              <td>{dato.codigo_barra}</td>
              <td>{dato.cantidad}</td>
              <td>{dato.precio}</td>
              <td>{dato.precioVenta}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarProveedores ? (
        <div className="lista-proveedores">
          <h5>Proveedores:</h5>
          {proveedores.length > 0 ? (
            <select className="select-proveedores" value={seleccionarProveedor} onChange={handlerSeleccionarProveedor}>
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
          <button className="botonproveedores" onClick={cerrarListaProveedores}>Cerrar</button>
        </div>
      ) : (
        <div className="mostrar-proveedores">
          <button onClick={mostrarListaProveedores}>Mostrar Proveedores</button>
        </div>

      )}

      <Mensaje mensaje="Se ha realizado la compra correctamente" mostrar={mostrarMensaje} />

    </div>
  );
};

export default TarjetasProducto;
