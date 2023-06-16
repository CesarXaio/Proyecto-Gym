import React, { useEffect, useState } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Modal.css";
import axios from "axios";

const ModalProductos = ({ onClose, onAddProducto, actualizar}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [codigo_barra, setCodigoBarra] = useState("");
  const [precio, setPrecio] = useState("");
  const [data, setData] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [entrenadores, setEntrenadores] = useState([]); // Estado para almacenar los datos de los entrenadores

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos de los entrenadores desde la API
    const fetchEntrenadores = async () => {
      try {
        const response = await axios.get("https://localhost:7072/api/Entrenador");
        setEntrenadores(response.data);
      } catch (error) {
        console.log("Error al obtener los entrenadores:", error);
      }
    };

    fetchEntrenadores();
  }, []);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleCodigoBarraChange = (event) => {
    setCodigoBarra(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleAddProducto = () => {
    let data = JSON.stringify({
      "cantidad": cantidad,
      "precio": precio,
      "descripcion": nombre,
      "codigo_barra": codigo_barra,
      "iva_10": precio*0.1,
      "iva_5": precio*0.05
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7072/api/producto',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log(actualizar);
      actualizar = 1;
    })
    .catch((error) => {
      console.log(error);
    });
    onClose();
  };

  return (
    <>
    <div className="modal-overlay">
      <div className="modalUser">
        <div className="modal-body-fiscal">
            <h2>Producto</h2>
          <div className="form-group">
            <input
              className="Input-container-fiscal"
              // id="cedula"
              name="name"
              type="text"
              placeholder="Descripcion"
              value={nombre}
              onChange={handleNombreChange}
            />
            <input
              className="Input-container-fiscal"
              // id="cedula"
              name="name"
              type="text"
              placeholder="Cantidad"
              value={cantidad}
              onChange={handleCantidadChange}
            />
            <input
              className="Input-container-fiscal"
              type="text"
              // id="cedula"
              placeholder="Codigo de barra"
              value={codigo_barra}
              onChange={handleCodigoBarraChange}
            />
            <input
              className="Input-container-fiscal"
              type="text"
              // id="cedula"
              placeholder="Precio"
              value={precio}
              onChange={handlePrecioChange}
            />
          </div>
          <div className="button-container">
            <a id="boton-off" onClick={onClose}>
              Cancelar
            </a>
            <button id="boton-ok" onClick={handleAddProducto}>
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

export default ModalProductos;
