import React, { useState } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Modal.css";

const Modal = ({ onClose, onAddTrainer }) => {
  const [name, setName] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
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
      const newTrainer = { name, modalidad, cedula, telefono };
      
      setMensaje("Entrenador agregado con Exito!");
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
          <div className="modal-header">
            <h2>Nuevo Entrenador</h2>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                className="Input-container"
                id="name"
                name="name"
                type="text"
                placeholder="Ingrese el nuevo entrenador"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <select
                id="modalidad"
                value={modalidad}
                onChange={handleModalidadChange}
              >
                <option value="">Seleccionar modalidad</option>
                <option value="Crossfit">Crossfit</option>
                <option value="Pilates">Pilates</option>
                <option value="Funcional">Funcional</option>
                <option value="Pesas">Pesas</option>
              </select>
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

export default Modal;
