import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./fiscales.css";

const Fiscales = ({ onClose, onAddTrainer }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [ruc, setruc] = useState("");
  const [telefono, settelefono] = useState("");
  const [domicilio, setdomicilio] = useState("");  
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handlerucChange = (event) => {
    setruc(event.target.value);
  };

  const handletelefonoChange = (event) => {
    settelefono(event.target.value);
  };
  const handledomicilioChange = (event) => {
    setdomicilio(event.target.value);
  };

  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = { name,lastname, ruc, telefono, domicilio };
      setMensaje("Usuario agregado con Exito!");
      setMostrarMensaje(true);
      setTimeout(() => {
        onAddTrainer(newTrainer);
        onClose();
        setMostrarMensaje(false);
      }, 1000);

    }
  };


  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <nav className="contenedorBarra">
            <ul>
              <li className="barra"><a href="">datos personales</a></li>
              <li className="barra"><a href="">datos fiscales</a></li>
              <li className="barra"><a href="">membrecia</a></li>
              <li className="barra"><a href="">medidas inciales</a></li>
            </ul>
          </nav>
          <div className="modal-body">
            <div className="form-group">
              <input
                className="Input-container"
                id="cedula"
                name="name"
                type="text"
                placeholder="Nombre del usuario"
                value={name}
                onChange={handleNameChange}
              />
              <input
                className="Input-container"
                id="cedula"
                name="name"
                type="text"
                placeholder="Apellido del usuario"
                value={lastname}
                onChange={handleLastnameChange}
              />
            </div>
            <div className="form-group">
              <input
                className="Input-container"
                type="text"
                id="cedula"
                placeholder="RUC"
                value={ruc}
                onChange={handlerucChange}
              />
              <input
                className="Input-container"
                type="text"
                id="cedula"
                placeholder="Numero de telefono"
                value={telefono}
                onChange={handletelefonoChange}
              />
            <div className="form-group">
              <input
                className="Input-container"
                id="name"
                name="name"
                type="text"
                placeholder="Domicilio del usuario"
                value={lastname}
                onChange={handledomicilioChange}
              />
            </div>
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={onClose}>
                atras
              </a>
              <button id="boton-ok" onClick={handleAddTrainer}>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default Fiscales;
