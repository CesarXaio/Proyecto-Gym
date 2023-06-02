import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "././ModalUser.css";

const ModalUser = ({usuario, onClickAvance, onClose, onAddTrainer })=> {
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
        <div className="modalUserSimple">
          <nav className="contenedorBarra">
            <label>
              <label className="barra selec">datos personales</label>
              <label className="barra notSelec">datos fiscales</label>
              <label className="barra notSelec">membrecia</label>
              <label className="barra notSelec">medidas iniciales</label>
            </label>
          </nav>
          <div className="modal-body-User">
            <div className="form-group">
            <input
                className="Input-container-User"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del nuevo usuario"
                value={name}
                onChange={handleNameChange}
              />
              <input
                className="Input-container-User"
                id="name"
                name="name"
                type="text"
                placeholder="Apellido del nuevo usuario"
                value={lastname}
                onChange={handleLastnameChange}
              />
              <input
                type="text"
                id="ciUser"
                placeholder="Cedula de Identidad"
                value={cedula}
                onChange={handleCedulaChange}
              />
              <input
                type="text"
                id="telefonoUser"
                placeholder="Número de Telefono"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={() => {onClickAvance(-1);}}>
                cancelar
              </a>
              <button id="boton-ok" onClick={() => {onClickAvance(1);}}>
                siguiente
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
