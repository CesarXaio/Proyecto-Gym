import React, { useState, useEffect } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./TarjetasProducto.css";
import ModalEditarProducto from "./ModalEditarProducto";
import axios from "axios";
import ModalProductos from "./ModalProductos";

const TarjetasProducto = (props, actualizar) => {
  const { descripcion, precio, cantidadDB,
    codigo_barra, iva_10, iva_5, imagen } = props;
  const [producto, setProductos] = useState([]);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [showModalEditarProducto, setShowModalEditarProducto] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");



  const mostrarBotonesHandler = () => {
    setMostrarBotones(true);
  };

  const ocultarBotonesHandler = () => {
    setMostrarBotones(false);
  };

  const eliminarProductoHandler = () => {
    setMostrarConfirmacion(true);
  };

  const cancelarEliminarProducto = () => {
    setMostrarConfirmacion(false);
  };

  const confirmarEliminarProducto = () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://localhost:7072/api/producto/${codigo_barra}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const editarProductoHandler = () => {
    setShowModalEditarProducto(true);
  };
  const handleAddProducto = (prod) => {
    setProductos([...producto, prod]);
  };
  const handleEditProducto = (prod) => {
    setProductos([...producto, prod]);
  };
  return (
    <div className="tarjetasProductos2" onMouseEnter={mostrarBotonesHandler} onMouseLeave={ocultarBotonesHandler}>
      <img className="tarjetasAnhadir__imagen" src={imagen} alt="Producto" />
      {mostrarBotones && (
        <div className="BotonesAnha">
          <button className="Boton-EliminarA" onClick={eliminarProductoHandler}>
            <img className="tarjetasAnhadir__imagen" src="./iconos/trash.png" alt="Eliminar" />
          </button>
          <button className="Boton-EditarA" onClick={editarProductoHandler}>
            <img className="tarjetasAnhadir__imagen" src="./iconos/edit.png" alt="Editar" />
          </button>
        </div>
      )}
      {mostrarConfirmacion && (
        <div className="VentanaConfirmacion">
          <p>¿Deseas eliminar este producto?</p>
          <button onClick={confirmarEliminarProducto}>Eliminar</button>
          <button onClick={cancelarEliminarProducto}>Cancelar</button>
        </div>
      )}

      {/*{showModalProducto && (
        <ModalProductos onClose={() => setShowModalProducto(false)} onAddProducto={handleAddProducto} actualizar={actualizar}/>
      )}*/}
      {showModalEditarProducto && (
        <ModalEditarProducto onClose={() => setShowModalEditarProducto(false)} onEditProducto={handleEditProducto} actualizar={actualizar}/>
      )}
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </div>
  );
};

export default TarjetasProducto;
