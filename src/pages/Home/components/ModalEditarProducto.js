import React, { useEffect, useState } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Modal.css";
import axios from "axios";

const ModalEditarProducto = ({ onClose, onEditProducto, actualizar, codigoBarra }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [codigo_barra, setCodigoBarra] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [productos, setProductos] = useState([]);
  const [nom, setNom] = useState("");
  const [canti, setCanti] = useState("");
  const [prec, setPrec] = useState("");
  const [cbarra, setCbarra] = useState("");
  const [datosGuardados, setDatosGuardados] = useState(false);

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos de los entrenadores desde la API
    const obtenerProductos = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Productos
        const response = await fetch(`https://localhost:7072/api/Producto/${codigoBarra}`);
        const data = await response.json();
        setNom(data.descripcion);
        setCanti(data.cantidad);
        setPrec(data.precio);
        setCbarra(data.codigo_barra);
        if (!datosGuardados) {
          setNombre(data.descripcion);
          setCantidad(data.cantidad);
          setPrecio(data.precio);
          setCodigoBarra(data.codigo_barra);
          setDatosGuardados(true);
        }
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    }

    obtenerProductos();

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://localhost:7072/api/producto/${codigoBarra}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(codigoBarra);
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

  const handleEditProducto = () => {
    let data = JSON.stringify({
      "cantidad": cantidad,
      "precio": precio,
      "descripcion": nombre,
      "codigo_barra": codigo_barra,
      "iva_10": precio * 0.1,
      "iva_5": precio * 0.05
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://localhost:7072/api/producto/${codigo_barra}`,
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
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modalUser">
          <div className="modal-body-fiscal">
            <h2 className="modal-producto-titulo">Editar producto</h2>
            <div className="form-group2">
              <p className="tituloseditarproducto">Descripcion</p>
              <input
                className="Input-container-fiscal"
                // id="cedula"
                name="name"
                type="text"
                placeholder={nom}
                value={nombre}
                onChange={handleNombreChange}
              />
              <p className="tituloseditarproducto">Cantidad</p>
              <input
                className="Input-container-fiscal"
                // id="cedula"
                name="name"
                type="text"
                placeholder={canti}
                value={cantidad}
                onChange={handleCantidadChange}
              />
              <p className="tituloseditarproducto">Codigo de Barra</p>
              <input
                className="Input-container-fiscal"
                type="text"
                // id="cedula"
                placeholder={cbarra}
                value={codigo_barra}
                onChange={handleCodigoBarraChange}
              />
              <p className="tituloseditarproducto">Precio</p>
              <input
                className="Input-container-fiscal"
                type="text"
                // id="cedula"
                placeholder={prec}
                value={precio}
                onChange={handlePrecioChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={onClose}>
                Cancelar
              </a>
              <button id="boton-ok" onClick={handleEditProducto}>
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

export default ModalEditarProducto;
