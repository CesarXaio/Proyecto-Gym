import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "././ModalUser.css";

const ModalUser = ({ onClose, onAddTrainer })=> {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleModalidadChange = (event) => {
    setModalidad(event.target.value);
  };

  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = { name, lastname, modalidad, cedula, telefono };
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
              <li className="barra"><a href="">medios inciales</a></li>
            </ul>
          </nav>
          <div className="modal-body">
            <div className="form-group">
              <input
                className="Input-container"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del nuevo usuario"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <input
                className="Input-container"
                id="name"
                name="name"
                type="text"
                placeholder="Apellido del nuevo usuario"
                value={lastname}
                onChange={handleLastnameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="cedula"
                placeholder="Cedula de Identidad"
                value={cedula}
                onChange={handleCedulaChange}
              />

              <input
                type="text"
                id="telefono"
                placeholder="Numero de Telefono"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>

            <div className="button-container">
              <a id="boton-off" onClick={onClose}>
                Cancelar
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

export default ModalUser;
